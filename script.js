let [div] = document.getElementsByClassName("digits");
let [output] = document.getElementsByClassName("output");
let [output_mem] = document.getElementsByClassName("memory_output");
let previosOperation = "";

for (let i = 0; i < 10; i++) {
  let button = document.createElement("button");
  button.setAttribute("id", i);
  button.innerHTML = i;
  div.append(button);
}

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName != "BUTTON") {
    return;
  }
  if (target.closest("div").className == "digits") {
    console.log(
      output.value == output_mem.value.split(output_mem.value.length - 1)
    );
    if (
      output.value &&
      output_mem.value.endsWith(previosOperation) &&
      previosOperation
    ) {
      output.value = "";
    } else if (
      output.value == output_mem.value.split(output_mem.value.length - 1)
    ) {
      output.value = output_mem.value;
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
        output.value = "";
        output_mem.value = "";
        previosOperation = "";
        break;
      case ".":
        output.value += ".";
        output_mem.value += ".";
    }
  }
});
let calculate = (symbol) => {
  if (symbol == "=") {
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
        result = Number(bufArr[0]) / Number(bufArr[1]);
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
          result = Number(bufArr[0]) / Number(bufArr[1]);
          break;
      }
      output.value = result;
      output_mem.value = result + symbol;
      previosOperation = symbol;
    }
  }
};

let isEmpty = (symbol) => {
  console.log(previosOperation);
  console.log(output.value);
  if (!output.value) {
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
