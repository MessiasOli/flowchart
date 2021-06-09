<template>
  <span>
    <span class='header'>
      <md-field class='selector' >
        <label for="area">Areas</label>
        <md-select v-model="area" name="area" id="area">
          <md-option value="fight-club">Area 1</md-option>
          <md-option value="godfather">Area 2</md-option>
          <md-option value="godfather-ii">Area 3</md-option>
          <md-option value="godfather-iii">Area 4</md-option>
        </md-select>
      </md-field>
        <AddInput />
        <md-button class="md-fab md-plain">
          <md-icon>-</md-icon>
        </md-button>
    </span>
    <div class="svg">
      <c-grid class="cheetah-grid" :allowRangePaste="true" :data="records" :frozen-col-count="1">
        <c-grid-check-column field="excluir" width="5%" min-width="30"></c-grid-check-column>
        <c-grid-input-column field="id" width="8%" min-width="84"> ID </c-grid-input-column>
        <c-grid-input-column field="description" width="38%" min-width="250" >Descrição </c-grid-input-column>
        <c-grid-input-column field="price" width="10%" min-width="150" >Preço </c-grid-input-column>
        <c-grid-input-column field="unitMensurement" width="5%" min-width="84" >Unidade </c-grid-input-column>
        <c-grid-input-column field="specificvalue" width="13%" min-width="100" >Valor Específico</c-grid-input-column>
        <c-grid-input-column field="specificunit" width="14%" min-width="100" >Unidade Específica</c-grid-input-column>
      </c-grid>
    </div>
  </span>
</template>

<script>
import * as cGridAll from 'vue-cheetah-grid'
import AddInput from './AddInputs'

  export default {
    components: {
      ...cGridAll,
      AddInput
    },

    data() {
      return {
        texts: {'op1': 'teste1', 'op2':'teste2', 'op3':'testes3'},
        records: [
          { 
            id: 1, 
            description: "Acido", 
            price: 1.25,
            unitMensurement: 'kg',
            specificvalue: 0.2, 
            specificunit: "g/ton", 
          },
          { 
            id: 2, 
            description: "Energia", 
            specificvalue: 1.25, 
            price: 1.25,
            unitMensurement: 'kg',
            specificunit: "MWH/ton", 
          },
          { 
            id: 3, 
            description: "Cal", 
            price: 1.25,
            unitMensurement: 'kg',
            specificvalue: 0.3, 
            specificunit: "g/ton"
          },
          { 
            id: 4, 
            description: "Agua", 
            price: 1.25,
            unitMensurement: 'kg',
            specificvalue: 2.17, 
            specificunit: "m³/ton"
          },
        ]
      }
    },

    methods:{

    }
  }
</script>

<style>
.header{
  display: flex;
}

.svg{
  width: 100%;
  height: 500px;
}

.cheetah-grid>canvas{
  position: fixed;
  left: 0px;
  height: 537px;
  border-radius: 8px;
}

.cheetah-grid>.grid-scrollable{
  height: 537px;
}

.selector{
  background-color: white;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: 5px;
  height: 60px;
}

.selector>label{
  padding-left: 16px;
  font-size: 1rem;
}

#area {
  font-size: 2rem;
}
</style>