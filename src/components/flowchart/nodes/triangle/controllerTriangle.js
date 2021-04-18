/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Triangle } from "./modelTriangle";
import { SingletonFlowchart } from "../_service/singletonFlowchart"

class ControllerTriangle extends ControllerModel {
  constructor() {
    super("ControllerTriangle");
    
    this.setNewNode = (callBack) => {
      let triangle = new Triangle();
      triangle.decorate(callBack);

      this.addNode(triangle);
      SingletonFlowchart.SaveStatus();
    }

    this.loadNode = (node, callback) => {
      let triangle = new Triangle();
      triangle.copyFrom(node);
      triangle.decorate(callback);
      this.addNode(triangle)
    }
  }
}

export { ControllerTriangle };
