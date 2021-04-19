import { NodeModel } from "../_model/NodeModel";
import { Decoration_pathBase } from "./decoration_pathBase"
import { Types } from "../../utils/nodeTypes"

class _pathBase extends NodeModel {
  constructor() {
    super("_pathBase");
    
    this.type = new Types()._pathBase;
    this.x = 0;
    this.y = 0;
    this.height = 250;
    this.width = 100;
    
    this.decorate = async function(callback) {
      this.decorator = new Decoration_pathBase();
      await this.decorator.init(this,callback)
    };

    /* Métodos para serem implementados */ 

    // this.clone = () => {
      // Implementar clone para salvar. Obs: não clonar referencia do objetos apenas seus dados.
      // return null
    // }

    // this.copyFrom = (node) => {
      // this.simpleCopyFrom(node);
      // Implementar copyFrom para carregar o nó com suas particularidades.
    // }

    // this.update = (node) => {
      // this.value = node.value;
      // Implementar copyFrom para carregar o nó com suas particularidades.
      // this.decorator.update();
    // }
  }
}

export { _pathBase };
