import { NodeModel } from "../_model/NodeModel";
import { Decoration_pathBase } from "./decoration_pathBase"
import { Types } from "../../utils/nodeTypes"

class _pathBase extends NodeModel {
  constructor() {
    super("_pathBase");
    
    this.type = new Types()._pathBase;
    this.x = 500;
    this.y = 100;
    this.height = 250;
    this.width = 100;
    
    this.decorate = async function() {
      this.decorator = new Decoration_pathBase();
      await this.decorator.init(this)
    };
  }
}

export { _pathBase };
