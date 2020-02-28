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
    fetch('/splash?subject=' + subject).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                console.log(data)
                messageOne.textContent = subject;
                // messageOne.textContent.toUppercase();
                // messageOne.textContent.capitalize()
                imageOne.src = data.image0
                imageTwo.src = data.image1
                inputImage.value = ''
            }
        })
    })


// Listeners
imageForm.addEventListener("submit", e => {
    const subject = inputImage.value;

    messageOne.textContent = 'Loading...';
    getImage(subject)

    e.preventDefault();
})








// const getImage = (subject, url) =>
// fetch(url)
// .then(data => data.json())
// .then(data => {
//     // console.log(data)
//     let image01 = data.results[0].urls.regular;
//     let image02 = data.results[1].urls.regular;
    
//     messageOne.textContent = "";
//     messageTwo.textContent = "";
    
//     imageOne.src = image01;
//     imageTwo.src = image02;
// });

// imageForm.addEventListener("submit", e => {
//     const subject = inputImage.value;
//     const clientId = "84d9e236df85ddcdb1aa59f3d9ef1a96c301f87fafd664b222ee3637c406575d";
//     const url = "https://api.unsplash.com/search/photos/?client_id="+clientId+"&query="+subject;
    
//     //   console.log("Search image from " + subject);

//     messageOne.textContent = "Loading...";
//     messageTwo.textContent = "";

//     getImage(subject, url);

//     e.preventDefault();
// });
