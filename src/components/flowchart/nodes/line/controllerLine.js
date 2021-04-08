/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Line } from "./modelLine";

class ControllerLine extends ControllerModel {
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
