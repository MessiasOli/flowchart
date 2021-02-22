import { NodeModel } from "../_model/NodeModel";
import { DecorationCircle } from "./decorationCircle"

class Circle extends NodeModel{
  constructor() {
    super("Circle")
    this.decorator = new DecorationCircle()

    this.decorate = async function() {
      await this.decorator.init(this)
    };
  }
}

Circle.prototype = Object.create(NodeModel.prototype);

export { Circle };
