import { NodeModel } from "../_model/NodeModel";
import { DecorationCircle } from "./decorationCircle"

class Circle extends NodeModel{
  constructor() {
    super("Circle")
    this.radius = 20
    
    this.decorate = function() {
      this.decorator = new DecorationCircle()
      this.decorator.init(this)
    }

    this.clone = function() {
      let cloned = new Circle();
      cloned.id = this.id
      cloned.idName = this.idName
      cloned.type = this.type
      cloned.x = this.x
      cloned.y = this.y
      cloned.radius = this.radius
      console.log('clone :>> ', cloned);
      return cloned;
    }
  }
}

Circle.prototype = Object.create(NodeModel.prototype);

export { Circle };
