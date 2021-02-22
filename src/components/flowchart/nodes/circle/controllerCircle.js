/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Circle } from "./modelCircle";

class ControllerCircle extends IController {
  constructor() {
    super("ControllerCircle")
    console.log("ControllerCircle criado!")

    this.setNewNode = () => {
      console.log("Criando novo Circle");
      let circle = new Circle();
      circle.decorate();
    }
  }
}

export { ControllerCircle };
