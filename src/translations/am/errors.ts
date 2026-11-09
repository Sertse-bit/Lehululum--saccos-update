import type { Dictionary } from "../en";

export const errors: Dictionary["errors"] = {
  notFound: {
    code: "404",
    title: "ገጹ አልተገኘም",
    text: "የሚፈልጉት ገጽ የለም ወይም ቦታው ተቀይሮ ሊሆን ይችላል። እባክዎ አድራሻውን ያረጋግጡ ወይም ወደ መነሻ ገጽ ይመለሱ።",
    suggestions: "ምናልባት የሚፈልጉት፦",
  },
  failure: {
    title: "የሆነ ችግር ተፈጥሯል",
    text: "ይህን ገጽ በመጫን ላይ ሳለ ያልተጠበቀ ችግር ተከስቷል። እባክዎ እንደገና ይሞክሩ።",
  },
};
