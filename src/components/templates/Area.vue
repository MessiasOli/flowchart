<template>
  <div class="template-area">
    <label 
      :class="[{'activated': active}]"
      :title="!activated ? 'Vincular Area' : 'Desvincular Area'"
      @click= switchActive > 
      {{ name || "Nome da área" }} 
    </label>
  </div>
</template>

<script>
  export default {
    name: "AreaComponente",
    props: ["id", "name", "activated"],
    inject: ['changeActive'],

    data() {
      return {
        active: this.activated,
      }
    },
    methods: {
      switchActive(){
        this.active = !this.active;
        this.changeActive(this.id, this.active)
      }
    },
    mounted() {
      // document.querySelector(".template-area").style.width = this.name.length * 9
    },
  }
</script>

<style scoped>

.template-area{
  height: 20px;
}

.template-area > label{
  background-color: #4169E1;
  padding: 0px 5px;
  margin: 0px 5px;
  border-radius: 5px;

  font-weight: 500;
  color: black;
  cursor: pointer;
}

.template-area > label:hover{
  background-color: #6495ED;
}

label.activated{
  background-color: #6495ED;
  border: solid 1px #0000FF;
  color: white;
}

</style>