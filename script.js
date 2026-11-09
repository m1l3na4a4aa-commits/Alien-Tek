// Lógica do Carrinho de Compras Intergaláctico
let cart = [];

const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// Abrir e Fechar Modal do Carrinho
cartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Adicionar Item ao Carrinho
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();

    // Toast simples de notificação
    showToast(`"${name}" foi adicionado ao seu carrinho espacial! 🚀`);
}

// Remover Item do Carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Atualizar Interface do Carrinho
function updateCart() {
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-slate-500 text-sm text-center py-8">Seu carrinho espacial está vazio.</p>`;
        cartTotal.innerText = `0 $G`;
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center bg-[#130724] p-3 rounded-xl border border-slate-800';
        div.innerHTML = `
            <div>
                <h5 class="font-bold text-sm text-white">${item.name}</h5>
                <span class="text-xs text-[#00ff88] font-mono">${item.price} $G</span>
            </div>
            <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-300 p-1">
                <i class="ph ph-trash text-lg"></i>
            </button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.innerText = `${total.toLocaleString()} $G`;
}

// Finalizar Compra
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("🛸 Pedido teleportado com sucesso! Os aliens e produtos chegarão ao seu endereço estelar em instantes.");
    cart = [];
    updateCart();
    cartModal.classList.add('hidden');
}

// Toast de Notificação
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-[#00ff88] text-black font-bold px-4 py-3 rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.6)] z-50 transition-all duration-500 transform translate-y-10 opacity-0 flex items-center gap-2';
    toast.innerHTML = `<i class="ph ph-check-circle text-xl"></i> ${message}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}