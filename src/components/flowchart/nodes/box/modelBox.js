import { NodeModel } from "../_model/NodeModel";
import { DecorationBox } from "./decorationBox"
import { Types } from "../../utils/nodeTypes"

class Box extends NodeModel {
  constructor(newBox) {
    super("Box");
    
    this.type = new Types().Box;
    this.x = newBox.x;
    this.y = newBox.y;
    this.height = newBox.height;
    this.width = newBox.width;
    
    this.decorate = async function() {
      this.decorator = new DecorationBox();
      await this.decorator.init(this)
    };
  }
}

export { Box };
