/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { OnOff } from "./modelOnOff";

class ControllerOnOff extends ControllerModel {
  constructor() {
    super("ControllerOnOff");
    
    this.setNewNode = (callback) => {
      let onOff = new OnOff();
      onOff.decorate(callback);

      this.addNode(onOff);
    }

    this.loadNode = (node, callback) => {
      let onOff = new OnOff();
      onOff.copyFrom(node);
      onOff.decorate(callback);
      this.addNode(onOff)
    }
  }
}

export { ControllerOnOff };
