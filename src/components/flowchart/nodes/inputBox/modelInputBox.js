import { NodeModel } from "../_model/NodeModel";
import { DecorationInputBox } from "./decorationInputBox"
import { Types } from "../../utils/typesNodes"
import { NumberFormat } from "../../utils/tools"

class InputBox extends NodeModel {
  constructor() {
    super("InputBox");
    this.decorator = new DecorationInputBox();
    
    this.type = new Types().InputBox;
    this.value = "0,00";
    this.x = 500;
    this.y = 100;
    this.xText = () => this.x + (this.width / 2);
    this.height = 20;
    this.heightText = this.height - 5;
    this.width = 60;
    this.srcImg = require("@/assets/raw-material.png");
    this.widthImg = 100;
    this.heightImg = 100;
    this.xImg = this.x -12;
    this.yImg = 13;

    this.decorate = async function(callback) {
      await this.decorator.init(this, callback)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }

    this.update = (nodeEdited) => {
      console.log('nodeEdited :>> ', nodeEdited);
      this.value = NumberFormat(nodeEdited.value)
      let lenghtOfFont = this.value.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }
  }
}


export { InputBox };
