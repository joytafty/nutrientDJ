(function(d3) {

  window.piechart = function(model) {
    var self = {};

    var data = old_data = _(model.get('filtered'))
                            .chain()
                            .groupBy('group')
                            .map(function(v,k) {
                              return  v.length
                            })
                            .value();

    console.log(data);

    var w = 100,
        h = 100,
        r = Math.min(w, h) / 2,
        color = d3.scale.category20(),
        donut = d3.layout.pie().sort(null),
        arc = d3.svg.arc().innerRadius(r - 30).outerRadius(r - 6);

    var svg = d3.select("#pie").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
      .append("svg:g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var arcs = svg.selectAll("path")
        .data(donut(data))
      .enter().append("svg:path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc)
        .each(function(d) { this._current = d; });

    self.update =  function(data) {
      arcs = arcs.data(donut(data));
      arcs.transition().duration(750).attrTween("d", arcTween);
    };

    // Store the currently-displayed angles in this._current.
    // Then, interpolate from this._current to the new angles.
    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }
    return self;
  };
  
})(d3);
