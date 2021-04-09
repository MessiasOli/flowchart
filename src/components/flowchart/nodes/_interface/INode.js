export class INode {
    constructor(nameClass) {
        this.decorate = () => { throw errorMsg( nameClass, 'renderMe()') }
        this.remover = () => { throw errorMsg( nameClass, 'remover()') }
        this.update = () => {throw errorMsg( nameClass, 'update()')}
        this.openDialog = () => {throw errorMsg( nameClass, 'openDialog()')}
        this.simpleCopyFrom = () => {throw errorMsg( nameClass, 'simpleCopyFrom()')}
        this.deleteDecorator = () => {throw errorMsg( nameClass, 'deleteDecorator()')}
    }
}

function errorMsg(nameClass, nameMethod){
    return `ATENÇÃO! - Implementar método ${nameMethod} na classe ${nameClass}`
}