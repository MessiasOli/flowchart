const NumberFormat = (num) => {
  num = (num+"").replace(".", ",")
  num = num.toLocaleString('pt-br', {minimumFractionDigits: 2});
  if (num.includes(',')) {
    let decimal = num.split(',')
    return decimal[1].lenght == 1 ? `${num}0` : num+''
  }else{
    return `${num},00`;
  }
}

const GetSixConections = (node) => {
  const halfWidth = node.width / 6;
  const halfHeight = (node.height) / 6;
  let newY = node.y
  let top1 = { x: node.x + halfWidth * 1, y: newY, point: 'top1' };
  let top2 = { x: node.x + halfWidth * 3, y: newY, point: 'top2' };
  let top3 = { x: node.x + halfWidth * 5, y: newY, point: 'top3' };
  let left1 = { x: node.x, y: newY + halfHeight * 1, point: 'left1' };
  let left2 = { x: node.x, y: newY + halfHeight * 3, point: 'left2' };
  let left3 = { x: node.x, y: newY + halfHeight * 5, point: 'left3' };
  let bottom1 = { x: node.x + halfWidth * 1, y: node.y + node.height, point: 'bottom1' };
  let bottom2 = { x: node.x + halfWidth * 3, y: node.y + node.height, point: 'bottom2' };
  let bottom3 = { x: node.x + halfWidth * 5, y: node.y + node.height, point: 'bottom3' };
  let right1 = { x: node.x + node.width, y: newY + halfHeight * 1, point: 'right1' };
  let right2 = { x: node.x + node.width, y: newY + halfHeight * 3, point: 'right2' };
  let right3 = { x: node.x + node.width, y: newY + halfHeight * 5, point: 'right3' };
  return [ left1, left2, left3, right1, right2, right3, top1, top2, top3, bottom1, bottom2, bottom3 ];
};

const GetSVGCoordinates = (event) => {
  let boundingClientRect = document.querySelector("#svg").getBoundingClientRect();
  let x;
  let y;

  if(event.type == "drag"){
    x = event.x - window.scrollX;
    y = event.y - window.scrollY;
  }else{
    x = event.pageX - boundingClientRect.left - window.scrollX;
    y = event.pageY - boundingClientRect.top - window.scrollY;
  }

  return [x, y]
}

function GetEdgeOfPoints(points) {
  let minX = points.reduce((prev, point) => {
    return point.x < prev ? point.x : prev;
  }, Infinity);
  let maxX = points.reduce((prev, point) => {
    return point.x > prev ? point.x : prev;
  }, 0);
  let minY = points.reduce((prev, point) => {
    return point.y < prev ? point.y : prev;
  }, Infinity);
  let maxY = points.reduce((prev, point) => {
    return point.y > prev ? point.y : prev;
  }, 0);
  return {start: {x: minX, y: minY}, end: {x: maxX, y: maxY}};
}

export { 
  NumberFormat, 
  GetSixConections,
  GetSVGCoordinates,
  GetEdgeOfPoints
}