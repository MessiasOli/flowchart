<template>
  <div>
    <md-card class="card">
      <md-card-header>
        <md-card-header-text class="title">
          <div class="md-title">{{title}}</div>
          <div class="md-subhead">{{subtitle}}</div>
        </md-card-header-text>
        <md-card-media md-big>
          <img class="img-bom" src="@/assets/BOM.jpg" alt="People">
        </md-card-media>
      </md-card-header>
    </md-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "Bem Vindo!",
        subtitle: "Ao sistema de gestão de produtos."
      }
    },
  }
</script>

<style scoped>

.card{
  width: 100%;
  height: 100%;
}

</style>