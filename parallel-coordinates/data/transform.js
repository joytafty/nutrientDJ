function has(id, nuts) {
  return _(nuts).detect(function(d) {
    return d.id == id;
  });
};

function like(str, name) {
  return name.toLowerCase().indexOf(str) != -1;
};

function get(obj, key) {
  if (!obj)
    return null;
  if (key in obj)
    return obj[key];
  else
    return null;
}

var transformed = [];

_(foodgroups).each(function(group) {
  var transformed_group = _(group.foods)
    .chain()
    .filter(function(food) {
      var nuts = food.nutrients;
      return !(like('powder', food.name)) &&
             !(like('dehydrated', food.name)) &&
             !(like('dried', food.name)) &&
             !(like('adobo fresco', food.name)) &&
             !(like('dry', food.name));
      })
    .map(function(food) {
      return {
        name: food.name,
        group: group.name,
        "protein (g)": get(_(food.nutrients).find(function(d) { return d.id == "203" }), 'amount'),
        "calcium (g)": get(_(food.nutrients).find(function(d) { return d.id == "301" }), 'amount') / 1000,      // mg
        "sodium (g)": get(_(food.nutrients).find(function(d) { return d.id == "307" }), 'amount') / 1000,       // mg
        "fiber (g)": get(_(food.nutrients).find(function(d) { return d.id == "291" }), 'amount'),
        "vitaminc (g)": get(_(food.nutrients).find(function(d) { return d.id == "401" }), 'amount') / 1000,     // mg
        "potassium (g)": get(_(food.nutrients).find(function(d) { return d.id == "306" }), 'amount') / 1000,    // mg
        "carbohydrate (g)": get(_(food.nutrients).find(function(d) { return d.id == "205" }), 'amount'),
        "sugars (g)": get(_(food.nutrients).find(function(d) { return d.id == "269" }), 'amount'),
        "fat (g)": get(_(food.nutrients).find(function(d) { return d.id == "204" }), 'amount'),
        "water (g)": get(_(food.nutrients).find(function(d) { return d.id == "255" }), 'amount'),
        "calories": get(_(food.nutrients).find(function(d) { return d.id == "208" }), 'amount'),
        "saturated (g)": get(_(food.nutrients).find(function(d) { return d.id == "606" }), 'amount'),
        "monounsat (g)": get(_(food.nutrients).find(function(d) { return d.id == "645" }), 'amount'),
        "polyunsat (g)": get(_(food.nutrients).find(function(d) { return d.id == "646" }), 'amount'),
//        cholesterol: _(food.nutrients).find(function(d) { return d.id == "601" }).amount,
      }
      })
    .sortBy(function(d) { return d.name; })
    .value();

  transformed = transformed.concat(transformed_group);
});

  $('body').html("var foods= " + JSON.stringify(transformed) + ";");

