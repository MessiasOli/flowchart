import { NodeModel } from "../_model/NodeModel";
import { Types } from "../../utils/nodeTypes"
import { DecorationCircle } from "./decorationCircle"

class Circle extends NodeModel{
  constructor() {
    super("Circle")
    this.type = new Types().Circle
    this.x = 600
    this.y = 300
    this.xCircle = () => this.x + 25
    this.yCircle = () => this.y + 25
    this.radius = 20
    this.height = 50
    this.width = 50
    
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
      return cloned;
    }
  }
}

export { Circle };
