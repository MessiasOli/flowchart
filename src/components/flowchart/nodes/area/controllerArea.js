/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Area } from "./modelArea";

class ControllerArea extends IController {
  constructor() {
    super("ControllerArea");
    console.log(`ControllerArea criado!`)
    
    this.setNewNode = (callback) => {
      console.log("Criando novo Area");
      let area = new Area();
      area.decorate(callback);
    }
  }
}

export { ControllerArea };
