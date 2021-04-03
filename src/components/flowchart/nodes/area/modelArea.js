import { NodeModel } from "../_model/NodeModel";
import { DecorationArea } from "./decorationArea"
import { Types } from "../../utils/typesNodes"

class Area extends NodeModel {
  constructor() {
    super("Area");
    this.decorator = new DecorationArea();
    
    this.type = new Types().Area
    this.x = 500;
    this.y = 100;
    this.yText = () => this.y + (this.height / 2) + 5;
    this.xText = () => this.x + this.width / 2;
    this.height = 60;
    this.width = 110;
    this.nameOfArea = "Area"
    this.connectionPack = new Array();

    this.decorate = async function(callback) {
      await this.decorator.init(this, callback)
    }

    this.move = function (x, y){
      this.x = x
      this.y = y
    }

    this.update = (nodeEdited) => {
      this.nameOfArea = nodeEdited.nameOfArea
      let lenghtOfFont = this.nameOfArea.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }
  }
}


export { Area };