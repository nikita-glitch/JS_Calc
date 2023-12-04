let [div] = document.getElementsByClassName("digits");
let [output] = document.getElementsByClassName("output");
let [output_mem] = document.getElementsByClassName("memory_output");
let previosOperation = "";

for (let i = 9; i >= 0; i--) {
  let button = document.createElement("button");
  button.setAttribute("id", i);
  button.setAttribute("class", 'digit_button');
  button.innerHTML = i;
  div.append(button);
}

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName != "BUTTON") {
    return;
  }
  if (target.closest("div").className == "digits") {
    if (output.value == 0 && target.innerHTML == 0) {
      return;
    }
    if (
      output.value != 0 &&
      output_mem.value.endsWith(previosOperation) &&
      previosOperation
    ) {
      output.value = "";
    }
    if (output.value === '0' && target.innerHTML != 0) {
      output.value = "";
      output_mem.value = "";
    }
    output.value += target.innerHTML;
    output_mem.value += target.innerHTML;
  } else if (target.closest("div").className == "operations") {
    switch (target.innerHTML) {
      case "+":
        calculate("+");
        break;
      case "-":
        calculate("-");
        break;
      case "*":
        calculate("*");
        break;
      case "/":
        calculate("/");
        break;
      case "=":
        calculate("=");
        break;
      case "C":
        output.value = "0";
        output_mem.value = "0";
        previosOperation = "";
        break;
      case ".":
        if (output.value.endsWith(".")) {
          return;
        }
        output.value += ".";
        output_mem.value += ".";
    }
  }
});
let calculate = (symbol) => {
  if (symbol == "=") {
    
    let bufArr = output_mem.value.split(previosOperation);
    let result = 0;
    switch (previosOperation) {
      case "+":
        result = Number(bufArr[0]) + Number(bufArr[1]);
        break;
      case "-":
        result = Number(bufArr[0]) - Number(bufArr[1]);
        break;
      case "*":
        result = Number(bufArr[0]) * Number(bufArr[1]);
        break;
      case "/":
        result = (Number(bufArr[0]) / Number(bufArr[1])).toFixed(3);
        break;
      default:
        result = output.value;
        break;
    }
    output.value = result;
    output_mem.value = result;
    previosOperation = "";
  } else {
    let flag = isEmpty(symbol);
    if (flag) {
      output.value = "";
      let bufArr = output_mem.value.split(previosOperation);
      let result = 0;
      switch (previosOperation) {
        case "+":
          result = Number(bufArr[0]) + Number(bufArr[1]);
          break;
        case "-":
          result = Number(bufArr[0]) - Number(bufArr[1]);
          break;
        case "*":
          result = Number(bufArr[0]) * Number(bufArr[1]);
          break;
        case "/":
          result = (Number(bufArr[0]) / Number(bufArr[1])).toFixed(3);
          break;
      }
      output.value = result;
      output_mem.value = result + symbol;
      previosOperation = symbol;
    }
  }
};

let isEmpty = (symbol) => {
  if (output.value == 0) {
    return;
  }
  if (previosOperation) {
    return true;
  } else {
    output_mem.value += symbol;
    previosOperation += symbol;
    return false;
  }
};
