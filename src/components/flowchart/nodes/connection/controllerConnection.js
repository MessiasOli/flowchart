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

    this.loadNode = (node) => {
      let conn = new Connection()
      conn.simpleCopyFrom(node);
      conn.parentId = node.parentId;
      conn.color = node.color;
      conn.contador = node.contador;
      conn.path = node.path;
      conn.x1 = node.x1;
      conn.y1 = node.y1;
      conn.internalPoints = node.internalPoints;
      conn.qtdInternalPoints = node.qtdInternalPoints;

      conn.decorate();
      return conn
    }
  }
}

export { ControllerConnection };
