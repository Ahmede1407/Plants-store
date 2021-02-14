const CreatePlants = ((plantData) => {
  const plants = [];
  // template
  class Plant {
    constructor(id, size, sizeDescription, name, img, price, best, featured, description, light, care) {
      this.id = id;
      this.size = size;
      this.sizeDescription = sizeDescription;
      this.name = name;
      this.img = img;
      this.price = price;
      this.best = best;
      this.featured = featured;
      this.description = description;
      this.light = light;
      this.care = care;
    }
  };

  // create plant function
  function createPlant(id, size, sizeDescription, name, img, price, best, featured, description, light, care) {
    const plant = new Plant(id, size, sizeDescription, name, img, price, best, featured, description, light, care);
    plants.push(plant);
  };

  // make plants
  function makePlants() {
    plantData.forEach(datum => {
      createPlant(datum.id, datum.size, datum.sizeDescription, datum.name, datum.img, datum.price, datum.best, datum.featured, datum.description, datum.light, datum.care);
    });
  };

  makePlants();

  // best sellers
  const bestSellers = plants.filter(plant => plant.best === true);
  const featuredPlants = plants.filter(plant => plant.featured === true);
  return {
    plants,
    bestSellers,
    featuredPlants
  };
});

export default CreatePlants;