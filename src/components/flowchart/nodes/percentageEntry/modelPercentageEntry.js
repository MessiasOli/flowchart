import { NodeModel } from "../_model/NodeModel";
import { DecorationPercentageEntry } from "./decorationPercentageEntry"
import { Types } from "../../utils/nodeTypes"
import { NumberFormat } from "../../utils/tools"

class PercentageEntry extends NodeModel {
  constructor() {
    super("PercentageEntry");
    this.decorator = new DecorationPercentageEntry();
    
    this.type = new Types().PercentageEntry
    this.value = "0,00 %";
    this.x = 500;
    this.xText = () => this.x + (this.width / 2)
    this.y = 100;
    this.height = 20;
    this.heightText = this.height - 5;
    this.width = 70;

    this.decorate = async function(callback) {
      await this.decorator.init(this, callback)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }

    this.update = (nodeEdited) => {
      console.log('nodeEdited :>> ', nodeEdited);
      this.value = NumberFormat(nodeEdited.value) + " %"
      let lenghtOfFont = this.value.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }
  }
}


export { PercentageEntry };
