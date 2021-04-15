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
    this.xRect = () => this.x + 12;
    this.yRect = () => this.y + 92;
    this.xDot = (event) => (event ? event.x : this.x) + 78;
    this.yDot = (event) => (event ? event.y : this.y) + 82;
    this.xText = () => this.xRect() + (this.widthRect / 2);
    this.yText = () => this.yRect() + 15 ;
    this.height = 120;
    this.width = 90;
    this.heightRect = 20;
    this.widthRect = 60;
    this.heightText = this.heightRect - 5;
    this.heightImg = 100;
    this.widthImg = 100;
    this.srcImg = require("@/assets/raw-material.png");
    
    this.decorate = async function(callback) {
      this.decorator = new DecorationInputBox();
      await this.decorator.init(this, callback)
    };

    this.update = (nodeEdited) => {
      this.value = NumberFormat(nodeEdited.value)
      let lenghtOfFont = this.value.length * 9
      this.widthRect = lenghtOfFont > this.widthRect ? lenghtOfFont : this.widthRect;
      this.decorator.setTextAndAdjustWidth()
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.connectionPack = node.connectionPack;
      this.widthImg = node.widthImg
      this.value = node.value;
      this.widthRect = node.widthRect;
      this.heightRect = node.heightRect
    }

    this.clone = () => {
      let cloned = new InputBox();
      cloned.id = this.id
      cloned.idName = this.idName
      cloned.type = this.type
      cloned.connectionPack = this.connectionPack.map(c => ({ conn: c.conn.clone(), dot: c.dot }));
      cloned.width = this.width;
      cloned.value = this.value;
      cloned.widthRect = this.widthRect;
      cloned.valueRect = this.valueRect;
      cloned.x = this.x;
      cloned.y = this.y;

      return cloned
    }
  }
}


export { InputBox };
