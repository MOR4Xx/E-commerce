const menuButtons = document.querySelectorAll('.button-menu');
const menuToggle = document.getElementById('menu-toggle');
const cart = document.getElementById('cart');
const cartMenu = document.getElementById('cart-menu');
const cartTable = document.getElementById('cart-table');
const cartPrice = document.getElementById('price-cart');

let totalPrice = 0;
let arrayProducts = [];

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    menuToggle.checked = false;
  });
});

cart.addEventListener('click', () => {
  if (cartMenu.style.display === 'block') {
    cartMenu.style.display = 'none';
  } else {
    cartMenu.style.display = 'block';
  }
});

function addCart(name, price) {
  const item = {name, price};
  arrayProducts.push(item);
  loadCart();
}

function loadCart() {
  const cartTable = document.querySelector('#cart-table tbody');
  const cartPrice = document.getElementById('price-cart');

  cartTable.innerHTML = '';
  totalPrice = 0;

  arrayProducts.forEach((item, index) => {
    totalPrice += item.price;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td><button onclick="removeCart(${index})">Remover</button></td>
    `;
    cartTable.appendChild(row);
  });

  cartPrice.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
}

function removeCart(index) {
  arrayProducts.splice(index, 1);
  loadCart();
}

document.querySelectorAll('.card-products').forEach((card) => {
  const productName = card.querySelector('h3').textContent;
  const priceText = card.querySelector('p:nth-child(4)').textContent;
  const productPrice = parseFloat(
    priceText.replace('R$ ', '').replace('.', '').replace(',', '.'));

  const button = card.querySelector('.button-card');

  button.addEventListener('click', () => {
    if (!isNaN(productPrice)) {
      addCart(productName, productPrice);
    } else {
      console.error('Erro ao capturar o preço do produto:', priceText);
    }
  });
});

document.getElementById('finish').addEventListener('click', () => {
  arrayProducts = [];
  alert("Compra Finalizada!!\n " + '\n' +
    `Ainda não finalizamos a parte de endereço, mas será cobrado no seu cartão R$ ${totalPrice.toFixed(2).replace('.', ',')}\n` +
    '\n' +
    "Obrigado pela Preferencia!!")
  loadCart();
})
