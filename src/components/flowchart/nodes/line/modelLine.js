import { NodeModel } from "../_model/NodeModel";
import { DecorationLine } from "./decorationLine"

class Line extends NodeModel {
  constructor() {
    super("Line");
    this.decorator = new DecorationLine();
    
    this.contador = 0;
    this.x = 500;
    this.y = 100;
    this.height = 250;

    this.addCount = () => ++this.contador;
    this.removeCount = () => --this.contador;

    this.decorate = async function() {
      await this.decorator.init(this)
    };
  }
}


export { Line };
