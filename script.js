let products = [
  { id: 1, name: "Apple", price: 250, image: "./images/apple.jpg" },
  { id: 2, name: "Milk", price: 200, image: "./images/milk.png" },
  { id: 3, name: "Rice", price: 500, image: "./images/rice.jpg" },
  { id: 4, name: "Bread", price: 150, image: "./images/bread.jpg" },
  { id: 5, name: "Salt", price: 120, image: "./images/salt.png" }
];

let cart = [];
let productList = document.getElementById("productList");

function renderProducts() {
  productList.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    var card = document.createElement("div");
    card.className = "product-card";

    var img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    var h3 = document.createElement("h3");
    h3.innerText = product.name;

    var p = document.createElement("p");
    p.innerText = product.price;

    var btn = document.createElement("button");
    btn.innerText = "Add To Cart";

    // simpler way to attach onclick
    btn.onclick = (function (id) {
      return function () {
        addToCart(id);
      };
    })(product.id);

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(btn);

    productList.appendChild(card);
  }
}

renderProducts();

function addToCart(id) {
  var foundProduct = null;

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      foundProduct = products[i];
      break;
    }
  }

  var already = null;
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id === id) {
      already = cart[j];
      break;
    }
  }

  if (already != null) {
    already.qty = already.qty + 1;
  } else {
    cart.push({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
      image: foundProduct.image,
      qty: 1
    });
  }
}

var showBillBtn = document.getElementById("showBillBtn");
var clearBillBtn = document.getElementById("clearBillBtn");
var billModal = document.getElementById("billModal");
var closeModal = document.getElementById("closeModal");

showBillBtn.onclick = function () {
  billModal.classList.remove("hidden");
  renderBill();
};

clearBillBtn.onclick = function () {
  cart = [];
  renderBill();
  alert("Cart has been cleared!");
};

closeModal.onclick = function () {
  billModal.classList.add("hidden");
};

function renderBill() {
  var billBody = document.getElementById("billBody");
  billBody.innerHTML = "";

  var subtotal = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var total = item.price * item.qty;
    subtotal = subtotal + total;

    var row = document.createElement("tr");
    row.innerHTML = "<td>" + item.name + "</td>" +
      "<td>" +
      "<button onclick='decreaseQty(" + i + ")'>-</button> " +
      item.qty +
      " <button onclick='increaseQty(" + i + ")'>+</button>" +
      "</td>" +
      "<td>" + item.price + "</td>" +
      "<td>" + total + "</td>" +
      "<td><button onclick='removeItem(" + i + ")'>X</button></td>";

    billBody.appendChild(row);
  }

  var tax = subtotal * 0.05;
  var grandTotal = subtotal + tax;

  document.getElementById("subtotal").innerText = "Subtotal: " + subtotal;
  document.getElementById("tax").innerText = "Tax (5%): " + tax;
  document.getElementById("grandTotal").innerText = "Grand Total: " + grandTotal;
}

function increaseQty(index) {
  cart[index].qty = cart[index].qty + 1;
  renderBill();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty = cart[index].qty - 1;
  } else {
    cart.splice(index, 1);
  }
  renderBill();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderBill();
}

document.getElementById("printBillBtn").onclick = function () {
  window.print();
};
