const apiKey = "2029147cdea240f194feb2e44d3a0c68";

document.getElementById("fighterForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fighterName = document.getElementById("fighterInput").value;
  const fighterOutput = document.getElementById("fighterOutput");

  const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/Fighters?key=${apiKey}`);
  const data = await response.json();

  const fighter = data.find(f => f.FirstName.toLowerCase() === fighterName.toLowerCase() || f.LastName.toLowerCase() === fighterName.toLowerCase());

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
});

document.getElementById("loadEvents").addEventListener("click", async function () {
  const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/GamesBySeason/2025?key=${apiKey}`);
  const events = await response.json();
  const eventsList = document.getElementById("eventsList");

  eventsList.innerHTML = "<h5>Upcoming UFC Events:</h5>";
  events.forEach(event => {
    eventsList.innerHTML += `
      <div class="card my-3">
        <div class="card-body">
          <h6 class="card-title">${event.Name}</h6>
          <p class="card-text">Date: ${event.DateTime}</p>
        </div>
      </div>
    `;
  });
});

document.getElementById("loadWeightClasses").addEventListener("click", async function () {
  const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/WeightClasses?key=${apiKey}`);
  const weightClasses = await response.json();
  const weightClassList = document.getElementById("weightClassList");

  weightClassList.innerHTML = "<h5>UFC Weight Classes:</h5>";
  weightClasses.forEach(classInfo => {
    weightClassList.innerHTML += `
      <div class="card my-3">
        <div class="card-body">
          <h6 class="card-title">${classInfo.Name}</h6>
        </div>
      </div>
    `;
  });
});

document.getElementById("loadBeltTracker").addEventListener("click", async function () {
  const response = await fetch(`https://api.sportsdata.io/v4/mma/scores/json/Champions?key=${apiKey}`);
  const champions = await response.json();
  const beltTrackerList = document.getElementById("beltTrackerList");

  beltTrackerList.innerHTML = "<h5>Current Champions:</h5>";
  champions.forEach(champion => {
    beltTrackerList.innerHTML += `
      <div class="card my-3">
        <div class="card-body">
          <h6 class="card-title">${champion.Name}</h6>
          <p class="card-text">Division: ${champion.WeightClass}</p>
        </div>
      </div>
    `;
  });
});
