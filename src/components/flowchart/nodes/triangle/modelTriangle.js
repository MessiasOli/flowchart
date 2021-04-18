import { NodeModel } from "../_model/NodeModel";
import { DecorationTriangle } from "./decorationTriangle"
import { Types } from "../../utils/nodeTypes"

class Triangle extends NodeModel {
  constructor() {
    super("Triangle");
    
    this.type = new Types().Triangle;
    this.x = 500;
    this.y = 100;
    this.height = 250;
    this.width = 100;
    
    this.decorate = async function() {
      this.decorator = new DecorationTriangle();
      await this.decorator.init(this)
    };
  }
}

export { Triangle };
