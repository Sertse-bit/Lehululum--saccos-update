import {
  Baby,
  Briefcase,
  Handshake,
  HeartHandshake,
  Landmark,
  LifeBuoy,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { L10n } from "@/i18n/types";

/**
 * Savings and loan options as they are listed on the cooperative's brochure.
 *
 * The descriptions in `info` are the texts supplied by the cooperative and
 * are shown on the product card exactly as written (Amharic). The English
 * versions are translations. Change a figure or a sentence here and it is
 * updated everywhere the card appears.
 */
export interface ProductInfo {
  /** Main description, shown in the highlighted panel. */
  lead: string;
  /** Further sentences or paragraphs of the description. */
  more?: string[];
  /** "Benefits" block with its own heading. */
  benefits?: { title: string; text: string };
  /** Labelled rows, e.g. previous saving, interest, repayment period. */
  facts?: { label: string; value: string }[];
  /** Highlighted loan-amount line, e.g. "Loan amount: up to …". */
  limit?: string;
}

export interface Product<Id extends string = string> {
  id: Id;
  icon: LucideIcon;
  /** Optional, verified conditions. Hidden while empty. */
  details?: L10n<string[]>;
  /**
   * Official description supplied by the cooperative. When present, the card
   * shows it directly and drops the generic note and the "ask about this
   * option" link.
   */
  info?: L10n<ProductInfo>;
}

export type SavingsId = "regular" | "endekise" | "child" | "efoyta" | "amana";
export type LoanId =
  | "moti"
  | "gifti"
  | "specialMedium"
  | "specialHigh"
  | "emergency"
  | "teguh"
  | "amanaShort"
  | "amanaMedium"
  | "amanaHigh"
  | "amanaEmergency";

export const savingsProducts: Product<SavingsId>[] = [
  {
    id: "regular",
    icon: PiggyBank,
    info: {
      am: {
        lead: "ማንኛውም የህብረት ሥራ ማህበር አባል በመደበኛነት በቀን ከ30 ብር ጀምሮ የሚቆጠብበት እና ከተከታተለ በኋላ ብድር የሚያገኝበት አገልግሎት ነው።",
      },
      en: {
        lead: "A service in which any member of the cooperative saves regularly, starting from 30 birr a day, and can get a loan after saving consistently.",
      },
    },
  },
  {
    id: "endekise",
    icon: Wallet,
    info: {
      am: {
        lead: "አባላት በፈለጉበት ጊዜ ገንዘብ ገቢ እና ውጪ ማድረግ የሚችሉበት የፍላጎት ቁጠባ አገልግሎት ነው።",
      },
      en: {
        lead: "A voluntary savings service in which members can deposit and withdraw money whenever they wish.",
      },
    },
  },
  {
    id: "child",
    icon: Baby,
    info: {
      am: {
        lead: "አባላት ለልጆቻቸው የሚቆጥቡበት እና በዓመት እስከ 9% የትርፍ ክፍፍል የሚያገኙበት አሠራር ነው።",
      },
      en: {
        lead: "A scheme in which members save for their children and receive a profit share of up to 9% a year.",
      },
    },
  },
  {
    id: "efoyta",
    icon: LifeBuoy,
    info: {
      am: {
        lead: "አባላት ለግብር ታሳቢ አድርገው የሚቆጥቡበት የቁጠባ አማራጭ ነው።",
      },
      en: {
        lead: "A savings option in which members save with tax in mind.",
      },
    },
  },
  {
    id: "amana",
    icon: ShieldCheck,
    info: {
      am: {
        lead: "አባላት በሸሪያ ህግ መሠረት ከወለድ ነፃ የሆነ የቁጠባ አገልግሎት የሚያገኙበት ነው።",
      },
      en: {
        lead: "Members receive an interest-free savings service in line with Sharia law.",
      },
    },
  },
];

export const loanProducts: Product<LoanId>[] = [
  {
    id: "moti",
    icon: Handshake,
    info: {
      am: {
        lead: "የወንዶች ብድር፣ በ30 ቀን ቁጠባ የሚበደርበት አማራጭ ነው።",
      },
      en: {
        lead: "Men's loan: an option where you can borrow after 30 days of saving.",
      },
    },
  },
  {
    id: "gifti",
    icon: HeartHandshake,
    info: {
      am: {
        lead: "የሴቶች ቁጠባ፣ በ25 ቀን ቁጠባ ብቻ ብድር የሚያገኙበት አማራጭ ነው።",
      },
      en: {
        lead: "Women's savings: an option where a loan is available after only 25 days of saving.",
      },
    },
  },
  {
    id: "specialMedium",
    icon: TrendingUp,
    info: {
      am: {
        lead: "መካከለኛ ብድር፣ በ60 ቀን ቁጠባ ብቻ ብድር የሚያገኙበት አማራጭ ነው።",
      },
      en: {
        lead: "Medium loan: an option where a loan is available after only 60 days of saving.",
      },
    },
  },
  {
    id: "specialHigh",
    icon: Landmark,
    info: {
      am: {
        lead: "ከፍተኛ ብድር፣ በ90 ቀን ውስጥ ብድር የሚያገኙበት አማራጭ ነው።",
        facts: [
          { label: "የቀድሞ ቁጠባ ሁኔታ", value: "ለሰዎች (90) ቀናት የብድርን 30% ሳላቋርጡ መቆጠብ" },
          { label: "የብድር ተመለሽ ጊዜ", value: "(365) ሶስት መቶ ስልሳ አምስት ቀናት" },
        ],
        limit: "የብድር ማዕቀ መጠን: እስከ 1,000,000 አንድ ሚሊዮን ብር",
      },
      en: {
        lead: "Large loan: an option where a loan is available within 90 days.",
        facts: [
          { label: "Previous saving requirement", value: "Save 30% of the loan without a break for (90) days" },
          { label: "Repayment period", value: "(365) three hundred and sixty-five days" },
        ],
        limit: "Loan limit: up to 1,000,000 (one million) birr",
      },
    },
  },
  {
    id: "emergency",
    icon: Zap,
    info: {
      am: {
        lead: "የአስቸኳይ ጊዜ ብድር፣ በ7 ቀን አማራጭ የሚገኝ የብድር ዓይነት ነው።",
        facts: [
          { label: "የቀድሞ ቁጠባ ሁኔታ", value: "ከ3-7 ባሉት ቀናት የብድርን 30% ሳላቋርጡ መቆጠብ" },
          { label: "የብድር ተመለሽ ጊዜ", value: "አንድ መቶ (100) ቀናት" },
        ],
        limit: "የብድር ማዕቀ መጠን: ከ50,000 እስከ 300,000 ብር",
      },
      en: {
        lead: "Emergency loan: a type of loan available with a 7-day option.",
        facts: [
          { label: "Previous saving requirement", value: "Save 30% of the loan without a break for 3–7 days" },
          { label: "Repayment period", value: "one hundred (100) days" },
        ],
        limit: "Loan limit: from 50,000 to 300,000 birr",
      },
    },
  },
  {
    id: "teguh",
    icon: Briefcase,
    info: {
      am: {
        lead: "ለሠራተኞች የሚሰጥ ሲሆን፣ በየትኛውም ድርጅት ውስጥ ለሚሠሩ በ3 ወር ቁጠባ ብድር የሚያገኙበት ነው።",
      },
      en: {
        lead: "Given to employees: for people working in any organization, a loan is available after 3 months of saving.",
      },
    },
  },
  {
    id: "amanaShort",
    icon: ShieldCheck,
    info: {
      am: {
        lead: "በሸሪዓ ሕግ መሠረት ከወለድ ነፃ የሆነ ብድር።",
        facts: [
          { label: "የቀድሞ ቁጠባ ሁኔታ", value: "ለአሁኑ ሃያ አምስት ቀናት ብድር በመጠየቅ 25% በመጠኑ እንዲሁም ለወንዶች ሳላቋርጡ ቀናት የብድርን 30% ሳላቋርጡ መቆጠብ።" },
          { label: "የብድር ተመለሽ ጊዜ", value: "100 ቀናት" },
        ],
        limit: "የብድር ማዕቀ መጠን: እስከ 300,000 ሺህ ብር",
      },
      en: {
        lead: "An interest-free loan in line with Sharia law.",
        facts: [
          { label: "Previous saving requirement", value: "For the current twenty-five days, requesting a loan at 25%, and for men saving 30% of the loan without a break." },
          { label: "Repayment period", value: "100 days" },
        ],
        limit: "Loan limit: up to 300,000 thousand birr",
      },
    },
  },
  {
    id: "amanaMedium",
    icon: ShieldCheck,
    info: {
      am: {
        lead: "በሸሪዓ ሕግ መሠረት ከወለድ ነፃ የሆነ ብድር።",
        facts: [
          { label: "የቀድሞ ቁጠባ ሁኔታ", value: "ለአሁኑ (60) ቀናት የብድርን 30% ሳላቋርጡ መቆጠብ።" },
          { label: "የብድር ተመለሽ ጊዜ", value: "200 ቀናት" },
        ],
        limit: "የብድር ማዕቀ መጠን: እስከ 500,000 ሺህ ብር",
      },
      en: {
        lead: "An interest-free loan in line with Sharia law.",
        facts: [
          { label: "Previous saving requirement", value: "For the current (60) days, saving 30% of the loan without a break." },
          { label: "Repayment period", value: "200 days" },
        ],
        limit: "Loan limit: up to 500,000 thousand birr",
      },
    },
  },
  {
    id: "amanaHigh",
    icon: ShieldCheck,
    info: {
      am: {
        lead: "በሸሪዓ ሕግ መሠረት ከወለድ ነፃ የሆነ ብድር።",
        facts: [
          { label: "የቀድሞ ቁጠባ ሁኔታ", value: "ለአሁኑ (90) ቀናት የብድርን 30% ሳላቋርጡ መቆጠብ።" },
          { label: "የብድር ተመለሽ ጊዜ", value: "365 ቀናት" },
        ],
        limit: "የብድር ማዕቀ መጠን: እስከ 1,000,000 ብር",
      },
      en: {
        lead: "An interest-free loan in line with Sharia law.",
        facts: [
          { label: "Previous saving requirement", value: "For the current (90) days, saving 30% of the loan without a break." },
          { label: "Repayment period", value: "365 days" },
        ],
        limit: "Loan limit: up to 1,000,000 birr",
      },
    },
  },
  {
    id: "amanaEmergency",
    icon: ShieldCheck,
    info: {
      am: {
        lead: "በሸሪዓ ሕግ መሠረት ከወለድ ነፃ የሆነ ብድር።",
        facts: [
          { label: "የቀድሞ ቁጠባ ሁኔታ", value: "ከ3-7 ባሉት ቀናት የብድርን 30% ሳላቋርጡ መቆጠብ።" },
          { label: "የብድር ተመለሽ ጊዜ", value: "አንድ መቶ (100) ቀናት" },
        ],
        limit: "የብድር ማዕቀ መጠን: ከ50,000 እስከ 300,000 ብር",
      },
      en: {
        lead: "An interest-free loan in line with Sharia law.",
        facts: [
          { label: "Previous saving requirement", value: "Save 30% of the loan without a break for 3–7 days." },
          { label: "Repayment period", value: "one hundred (100) days" },
        ],
        limit: "Loan limit: from 50,000 to 300,000 birr",
      },
    },
  },
];
