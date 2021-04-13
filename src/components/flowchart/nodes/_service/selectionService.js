import { ControllerSelection } from "../selection/controllerSelection";
import { SingletonFlowchart } from "./singletonFlowchart";

export class Selection {
  constructor() {
    this.ctr = new ControllerSelection();
    this.ctr.setNewNode();
    this.clicked = false;
    this.calMoveSelected = false
    
    this.start = (event) => {
      this.clicked = !this.clicked

      if(this.ctr.hasNodeSelected()){
        this.ctr.cancelSelection();
        this.clicked = false;
      }
      else if(this.clicked || !this.ctr.isRendered){
        this.ctr.start(event)
        this.clicked = true;
        this.calMoveSelected = false;
      }else{
        this.ctr.moveSelectionTo(event)
      }
    }
  
    this.move = (event) =>{
      if(this.clicked){
        this.ctr.moveSelectionTo(event)
      }else if(this.ctr.isRendered && !this.calMoveSelected){
        this.ctr.selectElementsInArea();
        this.calMoveSelected = true;
        this.clicked = false;
      }
      SingletonFlowchart.mousePosition = {x: event.x, y: event.y}
    }

    this.copy = () => {
      console.log("Copiar")
      SingletonFlowchart.copied = SingletonFlowchart.selectedNodes
    }

    this.cut = () => {
      console.log("Colar")
    }
  }
}
