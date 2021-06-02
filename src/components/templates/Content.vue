<template>
  <div class='content'>
    <span class="menu">
      <Menu />
    </span>
    <span class="router">
      <router-view />
    </span>
    
  </div>
</template>

<script>
import Menu from "./Menu"

  export default {
    name: "Content",
    components:{
      Menu
    }
  }
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 200px 1fr;
  height: 547px;

  background-color: #dae8e9;
  border-radius: 5px;
}

.menu{
  grid-column-start: 1;
}

.router{
  grid-column-start: 2;
  margin: 8px;
}

</style>