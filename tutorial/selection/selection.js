var w = 600,
    h = 100;

var color = d3.scale.category10();

var svg = d3.select("#chart")
    .append("svg")
        .attr("width", w)
        .attr("height", h);

var circles = svg.append("g")
    .selectAll("circle")
        .data([1,2,3,4,5,6,7,8,9,10])
    .enter().append("circle")
        .attr("cx", function(d,i) { return (h/4)*i+20; })
        .attr("cy", h/2)
        .attr("fill", function(d) { return color(d); })
        .attr("r", h/8);

circles.sort(d3.descending)
    .transition()
        .duration(500)
        .attr("cx", function(d,i) { return (h/4)*i+20; });

circles.filter(function(d) { return d % 2 == 0 })
    .transition()
        .delay(500)
        .duration(500)
        .attr("cy", h/2+20)
    .transition()
        .delay(1000)
        .duration(500)
        .attr("fill", "#333")
    .transition()
        .delay(1500)
        .duration(500)
        .attr("cy", h/2);

circles.filter(function(d) { return d % 2 == 1 })
    .transition()
        .delay(1500)
        .duration(500)
        .attr("fill", "#999");

circles.transition()
    .delay(2000)
    .duration(2000)
    .attr("fill", function(d) { return color(d); });
