/* eslint-disable no-unused-vars */
import { ControllerModel } from "../_model/ControllerModel";
import { Selection } from "./modelSelection";
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import { GetSVGCoordinates } from "../../utils/tools"


class ControllerSelection extends ControllerModel {
  constructor() {
    super("ControllerSelection");
    this.selection = null;
    this.isRendered = false;
    
    this.setNewNode = () => {
      this.selection = null;
      this.selection = new Selection();
    }

    this.start = (event) => {
      if(!this.isRendered){
        console.log("start")
        let [x, y] = GetSVGCoordinates(event);
        this.selection.decorate(x, y);
        this.isRendered = true
      }else{
        this.cancel()
      }
    }

    this.moveSelectionTo = (event) =>{
      if(this.isRendered){
        let [ x, y ] = GetSVGCoordinates(event)
        this.selection.SelectTo(x, y)
      }
    }

    this.cancel = () =>{
      this.selection.eraseSquare();
      this.isRendered = false;
      console.log("fim")
    }

    this.selectElementsInArea = () => {
      let coordinates = this.selection.getCoordinates();
      console.log(`coordinates`, coordinates);
      let nodesSelected = SingletonFlowchart.Memory.getNodesBetween(coordinates)
      console.log('nodesSelected :>> ', nodesSelected);

      this.cancel();
    }
  }
}

export { ControllerSelection };
