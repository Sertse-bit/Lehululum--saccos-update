export type FormKind = "contact" | "membership" | "complaint";

export interface FormValues {
  name: string;
  phone: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
}

export type FieldKey = "name" | "phone" | "email" | "subject" | "message";

export type ValidationErrorKey =
  | "required"
  | "nameShort"
  | "phoneInvalid"
  | "emailInvalid"
  | "contactRequired"
  | "subjectShort"
  | "messageShort"
  | "messageLong";

export type FormErrors = Partial<Record<FieldKey, ValidationErrorKey>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

/** Order used for the error summary and for focusing the first problem. */
export const FIELD_ORDER: FieldKey[] = [
  "name",
  "phone",
  "email",
  "subject",
  "message",
];

export const emptyValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  topic: "general",
  subject: "",
  message: "",
};

/** Remove the separators people commonly type inside phone numbers. */
export function normalizePhone(value: string): string {
  return value.replace(/[\s\-().]/g, "");
}

/** Ethiopian mobile/landline numbers and international numbers (9–15 digits). */
export function isValidPhone(value: string): boolean {
  return /^\+?\d{9,15}$/.test(normalizePhone(value));
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Pure validation. Returns error *keys* (not text) so that the UI can show
 * them in the visitor's language.
 *
 *  - contact:    name, phone or e-mail, message
 *  - membership: name, phone (required), optional e-mail and note
 *  - complaint:  name, phone or e-mail, subject, message
 */
export function validate(values: FormValues, kind: FormKind): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = "required";
  else if (name.length < 2) errors.name = "nameShort";

  if (kind === "membership") {
    if (!phone) errors.phone = "required";
    else if (!isValidPhone(phone)) errors.phone = "phoneInvalid";
  } else if (!phone && !email) {
    errors.phone = "contactRequired";
  } else if (phone && !isValidPhone(phone)) {
    errors.phone = "phoneInvalid";
  }

  if (email && !isValidEmail(email)) errors.email = "emailInvalid";

  if (kind === "complaint") {
    if (!subject) errors.subject = "required";
    else if (subject.length < 3) errors.subject = "subjectShort";
  }

  if (kind === "membership") {
    if (message.length > MESSAGE_MAX) errors.message = "messageLong";
  } else if (!message) {
    errors.message = "required";
  } else if (message.length < MESSAGE_MIN) {
    errors.message = "messageShort";
  } else if (message.length > MESSAGE_MAX) {
    errors.message = "messageLong";
  }

  return errors;
}

export interface ComposeLabels {
  name: string;
  phone: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  subjectContact: string;
  subjectMembership: string;
  subjectComplaint: string;
  greeting: string;
}

/** Builds the e-mail subject and plain-text body from the form values. */
export function composeMessage(
  values: FormValues,
  kind: FormKind,
  labels: ComposeLabels,
  topicLabel: string,
): { subject: string; body: string } {
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  let subjectLine: string;
  if (kind === "membership") subjectLine = labels.subjectMembership;
  else if (kind === "complaint")
    subjectLine = `${labels.subjectComplaint}: ${subject}`;
  else subjectLine = `${labels.subjectContact}: ${topicLabel}`;

  const lines: string[] = [labels.greeting, ""];
  if (message) lines.push(message, "");
  lines.push("—");
  lines.push(`${labels.name}: ${name}`);
  if (phone) lines.push(`${labels.phone}: ${phone}`);
  if (email) lines.push(`${labels.email}: ${email}`);
  if (kind === "contact") lines.push(`${labels.topic}: ${topicLabel}`);
  if (kind === "complaint") lines.push(`${labels.subject}: ${subject}`);

  return { subject: subjectLine, body: lines.join("\n") };
}
