<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="">
      <md-field>
        <label>Tamanho (px)</label>
        <md-input v-model="size"></md-input>
      </md-field>
      <md-field>
        <label>Rotação (°)</label>
        <md-input 
          type="number" 
          v-model="rotate"
          min="0.00"
          max="360.00"
          step="0.1"
        ></md-input>
      </md-field>

      <md-field>
        <label for="color">Cor</label>
        <md-select v-model="color" name="color" id="color">
          <md-option 
            v-for="(c, i) in colorKeys" 
            :key="c"
            :value="colors[c]">
            {{(i+1)+"-"+c}}
          </md-option>
        </md-select>
      </md-field>

    </form>
  </div>
</template>

<script>
import { COLORS } from "../utils/colors"

  export default {
    props: {
      node: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
       colorKeys: Object.keys(COLORS),
       colors: COLORS,
       size: parseFloat(this.node.size) / 50,
       rotate: this.node.rotate,
       color: this.node.color,
      }
    },

    watch:{
      size(){ this.node.size = parseFloat(this.size) * 50 },
      rotate(){ this.node.rotate = this.rotate > 360 ? 360 : this.rotate },
      color() { this.node.color = this.color }

    },

    mounted(){ }
  }
</script>

<style scoped>
form{
  padding: 10px;
  color: #0009;
}
</style>