export class INode {
    constructor(nameClass) {
        this.move = () => { throw errorMsg( nameClass, 'move()') }
        this.clone = () => { throw errorMsg( nameClass, 'clone()') }
        this.update = () => {throw errorMsg( nameClass, 'update()') }
        this.remover = () => { throw errorMsg( nameClass, 'remover()') }
        this.decorate = () => { throw errorMsg( nameClass, 'decorate()') }
        this.openDialog = () => { throw errorMsg( nameClass, 'openDialog()') }
        this.simpleCopyFrom = () => { throw errorMsg( nameClass, 'simpleCopyFrom()') }
        this.copyFrom = () => { throw errorMsg( nameClass, 'CopyFrom()') }
        this.deleteDecorator = () => { throw errorMsg( nameClass, 'deleteDecorator()') }
        this.isSelected = () => { throw errorMsg( nameClass, 'isSelected()') }
    }
}

function errorMsg(nameClass, nameMethod){
    return `ATENÇÃO! - Implementar método ${nameMethod} na classe ${nameClass}`
}