<template>
  <div class="report-view">
    <md-field class="selector">
      <label for="area">Areas</label>
      <md-select name="area" id="area" v-model="selectedArea">
        <md-option v-for="(area, i) in areas" :key="i" :value="area.nameOfArea">
          {{ area.nameOfArea }}
        </md-option>
      </md-select>
    </md-field>

    <table class="table-header"  style="width: 100%">
      <tr>
        <th class="col1">Area: {{areaValue.nameOfArea}}</th>
        <th class="col2">Entrada: {{ areaValue.value }}</th>
        <th class="col3">Unidade: {{ areaValue.unitmensurement ? "(" + areaValue.unitmensurement + ")" : areaValue.unitmensurement }}</th>
      </tr>
    </table>

    <c-grid v-if="reportView.length > 0" class="canvas" :data="reportView" :frozen-col-count="1">
      <c-grid-column field="id" width="85">
        ID
      </c-grid-column>
      <c-grid-column field="description" width="32%" min-width="150">
        Descrição
      </c-grid-column>
      <c-grid-column field="specificvalue" width="13.32%" min-width="150">
        Valor Específico
      </c-grid-column>
      <c-grid-column field="amount" width="13.32%" min-width="150">
        Quantidade
      </c-grid-column>
      <c-grid-column field="value" width="13.32%" min-width="150">
        Valor
      </c-grid-column>
      <c-grid-column field="specificunit" width="19%" min-width="150">
        UnidadeEspecífica
      </c-grid-column>
    </c-grid>

    <span v-else>
      <label
        >Não há materiais registrados, realize o registro de materiais para esta area.</label
      >
    </span>

  </div>
</template>

<script>
import * as cGridAll from "vue-cheetah-grid";
import axios from 'axios';
import { HttpApiNode, RequestError } from "../utils/global";
import { ReportMixin } from "./ReportMixin"

export default {
  name: "BillOfMaterial",

  components: {
    ...cGridAll,
  },

  mixins: [ ReportMixin ],

  data() {
    return {
      areaValue: { },
      reportView: [],
    };
  },

  watch: {
    selectedArea(){
      this.loadReportView();
    }
  },

  methods: {
    async loadReportView(){
      let area = this.areas.find(a => a.nameOfArea == this.selectedArea);
      await axios.get(`${HttpApiNode}/getreportview/${area.id}`)
        .then((res) => res.data)
        .then(data => {
          this.areaValue = {...data.area};
          this.reportView = data.report;
        })
        .catch(RequestError)
    }
  },

  mounted(){
    // setTimeout(async () => {
    //   if(this.selectedArea)
    //     await this.loadReportView()
    //   else{
    //   setTimeout(async () => {
    //     if(this.selectedArea)
    //       await this.loadReportView()
    //   }, 1000);    
    //   }
    // }, 1000);
  },
};
</script>

<style scoped>
.report-view {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.report-view > .canvas {
  height: 440px;
}

.table-header {
  background-color: #fff;
}

.table-header th{
  font-size: 1.1rem;
  color: #0008;
  padding-left: 5px;
  text-align: start;
  border-right: 1px solid #0003;
  border-bottom: 1px solid #0003;
}

.table-footer{
  background-color: #fff;
  position: fixed;
  width: 100%;
  bottom: 40px;
  text-align: right;
}

.col1{
  min-width: 346px;
  width: 39%;
}

.col2{
  min-width: 326px;
  width: 39.45%;
}

.col3{
  min-width: 159px;
}
</style>
