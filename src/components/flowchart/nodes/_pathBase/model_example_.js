import { INode } from "../_interface/INode";
import { NodeModel } from "../model/NodeModel";
import * as d3 from "d3";

class _example_ {
  constructor() {
    NodeModel.call(this);
    INode.Node.apply(this, ["_example_"]);
    this.contador = 0;

    this.addCount = () => ++this.contador;
    this.removeCount = () => --this.contador;

    this.mostrarMsg = function(msg) {
      this.msg = msg;
      console.log("Message 1: ", msg);
    };

    this.mostrarMsg2 = function() {
      console.log("Message 2: ", this.msg2);
    };

    this.renderMe = async function(svg) {
     
    };

    this.getD3Drag = function (){
    }
  }
}

_example_.prototype = Object.create(NodeModel.prototype);


export { _example_ };
