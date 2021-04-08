import { SingletonFlowchart } from "../_service/singletonFlowchart"
export class IController {
  constructor(nameClass){
    this.setNewNode = () => { throw errorMsg( nameClass, 'setNewNode()') }
    this.loadNode = () => { throw errorMsg( nameClass, 'loadNode()') }
    this.saveNodes = () => { throw errorMsg( nameClass, 'saveNodes()') }
    
    this.removeNode = (node) => SingletonFlowchart.Memory.removeNode(node);
    this.addNode = (node) => SingletonFlowchart.Memory.addNode(node);
    this.updateNode = (node) => SingletonFlowchart.Memory.updateNode(node);
  }
}

function errorMsg(nameClass, nameMethod){
  return `ATENÇÃO! - Implementar método ${nameMethod} na classe ${nameClass}`
}