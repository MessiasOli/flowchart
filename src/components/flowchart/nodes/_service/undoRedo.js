import { SingletonFlowchart } from "./singletonFlowchart";
import { GetNewController } from "./factoryController"
import { RemoveSelectionNodes } from "../../nodes/_model/GlobalDecoration"

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
  let [undo, redo, cache] = getLocalStorage();

  let nodes = undo.length > 0 ? undo[undo.length - 1] : undo;
  if(!nodes || nodes.length == 0) return;

  redo.push(nodes);
  cache && redo.push(cache)
  undo = undo.slice(0, undo.length -1);

  saveLocalStorage(undo, redo);
  return nodes;
};

const GetRedo = function() {
  SingletonFlowchart.Memory.clear();
  let [undo, redo, cache] = getLocalStorage();

  let nodes = redo.length > 0 ? redo[redo.length - 1] : redo;
  
  if(!nodes || nodes.length == 0)
    return;
  
  if(redo.length > 1){
    redo = redo.slice(0, redo.length - 1)
    let undoNodes = cache ? cache : nodes;
    undoNodes && undo.push(undoNodes)
  }

  saveLocalStorage(undo, redo);
  return nodes;
};

export const Save = function() {
  console.log("SaveStatus");
  let nodes = SingletonFlowchart.Memory.getNodesToSave();
  saveLocalStorage(nodes, null);
};

const loadNodes = (nodes, callback) => {
  if(nodes && nodes.length > 0){
    nodes.forEach(n => {
      let ctr = new GetNewController(n.type)
      ctr.loadNode(n, callback)
    })
  }
}

const saveLocalStorage = (u, r) => {
  let [undo, redo, cache] = getLocalStorage();
  let saveAltomatic = u && u.length > 0 && !r

  if(saveAltomatic)
  {
    redo.length > 0 && undo.push(redo[redo.length - 1]);
    cache && undo.push(cache);
    redo = new Array();
    cache = u;
  }
  else
  {
    if (u) undo = u;
    if (r) redo = r;
    cache = null;
    RemoveSelectionNodes();
  }

  clearStorage();
  localStorage.undoRedo = JSON.stringify({ undo, redo, cache });
};

export const clearStorage = function() {
  localStorage.removeItem("undoRedo");
}

const getLocalStorage = () => {
  let undoRedo =  localStorage.undoRedo ? 
                  JSON.parse(localStorage.undoRedo) : 
                  { undo: new Array(), redo: new Array(), cahce: null };
  return [
    undoRedo.undo, 
    undoRedo.redo, 
    undoRedo.cache
  ];
};