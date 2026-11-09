import { organization as org } from "@/config/organization";
import type { Article, ArticleCategory } from "./types";

/**
 * Articles shown under News/Resources.
 *
 * The four "education" articles below are general financial-literacy
 * material – they make no claims about the cooperative's results, products
 * or policies. Announcements, events and service updates must only be added
 * when the cooperative has actually published them:
 *
 * { slug: "…", category: "announcement", date: "2026-11-01", title: {…}, excerpt: {…}, body: {…} }
 */
export const articles: Article[] = [
  {
    slug: "build-a-saving-habit",
    category: "education",
    title: {
      en: "How to build a saving habit",
      am: "የቁጠባ ልማድን እንዴት መገንባት ይቻላል",
    },
    excerpt: {
      en: "Simple, realistic steps to start saving regularly and keep going.",
      am: "ቁጠባ ለመጀመርና ለመቀጠል የሚረዱ ቀላል እና ተጨባጭ እርምጃዎች።",
    },
    body: {
      en: [
        {
          type: "p",
          text: "A saving habit grows from small, repeated actions. You do not need a large income to begin. What matters most is that you save regularly.",
        },
        { type: "h2", text: "Start with a clear goal" },
        {
          type: "p",
          text: "Decide what you are saving for: an emergency reserve, school costs, a home improvement or capital for a small business. A concrete goal makes it easier to stay motivated.",
        },
        { type: "h2", text: "Save first, then spend" },
        {
          type: "p",
          text: "When income arrives, set aside your saving amount first, rather than saving whatever is left at the end of the month. Choose an amount that you can keep up even in a difficult month.",
        },
        { type: "h2", text: "Keep it simple and regular" },
        {
          type: "ul",
          items: [
            "Choose a fixed day for saving, such as the day you are paid.",
            "Start with a small amount and increase it gradually when you can.",
            "Keep your savings separate from the money you use every day.",
            "Write down your progress so you can see how far you have come.",
          ],
        },
        {
          type: "p",
          text: "A savings and credit cooperative can help you stay disciplined, because saving is something you do together with other members. Contact us to ask about the savings options available to members.",
        },
      ],
      am: [
        {
          type: "p",
          text: "የቁጠባ ልማድ የሚገነባው በትንንሽና በተደጋጋሚ እርምጃዎች ነው። ለመጀመር ከፍተኛ ገቢ አያስፈልግም፤ ዋናው ነገር በየጊዜው መቆጠብ ነው።",
        },
        { type: "h2", text: "ግልጽ ግብ ያስቀምጡ" },
        {
          type: "p",
          text: "ለምን እንደሚቆጥቡ ይወስኑ፦ ለድንገተኛ ሁኔታ መጠባበቂያ፣ ለትምህርት ወጪ፣ ለቤት ማሻሻያ ወይም ለአነስተኛ ንግድ መነሻ ካፒታል። ግልጽ ግብ መኖሩ ለመጽናት ይረዳል።",
        },
        { type: "h2", text: "መጀመሪያ ይቆጥቡ፣ ከዚያ ይጠቀሙ" },
        {
          type: "p",
          text: "ገቢ ሲደርስዎ የወሩ መጨረሻ የተረፈውን ከመቆጠብ ይልቅ መጀመሪያ የቁጠባውን መጠን ለይተው ያስቀምጡ። በአስቸጋሪ ወርም ቢሆን ሊቀጥሉበት የሚችሉትን መጠን ይምረጡ።",
        },
        { type: "h2", text: "ቀላልና ተከታታይ ያድርጉት" },
        {
          type: "ul",
          items: [
            "ለቁጠባ ቋሚ ቀን ይምረጡ፤ ለምሳሌ ደመወዝ የሚከፈልበትን ቀን።",
            "በትንሽ መጠን ይጀምሩ፤ ሲችሉ ቀስ በቀስ ይጨምሩ።",
            "ቁጠባዎን ለዕለታዊ ወጪ ከሚጠቀሙበት ገንዘብ ለይተው ያስቀምጡ።",
            "ምን ያህል እንደሄዱ ለማየት እድገትዎን ይመዝግቡ።",
          ],
        },
        {
          type: "p",
          text: "የቁጠባና ብድር ህብረት ሥራ ማህበር ቁጠባ ከሌሎች አባላት ጋር በጋራ የሚከናወን በመሆኑ ሥነ ሥርዓት ለመያዝ ሊረዳዎ ይችላል። ለአባላት ስለሚቀርቡ የቁጠባ አማራጮች ለመጠየቅ ያግኙን።",
        },
      ],
    },
  },
  {
    slug: "how-a-savings-and-credit-cooperative-works",
    category: "education",
    title: {
      en: "How a savings and credit cooperative works",
      am: "የቁጠባና ብድር ህብረት ሥራ ማህበር እንዴት ይሠራል",
    },
    excerpt: {
      en: "The basics of a financial cooperative that is owned and run by its members.",
      am: "በአባላት የሚተዳደር የገንዘብ ህብረት ሥራ ማህበር መሠረታዊ አሠራር።",
    },
    body: {
      en: [
        {
          type: "p",
          text: "A savings and credit cooperative (often called a SACCO) is a financial cooperative owned and run by its members. Members save regularly, and the pooled savings can be used to offer loans to members.",
        },
        { type: "h2", text: "Owned by its members" },
        {
          type: "p",
          text: "In a cooperative, the people who use the services are also the owners. Members take part in the life of the cooperative, and it is guided by its by-laws and by the law.",
        },
        { type: "h2", text: "Cooperative values" },
        {
          type: "p",
          text: "Cooperatives around the world share values such as self-help, responsibility, democracy, equality, fairness and solidarity. Many also share a concern for the wider community.",
        },
        { type: "h2", text: "What this means for you" },
        {
          type: "ul",
          items: [
            "You join as a member and take part in saving.",
            "You can ask about the loan options offered to members.",
            "You have a say in the cooperative, in line with its rules.",
            "You share responsibility for its success.",
          ],
        },
        {
          type: "p",
          text: `Each cooperative sets its own membership requirements and conditions. Please contact ${org.brandName} to confirm the current details.`,
        },
      ],
      am: [
        {
          type: "p",
          text: "የቁጠባና ብድር ህብረት ሥራ ማህበር (በተለምዶ ሳኮ ተብሎ የሚጠራ) በአባላቱ ባለቤትነትና አስተዳደር የሚሠራ የገንዘብ ህብረት ሥራ ማህበር ነው። አባላት በየጊዜው ይቆጥባሉ፤ የተሰበሰበው ቁጠባም ለአባላት ብድር ለመስጠት ሊያገለግል ይችላል።",
        },
        { type: "h2", text: "በአባላት ባለቤትነት የሚመራ" },
        {
          type: "p",
          text: "በህብረት ሥራ ማህበር አገልግሎቱን የሚጠቀሙ ሰዎች የማህበሩ ባለቤቶችም ናቸው። አባላት በማህበሩ እንቅስቃሴ ይሳተፋሉ፤ ማህበሩም በመተዳደሪያ ደንቡና በሕግ ይመራል።",
        },
        { type: "h2", text: "የህብረት ሥራ እሴቶች" },
        {
          type: "p",
          text: "በዓለም ዙሪያ ያሉ የህብረት ሥራ ማህበራት ራስን መርዳት፣ ኃላፊነት፣ ዲሞክራሲ፣ እኩልነት፣ ፍትሐዊነትና አብሮነት የመሰሉ እሴቶችን ይጋራሉ። ብዙዎችም ለሰፊው ማህበረሰብ የመቆርቆር እሴትን ይጋራሉ።",
        },
        { type: "h2", text: "ይህ ለእርስዎ ምን ማለት ነው" },
        {
          type: "ul",
          items: [
            "በአባልነት ተቀላቅለው በቁጠባ ይሳተፋሉ።",
            "ለአባላት ስለሚቀርቡ የብድር አማራጮች መጠየቅ ይችላሉ።",
            "በማህበሩ ደንብ መሠረት በማህበሩ ውስጥ ድምፅ ይኖርዎታል።",
            "ለማህበሩ ስኬት ኃላፊነት ይጋራሉ።",
          ],
        },
        {
          type: "p",
          text: `እያንዳንዱ ማህበር የራሱን የአባልነት መስፈርቶችና ሁኔታዎች ያወጣል። ወቅታዊ ዝርዝሩን ለማረጋገጥ ${org.names.am}ን ያግኙ።`,
        },
      ],
    },
  },
  {
    slug: "before-you-borrow",
    category: "education",
    title: {
      en: "Before you borrow: questions to ask",
      am: "ከመበደርዎ በፊት፦ ሊጠይቋቸው የሚገቡ ጥያቄዎች",
    },
    excerpt: {
      en: "Key things to understand before you take a loan.",
      am: "ብድር ከመውሰድዎ በፊት ሊያውቋቸው የሚገቡ ዋና ጉዳዮች።",
    },
    body: {
      en: [
        {
          type: "p",
          text: "A loan can help you seize an opportunity or manage an urgent need, but it is also a commitment. Taking a little time to understand it can save you difficulty later.",
        },
        { type: "h2", text: "Ask these questions first" },
        {
          type: "ul",
          items: [
            "How much will I have to repay in total, including any cost of the loan?",
            "What is the repayment period, and how often are repayments due?",
            "Are there any saving or membership requirements before I can apply?",
            "What happens if I am late with a repayment?",
            "What documents or guarantees are required?",
          ],
        },
        { type: "h2", text: "Think about repayment" },
        {
          type: "p",
          text: "Borrow only an amount that you can realistically repay from your regular income. Think about what you would do if your income were lower for a month or two.",
        },
        { type: "h2", text: "Get everything clear" },
        {
          type: "p",
          text: "Ask for the conditions to be explained until you understand them fully. A good financial cooperative will welcome your questions.",
        },
        {
          type: "p",
          text: `For the current loan options and conditions at ${org.brandName}, please contact us.`,
        },
      ],
      am: [
        {
          type: "p",
          text: "ብድር ዕድልን ለመጠቀም ወይም አስቸኳይ ፍላጎትን ለመወጣት ሊረዳ ይችላል፤ ግን ቃል ኪዳንም ነው። ትንሽ ጊዜ ወስደው ማወቅዎ በኋላ ከሚመጣ ችግር ሊታደግዎ ይችላል።",
        },
        { type: "h2", text: "መጀመሪያ እነዚህን ይጠይቁ" },
        {
          type: "ul",
          items: [
            "የብድሩን ወጪ ጨምሮ በአጠቃላይ ምን ያህል መመለስ ይኖርብኛል?",
            "የመመለሻ ጊዜው ምን ያህል ነው? ክፍያውስ በምን ያህል ጊዜ ልዩነት ይፈጸማል?",
            "ከማመልከቴ በፊት የቁጠባ ወይም የአባልነት መስፈርቶች አሉ?",
            "ክፍያ ብዘገይ ምን ይሆናል?",
            "ምን ዓይነት ሰነዶች ወይም ዋስትናዎች ያስፈልጋሉ?",
          ],
        },
        { type: "h2", text: "ስለ መመለስ ያስቡ" },
        {
          type: "p",
          text: "ከመደበኛ ገቢዎ በተጨባጭ መመለስ የሚችሉትን መጠን ብቻ ይበደሩ። ገቢዎ ለአንድ ወይም ሁለት ወር ቢቀንስ ምን እንደሚያደርጉ አስቀድመው ያስቡ።",
        },
        { type: "h2", text: "ሁሉንም ነገር ግልጽ ያድርጉ" },
        {
          type: "p",
          text: "ሁኔታዎቹን ሙሉ በሙሉ እስኪረዱ ድረስ እንዲብራሩልዎ ይጠይቁ። ጥሩ የገንዘብ ህብረት ሥራ ማህበር ጥያቄዎችዎን በደስታ ይቀበላል።",
        },
        {
          type: "p",
          text: `በ${org.names.am} ስላሉ ወቅታዊ የብድር አማራጮችና ሁኔታዎች ለማወቅ ያግኙን።`,
        },
      ],
    },
  },
  {
    slug: "make-a-simple-monthly-budget",
    category: "education",
    title: {
      en: "Making a simple monthly budget",
      am: "ቀላል ወርሃዊ በጀት እንዴት ማዘጋጀት ይቻላል",
    },
    excerpt: {
      en: "A simple way to see where your income goes and make room for saving.",
      am: "ገቢዎ የት እንደሚሄድ ለማየትና ለቁጠባ ቦታ ለማግኘት የሚረዳ ቀላል መንገድ።",
    },
    body: {
      en: [
        {
          type: "p",
          text: "A budget is a plan for your money. It helps you see where your income goes and find room to save.",
        },
        { type: "h2", text: "Three steps" },
        {
          type: "ul",
          items: [
            "List your income for the month: all the money you expect to receive.",
            "List your essential costs first: food, housing, transport, school and health.",
            "Decide how much to save, and treat it as an essential cost.",
          ],
        },
        {
          type: "p",
          text: "Review your budget each month. Small adjustments over time add up.",
        },
      ],
      am: [
        {
          type: "p",
          text: "በጀት የገንዘብዎ እቅድ ነው። ገቢዎ የት እንደሚሄድ ለማየትና ለቁጠባ ቦታ ለማግኘት ይረዳል።",
        },
        { type: "h2", text: "ሦስት እርምጃዎች" },
        {
          type: "ul",
          items: [
            "የወሩን ገቢ ይዘርዝሩ፤ የሚጠብቁትን ገንዘብ በሙሉ።",
            "መጀመሪያ አስፈላጊ ወጪዎችን ይዘርዝሩ፦ ምግብ፣ ቤት፣ መጓጓዣ፣ ትምህርትና ጤና።",
            "ምን ያህል እንደሚቆጥቡ ይወስኑ፤ ቁጠባንም እንደ አስፈላጊ ወጪ ይቁጠሩት።",
          ],
        },
        {
          type: "p",
          text: "በጀትዎን በየወሩ ይከልሱ። በጊዜ ሂደት ትንንሽ ማስተካከያዎች ይደመራሉ።",
        },
      ],
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category);
}

/** Education articles are listed under "Resources"; everything else under "News". */
export function articleListHref(category: ArticleCategory): string {
  return category === "education" ? "/resources" : "/news";
}
