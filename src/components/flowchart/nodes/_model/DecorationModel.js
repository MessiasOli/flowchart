import { IDecoration } from "../_interface/IDecoration"
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import * as d3 from "d3";

export class DecorationModel extends IDecoration {
  constructor(nameClass) {
    super(nameClass)

    this.dragstarted = function() {
      SingletonFlowchart.clicked = true;

      d3.select(`#${SingletonFlowchart.selected}`).attr("stroke", null);
      SingletonFlowchart.selected = this.id;

      d3.select(this)
        .attr("stroke", "black")
    };

    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false;

      d3.select(this)
        .raise()
        .attr("x", (d.x = event.x))
        .attr("y", (d.y = event.y));
    };
  }
}
