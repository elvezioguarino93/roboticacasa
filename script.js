function normalizeValue(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function calculateRelatedScore(current, article) {
  const currentTags = current.tags.map(normalizeValue);
  const articleTags = article.tags.map(normalizeValue);
  const currentTitle = normalizeValue(current.title);
  const articleTitle = normalizeValue(article.title);
  const articleCategory = normalizeValue(article.category);

  let score = 0;

  articleTags.forEach((tag) => {
    if (currentTags.includes(tag)) score += 3;
    if (currentTitle.includes(tag)) score += 2;
  });

  if (articleTitle.includes("robot rasaerba")) score += 2;
  if (articleTitle.includes("senza filo perimetrale")) score += 3;
  if (articleTitle.includes("economico")) score += 2;
  if (
    articleCategory.includes("confronto") ||
    articleCategory.includes("recensione") ||
    articleCategory.includes("guida")
  ) {
    score += 1;
  }

  score += (article.popularity || 0) / 100;
  return score;
}

function renderRelatedArticles(currentArticle, allArticles, containerId, limit = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sortedArticles = [...allArticles]
    .filter((article) => article.href !== currentArticle.href)
    .map((article) => ({
      ...article,
      relatedScore: calculateRelatedScore(currentArticle, article),
    }))
    .sort((a, b) => b.relatedScore - a.relatedScore)
    .slice(0, limit);

  container.innerHTML = sortedArticles
    .map(
      (article, index) => `
        <a class="article-list-item" href="${article.href}">
          <div class="rank">${index + 1}</div>
          <div>
            <div class="mini-meta">${article.category}</div>
            <div class="mini-title">${article.title}</div>
          </div>
        </a>
      `
    )
    .join("");
}

const allArticles = [
  {
    title: "Miglior robot rasaerba economico senza filo perimetrale nel 2026: le esperienze reali di chi lo usa ogni giorno",
    category: "Recensione",
    href: "articoli/miglior-robot-rasaerba-economico-senza-filo-perimetrale-2026.html",
    popularity: 286,
    tags: ["robot rasaerba", "senza filo perimetrale", "economico", "testimonianze", "buying guide", "giardini piccoli"],
  },
  {
    title: "Robot rasaerba economico senza filo perimetrale: errori da evitare prima dell’acquisto",
    category: "Guida acquisto",
    href: "articoli/errori-da-evitare-prima-dell-acquisto.html",
    popularity: 119,
    tags: ["robot rasaerba", "senza filo perimetrale", "economico", "buying guide", "errori"],
  },
  {
    title: "Robot rasaerba economico senza filo perimetrale per piccoli giardini: i migliori modelli da 100 a 500 mq",
    category: "Piccoli giardini",
    href: "articoli/migliori-modelli-piccoli-giardini-100-500-mq.html",
    popularity: 94,
    tags: ["robot rasaerba", "senza filo perimetrale", "economico", "giardini piccoli", "modelli"],
  },
  {
    title: "Robot rasaerba economico senza filo perimetrale o con filo: quale conviene davvero?",
    category: "Confronto",
    href: "articoli/senza-filo-o-con-filo-quale-conviene.html",
    popularity: 77,
    tags: ["robot rasaerba", "senza filo perimetrale", "economico", "confronto", "filo perimetrale"],
  },
  {
    title: "Segway Navimow i105E recensione: vale davvero la pena per un piccolo prato?",
    category: "Recensione prodotto",
    href: "articoli/segway-navimow-i105e-recensione.html",
    popularity: 88,
    tags: ["robot rasaerba", "senza filo perimetrale", "Segway Navimow", "economico", "giardini piccoli"],
  },
  {
    title: "MOVA 600 o Navimow i105E: quale scegliere nel 2026?",
    category: "Confronto modelli",
    href: "articoli/mova-600-o-navimow-i105e.html",
    popularity: 81,
    tags: ["robot rasaerba", "senza filo perimetrale", "MOVA 600", "Segway Navimow", "confronto"],
  },
];
