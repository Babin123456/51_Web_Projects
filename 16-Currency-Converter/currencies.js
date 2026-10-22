// Offline fallback exchange rates (base: USD) and currency metadata
const CURRENCY_DATA = {
    USD: { name: "United States Dollar", symbol: "$", flag: "🇺🇸", rate: 1.0 },
    EUR: { name: "Euro", symbol: "€", flag: "🇪🇺", rate: 0.92 },
    GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧", rate: 0.79 },
    INR: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rate: 86.5 },
    JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", rate: 154.2 },
    CAD: { name: "Canadian Dollar", symbol: "CA$", flag: "🇨🇦", rate: 1.38 },
    AUD: { name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", rate: 1.52 },
    CHF: { name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭", rate: 0.88 },
    CNY: { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", rate: 7.23 },
    SGD: { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", rate: 1.34 },
    AED: { name: "UAE Dirham", symbol: "AED", flag: "🇦🇪", rate: 3.67 }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CURRENCY_DATA };
}
