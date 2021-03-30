import { NodeModel } from "../_model/NodeModel";
import { DecorationInputBox } from "./decorationInputBox"

class InputBox extends NodeModel {
  constructor() {
    super("InputBox");
    this.decorator = new DecorationInputBox();
    
    this.value = "0,00";
    this.x = 500;
    this.y = 100;
    this.height = 20;
    this.heightText = this.height - 5;
    this.width = 60;
    this.srcImg = require("@/assets/raw-material.png");
    this.widthImg = 100;
    this.heightImg = 100;
    this.xImg = this.x -12;
    this.yImg = 13;

    this.decorate = async function() {
      await this.decorator.init(this)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }
  }
}


export { InputBox };
