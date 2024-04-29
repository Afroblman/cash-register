const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

let price = 3.26;
let cid = [
   ["PENNY", 0.5],
   ["NICKEL", 0], 
   ["DIME", 0.6], 
   ["QUARTER", 1], 
   ["ONE", 2], 
   ["FIVE", 15], 
   ["TEN", 30], 
   ["TWENTY", 60], 
   ["ONE HUNDRED", 0]
];
let total = Number(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

function checkCashRegister() {
let cash = Number(cashInput.value);
let change = cash - price;
change = Number(change.toFixed(2));
changeDue.innerHTML = "";
  if(cash < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDue.classList.add("hidden");
    cashInput.value = "";
    return;
  }
  else if(cash === price) {
changeDue.innerHTML = `No change due - customer paid with exact cash`;
changeDue.classList.remove("hidden");
cashInput.value = "";
return;
  }
  else {
      const unit = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
      ];

    const changeObj = [];
    if (change > total) {
      changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
      changeDue.classList.remove("hidden");
      cashInput.value = "";
      return;
    }  
else {
      let j = unit.length - 1;
      for (let i = 0; i < unit.length; i++) {
        let changeUnit = 0;
        while (change >= unit[i][1] && cid[j][1] > 0) {
          changeUnit += unit[i][1];
          changeUnit = Number(changeUnit.toFixed(2));
          change -= unit[i][1];
          change = change.toFixed(2);
          cid[j][1] -= unit[i][1];
          cid[j][1] = Number(cid[j][1].toFixed(2));
        }
        if(changeUnit > 0) {
          changeObj.push([unit[i][0], changeUnit]);
        }
        j--;
      }
    }
    if (change > 0) {
      changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
      changeDue.classList.remove("hidden");
      cashInput.value = "";
      return;
    }

    else if(Number(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2))===0) {
       changeDue.innerHTML = "Status: CLOSED <br />";
       changeObj.forEach(item => {
        if (item[1] > 0) {
          changeDue.innerHTML += item[0] + ": $" + item[1] + "<br />";
        }
  });
  changeDue.classList.remove("hidden");
  return;
    }
else {

    changeDue.innerHTML += "Status: OPEN<br />";
      changeObj.forEach(item => changeDue.innerHTML += item[0] + ": $" + item[1] + "<br />");
      changeDue.classList.remove("hidden");
      cashInput.value = "";
      return;
      }
}
}

purchaseBtn.addEventListener("click", checkCashRegister);
