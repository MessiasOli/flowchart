<template>
  <div class="template-area">
    <label 
      :class="[{'activated': activated}]"
      :title="!activated ? 'Vincular' : 'Desvincular'"
      @click= switchActive > 
      {{ name || "Nome da área" }} 
    </label>
  </div>
</template>

<script>
  export default {
    props: ["name", "activated"],
    name: "AreaComponente",
    data() {
      return { }
    },
    methods: {
      switchActive(){
        this.activated = !this.activated;
      }
    }
  }
</script>

<style scoped>

.template-area > label{
  background-color: #4169E1;
  padding: 3px 5px;
  margin: 10px 5px;
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