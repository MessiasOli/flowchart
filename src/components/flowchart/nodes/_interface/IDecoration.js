export var IDecoration = {
    Decoration: function(nameClass) {
        this.init = () => { throw errorMsg( nameClass, 'init()') }
    }
}

function errorMsg(nameClass, nameMethod){
    return `ATENÇÃO! - Implementar método ${nameMethod} na classe ' + ${nameClass}`
}