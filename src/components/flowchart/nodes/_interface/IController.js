export class IController {
  constructor(nameClass){
    this.setNewNode = () => { throw errorMsg( nameClass, 'setNewNode()') }
    this.loadNodes = () => { throw errorMsg( nameClass, 'loadNodes()') }
    this.saveNodes = () => { throw errorMsg( nameClass, 'saveNodes()') }
    this.addNode = () => { throw errorMsg( nameClass, 'addNode()') }
    this.removeNode = () => { throw errorMsg( nameClass, 'removeNode()') }
    this.editNode = () => { throw errorMsg( nameClass, 'editNode()') }
  }
}

function errorMsg(nameClass, nameMethod){
  return `ATENÇÃO! - Implementar método ${nameMethod} na classe ${nameClass}`
}