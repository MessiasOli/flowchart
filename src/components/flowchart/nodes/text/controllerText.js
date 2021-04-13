/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Text } from "./modelText";

class ControllerText extends ControllerModel {
  constructor() {
    super("ControllerText");
    
    this.setNewNode = (callback) => {
      let text = new Text();
      text.decorate(callback);
      this.addNode(text);
    }

    this.loadNode = (node, callback) => {
      let text = new Text();
      text.simpleCopyFrom(node);

      /* Insira aqui as particularidades do nó a ser criado */

      text.decorate(callback);
      this.addNode(Text)
    }
  }
}

export { ControllerText };
