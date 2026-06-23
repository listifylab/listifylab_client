/**
 * Myntra field mappings
 * All map functions accept the raw catalogue value and return the Myntra-accepted value.
 * Custom tenant mappings (uploaded via admin) override these defaults at runtime.
 */

// ── Color ─────────────────────────────────────────────────────────────────────
export const MYNTRA_COLOR_MAPPING = {
  // Blues
  'Navy Blue': 'Navy Blue',
  'Navy': 'Navy Blue',
  'Dark Blue': 'Navy Blue',
  'Royal Blue': 'Blue',
  'Cobalt Blue': 'Blue',
  'Sky Blue': 'Light Blue',
  'Baby Blue': 'Light Blue',
  'Powder Blue': 'Light Blue',
  'Teal Blue': 'Teal',
  'Steel Blue': 'Blue',
  'Midnight Blue': 'Navy Blue',
  'Denim Blue': 'Blue',
  'Electric Blue': 'Blue',
  'Indigo': 'Indigo',
  'Prussian Blue': 'Blue',

  // Reds & Pinks
  'Scarlet': 'Red',
  'Crimson': 'Red',
  'Cherry Red': 'Red',
  'Tomato Red': 'Red',
  'Brick Red': 'Red',
  'Maroon': 'Maroon',
  'Burgundy': 'Burgundy',
  'Wine': 'Burgundy',
  'Magenta': 'Pink',
  'Fuchsia': 'Pink',
  'Hot Pink': 'Pink',
  'Baby Pink': 'Pink',
  'Blush': 'Pink',
  'Rose': 'Pink',
  'Dusty Rose': 'Pink',
  'Coral': 'Coral',
  'Salmon': 'Coral',
  'Peach': 'Peach',

  // Greens
  'Olive': 'Olive',
  'Olive Green': 'Olive',
  'Sage': 'Green',
  'Sage Green': 'Green',
  'Mint': 'Green',
  'Mint Green': 'Green',
  'Forest Green': 'Green',
  'Bottle Green': 'Green',
  'Emerald': 'Green',
  'Emerald Green': 'Green',
  'Lime Green': 'Green',
  'Sea Green': 'Green',
  'Teal': 'Teal',
  'Turquoise': 'Turquoise',
  'Khaki': 'Khaki',

  // Yellows & Oranges
  'Mustard': 'Yellow',
  'Mustard Yellow': 'Yellow',
  'Lemon Yellow': 'Yellow',
  'Golden Yellow': 'Yellow',
  'Amber': 'Orange',
  'Burnt Orange': 'Orange',
  'Rust': 'Orange',
  'Terracotta': 'Orange',
  'Saffron': 'Orange',
  'Mango': 'Orange',

  // Neutrals
  'Ivory': 'Off White',
  'Cream': 'Off White',
  'Off White': 'Off White',
  'Beige': 'Beige',
  'Ecru': 'Beige',
  'Camel': 'Beige',
  'Tan': 'Beige',
  'Sand': 'Beige',
  'Nude': 'Beige',
  'Taupe': 'Beige',
  'Mushroom': 'Beige',
  'Stone': 'Grey',
  'Charcoal': 'Charcoal',
  'Charcoal Grey': 'Charcoal',
  'Dark Grey': 'Charcoal',
  'Light Grey': 'Grey',
  'Silver': 'Silver',
  'Ash Grey': 'Grey',
  'Slate Grey': 'Grey',
  'Mauve': 'Mauve',
  'Lavender': 'Lavender',
  'Lilac': 'Lavender',
  'Purple': 'Purple',
  'Violet': 'Purple',
  'Plum': 'Purple',
  'Brown': 'Brown',
  'Chocolate': 'Brown',
  'Coffee': 'Brown',
  'Chestnut': 'Brown',
  'Caramel': 'Brown',
  'Copper': 'Copper',
  'Bronze': 'Copper',
  'Gold': 'Gold',
  'Black': 'Black',
  'White': 'White',
  'Multi': 'Multicolor',
  'Multicolor': 'Multicolor',
  'Multi-Color': 'Multicolor',
  'Printed': 'Multicolor',
};

export function mapMyntraColor(color = '') {
  return MYNTRA_COLOR_MAPPING[color] || color;
}

// ── Fabric ────────────────────────────────────────────────────────────────────
export const MYNTRA_FABRIC_MAPPING = {
  'Cotton': 'Cotton',
  '100% Cotton': 'Cotton',
  'Pure Cotton': 'Cotton',
  'Cotton Blend': 'Cotton Blend',
  'Cotton Lycra': 'Cotton Lycra',
  'Cotton Linen': 'Cotton Linen',
  'Linen': 'Linen',
  'Viscose': 'Viscose',
  'Viscose Rayon': 'Viscose Rayon',
  'Rayon': 'Rayon',
  'Crepe': 'Crepe',
  'Georgette': 'Georgette',
  'Chiffon': 'Chiffon',
  'Satin': 'Satin',
  'Silk': 'Silk',
  'Pure Silk': 'Silk',
  'Art Silk': 'Art Silk',
  'Polyester': 'Polyester',
  'Poly Crepe': 'Poly Crepe',
  'Nylon': 'Nylon',
  'Spandex': 'Lycra',
  'Lycra': 'Lycra',
  'Jersey': 'Jersey',
  'Knit': 'Knit',
  'Denim': 'Denim',
  'Velvet': 'Velvet',
  'Lace': 'Lace',
  'Net': 'Net',
  'Organza': 'Organza',
  'Jacquard': 'Jacquard',
  'Brocade': 'Brocade',
  'Modal': 'Modal',
  'Bamboo': 'Bamboo',
  'Tencel': 'Tencel',
  'Slub Cotton': 'Slub Cotton',
  'Dobby': 'Dobby',
};

export function mapMyntraFabric(fabric = '') {
  return MYNTRA_FABRIC_MAPPING[fabric] || fabric;
}

export const MYNTRA_FABRIC_TYPE_MAPPING = {
  'Cotton': 'Woven',
  'Linen': 'Woven',
  'Viscose': 'Woven',
  'Rayon': 'Woven',
  'Crepe': 'Woven',
  'Georgette': 'Woven',
  'Chiffon': 'Woven',
  'Satin': 'Woven',
  'Silk': 'Woven',
  'Polyester': 'Woven',
  'Denim': 'Woven',
  'Jersey': 'Knit',
  'Knit': 'Knit',
  'Lycra': 'Knit',
  'Spandex': 'Knit',
  'Cotton Lycra': 'Knit',
};

export function mapMyntraFabricType(fabric = '') {
  for (const [key, type] of Object.entries(MYNTRA_FABRIC_TYPE_MAPPING)) {
    if (fabric.toLowerCase().includes(key.toLowerCase())) return type;
  }
  return 'Woven';
}

// ── Occasion ──────────────────────────────────────────────────────────────────
export const MYNTRA_OCCASION_MAPPING = {
  'Casual': 'Casual',
  'Everyday': 'Casual',
  'Daily Wear': 'Casual',
  'Formal': 'Formal',
  'Office': 'Formal',
  'Work': 'Formal',
  'Semi Formal': 'Semi-Formal',
  'Semi-Formal': 'Semi-Formal',
  'Party': 'Party',
  'Evening': 'Party',
  'Cocktail': 'Party',
  'Festive': 'Festive',
  'Ethnic': 'Ethnic',
  'Traditional': 'Ethnic',
  'Wedding': 'Wedding',
  'Bridal': 'Wedding',
  'Vacation': 'Vacation',
  'Resort': 'Vacation',
  'Beach': 'Vacation',
  'Sports': 'Sports',
  'Active': 'Sports',
  'Gym': 'Sports',
  'Loungewear': 'Lounge',
  'Lounge': 'Lounge',
  'Home': 'Lounge',
  'Maternity': 'Maternity',
  'College': 'Casual',
};

export function mapOccasion(occasion = '') {
  return MYNTRA_OCCASION_MAPPING[occasion] || occasion;
}

// ── Season ────────────────────────────────────────────────────────────────────
export function mapSeason(season = '') {
  const s = season.toLowerCase();
  if (s.includes('summer') || s.includes('spring')) return 'Summer';
  if (s.includes('winter') || s.includes('fall') || s.includes('autumn')) return 'Winter';
  if (s.includes('all') || s.includes('year')) return 'All Season';
  return 'All Season';
}

// ── Neckline ──────────────────────────────────────────────────────────────────
export const MYNTRA_NECKLINE_MAPPING = {
  'Round Neck': 'Round Neck',
  'Round': 'Round Neck',
  'V Neck': 'V Neck',
  'V-Neck': 'V Neck',
  'U Neck': 'U Neck',
  'U-Neck': 'U Neck',
  'Square Neck': 'Square Neck',
  'Boat Neck': 'Boat Neck',
  'Boat': 'Boat Neck',
  'Off Shoulder': 'Off-Shoulder',
  'Off-Shoulder': 'Off-Shoulder',
  'Collar': 'Collar',
  'Shirt Collar': 'Shirt Collar',
  'Band Collar': 'Band Collar',
  'Mandarin Collar': 'Mandarin Collar',
  'Halter': 'Halter Neck',
  'Halter Neck': 'Halter Neck',
  'Cowl': 'Cowl Neck',
  'Cowl Neck': 'Cowl Neck',
  'Sweetheart': 'Sweetheart',
  'Keyhole': 'Keyhole',
  'High Neck': 'High Neck',
  'Turtle Neck': 'Turtle Neck',
  'Mock Neck': 'Mock Neck',
  'Scoop': 'Scoop Neck',
  'Scoop Neck': 'Scoop Neck',
  'Strapless': 'Strapless',
  'One Shoulder': 'One Shoulder',
  'Asymmetric': 'Asymmetric',
};

export function mapNeckline(neck = '') {
  return MYNTRA_NECKLINE_MAPPING[neck] || neck;
}

// ── Pattern ───────────────────────────────────────────────────────────────────
export const MYNTRA_PATTERN_MAPPING = {
  'Solid': 'Solid',
  'Plain': 'Solid',
  'Printed': 'Printed',
  'Floral': 'Floral',
  'Floral Print': 'Floral',
  'Abstract': 'Abstract',
  'Geometric': 'Geometric',
  'Stripes': 'Striped',
  'Striped': 'Striped',
  'Checks': 'Checked',
  'Checked': 'Checked',
  'Checkered': 'Checked',
  'Polka Dots': 'Polka Dots',
  'Dots': 'Polka Dots',
  'Animal Print': 'Animal Print',
  'Leopard': 'Animal Print',
  'Zebra': 'Animal Print',
  'Camouflage': 'Camouflage',
  'Camo': 'Camouflage',
  'Embroidered': 'Embroidered',
  'Self Design': 'Self Design',
  'Self-Design': 'Self Design',
  'Textured': 'Textured',
  'Woven': 'Woven Design',
  'Jacquard': 'Woven Design',
  'Paisley': 'Paisley',
  'Ethnic Print': 'Ethnic Motifs',
  'Tropical': 'Tropical',
  'Color Block': 'Colorblock',
  'Colour Block': 'Colorblock',
  'Tie Dye': 'Tie & Dye',
  'Ombre': 'Ombre',
  'Degradé': 'Ombre',
};

export function mapPattern(pattern = '') {
  return MYNTRA_PATTERN_MAPPING[pattern] || pattern;
}

// ── Closure ───────────────────────────────────────────────────────────────────
export const MYNTRA_CLOSURE_MAPPING = {
  'Zip': 'Zip',
  'Zipper': 'Zip',
  'Button': 'Button',
  'Buttons': 'Button',
  'Hook': 'Hook and Eye',
  'Hook and Eye': 'Hook and Eye',
  'Lace Up': 'Lace Up',
  'Tie Up': 'Tie Up',
  'Elastic': 'Elastic',
  'Pull On': 'Pull On',
  'Pullover': 'Pull On',
  'Slip On': 'Slip On',
  'No Closure': 'Slip On',
  'Drawstring': 'Drawstring',
  'Velcro': 'Velcro',
  'Snap': 'Snap Button',
  'Snap Button': 'Snap Button',
};

export function mapClosure(closure = '') {
  return MYNTRA_CLOSURE_MAPPING[closure] || closure;
}

// ── Wash Care ─────────────────────────────────────────────────────────────────
export const MYNTRA_WASH_CARE_MAPPING = {
  'Machine Wash': 'Machine Wash',
  'Machine Washable': 'Machine Wash',
  'Hand Wash': 'Hand Wash',
  'Hand Washable': 'Hand Wash',
  'Dry Clean': 'Dry Clean Only',
  'Dry Clean Only': 'Dry Clean Only',
  'Gentle Wash': 'Gentle Machine Wash',
  'Cold Wash': 'Cold Machine Wash',
  'Warm Wash': 'Warm Machine Wash',
  'Do Not Wash': 'Do Not Wash',
  'Spot Clean': 'Spot Clean',
};

export function mapWashCare(washCare = '') {
  return MYNTRA_WASH_CARE_MAPPING[washCare] || washCare || 'Hand Wash';
}

// ── Sleeve ────────────────────────────────────────────────────────────────────
export const MYNTRA_SLEEVE_MAPPING = {
  'Sleeveless': 'Sleeveless',
  'Short Sleeve': 'Short Sleeves',
  'Short Sleeves': 'Short Sleeves',
  'Half Sleeve': 'Short Sleeves',
  'Half Sleeves': 'Short Sleeves',
  '3/4 Sleeve': '3/4 Sleeve',
  '3/4 Sleeves': '3/4 Sleeve',
  'Full Sleeve': 'Full Sleeves',
  'Full Sleeves': 'Full Sleeves',
  'Long Sleeve': 'Full Sleeves',
  'Long Sleeves': 'Full Sleeves',
  'Flutter Sleeve': 'Flutter Sleeves',
  'Puff Sleeve': 'Puff Sleeves',
  'Cap Sleeve': 'Cap Sleeves',
  'Bell Sleeve': 'Bell Sleeves',
  'Bishop Sleeve': 'Bishop Sleeves',
  'Spaghetti': 'Spaghetti Strap',
};
