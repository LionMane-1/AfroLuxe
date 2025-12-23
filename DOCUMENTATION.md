# Afro Hair Lux Marketing - Technical Specification & Handover

## 1. URL Restructuring & Routing Requirements
To ensure maximum SEO visibility and "link juice" retention, the application transitioned from state-only navigation to a synchronized **Path-Based Routing System**.

### Requirements:
- **Clean URLs**: Elimination of hash-based routing (`/#/blog`) in favor of standard directory structures (`/blog`).
- **Deep Linking**: Direct access to articles (e.g., `/blog/30-minute-wash-day-routine-for-afro-hair`) must resolve to the correct React component state.
- **History API Integration**: Use of `window.history.pushState` to maintain Single Page Application (SPA) performance while updating the browser's address bar.
- **State Synchronization**: A centralized `navigate` function in `App.tsx` that updates both the internal `currentPage` state and the browser's `pathname`.
- **Server-Side Rewrites (Multi-Platform Fixes Applied)**: 
  - **Vercel**: `vercel.json` ensures all requests route to root.
  - **Netlify/Cloudflare**: `_redirects` handles the 200 rewrite for all paths.
  - **Google Cloud (Firebase)**: `firebase.json` configured with rewrites to `index.html`.
  - **Google Cloud (App Engine)**: `app.yaml` handlers configured to serve `index.html` for all non-static file routes.

### Implementation:
The `App.tsx` file contains the `PAGE_TO_PATH` and `PATH_TO_PAGE` mapping objects. A `normalizePath` helper strips trailing slashes to ensure robust lookups. A `popstate` event listener handles browser back/forward buttons, ensuring the UI stays in sync with the URL.

---

## 2. Schema Integration Strategy (JSON-LD)
We have implemented a multi-layered Schema.org integration to enhance Search Engine Results Page (SERP) performance and facilitate "Rich Snippets."

### Integration Method:
- **Dynamic Injection**: Schema objects are defined as JSON constants within the relevant Page components (`BlogPage.tsx`, `BlogPost_TimeAudit.tsx`).
- **JSON-LD Blocks**: These objects are stringified and injected into the DOM via `<script type="application/ld+json">` tags within the component's render cycle.
- **Graph Structure**: Where applicable, `@graph` arrays are used to link the `Organization`, `WebSite`, `WebPage`, and `BlogPosting` entities together, providing search engines with a clear semantic map of the site.

### Specific Schemas Deployed:
1.  **Blog Index Schema (`/blog`)**: Defines the collection of articles and the publishing organization.
2.  **Individual BlogPosting Schema**: Applied to specific articles, including `wordCount`, `datePublished`, and `author` details.
3.  **BreadcrumbList Schema**: Implemented globally on the blog path to enable breadcrumb navigation trails in Google search results.

---

## 3. Sitemap & Indexing
A standard XML sitemap has been deployed at the root directory (`/sitemap.xml`).

### Included Endpoints:
- Homepage
- Primary Service Pillars
- Blog Index
- Individual Article Slugs

### Maintenance:
When adding new blog posts or service areas, the `sitemap.xml` file must be manually updated in the project root to include the new `<url>` nodes. In a CI/CD environment, this can be automated via a post-build script that parses the `PAGE_TO_PATH` object in `App.tsx`.

---

## 4. Expected Deliverables (Implemented)

### A. High-Conversion Blog Index
- **Visuals**: Responsive card-based layout with category badges and hover animations.
- **SEO**: Fully optimized for "Afro hair marketing tips" and "Salon growth strategies."
- **Functionality**: Synchronized navigation to deep-linked articles.

### B. Bespoke Article Template
- **Content**: Optimized for "30-Minute Wash Day Routine" (high-intent search term).
- **Engagement**: Integrated CTAs for the "Time-Audit" app and lead magnets.
- **Interactive Elements**: Breadcrumb navigation and share functionality.

### C. Site-Wide Infrastructure
- **Global Header/Footer**: Updated to support path-based links.
- **Theme Support**: Full dark/light mode compatibility for all blog elements.
- **Performance**: Preloader integration for smooth initial resource loading.

---

## 5. Maintenance & Scaling
New blog posts should be added to the `BlogPost` interface in `pages/BlogPage.tsx` and the `Page` enum in `types.ts`. Ensure that the `PAGE_TO_PATH` map in `App.tsx` is updated for every new URL slug created.