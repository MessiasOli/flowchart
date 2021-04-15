/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { Area } from "./modelArea";

class ControllerArea extends ControllerModel {
  constructor() {
    super("ControllerArea");
    
    this.setNewNode = (callback) => {
      let area = new Area();
      area.decorate(callback);

      this.addNode(area);
      SingletonFlowchart.SaveStatus()
    }

    this.loadNode = async (node, callback) => {
      let area = new Area();
      await area.copyFrom(node);
      await area.decorate(callback);
      this.addNode(area)
    }
  }
}

export { ControllerArea };
