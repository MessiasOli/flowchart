import { NodeModel } from "../_model/NodeModel";
import { Types } from "../../utils/nodeTypes"
import { DecorationConnection } from "./decorationConnection"

class Connection extends NodeModel {
  constructor(x, y, parentId, color) {
    super("Connection");
    
    this.parentId = parentId || "";
    this.type = new Types().Connection
    this.contador = 0;
    this.path = '';
    this.x1 = x || 0;
    this.y1 = y || 0;
    this.x2 = 0;
    this.y2 = 0;
    this.x = this.x1;
    this.y = this.y1;
    this.color = color || "#000"
    this.internalPoints = new Array();
    this.qtdInternalPoints = 0
    this.height = 250;
    
    this.decorate = async function() {
      this.decorator = new DecorationConnection();
      await this.decorator.init(this)
    };

    this.clone = function(){
      let cloned = new Connection();
      cloned.id = this.id;
      cloned.type = this.type;
      cloned.height = this.height;
      cloned.width = this.width;
      cloned.parentId = this.parentId;
      cloned.contador = this.contador;
      cloned.path = this.path;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.x1 = this.x2;
      cloned.y1 = this.y2;
      cloned.internalPoints = this.internalPoints;
      cloned.qtdInternalPoints = this.qtdInternalPoints;

      return cloned;
    }

    this.moveFirstPoint = function (coordinate) {
      console.log('moveFirstPoint :>> ', coordinate);
      this.x1 = coordinate.x
      this.y1 = coordinate.y
      this.changePath([this.x1, this.y1])
      this.decorator.move(this.path)
      this.setArea();
    }

    this.moveTo = function(coordinate) {
      console.log('moveTo :>> ', coordinate);
      this.x2 = coordinate.x
      this.y2 = coordinate.y
      this.path = `M${this.x1},${this.y1}L${this.x2},${this.y2}`
      this.decorator.move(this.path)
      this.setArea();
    }

    this.setArea = () => {
      let path = this.path
      let coord = path.replace("M", "").split('L')
      let minX = -1;
      let maxX = 0;
      let minY = 0;
      let maxY = 0;

      coord.forEach(c => {
        let [x, y] = c.split(",")

        if(minX == -1){
          minX = x;
          minY = y;
          maxX = x;
          maxY = y;
        }
        
        if(x < minX)
          minX = x
        if(x > maxX)
          maxX = x

        if(y < minY)
          minY = y
        if(y > maxY)
          maxY = y

      });

      this.height = maxY - minY;
      this.width = maxX - minX;
      console.log('this.height, this.width :>> ', this.height, this.width);
    }

    this.pointOnPath = async function(coordinate, dot) {
      console.log('pointOnPath :>> ');
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
      this.decorator.move(this.path)
      this.setArea();
    }

    this.moveLastPoint = function(coordinate) {
      console.log('moveLastPoint :>> ');
        this.x2 = coordinate.x
        this.y2 = coordinate.y
      this.changePath([null, null, null, null, null, null, coordinate.x, coordinate.y])
      this.decorator.move(this.path)
      this.setArea();
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
  }
}


export { Connection };
