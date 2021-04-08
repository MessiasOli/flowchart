/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Selection } from "./modelSelection";
import { GetSVGCoordinates } from "../../utils/tools"


class ControllerSelection extends ControllerModel {
  constructor() {
    super("ControllerSelection");
    console.log(`ControllerSelection criado!`)
    this.selection = null;
    this.onSelection = false;
    
    this.setNewNode = (event) => {
      console.log("Criando novo Selection");
      this.selection = null;
      this.selection = new Selection();

      let [x, y] = GetSVGCoordinates(event);
      this.selection.decorate(x, y);
    }

    this.moveSelectionTo = (event) =>{
      if(this.onSelection){
        let [ x, y ] = GetSVGCoordinates(event)
        this.selection.SelectTo(x, y)
      }
    }

    this.selectNodes = () => {
      if(this.onSelection){
        this.selection.eraseSquare();
      }
      this.onSelection = false
    }
  }
}

export { ControllerSelection };
