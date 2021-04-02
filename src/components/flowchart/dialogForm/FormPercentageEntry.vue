<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Valor de desvio (%)</label>
        <md-input v-model="value" type="number" min="0" max="100"></md-input>
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
       value: null,
      }
    },

    watch:{
      value(){
        this.node.value = this.value > 100 ? 100 : this.value < 0 ? 0 : this.value;
      }
    },

    mounted(){}
  }
</script>

<style scoped>
form{
  padding: 10px;
  color: #0009;
}
</style>