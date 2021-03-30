import { ControllerBoxText } from "../boxText/controllerBoxText"
import { ControllerCircle } from "../circle/controllerCircle"
import { ControllerLine } from "../line/controllerLine"
import { ControllerConnection } from "../connection/controllerConnection"
import { ControllerInputBox } from "../inputBox/controllerInputBox"
import { ControllerPercentageEntry } from "../percentageEntry/controllerPercentageEntry"

export class Types {
  constructor(){
    this.InputBoxController = 'inputbox';
    this.PercentageEntry = 'percentageentry';
    this.BoxTextController = 'boxtext';
    this.CircleController = 'circle';
    this.LineController = 'line';
    this.ConnectionController = 'connection';
  }
}

let types = new Types()

export let GetNewController = function (type){
  switch (type) {
    case types.InputBoxController:
      return new ControllerInputBox();

    case types.PercentageEntry:
      return new ControllerPercentageEntry();  

    case types.BoxTextController:
      return new ControllerBoxText();

    case types.CircleController:
      return  new ControllerCircle();

    case types.LineController:
      return new ControllerLine();

    case types.ConnectionController:
      return new ControllerConnection();

    default: 
      throw `Factory: Atenção - ${type} não é um classe disponível para criação`
  }
}