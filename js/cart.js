// ===>> cart modale
export const showCartModal = () => {
  const close = document.getElementById("cart-close");
  const open = document.querySelectorAll("#open");
  const cartModal = document.getElementById("cart");
  const continueBtn = document.querySelector(".continue-btn");

  //   show modal
  open.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartModal.classList.add("show-cart-modal");
    });
  });

  //   remove modal
  close.addEventListener("click", () => {
    cartModal.classList.remove("show-cart-modal");
  });
  continueBtn.addEventListener("click", () => {
    cartModal.classList.remove("show-cart-modal");
  });

  window.addEventListener("click", (e) =>
    e.target === cartModal
      ? cartModal.classList.remove("show-cart-modal")
      : false
  );
};

// ===>> total info
export const showTotals = () => {
  const total = [];

  const items = document.querySelectorAll("#cart-item-price");
  items.forEach((item) => {
    total.push(+item.textContent);
  });

  //   calculating price
  const totalMoney = total.reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0);

  const finalMoney = totalMoney.toFixed(2);

  //   update total price
  document.querySelector("#cart-item-total").textContent = finalMoney;

  //   update number of item(s)
  document.querySelectorAll(".cart-item-number").forEach((num) => {
    num.textContent = total.length;
  });

  //   adding (s) depending on num of items added to the cart
  const plural = document.querySelector("#plural");
  total.length <= 1
    ? (plural.style.desplay = "none")
    : (plural.style.desplay = "inline-block");

  // show free shipping message depending on finalMoney
  const message = document.querySelector("#message");
  finalMoney >= 100
    ? (message.textContent =
        "Congratulation! Your Order Qualifies of FREE SHIPPING.")
    : (message.textContent = `You are $${
        100 - finalMoney
      } away from FREE SHIPPING`);
};
