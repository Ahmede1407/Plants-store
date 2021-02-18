import CreatePlants from './createPlant.js';

// show loader when loading
window.addEventListener('load', () => document.querySelector('.loader').classList.add('hideLoader'))

// index.html
const DisplayFeaturedPlants = ((plants) => {
    const featuredPlants = plants.featuredPlants;
    const featured = document.getElementById('featured-container');
    featured.innerHTML = '';
  
    let data = '';
    featuredPlants.forEach(plant => {
      data += `
        <!-- single item -->
        <div class="col-lg-3 col-md-6">
          <div class="card px-2 pt-4 mb-3 featured-card curved-border">
            <div class="featured-img-div">
              <a href="product.html?id=${plant.id}" id="singlePlantLink">
                <img src="${plant.img}" class="featured-img card-img-top" alt="featured plant">
              </a>
            </div>
            <div class="featured-text px-2 text-center my-3">
              <h5 class="text-capitalize font-weight-bold featured-title">${plant.name}</h5>
              <p class="card-text">${plant.description}</p>
              <p class="featured-price font-weight-bold mb-0">$<span>${plant.price}</span></p>
            </div>
          </div>
        </div>
        <!-- end of single item -->
        `
    });
  
    featured.innerHTML = data;
  
  });
  
  fetch('data/data.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const plants = CreatePlants(data.data);
      DisplayFeaturedPlants(plants);
    })