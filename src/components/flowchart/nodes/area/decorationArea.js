import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class DecorationArea extends DecorationModel {
  constructor() {
    super("DecorationArea")
    console.log("DecorationArea Criado!");
    this.node = null;
  
    this.init = async function (newNode, openDialog) {
      let svg = SingletonFlowchart.svg
      console.log("node :>> ", newNode);
      this.node = newNode;
       await svg
          .data([newNode])
          .append("g")
          .attr("id", `Area-${newNode.id}`)
          .node();

        let g = d3.select(`#Area-${newNode.id}`)

        g.append("rect")
          .classed(`Area-${newNode.id}`, true)
          .attr("x",  d => d.x)
          .attr("y", d => d.y)
          .style("width", newNode.width)
          .style("height", newNode.height)
          .attr("cursor", "grab")
          .style("fill", COLORS.ClearBlue)
          .call(this.setDrag(newNode))

        g.append('text')
        .attr("y", (d) => d.yText())
        .attr("x", (d) => d.xText())
        .attr("text-anchor", "middle")
        .style("cursor", "pointer")
        .style("font-weight", 550)
        .style('fill', COLORS.Black95)
        .text(newNode.nameOfArea)
        .on('dblclick', () => openDialog(newNode))
      
      return svg
    }
  
    this.setDrag = function() {
      let that = this
      console.log('this :>> ', this);
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", that.dragged)
        .on("end", that.dragended);
      return drag;
    }

    this.dragstarted = function(event, d) {
      SingletonFlowchart.selected && d3.select(`.${SingletonFlowchart.selected}`).attr("stroke",null)
      SingletonFlowchart.selectNode(`Area-${d.id}`);
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    this.dragged = async function (event, d){
      SingletonFlowchart.clicked = false;
      d.x = event.x + 20;
      d.y = event.y;
      await d3.select(this).raise().attr("x", (d.x)).attr("y", (d.y));
      await d3.select(`#Area-${d.id} > text`).raise().attr("x", (d.xText())).attr("y", (d.yText()));
    }

    this.dragended = function() {
      this.cursor = "grab"
      d3.select(this)
        .attr("cursor", "grab")
        .style("stroke", "none")
    }

    this.setTextAndAdjustWidth = () => {
      d3.select(`#Area-${this.node.id} > text`)
        .attr("x", this.node.xText())
        .text(this.node.nameOfArea)
        .node()

      d3.select(`#Area-${this.node.id} > rect`)
        .style("width", this.node.width)
    }
  }
}