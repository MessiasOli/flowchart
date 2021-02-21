/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Circle } from "./modelCircle";

class ControllerCircle {
  constructor() {
    IController.Controller.apply(this, ["ControllerCircle"]);
    console.log("Controller criado!")

    this.setNewNode = () => {
      console.log("Criando novo Circle");
      let circle = new Circle();
      circle.decorate();
    }
  }
}

export { ControllerCircle };
