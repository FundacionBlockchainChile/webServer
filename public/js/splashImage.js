console.log("Clinet side javascript file splashImage is loaded!");

const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

// image Fetch Inputs
const imageForm = document.querySelector("#imageForm");
const inputImage = document.querySelector("#inputImage");

const imageOne = document.querySelector("#imageOne");
const imageTwo = document.querySelector("#imageTwo");

// Get image from splshImage API function

const getImage = subject =>
  fetch("/splash?subject=" + subject).then(response => {
    response.json().then(data => {
      if (data.error) {
        // console.log(data.error)
        messageOne.textContent = data.error;
      } else {
        // console.log(data)
        messageOne.textContent = subject;
        // messageOne.textContent.toUppercase();
        // messageOne.textContent.capitalize()
        imageOne.src = data.image0;
        imageTwo.src = data.image1;
        inputImage.value = "";
      }
    });
  });

// Listeners
imageForm.addEventListener("submit", e => {
  const subject = inputImage.value;
  messageOne.textContent = "Loading...";
  getImage(subject);

  e.preventDefault();
});


