const NumberFormat = (num) => {
  num = num.toLocaleString('pt-br', {minimumFractionDigits: 2});
  if (num.includes(',')) {
    let decimal = num.split(',')
    return decimal[1].lenght == 1 ? `${num}0` : num+''
  }else{
    return `${num},00`;
  }
}


export { NumberFormat }