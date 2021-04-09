/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { InputBox } from "./modelInputBox";

class ControllerInputBox extends ControllerModel {
  constructor() {
    super("Controller_pathBase");
    console.log(`ControllerInputBox criado!`)
    
    this.setNewNode = (callback) => {
      console.log("Criando novo InputBox");
      let inputBox = new InputBox();
      inputBox.decorate(callback);

      this.addNode(inputBox);
    }

    this.loadNode = (node, callback) => {
      let inputBox = new InputBox();
      inputBox.copyFrom(node);
      inputBox.decorate(callback);
      this.addNode(inputBox)
    }
  }
}

export { ControllerInputBox };
