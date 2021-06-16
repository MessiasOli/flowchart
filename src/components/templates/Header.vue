<template>
  <span class="header">
    <span class="logo">
      <img src="@/assets/logo2.png" alt="Logo">
      <div class="header-title">
        <h1><span class="inverted">P</span>rodução e <span>P</span>lanejamento</h1>
        <h2>Construa sua lista técnica dinamicamente.</h2>
      </div>
    </span>
    <span class="msg">
      <p>{{ currentMessage }}</p>
    </span>
    </span>
</template>

<script>
  export default {
    data() {
      return {
        msg: {
          home: "O encontro da preparação com a oportunidade gera o que chamamos de sorte!",
          flowchart: "Seja criativo, invente, faça diferente porque o óbvio, todos fazem.",
          register: "Não importa o tamanho do problema, o importante é encará-lo com bom humor!",
          report: "A melhor preparação para amanhã é fazendo o seu melhor hoje.",
        },
        currentMessage: "O encontro da preparação com a oportunidade gera o que chamamos de sorte!",
      }
    },
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
  
</style>

<style scoped>


.header{
  height: 70px;
  background-color: #5D26C1;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif !important;
}

.logo{
  display: flex;
  align-items: center;
  width: 50%;
}

.logo>img{
  width: 40px;
  height: 40px;
  border-radius: 30px;
  margin: 0 5px 0 16px;
}

.header-title{
  display: flex;
  flex-direction: column;
  color: #fff;
}

h1{
  margin: 0;
  font-size: 1.3rem;
  margin-top: 0;
  padding-top: 5px;
  text-align: start;
  line-height: 1;
}

h1>span{
  color: black;
  margin-right: 1px;
  font-size: 1.8rem;
}

h2{
  text-align: left;
  margin: 0 0 0 2px;
  font-size: 0.6rem;
  line-height: 1;
}

.msg{
  display: flex;
  justify-content: flex-end;
  width: 50%;
  transition-duration: 600ms;

}

.msg>p{
  width: 300px;
  text-align: center;
  font-size: 1.1rem;
  color: #fff;
  font-family: 'Dancing Script', cursive !important;
}

</style>