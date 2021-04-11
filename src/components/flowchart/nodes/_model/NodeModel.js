import { INode } from "../_interface/INode";
export class NodeModel extends INode {
  constructor(nameClass) {
    super(nameClass)
    this.id = + new Date();
    this.idName = `${nameClass}-${this.id}`
    this.x = 660;
    this.y = 20;
    this.height = 20;
    this.width = 120;
    this.decorator = null;

    this.simpleCopyFrom = function (node) {
      this.id = node.id;
      this.idName = node.idName
      this.type = node.type;
      this.x = node.x;
      this.y = node.y;
      this.height = node.height;
      this.width = node.width;
    }

    this.move = function(){
      try{
        this.decorator.move(); 
      }
      catch (e){
        throw `Decorator da classe ${nameClass} não instanciado.\nError:${e}`
      }
    }

    this.isSelected = function(){
      try{
        this.decorator.createSelectorArea(); 
      }
      catch (e){
        throw `Decorator da classe ${nameClass} não instanciado.\nError:${e}`
      }
    }
  }
}
