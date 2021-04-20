import { DecorationModel } from "../_model/DecorationModel";
import { ControllerTokenValue } from "../tokenValue/controllerTokenValue"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class DecorationTokenValue extends DecorationModel {
  constructor() {
    super("DecorationTokenValue")
    this.node = null;
    this.ctr = new ControllerTokenValue();
  
    this.init = async function (newNode) {
      let svg = SingletonFlowchart.svg
      this.node = newNode
  
       await svg
          .data([newNode])
          .append("g")
          .attr("id", `TokenValue-${newNode.id}`)
          .attr("cursor", "grab")
          .append("text")
          .text(d => d.text)
          .classed("TokenValue", true)
          .attr("cursor", "pointer")
          .attr("x",  d => d.x)
          .attr("y", d => d.yText() )
          .style("font-weight", 700)
          .style("fill", COLORS.Black95)
          .call(this.setDrag())
          
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

    
    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`#TokenValue-${d.id}`)
      
      d3.select(this)
      .style("stroke", "black")
      .attr("cursor", "grabbing")
    }
    
    this.move = () =>{
      let d = this.node;

      d3.select(`#${d.idName} > text`)
        .raise()
        .attr("x", d.x)
        .attr("y", d.yText())
    }

    this.dragged = async function (event, d){
      d.x = event.x;
      d.y = event.y;

      d3.select(`#${d.idName} > text`)
        .raise()
        .attr("x", d.x)
        .attr("y", d.yText())
      
    } 

    this.dragended = function() {
      d3.select(this)
        .style("stroke", 'none')
        .attr("cursor", "pointer")

      SingletonFlowchart.SaveStatus();
    };

    this.setTextAndAdjustWidth = () => {
      d3.select(`#Text-${this.node.id} > text`)
        .text(this.node.text)
        .node()
    }
  }
}