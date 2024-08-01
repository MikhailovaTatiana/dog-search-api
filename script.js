// setupPage();
setupPage2();

// async function setupPage() {   
//     fetch("https://dog.ceo/api/breeds/list/all")
//         .then(response => response.json())
//         .then(data => {
//             let breedNames = Object.keys(data.message);
//             breedNames.forEach(breed => {
//                 fetch(`https://dog.ceo/api/breed/${breed}/images`)
//                     .then(response => response.json())
//                     .then(data => {
//                         let dogs = data.message;
//                         let cardsContainer = document.querySelector('.download-cards');
//                         let card = document.createElement('div');
//                         card.innerHTML = `
//                             <section class="card-section">
//                                 <article class="breed-card">
//                                     <figure">
//                                         <img class="breed-image" src="${dogs[Math.floor(Math.random() * dogs.length)]}" alt="breed's image">
//                                     </figure>
//                                     <h3 class="breed-name">Breed: ${breed}</h3>
//                                 </article>
//                             </section>
//                         `;
//                         cardsContainer.appendChild(card);
//                         search_2(dogs);
//                 })    
//             })
//         })
//         .catch((e) => console.log(e));
// }

async function setupPage2() {
    let dogs = await fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            let breedNames = Object.keys(data.message);
            return Promise.all(breedNames.map(async breed => {
                let response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
                let data = await response.json();
                return { breed, images: data.message };
            }));
        })
        .catch((e) => console.log(e));

    let cardsContainer = document.querySelector('.download-cards');
    let inputRef = document.querySelector('#breedFilter');

    inputRef.addEventListener('input', () => {
        let filter = inputRef.value.toLowerCase();
        let filteredDogs = dogs.filter(dog => dog.breed.includes(filter));
        displayFilteredResults(filteredDogs);
    });

    function displayFilteredResults(filteredDogs) {

        cardsContainer.innerHTML = ''; // clear existing cards

        filteredDogs.forEach(dog => {
            let card = document.createElement('div');
            card.innerHTML = `
                <section class="card-section">
                    <article class="breed-card">
                        <figure">
                            <img class="breed-image" src="${dog.images[Math.floor(Math.random() * dog.images.length)]}" alt="breed's image">
                        </figure>
                        <h3 class="breed-name">Breed: ${dog.breed}</h3>
                    </article>
                </section>
            `;
            cardsContainer.appendChild(card);
        });
    }

    displayFilteredResults(dogs);
}