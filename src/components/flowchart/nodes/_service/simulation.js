import { Types } from "../../utils/nodeTypes"
import { ParseNumber, NumberFormat } from "../../utils/tools"
import { SingletonFlowchart } from "./singletonFlowchart";
import { RequestError, RequestSuscess } from "../../../../utils/global"

export class Simulation{
  constructor(){
    let types = new Types()
    let simulationNodes = new Map();

    this.validateFlowsheet = () => {
      loadNodesToSitmulation();
      if(validateOutPutArea()){
        executeCalculate()
        RequestSuscess("Simulação Executada com sucesso!")
      }
    }

    let executeCalculate = () => {
      let inputMaterial = 0
      simulationNodes.get(types.InputBox).forEach(n => inputMaterial += ParseNumber(n.link.value))

      if(inputMaterial <= 0) {
        RequestError("Valor da matéria prima deve ser maior que 0.")
        return;
      }
      startCalc()
    }

    let startCalc = () => {
      simulationNodes.get(types.InputBox).forEach(n => {
        n.link.out.forEach(id => {
          let area = simulationNodes.get(types.Area).filter(n => n.id == id)[0]
          area.link.value += ParseNumber(n.link.value)
        })
      })
      calcArea()
    }

    let calcArea = () => {
      simulationNodes.get(types.Area).forEach(n => {
        if(n.link.value > 0){
          n.link.out.forEach(id => {
            let percentageEntry = simulationNodes.get(types.PercentageEntry).filter(n => n.id == id)[0]
            percentageEntry.link.value = n.link.value * (ParseNumber(percentageEntry.value) / 100)
          })
        }
      })
      calcPercentageEntry()
    }

    let calcPercentageEntry = () => {
      simulationNodes.get(types.PercentageEntry).forEach(n => {
        if(n.link.value > 0){
          n.link.out.forEach(id => {
            let tokenValue = simulationNodes.get(types.TokenValue).filter(n => n.id == id)[0]
            if(tokenValue)
            {
              tokenValue.link.value = NumberFormat(n.link.value)
              tokenValue.updateValue()
            }
            else
            {
              let area = simulationNodes.get(types.Area).filter(n => n.id == id)[0]
              if(area){
                area.value += n.link.value
                calcArea()
              } 
            }
          })
        }
      })
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
        if(n.type == types.InputBox){
          inputBox.push(n)
        }
        if(n.type == types.Area){
          n.link.value = 0;
          area.push(n)
        }
        if(n.type == types.PercentageEntry){
          percentageEntry.push(n)
        }
        if(n.type == types.TokenValue){
          n.link.value = 0;
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