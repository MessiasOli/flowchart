/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Triangle } from "./modelTriangle";

class ControllerTriangle extends ControllerModel {
  constructor() {
    super("ControllerTriangle");
    
    this.setNewNode = () => {
      let triangle = new Triangle();
      triangle.decorate();

      this.addNode(triangle);
    }

    this.loadNode = (node) => {
      let triangle = new triangle();
      triangle.simpleCopyFrom(node);

      /* Implementar método copyFrom para contemplar particularidades */

      triangle.decorate();
      this.addNode(triangle)
    }
  }
}

export { ControllerTriangle };
