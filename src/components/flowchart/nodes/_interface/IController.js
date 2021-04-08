export class IController {
  constructor(nameClass){
    this.setNewNode = () => { throw errorMsg( nameClass, 'setNewNode()') }
    this.loadNode = () => { throw errorMsg( nameClass, 'loadNode()') }
    this.saveNodes = () => { throw errorMsg( nameClass, 'saveNodes()') }
    this.removeNode = () => { throw errorMsg( nameClass, 'removeNode()') }
    this.addNode = () => { throw errorMsg( nameClass, 'addNode()') }
    this.updateNode = () => { throw errorMsg( nameClass, 'updateNode()') }
  }
}

function errorMsg(nameClass, nameMethod){
  return `ATENÇÃO! - Implementar método ${nameMethod} na classe ${nameClass}`
}