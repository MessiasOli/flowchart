import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { ControllerArea } from "../area/controllerArea"
import { ControllerConnection } from "../connection/controllerConnection"
import { COLORS } from "../../utils/colors"
import { Types } from "../../utils/nodeTypes"
import { GetSixConections } from "../../utils/tools"
import * as d3 from "d3"

export class DecorationArea extends DecorationModel {
  constructor() {
    super("DecorationArea")

    this.node = null;
    this.typeConn = new Types().Connection
    this.transientConnection = null;

    this.ctrArea = new ControllerArea();
    this.ctrConnection = new ControllerConnection();
  
    this.init = async function (newNode, openDialog) {
      let svg = SingletonFlowchart.svg
      this.node = newNode;

       await svg
          .data([newNode])
          .append("g")
          .attr("id", `Area-${newNode.id}`)
          .node();

        let g = d3.select(`#Area-${newNode.id}`)

        g.append("rect")
          .classed(`Area-${newNode.id}`, true)
          .attr("x", d => d.x)
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
        this.createConnectionPath(newNode)
      return svg
    }

    this.setDrag = function() {
      let that = this
      let drag = d3
        .drag()
        .on("start", that.dragstarted)
        .on("drag",(event, d) => that.dragged(event, d, that))
        .on("end",(event, d) => that.dragended(d, that));
      return drag;
    }

    this.dragstarted = function(event, d) {
      SingletonFlowchart.selectNode(`Area-${d.id}`);
  
      d3.select(this)
        .style("stroke", "black")
        .attr("cursor", "grabbing")

      d3.selectAll(`#Area-${d.id} > .circleBox`).remove();
    }

    this.dragged = async function (event, d, that){
      SingletonFlowchart.clicked = false;
      d.x = event.x;
      d.y = event.y;

      that.drag();
    }

    this.drag = async function() {
      let d = this.node;
      await d3.select(`.${d.idName}`)
        .raise()
        .attr("x", (d.x))
        .attr("y", (d.y));

      await d3.select(`#${d.idName} > text`)
        .raise()
        .attr("x", (d.xText()))
        .attr("y", (d.yText()));

      d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
      d.connectionPack.forEach(point => {
          let dot = d.decorator.getPointPosition(d, point.dot)
          point.conn.moveFirstPoint({x: dot[0].x, y: dot[0].y})
      });
    }

    this.move = async function(){
      let d = this.node;

      await d3.select(`.${d.idName}`)
        .raise()
        .attr("x", (d.x))
        .attr("y", (d.y));

      await d3.select(`#${d.idName} > text`)
        .raise()
        .attr("x", (d.xText()))
        .attr("y", (d.yText()));

      let conn = new Array();
      await SingletonFlowchart.selectedNodes.forEach(n => {
        if(this.typeConn == n.type){
          conn.push(n)
        }
      });

      if(d.connectionPack.length > 0){
        d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
        await d.connectionPack.forEach(point => {
          let isSelected = conn.includes(point.conn)
          if(!isSelected){
            let dot = d.decorator.getPointPosition(d, point.dot)
            point.conn.moveFirstPoint({x: dot[0].x, y: dot[0].y})
          }
        });
      }

      await d3.selectAll(`#${d.idName} > .circleBox`).remove();
      await d.decorator.createConnections(d);
    }

    this.dragended = function(node) {
      d3.select(`.Area-${node.id}`)
        .attr("cursor", "grab")
        .style("stroke", "none")

        node.decorator.createConnections(node);
        SingletonFlowchart.SaveStatus();
    }

    this.getPointPosition = function(node, point){
      return GetSixConections(node).filter( dot => dot.point == point)
    }

    this.createConnections = function(node) {
      let connections = GetSixConections(node);

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
        .on('mouseover', (event, d) => this.mouseOver(d, node))
        .on('mouseout', (event, d) => this.mouseOut(d, node))
        .call(this.setDragConnections(node))
        .node();
    };

    this.mouseOver = function (d, node) {
      d3.select("#"+ d.point +'-'+ node.id)
        .style('fill', 'rgba(255, 0, 0, 0.705)')
    }

    this.mouseOut = function (d, node){
      d3.select("#"+ d.point +'-'+ node.id)
        .style('fill', '#0000')
    }

    this.setDragConnections = function(node){
      let that = this
      let drag = d3
        .drag()
        .on("start", () => that.dragStartConnections(that, node))
        .on("drag", (event) => that.draggedConnections(event, that, node))
        .on("end", (event, node) => that.dragendedConnections(event, that, node));

      return drag;
    }

    this.dragStartConnections = (that) =>{
      that.connected = true
    }

    this.draggedConnections = (event, that, node) =>{
      if(that.connected && !that.transientConnection){
        that.transientConnection = that.ctrConnection.setNewNode(event.x, event.y, `#Area-${node.id}`)
      }
      that.connected = false
      that.transientConnection.startMoveConnection({ x: event.x, y: event.y})
    }

    this.dragendedConnections = (event, that, node) =>{
      !that.connected && that.node.connectionPack.push({ conn: that.transientConnection, dot: node.point })
      that.transientConnection = null;

      SingletonFlowchart.SaveStatus();
    }

    this.setTextAndAdjustWidth = () => {
      d3.select(`#Area-${this.node.id} > text`)
        .attr("x", this.node.xText())
        .text(this.node.nameOfArea)
        .node()

      d3.select(`#Area-${this.node.id} > rect`)
        .style("width", this.node.width)
    }

    this.updateConnection = (links) => {
      links.forEach(c => {
        let n = SingletonFlowchart.Memory.getNodeById(c.id)[0]
        n.showConnected()
      })
    }
  }
}