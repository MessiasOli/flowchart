/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { _pathBase } from "./model_pathBase";

class Controller_pathBase extends IController {
  constructor() {
    super("Controller_pathBase");
    console.log(`Controller_pathBase criado!`)
    
    this.setNewNode = () => {
      console.log("Criando novo _pathBase");
      let _pathBase = new _pathBase();
      _pathBase.decorate();
    }
  }
}

export { Controller_pathBase };
