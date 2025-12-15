// Read query params
const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const value = params.get("value");

// Page elements
const title = document.getElementById("reportTitle");
const subtitle = document.getElementById("reportSubtitle");

// Mock Nigerian vehicle data (replace later with API)
const mockReport = {
  accidents: "No accidents reported",
  owners: "2 previous owners",
  stolen: "Not reported stolen",
  loans: "No outstanding loans",
  details: {
    Make: "Toyota",
    Model: "Corolla",
    Year: "2018",
    Color: "Silver",
    Registration: "Lagos",
    Engine: "1.8L Petrol"
  }
};

// Set header text
title.textContent = "Vehicle History Report";
subtitle.textContent =
  type === "vin"
    ? `VIN: ${value}`
    : `Plate Number: ${value}`;

// Populate summary
document.getElementById("accidents").textContent = mockReport.accidents;
document.getElementById("owners").textContent = mockReport.owners;
document.getElementById("stolen").textContent = mockReport.stolen;
document.getElementById("loans").textContent = mockReport.loans;

// Populate details
const list = document.getElementById("detailsList");

Object.entries(mockReport.details).forEach(([key, val]) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${key}:</strong> ${val}`;
  list.appendChild(li);
});
