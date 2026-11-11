/* ==========================================
   URBAN STYLE - JAVASCRIPT
   CASO 10 - TIENDA VIRTUAL AVANZADA
========================================== */

// FORMATO DE PRECIOS COLOMBIANOS

const money = value => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
}).format(value);


// ==========================================
// 1. CATÁLOGO DE PRODUCTOS
// ==========================================

const products = [
  {
    id: 1,
    name: "Oversize Essential Black",
    category: "camisetas",
    price: 85000,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    tag: "BEST SELLER"
  },
  {
    id: 2,
    name: "Urban Graphic White",
    category: "camisetas",
    price: 95000,
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
    tag: "NUEVO"
  },
  {
    id: 3,
    name: "Streetwear Basic",
    category: "camisetas",
    price: 78000,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600",
    tag: "URBAN"
  },
  {
    id: 4,
    name: "Classic Premium Tee",
    category: "camisetas",
    price: 105000,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600",
    tag: "EXCLUSIVO"
  },
  {
    id: 5,
    name: "Cargo Street Black",
    category: "pantalones",
    price: 165000,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600",
    tag: "POPULAR"
  },
  {
    id: 6,
    name: "Denim Urban Blue",
    category: "pantalones",
    price: 185000,
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
    tag: "NUEVO"
  },
  {
    id: 7,
    name: "Relaxed Fit Jeans",
    category: "pantalones",
    price: 175000,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
    tag: "TRENDING"
  },
  {
    id: 8,
    name: "Urban Cargo Beige",
    category: "pantalones",
    price: 155000,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
    tag: "CASUAL"
  },
  {
    id: 9,
    name: "Bomber Street Jacket",
    category: "chaquetas",
    price: 245000,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    tag: "EXCLUSIVO"
  },
  {
    id: 10,
    name: "Denim Oversize Jacket",
    category: "chaquetas",
    price: 265000,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600",
    tag: "NUEVO"
  },
  {
    id: 11,
    name: "Urban Classic Cap",
    category: "accesorios",
    price: 55000,
    sizes: ["M", "L"],
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
    tag: "ACCESORIO"
  },
  {
    id: 12,
    name: "Street Style Sunglasses",
    category: "accesorios",
    price: 65000,
    sizes: ["M"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    tag: "TRENDING"
  }
];


// ==========================================
// 2. VARIABLES Y ALMACENAMIENTO
// ==========================================

const CART_KEY = "urbanStyleCart";

let cart = [];

try {
  const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

  if (Array.isArray(savedCart)) {
    cart = savedCart.filter(item =>
      products.some(product => product.id === item.id) &&
      typeof item.size === "string" &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  }
} catch (error) {
  cart = [];
}

let couponApplied = false;

const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");

const categoryFilter = document.getElementById("categoryFilter");
const sizeFilter = document.getElementById("sizeFilter");
const sortFilter = document.getElementById("sortFilter");


// ==========================================
// 3. MOSTRAR PRODUCTOS DINÁMICAMENTE
// ==========================================

function renderProducts() {

  let filteredProducts = [...products];

  const category = categoryFilter.value;
  const size = sizeFilter.value;
  const sorting = sortFilter.value;

  if (category !== "todos") {
    filteredProducts = filteredProducts.filter(product =>
      product.category === category
    );
  }

  if (size !== "todas") {
    filteredProducts = filteredProducts.filter(product =>
      product.sizes.includes(size)
    );
  }

  if (sorting === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sorting === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  document.getElementById("resultsCount").textContent =
    `Mostrando ${filteredProducts.length} de ${products.length} productos`;

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="no-products">
        <h3>No encontramos productos</h3>
        <p>Prueba seleccionando otra categoría o talla.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">

      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x750/e8e8e4/333333?text=Urban+Style';"
        >
        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">

        <span class="product-category">${product.category}</span>

        <h3>${product.name}</h3>

        <p class="product-price">${money(product.price)}</p>

        <select class="product-sizes" id="size-${product.id}">
          ${product.sizes.map(size => `
            <option value="${size}">Talla ${size}</option>
          `).join("")}
        </select>

        <button
          class="add-button"
          data-id="${product.id}"
        >
          + AGREGAR AL CARRITO
        </button>

      </div>
    </article>
  `).join("");
}


// FILTROS

categoryFilter.addEventListener("change", renderProducts);
sizeFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);


// ==========================================
// 4. GUARDAR CARRITO EN LOCALSTORAGE
// ==========================================

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


// ==========================================
// 5. AGREGAR PRODUCTOS
// ==========================================

productGrid.addEventListener("click", event => {

  const button = event.target.closest(".add-button");

  if (!button) return;

  const productId = Number(button.dataset.id);

  const product = products.find(p => p.id === productId);

  const selectedSize = document.getElementById(
    `size-${productId}`
  ).value;

  const existingItem = cart.find(item =>
    item.id === productId && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: productId,
      size: selectedSize,
      quantity: 1
    });
  }

  saveCart();
  updateCart();

  button.textContent = "✓ AGREGADO";

  setTimeout(() => {
    button.textContent = "+ AGREGAR AL CARRITO";
  }, 1200);
});


// ==========================================
// 6. CALCULAR TOTALES
// ==========================================

function calculateTotals() {

  const subtotal = cart.reduce((total, item) => {

    const product = products.find(p => p.id === item.id);

    return total + product.price * item.quantity;

  }, 0);

  const discount = couponApplied ? subtotal * 0.10 : 0;

  const total = subtotal - discount;

  return {
    subtotal,
    discount,
    total
  };
}


// ==========================================
// 7. ACTUALIZAR CARRITO
// ==========================================

function updateCart() {

  const totalItems = cart.reduce((sum, item) =>
    sum + item.quantity, 0
  );

  document.getElementById("cartCount").textContent = totalItems;

  document.getElementById("cartTitleCount").textContent =
    `(${totalItems})`;

  const cartItems = document.getElementById("cartItems");

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <h3>Tu carrito está vacío 🛍️</h3>
        <p>¡Descubre nuestras prendas y encuentra tu estilo!</p>
      </div>
    `;

  } else {

    cartItems.innerHTML = cart.map(item => {

      const product = products.find(p => p.id === item.id);

      return `
        <div class="cart-item">

          <img src="${product.image}" alt="${product.name}">

          <div class="cart-item-info">

            <h4>${product.name}</h4>

            <p>Talla: ${item.size}</p>

            <strong>${money(product.price * item.quantity)}</strong>

            <div class="quantity-control">

              <button data-action="decrease" data-id="${item.id}" data-size="${item.size}">−</button>

              <span>${item.quantity}</span>

              <button data-action="increase" data-id="${item.id}" data-size="${item.size}">+</button>

            </div>

            <button
              class="remove-item"
              data-action="remove"
              data-id="${item.id}"
              data-size="${item.size}"
            >
              ELIMINAR PRODUCTO
            </button>

          </div>
        </div>
      `;

    }).join("");

  }

  const totals = calculateTotals();

  document.getElementById("subtotal").textContent =
    money(totals.subtotal);

  document.getElementById("discount").textContent =
    money(totals.discount);

  document.getElementById("total").textContent =
    money(totals.total);

  document.getElementById("checkoutButton").disabled =
    cart.length === 0;
}


// ==========================================
// 8. MODIFICAR CANTIDADES Y ELIMINAR
// ==========================================

document.getElementById("cartItems").addEventListener("click", event => {

  const button = event.target.closest("[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const size = button.dataset.size;
  const action = button.dataset.action;

  const item = cart.find(i => i.id === id && i.size === size);

  if (!item) return;

  if (action === "increase") {
    item.quantity++;
  }

  if (action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(i => !(i.id === id && i.size === size));
    }
  }

  if (action === "remove") {
    cart = cart.filter(i => !(i.id === id && i.size === size));
  }

  if (cart.length === 0) {
    couponApplied = false;
    document.getElementById("couponInput").value = "";
    document.getElementById("couponMessage").textContent = "";
  }

  saveCart();
  updateCart();
});


// ==========================================
// 9. ABRIR Y CERRAR CARRITO
// ==========================================

function openCart() {
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("continueShopping").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);


// ==========================================
// 10. CUPÓN DE DESCUENTO
// ==========================================

document.getElementById("applyCoupon").addEventListener("click", () => {

  const couponInput = document.getElementById("couponInput");

  const message = document.getElementById("couponMessage");

  const code = couponInput.value.trim().toUpperCase();

  if (cart.length === 0) {
    message.textContent = "Agrega productos antes de usar un cupón.";
    message.style.color = "red";
    return;
  }

  if (code === "URBAN10") {

    couponApplied = true;

    message.textContent = "¡Cupón aplicado! Recibiste 10% de descuento.";
    message.style.color = "green";

  } else {

    couponApplied = false;

    message.textContent = "Cupón incorrecto. Intenta nuevamente.";
    message.style.color = "red";

  }

  updateCart();
});


// ==========================================
// 11. FINALIZAR COMPRA
// ==========================================

const checkoutModal = document.getElementById("checkoutModal");

document.getElementById("checkoutButton").addEventListener("click", () => {

  if (cart.length === 0) return;

  const totals = calculateTotals();

  document.getElementById("checkoutSummary").innerHTML =
    cart.map(item => {

      const product = products.find(p => p.id === item.id);

      return `
        <div class="summary-line">
          <span>${product.name} · ${item.size} · x${item.quantity}</span>
          <strong>${money(product.price * item.quantity)}</strong>
        </div>
      `;

    }).join("");

  document.getElementById("checkoutSubtotal").textContent =
    money(totals.subtotal);

  document.getElementById("checkoutDiscount").textContent =
    money(totals.discount);

  document.getElementById("checkoutTotal").textContent =
    money(totals.total);

  closeCart();

  checkoutModal.classList.add("active");

});

document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});


// ==========================================
// 12. VALIDAR Y CONFIRMAR PEDIDO
// ==========================================

document.getElementById("checkoutForm").addEventListener("submit", event => {

  event.preventDefault();

  const form = event.target;

  if (!form.reportValidity()) return;

  if (cart.length === 0) {
    checkoutModal.classList.remove("active");
    return;
  }

  const name = document.getElementById("customerName").value.trim();

  const orderNumber = "URB-" + Date.now().toString().slice(-7);

  const totals = calculateTotals();

  document.getElementById("successMessage").textContent =
    `¡Gracias, ${name}! Tu pedido ${orderNumber} ha sido registrado correctamente. Total de tu compra: ${money(totals.total)}. Esta es una confirmación de demostración; no se ha realizado ningún pago real.`;

  // LIMPIAR CARRITO

  cart = [];
  couponApplied = false;

  saveCart();
  updateCart();

  document.getElementById("couponInput").value = "";
  document.getElementById("couponMessage").textContent = "";

  form.reset();

  checkoutModal.classList.remove("active");

  document.getElementById("successModal").classList.add("active");

});


// ==========================================
// 13. VOLVER A LA TIENDA
// ==========================================

document.getElementById("finishButton").addEventListener("click", () => {

  document.getElementById("successModal").classList.remove("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


// ==========================================
// 14. MENÚ RESPONSIVE
// ==========================================

document.getElementById("menuToggle").addEventListener("click", () => {

  document.getElementById("nav").classList.toggle("active");

});

document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("active");
  });

});


// ==========================================
// 15. INICIALIZAR TIENDA
// ==========================================

renderProducts();
updateCart();

console.log("URBAN STYLE: tienda virtual iniciada correctamente.");
console.log("Productos disponibles:", products.length);