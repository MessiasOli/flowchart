/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { BoxText } from "./modelBoxText";

class ControllerBoxText extends IController {
  constructor() {
    super("ControllerBoxText");
    console.log(`ControllerBoxText criado!`)
    
    this.setNewNode = (callback) => {
      console.log("Criando novo BoxText");
      let boxText = new BoxText();
      boxText.decorate(callback);
    }
  }
}

export { ControllerBoxText };
