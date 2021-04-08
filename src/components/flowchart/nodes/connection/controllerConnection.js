/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Connection } from "./modelConnection";

class ControllerConnection extends ControllerModel {
  constructor() {
    super("ControllerConnection");
    
    this.setNewNode = (x, y, ParentId, color) => {
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
