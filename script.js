let products = [
  { id: 1, name: "Apple", price: 250, image: "./images/apple.jpg" },
  { id: 2, name: "Milk", price: 200, image: "./images/milk.png" },
  { id: 3, name: "Rice", price: 500, image: "./images/rice.jpg" },
  { id: 4, name: "Bread", price: 150, image: "./images/bread.jpg" },
  { id: 5, name: "Salt", price: 120, image: "./images/salt.png" }
];

let cart = [];

function renderProducts() {
  $("#productList").empty();

  $.each(products, function (_, p) {
    $("#productList").append(`
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" style="height:150px;object-fit:cover">
          <div class="card-body text-center">
            <h5>${p.name}</h5>
            <p class="text-primary fw-bold">${p.price}</p>
            <button class="btn btn-primary btn-sm addBtn" data-id="${p.id}">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    `);
  });
}

$(document).on("click", ".addBtn", function () {
  let id = $(this).data("id");
  let item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    let p = products.find(p => p.id === id);
    cart.push({ ...p, qty: 1 });
  }
});

function renderCart() {
  let subtotal = 0;
  $("#cartBody").empty();

  $.each(cart, function (i, item) {
    let total = item.price * item.qty;
    subtotal += total;

    $("#cartBody").append(`
      <tr>
        <td>${item.name}</td>
        <td>
          <button class="btn btn-sm btn-secondary qtyMinus" data-i="${i}">-</button>
          ${item.qty}
          <button class="btn btn-sm btn-secondary qtyPlus" data-i="${i}">+</button>
        </td>
        <td>${item.price}</td>
        <td>${total}</td>
        <td>
          <button class="btn btn-sm btn-primary removeItem" data-i="${i}">X</button>
        </td>
      </tr>
    `);
  });

  let tax = subtotal * 0.05;
  $("#subtotal").text("Subtotal: " + subtotal);
  $("#tax").text("Tax (5%): " + tax);
  $("#grandTotal").text("Grand Total: " + (subtotal + tax));
}

$(document).on("click", ".qtyPlus", function () {
  cart[$(this).data("i")].qty++;
  renderCart();
});

$(document).on("click", ".qtyMinus", function () {
  let i = $(this).data("i");
  cart[i].qty > 1 ? cart[i].qty-- : cart.splice(i, 1);
  renderCart();
});

$(document).on("click", ".removeItem", function () {
  cart.splice($(this).data("i"), 1);
  renderCart();
});

$("#showCartBtn").click(function () {
  renderCart();
  new bootstrap.Modal("#cartModal").show();
});

$("#clearCartBtn").click(function () {
  cart = [];
  renderCart();
  alert("Cart cleared");
});

renderProducts();