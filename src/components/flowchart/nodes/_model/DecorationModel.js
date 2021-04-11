import { IDecoration } from "../_interface/IDecoration";
import { SingletonFlowchart } from "../_service/singletonFlowchart";
import { BoxSelection } from "../_service/globalDecoration"
import * as d3 from "d3";

export class DecorationModel extends IDecoration {
  constructor(nameClass) {
    super(nameClass);
    this.boxSelection = new BoxSelection;

    this.dragstarted = function() {
      SingletonFlowchart.clicked = true;
      SingletonFlowchart.selected = this.id;

      d3.select(this).style("stroke", "black");
    };

    this.dragged = function(event, d) {
      SingletonFlowchart.clicked = false;

      d.x = event.x;
      d.y = event.y;

      d3.select(this)
        .raise()
        .attr("x", d.x)
        .attr("y", d.y);
    };

    this.dragended = function() {
      this.cursor = "grab";
      d3.select(this).style("stroke", "none");
    };

    this.createConnectionPath = function (node) {
      if(node.connectionPack.length > 0){
        let objConnections = node.connectionPack
        node.connectionPack = new Array();

        objConnections.forEach(obj => {
          let newConn = this.ctrConnection.loadNode(obj.conn)
          node.connectionPack.push({ conn: newConn, dot: obj.dot })
        });
      }
    }

    this.createSelectorArea = function (){
      try
      {
        this.boxSelection.initSelection(this.node);
      }
      catch (e)
      {
        throw `Classe ${nameClass}, Metodo createSelectorArea().\n${e}`;
      }
    }

    this.move = function (){
      try
      {
        if(!this.node){
          throw "this.node não instanciado!"
        }

        console.log('this.node.idName :>> ', this.node);
        d3.select("#"+this.node.idName)
        .raise()
        .attr("x", this.node.x)
        .attr("y", this.node.y);
      }
      catch (e)
      {
        throw `Classe ${nameClass}, Metodo move().\n${e}`;
      }
    }
  }
}
