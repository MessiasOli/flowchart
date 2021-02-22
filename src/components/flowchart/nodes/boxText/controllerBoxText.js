/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { BoxText } from "./modelBoxText";

class ControllerBoxText extends IController {
  constructor() {
    super("ControllerBoxText");
    console.log(`ControllerBoxText criado!`)
    
    this.setNewNode = () => {
      console.log("Criando novo BoxText");
      let boxText = new BoxText();
      boxText.decorate();
    }
  }
}

export { ControllerBoxText };
