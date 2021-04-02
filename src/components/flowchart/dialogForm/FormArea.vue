<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateArea">
      <md-field>
        <label>Nome da área</label>
        <md-input v-model="title"></md-input>
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
       title: null,
      }
    },

    watch:{
      title(){
        this.node.nameOfArea = this.title;
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