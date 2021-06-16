var FormMixin = {
  provide(){
    return{
      changeActive : this.changeActive
    }
  },

  data() {
    return {
    }
  },

  methods: {
    changeActive(id, linked){
      console.log(id, linked)
      let obj =  this.areas.find(obj => obj.node.id == id)
      console.log('obj :>> ', obj);
      if(!obj) 
        obj = this.values.find(obj => obj.node.id == id)
      this.linkNode(obj.node, linked)
    },
  },
}

export default FormMixin;