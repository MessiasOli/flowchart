<template>
  <div class="template-input">
    <span v-if="!active">
      <label 
        :class="[ 'text',{'activated': active}]"
        title="Porcentágem de entrada"> 
        {{ value || "0,00" }}<span :class="['conn', {'activatedConn': active}]" @click= switchActive></span>
      </label>
    </span>
    <span class="input activated" v-else>
      <input class="input-number activated" type="number" step="0.05"
        :class="[{'activated': active}]"
        title="Porcentágem de entrada"
        v-model.lazy="value"
      /> 
      <span :class="['conn' ,{'activatedConn': active}]" @click= switchActive></span>
    </span>
  </div>
</template>

<script>
import { ParseNumber } from '../flowchart/utils/tools';

  export default {
    name: "TokenValueComponent",
    props: ["id", "inputValue", "linked", "edited", "switchLink"],

    watch:{
      value(value){
        console.log('value :>> ', value);
        let newValue = ParseNumber(value)
        if(value > 100)
          newValue = 100
        else if(value < 0)
          newValue = 0

          console.log('newValue :>> ', newValue);

        this.$emit("edited", {value: newValue, id: this.id})
      }
    },

    data() {
      return {
        active: this.linked,
        value: this.inputValue || 0.00
      }
    },
    methods: {
      switchActive(){
        this.active = !this.active;
        if(this.active){
          setTimeout(() => document.querySelector('.input-number').select(), 50)
        }
        this.$emit("switchLink", { link: this.active, id: this.id })
      }
    },
  }
</script>

<style scoped>

.template-input{
  height: 25px;
}

.template-input>span{
  background-color: #fa3000;
  padding: 0px 5px;
  margin: 0px 5px;
  border-radius: 5px;
  color: black;
}

.template-input>span:hover{
  background-color: #ff6f00;
}

.activated{
  background-color: #ff6f00 !important;
}

label.activated, .input-number{
  border: solid 1px #ee0979;
  height: 18px;
  width: 65px;
  font-weight: 500;
  color: white;
}

.conn{
  margin-left: 3.5px;
  padding: 0 3.5px;
  border-radius: 3.5px;
  vertical-align: middle;
  font-size: 7px;
  background-color: #0009;
  cursor: pointer;
}

.activatedConn{
  background-color: #0f0;
}

.input-number{
  height: 13px;
  border-radius: 5px;
  vertical-align: baseline;
  -webkit-appearance: none;
  border: none;
  outline: none;
}

input[type=number]::-webkit-inner-spin-button{
  -webkit-appearance: none;
  margin: 0;
}

.input:hover, .input:focus{
  border-bottom: 2px solid #ee0979;
}

.text{
  padding: 0 17.5px;
}

</style>