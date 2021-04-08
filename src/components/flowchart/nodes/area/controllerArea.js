/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Area } from "./modelArea";

class ControllerArea extends ControllerModel {
  constructor() {
    super("ControllerArea");
    
    this.setNewNode = (callback) => {
      let area = new Area();
      area.decorate(callback);
    }
  }
}

export { ControllerArea };
