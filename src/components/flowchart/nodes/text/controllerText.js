/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { Text } from "./modelText";

class ControllerText extends ControllerModel {
  constructor() {
    super("ControllerText");
    
    this.setNewNode = (callback) => {
      let text = new Text();
      text.decorate(callback);
      this.addNode(text);
      SingletonFlowchart.SaveStatus();
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
