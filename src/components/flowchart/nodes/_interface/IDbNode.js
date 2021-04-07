/* eslint-disable no-unused-vars */
export var IDbNode = {
  DbNode: function(nameClass) {
      this.getAllNodes = function () { throw errorMsg( nameClass, 'getAllNodes()') }
      this.getNodeById = (id) => { throw errorMsg( nameClass, 'getNodeById()') }
      this.updateNode = (node) => { throw errorMsg( nameClass, 'updateNode()') }
      this.removeNode = () => { throw errorMsg( nameClass, 'removeNode()') }
      this.addNode = (node) => { throw errorMsg( nameClass, 'addNode()') }
  }
}

function errorMsg(nameClass, nameMethod){
  return `ATENÇÃO! - Implementar método ${nameMethod} na classe ' + ${nameClass}`
}