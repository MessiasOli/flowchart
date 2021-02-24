import { IDbNode } from "../_interface/IDbNode";

let mapIndiceAndId = new Map();
let listOfNodes = new Array();

class DbLine {
  constructor() {
    IDbNode.DbNode.apply(this, ["DbLine"]);
  }

  static render() {
    let that = this;
    return new Promise(function(resolve) {});
  }

  static setDrag() {
    this.drag = d3
      .drag()
      .on("start", function() {
        console.log("Inicio do click");
      })
      .on("drag", async function() {
        console.log("Arrastando");
      })
      .on("end", function() {
        console.log("Fim do click");
      });
    return drag;
  }

  static setNewNode() {
    console.log("Criando novo Line");
    let line = new Line();
    line.decorate();
  }
}

export { DbLine };
