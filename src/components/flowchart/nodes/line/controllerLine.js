/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Line } from "./modelLine";

class ControllerLine extends ControllerModel {
  constructor() {
    super("ControllerLine");
    
    this.setNewNode = () => {
      let line = new Line();
      line.decorate();
      this.addNode(line)
    }

    this.loadNode = (node) => {
      let line = new Line();
      line.copyFrom(node);
      line.decorate();
      console.log('line :>> ', line);
      this.addNode(line);
    }
  }
}

export { ControllerLine };
