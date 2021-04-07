/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Types } from "../../utils/nodeTypes"
import { Circle } from "./modelCircle";

class ControllerCircle extends IController {
  constructor() {
    super("ControllerCircle")
    console.log("ControllerCircle criado!")
    this.repository.type = "Circle"

    this.setNewNode = () => {
      console.log("Criando novo Circle");
      let circle = new Circle();
      circle.type = new Types().Circle
      circle.decorate();
      this.repository.addNode(circle.copyTo());
    }

    this.updateNode = (circle) => {
      this.repository.updateNode(circle.copyTo())
    }
  }
}

export { ControllerCircle };
