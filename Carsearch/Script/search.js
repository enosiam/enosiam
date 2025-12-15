document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const value = params.get("value");

  const reportTitle = document.getElementById("reportTitle");
  const reportSubtitle = document.getElementById("reportSubtitle");

  reportTitle.textContent = `Vehicle Report: ${value}`;
  reportSubtitle.textContent = `Report type: ${type.toUpperCase()}`;

  const accidentsEl = document.getElementById("accidents");
  const ownersEl = document.getElementById("owners");
  const stolenEl = document.getElementById("stolen");
  const loansEl = document.getElementById("loans");
  const detailsListEl = document.getElementById("detailsList");

  // MOCK DATA (replace with real API later)
  const mockData = {
    accidents: "No accidents reported",
    owners: "2 previous owners",
    stolen: "No",
    loans: "None",
    details: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "Corolla" },
      { label: "Year", value: "2018" },
      { label: "Color", value: "White" },
      { label: "Engine", value: "1.8L Petrol" },
      { label: type === "vin" ? "VIN" : "Plate", value: value }
    ]
  };

  // Populate summary
  accidentsEl.textContent = mockData.accidents;
  ownersEl.textContent = mockData.owners;
  stolenEl.textContent = mockData.stolen;
  loansEl.textContent = mockData.loans;

  // Populate details list
  detailsListEl.innerHTML = "";
  mockData.details.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.label}: ${d.value}`;
    detailsListEl.appendChild(li);
  });
});
