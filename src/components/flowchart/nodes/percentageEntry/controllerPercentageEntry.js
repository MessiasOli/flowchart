/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { PercentageEntry } from "./modelPercentageEntry";

class ControllerPercentageEntry extends ControllerModel {
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
