<template>
  <nav class="menu">
    <ul>
      <li @click="selected('home')" :class="{ 'icon-button': true, 'selected': buttons.home}">
        <router-link class='link' active to="/" >
          <span><img class="icon" src="@/assets/icons/home.svg" alt="Inicio"> Inicio</span>
        </router-link>
      </li>

      <li @click="selected('flowchart')" :class="{ 'icon-button': true, 'selected': buttons.flowchart}">
        <router-link class='link'  to="/flowchart">
          <img class="icon" src="@/assets/icons/flowchart.svg" alt="Diagrama">
          <span>Diagrama</span>
        </router-link>
      </li>

      <li @click="selected('registerInput')" :class="{ 'icon-button': true, 'selected': buttons.registerInput}">
        <router-link class='link'  to="/registerInput">
          <img class="icon" src="@/assets/icons/register.svg" alt="Resgistrar produtos">
          <span>Registrar produtos</span>
        </router-link>
      </li>

      <li @click="selected('billofmaterial')" :class="{ 'icon-button': true, 'selected': buttons.billofmaterial}">
        <router-link class='link'  to="/billofmaterial">
          <img class="icon" src="@/assets/icons/list.svg" alt="Lista técnica">
          <span>Lista técnica</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name:"Menu",

    inject: ["changeMsg"],

    data() {
      return {
        buttons:{
          home: true,
          flowchart: false,
          registerInput: false,
          billofmaterial: false
        }
      }
    },

    methods: {
      selected(caption){
        this.changeMsg(caption);
        Object.keys(this.buttons).forEach(cap => {
          this.buttons[cap] = cap == caption
        })
      }
    },
  }
</script>

<style scoped>

.menu {
  background-color: #5D26C1;
  height: 100%;
}

.menu>ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.icon-button{
  display: flex;
  height: 40px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  transition-duration: 300ms;
}

.icon-button:hover{
  box-shadow: 2px 2px 2px #0003;
}

.link{
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100%;
}

.link:hover {
  text-decoration: none;
}

.icon-button span{
  font-weight: 500;
  color: #fff;
  font-size: 1.05rem;
}

.selected{
  border: none;
  background-image: linear-gradient(to right,#8A2387 , #5D26C1);
  box-shadow: 2px 2px 2px #0003;
}

.icon-button img{
  width: 25px;
  height: 25px;
  margin-right: 5px; 
}

.content {
  padding: 16px;
  background-color: #fff;
}

</style>