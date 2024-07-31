console.log("hello");

// fetch('https://dog.ceo/api/breeds/list/all')
//     .then((response) => response.json())
//     .then((data) => console.log(data.message));

fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let dogs = data.message;
        console.log(dogs);
        Object.keys(dogs).forEach(dog => {
            document.body.innerHTML += `${dog}<br>`;
    })})
    .catch(e => console.log(e));
