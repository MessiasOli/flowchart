import { NodeModel } from "../_model/NodeModel";
import { DecorationBoxText } from "./decorationBoxText"
import { Types } from "../../utils/typesNodes"

class BoxText extends NodeModel {
  constructor() {
    super("BoxText");
    this.decorator = new DecorationBoxText();
    
    this.type = new Types().BoxText
    this.connectionPack = new Array();
    this.contador = 0;
    this.x = 500;
    this.y = 80;
    this.width = 100;
    this.boxTextHeight = 20;
    this.boxBodyHeight = 40;
    this.height = this.boxBodyHeight + this.boxTextHeight;
    this.title = "Caixa de Texto"
    
    this.xText = () => this.x + (this.width / 2);
    this.yText = () => this.y - 20;
    this.yBoxBody = () => this.y + 20;
    
    this.decorate = async function(callback) {
      this.calback = callback
      await this.decorator.init(this)
    }

    this.openDialog = ()=>{
      this.calback(this)
    }

    this.update = (nodeEdited) => {
      console.log('nodeEdited :>> ', nodeEdited);
      this.title = nodeEdited.title
      let lenghtOfFont = this.title.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }
  }
}


export { BoxText };
