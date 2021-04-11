/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { Box } from "./modelBox";

class ControllerBox extends IController {
  constructor() {
    super("ControllerBox");
    
    this.setNewNode = () => {
      let box = new Box();
      box.decorate();
    }

    this.loadNode = (node) => {
      let box = new Box();
      box.simpleCopyFrom(node);

      /* Insira aqui as particularidades do nó a ser criado */

      box.decorate();
    }
  }
}

export { ControllerBox };
