(function () {
    const STORAGE_KEY = "cart";
    let cart = [];

    function readCart() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Erro lendo carrinho:", e);
            return [];
        }
    }

    function writeCart() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error("Erro salvando carrinho:", e);
        }
    }

    // 🛒 Função chamada nos botões das páginas
    window.addToCart = function (name, price, img) {
        cart = readCart();

        if (!name || typeof price !== "number") return;

        const existing = cart.find(i => i.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({
                name,
                price,
                qty: 1,
                img: img || "placeholder.jpg"
            });
        }

        writeCart();
        updateCartDisplay();
    };

    // 🔄 Atualiza os valores do carrinho em QUALQUER página
    function updateCartDisplay() {
        cart = readCart();

        const totalQty = cart.reduce((s, i) => s + i.qty, 0);
        const totalValue = cart.reduce((s, i) => s + i.qty * i.price, 0);

        // Estes elementos só existem no cart.html
        const countEl = document.getElementById("cart-count");
        const totalEl = document.getElementById("cart-total");

        if (countEl) countEl.textContent = totalQty;
        if (totalEl) totalEl.textContent = totalValue.toFixed(2);

        // 🔔 Atualiza o número no botão fixo "Ver Carrinho" se existir
        const fixedButton = document.querySelector(".cart-btn-fixed");
        if (fixedButton) {
            fixedButton.textContent = `🛒 Ver Carrinho (${totalQty})`;
        }
    }

    updateCartDisplay();
})();
