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

      circle.id = node.id;
      circle.type = node.type;
      circle.x = node.x;
      circle.y = node.y;
      circle.radius = node.radius;
      circle.width = node.width;
      circle.heigth = node.heigth;

      circle.decorate();
      this.addNode(circle)
    }
  }
}

export { ControllerCircle };
