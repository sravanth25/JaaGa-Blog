import type { Post } from "./types";

export interface SearchResult {
  post: Post;
  score: number;
}

/**
 * Strip HTML tags and entities to ensure search does not falsely match internal CSS classes or tags
 */
export function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Common abbreviations, domain terms, and regional synonyms in Indian real estate records
 */
const SYNONYMS: Record<string, string[]> = {
  "ulc": ["urban land ceiling", "ceiling surplus"],
  "ec": ["encumbrance certificate", "encumbrance"],
  "ror": ["record of rights", "1b", "pahani", "adangal"],
  "fmb": ["field measurement book", "sketch", "subdivision"],
  "lrs": ["layout regularisation", "layout regularization", "regularise"],
  "satbara": ["7/12", "7 12", "utara"],
  "22a": ["22-a", "section 22a", "prohibited", "22 a"],
  "22-a": ["22a", "section 22a", "prohibited", "22 a"],
  "tg": ["telangana", "hyderabad"],
  "ts": ["telangana", "hyderabad"],
  "ap": ["andhra pradesh", "andhra", "amaravati"],
  "tn": ["tamil nadu", "chennai"],
  "ka": ["karnataka", "bangalore", "bengaluru"],
  "mh": ["maharashtra", "mumbai", "pune"],
  "khata": ["ekhata", "e-khata", "bbmp"],
  "mutation": ["name transfer", "patta transfer"],
  "patta": ["chitta", "adangal", "title"],
  "scam": ["bhu bharati", "dispute", "fraud"],
  "poa": ["power of attorney", "gpa", "spa"],
  "gpa": ["general power of attorney", "power of attorney"],
  "spa": ["special power of attorney", "power of attorney"],
  "ptin": ["property tax identification number", "property tax", "vltin"],
  "vltin": ["vacant land tax", "ptin", "open plot"],
  "cure": ["core urban region", "ghmc", "cyberabad", "malkajgiri"],
  "ipic": ["integrated property identity code", "cure"]
};

/**
 * Common typo corrections and phonetic matches
 */
const TYPOS: Record<string, string> = {
  "telengana": "telangana",
  "hyderbad": "hyderabad",
  "encumberance": "encumbrance",
  "registraion": "registration",
  "regularisation": "regularization",
  "regularization": "regularisation",
  "ceeling": "ceiling",
  "surway": "survey",
  "adhart": "aadhaar"
};

/**
 * Normalizes text for case, typos, and common punctuation variations
 */
export function normalizeSearchText(text: string | null | undefined): string {
  if (!text) return "";
  let norm = (typeof text === "string" ? text : String(text)).toLowerCase();

  // Normalize common separators: replace dashes or slashes in known codes like 22-A and 7/12
  for (const [typo, fix] of Object.entries(TYPOS)) {
    norm = norm.replaceAll(typo, fix);
  }
  return norm;
}

export const POPULAR_SEARCH_TOPICS = [
  { label: "ULC Cases", query: "ULC" },
  { label: "22-A Land", query: "22-A" },
  { label: "Encumbrance Certificate", query: "Encumbrance Certificate" },
  { label: "Property Tax", query: "Property Tax" },
  { label: "Patta Chitta", query: "Patta Chitta" },
  { label: "7/12 Utara", query: "7/12" },
  { label: "Land Survey", query: "Land Survey" },
  { label: "Title Verification", query: "Title Verification" },
];

/**
 * Intelligent multi-token scoring search engine
 */
export function searchPosts(query: string, posts: Post[]): Post[] {
  if (!query || !query.trim()) return posts;

  const rawQuery = query.trim().toLowerCase();
  const normalizedQuery = normalizeSearchText(rawQuery);
  const words = normalizedQuery.split(/\s+/).filter(Boolean);

  if (words.length === 0) return posts;

  // Build synonym expansions for the query tokens
  const queryExpansions = new Set<string>(words);
  for (const w of words) {
    if (SYNONYMS[w]) {
      for (const syn of SYNONYMS[w]) {
        for (const sw of syn.split(/\s+/)) {
          if (sw.length > 1) {
            queryExpansions.add(sw);
          }
        }
      }
    }
  }

  const scoredResults: SearchResult[] = [];

  for (const post of posts) {
    const title = normalizeSearchText(post.title || "");
    const excerpt = normalizeSearchText(post.excerpt || "");
    const tags = Array.isArray(post.tags)
      ? post.tags.map(t => normalizeSearchText(t)).join(" ")
      : normalizeSearchText(post.tags || "");
    const keywords = Array.isArray(post.keywords)
      ? post.keywords.join(" ")
      : normalizeSearchText(post.keywords || "");
    const primaryKeyword = normalizeSearchText(post.primaryKeyword || "");
    const category = normalizeSearchText(post.category || "");
    const slug = normalizeSearchText(post.slug || "");
    const cleanContent = normalizeSearchText(stripHtml(post.content || ""));

    let score = 0;
    let matchedWordCount = 0;

    // 1. Full Query Exact Match Bonuses (Highest intent match)
    if (title.includes(normalizedQuery)) score += 160;
    if (primaryKeyword.includes(normalizedQuery)) score += 120;
    if (tags.includes(normalizedQuery)) score += 90;
    if (keywords.includes(normalizedQuery)) score += 70;
    if (slug.includes(normalizedQuery)) score += 50;
    if (excerpt.includes(normalizedQuery)) score += 40;
    if (cleanContent.includes(normalizedQuery)) score += 20;

    // 2. Individual Word Matching
    for (const w of words) {
      let wordMatched = false;

      // Exact word or prefix match in title
      if (title.includes(w)) {
        score += 40;
        wordMatched = true;
      }
      if (primaryKeyword.includes(w)) {
        score += 30;
        wordMatched = true;
      }
      if (tags.includes(w)) {
        score += 25;
        wordMatched = true;
      }
      if (keywords.includes(w)) {
        score += 20;
        wordMatched = true;
      }
      if (slug.includes(w)) {
        score += 20;
        wordMatched = true;
      }
      if (category.includes(w)) {
        score += 20;
        wordMatched = true;
      }
      if (excerpt.includes(w)) {
        score += 15;
        wordMatched = true;
      }
      if (cleanContent.includes(w)) {
        score += 5;
        wordMatched = true;
      }

      if (wordMatched) {
        matchedWordCount++;
      }
    }

    // 3. Synonym & Expansion Matching
    for (const syn of queryExpansions) {
      if (!words.includes(syn)) {
        if (title.includes(syn)) score += 20;
        if (primaryKeyword.includes(syn)) score += 18;
        if (tags.includes(syn)) score += 15;
        if (keywords.includes(syn)) score += 10;
        if (excerpt.includes(syn)) score += 8;
      }
    }

    // 4. Bonus if ALL search words are matched across the post
    if (matchedWordCount === words.length && words.length > 1) {
      score += 60;
    }

    if (score > 0) {
      scoredResults.push({ post, score });
    }
  }

  // Sort by highest relevance score descending
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.map(r => r.post);
}
