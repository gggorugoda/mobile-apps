async function loadApps() {
  const response = await fetch("apps.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("apps.json could not be loaded");
  }
  return response.json();
}

function createImage(src, alt, className, loading = "lazy") {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = loading;
  if (className) image.className = className;
  return image;
}

function renderHero(apps) {
  const hero = document.querySelector("#hero-media");
  hero.textContent = "";
  const heroApps = apps.slice(0, 4);

  for (const [index, app] of heroApps.entries()) {
    const tile = document.createElement("figure");
    tile.className = `hero-tile hero-tile-${index + 1}`;
    tile.append(createImage(app.feature, `${app.name} のメインビジュアル`, "hero-feature", "eager"));

    const caption = document.createElement("figcaption");
    caption.append(
      createImage(app.icon, `${app.name} アイコン`, "hero-app-icon"),
      document.createTextNode(app.name)
    );
    tile.append(caption);
    hero.append(tile);
  }
}

function renderApp(app) {
  const card = document.createElement("article");
  card.className = "app-card";

  const content = document.createElement("div");
  const titleRow = document.createElement("div");
  titleRow.className = "app-title-row";
  titleRow.append(createImage(app.icon, `${app.name} アイコン`, "app-icon"));

  const titleText = document.createElement("div");
  titleText.innerHTML = `
    <p class="app-kicker">${app.category}</p>
    <h3 class="app-title">${app.name}</h3>
  `;
  titleRow.append(titleText);

  const tagline = document.createElement("p");
  tagline.className = "app-tagline";
  tagline.textContent = app.tagline;

  const description = document.createElement("p");
  description.className = "app-description";
  description.textContent = app.description;

  const highlights = document.createElement("ul");
  highlights.className = "highlight-list";
  for (const item of app.highlights) {
    const li = document.createElement("li");
    li.textContent = item;
    highlights.append(li);
  }

  const store = document.createElement("a");
  store.className = "store-button";
  store.href = app.storeUrl;
  store.textContent = "Google Play で見る";
  store.rel = "noopener";

  content.append(titleRow, tagline, description, highlights, store);

  const screenshots = document.createElement("div");
  screenshots.className = "phone-strip";
  for (const src of app.screenshots) {
    screenshots.append(createImage(src, `${app.name} のスクリーンショット`, ""));
  }

  card.append(content, screenshots);
  return card;
}

loadApps()
  .then((data) => {
    const publishedApps = data.apps.filter((app) => app.published);
    const container = document.querySelector("#apps");
    const emptyState = document.querySelector("#empty-state");

    if (!publishedApps.length) {
      emptyState.hidden = false;
      return;
    }

    renderHero(publishedApps);
    container.append(...publishedApps.map(renderApp));
  })
  .catch(() => {
    document.querySelector("#empty-state").hidden = false;
  });
