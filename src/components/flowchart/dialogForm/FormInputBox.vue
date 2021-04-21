<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Valor desejado</label>
        <md-input v-model="value" type="number"></md-input>
      </md-field>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       value: parseFloat(this.node.value.replace(",",".")),
      }
    },

    watch:{
      value(){
        this.node.value = this.value;
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