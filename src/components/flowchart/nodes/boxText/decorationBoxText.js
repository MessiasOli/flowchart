import { DecorationModel } from "../_model/DecorationModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { ControllerConnection } from "../connection/controllerConnection"
import { GetSixConections } from "../../utils/tools"
import * as d3 from "d3";

class DecorationBoxText extends DecorationModel {
  constructor() {
    super("DecorationBoxText");
    this.boxText = null
    this.transientConnection = null;
    this.ctrConnection = new ControllerConnection()

    this.init = async function(node) {
      let svg = SingletonFlowchart.svg;
      this.boxText = node;

      await svg
        .data([node])
        .append("g")
        .attr("id", `BoxText-${node.id}`)
        .append('rect')
        .classed('title', true)
        .attr('stroke','black')
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .style("width", node.width)
        .style("height", node.boxTextHeight)
        .style('fill', 'none')

        let g = d3.select(`#BoxText-${node.id}`)
        
        g.append('text')
        .attr("y", (d) => d.yBoxBody() - 3)
        .attr("x", (d) => d.x + node.width / 2)
        .style('stoke', 'black')
        .text("BoxText")
        .attr("text-anchor", "middle")

        // Body
        g.append("rect")
        .classed("BoxText", true)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.yBoxBody())
        .attr("cursor", "grab")
        .attr("stroke", "#444")
        .style("fill", '#0000')
        .style("width", node.width)
        .style("height", node.boxBodyHeight)
        .call(this.setDrag(node))
        .node();

      this.createConnections(node);

      return svg;
    };

    this.createConnections = function(node) {
      let connections = GetSixConections(node);
      let that = this

      d3.select(`#BoxText-${node.id}`)
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
              that.transientConnection = that.ctrConnection.setNewNode(event.x, event.y, `#BoxText-${node.id}`)
            }
            that.connected = false
            that.transientConnection.moveTo({ x: event.x, y: event.y})
          }).on('end', (event, d) => {
            !that.connected && that.boxText.connectionPack.push({ conn: that.transientConnection, dot: d.point })
            that.transientConnection = null;
          }))
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
      SingletonFlowchart.selected = `BoxText-${d.id}`;

      d3.select(this).attr("cursor", "grabbing");
      d3.selectAll(`#BoxText-${d.id} > .circleBox`).remove();
    };

    this.dragged = async function(event, d) {
      SingletonFlowchart.clicked = false;
      let adjust = 20
      d.x = event.x;
      d.y = event.y;
      await d3.select(this).raise().attr("x", (d.x)).attr("y", (d.yBoxBody() + adjust));
      await d3.select(`#BoxText-${d.id} > text`).raise().attr("x", (d.x + d.width / 2)).attr("y", (d.yBoxBody() + adjust - 3));
      await d3.select(`#BoxText-${d.id} > .title`).raise().attr("x", (d.x = event.x)).attr("y", d.y + adjust);
      
      d.connectionPack = d.connectionPack.filter(point => d.decorator.ctrConnection.isAlive(point.conn))
      d.connectionPack.forEach(point => {
          let dot = d.decorator.getPointPosition(d, point.dot)
          point.conn.moveFirstPoint({x: dot[0].x, y: dot[0].y + adjust})
      });
    };

    this.dragended = function(event, node) {
      d3.select(this).attr("cursor", "grab");
      node.y += 20;
      node.decorator.createConnections(node);
    };

    this.getPointPosition = function(node, point){
      return GetSixConections(node).filter( dot => dot.point == point)
    }

  }
}

export { DecorationBoxText };
