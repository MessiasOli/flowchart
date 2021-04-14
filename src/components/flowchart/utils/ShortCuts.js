
import { Selection } from "../nodes/_service/selectionService"

export const ShortCuts = {
  Init: (that) => {
    let serviceSelection = new Selection()
    
    document.onkeydown = function (event) {
      if (event.ctrlKey && event.key === 'c') {
        console.log("Copiar")
        serviceSelection.copy();
      }
      if (event.ctrlKey && event.key === 'v'){
        console.log("Colar")
        serviceSelection.cut(that.openDialog);
      }
      
      switch (event.key) {
        case 'Delete':
          that.removeNode();
          break;
        case 'Escape': 
          that.unSelected();
      }
    }
  },
}