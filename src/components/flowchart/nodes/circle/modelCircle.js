import { NodeModel } from "../_model/NodeModel";
import { DecorationCircle } from "./decorationCircle"

class Circle extends NodeModel{
  constructor() {
    super("Circle")
    this.decorator = new DecorationCircle()
    this.radius = 20

    this.decorate = async function() {
      await this.decorator.init(this)
    };

    this.copyTo = function (){
      return {
        id: this.id,
        type: this.type,
        x: this.x,
        y: this.y,
        heigth: this.heigth,
        width: this.width,
        radius: this.radius
      }
    }
  }
}

Circle.prototype = Object.create(NodeModel.prototype);

export { Circle };
