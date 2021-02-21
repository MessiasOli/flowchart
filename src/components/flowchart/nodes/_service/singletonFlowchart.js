export var SingletonFlowchart = {
    instance: function(){
        if(!SingletonFlowchart.instance){
            SingletonFlowchart.instance = this;
        }
        return SingletonFlowchart.instance;
    },
    svg: null,
    nodeClicked: false,
    selected: null
}



// var instance = new FlowChartNodes.instance;

// console.log(instance === new FlowChartNodes.instance)
// instance.nodeArray = new Array();
// console.log('instance :>> ', instance.nodeArray);
// instance.nodeArray.push("teste1")
// instance.nodeArray.push("teste2")
// instance.nodeArray.push("teste3")
// instance.nodeArray.push("teste4")
// instance.nodeArray.pop()
// // instance.nodeArray.forEach(console.log);
// var instance2 = new FlowChartNodes.instance;
// console.log('instance2 :>> ', instance2);
// instance2.nodeArray.push("teste5")


// var instance3 = new FlowChartNodes.instance;
// instance3.nodeArray.push("teste6")
// instance3.nodeArray.push("teste7")
// instance3.nodeArray.push("teste8")
// instance3.nodeArray.push("teste9")

// instance.nodeArray.forEach(a => console.log(a));
// console.log('instance === instance4 :>> ', instance === instance3);