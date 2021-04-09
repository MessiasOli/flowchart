import { NodeModel } from "../_model/NodeModel";
import { DecorationInputBox } from "./decorationInputBox"
import { Types } from "../../utils/nodeTypes"
import { NumberFormat } from "../../utils/tools"

class InputBox extends NodeModel {
  constructor() {
    super("InputBox");
    
    this.connectionPack = new Array();
    this.type = new Types().InputBox;
    this.value = "0,00";
    this.x = 500;
    this.y = 100;
    this.xText = () => this.x + (this.width / 2);
    this.xDot = () => this.x + 70;
    this.yDot = () => this.y - 5;
    this.height = 20;
    this.heightText = this.height - 5;
    this.width = 60;
    this.srcImg = require("@/assets/raw-material.png");
    this.widthImg = 100;
    this.heightImg = 100;
    this.xImg = this.x -12;
    this.yImg = 13;
    
    this.decorate = async function(callback) {
      this.decorator = new DecorationInputBox();
      await this.decorator.init(this, callback)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }

    this.update = (nodeEdited) => {
      this.value = NumberFormat(nodeEdited.value)
      let lenghtOfFont = this.value.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.connectionPack = node.connectionPack;
      this.xImg = node.xImg;
      this.yImg = node.yImg;
      this.value = node.value;
    }

    this.clone = () => {
      let cloned = new InputBox();
      cloned.id = this.id
      cloned.type = this.type
      cloned.connectionPack = this.connectionPack.map(c => ({ conn: c.conn.clone(), dot: c.dot }));
      cloned.value = this.value;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.xImg = this.xImg;
      cloned.yImg = this.yImg;

      return cloned
    }
  }
}


export { InputBox };
