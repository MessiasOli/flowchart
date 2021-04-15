import { SingletonFlowchart } from "./singletonFlowchart";
import { GetNewController } from "./factoryController"

// Ctrl+z
export const Undo = function(that) {
  let undoNodes = GetUndo();
  loadNodes(undoNodes, that.openDialog)
}

// Ctrl+y
export const Redo = function(that) {
  let redoNodes = GetRedo();
  loadNodes(redoNodes, that.openDialog)
}

const GetUndo = function() {
  SingletonFlowchart.Memory.clear();
  let [undo, redo] = getLocalStorage();

  let redoNodes = undo.length > 0 ? undo[undo.length - 1] : undo;
  let nodes = undo.length > 1 ? undo[undo.length - 2] : undo[0];

  if(!nodes)
    return

  console.log('GetUndo antes:>> ', undo);
  undo = undo.slice(0, undo.length -1);
  console.log('GetUndo depois:>> ', undo);
  redoNodes && redo.push(redoNodes);

  if(redoNodes.length > 0){
    redo.push(redoNodes)
  }

  saveLocalStorage(undo, redo);

  return nodes;
};

const GetRedo = function() {
  SingletonFlowchart.Memory.clear();
  let [undo, redo] = getLocalStorage();

  let undoNodes = redo.length > 0 ? redo[redo.length - 1] : redo;
  let nodes = redo.length > 1 ? redo[redo.length - 2] : redo[0];

  if(!nodes)
    return;

  console.log('GetRedo antes:>> ', redo);
  redo = redo.slice(0, undo.length - 1);
  console.log('GetRedo antes:>> ', redo);
  
  if(undoNodes.length > 0){
    undo.push(undoNodes)
  }

  saveLocalStorage(undo, redo);

  return nodes;
};

export const Save = function() {
  let nodes = SingletonFlowchart.Memory.getNodesToSave();
  saveLocalStorage(nodes, null);
};

export const clearStorage = function() {
  localStorage.removeItem("undoRedo");
}

const loadNodes = (nodes, callback) => {
  if(nodes){
    nodes.forEach(n => {
      let ctr = new GetNewController(n.type)
      ctr.loadNode(n, callback)
    })
  }
}

const saveLocalStorage = (u, r) => {
  let [undo, redo] = getLocalStorage();

  if(u && !r && u.length > 0)
    undo.push(u)
  else{
    if (u) 
      undo = u;
    
    if (r) 
      redo = r;
  }

  console.log("ctrl + z", undo)
  console.log("ctrl + y", redo)

  clearStorage();
  localStorage.undoRedo = JSON.stringify({ undo, redo });
};

const getLocalStorage = () => {
  let undoRedo = localStorage.undoRedo ? JSON.parse(localStorage.undoRedo) : {undo: new Array(), redo: new Array()};
  let undo = undoRedo.undo;
  let redo = undoRedo.redo;

  return [undo, redo];
};