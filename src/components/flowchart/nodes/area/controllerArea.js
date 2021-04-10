/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Area } from "./modelArea";

class ControllerArea extends ControllerModel {
  constructor() {
    super("ControllerArea");
    
    this.setNewNode = (callback) => {
      let area = new Area();
      area.decorate(callback);

      this.addNode(area);
    }

    this.loadNode = (node, callback) => {
      let area = new Area();
      area.copyFrom(node);
      area.decorate(callback);
      this.addNode(area)
    }
  }
}

export { ControllerArea };
