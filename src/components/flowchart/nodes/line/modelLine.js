import { NodeModel } from "../_model/NodeModel";
import { DecorationLine } from "./decorationLine"

class Line extends NodeModel {
  constructor() {
    super("Line");
    
    this.contador = 0;
    this.x = 500;
    this.y = 100;
    this.height = 250;
    
    this.addCount = () => ++this.contador;
    this.removeCount = () => --this.contador;

    this.decorate = async function() {
      this.decorator = new DecorationLine();
      await this.decorator.init(this)
    };

    this.clone = function() {
      let cloned = new Line();
      cloned.id = this.id;
      cloned.type = this.type
      cloned.contador = this.contador;
      cloned.x = this.x;
      cloned.y = this.y;

      return cloned;
    }
  }
}


export { Line };
