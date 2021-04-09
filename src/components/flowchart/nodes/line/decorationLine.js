import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationLine extends DecorationModel {
  constructor() {
    super("DecorationLine")
  
    this.init = async function (newNode) {
      let svg = SingletonFlowchart.svg
  
      await svg.append("g")
        .data([newNode])
        .classed("Line", true)
        .attr("id", `Line-${newNode.id}`)
        .on("click", ()=>{SingletonFlowchart.selectNode(`Line-${newNode.id}`)})

        let g = d3.select(`#Line-${newNode.id}`)

        g.append("path")
        .classed("Line", true)
        .attr("d", newNode.path)
        .attr("stroke", "#444")
        .attr("stroke-width", 3)

        g.selectAll(`.circle-${newNode.id}`)
        .data(newNode.points)
        .join("circle")
        .classed(`circle-${newNode.id}`, true)
        .classed(`${newNode.points[0].dot}-${newNode.id}`, d => d.dot == 'p1')
        .classed(`${newNode.points[1].dot}-${newNode.id}`, d => d.dot == 'p2')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr("cursor", "pointer")
        .attr('r', newNode.cRadius)
        .attr('fill', "back")
        .call(this.setDrag(newNode))
      
      return svg
    }
  
    this.setDrag = function(node) {
      let that = this
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag",(event, d) => that.dragged(event, d, node))
        .on("end", that.dragended);
      return drag;
    }

    this.dragstarted = function() {
      d3.select(this)
        .attr("stroke", "black")
        .attr("cursor", "pointer")
    }
    
    this.dragged = function(event, d, node) {
      SingletonFlowchart.clicked = false
      let i = 0;

      if(d.dot.includes('p1')){
        node.setP1(event.x, event.y);
        i = 0;
      }
      else{
        node.setP2(event.x, event.y);
        i = 1;
      }
      
      d3.select(`#Line-${d.id} > path`).attr("d", node.path).node();
      d3.select(`#Line-${d.id} > .${d.dot}-${d.id}`)
        .raise()
        .attr("cx", node.points[i].x)
        .attr("cy", node.points[i].y);
    }

    this.dragended = function() {
    };
  }
}

export { DecorationLine }