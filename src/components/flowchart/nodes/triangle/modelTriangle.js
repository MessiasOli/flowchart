import { NodeModel } from "../_model/NodeModel";
import { DecorationTriangle } from "./decorationTriangle"
import { COLORS } from "../../utils/colors"
import { Types } from "../../utils/nodeTypes"
class Triangle extends NodeModel {
  constructor() {
    super("Triangle");
    
    this.type = new Types().Triangle;
    this.x = 500;
    this.y = 200;
    this.size = 8000;
    this.rotate = 90;
    this.color = COLORS.RoyalBlue
    
    this.decorate = async function(callBack) {
      this.decorator = new DecorationTriangle();
      await this.decorator.init(this, callBack)
    };

    this.clone = () => {
      let triangle = new Triangle();
      triangle.id = this.id;
      triangle.idName = this.idName;
      triangle.type = this.type;
      triangle.x = this.x;
      triangle.y = this.y;
      triangle.size = this.size;
      triangle.rotate = this.rotate;
      triangle.color = this.color;

      return triangle
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.size = node.size;
      this.rotate = node.rotate;
      this.color = node.color;
    }

    this.update = (node) => {
      this.size = node.size;
      this.rotate = node.rotate;
      this.color = node.color;
      this.decorator.update();
    }
  }
}

export { Triangle };
