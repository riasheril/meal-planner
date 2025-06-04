// Unit normalization map
const unitMap = {
  grams: 'g', gram: 'g', g: 'g',
  kilograms: 'kg', kilogram: 'kg', kg: 'kg',
  milliliters: 'ml', milliliter: 'ml', ml: 'ml',
  liters: 'l', liter: 'l', l: 'l',
  cups: 'cup', cup: 'cup', cups: 'cup',
  tablespoons: 'tbsp', tablespoon: 'tbsp', tbsp: 'tbsp', tbsps: 'tbsp',
  teaspoons: 'tsp', teaspoon: 'tsp', tsp: 'tsp', tsps: 'tsp',
  ounces: 'oz', ounce: 'oz', oz: 'oz',
  pounds: 'lb', pound: 'lb', lb: 'lb', lbs: 'lb',
  pieces: 'piece', piece: 'piece', pieces: 'piece',
  cloves: 'clove', clove: 'clove', cloves: 'clove',
  slices: 'slice', slice: 'slice', slices: 'slice',
  cans: 'can', can: 'can', cans: 'can',
  packs: 'pack', pack: 'pack', packs: 'pack',
  bunches: 'bunch', bunch: 'bunch', bunches: 'bunch',
  sticks: 'stick', stick: 'stick', sticks: 'stick',
  heads: 'head', head: 'head', heads: 'head',
  bottles: 'bottle', bottle: 'bottle', bottles: 'bottle',
  jars: 'jar', jar: 'jar', jars: 'jar',
  pts: 'pt', pt: 'pt',
  qts: 'qt', qt: 'qt',
  gals: 'gal', gal: 'gal',
  'fl oz': 'fl oz',
  servings: null, // Not a valid grocery unit
  serving: null,  // Not a valid grocery unit
  '': null        // Empty unit is not valid
};

function normalizeUnit(input) {
  if (!input) return null;
  const normalized = unitMap[input.toLowerCase().trim()];
  return typeof normalized !== 'undefined' ? normalized : input.toLowerCase().trim();
}

module.exports = { normalizeUnit }; 