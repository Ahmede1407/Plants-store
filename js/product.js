import { showCartModal, showTotals } from "./cart.js";
import CreatePlants from "./createPlant.js";

// show loader when loading
window.addEventListener("load", () =>
  document.querySelector(".loader").classList.add("hideLoader")
);

// Scroll Top
function scrollTop() {
  let scrollTop = document.querySelector("#scrollTop");

  if (this.scrollY >= 400) {
    scrollTop.classList.add("show-arrow");
  } else {
    scrollTop.classList.remove("show-arrow");
  }
}
window.addEventListener("scroll", scrollTop);

// get query strings
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get("id");

const displayProduct = (plantData) => {
  const singlePlant = document.querySelector("#singlePlant");
  singlePlant.innerHTML = "";

  plantData.plants.forEach((plant) => {
    if (plant.id == urlId) {
      singlePlant.innerHTML = `
      <div class="col-md-5">
        <div class="product-img">
          <img src="${plant.img}" class="img-fluid mb-3" alt="plant product">
        </div>
      </div>
      <div class="col-md-6 col-sm-9 col-11 mx-auto">
        <div class="product-content mb-5">
          <h1 class="text-capitalize mb-3">${plant.name}</h1>
          <h4>$<span>${plant.price}</span></h4>
          <h5>Get a taste of the tropical forest</h5>
        </div>
        <!-- first line -->
        <div class="product-description d-flex mb-4">
          <i class="fas fa-ruler-vertical mr-4 align-self-center fa-2x fa-fw ruler"></i>
        <div class="">
          <p class="text-muted text-uppercase p-0 m-0">pot & plant combined size</p>
          <p class="m-0">${plant.sizeDescription}</p>
        </div>
      </div>
      <!-- end of first line -->
      <!-- second line -->
      <div class="product-description d-flex mb-4">
        <i class="fas fa-sun mr-4 align-self-center fa-fw fa-2x p-1 sun"></i>
        <div class="">
          <p class="text-muted text-uppercase p-0 m-0">light</p>
          <p class="m-0">${plant.light}</p>
        </div>
      </div>
      <!-- end of second line -->
      <!-- third line -->
      <div class="product-description d-flex">
        <i class="fas fa-hand-holding-heart fa-2x mr-4 align-self-center fa-fw p-1 holding-heart"></i>
        <div class="">
          <p class="text-muted text-uppercase p-0 m-0">care</p>
          <p class="m-0">${plant.care}</p>
        </div>
      </div>
      <!-- end of third line -->
      <button class="product-btn w-100 my-5 mx-auto btn btn-lg btn-dark text-capitalize" id="open">Add to cart</button>
      <div class="shipping-guide d-flex justify-content-between" data-toggle="modal"
        data-target="#shipping-guideScrollable">
        <p class="text-capitalize mt-2 my-2 align-self-center">shipping guide</p>
        <i class="fas fa-plus align-self-center"></i>
      </div>
    </div>
      `;
    }
  });

  showCartModal();
  addToCart();
};

// Best seller plants
const displayBestSellers = (plants) => {
  const bestSellers = plants.bestSellers;

  const favouriteInfo = document.getElementById("favourite-info");

  favouriteInfo.innerHTML = "";

  let data = "";
  bestSellers.forEach((best) => {
    data += `
      <!-- single item -->
      <div class="col-md-3 col-6">
        <div class="card plant-card">
          <div class="plant-img-div">
            <a href="product.html?id=${best.id}" id="singlePlantLink">
              <img src="${best.img}" alt="plant" class="card-img-top plant-img">
            </a>
            <button class="btn btn-outline-dark add-btn" id="open">add to cart</button>
          </div>
          <!-- card body -->
          <div class="card-body px-0">
          <div class="plant-info d-flex justify-content-between">
            <!-- first flex child -->
            <div class="plant-text justify-content-start">
              <h6 class="text-muted"></h6>
              <a href="product.html?id=${best.id}" class="text-dark">
               <h5 class="text-capitalize plant-name">${best.name}</h5>
              </a>
            </div>
            <!-- second flex child -->
            <div class="plant-value align-self-center">
              $<span class="plant-price">${best.price}</span>
            </div>
          </div>
        </div>
          <!-- end of card body -->
        </div>
      </div>
      <!-- end of single item -->`;
  });
  favouriteInfo.innerHTML = data;
  // showCartModal();
  // addToCart();
};

// adding item to cart
function addToCart() {
  const open = document.querySelector("#open");

  open.addEventListener("click", (e) => {
    //img
    let fullPath =
      e.target.parentElement.parentElement.children[0].children[0].children[0]
        .src;
    let position = fullPath.indexOf("img");
    let partialPath = fullPath.slice(position);

    const item = {};
    item.img = partialPath;

    //name
    let name =
      e.target.parentElement.parentElement.children[1].children[0].children[0]
        .textContent;
    item.name = name;

    //price
    let price =
      e.target.parentElement.parentElement.children[1].children[0].children[1]
        .children[0].textContent;
    item.price = +price;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item d-flex pb-3";

    cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid mx-3" alt="plant" style="width:70px;height:70px">
        <div class="item-text ">
          <p class="text-uppercase font-weight-bold  m-0 p-0" id="cart-item-title">${item.name}</p>
          <p class="font-weight-bold m-0 p-0">$<span id="cart-item-price">${item.price}</span></p>
          <p class="m-0 p-0">qty: <span id="cart-item-qty">1</span>
          </p>
        `;

    const cartModal = document.querySelector(".cart-modal");
    const total = document.querySelector("#cart-subtotal-container");

    cartModal.insertBefore(cartItem, total);
    showTotals();
  });
}

fetch("data/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const plants = CreatePlants(data.data);
    displayProduct(plants);
    displayBestSellers(plants);
  });
