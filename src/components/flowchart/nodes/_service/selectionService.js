import { ControllerSelection } from "../selection/controllerSelection";
import { GetNewController } from "../_service/factoryController"
import { SingletonFlowchart } from "./singletonFlowchart";
import { GetSVGCoordinates } from "../../utils/tools"
import { Types } from "../../utils/nodeTypes"
import { RemoveSelectionNodes } from "../_model/GlobalDecoration"

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
      SingletonFlowchart.mousePosition = {x: event.x, y: event.y, type: "drag"}
    }

    this.cancelSelection = () =>{
      this.ctr.cancel();
    }

    this.copy = () => {
      console.log("Copiar")
      let selected = SingletonFlowchart.selected;
      let arraySelected = SingletonFlowchart.selectedNodes;

      if(arraySelected && arraySelected.length > 0){
        SingletonFlowchart.copied = SingletonFlowchart.selectedNodes
      }else{
        SingletonFlowchart.copied = SingletonFlowchart.Memory.getNodeById(selected.split("-")[1])
      }

      console.log('selected, arraySelected :>> ', selected, arraySelected);
      console.log('SingletonFlowchart.copied :>> ', SingletonFlowchart.copied);
    }

    this.cut = async (callback) => {
      let mouse = SingletonFlowchart.mousePosition
      let [xSvg, ySvg] = GetSVGCoordinates(mouse)
      let selected = SingletonFlowchart.copied
      let avoidingEvenId = 0;
      console.log("Colar", mouse, selected)

      await RemoveSelectionNodes();
      SingletonFlowchart.unSelectNode();

      if(!selected){
        return
      }
      
      selected.forEach(async node => {
        if (node.type != new Types().Connection){
          let ctr = GetNewController(node.type)
          let newNode = await node.clone();

          newNode.id = + new Date() + avoidingEvenId++;
          newNode.idName = `${node.idName.split('-')[0]}-${newNode.id}`

          newNode.x = xSvg - Math.abs(newNode.x - xSvg) + 200
          newNode.y = ySvg - Math.abs(newNode.y - ySvg) + 200

          await ctr.loadCopiedNode(newNode, callback);
          SingletonFlowchart.selectedNodes.push(newNode);
        }
      });


    }
  }
}
