// ===== READ URL PARAMETERS =====
const params = new URLSearchParams(window.location.search);
const value = params.get("value");
const type = params.get("type");

const resultCard = document.getElementById("resultCard");
const title = document.getElementById("resultTitle");
const timeEl = document.getElementById("generatedTime");
const loadingSpinner = document.getElementById("loadingSpinner");

if (timeEl) {
  timeEl.textContent = `Report generated on ${new Date().toLocaleString()}`;
}

// ===== LOAD VEHICLE DATA =====
async function loadVehicleData() {
  if (loadingSpinner) loadingSpinner.style.display = "block";

  try {
    const res = await fetch("data/vehicles.json");
    const data = await res.json();

    const vehicle = data.vehicles.find(v =>
      type === "vin" ? v.vin === value : v.plate === value
    );

    if (!vehicle) {
      resultCard.innerHTML = `<p class="status-bad">❌ No record found for this vehicle.</p>`;
      return;
    }

    title.textContent = `Vehicle Report — ${vehicle.plate}`;

    resultCard.innerHTML = `
      <div class="summary-grid">
        <div class="summary-card">
          <h3>Accidents</h3>
          <p class="${vehicle.accidents > 0 ? 'status-warning' : 'status-good'}">
            ${vehicle.accidents > 0 ? vehicle.accidents + " reported" : "None"}
          </p>
        </div>
        <div class="summary-card">
          <h3>Owners</h3>
          <p>${vehicle.owners}</p>
        </div>
        <div class="summary-card">
          <h3>Stolen Status</h3>
          <p class="${vehicle.stolen ? 'status-bad' : 'status-good'}">
            ${vehicle.stolen ? "Reported stolen" : "Clear"}
          </p>
        </div>
        <div class="summary-card">
          <h3>Outstanding Loan</h3>
          <p class="${vehicle.loan ? 'status-warning' : 'status-good'}">
            ${vehicle.loan ? "Yes" : "None"}
          </p>
        </div>
      </div>

      <div class="details">
        <h3>Vehicle Details</h3>
        <ul>
          <li><strong>Make:</strong> ${vehicle.make}</li>
          <li><strong>Model:</strong> ${vehicle.model}</li>
          <li><strong>Year:</strong> ${vehicle.year}</li>
          <li><strong>VIN:</strong> ${vehicle.vin}</li>
          <li><strong>Plate:</strong> ${vehicle.plate}</li>
          <li><strong>Imported:</strong> ${vehicle.imported ? "Yes" : "No"}</li>
        </ul>
      </div>
    `;
  } catch (err) {
    console.error(err);
    resultCard.innerHTML = `<p class="status-bad">⚠ Unable to load vehicle data.</p>`;
  } finally {
    if (loadingSpinner) loadingSpinner.style.display = "none";
  }
}

loadVehicleData();

// ===== SEARCH HISTORY (LocalStorage) =====
const HISTORY_KEY = "carsearch_history";

function saveSearch(value, type) {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  history = history.filter(item => item.value !== value);

  history.unshift({
    value,
    type,
    date: new Date().toLocaleString()
  });

  history = history.slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

if (value && type) saveSearch(value, type);

const historyList = document.getElementById("searchHistory");

function renderHistory() {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  if (!historyList || history.length === 0) return;

  historyList.innerHTML = history.map(item => `
    <li>
      <strong>${item.value}</strong> (${item.type.toUpperCase()})<br>
      <small>${item.date}</small>
    </li>
  `).join("");
}

renderHistory();

// ===== DOWNLOAD REPORT BUTTON =====
const downloadBtn = document.getElementById("downloadReport");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const reportContent = resultCard.innerText;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `CarReport-${value}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  });
}
