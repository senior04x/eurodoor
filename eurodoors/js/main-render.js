import { findElement } from "./helper.js";

// API endpoint
const apiUrl = "https://675d6f5763b05ed07977dbfb.mockapi.io/eurodoors";

// DOM elementlar
const elWrapperProducts = findElement("#products-container");
const elTemplate = findElement("#template");

// O'zgaruvchilar
let pageCount = 1;
const perPage = 4;
let filteredProducts = [];
let basket = [];

// Mahsulotlarni olish funksiyasi
function fetchProducts() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      filteredProducts = data;
      renderProducts();
    })
    .catch((error) => console.error("Ma'lumotni olishda xatolik:", error));
}

// Mahsulotlarni chiqarish funksiyasi
function renderProducts() {
  elWrapperProducts.innerHTML = ""; // Mahsulotlar konteynerini tozalash
  const start = (pageCount - 1) * perPage;
  const end = start + perPage;
  const visibleProducts = filteredProducts.slice(start, end);

  visibleProducts.forEach((product) => {
    const newTemplate = elTemplate.content.cloneNode(true);

    // Elementlarni to'ldirish
    const elImg = findElement(".img-fluid", newTemplate);
    elImg.src = product.imageSrc;
    elImg.dataset.id = product.id;
    elImg.alt = product.title;
    elImg.addEventListener("click", () => redirectToSinglePage(product.id));

    const elTitle = findElement(".product-title", newTemplate);
    elTitle.textContent = shortenTitle(product.title);

    const elPrice = findElement(".product-price", newTemplate);
    elPrice.textContent = `${product.oldPrice} sum`;

    const elAddToBasket = findElement("#icon-cross", newTemplate);
    elAddToBasket.addEventListener("click", () => addToBasket(product));

    elWrapperProducts.appendChild(newTemplate);
  });
}

// Mahsulot sarlavhasini qisqartirish
function shortenTitle(title, maxLength = 50) {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
}

// Savatchaga mahsulot qo'shish
function addToBasket(product) {
  // LocalStorage'dan mavjud savatni olish
  let basket = JSON.parse(localStorage.getItem('basket')) || [];

  // Savatda mahsulot bor-yo'qligini tekshirish
  const productExists = basket.some((item) => item.id === product.id);

  if (productExists) {
    alert(`${product.title} уже добавлен в корзину.`);
  } else {
    // Mahsulotni savatga qo'shish
    basket.push(product);
    localStorage.setItem('basket', JSON.stringify(basket));
    alert(`${product.title} успешно добавлен в корзину.`);
    console.log("Добавлено в корзину:", product);
  }
}



// Single sahifaga yo'naltirish
function redirectToSinglePage(productId) {
  window.location.href = `single.html?id=${productId}`;
}

// Sahifa yuklanganda ma'lumot olish
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
