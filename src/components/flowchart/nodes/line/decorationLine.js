import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationLine extends DecorationModel {
  constructor() {
    super("DecorationLine")
    this.node = null;
  
    this.init = async function (newNode) {
      let svg = SingletonFlowchart.svg
      this.node = newNode;

      await svg.append("g")
        .data([newNode])
        .attr("id", `${newNode.idName}`)

        let g = d3.select(`#${newNode.idName}`)

        g.append("path")
          .classed("Line", true)
          .attr("d", newNode.path)
          .attr("stroke", "#444")
          .attr("stroke-width", 3)

        g.selectAll(`.circle-${newNode.id}`)
          .data(newNode.points)
          .join("circle")
          .classed(`${newNode.points[0].dot}-${newNode.id}`, d => d.dot == 'p1')
          .classed(`${newNode.points[1].dot}-${newNode.id}`, d => d.dot == 'p2')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr("cursor", "pointer")
          .attr('r', newNode.r)
          .attr('fill', "back")
          .call(this.setDrag())

          newNode.move();

      return svg
    }
  
    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", (event, d) => that.dragstarted(d, that))
        .on("drag", (event, d) => that.dragged(event, d, that))
        .on("end", that.dragended);
      return drag;
    }

    this.dragstarted = function(d, that) {
      SingletonFlowchart.selectNode(`${that.node.idName}`);
      d3.select(`.${d.dot}-${that.node.id}`)
        .attr("stroke", "black")
        .attr("cursor", "pointer")
    }
    
    this.dragged = async function(event, d, that) {
      SingletonFlowchart.clicked = false
      let i = 0;
      let node = that.node

      if(d.dot.includes('p1')){
        node.setP1(event.x, event.y);
        i = 0;
      }
      else{
        node.setP2(event.x, event.y);
        i = 1;
      }
      
      await d3.select(`#${node.idName} > path`).attr("d", node.path).node();
      await d3.select(`#${node.idName} > .${d.dot}-${node.id}`)
        .raise()
        .attr("cx", node.points[i].x)
        .attr("cy", node.points[i].y);
    }

    this.dragended = function() {
      SingletonFlowchart.SaveStatus();
    };

    this.move = (line) => {
      let d = this.node;
      
      d3.select(`#${d.idName} > path`).attr("d", line).node();
      d3.select(`#${d.idName} > .${d.points[0].dot}-${d.id}`)
        .raise()
        .attr("cx", d.points[0].x)
        .attr("cy", d.points[0].y);

      d3.select(`#${d.idName} > .${d.points[1].dot}-${d.id}`)
        .raise()
        .attr("cx", d.points[1].x)
        .attr("cy", d.points[1].y);
    }
  }
}

export { DecorationLine }