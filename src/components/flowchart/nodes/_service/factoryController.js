import { Types } from "../../utils/nodeTypes"
import { ControllerBoxText } from "../boxText/controllerBoxText"
import { ControllerCircle } from "../circle/controllerCircle"
import { ControllerLine } from "../line/controllerLine"
import { ControllerConnection } from "../connection/controllerConnection"
import { ControllerInputBox } from "../inputBox/controllerInputBox"
import { ControllerPercentageEntry } from "../percentageEntry/controllerPercentageEntry"
import { ControllerArea } from "../area/controllerArea"
import { ControllerSelection } from "../selection/controllerSelection"


let types = new Types()

export let GetNewController = function (type){
  switch (type) {
    case types.InputBox:
      return new ControllerInputBox();

    case types.PercentageEntry:
      return new ControllerPercentageEntry();  

    case types.Area:
      return new ControllerArea();

    case types.BoxText:
      return new ControllerBoxText();

    case types.Circle:
      return  new ControllerCircle();

    case types.Line:
      return new ControllerLine();

    case types.Connection:
      return new ControllerConnection();

    case types.Selection:
      return new ControllerSelection();

    default: 
      throw `Factory: Erro - ${type} não é um classe disponível para ser instânciada`
  }
}