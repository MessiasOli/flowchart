/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Connection } from "./modelConnection";

class ControllerConnection extends IController {
  constructor() {
    super("ControllerConnection");
    console.log(`ControllerConnection criado!`)
    
    this.setNewNode = () => {
      console.log("Criando novo Connection");
      let conn = new Connection();
      conn.decorate();
    }
  }
}

export { ControllerConnection };
