import { DecorationModel } from "../_model/DecorationModel";
import { ControllerTokenValue } from "../tokenValue/controllerTokenValue"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"
import { Link } from "../_model/GlobalDecoration";

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
          .text(d => d.value)
          .classed("TokenValue", true)
          .attr("cursor", "pointer")
          .attr("x",  d => d.x)
          .attr("y", d => d.yText() )
          .style("font-weight", 700)
          .style("fill", COLORS.Black95)
          .call(this.setDrag())

          this.link = new Link();
          this.link.initSelection({...newNode, x: newNode.x - 4, y:newNode.y + 12})
          
          return svg
    }
  
    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag",(event, d) => that.dragged(event, d))
        .on("end", that.dragended);
      return drag;
    }

    
    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`#TokenValue-${d.id}`)
      
      d3.select(this)
      .style("stroke", "black")
      .attr("cursor", "grabbing")
    }

    this.dragged = async function (event, d){
      d.x = event.x;
      d.y = event.y;
      this.move()
    }
    
    this.move = () =>{
      let d = this.node;

      d3.select(`#${d.idName} > text`)
        .raise()
        .attr("x", d.x)
        .attr("y", d.yText())

      this.link.move(d.x - 4, d.y + 12)
    }

    this.dragended = function() {
      d3.select(this)
        .style("stroke", 'none')
        .attr("cursor", "pointer")

      SingletonFlowchart.SaveStatus();
    };

    this.setTextAndAdjustWidth = () => {
      d3.select(`#Text-${this.node.id} > text`)
        .text(this.node.value)
        .node()
    }
  }
}