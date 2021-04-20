/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { TokenValue } from "./modelTokenValue";

class ControllerTokenValue extends ControllerModel {
  constructor() {
    super("ControllerTokenValue");
    
    this.setNewNode = (callback) => {
      let tokenValue = new TokenValue();
      tokenValue.decorate(callback);
      this.addNode(tokenValue);
      SingletonFlowchart.SaveStatus();
    }

    this.loadNode = (node, callback) => {
      let tokenValue = new TokenValue();
      tokenValue.copyFrom(node);
      tokenValue.decorate(callback);
      this.addNode(tokenValue)
    }
  }
}

export { ControllerTokenValue };
