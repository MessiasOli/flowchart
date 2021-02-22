import { NodeModel } from "../_model/NodeModel";
import { DecorationConnection } from "./decorationConnection"

class Connection extends NodeModel {
  constructor() {
    super("Connection");
    this.decorator = new DecorationConnection();
    
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


export { Connection };
