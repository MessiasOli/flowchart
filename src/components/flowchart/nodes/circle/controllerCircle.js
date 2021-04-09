/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Types } from "../../utils/nodeTypes"
import { Circle } from "./modelCircle";

class ControllerCircle extends ControllerModel {
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
      circle.simpleCopyFrom(node);
      circle.radius = node.radius;
 
      console.log('circle :>> ', circle);
      circle.decorate();
      this.addNode(circle)
    }
  }
}

export { ControllerCircle };
