// Dados dos hambúrgueres
const burgers = [
  {
    id: 1,
    name: "Clássico Artesanal",
    description:
      "Hambúrguer bovino 180g, queijo cheddar, alface, tomate, cebola roxa e molho da casa.",
    price: 28.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Supremo BBQ",
    description:
      "Hambúrguer bovino 200g, queijo cheddar, bacon crocante, cebola caramelizada e molho barbecue.",
    price: 34.9,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Veggie Delight",
    description:
      "Hambúrguer de grão de bico e quinoa, queijo vegano, alface, tomate, pepino e molho de iogurte.",
    price: 32.9,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Spicy Fire",
    description:
      "Hambúrguer bovino 180g, queijo pepper jack, jalapeños, molho de pimenta artesanal e cebola roxa.",
    price: 36.9,
    image:
      "https://images.unsplash.com/photo-1553979459-d2e4-422e-b89a-57a824a14a6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Gourmet Truffle",
    description:
      "Hambúrguer bovino 200g, queijo brie, cogumelos salteados, rúcula e molho de trufas.",
    price: 45.9,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Chicken Crispy",
    description:
      "Filé de frango empanado artesanal, queijo cheddar, alface, tomate e maionese da casa.",
    price: 29.9,
    image:
      "https://images.unsplash.com/photo-1619565395007-2412d0d5241b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
];

// Carrinho de compras
let cart = [];
let selectedPayment = null;

// Carregar hambúrgueres na página
function loadBurgers() {
  const container = document.getElementById("burgers-container");
  container.innerHTML = "";

  burgers.forEach((burger) => {
    const burgerCard = document.createElement("div");
    burgerCard.className = "burger-card";
    burgerCard.innerHTML = `
                    <img src="${burger.image}" alt="${
      burger.name
    }" class="burger-image">
                    <div class="burger-info">
                        <div class="burger-name">${burger.name}</div>
                        <div class="burger-description">${
                          burger.description
                        }</div>
                        <div class="burger-price">R$ ${burger.price
                          .toFixed(2)
                          .replace(".", ",")}</div>
                        <button class="add-to-cart" data-id="${
                          burger.id
                        }" data-name="${burger.name}" data-price="${
      burger.price
    }">
                            Adicionar ao Pedido
                        </button>
                    </div>
                `;
    container.appendChild(burgerCard);
  });

  // Adicionar evento de clique nos botões
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Adicionar hambúrguer ao carrinho
function addToCart(e) {
  const button = e.target;
  const id = parseInt(button.getAttribute("data-id"));
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

  // Coletar opções selecionadas
  const selectedOptions = {
    bread: getSelectedOption("bread"),
    meat: getSelectedOption("meat"),
    cheeses: getSelectedOptions("cheese"),
    sauces: getSelectedOptions("sauce"),
  };

  // Calcular preço adicional das opções
  let additionalPrice = 0;
  if (selectedOptions.bread) additionalPrice += selectedOptions.bread.price;
  if (selectedOptions.meat) additionalPrice += selectedOptions.meat.price;

  selectedOptions.cheeses.forEach((cheese) => {
    additionalPrice += cheese.price;
  });

  selectedOptions.sauces.forEach((sauce) => {
    additionalPrice += sauce.price;
  });

  // Criar item do carrinho
  const cartItem = {
    id: Date.now(), // ID único para o item no carrinho
    burgerId: id,
    name: name,
    basePrice: price,
    additionalPrice: additionalPrice,
    totalPrice: price + additionalPrice,
    options: selectedOptions,
  };

  cart.push(cartItem);
  updateCart();
}

// Obter opção selecionada de um grupo de rádio
function getSelectedOption(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  if (selected) {
    return {
      name: selected.value,
      price: parseFloat(selected.getAttribute("data-price")),
    };
  }
  return null;
}

// Obter opções selecionadas de checkboxes
function getSelectedOptions(name) {
  const selected = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(selected).map((item) => ({
    name: item.value,
    price: parseFloat(item.getAttribute("data-price")),
  }));
}

// Atualizar exibição do carrinho
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Seu carrinho está vazio. Adicione alguns hambúrgueres!</div>';
    totalPriceElement.textContent = "R$ 0,00";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    // Montar descrição das opções
    let optionsDescription = "";
    if (item.options.bread)
      optionsDescription += `Pão: ${item.options.bread.name}`;
    if (item.options.meat)
      optionsDescription += ` | Carne: ${item.options.meat.name}`;
    if (item.options.cheeses.length > 0)
      optionsDescription += ` | Queijos: ${item.options.cheeses
        .map((q) => q.name)
        .join(", ")}`;
    if (item.options.sauces.length > 0)
      optionsDescription += ` | Molhos: ${item.options.sauces
        .map((s) => s.name)
        .join(", ")}`;

    // Mostrar preço adicional se houver
    let additionalText = "";
    if (item.additionalPrice > 0) {
      additionalText = ` (R$ ${item.basePrice
        .toFixed(2)
        .replace(".", ",")} + R$ ${item.additionalPrice
        .toFixed(2)
        .replace(".", ",")})`;
    }

    itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${
                          item.name
                        }${additionalText}</div>
                        <div>${optionsDescription}</div>
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

  const cartCount = document.getElementById("cart-count");

  // Mostra itens no icone do carrinho
  cartCount.textContent = cart.length;
}

// Remover item do carrinho
function removeItemFromCart(e) {
  const index = parseInt(e.target.getAttribute("data-index"));
  cart.splice(index, 1);
  updateCart();
}

// Selecionar método de pagamento
function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll(".payment-method");
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      // Remover seleção de todos
      paymentMethods.forEach((m) => m.classList.remove("selected"));
      // Adicionar seleção ao clicado
      this.classList.add("selected");
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

// Enviar pedido via WhatsApp
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
    message += `Telefone: ${phone}%0A`;
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

      if (item.options.bread)
        message += `   Pão: ${item.options.bread.name}%0A`;
      if (item.options.meat)
        message += `   Carne: ${item.options.meat.name}%0A`;
      if (item.options.cheeses.length > 0)
        message += `   Queijos: ${item.options.cheeses
          .map((q) => q.name)
          .join(", ")}%0A`;
      if (item.options.sauces.length > 0)
        message += `   Molhos: ${item.options.sauces
          .map((s) => s.name)
          .join(", ")}%0A`;
      message += `%0A`;

      total += item.totalPrice;
    });

    // Aplicar desconto se for PIX
    let finalTotal = total;
    if (selectedPayment === "pix") {
      finalTotal = total * 0.95; // 5% de desconto
      message += `*Subtotal:* R$ ${total.toFixed(2).replace(".", ",")}%0A`;
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
    // O número deve estar no formato internacional sem espaços, parênteses ou traços
    // Exemplo: 5511987654321 para um número brasileiro
    const deliveryPhoneNumber = "21973970261"; // Substitua pelo número real do entregador

    // Abrir WhatsApp
    window.open(
      `https://wa.me/${deliveryPhoneNumber}?text=${message}`,
      "_blank"
    );

    // Opcional: Limpar formulário e carrinho após envio
    if (
      confirm(
        "Pedido enviado com sucesso! Deseja limpar o formulário e o carrinho?"
      )
    ) {
      cart = [];
      updateCart();
      document.getElementById("customer-name").value = "";
      document.getElementById("customer-phone").value = "";
      document.getElementById("customer-address").value = "";
      document.getElementById("customer-observation").value = "";
      document
        .querySelectorAll(".payment-method")
        .forEach((m) => m.classList.remove("selected"));
      selectedPayment = null;
      document.getElementById("change-for").value = "";

      // Resetar opções de personalização
      document
        .querySelectorAll('input[type="radio"], input[type="checkbox"]')
        .forEach((input) => {
          input.checked = false;
        });

      // Selecionar opções padrão
      document.querySelector('input[value="Brioche"]').checked = true;
      document.querySelector('input[value="Boi"]').checked = true;
    }
  });
}

// Obter nome amigável do método de pagamento
function getPaymentMethodName(paymentMethod) {
  const names = {
    pix: "PIX (5% de desconto)",
    debit: "Cartão de Débito",
    credit: "Cartão de Crédito",
    cash: "Dinheiro",
  };
  return names[paymentMethod] || paymentMethod;
}

// Inicializar a aplicação
document.addEventListener("DOMContentLoaded", function () {
  loadBurgers();
  setupPaymentMethods();
  submitOrder();

  // Selecionar opções padrão
  document.querySelector('input[value="Brioche"]').checked = true;
  document.querySelector('input[value="Boi"]').checked = true;
});
