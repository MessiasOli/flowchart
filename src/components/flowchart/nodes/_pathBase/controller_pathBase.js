/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { _pathBase } from "./model_pathBase";

class Controller_pathBase extends ControllerModel {
  constructor() {
    super("Controller_pathBase");
    
    this.setNewNode = (callback) => {
      let _pathBase = new _pathBase();
      _pathBase.decorate(callback);

      this.addNode(_pathBase);
    }

    this.loadNode = (node, callback) => {
      let _pathBase = new _pathBase();
      _pathBase.copyFrom(node);
      _pathBase.decorate(callback);
      this.addNode(_pathBase)
    }
  }
}

export { Controller_pathBase };
