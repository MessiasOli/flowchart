<template>
  <div id="app">
    <h1 id='title-app'>Flowsheet D3.js</h1>
    <Content />
  </div>
</template>

<script>
import Content from './components/templates/Content'

export default {
  name: 'App',
  components: {
    Content
  },
  
}
</script>
<style>

* {
  font-family: "Acme", sans-serif !important;
}

#app{
  padding-top: 15px !important;
}

body {
  background-color: #2c3e50;
}

#title-app{
  color: antiquewhite;
  border-radius: 2px;
  margin: 0 30% 5px 30%;
  border-bottom: 3px solid #eee;
  transition-duration: 1.5s;
  text-align: center;
  padding: 10px;
}

#title-app:hover{
  cursor: none;
  color: aquamarine;
  background-color: #577ea530;
  border-radius: 10px;
  box-shadow: 2px 2px 3px #fff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 40px;
}
</style>
