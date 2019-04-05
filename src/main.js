// const d3 = Object.assign({}, require('../node_modules/d3'));
const d3 = require('../node_modules/d3');
const cloud = require('../node_modules/d3-cloud');

require('../node_modules/bootstrap-honoka/dist/css/bootstrap.min.css');

const data = [
  "agnostic", "refine", "scaffolding", "elastic",
  "express.js", "node.js", "webpack", "d3.js", "electron",
  "yarn", "npm", "bower", "git",
  "gulp", "grunt",
  "WebAssembly", "WebGL", "ES6", "CSS3", "HTML5",
  "Chromium",
  "elasticsearch",
  "gltf"
];

var layout = cloud()
  .size([800, 300])
  .words(data.map(function (d) {
    return {
      text: d,
      size: 10 + Math.random() * 90,
      test: "haha"
    };
  }))
  .padding(5)
  .rotate(function () {
    return ~~(Math.random() * 2) * 90;
  })
  .font("Impact")
  .fontSize(function (d) {
    return d.size;
  })
  .on("end", draw);

layout.start();

function draw(words) {
  d3.select("#cloud").append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function (d) {
      return d.size + "px";
    })
    .style("font-family", "Impact")
    .style("fill", function (d, i) {
      return d3.schemeCategory10[i % 10];
    })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) {
      return d.text;
    });
}