# Santa's Capybara Atelier Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the conference-demo storefront and admin into Santa's Capybara Atelier with a coherent, image-led 14-product holiday catalog.

**Architecture:** Keep the existing Rust product API and two Vue 3 applications. Replace the product-service seed catalog and host generated square product assets in the storefront public directory; both apps continue consuming the same root-relative image paths. Use an approved composition as the storefront's fidelity reference, while the admin uses the shared tokens in an operational layout.

**Tech Stack:** Rust/Actix Web, Vue 3, TypeScript, Pinia, Vue Router, Sass, Vitest, Playwright, built-in image generation.

**Spec:** `docs/superpowers/specs/2026-11-11-santas-capybara-atelier-design.md`

## Global Constraints

- Treat this as a conference showcase, not a transactional store; do not make payment, fulfillment, stock, safety, testimonial, or delivery claims.
- Preserve existing product, cart, product CRUD, and order-management API flows.
- Seed exactly the fourteen specified Santa's Capybara Atelier records and locally serve each generated image.
- Storefront is comp-first; admin is code-first and task-first.
- Keep all interactive controls keyboard-accessible, responsive, and respectful of reduced-motion preferences.
- Remap checked-in fixtures to Atelier product records; persisted orders remain historical.

## Review Focus

- Product API returns 14 complete Atelier records, each with a unique ID and existing local image path; pin in Task 1.
- Product cards and admin rows handle long seasonal descriptions without overlap or loss of the primary action; pin in Tasks 4 and 6.
- Empty cart and unavailable-product paths remain helpful rather than crashing after the visual rewrite; pin in Task 5.
- Mobile navigation, tables, and forms remain operable at 390px; pin in Tasks 4 and 6 via Playwright viewport assertions.
- Completing a demonstration order retains the existing API behavior and uses demo-safe labels; pin in Task 6.

---

## File structure

- `src/product-service/src/data.rs` — canonical 14-item capybara catalog returned by the API.
- `src/product-service/tests/base_product_service.rs` — product API catalog contract coverage.
- `src/store-front/public/products/*.png` — generated catalog product images, one per seed record.
- `src/store-front/src/assets/styles.scss` — shared Atelier storefront tokens, typography, layout, responsive and reduced-motion rules.
- `src/store-front/src/{App.vue,components/TopNav.vue,components/ProductCard.vue,views/*.vue}` — storefront shell and complete browse/detail/cart UI.
- `src/store-front/src/components/__tests__/TopNav.spec.ts` and `src/store-front/e2e/vue.spec.ts` — navigation and customer-flow assertions.
- `src/store-admin/src/assets/styles.scss` — Atelier Console tokens and base operational patterns.
- `src/store-admin/src/{App.vue,components/TopNav.vue,views/*.vue}` — admin shell, inventory and order screens.
- `src/store-admin/src/components/__tests__/TopNav.spec.ts` and `src/store-admin/e2e/vue.spec.ts` — admin navigation and operational-route assertions.
- `.impeccable/mocks/`, `.impeccable/build/`, `.impeccable/review/` — comp-first source, measured build state, and screenshot evidence.

### Task 1: Replace and verify the catalog contract

**Files:**
- Modify: `src/product-service/src/data.rs`
- Modify: `src/product-service/tests/base_product_service.rs`

**Interfaces:**
- Produces: `fetch_products(&Settings) -> Vec<Product>` with IDs `1..=14`, exact Atelier names, prices, descriptions, and `/products/<slug>.png` paths.
- Consumed by: both Vue product stores and admin order product lookup.

- [ ] **Step 1: Write a failing product-catalog integration test**

Extend `test_get_all_products` to assert `products.len() == 14`, product IDs are unique, every name contains the intended Atelier catalog value, every description is non-empty, and every image begins with `/products/`.

- [ ] **Step 2: Run the product test to verify it fails**

Run: `cargo test --test base_product_service test_get_all_products`

Expected: FAIL because the old catalog names and paths do not match.

- [ ] **Step 3: Replace `fetch_products` in `src/product-service/src/data.rs`**

Seed the fourteen exact records from the design spec, preserving `Product { id, name, price, description, image }` and using concise demo-safe copy.

- [ ] **Step 4: Run the focused catalog test and full product-service test suite**

Run: `cargo test --test base_product_service`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/product-service/src/data.rs src/product-service/tests/base_product_service.rs
git commit -m "feat: seed Santa's Capybara Atelier catalog"
```

### Task 2: Generate and verify the catalog imagery

**Files:**
- Create: `src/store-front/public/products/fireside-capybara-plush.png`
- Create: `src/store-front/public/products/cocoa-creek-mug.png`
- Create: `src/store-front/public/products/evergreen-capybara-ornament.png`
- Create: `src/store-front/public/products/winter-soak-candle.png`
- Create: `src/store-front/public/products/scarlet-sled-capybara.png`
- Create: `src/store-front/public/products/snowcap-capybara-socks.png`
- Create: `src/store-front/public/products/holiday-market-tea-tin.png`
- Create: `src/store-front/public/products/capybara-cookie-stamp-set.png`
- Create: `src/store-front/public/products/little-lantern-capybara.png`
- Create: `src/store-front/public/products/poinsettia-capybara-tote.png`
- Create: `src/store-front/public/products/yuletide-capybara-puzzle.png`
- Create: `src/store-front/public/products/hearth-and-hay-gift-box.png`
- Create: `src/store-front/public/products/capybara-carolers-print.png`
- Create: `src/store-front/public/products/midnight-pine-capybara-pin.png`

**Interfaces:**
- Consumes: the exact image briefs in the design spec.
- Produces: fourteen square, opaque, locally hosted catalog images with root-relative paths matching Task 1.

- [ ] **Step 1: Create one structured product-mockup prompt per catalog item**

Use the built-in image generator. Every prompt must name the item’s capybara subject, warm editorial holiday-market studio art direction, square catalog composition, and “no text, no logos, no watermark.”

- [ ] **Step 2: Generate and inspect all fourteen images**

Inspect for a visible capybara, product clarity, no illegible text, no inappropriate content, consistent warm palette, and no accidental branding; regenerate only targeted failures.

- [ ] **Step 3: Move final selected images into `src/store-front/public/products/` and embed prompt provenance**

Create the directory if needed; ensure each final filename exactly matches Task 1’s image path. Run the Impeccable prompt scan before proceeding.

- [ ] **Step 4: Verify the generated assets exist and are non-empty**

Run: `Get-ChildItem src/store-front/public/products/*.png | Measure-Object`

Expected: 14 assets; each is visually inspected and has its image-generator provenance recorded.

- [ ] **Step 5: Commit**

```bash
git add src/store-front/public/products
git commit -m "feat: add capybara Atelier catalog imagery"
```

### Task 3: Approve the storefront composition and build reference

**Files:**
- Create: `.impeccable/mocks/` approved storefront comps and prompt sidecars
- Create: `.impeccable/build/` measured comp specification and region map

**Interfaces:**
- Consumes: selected Atelier direction, Task 2 imagery, and Impeccable comp-first workflow.
- Produces: one user-approved desktop storefront composition and build-phase state used by Tasks 4–5.

- [ ] **Step 1: Generate three distinct first-viewport storefront comps**

Use the selected premium winter-market visual system. Each comp must make Santa's Capybara Atelier, a clear browse/add-to-cart action, and product imagery intelligible in the first viewport.

- [ ] **Step 2: Present the comps and record the user-approved composition**

Save the selected comp’s prompt sidecar with `"approved": true`; start the Impeccable comp-led build phase with the selected asset.

- [ ] **Step 3: Measure and map all first-viewport regions**

Run `impeccable comp-spec` and `font-match` as prescribed; label all imagery as plates and inspect the region map before coding.

- [ ] **Step 4: Produce required plate assets and pass the plates gate**

Generate/store individual plates at the required resolution and verify alpha/placement before any first-viewport UI code.

### Task 4: Rebuild the storefront catalog experience

**Files:**
- Modify: `src/store-front/src/assets/styles.scss`
- Modify: `src/store-front/src/App.vue`
- Modify: `src/store-front/src/components/TopNav.vue`
- Modify: `src/store-front/src/components/ProductCard.vue`
- Modify: `src/store-front/src/views/ProductListView.vue`
- Modify: `src/store-front/src/views/ProductDetailView.vue`
- Modify: `src/store-front/src/components/__tests__/TopNav.spec.ts`
- Modify: `src/store-front/e2e/vue.spec.ts`

**Interfaces:**
- Consumes: `Product` from the existing Pinia store and Task 1 image paths.
- Produces: accessible branded header, product grid/detail actions, reusable currency display, and mobile-safe catalog UI.

- [ ] **Step 1: Write failing storefront navigation and catalog-flow tests**

Update `TopNav.spec.ts` to expect “Santa’s Capybara Atelier,” a `/` collection link and `/cart` link. Add Playwright assertions that `/` presents the brand and a product card, a card opens `/product/:id`, and its add-to-cart action is reachable.

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `npm run test:unit -- --run src/components/__tests__/TopNav.spec.ts` in `src/store-front`, then `npm run test:e2e`.

Expected: FAIL against the old navigation and generic product UI.

- [ ] **Step 3: Implement Atelier storefront tokens and first viewport from the approved comp**

Build from mapped plates and measured regions first, then extend the same evergreen, cranberry, parchment, brass, and editorial hierarchy to the full catalog. Use semantic landmarks, visible focus states, `prefers-reduced-motion`, meaningful image alt text, and responsive grid rules.

- [ ] **Step 4: Implement product card and detail states**

Retain existing routes and Pinia cart API. Make the card’s image/title link keyboard-operable, display prices consistently, constrain description copy, and keep quantity/add actions clear.

- [ ] **Step 5: Run storefront test, type, and build checks**

Run: `npm run test:unit -- --run`, `npm run build`, and `npm run test:e2e` in `src/store-front`.

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/store-front/src src/store-front/e2e
git commit -m "feat: build Atelier storefront catalog"
```

### Task 5: Rebuild the storefront cart experience

**Files:**
- Modify: `src/store-front/src/views/ShoppingCartView.vue`
- Modify: `src/store-front/e2e/vue.spec.ts`

**Interfaces:**
- Consumes: existing `useCartStore()` methods and `/api/orders` request shape.
- Produces: cart states that remain demo-safe and responsive without changing order submission payloads.

- [ ] **Step 1: Write failing cart-state browser tests**

Update the existing `/cart` test to expect a branded empty-cart heading and a “Browse the collection” action. Add a populated-cart test that verifies quantity controls, remove action, total, and demo-safe order language.

- [ ] **Step 2: Run the cart tests to verify they fail**

Run: `npm run test:e2e` in `src/store-front`.

Expected: FAIL because current copy and layout lack the branded states.

- [ ] **Step 3: Implement the cart layout and microcopy**

Keep totals and API behavior intact; replace real-commerce language such as “Proceed to Checkout” and “Shipping: Free” with honest demo-order labels. Stack or reflow columns at narrow widths without clipping controls.

- [ ] **Step 4: Run full storefront verification**

Run: `npm run build` and `npm run test:e2e` in `src/store-front`.

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/store-front/src/views/ShoppingCartView.vue src/store-front/e2e/vue.spec.ts
git commit -m "feat: refine Atelier demo cart"
```

### Task 6: Rebuild the Atelier Console admin experience

**Files:**
- Modify: `src/store-admin/src/assets/styles.scss`
- Modify: `src/store-admin/src/components/TopNav.vue`
- Modify: `src/store-admin/src/views/ProductListView.vue`
- Modify: `src/store-admin/src/views/ProductDetailView.vue`
- Modify: `src/store-admin/src/views/ProductFormView.vue`
- Modify: `src/store-admin/src/views/OrderListView.vue`
- Modify: `src/store-admin/src/views/OrderDetailView.vue`
- Modify: `src/store-admin/src/components/__tests__/TopNav.spec.ts`
- Modify: `src/store-admin/e2e/vue.spec.ts`

**Interfaces:**
- Consumes: existing product/order Pinia stores and routes, including `/api/product`, `/api/makeline/order/fetch`, and `/api/makeline/order`.
- Produces: an operational, responsive branded admin that preserves product editing and order completion.

- [ ] **Step 1: Write failing admin navigation and route tests**

Update `TopNav.spec.ts` to assert “Atelier Console,” `/orders`, and `/products`. Replace the obsolete root E2E expectation with route-level assertions for inventory and orders, including a 390px viewport check for operable navigation.

- [ ] **Step 2: Run the focused admin tests to verify they fail**

Run: `npm run test:unit -- --run src/components/__tests__/TopNav.spec.ts` and `npm run test:e2e` in `src/store-admin`.

Expected: FAIL because current test copy and the old workshop shell no longer match.

- [ ] **Step 3: Implement admin global tokens, shell, and navigation**

Create a quiet evergreen/parchment/brass frame, compact masthead, predictable active links, focus styles, and accessible mobile menu. Remove decorative snowfall and emoji-only identity.

- [ ] **Step 4: Implement inventory views and form hierarchy**

Add image thumbnails and readable inventory metadata to product lists/details; retain all existing input IDs, fetch methods, validation, AI-assist controls, and CRUD payloads. Make long descriptions wrap or clamp appropriately.

- [ ] **Step 5: Implement order list/detail hierarchy**

Keep order-completion behavior intact while relabeling money/shipping sections as demo content. Render missing product lookup defensively and retain keyboard/focus visibility.

- [ ] **Step 6: Run admin test, type, and build checks**

Run: `npm run test:unit -- --run`, `npm run build`, and `npm run test:e2e` in `src/store-admin`.

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/store-admin/src src/store-admin/e2e
git commit -m "feat: build Atelier Console admin"
```

### Task 7: Perform visual verification and finalize design evidence

**Files:**
- Create/modify: `.impeccable/review/desktop.png`
- Create/modify: `.impeccable/review/mobile.png`
- Create/modify: `DESIGN.md`
- Create/modify: `.impeccable/design.json`

**Interfaces:**
- Consumes: built frontend routes, approved storefront comp and comp spec.
- Produces: captured responsive evidence, detector results, final review disposition, and durable visual-system documentation.

- [ ] **Step 1: Capture and inspect desktop and mobile storefront/admin states**

Exercise browse, detail, cart empty/populated, admin inventory, product edit, order list/detail, loading/error, hover, focus, and menu states. Save valid 1440px and 390px captures under `.impeccable/review/`.

- [ ] **Step 2: Run the comp fidelity and detector checks**

Run `impeccable comp-diff` for the approved storefront comp and `impeccable detect --json` on changed frontend files. Fix mechanical failures in one batch.

- [ ] **Step 3: Run the fresh finish review and act on its disposition**

Provide the reviewer the original request, design, direction contract, captures, detector output, comp/build evidence, and craft-floor reference. Recapture, rebuild, or fix only as instructed; record a ship disposition only when the reviewer says ship.

- [ ] **Step 4: Document the approved system and run final verification**

Create the token-bearing `DESIGN.md` and `.impeccable/design.json` with the documented-direction workflow. Re-run all three project builds, targeted E2E suites, and product-service tests after final changes.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md .impeccable src docs
git commit -m "docs: record Santa's Capybara Atelier system"
```

## Self-review

- Spec coverage: Tasks 1–2 implement the catalog and local images; Task 3 provides the required comp-first reference; Tasks 4–5 cover all customer journeys; Task 6 covers the admin; Task 7 supplies responsive, a11y, detector, and final-review evidence.
- Step scan: each implementation task begins with a failing test or explicit visual gate and ends with the focused verification command.
- Type consistency: product records retain the existing Rust `Product` schema and Vue `Product` interface; no API or route name changes are introduced.
- Review Focus: every listed likely failure has a specific owning task and test/check.
- Proportion: the plan records boundaries, contracts, concrete tests, assets, and gates without prescribing component bodies.
