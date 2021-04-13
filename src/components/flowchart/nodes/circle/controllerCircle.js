/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Circle } from "./modelCircle";

class ControllerCircle extends ControllerModel {
  constructor() {
    super("ControllerCircle")

    this.setNewNode = () => {
      let circle = new Circle();
      circle.decorate();
      console.log('circle :>> ', new Circle());
      this.addNode(circle);
    }

    this.loadNode = (node) => {
      let circle = new Circle();
      circle.simpleCopyFrom(node);
      circle.radius = node.radius;
      circle.decorate();
      this.addNode(circle)
    }
  }
}

export { ControllerCircle };
