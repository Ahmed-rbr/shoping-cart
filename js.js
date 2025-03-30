const openShoppingCart = document.querySelector(".shoping");
const closeShoppingCart = document.querySelector(".close");
const list = document.querySelector(".list");
const listCard = document.querySelector(".list-card");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const qnt = document.querySelector(".qnt");

openShoppingCart.addEventListener("click", () => {
  body.classList.add("active");
});
closeShoppingCart.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Product 1",
    image: "1.PNG",
    price: 2000,
  },
  {
    id: 2,
    name: "Product 2",
    image: "2.PNG",
    price: 3000,
  },
  {
    id: 3,
    name: "Product 3",
    image: "3.PNG",
    price: 2800,
  },
  {
    id: 4,
    name: "Product 4",
    image: "4.PNG",
    price: 2600,
  },
  {
    id: 5,
    name: "Product 5",
    image: "5.PNG",
    price: 2300,
  },
  {
    id: 6,
    name: "Product 6",
    image: "6.PNG",
    price: 1900,
  },
];

let cart = [];

const initApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="${value.image}" alt="${value.name}" />
      <div class="title">${value.name}</div>
      <div class="price">${value.price.toLocaleString()}</div>
      <button onclick="addToCart(${key})">Add to Cart</button>
    `;
    list.appendChild(newDiv);
  });
};

initApp();

function addToCart(key) {
  if (cart[key] == null) {
    cart[key] = JSON.parse(JSON.stringify(products[key]));
    cart[key].quantity = 1;
  } else {
    cart[key].quantity++;
  }
  reloadCart();
}

function changeQuantity(key, quantity) {
  if (quantity == -1 && cart[key].quantity <= 1) {
    delete cart[key];
  } else {
    cart[key].quantity += quantity;
  }
  reloadCart();
}

function reloadCart() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  cart.forEach((value, key) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
        <div><img src="${value.image}" alt="${value.name}"></div>
        <div class="cardTitle">${value.name}</div>
        <div class="cardPrice">${(
          value.price * value.quantity
        ).toLocaleString()}</div>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${key}, -1)" class="cardButton">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, 1)" class="cardButton">+</button>
        </div>
      `;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString();
  qnt.innerText = count;
}
