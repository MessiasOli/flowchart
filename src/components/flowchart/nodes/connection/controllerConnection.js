/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Connection } from "./modelConnection";

class ControllerConnection extends IController {
  constructor() {
    super("ControllerConnection");
    console.log(`ControllerConnection criado!`)
    
    this.setNewNode = (x,y) => {
      console.log("Criando novo Connection");
      let conn = new Connection(x,y);
      conn.decorate();
      return conn;
    }
  }
}

export { ControllerConnection };
