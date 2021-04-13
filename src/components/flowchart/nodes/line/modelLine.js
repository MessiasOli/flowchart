import { NodeModel } from "../_model/NodeModel";
import { Types } from "../../utils/nodeTypes";
import { SetArea, GetExtremesCoordinates, GetCoordinatePath } from "../../utils/tools"
import { DecorationLine } from "./decorationLine"

class Line extends NodeModel {
  constructor() {
    super("Line");
  
    this.type = new Types().Line
    this.x = 500;
    this.y = 100;
    this.path = `M${this.x},${this.y}L${this.x},${this.y+100}`
    this.points = [{ x: this.x, y: this.y, id: this.id, dot: 'p1' },
                   { x: this.x, y: this.y +100, id: this.id, dot: 'p2' }]
    this.r = 2.5;
    this.x = 498;
    this.y = 95;
    this.width = this.r * 2;
    this.height = 105;

    this.decorate = async function() {
      this.decorator = new DecorationLine();
      await this.decorator.init(this)
    };

    this.setP1 = (x, y) => {
      this.points[0].x = x;
      this.points[0].y = y;
      this.path = `M${x},${y}L${this.points[1].x},${this.points[1].y}`
      SetArea(this, this.r * 3)
    }

    this.setP2 = (x, y) => {
      this.points[1].x = x;
      this.points[1].y = y;
      this.path = `M${this.points[0].x},${this.points[0].y}L${x},${y}`
      SetArea(this, this.r * 3)
    }

    this.move = async () => {
      let coordinates = await GetCoordinatePath(this.path);
      let extremes = await GetExtremesCoordinates(this);
      let newPath = "M";
      let counter = 0

      let diffX = (this.x + this.r) - extremes.min.x
      let diffY = (this.y + this.r) - extremes.min.y

      coordinates.forEach(c => {
        counter++;
        newPath += `${c.x + diffX},${c.y + diffY}`

        if(counter != coordinates.length){
          newPath += 'L'
        }
      });

      this.path = newPath;
      coordinates = await GetCoordinatePath(this.path);
      this.points[0].x = coordinates[0].x
      this.points[0].y = coordinates[0].y
      this.points[1].x = coordinates[coordinates.length-1].x
      this.points[1].y = coordinates[coordinates.length-1].y

      this.decorator.move(newPath);
    }

    this.clone = function() {
      let cloned = new Line();
      cloned.id = this.id;
      cloned.idName = this.idName;
      cloned.type = this.type
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.path = this.path;
      cloned.points = this.points;
      cloned.r = this.r;

      return cloned;
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node)
      this.path = node.path;
      this.points = node.points;
      this.r = node.r;
    }
  }
}

export { Line };
