export class IDecoration {
  constructor(nameClass){
    this.init = () => { throw errorMsg( nameClass, 'init()') }
    this.dragstarted = () => { throw errorMsg( nameClass, 'dragstarted()') }
    this.dragged = () => { throw errorMsg( nameClass, 'dragged()') }
    this.dragended = () => { throw errorMsg( nameClass, 'dragended()') }
    this.move = () => { throw errorMsg( nameClass, 'move()') }
  }
}

function errorMsg(nameClass, nameMethod){
    return `ATENÇÃO! - Implementar método ${nameMethod} na classe '${nameClass}`
}