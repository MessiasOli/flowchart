/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { InputBox } from "./modelInputBox";

class ControllerInputBox extends IController {
  constructor() {
    super("Controller_pathBase");
    console.log(`ControllerInputBox criado!`)
    
    this.setNewNode = () => {
      console.log("Criando novo InputBox");
      let inputBox = new InputBox();
      inputBox.decorate();
    }
  }
}

export { ControllerInputBox };
