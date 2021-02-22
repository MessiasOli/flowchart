import { ControllerCircle } from "../circle/controllerCircle"
import { ControllerBoxText } from "../boxText/controllerBoxText"
import { ControllerConnection } from "../connection/controllerConnection"

export class Types {
  constructor(){
    this.BoxTextController = 'boxtext';
    this.CircleController = 'circle';
    this.ConnectionController = 'connection'
  }
}

let types = new Types()

export let GetNewController = function (type){
  switch (type) {
    case types.CircleController:
      return  new ControllerCircle();

    case types.BoxTextController:
      return new ControllerBoxText();

    case types.ConnectionController:
      return new ControllerConnection();

    default: 
      throw `Factory: Atenção - ${type} não é um classe disponível para criação`
  }
}