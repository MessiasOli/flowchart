<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Título</label>
        <md-input ref="input" v-model="title"></md-input>
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
        this.node.title = this.title;
      }
    },

    mounted(){ 
      this.$refs.input.$el.focus();
    }
  }
</script>

<style scoped>
form{
  padding: 10px;
  color: #0009;
}
</style>