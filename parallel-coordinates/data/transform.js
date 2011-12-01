function has(id, nuts) {
  return _(nuts).detect(function(d) {
    return d.id == id;
  });
};

function like(str, name) {
  return name.toLowerCase().indexOf(str) != -1;
};

var transformed = [];

_(foodgroups).each(function(group) {
  var transformed_group = _(group.foods)
    .chain()
    .filter(function(food) {
      var nuts = food.nutrients;
      return has(203, nuts) && // Protein
             has(301, nuts) && // Calcium
             has(307, nuts) && // Sodium
             has(291, nuts) && // Fiber
             has(401, nuts) && // Vitamin C
             has(306, nuts) && // Potassium
             has(205, nuts) && // Carboyhdrate
             has(204, nuts) && // Fat
             has(269, nuts) && // Sugars
             has(255, nuts) && // Water
             has(208, nuts) && // Calories
             has(606, nuts) && // Saturated
             has(645, nuts) && // Monounsaturated
             has(646, nuts) && // Polyunsaturated
//             has(601, nuts) && // Cholesterol
             !(like('powder', food.name)) &&
             !(like('dehydrated', food.name)) &&
             !(like('dried', food.name)) &&
             !(like('adobo fresco', food.name)) &&
             !(like('dry', food.name));
      })
    .map(function(food) {
      return {
        name: food.name,
        group: group.name,
        "protein (g)": _(food.nutrients).find(function(d) { return d.id == "203" }).amount,
        "calcium (mg)": _(food.nutrients).find(function(d) { return d.id == "301" }).amount,
        "sodium (mg)": _(food.nutrients).find(function(d) { return d.id == "307" }).amount,
        "fiber (g)": _(food.nutrients).find(function(d) { return d.id == "291" }).amount,
        "vitaminc (mg)": _(food.nutrients).find(function(d) { return d.id == "401" }).amount,
        "potassium (mg)": _(food.nutrients).find(function(d) { return d.id == "306" }).amount,
        "carbohydrate (g)": _(food.nutrients).find(function(d) { return d.id == "205" }).amount,
        "sugars (g)": _(food.nutrients).find(function(d) { return d.id == "269" }).amount,
        "fat (g)": _(food.nutrients).find(function(d) { return d.id == "204" }).amount,
        "water (g)": _(food.nutrients).find(function(d) { return d.id == "255" }).amount,
        "calories (g)": _(food.nutrients).find(function(d) { return d.id == "208" }).amount,
        "saturated (g)": _(food.nutrients).find(function(d) { return d.id == "606" }).amount,
        "monounsat (g)": _(food.nutrients).find(function(d) { return d.id == "645" }).amount,
        "polyunsat (g)": _(food.nutrients).find(function(d) { return d.id == "646" }).amount,
//        cholesterol: _(food.nutrients).find(function(d) { return d.id == "601" }).amount,
      }
      })
    .sortBy(function(d) { return d.name; })
    .value();

  transformed = transformed.concat(transformed_group);
});

  $('body').html("var foods= " + JSON.stringify(transformed) + ";");

