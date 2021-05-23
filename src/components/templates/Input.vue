<template>
    <input v-model.lazy="numberEdited" type="number" name="number" id="number" :placeholder="placeholder">
</template>

<script>
  export default {
    name:"InputNumber",

    props: ["placeholder", "number", "edited", "data"],

    watch:{
      numberEdited(value){
        this.$emit("edited", {value, data: this.data})
      }
    },

    data() {
      return {
        numberEdited: this.number
      }
    },

  }
</script>

<style scoped>
input{
  width: 100px;
  border-bottom: 1px solid #0009;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
}
input:hover, input:focus{
  border-bottom: 2px solid #448aff;
}
</style>