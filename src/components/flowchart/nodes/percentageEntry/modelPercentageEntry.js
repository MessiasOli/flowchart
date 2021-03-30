import { NodeModel } from "../_model/NodeModel";
import { DecorationPercentageEntry } from "./decorationPercentageEntry"

class PercentageEntry extends NodeModel {
  constructor() {
    super("PercentageEntry");
    this.decorator = new DecorationPercentageEntry();
    
    this.value = "0,00 %";
    this.x = 500;
    this.y = 100;
    this.height = 20;
    this.heightText = this.height - 5;
    this.width = 70;

    this.decorate = async function() {
      await this.decorator.init(this)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }
  }
}


export { PercentageEntry };
