fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let dogs = data.message;
    let breedNames = Object.keys(dogs);
    console.log(typeof breedNames);
    console.log(breedNames.length);

    let breedCardRef = document.querySelector(".breed-name");

    breedNames.forEach(breed => {
        console.log("breeds ", breed);
        let cardsContainer = document.querySelector('.download-cards');

        let card = document.createElement('div');
        card.innerHTML = `
            <section class="card-section">
                <article class="breed-card">
                    <figure class="breed-image-container">
                        <img class="breed-image" src="./image.png" alt="breed's image">
                    </figure>
                    <h3 class="breed-name">Breed: ${breed}</h3>
                </article>
            </section>
        `;
        cardsContainer.appendChild(card);
    })
  })
  .catch((e) => console.log(e));