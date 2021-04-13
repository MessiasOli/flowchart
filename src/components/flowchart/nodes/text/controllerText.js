/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Text } from "./modelText";

class ControllerText extends ControllerModel {
  constructor() {
    super("ControllerText");
    
    this.setNewNode = (callback) => {
      let text = new Text();
      text.decorate(callback);
      this.addNode(text);
    }

    this.loadNode = (node, callback) => {
      let text = new Text();
      text.copyFrom(node);
      text.decorate(callback);
      this.addNode(text)
    }
  }
}

export { ControllerText };
