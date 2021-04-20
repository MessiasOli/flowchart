<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Nome da área</label>
        <md-input v-model="title"></md-input>
      </md-field>

      <span><hr></span>

      <md-table class="table">
        <md-table-row>
          <md-table-head>ID</md-table-head>
          <md-table-head>Conexão</md-table-head>
          <md-table-head>Entrada</md-table-head>
          <md-table-head>Saida</md-table-head>
        </md-table-row>
        <md-table-row>
          <md-table-cell>1025</md-table-cell>
          <md-table-cell>Teste 1</md-table-cell>
          <md-table-cell>
            <md-checkbox v-model="boolean" class="md-primary" />
          </md-table-cell>
          <md-table-cell>
            <md-checkbox v-model="boolean" class="md-primary" />
          </md-table-cell>
        </md-table-row>
      </md-table>

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
       boolean: false,
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
  display: flex;
  flex-direction: column;
}

.table {
  
}

</style>