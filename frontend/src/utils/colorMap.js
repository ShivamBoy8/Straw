// Maps common product color names (including multi-word names that aren't
// valid CSS keywords, like "Olive Green") to real hex values so swatches
// always render the intended color instead of falling back to white.

const NAMED_COLORS = {
  "olive green": "#6B8E23",
  olive: "#708238",
  "navy blue": "#1B2A4A",
  navy: "#1B2A4A",
  "sky blue": "#87CEEB",
  "royal blue": "#3B5BA5",
  "baby blue": "#AEDFF7",
  "powder blue": "#B0E0E6",
  wine: "#722F37",
  "wine red": "#722F37",
  maroon: "#800000",
  burgundy: "#800020",
  mustard: "#E1AD01",
  "mustard yellow": "#E1AD01",
  "charcoal grey": "#36454F",
  "charcoal gray": "#36454F",
  charcoal: "#36454F",
  "off white": "#F5F5F0",
  "off-white": "#F5F5F0",
  cream: "#FFFDD0",
  ivory: "#FFFFF0",
  beige: "#F5F5DC",
  khaki: "#C3B091",
  rust: "#B7410E",
  coral: "#FF7F50",
  salmon: "#FA8072",
  "mint green": "#98FF98",
  mint: "#98FF98",
  "forest green": "#228B22",
  "bottle green": "#006A4E",
  "sea green": "#2E8B57",
  lavender: "#E6E6FA",
  lilac: "#C8A2C8",
  mauve: "#B784A7",
  peach: "#FFDAB9",
  teal: "#008080",
  turquoise: "#40E0D0",
  magenta: "#FF00FF",
  "hot pink": "#FF69B4",
  "baby pink": "#F4C2C2",
  "steel grey": "#71797E",
  "steel gray": "#71797E",
  "ash grey": "#B2BEB5",
  "ash gray": "#B2BEB5",
  "chocolate brown": "#3B2412",
  chocolate: "#3B2412",
  coffee: "#4B3621",
  camel: "#C19A6B",
  tan: "#D2B48C",
  sand: "#C2B280",
  gold: "#D4AF37",
  silver: "#C0C0C0",
  black: "#000000",
  white: "#FFFFFF",
};

export const resolveColor = (name) => {
  if (!name) return "#d9d9d9";

  const key = String(name).trim().toLowerCase();

  if (NAMED_COLORS[key]) return NAMED_COLORS[key];

  // Some names might be valid CSS colors once spaces are stripped
  // (e.g. "Sky Blue" isn't a keyword, but this still catches edge cases
  // where the source data is already a clean single-word color).
  const noSpace = key.replace(/\s+/g, "");

  if (typeof CSS !== "undefined" && CSS.supports?.("color", noSpace)) {
    return noSpace;
  }

  if (typeof CSS !== "undefined" && CSS.supports?.("color", key)) {
    return key;
  }

  // Unknown color name — neutral fallback instead of invisible/white.
  return "#d9d9d9";
};

export default resolveColor;
