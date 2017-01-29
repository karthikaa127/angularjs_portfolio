d3_skills= function (skillset) {
  console.log(skillset);
  var margin = 5;
  var w = parseInt(d3.select("#chart").style("width")) - margin*2;
  var h = parseInt(d3.select("#chart").style("height")) - margin*2;
  var barPadding = 1;
  var yScale = d3.scaleLinear()
        .range([0, h])
        .domain([60, 0]);

  var svg = d3.select("svg")
              .attr("width", w)
              .attr("height", h);

  svg.selectAll("rect")
     .data(skillset)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
          return i * (w / skillset.length);
      })
      .attr("y", function(d) {
          return h - (d.percent);  //Height minus data value
      })
     .attr("width", w / skillset.length - barPadding)
     .attr("height", function(d) {
          return d.percent;
      })
      .attr("fill", function(d) {
          return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
      });

  svg.selectAll("text")
      .data(skillset)
      .enter()
      .append("text")
      .text(function(d) {
          return d.skill;
      })
      .attr("x", function(d, i) {
          return 15 + i*(w/skillset.length+ (barPadding*2)) + ((w/skillset.length - skillset[i].skill.length)/2);
      })
      .attr("y", function(d) {
          return h - (d.percent) + 14;  //15 is now 14
      })
      .attr("text-anchor", "middle");
};
