/**
 * Funny-Friends — App Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
  initializePrices();
  initCartDrawer();
  initVolumeToggles();
  initWishlist();
  initSearch();
  initSorting();
  initCurrencySelector();
});

function initCartDrawer() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const openBtns = document.querySelectorAll('[data-cart-open]');
  const closeBtns = document.querySelectorAll('[data-cart-close]');

  if (!overlay || !drawer) return;

  const open = () => {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtns.forEach(btn => btn.addEventListener('click', close));
  overlay.addEventListener('click', close);

  // Видалення товарів з кошика
  drawer.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      if (cartItem) {
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(20px)';
        setTimeout(() => {
          cartItem.remove();
          updateCartTotal();
        }, 300);
      }
    });
  });
}

function updateCartTotal() {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;
  let currencySymbol = '₴';

  cartItems.forEach(item => {
    const priceText = item.querySelector('.cart-item__price')?.textContent;
    if (priceText) {
      const price = parseInt(priceText.replace(/\D/g, ''));
      total += price;
      // Extract currency symbol from first item
      if (priceText.includes('$')) currencySymbol = '$';
      else if (priceText.includes('€')) currencySymbol = '€';
    }
  });

  const totalRow = document.querySelector('.cart-drawer__total-row--final span:last-child');
  if (totalRow) {
    totalRow.textContent = total.toLocaleString('uk-UA') + ' ' + currencySymbol;
  }
}

// Shared data for volume prices and currency conversion
const basePrices = {
  'Nocturne Oud': { '30': 4200, '50': 6800, '100': 11200 },
  'Velvet Rose': { '30': 3500, '50': 5400, '100': 8900 },
  'Azure Bergamot': { '30': 3100, '50': 4800, '100': 7800 },
  'Midnight Peony': { '30': 3900, '50': 6200, '100': 10200 },
  'Forest Oak': { '30': 3700, '50': 5900, '100': 9700 },
  'Golden Saffron': { '30': 4500, '50': 7200, '100': 11800 }
};

// Initialize prices from HTML
function initializePrices() {
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-card__name')?.textContent;
    const priceEl = card.querySelector('.product-card__price');
    if (name && priceEl && basePrices[name]) {
      const activeBtn = card.querySelector('.volume-toggle__btn.active');
      const vol = activeBtn?.dataset.volume || '50';
      const price = basePrices[name][vol];
      if (price) {
        priceEl.dataset.originalPrice = price;
      }
    }
  });
}

const currencies = {
  'UAH': { symbol: '₴', rate: 1 },
  'USD': { symbol: '$', rate: 0.025 },
  'EUR': { symbol: '€', rate: 0.023 }
};

function initVolumeToggles() {
  document.querySelectorAll('.volume-toggle').forEach(toggle => {
    const card = toggle.closest('.product-card');
    const priceEl = card?.querySelector('.product-card__price');
    const productName = card?.querySelector('.product-card__name')?.textContent || '';

    // Store original prices for this product
    if (basePrices[productName]) {
      toggle.dataset.basePrices = JSON.stringify(basePrices[productName]);
    }

    toggle.querySelectorAll('.volume-toggle__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggle.querySelectorAll('.volume-toggle__btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const vol = btn.dataset.volume;
        const prices = basePrices[productName];
        if (priceEl && prices && prices[vol]) {
          // Get current currency from existing price
          const currentSymbol = priceEl.querySelector('.product-card__price-currency')?.textContent || '₴';
          const currencyRate = currentSymbol === '$' ? 0.025 : currentSymbol === '€' ? 0.023 : 1;
          const convertedPrice = Math.round(prices[vol] * currencyRate);
          priceEl.innerHTML = `${convertedPrice.toLocaleString('uk-UA')} <span class="product-card__price-currency">${currentSymbol}</span>`;
          // Update original price for currency conversion
          priceEl.dataset.originalPrice = prices[vol];
        }
      });
    });
  });
}

function initWishlist() {
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      btn.style.color = btn.classList.contains('active') ? 'var(--color-accent-gold)' : '';
    });
  });
}

function addToCart(productName) {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function initSearch() {
  const searchInput = document.querySelector('.header__search input');
  const productCards = document.querySelectorAll('.product-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();

    productCards.forEach(card => {
      const productName = card.querySelector('.product-card__name')?.textContent.toLowerCase() || '';
      const productCategory = card.querySelector('.product-card__category')?.textContent.toLowerCase() || '';

      const matchesSearch = productName.includes(searchTerm) || productCategory.includes(searchTerm);

      if (matchesSearch || searchTerm === '') {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function initSorting() {
  const sortSelects = document.querySelectorAll('.sort-select');

  sortSelects.forEach(sortSelect => {
    const productsGrid = sortSelect.closest('.section')?.querySelector('.products-grid');

    if (!productsGrid) return;

    sortSelect.addEventListener('change', function() {
      const sortBy = this.value;
      const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));

      productCards.sort((a, b) => {
        const priceA = extractPrice(a);
        const priceB = extractPrice(b);

        switch(sortBy) {
          case 'Ціна: від низької':
            return priceA - priceB;
          case 'Ціна: від високої':
            return priceB - priceA;
          case 'Новинки':
            return -1; // Reverse order for new items
          case 'За популярністю':
          default:
            return 0;
        }
      });

      productCards.forEach(card => productsGrid.appendChild(card));
    });
  });
}

function extractPrice(card) {
  const priceText = card.querySelector('.product-card__price')?.textContent || '0';
  return parseInt(priceText.replace(/\D/g, '')) || 0;
}

function initCurrencySelector() {
  const currencyBtn = document.querySelector('.header__currency');
  if (!currencyBtn) return;

  let currentCurrency = 'UAH';
  const currencyCodes = Object.keys(currencies);
  let currentIndex = 0;

  // Store original UAH prices on page load
  document.querySelectorAll('.product-card__price').forEach(priceEl => {
    const originalPrice = parseInt(priceEl.textContent.replace(/[^\d]/g, '')) || 0;
    if (!priceEl.dataset.originalPrice) {
      priceEl.dataset.originalPrice = originalPrice;
    }
  });

  document.querySelectorAll('.cart-item__price').forEach(priceEl => {
    const originalPrice = parseInt(priceEl.textContent.replace(/[^\d]/g, '')) || 0;
    if (!priceEl.dataset.originalPrice) {
      priceEl.dataset.originalPrice = originalPrice;
    }
  });

  currencyBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % currencyCodes.length;
    currentCurrency = currencyCodes[currentIndex];
    const currency = currencies[currentCurrency];

    this.textContent = `${currentCurrency} ▾`;

    // Update all prices on the page
    document.querySelectorAll('.product-card__price').forEach(priceEl => {
      const card = priceEl.closest('.product-card');
      const productName = card?.querySelector('.product-card__name')?.textContent || '';
      const prices = basePrices[productName];

      if (prices) {
        const toggle = card.querySelector('.volume-toggle');
        const activeBtn = toggle?.querySelector('.volume-toggle__btn.active');
        const vol = activeBtn?.dataset.volume || '50';
        const basePrice = prices[vol] || parseInt(priceEl.dataset.originalPrice) || 0;
        const convertedPrice = Math.round(basePrice * currency.rate);
        priceEl.innerHTML = `${convertedPrice.toLocaleString('uk-UA')} <span class="product-card__price-currency">${currency.symbol}</span>`;
        priceEl.dataset.originalPrice = basePrice;
      } else {
        const originalPrice = parseInt(priceEl.dataset.originalPrice) || 0;
        const convertedPrice = Math.round(originalPrice * currency.rate);
        priceEl.innerHTML = `${convertedPrice.toLocaleString('uk-UA')} <span class="product-card__price-currency">${currency.symbol}</span>`;
      }
    });

    // Update cart prices
    document.querySelectorAll('.cart-item__price').forEach(priceEl => {
      const originalPrice = parseInt(priceEl.dataset.originalPrice) || 0;
      const convertedPrice = Math.round(originalPrice * currency.rate);
      priceEl.textContent = `${convertedPrice.toLocaleString('uk-UA')} ${currency.symbol}`;
    });

    // Update cart total
    updateCartTotal();
  });
}