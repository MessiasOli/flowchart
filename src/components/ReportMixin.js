import axios from "axios";
import { HttpApiNode, RequestError } from "../utils/global";

export var ReportMixin = {
  inject: ["switchBar"],

  data() {
    return {
      areas: [],
      selectedArea: "",
    }
  },

  methods: {
    async loadAreas() {
      this.switchBar();
      await axios
        .get(`${HttpApiNode}/getareas`)
        .then((res) => res.data)
        .then((data) => {
          this.areas = data;
          setTimeout(() => (this.selectedArea = this.areas[0].nameOfArea), 300);
        })
        .catch(RequestError);
      this.showMenu = true;

      this.switchBar();
    },
  },

  created(){
    this.switchBar();
    this.loadAreas();
  },
}