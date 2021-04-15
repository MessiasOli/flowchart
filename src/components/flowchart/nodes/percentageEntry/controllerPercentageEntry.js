/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { PercentageEntry } from "./modelPercentageEntry";

class ControllerPercentageEntry extends ControllerModel {
  constructor() {
    super("ControllerPercentageEntry");
    
    this.setNewNode = (callback) => {
      let percentageEntry = new PercentageEntry();
      percentageEntry.decorate(callback);
      this.addNode(percentageEntry);
      SingletonFlowchart.SaveStatus();
    }

    this.loadNode = (node, callback) => {
      let percentageEntry = new PercentageEntry();
      percentageEntry.copyFrom(node);
      percentageEntry.decorate(callback);
      this.addNode(percentageEntry);
    }
  }
}

export { ControllerPercentageEntry };
