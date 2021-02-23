import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3"

class DecorationConnection extends DecorationModel {
  constructor() {
    super("DecorationBoxText")
    console.log("DecorationBoxText Criado!");
  
    this.init = async function (node) {
      let svg = SingletonFlowchart.svg
      console.log("node :>> ", node);
      let line = `M${node.x},${node.y}L${node.x},${node.y+100}`
  
       await svg
          .append("path")
          .classed("Connection", true)
          .attr("id", `Connection-${node.id}`)
          .attr("d", line)
          .attr("stroke", "#444")
          .attr("stroke-width", 3).node();

          d3.select("#svg")
          .selectAll(`.circle-${node.id}`)
          .data([{ x:node.x, y: node.y, id: node.id, dot: 'p1' },
                 { x:node.x, y: node.y +100, id: node.id, dot: 'p2' }])
          .join("circle")
          .attr("id", `Connection-${node.id}`)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr("cursor", "pointer")
          .attr('r', 4)
          .attr('fill', "back")
          .call(this.setDrag(node))
      
      return svg
    }
  
    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", that.dragged)
        .on("end", that.dragended);
      return drag;
    }

    this.dragstarted = function() {
      SingletonFlowchart.clicked = true
      SingletonFlowchart.selected = this.id
  
      d3.select(this)
        .attr("stroke", "black")
        .attr("cursor", "pointer")
    }
    
    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false

      let locale = document.querySelector("#Connection-"+d.id).getAttribute('d')
      let p1 = locale.slice(locale.indexOf('M') + 1, locale.indexOf('L')).split(",")
      let p2 = locale.slice(locale.indexOf('L') + 1, locale.length).split(",")

      let conn = d3.select(`#Connection-${d.id}`)

      if(d.dot.includes('p1')){
        let line = `M${event.x},${event.y}L${p2[0]},${p2[1]}`
        conn.attr("d", line).node();
      }else{
        let line = `M${p1[0]},${p1[1]}L${event.x},${event.y}`
        conn.attr("d", line).node();
      }
      d3.select(this).raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    }

    this.dragended = function() {
    };
  }
}

export { DecorationConnection }