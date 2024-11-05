document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const cryptoPrices = document.getElementById('crypto-prices');

    async function getPrices(query = '') {
        let url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,litecoin&vs_currencies=usd';
        if (query) {
            url = `https://api.coingecko.com/api/v3/simple/price?ids=${query.toLowerCase()}&vs_currencies=usd`;
        }
        const response = await fetch(url);
        const data = await response.json();

        cryptoPrices.innerHTML = '';
        Object.keys(data).forEach(key => {
            const crypto = data[key];
            const cryptoItem = document.createElement('div');
            cryptoItem.className = 'crypto-item';
            cryptoItem.innerHTML = `
                <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>Price: $${crypto.usd}</p>
            `;
            cryptoPrices.appendChild(cryptoItem);
        });
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        getPrices(query);
    });

    getPrices();
});
