import { IController } from "../_interface/IController";
import { SingletonFlowchart } from "../_service/singletonFlowchart"

export class ControllerModel extends IController {
  constructor(nameClass){
    super(nameClass)

    this.removeNode = (node) => SingletonFlowchart.Memory.removeNode(node);
    this.addNode = (node) => SingletonFlowchart.Memory.addNode(node);
    this.updateNode = (node) => SingletonFlowchart.Memory.updateNode(node);
  }
}
