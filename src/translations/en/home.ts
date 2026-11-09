import { organization as org } from "@/config/organization";

export const home = {
  hero: {
    badge: org.tagline.en,
    title: "Savings for your future, loans for your dreams!",
    text: `${org.brandName} works together with its members to strengthen the culture of saving and to support economic growth.`,
    highlights: [
      "Member-owned cooperative",
      "Savings options",
      "Loan options",
    ],
    portraitAlt: `Portrait from the ${org.brandName} brochure: a smiling woman in a green blazer`,
    callCard: "Call us",
    emblemCard: "Savings and credit cooperative",
  },

  aboutTeaser: {
    label: "About us",
    title: `Get to know ${org.brandName}`,
    cta: "More about us",
  },

  services: {
    label: "What we offer",
    title: "Our services",
    subtitle:
      "Choose the service that fits your goals, and contact us to confirm the current conditions.",
  },

  metrics: {
    label: "At a glance",
    title: `${org.brandName} at a glance`,
    subtitle:
      "A quick look at what the cooperative offers its members.",
    cards: {
      savingsOptions: "Savings options",
      loanOptions: "Loan options",
      ownership: { value: "Member-owned", label: "Cooperative ownership" },
      womenAndMen: {
        value: "Women & men",
        label: "Loan options for women and for men",
      },
      children: {
        value: "Children",
        label: "A savings option for your child",
      },
      channels: "Ways to reach us",
    },
  },

  why: {
    label: "Why a cooperative?",
    title: "Why choose us?",
    subtitle:
      "The strength of a cooperative comes from its members working together.",
    items: [
      {
        title: "A culture of saving",
        text: "Regular saving, even in small amounts, builds lasting security.",
      },
      {
        title: "Member involvement",
        text: "Members are the owners of the cooperative and take part in its life.",
      },
      {
        title: "Collective development",
        text: "Pooling resources helps members and communities move forward together.",
      },
      {
        title: "Access to financial services",
        text: "Savings and loan options that are designed for members.",
      },
      {
        title: "Shared responsibility",
        text: "Members and the cooperative share responsibility for its success.",
      },
    ],
  },

  newsTeaser: {
    label: "News & resources",
    title: "Learn and stay informed",
    subtitle:
      "Practical guides for members, and announcements from the cooperative.",
    allResources: "All member education",
    allNews: "News & announcements",
  },

  faqTeaser: {
    label: "FAQ",
    title: "Frequently asked questions",
    subtitle: "Quick answers about savings, loans, membership and contact.",
  },

  contactTeaser: {
    label: "Contact",
    title: "Talk to us",
    subtitle:
      "Call, message or write to us. We are glad to explain our services.",
  },

  cta: {
    title: "Ready to start saving?",
    text: "Contact us to learn how to become a member and which options suit you best.",
  },
};
