<template>
  <div class="menu">
    <md-button to="/" id="icon-button">
      <img class="icon" src="@/assets/icons/home.svg" alt="Inicio">
      <span>Home</span>
    </md-button>

    <md-button to="/flowchart" id="icon-button">
      <img class="icon" src="@/assets/icons/flowchart.svg" alt="Diagrama">
      <span>Diagrama</span>
    </md-button>

    <md-button to="/flowchart" id="icon-button">
      <img class="icon" src="@/assets/icons/list.svg" alt="Relatórios">
      <span>Relatórios</span>
    </md-button>

    <md-button to="/flowchart" id="icon-button">
      <img class="icon" src="@/assets/icons/register.svg" alt="Resgistrar produtos">
      <span>Cadastrar Insumos</span>
    </md-button>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style >
  
#icon-button .md-ripple{
  justify-content: start;
}
</style>

<style scoped>

.menu {
  background-color: #5D26C1;
  height: 100%;
}

#icon-button{
  margin: 0;
  width: 100%;
  min-height: 48px;
}


#icon-button .md-button-content>span{
  width: 100%;
  margin-right: 5px; 
  font-weight: 500;
  color: #fff;
}

#icon-button img{
  width: 25px;
  height: 25px;
  margin-right: 5px; 
  color: #fff;
}

.content {
  padding: 16px;
  background-color: #fff;
}

</style>