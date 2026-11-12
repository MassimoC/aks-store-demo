# Santa's Capybara Atelier — Design

## Intent

Transform AKS Store Demo into a memorable conference showcase named **Santa's Capybara Atelier**. The customer-facing store should feel like a premium, festive winter market where every product is a capybara-themed holiday collectible. The admin should make the same catalog feel operationally credible and effortless to demonstrate.

This is a demonstration application, not a real shop. It must clearly support browsing, cart, catalog management, and demo-order workflows without making claims about payment, shipping, availability, safety, or delivery.

## Goals

- Establish one distinctive holiday identity across `store-front`, `store-admin`, and seeded product data.
- Ship at least 12 locally served, AI-generated capybara product images and matching, believable catalog copy.
- Make the storefront an inviting, high-impact first screen for a conference attendee.
- Make the admin a highly scannable operator surface for live product and order demonstrations.
- Preserve the existing API contracts and product/cart/CRUD/order flows.

## Non-goals

- No checkout, payment, inventory, shipping, testimonial, or product-safety claims that imply real commerce.
- No changes to the deployment topology, service boundaries, or public API shape unless needed to serve the new local image assets.
- No reuse of the old nautical, pet-toy, or cloud-mascot catalog content.

## Constraints

- Both Vue applications consume products from the same Rust product service.
- Product images must be created with the built-in image generator, saved into the project, and referenced by seeded product records.
- The storefront is comp-first; its approved visual composition is the fidelity reference before implementation.
- The admin remains code-first and prioritizes task clarity over decorative expression.
- Maintain responsive, keyboard-accessible controls and meaningful image alt text.

## Approaches considered

1. **Santa's Capybara Atelier — selected.** A premium winter-market identity using deep evergreen, berry red, warm cream, brass, wood, wrapping paper, and editorial product imagery. It makes capybaras charming without turning the admin into a novelty UI.
2. **Santa's Capybara Supply Co.** A North Pole logistics/workshop aesthetic. Stronger comic energy, but its packaging-and-label language would compete with admin content.
3. **Capybara Noel.** A restrained European boutique. Elegant but too quiet for a conference demo.

The selected approach is the user's choice. The visual-direction seed was recorded as `seed:a1a0e4f1bf54524e`; the explicit user choice takes precedence over the seed assignment.

## Visual direction

### Storefront — Persuade

- Name: **Santa's Capybara Atelier**.
- Opening: a holiday-market storefront with a strong seasonal welcome, a short demo-safe statement, a clear path into the catalog, and featured capybara imagery.
- Visual grammar: deep pine surfaces; cranberry accents; parchment/cream reading areas; restrained brass highlights; generous editorial type; warm wood and woven paper texture supplied through generated imagery rather than CSS imitation.
- Product browsing: image-led cards with concise names, price, short description, quantity control, and a clear add-to-cart action. Product detail and cart extend the same visual system.
- Copy: use phrasing such as “Atelier collection” and “demo collection”; never imply a real fulfillment promise.
- Motion: a single restrained seasonal reveal on first load and clear state transitions; respect reduced motion.
- Responsive: preserve readable hierarchy and usable cart/product controls at 390px and standard desktop widths.

### Admin — Operate

- A composed evergreen-and-parchment back office with a compact branded masthead and a clear “Atelier Console” identity.
- Retain familiar list, detail, add/edit, and order-management patterns. Use density, robust table/list layout, visible focus states, and strong status hierarchy.
- Brand expression stays in the frame, typography, color tokens, and product thumbnails—not in distracting animation or unconventional task controls.

## Product catalog

The product service will seed these fourteen synthetic Atelier collectibles. All prices are demo values in the existing numeric format.

| ID | Product | Price | Image brief |
| --- | --- | ---: | --- |
| 1 | Fireside Capybara Plush | 24.00 | Soft capybara plush in a cranberry knit scarf beside pine boughs |
| 2 | Cocoa Creek Mug | 18.00 | Ceramic mug with a capybara illustration, cocoa and marshmallows |
| 3 | Evergreen Capybara Ornament | 14.00 | Hand-painted capybara ornament on a frosted fir branch |
| 4 | Winter Soak Candle | 22.00 | Amber glass candle with a capybara label, orange and cedar styling |
| 5 | Scarlet Sled Capybara | 28.00 | Capybara figurine riding a tiny red wooden sled |
| 6 | Snowcap Capybara Socks | 16.00 | Folded cream socks with subtle capybara-and-snowflake pattern |
| 7 | Holiday Market Tea Tin | 19.00 | Illustrated tea tin, capybara with citrus and cinnamon accents |
| 8 | Capybara Cookie Stamp Set | 20.00 | Wooden cookie-stamp set shaped like capybara faces and winter leaves |
| 9 | Little Lantern Capybara | 26.00 | Small capybara figurine carrying a warm lantern in snow |
| 10 | Poinsettia Capybara Tote | 21.00 | Canvas tote with refined capybara-and-poinsettia illustration |
| 11 | Yuletide Capybara Puzzle | 25.00 | Boxed 500-piece puzzle featuring a capybara holiday market scene |
| 12 | Hearth & Hay Gift Box | 32.00 | Curated gift box with capybara card, tea, candle, and ornament |
| 13 | Capybara Carolers Print | 17.00 | Art print of capybaras singing beside a snowy village kiosk |
| 14 | Midnight Pine Capybara Pin | 12.00 | Enamel-style capybara pin against a midnight evergreen backdrop |

Each record receives a compact factual-style description: material/design intent, what is included when applicable, and its seasonal character. Copy will identify the collection as a demo where appropriate and will omit unverified claims.

## Image strategy

- Generate one square editorial catalog image per product using a consistent warm studio/holiday-market art direction, no rendered text, logos, or watermarks.
- Use capybaras as the focal subject in every image; physical product forms remain clear enough to make the catalog believable.
- Store final assets in `src/store-front/public/products/` so the product service can serve stable root-relative paths to both apps.
- Review every generated image for subject, composition, text artifacts, visual consistency, and safe use before wiring it into data.

## Implementation outline

1. Generate and approve a storefront composition, then use it as the comp-first fidelity reference.
2. Generate, inspect, and place the fourteen product assets; replace product-service seed records and descriptions.
3. Rebuild storefront shell, catalog cards, product detail, cart, visual tokens, and responsive states around the approved direction.
4. Rebuild admin shell, navigation, inventory lists/details/forms, and order views with Atelier Console tokens and operational hierarchy.
5. Run builds, unit/e2e checks, accessibility/responsive inspection, and a final design review before handoff.

## Implementation call: existing demo orders

Any checked-in demo-order fixtures, test data, and display expectations that refer to replaced products will be remapped to the Atelier catalog. Existing persisted orders in an already-running database are outside this visual/catalog rebrand and remain historical records; the live demo should use a clean or refreshed demo dataset when a fully coherent order view is required.

## Decisions left to the builder

- Exact generated asset prompts, typography selection, and exact token values, provided they uphold the selected visual direction.
- The hero composition details, selected from comp-first visual options before implementation.
- Exact copy lengths and microcopy, provided demo-safe language and the catalog intent are preserved.
