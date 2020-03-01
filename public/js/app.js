console.log("Clinet side javascript file is loaded!");

const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
const messageThree = document.querySelector("#messageThree");
const messageFour = document.querySelector("#messageFour");

// weather Inputs
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

// Forecast Function
const forecast = address =>
  fetch("/weather?address=" + address).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        // console.log(data);
        // console.log(data.address);
        console.log(data);
        messageOne.textContent = data.address;
        messageTwo.textContent = data.summary;
        messageThree.innerHTML = '<b>Min. Temperature: </b>' +  data.temperatureMin;
        messageFour.innerHTML = '<b>Max. Temperature: </b>' +  data.temperatureMax;
      }
    });
  });

// Listeners
weatherForm.addEventListener("submit", e => {
  const location = search.value;
  //   console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  forecast(location);

  e.preventDefault();
});
