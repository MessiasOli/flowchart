<template>
  <span>
    <span class="header">
      <md-field class="selector">
        <label for="area">Areas</label>
        <md-select name="area" id="area" v-model="selectedArea">
          <md-option
            v-for="(area, i) in areas"
            :key="i"
            :value="area.nameOfArea"
          >
            {{ area.nameOfArea }}
          </md-option>
        </md-select>
      </md-field>

      <AddInput
        title="Adicionar um elemento"
        @register="saveMaterial = $event"
      />
      <md-button
        title="Salvar Alterações"
        @click="updateMaterials()"
        class="md-fab md-plain"
      >
        <md-icon>
          <img src="@/assets/icons/save.png" alt="Salvar" />
        </md-icon>
      </md-button>
      <md-button
        title="Apagar linhas selecionadas"
        @click="deleteMaterials()"
        class="md-fab md-plain"
      >
        <md-icon>-</md-icon>
      </md-button>
    </span>
    <div class="svg">
      <c-grid
        v-if="materials.length"
        class="cheetah-grid"
        :allowRangePaste="true"
        :data="materials"
        :frozen-col-count="1"
      >
        <c-grid-check-column
          field="delete"
          width="5%"
          min-width="30"
        ></c-grid-check-column>
        <c-grid-input-column field="idmaterial" width="8%" min-width="84">
          ID
        </c-grid-input-column>
        <c-grid-input-column field="description" width="38%" min-width="250"
          >Descrição
        </c-grid-input-column>
        <c-grid-input-column field="price" width="10%" min-width="150"
          >Preço
        </c-grid-input-column>
        <c-grid-input-column field="specificvalue" width="13%" min-width="100"
          >Valor Específico</c-grid-input-column
        >
        <c-grid-input-column field="unitmensurement" width="5%" min-width="84"
          >Unidade
        </c-grid-input-column>
      </c-grid>
      <span v-else>
        <label
          >Não há materiais registrados, selecione uma área e faça o
          registro.</label
        >
      </span>
    </div>
  </span>
</template>

<script>
import axios from "axios";
import { HttpApiNode, RequestError, RequestSuscess } from "../utils/global";
import { ReportMixin } from "./ReportMixin"
import { ParseNumber } from "./flowchart/utils/tools"
import * as cGridAll from "vue-cheetah-grid";
import AddInput from "./AddInputs";

export default {

  components: {
    ...cGridAll,
    AddInput,
  },

  mixins: [ ReportMixin ],

  data() {
    return {
      saveMaterial: null,
      materials: [],
      emptyMaterial: {
        idarea: null,
        idmaterial: null,
        description: null,
        specificvalue: null,
        price: null,
        unitmensurement: null,
      },
    };
  },

  watch: {
    async selectedArea() {
      this.switchBar();
      console.log("Area selecionada:", this.selectedArea);

      await this.loadMaterials();

      this.switchBar();
    },

    async saveMaterial(mat) {
      this.switchBar();
      console.log("Salvar Material: ", mat);
      mat.idarea = this.getSelectedIdArea();

      await axios.post(`${HttpApiNode}/material`, mat).catch(RequestError);

      await this.loadMaterials();
      this.switchBar();
    },
  },

  methods: {

    async loadMaterials(idArea) {
      idArea = idArea ? idArea : this.selectedArea;

      this.materials = new Array();
      let area = this.areas.find((a) => a.nameOfArea == idArea);
      await axios
        .get(`${HttpApiNode}/getmaterials/${area.id}`)
        .then((res) => res.data)
        .then((data) => (this.materials = data))
        .catch(RequestError);

      console.log("Materiais carregados :>> ", this.materials.length);
      for (let i = 0; i < 10; i++)
        this.materials.push({ ...this.emptyMaterial });
    },

    async updateMaterials() {
      this.switchBar();
      let toSave = 0;
      let saved = 0;
      await this.materials.forEach(async (mat) => {
        let matEdited = this.copyMaterial(mat);
        if (!this.IsEmpty(matEdited)) {
          toSave++;
          console.log("matEdited :>> ", matEdited);
          matEdited.idarea = !matEdited.idarea
            ? this.getSelectedIdArea()
            : matEdited.idarea;
          await axios
            .put(`${HttpApiNode}/material`, matEdited)
            .then(saved++)
            .catch((err) =>
              RequestError(
                "Ao salvar " + matEdited.description + " Erro: " + err
              )
            );
        }
      });
      if (toSave == saved) RequestSuscess("Atualização realizada com sucesso!");

      setTimeout(() => this.loadMaterials(), 1000);
      this.switchBar();
    },

    async deleteMaterials() {
      await this.materials.forEach(async (mat) => {
        if (mat.delete && !this.IsEmpty(mat)) {
          await axios
            .delete(`${HttpApiNode}/material/${mat.idarea}/${mat.idmaterial}`)
            .catch(RequestError);
        }
      });
      setTimeout(() => this.loadMaterials(), 1000);
    },

    getSelectedIdArea() {
      let area = this.areas.find((a) => a.nameOfArea == this.selectedArea);
      return area ? area.id : null;
    },

    findFreeIndex() {
      let index = 0;
      for (let mat in this.materials) {
        if (this.IsEmpty(mat)) return index;
        index++;
      }
    },

    IsEmpty(mat) {
      if (
        !mat.idarea &&
        !mat.idmaterial &&
        !mat.description &&
        !mat.specificvalue &&
        !mat.price &&
        !mat.unitmensurement
      )
        return true;
      return false;
    },

    copyMaterial(mat) {
      let matEdited = {
        idarea: mat.idarea,
        idmaterial: mat.idmaterial,
        description: mat.description,
        price: ParseNumber(mat.price),
        specificvalue: ParseNumber(mat.specificvalue),
        unitmensurement: mat.unitmensurement,
      };
      return matEdited;
    },
  },
};
</script>

<style src="./GridStyle.css"></style>
