<template>
  <div id="app">
    <Header :changeMsg = currentPage />
    <Content />
    <Footer :switchBar = activeBar />
  </div>
</template>

<script>
import Header from "./components/templates/Header"
import Footer from "./components/templates/Footer"
import Content from './components/templates/Content'

export default {
  name: 'App',

  components: {
    Content,
    Header,
    Footer
  },

  provide(){
    return {
      switchBar: this.switch,
      changeMsg: this.changeHeaderMessage,
      version: "v0.01"
    }
  },

  data() {
    return {
      activeBar: 0,
      currentPage: "home",
    }
  },

  methods: {
   switch(){ 
     this.activeBar++ 
    }, 
    changeHeaderMessage(param){
      this.currentPage = param;
    }
  },
}
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
* {
  font-family: "Acme", sans-serif !important;
}

#app{
  padding-top: 0px !important;
}

body {
  background-color: #dae8e9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 40px;
}
</style>
