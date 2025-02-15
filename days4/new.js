let dropdown = document.querySelectorAll(".dropdown select")
let btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
for (let select of dropdown) {
  for (curCode in countryList) {
    let option = document.createElement("option")
    option.innerHTML = curCode
    option.value = curCode
    if (select.name === "from" && curCode === "USD") {
      option.selected = "selected"
    }
    else if (select.name === "to" && curCode === "PKR") {
      option.selected = "selected"
    }
    select.append(option)
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target)
  })
}

let updateFlag = (element) => {
  for (code in countryList) {
    if (code === element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
    }
  }
}
window.addEventListener("load", () => {
  updateExchangeRate();
});
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = () => {
  let amount = document.querySelector(".amount input");
  let msg = document.querySelector(".msg");

  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  msg.innerHTML = "Please wait...";
  let api = `84511a3e107869ccf4855a53`
  let URL_1 = `https://v6.exchangerate-api.com/v6/${api}/latest/${fromCurr.value}`
  let response = fetch(URL_1).then(response => response.json()).then(data => {
    let exchangerate = data.conversion_rates[toCurr.value]
    let total = (amtVal * exchangerate).toFixed(2);
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`



  });
};
