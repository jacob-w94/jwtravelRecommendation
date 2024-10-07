var globalVariable;
async function searchButton() {
  const searchResults = await getUserData();
  console.log(searchResults);
  console.log(searchResults.length);
  globalVariable = searchResults;

  document.getElementById("cardNumber0").style.display = "none";
  document.getElementById("cardNumber1").style.display = "none";
  document.getElementById("cardNumber2").style.display = "none";

  for (let i = 0; i < searchResults.length; i++) {
    document.getElementById(`titleNumber${i}`).innerHTML =
      searchResults[i].name;
    document.getElementById(`descriptionNumber${i}`).innerHTML =
      searchResults[i].description;
    document.getElementById(`imgNumber${i}`).src = searchResults[i].imageUrl;
    document.getElementById(`cardNumber${i}`).style.display = "flex";
  }
}

function clearSearch() {
  document.getElementById("cardNumber0").style.display = "none";
  document.getElementById("cardNumber1").style.display = "none";
  document.getElementById("cardNumber2").style.display = "none";
}

async function getData() {
  const url =
    "https://raw.githubusercontent.com/jacob-w94/jwtravelRecommendation/main/travel_recommendation_api.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching the data:", error.message);
  }
}

function normalizeInput(input) {
  const lowercaseInput = input.trim().toLowerCase();

  const validKeys = {
    countries: ["countries", "country", "countrys"],
    beaches: ["beaches", "beach"],
    temples: ["temples", "temple"],
  };

  for (let key in validKeys) {
    if (validKeys[key].includes(lowercaseInput)) {
      return key;
    }
  }
  return null;
}

async function getUserData() {
  var valueEnteredByUser = document.getElementById("navSearch").value;
  var normalizedKey = normalizeInput(valueEnteredByUser);

  if (!normalizedKey) {
    return;
  }

  try {
    const data = await getData();

    if (data.hasOwnProperty(normalizedKey)) {
      return data[normalizedKey];
    } else {
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
