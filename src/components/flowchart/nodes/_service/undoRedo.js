import { SingletonFlowchart } from "./singletonFlowchart"

export const Undo = function() {
  SingletonFlowchart.Memory.clear();
  let [undo, redo] = getLocalStorage()
  let nodes = undo.length > 0 ? undo[undo.length -1] : [];

  undo.pop();
  redo.push(nodes);
  saveLocalStorage(undo, redo)

  return JSON.parse(nodes);
}

export const Redo = function() {
  SingletonFlowchart.Memory.clear();
  let [undo, redo] = getLocalStorage()
  let nodes = redo.length > 0 ? redo[undo.length -1] : [];

  undo.pop();
  redo.push(nodes);
  saveLocalStorage(undo, redo)

  return JSON.parse(nodes);
}

export const Save = function() {
  let nodes = SingletonFlowchart.Memory.getNodesToSave();
  saveLocalStorage(nodes, null)
}

const saveLocalStorage = (u, r) => {
  let [undo, redo] = getLocalStorage();
  
  if(u) {
    undo.push(JSON.stringify(u))
  }

  if(r){
    redo.push(JSON.stringify(r))
  }
  
  localStorage.undoRedo = {
    undo: undo,
    redo: redo
  }
}

const getLocalStorage = () =>{
  let undo = localStorage.undoRedo ? localStorage.undoRedo.undo : new Array();
  let redo = localStorage.undoRedo ? localStorage.undoRedo.redo : new Array();
  reurn [undo, redo];
}