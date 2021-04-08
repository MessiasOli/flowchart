/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { BoxText } from "./modelBoxText";

class ControllerBoxText extends ControllerModel {
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
