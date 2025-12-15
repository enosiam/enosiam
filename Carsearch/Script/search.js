// --------- SEARCH HANDLER ---------

const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const value = params.get("value");

const title = document.getElementById("resultTitle");
const card = document.getElementById("resultCard");

if (!type || !value) {
  card.innerHTML = "<p>Invalid search.</p>";
} else {
  title.textContent = `Vehicle Report for ${value.toUpperCase()}`;

  // MOCK DATA (replace with real API later)
  const data = {
    make: "Toyota",
    model: "Camry",
    year: 2018,
    color: "Black",
    ownership: "2 previous owners",
    accident: "No accident records",
    stolen: "Not reported stolen",
    recall: "No open recalls"
  };

  card.innerHTML = `
    <h3>Vehicle Summary</h3>
    <ul>
      <li><strong>Type:</strong> ${type.toUpperCase()}</li>
      <li><strong>Make:</strong> ${data.make}</li>
      <li><strong>Model:</strong> ${data.model}</li>
      <li><strong>Year:</strong> ${data.year}</li>
      <li><strong>Color:</strong> ${data.color}</li>
    </ul>

    <h3>History</h3>
    <ul>
      <li>${data.ownership}</li>
      <li>${data.accident}</li>
      <li>${data.stolen}</li>
      <li>${data.recall}</li>
    </ul>

    <p style="margin-top:1rem;color:#64748b">
      ⚠ This is a demo report. Full reports require verification.
    </p>

    <button class="btn-primary" style="margin-top:1rem">
      Unlock Full Report
    </button>
  `;
}
