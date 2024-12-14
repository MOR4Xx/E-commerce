// Seleção de elementos da interface
const menuButtons = document.querySelectorAll('.button-menu'); // Botões do menu
const menuToggle = document.getElementById('menu-toggle'); // Checkbox para abrir/fechar o menu
const cart = document.getElementById('cart'); // Botão para abrir/fechar o carrinho
const cartMenu = document.getElementById('cart-menu'); // Div que contém o carrinho
const cartTable = document.getElementById('cart-table'); // Tabela do carrinho
const cartPrice = document.getElementById('price-cart'); // Elemento que exibe o preço total

// Variáveis globais para gerenciar o carrinho
let totalPrice = 0; // Preço total dos itens no carrinho
let arrayProducts = []; // Array que armazena os produtos adicionados

// Fechar o menu ao clicar em qualquer botão do menu
menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    menuToggle.checked = false; // Desmarca o checkbox para fechar o menu
  });
});

// Alternar visibilidade do menu do carrinho ao clicar no botão "Carrinho"
cart.addEventListener('click', () => {
  if (cartMenu.style.display === 'block') {
    cartMenu.style.display = 'none'; // Esconde o carrinho se ele estiver visível
  } else {
    cartMenu.style.display = 'block'; // Mostra o carrinho se ele estiver escondido
  }
});

// Função para adicionar produtos ao carrinho
function addCart(name, price) {
  const item = { name, price }; // Cria um objeto representando o produto
  arrayProducts.push(item); // Adiciona o produto ao array
  loadCart(); // Atualiza a interface do carrinho
}

// Função para carregar o conteúdo do carrinho na tabela
function loadCart() {
  const cartTable = document.querySelector('#cart-table tbody'); // Corpo da tabela
  const cartPrice = document.getElementById('price-cart'); // Elemento para o preço total

  cartTable.innerHTML = ''; // Limpa o conteúdo da tabela
  totalPrice = 0; // Reseta o preço total

  // Adiciona cada produto no carrinho à tabela
  arrayProducts.forEach((item, index) => {
    totalPrice += item.price; // Atualiza o preço total
    const row = document.createElement('tr'); // Cria uma nova linha
    row.innerHTML = `
      <td>${item.name}</td> <!-- Nome do produto -->
      <td>R$ ${item.price.toFixed(2)}</td> <!-- Preço formatado -->
      <td><button onclick="removeCart(${index})">Remover</button></td> <!-- Botão para remover -->
    `;
    cartTable.appendChild(row); // Adiciona a linha à tabela
  });

  cartPrice.textContent = `Total: R$ ${totalPrice.toFixed(2)}`; // Exibe o preço total
}

// Função para remover um produto do carrinho
function removeCart(index) {
  arrayProducts.splice(index, 1); // Remove o produto pelo índice
  loadCart(); // Atualiza a interface do carrinho
}

// Configura os botões "Adicionar ao Carrinho" para cada produto
document.querySelectorAll('.card-products').forEach((card) => {
  const productName = card.querySelector('h3').textContent; // Captura o nome do produto
  const priceText = card.querySelector('p:nth-child(4)').textContent; // Captura o texto do preço
  const productPrice = parseFloat(
      priceText.replace('R$ ', '').replace('.', '').replace(',', '.')); // Converte o preço para número

  const button = card.querySelector('.button-card'); // Botão "Adicionar ao Carrinho"

  // Adiciona o evento de clique ao botão
  button.addEventListener('click', () => {
    if (!isNaN(productPrice)) {
      addCart(productName, productPrice); // Adiciona o produto ao carrinho
    } else {
      console.error('Erro ao capturar o preço do produto:', priceText); // Loga um erro se o preço for inválido
    }
  });
});

// Finalizar compra
document.getElementById('finish').addEventListener('click', () => {
  arrayProducts = []; // Limpa o carrinho
  alert("Compra Finalizada!!\n " + '\n' +
      `Ainda não finalizamos a parte de endereço, mas será cobrado no seu cartão R$ ${totalPrice.toFixed(2).replace('.', ',')}\n` +
      '\n' +
      "Obrigado pela Preferencia!!"); // Exibe mensagem de confirmação
  loadCart(); // Atualiza a interface do carrinho
});
