import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3";

class DecorationBoxText extends DecorationModel {
  constructor() {
    super("DecorationBoxText");
    console.log("DecorationBoxText Criado!");

    this.init = async function(node) {
      let svg = SingletonFlowchart.svg;
      console.log("node :>> ", node);

      await svg
        .data([node])
        .append("g")
        .attr("id", `BoxText-${node.id}`)
        .append('rect')
        .classed('title', true)
        .attr('stroke','black')
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y-20)
        .style("width", node.width)
        .style("height", 20)
        .style('fill', 'none')
        // .node()

        let g = d3.select(`#BoxText-${node.id}`)
        
        g.append('text')
        .attr("y", (d) => d.y - 3)
        .attr("x", (d) => d.x + node.width / 2)
        .style('stoke', 'black')
        .text("BoxText")
        .attr("text-anchor", "middle")
        // .node()

        g.append("rect")// Body
        .classed("BoxText", true)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("cursor", "grab")
        .attr("stroke", "#444")
        .style("width", node.width)
        .style("height", node.height)
        .call(this.setDrag(node))
        .node();

      this.createConnections(node);

      return svg;
    };

    this.setDrag = function() {
      let that = this;
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", that.dragged)
        .on("end", that.dragended);
      return drag;
    };

    this.dragstarted = function(event, d) {
      SingletonFlowchart.clicked = true;
      SingletonFlowchart.selected = this.id;

      d3.select(this).attr("cursor", "grabbing");
      d3.selectAll(`#BoxText-${d.id} > circle`).remove();
    };

    this.dragged = async function(event, d) {
      SingletonFlowchart.clicked = false;

      await d3.select(this).raise().attr("x", (d.x = event.x)).attr("y", (d.y = event.y));
      await d3.select(`#BoxText-${d.id} > text`).raise().attr("x", (d.x = event.x + d.width / 2)).attr("y", (d.y = event.y - 3));
      await d3.select(`#BoxText-${d.id} > .title`).raise().attr("x", (d.x = event.x)).attr("y", (d.y = event.y - 20));
    };

    this.dragended = function(event, node) {
      d3.select(this).attr("cursor", "grab");
      node.y += 20;
      node.decorator.createConnections(node);
    };

    this.createConnections = function(node) {
      let connections = this.getConnectorPosition(node);

      d3.select(`#BoxText-${node.id}`)
        .selectAll(`.circle-${node.id}`)
        .data(connections)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("cursor", "pointer")
        .attr("r", 4)
        .style("fill", '#0000')
        .on("mouseover", function() {
          d3.select(this).style("fill", "black")
        }).on("mouseout", function(){
          d3.select(this).style("fill", '#0000')
        });
    };

    this.getConnectorPosition = function(node) {
      const halfWidth = node.width / 6;
      const halfHeight = (node.height + 20) / 6;
      let newY = node.y - 20
      let top1 = { x: node.x + halfWidth * 1, y: newY };
      let top2 = { x: node.x + halfWidth * 3, y: newY };
      let top3 = { x: node.x + halfWidth * 5, y: newY };
      let left1 = { x: node.x, y: newY + halfHeight * 1 };
      let left2 = { x: node.x, y: newY + halfHeight * 3 };
      let left3 = { x: node.x, y: newY + halfHeight * 5 };
      let bottom1 = { x: node.x + halfWidth * 1, y: node.y + node.height };
      let bottom2 = { x: node.x + halfWidth * 3, y: node.y + node.height };
      let bottom3 = { x: node.x + halfWidth * 5, y: node.y + node.height };
      let right1 = { x: node.x + node.width, y: newY + halfHeight * 1 };
      let right2 = { x: node.x + node.width, y: newY + halfHeight * 3 };
      let right3 = { x: node.x + node.width, y: newY + halfHeight * 5 };
      return [ left1, left2, left3, right1, right2, right3, top1, top2, top3, bottom1, bottom2, bottom3 ];
    };
  }
}

export { DecorationBoxText };
