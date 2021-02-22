/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";

class Controller_pathBase extends IController {
  constructor() {
    super("Controller_pathBase");
    console.log(`Controller_pathBase criado!`)
    
    this.setNewNode = () => {
      console.log("Criando novo BoxText");
    }
  }
}

export { Controller_pathBase };
