import { DecorationModel } from "../_model/DecorationModel";
import { ControllerOnOff } from "../onOff/controllerOnOff"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { COLORS } from "../../utils/colors"
import * as d3 from "d3"

export class DecorationOnOff extends DecorationModel {
  constructor() {
    super("DecorationOnOff")
    this.node = null;
    this.ctr = new ControllerOnOff();
  
    this.init = async function (newNode, openDialog) {
      let svg = SingletonFlowchart.svg
      this.node = newNode
      let that = this
  
        await svg
          .data([newNode])
          .append("g")
          .attr("id", `${newNode.idName}`)
          .append("path")
          .classed("OnOff", true)
          .attr("d", newNode.path())
          .attr("stroke", COLORS.Black)
          .attr("stroke-width", 22).node();

        let g = d3.select(`#${newNode.idName}`);
        
        g.append("circle")
          .classed("c1", true)
          .style("fill", COLORS.Black)
          .attr("cx",  d => d.x - 1)
          .attr("cy", d => d.y)
          .attr("r", 11)

        g.append("circle")
          .classed("c2", true)
          .style("fill", COLORS.Black)
          .attr("cx",  d => d.x + 26)
          .attr("cy", d => d.y)
          .attr("r", 11)
        
        g.append("circle")
          .classed("switch", true)
          .attr("cx",  d => d.xCircle())
          .attr("cy", d => d.y)
          .attr("r", 10)
          .attr("cursor", "pointer")
          .style("fill", d => d.switchColor())
          .on("click", () => that.switch())

        g.append("text")
          .text(d => d.description)
          .attr("cursor", "pointer")
          .attr("x",  d => d.x + 40)
          .attr("y", d => d.y + 5)
          .style("font-weight", 700)
          .style("color", COLORS.Black95)
          .on('dblclick', () => openDialog(newNode))
          
          .call(this.setDrag())

      
      return svg
    }
  
    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag", (event, d) => that.dragged(event, d, that))
        .on("end", (event, d) => that.dragended(d, that));
      return drag;
    }

    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`${d.idName}`)
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")
    }

    this.dragged = async function (event, d, that){
      d.x = event.x;
      d.y = event.y;
      that.move();
    } 

    this.move = async () => {
      let d = this.node

      d3.select(`#${d.idName} > path`)
        .raise()
        .attr("d", d.path())
      
      d3.select(`#${d.idName} > text`)
        .raise()
        .attr("x", d.x + 40)
        .attr("y", d.y + 5)

      d3.select(`#${d.idName} > circle.c1`)
        .raise()
        .attr("cx", d.x - 1)
        .attr("cy", d.y)

      d3.select(`#${d.idName} > circle.c2`)
        .raise()
        .attr("cx", d.x + 26)
        .attr("cy", d.y)

      d3.select(`#${d.idName} > circle.switch`)
        .raise()
        .attr("cx", d.xCircle())
        .attr("cy", d.y)
    }

    this.dragended = function(d) {
      d3.select(`#${d.idName} > text`)
        .style("stroke", 'none')
        .attr("cursor", "pointer")
    };

    this.switch = function () {
      let d = this.node;
      d.switch = !d.switch;

      d3.select(`#${d.idName} > .switch`)
        .transition()
        .duration(400)
        .attr("cx", d.xCircle())
        .style("fill", d => d.switchColor())
    }

    this.update = () => {
      let d = this.node;
      console.log('cheguei aqui :>> ', d3.select(`#${d.idName} > text`));
      d3.select(`#${d.idName} > text`)
      .text(d.description)
    }
  }
}