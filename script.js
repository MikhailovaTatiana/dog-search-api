setupPage();

async function setupPage() {
    const dogsPromise = fetchDogData(); // Initiate the fetch operation
    const cardsContainer = document.querySelector('.download-cards');
    const inputRef = document.querySelector('#breedFilter');

    inputRef.addEventListener('input', e => {
        const filter = inputRef.value.toLowerCase();
        dogsPromise.then(dogs => {
            const filteredDogs = filterDogs(dogs, filter);
            displayFilteredResults(filteredDogs, cardsContainer);
        });
    });

    // Initial display of all dogs
    dogsPromise.then(dogs => {
        displayFilteredResults(dogs, cardsContainer);
    });
}

async function fetchDogData() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breedNames = Object.keys(data.message);
    const dogPromises = breedNames.map(async breed => {
        const imageResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const imageData = await imageResponse.json();
        return { breed, images: imageData.message };
    });

    return Promise.all(dogPromises); // Execute all fetch operations in parallel
}

function filterDogs(dogs, filter) {
    return dogs.filter(dog => dog.breed.includes(filter));
}

function displayFilteredResults(filteredDogs, container) {
    container.innerHTML = '';

    filteredDogs.forEach(dog => {
        const card = createBreedCard(dog);
        container.appendChild(card);
    });
}

function createBreedCard(dog) {
    const card = document.createElement('div');
    card.innerHTML = `
        <section class="card-section">
            <article class="breed-card">
                <figure>
                    <img class="breed-image" src="${dog.images[Math.floor(Math.random() * dog.images.length)]}" alt="breed's image">
                </figure>
                <h3 class="breed-name">Breed: ${dog.breed}</h3>
            </article>
        </section>
    `;
    return card;
}