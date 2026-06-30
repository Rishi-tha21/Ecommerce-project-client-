const normalizeText = (text = "") => text.toString().toLowerCase().trim();

const tokenize = (text = "") =>
  normalizeText(text).split(/\s+/).filter(Boolean);

const categoryAliases = {
  men: ["men", "man", "mens", "male", "boy", "boys"],
  women: ["women", "woman", "womens", "female", "girl", "girls"],
  kid: ["kid", "kids", "children", "child", "boys", "girls"],
};

const getCategoryToken = (token) => {
  if (!token) return null;
  const normalized = normalizeText(token);
  return (
    Object.entries(categoryAliases).find(([_, aliases]) =>
      aliases.includes(normalized),
    )?.[0] || null
  );
};

const buildSearchTags = (product) => {
  const tokens = new Set([
    normalizeText(product.category || ""),
    normalizeText(product.brand || ""),
    ...tokenize(product.name),
    ...tokenize(product.description || ""),
  ]);
  if (product.category === "women") {
    tokens.add("women");
    tokens.add("female");
  }
  if (product.category === "men") {
    tokens.add("men");
    tokens.add("male");
  }
  if (product.category === "kid") {
    tokens.add("kids");
    tokens.add("children");
  }
  return [...tokens].filter(Boolean);
};

export const enhanceProductForSearch = (product) => {
  const category = normalizeText(product.category || "");
  const brand =
    product.brand ||
    (category === "women"
      ? "FemmeCo"
      : category === "men"
        ? "Maverick"
        : "TinyTrend");
  const description =
    product.description ||
    `${product.name} is a premium ${category} style from ${brand}.`;
  const tags =
    Array.isArray(product.tags) && product.tags.length
      ? product.tags
      : buildSearchTags({ ...product, brand, description });

  return {
    ...product,
    category,
    brand: normalizeText(brand),
    description: normalizeText(description),
    tags: tags.map((tag) => normalizeText(tag)),
  };
};

const matchScore = (fieldValue = "", token) => {
  if (!token || !fieldValue) return 0;
  const field = normalizeText(fieldValue);
  if (field === token) return 6;
  if (field.includes(token)) return 3;
  return 0;
};

export const getSearchScore = (product, query) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;
  const tokens = tokenize(normalizedQuery);
  const enhanced = enhanceProductForSearch(product);
  const categoryTag = tokens.map(getCategoryToken).find(Boolean);

  let score = 0;
  tokens.forEach((token) => {
    score += matchScore(enhanced.name, token) * 5;
    score += matchScore(enhanced.category, token) * 4;
    score += matchScore(enhanced.brand, token) * 3;
    score += matchScore(enhanced.description, token) * 2;
    if (enhanced.tags.some((tag) => tag.includes(token))) {
      score += 3;
    }
    if (categoryTag && enhanced.category !== categoryTag) {
      score -= 4;
    }
  });

  if (tokens.every((token) => normalizeText(enhanced.name).includes(token))) {
    score += 2;
  }

  return score;
};

const escapeRegExp = (text = "") => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getSearchResults = (products, query) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return products;

  const tokens = tokenize(normalizedQuery);
  const categoryToken = tokens.map(getCategoryToken).find(Boolean);

  const scored = products
    .map((product) => ({
      product,
      score: getSearchScore(product, normalizedQuery),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  if (scored.length > 0) {
    return scored;
  }

  const categoryFallback = categoryToken
    ? products.filter(
        (product) => normalizeText(product.category) === categoryToken,
      )
    : [];

  if (categoryFallback.length > 0) {
    return categoryFallback;
  }

  return products.filter((product) => {
    const enhanced = enhanceProductForSearch(product);
    return tokens.some((token) => {
      return (
        normalizeText(enhanced.name).includes(token) ||
        normalizeText(enhanced.description).includes(token) ||
        normalizeText(enhanced.brand).includes(token) ||
        normalizeText(enhanced.category).includes(token) ||
        enhanced.tags.some((tag) => tag.includes(token))
      );
    });
  });
};

export const getSearchSuggestions = (products, query, limit = 5) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const tokens = tokenize(normalizedQuery);
  const suggestions = [];
  const seen = new Set();

  products.forEach((product) => {
    const enhanced = enhanceProductForSearch(product);
    const score = tokens.reduce((sum, token) => {
      let local = 0;
      local += matchScore(enhanced.name, token) * 4;
      local += matchScore(enhanced.brand, token) * 2;
      local += matchScore(enhanced.category, token) * 2;
      if (enhanced.tags.some((tag) => tag.includes(token))) local += 1;
      if (enhanced.description.includes(token)) local += 1;
      return sum + local;
    }, 0);

    if (score > 0) {
      const suggestion = product.name || enhanced.name;
      if (suggestion && !seen.has(suggestion)) {
        seen.add(suggestion);
        suggestions.push({ suggestion, score });
      }
    }
  });

  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.suggestion);
};
