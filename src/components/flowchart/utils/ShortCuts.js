
import { Selection } from "../nodes/_service/selectionService"
import { Redo, Undo } from "../nodes/_service/undoRedo"

export const ShortCuts = {
  Init: (that) => {
    let serviceSelection = new Selection()
    
    document.onkeydown = function (event) {
      switch (event.key) {
        case 'Delete':
          that.removeNode();
          break;
        case 'Escape': 
          that.unSelected();
      }

      if (event.ctrlKey && event.key === 'c') {
        console.log("Copiar")
        serviceSelection.copy();
      }
      if (event.ctrlKey && event.key === 'v'){
        console.log("Colar")
        serviceSelection.cut(that.openDialog);
      }
      if (event.ctrlKey && event.key === 'z'){
        Undo(that);
      }
      if (event.ctrlKey && event.key === 'y'){
        Redo(that);
      }
    }
  },
}