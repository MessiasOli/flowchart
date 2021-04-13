<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Texto</label>
        <md-input v-model="text"></md-input>
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
       text: null,
      }
    },

    watch:{
      text(){
        this.node.text = this.text;
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