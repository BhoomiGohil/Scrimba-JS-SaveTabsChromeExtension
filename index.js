// let boxEl = document.getElementById("box");

// boxEl.addEventListener("click", function () {
//   console.log("I want to open the box!");
// });

// Initialize an empty array to store leads (URLs)
let myLeads = [];

// Get references to HTML elements by their IDs
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deletBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

// Retrieve leads from local storage and parse them from JSON
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// If there are leads in local storage, populate the myLeads array and render it
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage; // Assign stored leads to myLeads
  render(myLeads); // Render the leads on the page
}

// Function to render leads as list items in the unordered list
function render(myLeads) {
  let listItems = ""; // Initialize a string to hold the list items

  // Loop through each lead and create a list item
  for (let i in myLeads) {
    listItems += `
    <li>
      <a href="${myLeads[i]}" target="_blank">
        ${myLeads[i]}
      </a>
    </li>`;
  }
  // Update the inner HTML of the unordered list with the list items
  ulEl.innerHTML = listItems;
}

// Event listener for the input button to add a new lead
inputBtn.addEventListener("click", function () {
  let inputValue = inputEl.value; // Get the input value from the text field

  if (!inputValue.startsWith("chrome://") && inputValue) {
    if (
      !inputValue.startsWith("http://") &&
      !inputValue.startsWith("https://")
    ) {
      // Ensure the input URL is stored as an absolute URL
      inputValue = "http://" + inputValue; // Add http if it's missing
    }

    if (!myLeads.includes(inputValue)) {
      // Add the input value to the myLeads array
      myLeads.push(inputValue);
      inputEl.value = ""; // Clear the input field
      // Save the updated leads array to local storage
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads); // Re-render the leads
    }
  }
});

// Event listener for the tab button to get the active tab's URL
tabBtn.addEventListener("click", () => {
  // Query for the currently active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentUrl = tabs[0].url; // Get the URL of the active tab
    if (!currentUrl.startsWith("chrome://")) {
      if (
        // Ensure the URL is stored as an absolute URL
        !currentUrl.startsWith("http://") &&
        !currentUrl.startsWith("https://")
      ) {
        currentUrl = "http://" + currentUrl; // Add http if it's missing
      }

      // Add the current URL to myLeads if it's not already included
      if (!myLeads.includes(currentUrl)) {
        myLeads.push(currentUrl);
        // Save the updated leads array to local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads); // Re-render the leads
      }
    }
  });
});

// Event listener for the delete button to clear all leads
deletBtn.addEventListener("dblclick", () => {
  localStorage.clear(); // Clear local storage
  myLeads = []; // Reset the myLeads array
  render(myLeads); // Re-render to reflect the empty leads
});
