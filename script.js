const apiKey = "2029147cdea240f194feb2e44d3a0c68";

document.getElementById("fighterForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fighterName = document.getElementById("fighterInput").value.trim();
  const fighterOutput = document.getElementById("fighterOutput");

  try {
    const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/Fighters?key=${apiKey}`);
    const data = await response.json();

    const fighter = data.find(f =>
      `${f.FirstName} ${f.LastName}`.toLowerCase().includes(fighterName.toLowerCase())
    );

    if (fighter) {
      fighterOutput.innerHTML = `
        <div class="card mx-auto my-4" style="max-width: 600px;">
          <div class="card-body">
            <h5 class="card-title">${fighter.FirstName} ${fighter.LastName}</h5>
            <p class="card-text">Record: ${fighter.Wins}-${fighter.Losses}-${fighter.Draws}</p>
            <p class="card-text">Weight Class: ${fighter.WeightClass}</p>
            <p class="card-text">Nickname: ${fighter.Nickname || "N/A"}</p>
          </div>
        </div>
      `;
    } else {
      fighterOutput.innerHTML = `<div class="alert alert-danger">Fighter not found!</div>`;
    }
  } catch (error) {
    fighterOutput.innerHTML = `<div class="alert alert-danger">Failed to load data</div>`;
    console.error(error);
  }
});

document.getElementById("loadEvents").addEventListener("click", async () => {
  const eventsList = document.getElementById("eventsList");

  try {
    const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/GamesBySeason/2025?key=${apiKey}`);
    const events = await response.json();

    eventsList.innerHTML = "<h5>Upcoming UFC Events:</h5>";
    events.forEach(event => {
      eventsList.innerHTML += `
        <div class="card my-3">
          <div class="card-body">
            <h6 class="card-title">${event.Name}</h6>
            <p class="card-text">Date: ${new Date(event.DateTime).toLocaleString()}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    eventsList.innerHTML = `<div class="alert alert-danger">Failed to load events</div>`;
    console.error(error);
  }
});

document.getElementById("loadWeightClasses").addEventListener("click", async () => {
  const weightClassList = document.getElementById("weightClassList");

  try {
    const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/WeightClasses?key=${apiKey}`);
    const classes = await response.json();

    weightClassList.innerHTML = "<h5>UFC Weight Classes:</h5>";
    classes.forEach(c => {
      weightClassList.innerHTML += `
        <div class="card my-3">
          <div class="card-body">
            <h6 class="card-title">${c.Name}</h6>
          </div>
        </div>
      `;
    });
  } catch (error) {
    weightClassList.innerHTML = `<div class="alert alert-danger">Failed to load weight classes</div>`;
    console.error(error);
  }
});

document.getElementById("loadBeltTracker").addEventListener("click", async () => {
  const beltTrackerList = document.getElementById("beltTrackerList");

  try {
    const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/Champions?key=${apiKey}`);
    const champs = await response.json();

    beltTrackerList.innerHTML = "<h5>Current Champions:</h5>";
    champs.forEach(c => {
      beltTrackerList.innerHTML += `
        <div class="card my-3">
          <div class="card-body">
            <h6 class="card-title">${c.Name}</h6>
            <p class="card-text">Division: ${c.WeightClass}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    beltTrackerList.innerHTML = `<div class="alert alert-danger">Failed to load champions</div>`;
    console.error(error);
  }
});
