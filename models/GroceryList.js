unit: { 
  type: String, 
  required: true, 
  enum: [
    'mg', 'g', 'kg', 'oz', 'lb',
    'ml', 'l', 'tsp', 'tbsp', 'cup', 'pt', 'qt', 'gal', 'fl oz',
    'piece', 'clove', 'slice', 'can', 'pack', 'bunch', 'stick', 'head', 'bottle', 'jar',
    'medium', 'large', 'bag', 'box', 't', 'c'
  ]
}, 