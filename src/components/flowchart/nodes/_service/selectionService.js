import { ControllerSelection } from "../selection/controllerSelection";

export class Selection {
  constructor() {
    this.ctr = new ControllerSelection();
  
    this.start = (event) => {
      // console.log("start", event)
      this.ctr.setNewNode(event)
    }
  
    this.move = (event) =>{
      // console.log("move", event)
      this.ctr.moveSelectionTo(event)
    }
  
    this.end = (event) =>{
      // console.log("end", event)
      this.ctr.moveSelectionTo(event)
    }
  }
}

