let [div] = document.getElementsByClassName("digits");
let [output] = document.getElementsByClassName("output");
let [output_mem] = document.getElementsByClassName("memory_output");
let [change_float] = document.getElementsByClassName("change_input");
let [pow_input] = document.getElementsByClassName("pow input");
let [pow_button] = document.getElementsByClassName("pow_button");
let [sqrt_button] = document.getElementsByClassName("sqrt_button");
let powExp = 1;
let numbersAfterPoint;
let previosOperation = "";

for (let i = 0; i <= 9; i++) {
  let button = document.createElement("button");
  button.setAttribute("id", i);
  button.setAttribute("class", "digit_button");
  button.innerHTML = i;
  div.prepend(button);
}

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName != "BUTTON") {
    return;
  }
  if (target.className == "digit_button") {
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
    if (output.value === "0" && target.innerHTML != 0) {
      output.value = "";
      output_mem.value = "";
    }
    output.value += target.innerHTML;
    output_mem.value += target.innerHTML;
  } else if (target.className == "operation") {
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
        } else if (output.value == "") {
          return;
        }
        if (previosOperation) {
          output.value = "";
          output.value += "0."; 
          output_mem.value += "0.";
        }
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
        result = (Number(bufArr[0]) / Number(bufArr[1])).toFixed(
          numbersAfterPoint
        );
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
          result = (Number(bufArr[0]) / Number(bufArr[1])).toFixed(
            numbersAfterPoint
          );
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
    console.log(symbol);
    output_mem.value += symbol;
    previosOperation += symbol;
    return false;
  }
};
output.addEventListener("focus", (e) => {
  if (output.value == "0") {
    output.value = "";
  }
});
output.addEventListener("blur", (e) => {
  if (output.value == "") {
    output.value = "0";
  }
  if (output_mem.value == "") {
    output_mem.value = "0";
  }
});
output.addEventListener("input", (e) => {
  
  switch (output.value.at(output.value.length - 1)) {
    case "+":
      output_mem += output.value.slice(0, output.value.length - 1)
      calculate("+");
      output.value = "";
      break;
    case "-":
      calculate("-");
      output.value = "";
      break;
    case "*":
      calculate("*");
      output.value = "";
      break;
    case "/":
      calculate("/");
      output.value = "";
      break;
    case "=":
      calculate("=");
      output.value = "";
      break;
    case ".":
      if (output.value.endsWith(".")) {
        return;
      } else if (output.value == "") {
        return;
      }
      if (previosOperation) {
        output.value = "";
        output.value += "0."; 
        output_mem.value += "0.";
      }
  }
});

change_float.addEventListener("input", (e) => {
  numbersAfterPoint = e.target.value;
});

pow_button.addEventListener("click", (e) => {
  let num = output.value;
  output.value = output_mem.value = Math.pow(num, powExp);
});
pow_input.addEventListener("input", (e) => {
  console.log(e.target.value);
  powExp = e.target.value;
});
sqrt_button.addEventListener("click", (e) => {
  let num = output.value;
  console.log(num);
  if (isNaN(Math.sqrt(num))) {
    output.value = "0";
    output_mem.value = '0'
  } else {
    output.value = output_mem.value = Math.sqrt(num);
  }
});
