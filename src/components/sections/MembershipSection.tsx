"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Notice, Steps } from "./Steps";

/** Home page membership section: 3 steps, a notice and a call to action. */
export function MembershipSection() {
  const { t } = useLanguage();
  const join = t.members.join;

  return (
    <section id="membership" aria-labelledby="membership-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <div id="membership-title">
            <SectionHeading
              label={t.meta.pages.members.label}
              title={join.title}
              text={join.text}
            />
          </div>
        </Reveal>
        <div className="mt-12">
          <Steps steps={join.steps} stepLabel={join.stepLabel} />
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <Notice title={join.noticeTitle} text={join.notice} />
        </div>
        <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/members#membership-form" variant="primary">
            {t.common.buttons.becomeMember}
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            {t.common.buttons.contactUs}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
