// console.log("hello");

// fetch('https://dog.ceo/api/breeds/list/all')
//     .then((response) => response.json())
//     .then((data) => console.log(data.message));


// fetch('https://dog.ceo/api/breeds/list/all')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         let dogs = data.message;
//         console.log(dogs);
//         Object.keys(dogs).forEach(dog => {
//             document.body.innerHTML += `${dog}<br>`;
//     })})
//     .catch(e => console.log(e));

fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let dogs = data.message;
        // console.log(Object.keys(dogs)[0]);
        let breedCardRef = document.querySelector('.breed-name');
        breedCardRef.innerHTML += `${Object.keys(dogs)[0]}`;
    })
    .catch(e => console.log(e));


/* description.classList.add("description");
description.textContent = `Breed: ${breed}`;
card.appendChild(description);  */   