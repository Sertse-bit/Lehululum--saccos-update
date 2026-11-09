import type { Dictionary } from "../en";

export const forms: Dictionary["forms"] = {
  fields: {
    name: "ሙሉ ስም",
    phone: "ስልክ ቁጥር",
    email: "ኢሜይል አድራሻ",
    topic: "ጥያቄዎ ስለ ምንድን ነው?",
    subject: "ርዕሰ ጉዳይ",
    message: "መልዕክት",
    optional: "(አስገዳጅ አይደለም)",
    required: "አስፈላጊ",
  },

  placeholders: {
    name: "ሙሉ ስምዎ",
    phone: "09XX XXX XXX",
    email: "name@example.com",
    subject: "አጭር ርዕሰ ጉዳይ",
    message: "መልዕክትዎን እዚህ ይጻፉ",
  },

  topics: {
    general: "አጠቃላይ ጥያቄ",
    savings: "ቁጠባ",
    loans: "ብድር",
    membership: "አባልነት",
    employment: "የሥራ ዕድል",
    partnership: "አጋርነት",
    other: "ሌላ",
  },

  validation: {
    summaryTitle: "እባክዎ የሚከተሉትን ያስተካክሉ፦",
    required: "ይህ መስክ መሞላት አለበት።",
    nameShort: "እባክዎ ሙሉ ስምዎን ያስገቡ።",
    phoneInvalid:
      "ትክክለኛ ስልክ ቁጥር ያስገቡ፤ ለምሳሌ 0911234567 ወይም +251911234567።",
    emailInvalid: "ትክክለኛ የኢሜይል አድራሻ ያስገቡ፤ ለምሳሌ name@example.com።",
    contactRequired: "እንድናገኝዎ ስልክ ቁጥር ወይም የኢሜይል አድራሻ ያስገቡ።",
    subjectShort: "እባክዎ ርዕሰ ጉዳይ ያስገቡ።",
    messageShort: "እባክዎ ቢያንስ 10 ፊደላት ይጻፉ።",
    messageLong: "እባክዎ መልዕክትዎን ከ2,000 ፊደላት በታች ያድርጉ።",
  },

  submitPrepare: "መልዕክቴን አዘጋጅ",
  submitSend: "መልዕክት ላክ",
  helpPrepare:
    "በሚቀጥለው ደረጃ መልዕክትዎን እንዴት እንደሚልኩ (በኢሜይል ወይም በዋትስአፕ) ይመርጣሉ። ይህ ድረ-ገጽ መልዕክቱን አያከማችም።",
  helpSend: "«ላክ» ሲጫኑ መልዕክትዎ ወደ ማህበሩ ይላካል።",
  sending: "በመላክ ላይ…",

  prepared: {
    title: "መልዕክትዎ ለመላክ ዝግጁ ነው",
    text: "ይህ ድረ-ገጽ መልዕክቶችን አያከማችም፤ በራሱም አይልክም። መልዕክትዎን እንዴት መላክ እንደሚፈልጉ ይምረጡ፦",
    email: "በኢሜይል መተግበሪያዬ ክፈት",
    whatsapp: "በዋትስአፕ ላክ",
    copy: "መልዕክቱን ቅዳ",
    copied: "መልዕክቱ ተቀድቷል።",
    copyFailed:
      "በራስ-ሰር መቅዳት አልተቻለም። እባክዎ ከታች ያለውን ጽሑፍ መርጠው ይቅዱ።",
    edit: "መልዕክቴን አስተካክል",
    callInstead: "መደወል ይመርጣሉ? ይደውሉልን፦",
  },

  sent: {
    title: "መልዕክቱ ተልኳል",
    text: "እናመሰግናለን። መልዕክትዎ ወደ ማህበሩ ተልኳል።",
    another: "ሌላ መልዕክት ይጻፉ",
  },

  failed: {
    title: "መልዕክትዎን መላክ አልቻልንም",
    text: "እባክዎ ግንኙነትዎን አረጋግጠው እንደገና ይሞክሩ፤ ወይም ከታች ባሉት አማራጮች በቀጥታ ያግኙን።",
  },

  compose: {
    website: "ከድረ-ገጽ የተላከ መልዕክት",
    name: "ስም",
    phone: "ስልክ",
    email: "ኢሜይል",
    topic: "ርዕስ",
    subject: "ርዕሰ ጉዳይ",
    message: "መልዕክት",
    subjectContact: "ከድረ-ገጽ የመጣ ጥያቄ",
    subjectMembership: "የአባልነት ጥያቄ",
    subjectComplaint: "ቅሬታ / አስተያየት",
    greeting: "ሰላም፣",
  },

  honeypot: "ይህን መስክ ባዶ ይተዉት",
};
