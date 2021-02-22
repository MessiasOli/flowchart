import { NodeModel } from "../_model/NodeModel";
import { DecorationBoxText } from "./decorationBoxText"

class BoxText extends NodeModel {
  constructor() {
    super("BoxText");
    this.decorator = new DecorationBoxText();
    
    this.contador = 0;
    this.x = 500;
    this.y = 100;
    this.height = 250;

    this.addCount = () => ++this.contador;
    this.removeCount = () => --this.contador;

    this.mostrarMsg = function(msg) {
      this.msg = msg;
      console.log("Message 1: ", msg);
    };

    this.mostrarMsg2 = function() {
      console.log("Message 2: ", this.msg2);
    };

    this.decorate = async function() {
      await this.decorator.init(this)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }
  }
}


export { BoxText };
