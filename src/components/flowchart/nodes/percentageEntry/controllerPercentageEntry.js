/* eslint-disable no-unused-vars */
import { IController } from "../_interface/IController";
import { PercentageEntry } from "./modelPercentageEntry";

class ControllerPercentageEntry extends IController {
  constructor() {
    super("Controller_pathBase");
    console.log(`ControllerPercentageEntry criado!`)
    
    this.setNewNode = (callback) => {
      console.log("Criando novo PercentageEntry");
      let percentageEntry = new PercentageEntry();
      percentageEntry.decorate(callback);
    }
  }
}

export { ControllerPercentageEntry };
