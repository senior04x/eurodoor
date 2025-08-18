// addToBasket funksiyasi
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
      console.log("Добавлено в корзину:", product);
  
      // Modalni ko'rsatish
      showAddToBasketModal(`${product.title} успешно добавлен в корзину.`);
    }
  }
  
  // Modalni ko'rsatish funksiyasi
  function showAddToBasketModal(message) {
    const modal = document.getElementById("addToBasketModal2");
    const modalMessage = document.getElementById("modalMessage2");
    const closeBtn = document.getElementsByClassName("close-btn2")[0];
  
    modal.style.display = "block"; // Modalni ko'rsatish
    modalMessage.textContent = message; // Modalda ko'rsatiladigan xabar
  
    // Modalni yopish
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
  
    // Modalni tashqariga bosish orqali yopish
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  