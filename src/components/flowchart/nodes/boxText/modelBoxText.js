import { NodeModel } from "../_model/NodeModel";
import { DecorationBoxText } from "./decorationBoxText"

class BoxText extends NodeModel {
  constructor() {
    super("BoxText");
    this.decorator = new DecorationBoxText();
    
    this.contador = 0;
    this.x = 500;
    this.y = 80;
    this.yText = () => this.y - 20;
    this.yBoxBody = () => this.y + 20;
    this.width = 100;
    this.boxTextHeight = 20;
    this.boxBodyHeight = 40;
    this.height = this.boxBodyHeight + this.boxTextHeight;
    this.connectionPack = new Array();

    this.decorate = async function() {
      await this.decorator.init(this)
    };
  }
}


export { BoxText };
