"use client";

import { Info } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface StepsProps {
  steps: ReadonlyArray<{ title: string; text: string }>;
  stepLabel: string;
}

/** Numbered 3-step process with a connecting line on wide screens. */
export function Steps({ steps, stepLabel }: StepsProps) {
  return (
    <ol className="relative grid gap-5 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title}>
          <Reveal delay={index * 100} className="h-full">
            <div className="relative h-full rounded-3xl border border-line bg-white p-6 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-lg font-extrabold text-gold-bright ring-4 ring-gold-50">
                <span aria-hidden="true">{index + 1}</span>
                <span className="sr-only">
                  {stepLabel} {index + 1}
                </span>
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-forest-900">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{step.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Highlighted notice used for "please confirm with the cooperative". */
export function Notice({ title, text }: { title: string; text: string }) {
  return (
    <Reveal>
      <aside className="flex gap-4 rounded-3xl border border-gold/60 bg-gold-50 p-5 sm:p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-forest-900">
          <Info className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-extrabold text-forest-900">{title}</p>
          <p className="mt-1 text-[0.95rem] text-ink-soft">{text}</p>
        </div>
      </aside>
    </Reveal>
  );
}
