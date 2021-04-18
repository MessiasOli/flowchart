/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Triangle } from "./modelTriangle";

class ControllerTriangle extends ControllerModel {
  constructor() {
    super("ControllerTriangle");
    
    this.setNewNode = (callBack) => {
      let triangle = new Triangle();
      triangle.decorate(callBack);

      this.addNode(triangle);
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
