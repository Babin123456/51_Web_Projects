// Currency Converter Application Logic
const currencyFirst = document.getElementById("currency-first");
const worthFirst = document.getElementById("worth-first");
const currencySecond = document.getElementById("currency-second");
const worthSecond = document.getElementById("worth-second");
const exchangeRateText = document.getElementById("exchange-rate");
const statusMessage = document.getElementById("status-message");
const swapBtn = document.getElementById("swap-btn");
const lastUpdatedText = document.getElementById("last-updated");

const CACHE_KEY = "currency_converter_rates";
let ratesCache = {};

// Populate select options dynamically from CURRENCY_DATA
function populateCurrencyOptions() {
    if (typeof CURRENCY_DATA === "undefined") return;

    const currencies = Object.keys(CURRENCY_DATA);
    const firstSelected = currencyFirst.value || "USD";
    const secondSelected = currencySecond.value || "INR";

    currencyFirst.innerHTML = "";
    currencySecond.innerHTML = "";

    currencies.forEach(code => {
        const info = CURRENCY_DATA[code];
        const label = `${info.flag} ${code} - ${info.name}`;

        const opt1 = new Option(label, code, false, code === firstSelected);
        const opt2 = new Option(label, code, false, code === secondSelected);

        currencyFirst.add(opt1);
        currencySecond.add(opt2);
    });
}

// Compute exchange rate using cached rates or offline fallback
function getRate(from, to) {
    // Check if we have live or cached direct rates
    if (ratesCache[from] && ratesCache[from][to]) {
        return ratesCache[from][to];
    }

    // Fallback using offline USD baseline dictionary
    if (typeof CURRENCY_DATA !== "undefined" && CURRENCY_DATA[from] && CURRENCY_DATA[to]) {
        const usdToFrom = CURRENCY_DATA[from].rate;
        const usdToTarget = CURRENCY_DATA[to].rate;
        return usdToTarget / usdToFrom;
    }

    return 1;
}

// Fetch exchange rates from free open API with offline fallback
async function fetchExchangeRates(baseCurrency) {
    try {
        // Use free public endpoint without requiring exposed private keys
        const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
        if (!response.ok) throw new Error("Network response not ok");

        const data = await response.json();
        if (data && data.rates) {
            ratesCache[baseCurrency] = data.rates;
            localStorage.setItem(`${CACHE_KEY}_${baseCurrency}`, JSON.stringify({
                rates: data.rates,
                time: new Date().toLocaleTimeString()
            }));
            if (statusMessage) statusMessage.textContent = "";
            if (lastUpdatedText) lastUpdatedText.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
            return data.rates;
        }
    } catch (err) {
        console.warn("Live rate fetch failed, falling back to cache/offline rates:", err.message);
        
        // Try local cache
        const cached = localStorage.getItem(`${CACHE_KEY}_${baseCurrency}`);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                ratesCache[baseCurrency] = parsed.rates;
                if (statusMessage) statusMessage.textContent = "Using cached exchange rates.";
                if (lastUpdatedText) lastUpdatedText.textContent = `Cached: ${parsed.time || "Recent"}`;
                return parsed.rates;
            } catch (e) {
                // Ignore parse errors
            }
        }

        if (statusMessage) statusMessage.textContent = "Offline mode: using baseline rates.";
        if (lastUpdatedText) lastUpdatedText.textContent = "Offline Data";
    }

    return null;
}

// Update conversion result and rate display
async function updateConversion() {
    const from = currencyFirst.value;
    const to = currencySecond.value;
    const amount = parseFloat(worthFirst.value);

    if (isNaN(amount) || amount < 0) {
        worthSecond.value = "";
        exchangeRateText.textContent = "Please enter a valid positive number";
        return;
    }

    if (!ratesCache[from]) {
        await fetchExchangeRates(from);
    }

    const rate = getRate(from, to);
    const converted = (amount * rate).toFixed(2);
    worthSecond.value = converted;

    const fromSymbol = CURRENCY_DATA[from]?.symbol || from;
    const toSymbol = CURRENCY_DATA[to]?.symbol || to;
    exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to} (${toSymbol})`;
}

// Swap currencies
function swapCurrencies() {
    const temp = currencyFirst.value;
    currencyFirst.value = currencySecond.value;
    currencySecond.value = temp;

    swapBtn.classList.add("rotating");
    setTimeout(() => swapBtn.classList.remove("rotating"), 300);

    updateConversion();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    populateCurrencyOptions();
    updateConversion();

    currencyFirst.addEventListener("change", () => {
        ratesCache = {};
        updateConversion();
    });

    currencySecond.addEventListener("change", updateConversion);
    worthFirst.addEventListener("input", updateConversion);
    swapBtn.addEventListener("click", swapCurrencies);
});
