   // Basketni render qilish
   function renderBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketBody = document.getElementById('basket-body2');
    const inputTitles = document.querySelectorAll("#product__input_title2");
  
    basketBody.innerHTML = ''; // Oldingi ma'lumotlarni tozalash
  
    basket.forEach((product, index) => {
      const row = document.createElement('div');
      row.className = "basket__list";
  
      row.innerHTML = `
        <img src="${product.imageSrc}" alt="Image" style="width: 100px;">
        <div class="basket__box">
          <h2>${product.title}</h2>
          <h3 class="basket__price">${product.oldPrice} сум</h3>
        </div>
        <div class="basket__box">
          <div class="basket__quantity_box">
            <button class="basket__minus_btn" type="button">&minus;</button>
            <input type="text" class="basket__quantity" value="1">
            <button class="basket__plus_btn" type="button">&plus;</button>
          </div>
          <h3 class="basket__price" id="basket__total">${product.oldPrice} сум</h3>
        </div>
        <button class="basket__remove_btn" data-index="${index}">
          <span class="fa-solid fa-trash"></span>
        </button>
      `;
  
      basketBody.appendChild(row);
  
      // Input qiymatini product.title bilan to'ldirish
      if (inputTitles[index]) { 
        inputTitles[index].value = product.title;
      }
    });
  
    // Har bir tugmani funksiyaga bog'lash
    setupQuantityControls();
    setupRemoveButtons();
  
    // Basketdagi barcha title'larni vergul bilan birlashtirib inputga joylash
    const productTitles = basket.map(product => product.title).join(', ');
    const titleInput = document.getElementById('product__input_title2'); // Title input
    if (titleInput) {
      titleInput.value = productTitles; // Inputga qiymat joylash
    }
  
    // Basketdagi mahsulotlar sonini inputga joylash
    const productCount = basket.length; // Mahsulotlar sonini olish
    const productOrderInput = document.getElementById('product__order_number'); // Mahsulotlar soni inputi
    if (productOrderInput) {
      productOrderInput.value = productCount; // Inputga mahsulotlar sonini joylash
    }
  }
  
  


  
 // Miqdorni boshqarish
function setupQuantityControls() {
  const decreaseButtons = document.querySelectorAll('.basket__minus_btn');
  const increaseButtons = document.querySelectorAll('.basket__plus_btn');

  decreaseButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => updateQuantity(e.target, -1));
  });

  increaseButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => updateQuantity(e.target, 1));
  });
}

function updateQuantity(button, delta) {
  // Eng yaqin basket__quantity_box ni topamiz
  const quantityBox = button.closest('.basket__quantity_box');
  const quantityInput = quantityBox.querySelector('.basket__quantity');
  const productBox = button.closest('.basket__list'); // Umumiy product blokini topamiz
  const priceElement = productBox.querySelector('.basket__price');
  
  // Miqdorni yangilash
  let quantity = parseInt(quantityInput.value) + delta;
  if (quantity < 1) quantity = 1;

  quantityInput.value = quantity;

  // Narx va umumiy summani hisoblash
  const price = parseFloat(priceElement.dataset.price); // Narxni data-atributdan olish
  const totalElement = productBox.querySelector('.basket__price:last-of-type'); // Umumiy narx

  if (price && totalElement) {
    totalElement.textContent = (price * quantity) + ' сум';
  }
}


  // Mahsulotni o'chirish
  function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.basket__remove_btn');
    removeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        removeProduct(index);
      });
    });
  }

  function removeProduct(index) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.splice(index, 1); // Mahsulotni o'chirish
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket(); // Savatni qayta render qilish
  }

  // Sahifa yuklanganda basketni ko'rsatish
  window.addEventListener('DOMContentLoaded', renderBasket);


  const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, ''); // Faqat raqamlarni oladi

    // Avtomatik +998 ni qo'shish
    if (!input.startsWith("998")) {
        input = "998" + input;
    }

    // Formatlash qismi: +998 XX-XXX-XX-XX
    let formattedInput = `+${input.slice(0, 3)}`;
    if (input.length > 3) {
        formattedInput += ` ${input.slice(3, 5)}`;
    }
    if (input.length > 5) {
        formattedInput += `-${input.slice(5, 8)}`;
    }
    if (input.length > 8) {
        formattedInput += `-${input.slice(8, 10)}`;
    }
    if (input.length > 10) {
        formattedInput += `-${input.slice(10, 12)}`;
    }

    e.target.value = formattedInput;
});

phoneInput.addEventListener('keydown', function (e) {
    // 998 qismidan pastni o'chirib bo'lmaydi
    if (e.key === 'Backspace' && phoneInput.value.replace(/\D/g, '').length <= 3) {
        e.preventDefault();
    }
});

// Modal va buttonlarni aniqlaymiz
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close-btn")[0];

// Modalni ochish
btn.onclick = function() {
    modal.style.display = "block";
}

// Modalni yopish faqat X tugmasi bosilganda
span.onclick = function() {
    modal.style.display = "none";
}