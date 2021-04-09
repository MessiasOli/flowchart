import { NodeModel } from "../_model/NodeModel";
import { Types } from "../../utils/nodeTypes"
import { DecorationLine } from "./decorationLine"

class Line extends NodeModel {
  constructor() {
    super("Line");
    

    this.type = new Types().Line
    this.x = 500;
    this.y = 100;
    this.path = `M${this.x},${this.y}L${this.x},${this.y+100}`
    this.height = 250;
    this.points = [{ x: this.x, y: this.y, id: this.id, dot: 'p1' },
                   { x: this.x, y: this.y +100, id: this.id, dot: 'p2' }]
    this.cRadius = 1.5;

    this.decorate = async function() {
      this.decorator = new DecorationLine();
      await this.decorator.init(this)
    };

    this.setP1 = (x, y) => {
      this.points[0].x = x;
      this.points[0].y = y;
      this.path = `M${x},${y}L${this.points[1].x},${this.points[1].y}`
    }

    this.setP2 = (x, y) => {
      this.points[1].x = x;
      this.points[1].y = y;
      this.path = `M${this.points[0].x},${this.points[0].y}L${x},${y}`
    }

    this.clone = function() {
      let cloned = new Line();
      cloned.id = this.id;
      cloned.type = this.type
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.path = this.path;
      cloned.points = this.points;
      cloned.cRadius = this.cRadius;

      return cloned;
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node)
      this.path = node.path;
      this.points = node.points;
      this.cRadius = node.cRadius;
    }
  }
}

export { Line };
