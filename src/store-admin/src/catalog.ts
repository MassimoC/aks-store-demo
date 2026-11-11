import type { Product } from './types'

type AtelierEntry = Pick<Product, 'name' | 'description' | 'image'>

const atelierCatalog: Record<number, AtelierEntry> = {
  1: { name: 'Fireside Capybara Plush', description: 'A soft capybara companion wrapped in a cranberry knit scarf, created for the Santa\'s Capybara Atelier demo collection.', image: '/products/fireside-capybara-plush.png' },
  2: { name: 'Cocoa Creek Mug', description: 'A cozy illustrated mug design pairing a relaxed capybara with cocoa-time warmth and winter-market charm.', image: '/products/cocoa-creek-mug.png' },
  3: { name: 'Evergreen Capybara Ornament', description: 'A capybara keepsake ornament concept nestled among frosted evergreen branches for the holiday collection.', image: '/products/evergreen-capybara-ornament.png' },
  4: { name: 'Winter Soak Candle', description: 'An amber-glass candle concept with citrus, cedar, and a calm capybara moment on its Atelier label.', image: '/products/winter-soak-candle.png' },
  5: { name: 'Scarlet Sled Capybara', description: 'A cheerful capybara figurine taking a tiny scarlet sled through the winter-market collection.', image: '/products/scarlet-sled-capybara.png' },
  6: { name: 'Snowcap Capybara Socks', description: 'Cream winter socks imagined with capybara faces and quiet snowflake details for cozy seasonal styling.', image: '/products/snowcap-capybara-socks.png' },
  7: { name: 'Holiday Market Tea Tin', description: 'A decorative tea tin concept with a capybara, citrus slices, cinnamon, and a festive market palette.', image: '/products/holiday-market-tea-tin.png' },
  8: { name: 'Capybara Cookie Stamp Set', description: 'A wooden cookie-stamp set with friendly capybara faces and winter leaves for a playful baking table.', image: '/products/capybara-cookie-stamp-set.png' },
  9: { name: 'Little Lantern Capybara', description: 'A small capybara figurine carrying a warm lantern through a softly snowy evening scene.', image: '/products/little-lantern-capybara.png' },
  10: { name: 'Poinsettia Capybara Tote', description: 'A canvas tote design featuring a refined capybara-and-poinsettia illustration for holiday market errands.', image: '/products/poinsettia-capybara-tote.png' },
  11: { name: 'Yuletide Capybara Puzzle', description: 'A 500-piece puzzle concept featuring capybaras enjoying a glowing winter market together.', image: '/products/yuletide-capybara-puzzle.png' },
  12: { name: 'Hearth & Hay Gift Box', description: 'An Atelier gift-box concept bringing together a capybara card, tea, candle, and ornament moment.', image: '/products/hearth-and-hay-gift-box.png' },
  13: { name: 'Capybara Carolers Print', description: 'An art-print scene of capybara carolers singing beside a snow-dusted village kiosk.', image: '/products/capybara-carolers-print.png' },
  14: { name: 'Midnight Pine Capybara Pin', description: 'An enamel-style capybara pin concept framed by midnight blue and evergreen branches.', image: '/products/midnight-pine-capybara-pin.png' },
}

export function presentProduct(product: Product): Product {
  const entry = atelierCatalog[Number(product.id)]
  return entry ? { ...product, ...entry } : product
}
