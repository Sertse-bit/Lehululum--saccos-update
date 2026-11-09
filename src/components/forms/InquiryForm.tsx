"use client";

import {
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Copy,
  Loader2,
  Mail,
  Pencil,
  Phone,
} from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import {
  FIELD_ORDER,
  MESSAGE_MAX,
  composeMessage,
  emptyValues,
  validate,
  type FieldKey,
  type FormErrors,
  type FormKind,
  type FormValues,
} from "@/lib/validation";

type Status = "idle" | "prepared" | "sending" | "sent" | "failed";

interface InquiryFormProps {
  kind: FormKind;
  /** Anchor id of the form, for example "contact-form". */
  id: string;
  className?: string;
}

const inputBase =
  "w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/55 transition-shadow focus:outline-none focus:ring-4";
const inputOk =
  "border-line focus:border-forest focus:ring-forest/15";
const inputBad =
  "border-red-600 focus:border-red-600 focus:ring-red-600/15";

const TOPIC_KEYS = [
  "general",
  "savings",
  "loans",
  "membership",
  "employment",
  "partnership",
  "other",
] as const;

/**
 * Accessible inquiry form used for contact, membership and complaints.
 *
 * Delivery is honest: this site has no backend, so unless a form endpoint is
 * configured (NEXT_PUBLIC_FORM_ENDPOINT) the form only *prepares* a message
 * that the visitor then sends from their own e-mail app or WhatsApp. It never
 * claims that anything was stored or sent when it was not.
 */
export function InquiryForm({ kind, id, className }: InquiryFormProps) {
  const { t, lang } = useLanguage();
  const f = t.forms;
  const baseId = useId();
  const fid = (field: string) => `${baseId}-${field}`;

  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const honeypot = useRef<HTMLInputElement>(null);
  const fieldRefs = useRef<
    Partial<Record<FieldKey, HTMLInputElement | HTMLTextAreaElement | null>>
  >({});

  const endpoint = org.formEndpoint;
  const hasEndpoint = endpoint.length > 0;

  const topicLabel = f.topics[values.topic as (typeof TOPIC_KEYS)[number]] ?? f.topics.general;
  const composed = composeMessage(values, kind, f.compose, topicLabel);

  const mailtoHref = `mailto:${org.contact.email}?subject=${encodeURIComponent(
    composed.subject,
  )}&body=${encodeURIComponent(composed.body)}`;
  const whatsappHref = `https://wa.me/${org.contact.whatsappNumber}?text=${encodeURIComponent(
    `${composed.subject}\n\n${composed.body}`,
  )}`;

  const update =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      // Once the visitor has tried to submit, keep the messages up to date.
      if (attempted) setErrors(validate(next, kind));
    };

  const errorText = (key: FieldKey): string | undefined => {
    const code = errors[key];
    return code ? f.validation[code] : undefined;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const found = validate(values, kind);
    setErrors(found);

    const first = FIELD_ORDER.find((key) => found[key]);
    if (first) {
      fieldRefs.current[first]?.focus();
      return;
    }

    // Bots fill hidden fields. Pretend it worked and send nothing.
    if (honeypot.current?.value) {
      setStatus("sent");
      return;
    }

    if (!hasEndpoint) {
      setCopyState("idle");
      setStatus("prepared");
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kind,
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          topic: kind === "contact" ? values.topic : undefined,
          subject: values.subject.trim() || composed.subject,
          message: values.message.trim(),
          language: lang,
          source: "website",
        }),
        signal: controller.signal,
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(`${composed.subject}\n\n${composed.body}`);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
    setAttempted(false);
    setStatus("idle");
  };

  const errorList = FIELD_ORDER.filter((key) => errors[key]);

  // Bring the result panel into view when the form is replaced by it.
  useEffect(() => {
    if (status === "prepared" || status === "sent") {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }
  }, [status, id]);

  /* ---------- Result panels ---------- */

  const sendOptions = (
    <div className="mt-5 flex flex-wrap gap-3">
      <ButtonLink href={mailtoHref} variant="primary">
        <Mail className="h-4 w-4" aria-hidden="true" />
        {f.prepared.email}
      </ButtonLink>
      <ButtonLink href={whatsappHref} variant="secondary">
        <WhatsAppIcon className="h-4 w-4" />
        {f.prepared.whatsapp}
      </ButtonLink>
    </div>
  );

  if (status === "prepared") {
    return (
      <div id={id} className={cn("rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8", className)}>
        <div role="status" aria-live="polite">
          <h3 className="flex items-center gap-2.5 text-xl font-bold text-forest-900">
            <CircleCheck className="h-6 w-6 text-forest" aria-hidden="true" />
            {f.prepared.title}
          </h3>
          <p className="mt-3 text-ink-soft">{f.prepared.text}</p>
        </div>

        <div
          tabIndex={0}
          className="mt-5 max-h-64 select-all overflow-y-auto whitespace-pre-wrap break-words rounded-2xl border border-line bg-cream px-4 py-3 text-[0.92rem] text-ink"
        >
          <p className="font-bold">{composed.subject}</p>
          <p className="mt-2">{composed.body}</p>
        </div>

        {sendOptions}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={copyMessage}>
            {copyState === "copied" ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {f.prepared.copy}
          </Button>
          <Button variant="ghost" onClick={() => setStatus("idle")}>
            <Pencil className="h-4 w-4" aria-hidden="true" />
            {f.prepared.edit}
          </Button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm font-semibold text-forest">
          {copyState === "copied" ? f.prepared.copied : null}
          {copyState === "failed" ? (
            <span className="text-red-700">{f.prepared.copyFailed}</span>
          ) : null}
        </p>

        <p className="mt-2 text-sm text-ink-soft">
          {f.prepared.callInstead}{" "}
          {org.contact.phones.map((phone, i) => (
            <span key={phone.intl}>
              {i > 0 ? " / " : null}
              <a
                href={phone.href}
                className="font-bold text-forest underline underline-offset-4"
              >
                {phone.display}
              </a>
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div id={id} className={cn("rounded-3xl border border-line bg-white p-6 text-center shadow-card sm:p-10", className)}>
        <div role="status" aria-live="polite">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest">
            <CircleCheck className="h-7 w-7" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-bold text-forest-900">{f.sent.title}</h3>
          <p className="mt-3 text-ink-soft">{f.sent.text}</p>
        </div>
        <Button variant="outline" className="mt-6" onClick={reset}>
          {f.sent.another}
        </Button>
      </div>
    );
  }

  /* ---------- The form ---------- */

  const showFailure = status === "failed";

  return (
    <form
      id={id}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
      className={cn("rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8", className)}
    >
      {showFailure ? (
        <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="flex items-center gap-2 font-bold text-red-800">
            <CircleAlert className="h-5 w-5" aria-hidden="true" />
            {f.failed.title}
          </p>
          <p className="mt-2 text-sm text-red-900">{f.failed.text}</p>
          {sendOptions}
        </div>
      ) : null}

      {errorList.length > 0 ? (
        <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="flex items-center gap-2 font-bold text-red-800">
            <CircleAlert className="h-5 w-5" aria-hidden="true" />
            {f.validation.summaryTitle}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-red-900">
            {errorList.map((key) => (
              <li key={key}>
                <a
                  href={`#${fid(key)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    fieldRefs.current[key]?.focus();
                  }}
                  className="underline underline-offset-2"
                >
                  {errorText(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={fid("name")}
          label={f.fields.name}
          required
          requiredLabel={f.fields.required}
          error={errorText("name")}
          className="sm:col-span-2"
        >
          <input
            ref={(node) => {
              fieldRefs.current.name = node;
            }}
            id={fid("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            placeholder={f.placeholders.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fid("name")}-error` : undefined}
            className={cn(inputBase, errors.name ? inputBad : inputOk)}
          />
        </Field>

        <Field
          id={fid("phone")}
          label={f.fields.phone}
          required={kind === "membership"}
          requiredLabel={f.fields.required}
          optionalLabel={kind === "membership" ? undefined : f.fields.optional}
          error={errorText("phone")}
        >
          <input
            ref={(node) => {
              fieldRefs.current.phone = node;
            }}
            id={fid("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update("phone")}
            placeholder={f.placeholders.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${fid("phone")}-error` : undefined}
            className={cn(inputBase, errors.phone ? inputBad : inputOk)}
          />
        </Field>

        <Field
          id={fid("email")}
          label={f.fields.email}
          optionalLabel={f.fields.optional}
          error={errorText("email")}
        >
          <input
            ref={(node) => {
              fieldRefs.current.email = node;
            }}
            id={fid("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            placeholder={f.placeholders.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fid("email")}-error` : undefined}
            className={cn(inputBase, errors.email ? inputBad : inputOk)}
          />
        </Field>

        {kind === "contact" ? (
          <Field id={fid("topic")} label={f.fields.topic} className="sm:col-span-2">
            <div className="relative">
              <select
                id={fid("topic")}
                name="topic"
                value={values.topic}
                onChange={update("topic")}
                className={cn(inputBase, inputOk, "appearance-none pr-11")}
              >
                {TOPIC_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {f.topics[key]}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest"
                aria-hidden="true"
              />
            </div>
          </Field>
        ) : null}

        {kind === "complaint" ? (
          <Field
            id={fid("subject")}
            label={f.fields.subject}
            required
            requiredLabel={f.fields.required}
            error={errorText("subject")}
            className="sm:col-span-2"
          >
            <input
              ref={(node) => {
                fieldRefs.current.subject = node;
              }}
              id={fid("subject")}
              name="subject"
              type="text"
              value={values.subject}
              onChange={update("subject")}
              placeholder={f.placeholders.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? `${fid("subject")}-error` : undefined}
              className={cn(inputBase, errors.subject ? inputBad : inputOk)}
            />
          </Field>
        ) : null}

        <Field
          id={fid("message")}
          label={f.fields.message}
          required={kind !== "membership"}
          requiredLabel={f.fields.required}
          optionalLabel={kind === "membership" ? f.fields.optional : undefined}
          error={errorText("message")}
          className="sm:col-span-2"
        >
          <textarea
            ref={(node) => {
              fieldRefs.current.message = node;
            }}
            id={fid("message")}
            name="message"
            rows={5}
            value={values.message}
            onChange={update("message")}
            placeholder={f.placeholders.message}
            maxLength={MESSAGE_MAX + 500}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${fid("message")}-error` : undefined}
            className={cn(inputBase, "min-h-36 resize-y", errors.message ? inputBad : inputOk)}
          />
        </Field>

        {/* Honeypot for bots – hidden from people and assistive technology. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            {f.honeypot}
            <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-ink-soft">
          {hasEndpoint ? f.helpSend : f.helpPrepare}
        </p>
        <Button type="submit" variant="primary" disabled={status === "sending"} className="sm:min-w-52">
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {f.sending}
            </>
          ) : kind === "contact" || hasEndpoint ? (
            hasEndpoint ? f.submitSend : f.submitPrepare
          ) : (
            f.submitPrepare
          )}
        </Button>
      </div>

      {kind === "membership" || kind === "complaint" || kind === "contact" ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
          <Phone className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
          <span className="flex flex-wrap gap-x-3">
            {org.contact.phones.map((phone) => (
              <a
                key={phone.intl}
                href={phone.href}
                className="font-semibold text-forest underline underline-offset-4"
              >
                {phone.display}
              </a>
            ))}
          </span>
        </p>
      ) : null}
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({
  id,
  label,
  required,
  requiredLabel,
  optionalLabel,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.92rem] font-bold text-forest-900">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-1 text-red-700">
              *
            </span>
            <span className="sr-only"> ({requiredLabel})</span>
          </>
        ) : optionalLabel ? (
          <span className="ml-2 text-sm font-medium text-ink-soft">{optionalLabel}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
