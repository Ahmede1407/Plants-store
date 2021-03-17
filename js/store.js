// show loader when loading
window.addEventListener("load", () =>
  document.querySelector(".loader").classList.add("hideLoader")
);

// Scroll Top
function scrollTop() {
  let scrollTop = document.querySelector("#scrollTop");

  if (this.scrollY >= 560) {
    scrollTop.classList.add("show-arrow");
  } else {
    scrollTop.classList.remove("show-arrow");
  }
}
window.addEventListener("scroll", scrollTop);
