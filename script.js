setupPage();

async function setupPage() {   
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            let dogs = data.message;
            let breedNames = Object.keys(dogs);
            breedNames.forEach(breed => {
                fetch(`https://dog.ceo/api/breed/${breed}/images`)
                    .then(response => response.json())
                    .then(data => {
                        let cardsContainer = document.querySelector('.download-cards');
                        let card = document.createElement('div');
                        card.innerHTML = `
                            <section class="card-section">
                                <article class="breed-card">
                                    <figure class="breed-image-container">
                                        <img class="breed-image" src="${data.message[Math.floor(Math.random() * data.message.length)]}" alt="breed's image">
                                    </figure>
                                    <h3 class="breed-name">Breed: ${breed}</h3>
                                </article>
                            </section>
                        `;
                        cardsContainer.appendChild(card);
                    })    
            })
        })
        .catch((e) => console.log(e));
}  