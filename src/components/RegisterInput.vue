<template>
  <span>
    <span class='header'>

      <md-field class='selector' >
        <label for="area">Areas</label>
        <md-select 
          name="area" id="area"
          v-model.lazy="selectedArea" >
          <md-option           
            v-for="(area, i) in areas" :key="i"
            :value="area.nameOfArea">
            {{ area.nameOfArea }} 
          </md-option>
        </md-select>
      </md-field>

        <AddInput 
          :idArea="selectedArea"
          @register="saveMaterial=$event" 
        />
        <md-button class="md-fab md-plain">
          <md-icon>-</md-icon>
        </md-button>
    </span>
    <div class="svg">
      <c-grid v-if="materials.length" class="cheetah-grid" :allowRangePaste="true" :data="materials" :frozen-col-count="1">
        <c-grid-check-column field="excluir" width="5%" min-width="30"></c-grid-check-column>
        <c-grid-input-column field="id" width="8%" min-width="84"> ID </c-grid-input-column>
        <c-grid-input-column field="description" width="38%" min-width="250" >Descrição </c-grid-input-column>
        <c-grid-input-column field="price" width="10%" min-width="150" >Preço </c-grid-input-column>
        <c-grid-input-column field="unitMensurement" width="5%" min-width="84" >Unidade </c-grid-input-column>
        <c-grid-input-column field="specificvalue" width="13%" min-width="100" >Valor Específico</c-grid-input-column>
        <c-grid-input-column field="specificunit" width="14%" min-width="100" >Unidade Específica</c-grid-input-column>
      </c-grid>
      <span v-else>
        <label>Não há materiais registrados, selecione uma área e faça o registro.</label>
      </span>
    </div>
  </span>
</template>

<script>
import axios from "axios";
import { HttpApiNode,  RequestError } from "../utils/global"
import * as cGridAll from 'vue-cheetah-grid'
import AddInput from './AddInputs'

  export default {
    inject: ['switchBar'],

    components: {
      ...cGridAll,
      AddInput
    },

    data() {
      return {
        areas: [],
        selectedArea: "",
        saveMaterial: null,
        materials: [
          // { 
          //   id: 1, 
          //   description: "Acido", 
          //   price: 1.25,
          //   unitMensurement: 'kg',
          //   specificvalue: 0.2, 
          //   specificunit: "g/ton", 
          // },
          // { 
          //   id: 2, 
          //   description: "Energia", 
          //   specificvalue: 1.25, 
          //   price: 1.25,
          //   unitMensurement: 'kg',
          //   specificunit: "MWH/ton", 
          // },
          // { 
          //   id: 3, 
          //   description: "Cal", 
          //   price: 1.25,
          //   unitMensurement: 'kg',
          //   specificvalue: 0.3, 
          //   specificunit: "g/ton"
          // },
          // { 
          //   id: 4, 
          //   description: "Agua", 
          //   price: 1.25,
          //   unitMensurement: 'kg',
          //   specificvalue: 2.17, 
          //   specificunit: "m³/ton"
          // },
        ]
      }
    },

    watch: {
      async selectedArea(){
        this.switchBar();
        console.log("Area selecionada:" + this.selectedArea)
        let a = this.areas.find(a => a.nameOfArea == this.selectedArea)
        console.log('a :>> ', a);

        await axios.get(`${HttpApiNode}/getmaterials/${a.id}`)
          .then(res => res.data)
          .then(data => this.materials = data)
          .catch(RequestError);

        this.switchBar();
      },

      
      async saveMaterial(mat){
        this.switchBar();
        console.log("Salvar Material: " + mat);

        let area = this.areas.find(a => a.nameOfArea == this.selectedArea)
        mat.idarea = area.id;
        console.log('mat :>> ', mat);

        await axios.post(`${HttpApiNode}/addmaterialinput`, mat)
          .then(res => res.data)
          .then(data => this.areas = data)
          .catch(RequestError);

        this.switchBar();
      }
    },

    methods: {
      async loadAreas(){
        await axios.get(`${HttpApiNode}/getareas`)
          .then(res => res.data)
          .then(data => this.areas = data)
          .catch(RequestError);
        this.switchBar();
        this.showMenu = true;

        this.switchBar();
      },
    },

    mounted() {
      this.switchBar();
      this.loadAreas()
    },
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