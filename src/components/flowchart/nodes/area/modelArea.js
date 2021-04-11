import { NodeModel } from "../_model/NodeModel";
import { DecorationArea } from "./decorationArea"
import { Types } from "../../utils/nodeTypes"

class Area extends NodeModel {
  constructor() {
    super("Area");
    
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
      this.decorator = new DecorationArea();
      await this.decorator.init(this, callback)
    }

    this.update = (nodeEdited) => {
      this.nameOfArea = nodeEdited.nameOfArea
      let lenghtOfFont = this.nameOfArea.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }

    this.clone = () => {
      let cloned = new Area()
      cloned.id = this.id
      cloned.idName = this.idName
      cloned.type = this.type
      cloned.height = this.height;
      cloned.width = this.width;
      cloned.x = this.x
      cloned.y = this.y
      cloned.nameOfArea = this.nameOfArea
      cloned.connectionPack = this.connectionPack.map(c => ({ conn: c.conn.clone(), dot: c.dot }))

      return cloned
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node)
      this.connectionPack = node.connectionPack;
      this.nameOfArea = node.nameOfArea;

    }
  }
}


export { Area };