/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { BoxText } from "./modelBoxText";

class ControllerBoxText {
  constructor() {
    IController.Controller.apply(this, ["ControllerBoxText"]);
    console.log("Controller criado!")
    
    this.setNewNode = () => {
      console.log("Criando novo BoxText");
      let boxText = new BoxText();
      boxText.decorate();
    }
  }
}

export { ControllerBoxText };
