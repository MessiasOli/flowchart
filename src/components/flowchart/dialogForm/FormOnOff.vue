<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Descrição</label>
        <md-input v-model="description"></md-input>
      </md-field>
    </form>
  </div>
</template>

<script>
  export default {
    name: "FormOnOff",
    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       description: this.node.description,
      }
    },

    watch:{
      description(){
        this.node.description = this.description;
      }
    },

    mounted(){ }
  }
</script>

<style scoped>
form{
  padding: 10px;
  color: #0009;
}
</style>