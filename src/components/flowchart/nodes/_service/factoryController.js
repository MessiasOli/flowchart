import { ControllerCircle } from "../circle/controllerCircle"
import { ControllerBoxText } from "../boxText/controllerBoxText"

export class Types {
  constructor(){
    this.BoxTextController = 'boxtext';
    this.CircleController = 'circle';
  }
}

let types = new Types()

export let GetNewController = function (type){
  switch (type) {
    case types.CircleController:
      return  new ControllerCircle();

    case types.BoxTextController:
      return new ControllerBoxText();

    default: 
      throw `Factory: Atenção - ${type} não é um classe disponível para criação`
  }
}