import { Types } from "../../utils/nodeTypes"
import { ParseNumber } from "../../utils/tools"
import { SingletonFlowchart } from "./singletonFlowchart";
import { RequestError, RequestSuscess } from "../../../../utils/global"

export class Simulation{
  constructor(){
    let types = new Types()
    let simulationNodes = new Map();

    this.validateFlowsheet = () => {
      loadNodesToSitmulation();
      if(validateOutPutArea()){
        console.log("Areas Validada!")
      }
    }

    let validateOutPutArea = () => {
      let allOk = 0;

      simulationNodes.get(types.Area).forEach(async n => {
        let total = 0;
        n.link.out.forEach(id => {
          let node = SingletonFlowchart.Memory.getNodeById(id)
          total += ParseNumber(node[0].value)
        })
        if(total > 100){
          n.warn(1)
          if(allOk <= 0) allOk = 1
        }else if(total < 100){
          n.warn(-1)
          if(allOk == 0) allOk = -1
        }else
          n.warn(0)
      });

      if(allOk > 0){
        RequestError("Não será possível simular, acerte a saida das áreas sinalizadas")
        return false
      }
      if(allOk < 0){
        RequestSuscess("Alguma áreas tem o valor de entrada maior ao valor de saida")
        return true
      }
      if(allOk == 0){
        RequestSuscess("Todas as áreas validadas, com sucesso!")
        return true
      }
    }

    let loadNodesToSitmulation = () => {
      let area = new Array();
      let inputBox = new Array();
      let percentageEntry = new Array();
      let tokenValue = new Array();

      SingletonFlowchart.Memory.memory.forEach(n => {
        if(n.type == types.Area){
          area.push(n)
        }
        if(n.type == types.InputBox){
          inputBox.push(n)
        }
        if(n.type == types.PercentageEntry){
          percentageEntry.push(n)
        }
        if(n.type == types.TokenValue){
          tokenValue.push(n)
        }
      });

      simulationNodes.clear()
      simulationNodes.set(types.Area, area)
      simulationNodes.set(types.InputBox, inputBox)
      simulationNodes.set(types.PercentageEntry, percentageEntry)
      simulationNodes.set(types.TokenValue, tokenValue)
    }
  }
}