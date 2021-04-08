/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Types } from "../../utils/nodeTypes"
import { Circle } from "./modelCircle";

class ControllerCircle extends IController {
  constructor() {
    super("ControllerCircle")
    console.log("ControllerCircle criado!")

    this.setNewNode = () => {
      console.log("Criando novo Circle");
      let circle = new Circle();
      circle.type = new Types().Circle
      circle.decorate();

      this.addNode(circle);
    }

    this.loadNode = (node) => {
      let circle = new Circle();
      console.log('node :>> ', node);
      circle.simpleCopyFrom(node);
      circle.radius = node.radius;

      circle.decorate();
      this.addNode(circle)
    }
  }
}

export { ControllerCircle };
