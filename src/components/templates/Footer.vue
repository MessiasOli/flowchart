<template>
<span>
  <md-progress-bar v-if="activeBar" id="progress-bar" class="md-accent" md-mode="query"></md-progress-bar>
  <md-toolbar class="footer md-dense">
    <span>
      Desenvolvido por Messias Oliveira
    </span>
  </md-toolbar>
</span>
</template>

<script>
  export default {
    props: ["switchBar"],

    data() {
      return {
        activeBar: false,
      }
    },
    watch:{
      switchBar(){
        this.activeBar = !this.activeBar;
        document.querySelector("body").style.cursor = this.activeBar ? "progress" : "default"
      }
    },

  }
</script>

<style scoped>

#progress-bar{
  margin-left: 200px;
  bottom: 5px;
}

.progress-bar-off{
  background-color: #5D26C1;
  min-height: 5px;
  width: 100%;
}

.md-toolbar.md-dense{
  min-height: 38px;
}

.md-toolbar.footer{
  position: fixed;
  bottom: 0;
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-content: center;
  background-color: #5D26C1;
}

.footer span {
  font-weight: 100;
  color: white;
}

</style>