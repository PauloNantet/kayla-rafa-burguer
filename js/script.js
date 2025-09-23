// ========================================
// Dados dos Hambúrgueres
// ========================================
const burgers = [
  {
    id: 1,
    name: "Cheddar King",
    description: "Pão, carne, queijo cheddar, molho da casa.",
    price: 7,
    image: "./assets/images/burger1.webp", // 300 x 200
  },
  {
    id: 2,
    name: "X-Baconzada",
    description:
      "Pão, carne, queijo, bacon, alface, ketchup, batata e maionese.",
    price: 16,
    image: "./assets/images/burger2.webp",
  },
  {
    id: 3,
    name: "Duplo Monstrão",
    description:
      "Pão, 2 carnes, 2 ovos, queijo cheddar, presunto, linguiça, bacon, alface, ketchup, batata e maionese.",
    price: 16,
    image: "./assets/images/burger3.webp",
  },
  {
    id: 4,
    name: "X-Tudão Max",
    description:
      "Pão, carne, ovo, queijo, presunto, bacon, calabresa, alface, ketchup, batata e maionese.",
    price: 14,
    image: "./assets/images/burger4.webp",
  },
  {
    id: 5,
    name: "X-Calabrex",
    description:
      "Pão, 1 carne, ovo, 1 queijo, 1 presunto, calabresa, alface, ketchup, batata e maionese.",
    price: 15,
    image: "./assets/images/burger5.webp",
  },
  {
    id: 6,
    name: "Mega Tudão Supremo",
    description:
      "Pão, 2 carnes, ovo, 2 queijos, 2 presuntos, bacon, calabresa, alface, ketchup, batata, cream cheese, requeijão cremoso, ovo de codorna, milho, azeitona.",
    price: 19,
    image: "./assets/images/burger6.webp",
  },
];

// ========================================
// Dados das Bebidas
// ========================================
const drinks = [
  {
    id: 1,
    name: "Refrigerante 350ml",
    description: "Coca-Cola, Pepsi, Fanta ou Guaraná",
    price: 6,
    image: "./assets/images/drink1.webp",
  },
  {
    id: 2,
    name: "Suco Natural 400ml",
    description: "Laranja, Limão, Abacaxi ou Uva",
    price: 8,
    image: "./assets/images/drink1.webp",
  },
  {
    id: 3,
    name: "Água Mineral 500ml",
    description: "Sem gás ou com gás",
    price: 4,
    image: "./assets/images/drink1.webp",
  },
  {
    id: 4,
    name: "Cerveja Artesanal 300ml",
    description: "Loira, IPA ou Stout — consulta disponibilidade",
    price: 12,
    image: "./assets/images/drink1.webp",
  },
];

// ========================================
// Estado do Carrinho e Pagamento
// ========================================
let cart = [];
let selectedPayment = null;

// ========================================
// Função para atualizar contador do carrinho
// ========================================
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

// ========================================
// Carregar Hambúrgueres na Página
// ========================================
function loadBurgers() {
  const container = document.getElementById("burgers-container");
  container.innerHTML = "";

  burgers.forEach((burger) => {
    const card = createCard(burger);
    container.appendChild(card);
  });
}

// ========================================
// Carregar Bebidas na Página
// ========================================
function loadDrinks() {
  const container = document.getElementById("drinks-container");
  container.innerHTML = "";

  drinks.forEach((drink) => {
    const card = createCard(drink);
    container.appendChild(card);
  });
}

// ========================================
// Função auxiliar para criar card reutilizável
// ========================================
function createCard(item) {
  const card = document.createElement("div");
  card.className = "burger-card";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="burger-image">
    <div class="burger-info">
      <div class="burger-name">${item.name}</div>
      <div class="burger-description">${item.description}</div>
      <div class="burger-price">R$ ${item.price
        .toFixed(2)
        .replace(".", ",")}</div>
      <button class="add-to-cart" data-id="${item.id}" data-name="${
    item.name
  }" data-price="${item.price}">
        Adicionar ao Pedido
      </button>
    </div>
  `;

  // Adiciona evento de clique ao botão
  const button = card.querySelector(".add-to-cart");
  button.addEventListener("click", addToCart);

  return card;
}

// ========================================
// Adicionar item ao carrinho
// ========================================
function addToCart(e) {
  const button = e.target;
  const id = Date.now(); // ID único para o item no carrinho
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

  const cartItem = {
    id,
    name,
    price,
    totalPrice: price,
  };

  cart.push(cartItem);
  updateCart();
  updateCartCount();
}

// ========================================
// Atualizar exibição do carrinho
// ========================================
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Seu carrinho está vazio. Adicione alguns hambúrgueres ou bebidas!</div>';
    totalPriceElement.textContent = "R$ 0,00";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    itemElement.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
      </div>
      <div class="cart-item-price">R$ ${item.totalPrice
        .toFixed(2)
        .replace(".", ",")}</div>
      <button class="remove-item" data-index="${index}">×</button>
    `;

    cartItemsContainer.appendChild(itemElement);
    total += item.totalPrice;
  });

  // Adicionar evento de remoção
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });

  totalPriceElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

// ========================================
// Remover item do carrinho
// ========================================
function removeItemFromCart(e) {
  const index = parseInt(e.target.getAttribute("data-index"));
  cart.splice(index, 1);
  updateCart();
  updateCartCount();
}

// ========================================
// Configurar métodos de pagamento
// ========================================
function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll(".payment-method");

  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      // Remover seleção de todos
      paymentMethods.forEach((m) => m.classList.remove("active"));
      // Adicionar seleção ao clicado
      this.classList.add("active");
      // Salvar método selecionado
      selectedPayment = this.getAttribute("data-payment");

      // Mostrar/ocultar campo de troco
      const changeForInput = document.getElementById("change-for");
      if (selectedPayment === "cash") {
        changeForInput.closest("small").style.display = "block";
      } else {
        changeForInput.closest("small").style.display = "none";
        changeForInput.value = "";
      }
    });
  });
}

// ========================================
// Enviar pedido via WhatsApp
// ========================================
function submitOrder() {
  const submitButton = document.getElementById("submit-order");
  submitButton.addEventListener("click", function () {
    // Validar formulário
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (cart.length === 0) {
      alert("Adicione pelo menos um item ao seu pedido.");
      return;
    }

    if (!selectedPayment) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    // Montar mensagem do pedido
    let message = `*NOVO PEDIDO - BURGER ARTESANAL*%0A`;
    message += `%0A*Dados do Cliente:*%0A`;
    message += `Nome: ${name}%0A`;
    message += `WhatsApp: ${phone}%0A`;
    message += `Endereço: ${address}%0A`;

    const observation = document
      .getElementById("customer-observation")
      .value.trim();
    if (observation) {
      message += `Observações: ${observation}%0A`;
    }

    message += `%0A*Itens do Pedido:*%0A`;
    let total = 0;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - R$ ${item.totalPrice
        .toFixed(2)
        .replace(".", ",")}%0A`;
      total += item.totalPrice;
    });

    // Aplicar desconto se for PIX
    let finalTotal = total;
    if (selectedPayment === "pix") {
      finalTotal = total * 0.95; // 5% de desconto
      message += `%0A*Subtotal:* R$ ${total.toFixed(2).replace(".", ",")}%0A`;
      message += `*Desconto PIX (5%):* R$ ${(total * 0.05)
        .toFixed(2)
        .replace(".", ",")}%0A`;
    }

    message += `*Total:* R$ ${finalTotal.toFixed(2).replace(".", ",")}%0A`;
    message += `%0A*Forma de Pagamento:* ${getPaymentMethodName(
      selectedPayment
    )}%0A`;

    if (selectedPayment === "cash") {
      const changeFor = document.getElementById("change-for").value;
      if (changeFor) {
        message += `*Troco para:* R$ ${parseFloat(changeFor)
          .toFixed(2)
          .replace(".", ",")}%0A`;
      }
    }

    message += `%0A*Status:* 🕒 Aguardando confirmação%0A`;

    // Número do entregador (substitua pelo número real)
    const deliveryPhoneNumber = "5521973970261"; // Exemplo: Brasil +55 21 97397-0261

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${deliveryPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Opcional: Limpar formulário e carrinho após envio
    if (
      confirm(
        "Pedido enviado com sucesso! Deseja limpar o formulário e o carrinho?"
      )
    ) {
      cart = [];
      updateCart();
      updateCartCount();
      document.getElementById("customer-name").value = "";
      document.getElementById("customer-phone").value = "";
      document.getElementById("customer-address").value = "";
      document.getElementById("customer-observation").value = "";
      document
        .querySelectorAll(".payment-method")
        .forEach((m) => m.classList.remove("active"));
      selectedPayment = null;
      document.getElementById("change-for").value = "";
    }
  });
}

// ========================================
// Obter nome amigável do método de pagamento
// ========================================
function getPaymentMethodName(paymentMethod) {
  const names = {
    pix: "PIX (5% de desconto)",
    debit: "Cartão de Débito",
    credit: "Cartão de Crédito",
    cash: "Dinheiro",
  };
  return names[paymentMethod] || paymentMethod;
}

// ========================================
// Inicializar a aplicação
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  loadBurgers();
  loadDrinks();
  setupPaymentMethods();
  submitOrder();
  updateCartCount(); // Inicia com 0
});
