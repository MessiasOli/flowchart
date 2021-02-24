/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Line } from "./modelLine";

class ControllerLine extends IController {
  constructor() {
    super("ControllerLine");
    console.log(`ControllerLine criado!`)
    
    this.setNewNode = () => {
      console.log("Criando novo Line");
      let conn = new Line();
      conn.decorate();
    }
  }
}

export { ControllerLine };
