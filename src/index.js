console.log("%c HI", "color: firebrick");

// load DOM first

document.addEventListener('DOMContentLoaded', function(){

    let dogUl = document.querySelector('#dog-breeds');

    //Challenge 1
    // for a GET, all you have to do is fetch()
    fetch("https://dog.ceo/api/breeds/image/random/4") // returns a promise of a response, then inserted in first argument .then
    .then(response => response.json())  //parsed item gets into the 2nd .then
    // .then((json) => handleImageAppending(json)) // ----> this is same as below 
    .then(handleImageAppending) // no parenthesis because we are passing a function definition 
   
    //Challenge 2 
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(response => {
        let dogBreedsArr = Object.keys(response.message)
        // dogBreedsArr.forEach(addLiToDOM)
        dogBreedsArr.forEach((breed) => {
            dogUl.innerHTML += `<li data-info="breed"> ${breed} </li>`  // since we are appending we can give each li, can be more specific to get children
        })
    })
   
    //Challenge 3 - Ul is always on the page - stable parent, li hasnt fetched yet, add event listen everytime a user clicks on the ul function fires off

    dogUl.addEventListener('click', (e) => {
        if (e.target.dataset.info === "breed"){
            e.target.style.color = "green"
        }
    })

    // Challenge 4

    let dogSelect = document.querySelector('#breed-dropdown')
    dogSelect.addEventListener('change', (e) => {
        makeFetchHappen()
        .then(res => {        
            let dogBreedsArr = Object.keys(res.message)
            let filteredArray = dogBreedsArr.filter(breed => {
                return breed.startsWith(e.target.value);
            })
            dogUl.innerHTML = "";

            filteredArray.forEach((breed) => {
                dogUl.innerHTML += `<li data-info="breed"> ${breed} </li>`
        })
    })
    // DOMContentLoaded
    })
})

function handleImageAppending(jsonObject){
    let dogImage = document.getElementById('dog-image-container');

    let arrOfDogsURLs = jsonObject.message;
    arrOfDogsURLs.forEach(url => {
        // this will take in a string
        // dogImage.innerHTML += makeImageTagString(url); // make image tag string with that URL 
        // ORRRR
        dogImage.append(makeImageTagElement(url))
    });
}
// function makeImageTagString(url){
//     return `<img src="${url}"/>`
// }

// ORRRR
function makeImageTagElement(url){
    let imageTag = document.createElement('img');
    imageTag.src = url;
    return imageTag;
}

// function addLiToDOM(breed){
//     let dogUl = document.querySelector('#dog-breeds');
//     dogUl.innerHTML += `<li> ${breed} </li>`
// }

function makeFetchHappen(){ //returns promise
    return fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
}

