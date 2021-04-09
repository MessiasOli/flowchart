/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { PercentageEntry } from "./modelPercentageEntry";

class ControllerPercentageEntry extends ControllerModel {
  constructor() {
    super("ControllerPercentageEntry");
    
    this.setNewNode = (callback) => {
      let percentageEntry = new PercentageEntry();
      percentageEntry.decorate(callback);
      this.addNode(percentageEntry);
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
