import { IController } from "../_interface/IController";

class ControllerBoxText {
  constructor() {
    NodeModel.call(this);
    IController.Controller.apply(this, ["ControllerBoxText"]);

    this.setDrag = function() {
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
    };
  }
}