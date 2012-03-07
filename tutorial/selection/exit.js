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
        .attr("fill-opacity", 1)
        .attr("r", h/8);

circles.data([1,2,6,7], function(d) { return d; })
    .exit()
        .transition()
            .remove()
            .duration(500)
            .attr("fill-opacity", 0);
