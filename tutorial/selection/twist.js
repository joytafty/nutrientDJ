var w = 1000,
    h = 600,
    r = 12,
    data = d3.range(20).map(Math.random).map(function(x){ return Math.round(x*10) });

var color = d3.scale.category20();

var svg = d3.select("#chart")
    .append("svg")
        .attr("width", w)
        .attr("height", h);

var circles = svg.append("g")
    .selectAll("circle")
        .data(data)
    .enter().append("circle")
        .attr("cx", function(d,i) { return 2*r*i+20; })
        .attr("cy", function(d,i) { return 2*r*i+20; })
        .attr("fill", function(d) { return color(d); })
        .attr("r", r);

circles.sort(d3.descending)
    .transition()
        .duration(800)
        .attr("cx", function(d,i) { return 2*r*i+20; })
        .attr("cy", function(d,i) { return 2*r*i+20; });

circles.filter(function(d) { return d % 2 == 0 })
    .transition()
        .delay(800)
        .duration(800)
        .attr("cx", r);

circles.filter(function(d) { return d % 2 == 1 })
    .transition()
        .delay(800)
        .duration(800)
        .attr("cy", r);
