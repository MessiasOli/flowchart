/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Connection } from "./modelConnection";

class ControllerConnection extends IController {
  constructor() {
    super("ControllerConnection");
    
    this.setNewNode = (x, y, ParentId, color) => {
      console.log("Criando novo Connection");
      let conn = new Connection(x, y, ParentId, color);
      conn.decorate();
      return conn;
    }

    this.isAlive = function(node){
      return document.querySelectorAll("#dot-" + node.id).length ? true : false
    }
  }
}

export { ControllerConnection };
