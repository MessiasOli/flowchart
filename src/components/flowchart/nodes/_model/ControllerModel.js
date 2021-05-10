import { IController } from "../_interface/IController";
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import { Types } from "../../utils/nodeTypes"

export class ControllerModel extends IController {
  constructor(nameClass){
    super(nameClass)

    this.removeNode = (node) => SingletonFlowchart.Memory.removeNode(node);
    this.addNode = (node) => SingletonFlowchart.Memory.addNode(node);
    this.updateNode = (node) => SingletonFlowchart.Memory.updateNode(node);

    this.loadCopiedNode = async (node, callback) => {
      let types =  new Types ();

      if(node.type == types.InputBox || node.type == types.Area || node.type == types.BoxText){
        node.connectionPack = new Array();
      }

      await node.decorate(callback);
      
      this.addNode(node)
      node.isSelected();
    }
  }
}
