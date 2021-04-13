import { NodeModel } from "../_model/NodeModel";
import { DecorationBoxText } from "./decorationBoxText"
import { Types } from "../../utils/nodeTypes"

class BoxText extends NodeModel {
  constructor() {
    super("BoxText");
    
    this.type = new Types().BoxText
    this.connectionPack = new Array();
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
      this.decorator = new DecorationBoxText();
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

    this.clone = () => {
      let cloned = new BoxText();
      cloned.id = this.id
      cloned.idName = this.idName
      cloned.type = this.type
      cloned.connectionPack = this.connectionPack.map(b => ({ conn: b.conn.clone(), dot: b.dot }));
      cloned.contador = this.contador
      cloned.x = this.x
      cloned.y = this.y
      cloned.title = this.title

      return cloned
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.connectionPack = node.connectionPack;
      this.boxTextHeight = node.boxTextHeight;
      this.boxBodyHeight = node.boxBodyHeight;
      this.title = node.title;
    }
  }
}


export { BoxText };
