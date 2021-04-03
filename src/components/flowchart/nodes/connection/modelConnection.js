import { NodeModel } from "../_model/NodeModel";
import { DecorationConnection } from "./decorationConnection"

class Connection extends NodeModel {
  constructor(x, y, parentId, color) {
    super("Connection");
    this.decorator = new DecorationConnection();
    
    this.parentId = parentId
    this.contador = 0;
    this.path = '';
    this.x = x;
    this.y = y;
    this.x1 = 0;
    this.y1 = 0;
    this.color = color || "#000"
    this.internalPoints = new Array();
    this.qtdInternalPoints = 0
    this.height = 250;
    
    this.decorate = async function() {
      await this.decorator.init(this)
    };

    this.moveFirstPoint = function (coordinate) {
      this.x = coordinate.x
      this.y = coordinate.y
      this.changePath([this.x, this.y])
      this.decorator.move(this.path)
    }

    this.moveTo = function(coordinate) {
      this.x1 = coordinate.x
      this.y1 = coordinate.y
      this.path = `M${this.x},${this.y}L${this.x1},${this.y1}`
      this.decorator.move(this.path)
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
      this.decorator.move(this.path)
    }

    this.moveLastPoint = function(coordinate) {
        this.x1 = coordinate.x
        this.y1 = coordinate.y
      this.changePath([null, null, null, null, null, null, coordinate.x, coordinate.y])
      this.decorator.move(this.path)
    }

    this.changePath = function ([x1,y1,x2,y2,x3,y3,x4,y4]){
      if(x1){
        let cordinate = this.path.slice(this.path.indexOf('L'))
        this.path = 'M' + x1 + "," + y1 + cordinate
      }
      if(x2){
        let path = this.path.split("L");

        if(path.length == 2){
          this.path = `M${this.x},${this.y}L${x2},${y2}L${this.x1},${this.y1}`
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
