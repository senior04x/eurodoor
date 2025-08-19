// HTML elementlarni topish uchun funksiya
export function findElement(selector, parent = document) {
    return parent.querySelector(selector);
  }
  