// let boxEl = document.getElementById("box");

// boxEl.addEventListener("click", function () {
//   console.log("I want to open the box!");
// });

let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deletBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(myLeads) {
  let listItems = "";

  for (let i in myLeads) {
    listItems += `
    <li>
      <a href='${myLeads[i]} target='_blank'>
        ${myLeads[i]}
      </a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("url", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deletBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
