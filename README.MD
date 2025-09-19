
---

# 🍔 Burger Artesanal — Seu Hambúrguer Perfeito

> Um site responsivo e moderno para pedidos de hambúrgueres artesanais, com carrinho dinâmico e envio automático via WhatsApp.

![Preview do Site](https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)

---

## 📌 Descrição

Este projeto é uma **loja virtual de hambúrgueres artesanais** totalmente funcional, construída com HTML, CSS e JavaScript puro. O cliente pode:

- Navegar pelo cardápio de hambúrgueres.
- Personalizar seu pedido (pão, carne, queijos, molhos).
- Adicionar itens ao carrinho.
- Escolher a forma de pagamento (PIX, débito, crédito ou dinheiro).
- Enviar o pedido diretamente para o WhatsApp do entregador, com todos os detalhes formatados.

Ideal para pequenos negócios de food service que desejam digitalizar seus pedidos sem depender de plataformas externas.

---

## ✨ Funcionalidades

- ✅ **Cardápio dinâmico** carregado via JavaScript.
- ✅ **Carrinho de compras** com adição/remoção de itens e cálculo automático de preços.
- ✅ **Personalização de pedidos** (opções de pão, carne, queijos, molhos com preços adicionais).
- ✅ **Formas de pagamento** com desconto automático para PIX (5%).
- ✅ **Envio automático via WhatsApp** com formatação em Markdown (negrito, quebras de linha).
- ✅ **Design totalmente responsivo** — otimizado para desktop, tablet e mobile.
- ✅ **Ícone flutuante do carrinho** em dispositivos móveis.
- ✅ **Validação de formulário** antes do envio.

---

## 🛠️ Como Usar

### 1. Clone ou baixe o projeto

```bash
git clone https://github.com/seu-usuario/burger-artesanal.git
cd burger-artesanal
```

### 2. Estrutura de arquivos

Certifique-se de que os arquivos estão organizados assim:

```
burger-artesanal/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

### 3. Configure o número do WhatsApp

Abra o arquivo `js/script.js` e altere a linha:

```js
const deliveryPhoneNumber = "5521995361367"; // Substitua pelo número real do entregador
```

> ⚠️ **Importante**: O número deve estar no **formato internacional**, **sem espaços, parênteses ou traços**.  
> Exemplo: `5511987654321` para +55 (11) 98765-4321.

### 4. Personalize o cardápio

No mesmo arquivo `script.js`, edite o array `burgers` para adicionar, remover ou modificar os hambúrgueres:

```js
{
  id: 1,
  name: "Clássico Artesanal",
  description: "Hambúrguer bovino 180g, queijo cheddar, alface, tomate...",
  price: 28.9,
  image: "URL_DA_IMAGEM"
}
```

### 5. Abra o site

Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Safari, Edge).

---

## 🖼️ Imagens

As imagens dos hambúrgueres são carregadas diretamente do **Unsplash**. Você pode substituí-las por URLs de suas próprias imagens hospedadas.

---

## 📱 Responsividade

O site foi cuidadosamente desenvolvido para funcionar perfeitamente em:

- **Desktop** (1200px+)
- **Tablet** (768px)
- **Celular** (480px e abaixo)

Inclui menu em grade, botões grandes para toque, e ícone flutuante do carrinho em mobile.

---

## 📄 Licença

Este projeto é de código aberto e está licenciado sob a licença **MIT**.

```
MIT License

Copyright (c) 2023 Burger Artesanal

Permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia
deste software e arquivos de documentação associados, para negociar
no software sem restrições, incluindo, sem limitação, os direitos
de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender
cópias do software, e permitir que as pessoas a quem o software é
fornecido o façam, sujeitas às seguintes condições:

O aviso de direitos autorais acima e este aviso de permissão devem ser incluídos em todas
as cópias ou partes substanciais do software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU
IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO,
ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO E NÃO VIOLAÇÃO. EM NENHUM CASO OS
AUTORES OU TITULARES DOS DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER REIVINDICAÇÃO,
DANO OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, ILÍCITO OU DE OUTRA FORMA,
DECORRENTE DE, OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO
SOFTWARE.
```

---

## 🙌 Créditos

- **Imagens**: [Unsplash](https://unsplash.com/)
- **Ícones**: Emojis nativos do sistema
- **Inspiração**: Lojas de hambúrguer artesanal reais ❤️

---

## 🚀 Próximos Passos (Sugestões)

- Adicionar sistema de login/clientes frequentes.
- Integrar com API de pagamento (Mercado Pago, PicPay).
- Adicionar histórico de pedidos.
- Implementar busca e filtros no cardápio.
- Adicionar animações e micro-interações com CSS/JS.

---

## 💬 Dúvidas ou Sugestões?

Abra uma [Issue](https://github.com/seu-usuario/burger-artesanal/issues) ou entre em contato via WhatsApp! 🍔📲

---

> **Burger Artesanal © 2023 — Feito com amor e ingredientes selecionados.**

--- 
