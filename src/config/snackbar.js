import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    duration: 3000,
    iconPack: 'material'
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', action: { text: 'x', onClick : (e, toastObject) => { toastObject.goAway(0); } } }
)

let options = {
    type : 'error', 
    duration: 7000,
    action: {
        text : 'x', 
        onClick : (e, toastObject) => { toastObject.goAway(0); }
    }
}

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    options,
)