import Vue from 'vue'

export const RequestSuscess = (message) => {
  Vue.toasted.global.defaultSuccess({
    msg: message
  })
};

export const RequestError = (err) => {
  Vue.toasted.global.defaultError({
    msg: err
})
};
export const HttpApiNode = "http://localhost:5000/flowchart";