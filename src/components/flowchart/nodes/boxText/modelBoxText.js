import { NodeModel } from "../_model/NodeModel";
import { DecorationBoxText } from "./decorationBoxText"

class BoxText extends NodeModel {
  constructor() {
    super("BoxText");
    this.decorator = new DecorationBoxText();
    
    this.contador = 0;
    this.x = 500;
    this.y = 100;
    this.height = 40;
    this.width = 100;
    this.connectionPack = new Array();

    this.decorate = async function() {
      await this.decorator.init(this)
    };
  }
}


export { BoxText };
