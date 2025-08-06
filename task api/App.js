let inCartProducts = JSON.parse(localStorage.getItem("inCart")) || {};
let con = document.querySelector(".product-container");
let Data = [];
let num = document.getElementById("cart-count");
let CartContainer = document.querySelector(".modal-body");

async function fetchdata() {
  let ApiResponse = await fetch("https://fakestoreapi.com/products");
  Data = await ApiResponse.json();
  console.log(Data);
  buildcards();
  updateCartCount();
}

async function buildcards() {
  Data.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
    <div class="card h-100">
      <img
        src="${product.image}"
        class="card-img-top"
        alt="${product.category}"
        loading="lazy"
      />
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.category}</p>
         <div class="d-flex  align-items-center justify-content-between ">
        <span class="price">${product.price}$</span>
          <button href="#" class="btn  btn-primary" ${
            inCartProducts[product.id]
              ? inCartProducts[product.id].Added
                ? "disabled"
                : ""
              : ""
          }  data-inCart="${
      inCartProducts[product.id]
        ? inCartProducts[product.id].Added
          ? true
          : false
        : false
    }" data-id="${product.id}" onclick ="AddToCart(this)" > <span>${
      inCartProducts[product.id]
        ? inCartProducts[product.id].Added
          ? " Added! "
          : "Add To Cart"
        : "Add To Cart"
    }
        </div>
      </div>
    </div>    
          `;
    con.appendChild(card);
  });
}

function AddToCart(btn) {
  let id = Number.parseInt(btn.dataset.id);
  let text = btn.children[0];

  btn.disabled = true;
  btn.dataset.inCart = true;
  text.textContent = "Added! ";

  inCartProducts[id] = Data[id - 1];
  inCartProducts[id].Added = true;
  localStorage.setItem("inCart", JSON.stringify(inCartProducts));
  console.log(JSON.parse(localStorage.getItem("inCart")));
  updateCartCount();
  CartUpdate();
}

function updateCartCount() {
  let count = Object.keys(inCartProducts).length;
  num.textContent = count;
  CartUpdate();
}

function CartUpdate() {
  CartContainer.innerHTML = "";
  if (Object.keys(inCartProducts).length > 0) {
    Object.values(inCartProducts).forEach((product) => {
      let cartItem = document.createElement("div");
      cartItem.classList.add(
        "cart-item",
        "d-flex",
        "align-items-center",
        "mb-2"
      );
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain;" class="me-2">
        <div class="cart-item-details flex-grow-1">
          <h6 class="mb-0">${product.title}</h6>
          <strong class="text-muted">$${product.price}</strong>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">
          <i class="bi bi-trash"></i>
        </button>
      `;
      CartContainer.appendChild(cartItem);
    });
  } else {
    CartContainer.innerHTML =
      '<p class="text-center my-3">Your cart is empty</p>';
  }
}

function removeFromCart(productId) {
  delete inCartProducts[productId];
  console.log(inCartProducts);
  localStorage.setItem("inCart", JSON.stringify(inCartProducts));

  const addButton = document.querySelector(`button[data-id="${productId}"]`);
  console.log(addButton);
  if (addButton) {
    addButton.disabled = false;
    addButton.dataset.inCart = false;
    addButton.querySelector("span").textContent = "Add To Cart";
  }

  updateCartCount();
}
fetchdata();
