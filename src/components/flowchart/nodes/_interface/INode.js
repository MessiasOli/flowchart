export class INode {
    constructor(nameClass) {
        this.clone = () => { throw errorMsg( nameClass, 'clone()') }
        this.update = () => {throw errorMsg( nameClass, 'update()') }
        this.remover = () => { throw errorMsg( nameClass, 'remover()') }
        this.decorate = () => { throw errorMsg( nameClass, 'decorate()') }
        this.openDialog = () => { throw errorMsg( nameClass, 'openDialog()') }
        this.simpleCopyFrom = () => { throw errorMsg( nameClass, 'simpleCopyFrom()') }
        this.deleteDecorator = () => { throw errorMsg( nameClass, 'deleteDecorator()') }
    }
}

function errorMsg(nameClass, nameMethod){
    return `ATENÇÃO! - Implementar método ${nameMethod} na classe ${nameClass}`
}