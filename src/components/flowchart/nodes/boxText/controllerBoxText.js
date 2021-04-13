/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { BoxText } from "./modelBoxText";

class ControllerBoxText extends ControllerModel {
  constructor() {
    super("ControllerBoxText");
    
    this.setNewNode = (callback) => {
      let boxText = new BoxText();
      boxText.decorate(callback);
      this.addNode(boxText)
    }

    this.loadNode = (node, callback) => {
      let boxText = new BoxText();
      boxText.copyFrom(node)
      boxText.decorate(callback)
      this.addNode(boxText);
    }
  }
}

export { ControllerBoxText };
