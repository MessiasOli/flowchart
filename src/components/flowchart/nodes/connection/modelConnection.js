import { NodeModel } from "../_model/NodeModel";
import { DecorationConnection } from "./decorationConnection"

class Connection extends NodeModel {
  constructor(x, y) {
    super("Connection");
    this.decorator = new DecorationConnection();
    
    this.contador = 0;
    this.path = '';
    this.x = x;
    this.y = y;
    this.x1 = 0;
    this.y1 = 0;
    this.height = 250;
    
    this.decorate = async function() {
      await this.decorator.init(this)
    };

    this.moveTo = function(coordinate) {
      this.x1 = coordinate.x
      this.y1 = coordinate.y
      this.path = 'M' + this.x + "," + this.y + "L" + this.x1 + "," + this.y1
      this.decorator.move(this.path)
    }

    this.moveFirstPoint = function (coordinate) {
      this.x = coordinate.x
      this.y = coordinate.y
      this.changePath([this.x, this.y])
      this.decorator.move(this.path)
    }

    this.changePath = function ([x1,y1,x2,y2,x3,y3,x4,y4]){
      if(x1){
        let cordinate = this.path.slice(this.path.indexOf('L'))
        this.path = 'M' + x1 + "," + y1 + cordinate
      }
      if(x2){
        this.path += 'M' + x2 + "," + y2
      }
      if(x3){
        this.path += 'M' + x3 + "," + y3
      }
      if(x4){
        this.path += 'M' + x4 + "," + y4
      }
    }
  }
}


export { Connection };
