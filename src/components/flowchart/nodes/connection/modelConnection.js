import { NodeModel } from "../_model/NodeModel";
import { Types } from "../../utils/nodeTypes";
import { SetArea, GetExtremesCoordinates, GetCoordinatePath } from "../../utils/tools"
import { DecorationConnection } from "./decorationConnection";
class Connection extends NodeModel {
  constructor(x, y, parentId, color) {
    super("Connection");
    
    this.parentId = parentId || "";
    this.type = new Types().Connection
    this.idName = `dot-${this.id}` 
    this.contador = 0;
    this.path = '';
    this.x1 = x || 0;
    this.y1 = y || 0;
    this.x2 = 0;
    this.y2 = 0;
    this.x = this.x1;
    this.y = this.y1;
    this.r = 4;
    this.color = color || "#000"
    this.internalPoints = new Array();
    this.qtdInternalPoints = 0
    this.height = 250;
    
    this.decorate = async function() {
      this.decorator = new DecorationConnection();
      await this.decorator.init(this)
    };

    this.clone = function(){
      let cloned = new Connection(this.x, this.y, this.parentId, this.color);
      cloned.id = this.id;
      cloned.type = this.type;
      cloned.height = this.height;
      cloned.width = this.width;
      cloned.parentId = this.parentId;
      cloned.contador = this.contador;
      cloned.path = this.path;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.x1 = this.x1;
      cloned.y1 = this.y1;
      cloned.x2 = this.x2;
      cloned.y2 = this.y2;
      cloned.r = this.r;
      cloned.internalPoints = this.internalPoints;
      cloned.qtdInternalPoints = this.qtdInternalPoints;

      return cloned;
    }

    this.isAlive = () => document.querySelectorAll("#dot-" + this.id).length ? true : false

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.color = node.color;
      this.contador = node.contador;
      this.path = node.path;
      this.x1 = node.x1;
      this.y1 = node.y1;
      this.x2 = node.x2;
      this.y2 = node.y2;
      this.internalPoints = node.internalPoints;
      this.qtdInternalPoints = node.qtdInternalPoints;

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

      this.internalPoints.forEach(p => {
        p.x += diffX;
        p.y += diffY;
      })

      this.path = newPath;
      coordinates = await GetCoordinatePath(this.path);
      this.x1 = coordinates[0].x
      this.y1 = coordinates[0].y
      this.x2 = coordinates[coordinates.length-1].x
      this.y2 = coordinates[coordinates.length-1].y

      this.decorator.move(newPath);
    }

    this.moveFirstPoint = function (coordinate) {
      this.x1 = coordinate.x
      this.y1 = coordinate.y
      this.changePath([this.x1, this.y1])
      this.decorator.changePath(this.path)
      SetArea(this, this.r * 2);
    }

    this.startMoveConnection = function(coordinate) {
      this.x2 = coordinate.x
      this.y2 = coordinate.y
      this.path = `M${this.x1},${this.y1}L${this.x2},${this.y2}`
      this.decorator.changePath(this.path)
      SetArea(this, this.r * 2);
    }

    this.pointOnPath = async function(coordinate, dot) {
      if(dot == 1)
      {
        if(this.internalPoints.length == 0){
          this.internalPoints.push({x:coordinate.x, y:coordinate.y})
        }else{
          this.internalPoints[0].x = coordinate.x;
          this.internalPoints[0].y = coordinate.y  
        }
        this.changePath(['', '', coordinate.x, coordinate.y])
      }
      else if (dot == 2) 
      {
        if(this.internalPoints.length == 1){
        this.internalPoints.push({x:coordinate.x, y:coordinate.y})
        }else{
          this.internalPoints[1].x = coordinate.x;
          this.internalPoints[1].y = coordinate.y  
        }
        this.changePath(['', '', '','', coordinate.x, coordinate.y])
      }
      else
      {
        this.internalPoints[0].x = coordinate.x;
        this.internalPoints[0].y = coordinate.y
      }
      this.decorator.changePath(this.path)
      SetArea(this, this.r * 2);
    }

    this.moveLastPoint = function(coordinate) {
        this.x2 = coordinate.x
        this.y2 = coordinate.y
      this.changePath([null, null, null, null, null, null, coordinate.x, coordinate.y])
      this.decorator.changePath(this.path)
      SetArea(this, this.r * 2);
    }

    this.changePath = function ([x1,y1,x2,y2,x3,y3,x4,y4]){
      if(x1){
        let cordinate = this.path.slice(this.path.indexOf('L'))
        this.path = 'M' + x1 + "," + y1 + cordinate
      }
      if(x2){
        let path = this.path.split("L");

        if(path.length == 2){
          this.path = `M${this.x1},${this.y1}L${x2},${y2}L${this.x2},${this.y2}`
        }else{
          path[1] = `${x2},${y2}`
          this.path = path.reduce((x,t) => x+"L"+t)
        }
      }
      if(x3){
        let path = this.path.split("L");
        path.length == 3 && path.push(path[path.length - 1])
        path[path.length-2] = `${x3},${y3}`
        this.path = path.reduce((x,t) => x+"L"+t)
      }
      if(x4 && y4){
        let path = this.path.split("L");
        path[path.length-1] = `${x4},${y4}`
        this.path = path.reduce((x,t) => x+"L"+t)
      }
    }

    this.newParent = (node) =>{
      this.id = + new Date();
      this.idName = "Connection-"+this.id;
      this.parentId = node.parentId;
    }
  }
}


export { Connection };
