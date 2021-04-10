import { NodeModel } from "../_model/NodeModel";
import { DecorationSelection } from "./decorationSelection"
import { Types } from "../../utils/nodeTypes"

class Selection extends NodeModel {
  constructor() {
    super("Selection");
    
    this.type = new Types().Selection;
    this.height = 0;
    this.width = 0;
    this.xStart = 0;
    this.xEnd = -1;
    this.yStart = 0;
    this.yEnd = -1;
    
    this.getX = () => this.xStart < this.xEnd ? this.xStart : this.xEnd;
    this.getY = () => this.yStart < this.yEnd ? this.yStart : this.yEnd;
    
    this.decorate = async function(xStart, yStart) {
      this.decorator = new DecorationSelection();
      this.xStart = xStart;
      this.yStart = yStart;
      await this.decorator.init(this)
    };

    this.move = function (x, y){
      this.x = x
      this.y = y
    }

    this.SelectTo = function (xSelection, ySelection){
      let xResult = this.getNewDimensions(this.xStart, xSelection);
      this.xEnd = xResult.axis;
      this.width = xResult.length;

      let yResult = this.getNewDimensions(this.yStart, ySelection);
      this.yEnd = yResult.axis;
      this.height = yResult.length;

      this.decorator.renderSquare();
    }

    this.getNewDimensions = function (currentAxis, toAxis){
      let lenghtResult = toAxis - currentAxis;
      let axisResult = 0 

      if(lenghtResult > 0){
        axisResult = toAxis;
      }else{
        axisResult = currentAxis - (currentAxis - toAxis);
      } 

      return { axis: axisResult, length: Math.abs(lenghtResult) }
    }

    this.eraseSquare = function(){
      if(this.decorator){
        console.log('limpo o quadro :>> ');
        this.decorator.removeSquare()
        this.reset();
      }
    }

    this.getCoordinates = ()=>{
      return {x1: this.xStart, y1: this.yStart, x2: this.xEnd, y2: this.yEnd};
    }

    this.reset = () =>{
      this.height = 0;
      this.width = 0;
      this.xStart = 0;
      this.xEnd = -1;
      this.yStart = 0;
      this.yEnd = -1;
    }
  }
}

export { Selection };
