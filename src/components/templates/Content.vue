<template>
  <div class='content'>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Content"
  }
</script>

<style scoped>
.content {
  background-color: rgb(218, 232, 233);
  border-radius: 5px;
  width: 1000px;
  height: 550px;
  margin: auto;
}
</style>