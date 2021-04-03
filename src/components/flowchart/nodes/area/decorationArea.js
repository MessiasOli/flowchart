import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { ControllerConnection } from "../connection/controllerConnection"
import { COLORS } from "../../utils/colors"
import { GetSixConections } from "../../utils/tools"
import * as d3 from "d3"

export class DecorationArea extends DecorationModel {
  constructor() {
    super("DecorationArea")
    console.log("DecorationArea Criado!");
    this.node = null;
    this.ctrConnection = new ControllerConnection()
  
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

        this.createConnections(newNode)
      
      return svg
    }

    this.createConnections = function(node) {
      let connections = GetSixConections(node);
      let that = this

      d3.select(`#Area-${node.id}`)
        .selectAll(`.circle-${node.id}`)
        .data(connections)
        .join("circle")
        .attr("id", d => d.point +'-'+ node.id)
        .classed("circleBox", true)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("cursor", "pointer")
        .attr("r", 4)
        .style('fill','#0000')
        .on('mouseover', (event, d) => d3.select("#"+ d.point +'-'+ node.id).style('fill', 'rgba(255, 0, 0, 0.705)'))
        .on('mouseout', (event, d) => d3.select("#"+ d.point +'-'+ node.id).style('fill', '#0000'))
        .call(d3
          .drag()
          .on("start", () => that.connected = true)
          .on("drag", (event) => {
            if(that.connected && !that.transientConnection){
              that.transientConnection = that.ctrConnection.setNewNode(event.x, event.y, `#Area-${node.id}`)
            }
            that.connected = false
            that.transientConnection.moveTo({ x: event.x, y: event.y})
          }).on('end', (event, d) => {
            !that.connected && that.node.connectionPack.push({ conn: that.transientConnection, dot: d.point })
            that.transientConnection = null;
          }))
    };
  
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

      d3.selectAll(`#Area-${d.id} > .circleBox`).remove();
    }

    this.dragged = async function (event, d){
      SingletonFlowchart.clicked = false;
      d.x = event.x + 20;
      d.y = event.y;

      await d3.select(this)
        .raise()
        .attr("x", (d.x))
        .attr("y", (d.y));
      await d3.select(`#Area-${d.id} > text`)
        .raise()
        .attr("x", (d.xText()))
        .attr("y", (d.yText()));

      d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
      d.connectionPack.forEach(point => {
          let dot = d.decorator.getPointPosition(d, point.dot)
          point.conn.moveFirstPoint({x: dot[0].x, y: dot[0].y + 20})
      });
    }

    this.dragended = function(event, node) {
      this.cursor = "grab"
      d3.select(this)
        .attr("cursor", "grab")
        .style("stroke", "none")

      node.decorator.createConnections(node);
    }

    this.getPointPosition = function(node, point){
      return GetSixConections(node).filter( dot => dot.point == point)
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