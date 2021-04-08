import { IDecoration } from "../_interface/IDecoration";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3";

export class DecorationModel extends IDecoration {
  constructor(nameClass) {
    super(nameClass);

    this.dragstarted = function() {
      SingletonFlowchart.clicked = true;
      SingletonFlowchart.selected = this.id;

      d3.select(this).style("stroke", "black");
    };

    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false;

      d.x = event.x;
      d.y = event.y;

      d3.select(this)
        .raise()
        .attr("x", d.x)
        .attr("y", d.y);
    };

    this.dragended = function() {
      this.cursor = "grab";
      d3.select(this).style("stroke", "none");
    };
  }
}
