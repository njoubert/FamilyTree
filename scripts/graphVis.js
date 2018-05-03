var svg = d3.select("svg"),
    width = window.innerWidth,
    height = window.innerHeight;

svg.attr("width", width).attr("height", height);

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("db/family.json", function(error, graph) {
  if (error) throw error;

  generateLinks(graph);

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
      .style('stroke', function(d) { 
          if (d.type === "father") {
            return "green";
          } else {
            return "orange";
          }
       });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.name; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

});

function generateLinks(graph) {
    graph.links = [];

    var arrayLength = graph.nodes.length;
    for (var i = 0; i < arrayLength; i++) {
      currNode = graph.nodes[i]

      fatherNode = graph.nodes.find(x => x.id === currNode.father);
      motherNode = graph.nodes.find(x => x.id === currNode.mother);

      if (fatherNode) {

        fatherLink = {
          "source": currNode.id,
          "target": fatherNode.id,
          "value": 1,
          "type": "father"
        }

        graph.links.push(fatherLink);

      }

      if (motherNode) {

        motherLink = {
          "source": currNode.id,
          "target": motherNode.id,
          "value": 1,
          "type": "mother"
        }

        graph.links.push(motherLink);
      }


    }

    console.log(graph.links);
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}