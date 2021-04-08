/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { _pathBase } from "./model_pathBase";

class Controller_pathBase extends IController {
  constructor() {
    super("Controller_pathBase");
    
    this.setNewNode = () => {
      let _pathBase = new _pathBase();
      _pathBase.decorate();

      this.addNode(_pathBase);
    }

    this.loadNode = (node) => {
      let _pathBase = new _pathBase();
      _pathBase.simpleCopyFrom(node);

      /* Insira aqui as particularidades do nó a ser criado */

      _pathBase.decorate();
      this.addNode(_pathBase)
    }
  }
}

export { Controller_pathBase };
