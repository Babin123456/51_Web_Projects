// Curated Quotes by Dr. A.P.J. Abdul Kalam
const KALAM_QUOTES = [
    {
        quote: "Dream is not that which you see while sleeping it is something that does not let you sleep.",
        context: "Wings of Fire"
    },
    {
        quote: "You have to dream before your dreams can come true.",
        context: "Address to Students"
    },
    {
        quote: "If you want to shine like a sun, first burn like a sun.",
        context: "Inspiring Thoughts"
    },
    {
        quote: "Failure will never overtake me if my determination to succeed is strong enough.",
        context: "Presidential Address"
    },
    {
        quote: "All of us do not have equal talent. But, all of us have an equal opportunity to develop our talents.",
        context: "Ignited Minds"
    },
    {
        quote: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.",
        context: "Convocation Speech"
    },
    {
        quote: "To succeed in your mission, you must have single-minded devotion to your goal.",
        context: "Wings of Fire"
    }
];

let currentQuoteIndex = 0;

function displayQuote(index) {
    const quoteTextEl = document.getElementById("quote-text");
    const quoteContextEl = document.getElementById("quote-context");
    if (!quoteTextEl || !quoteContextEl) return;

    const item = KALAM_QUOTES[index];
    quoteTextEl.textContent = `"${item.quote}"`;
    quoteContextEl.textContent = `— Dr. A.P.J. Abdul Kalam (${item.context})`;
}

function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % KALAM_QUOTES.length;
    displayQuote(currentQuoteIndex);
}

function copyQuote() {
    const item = KALAM_QUOTES[currentQuoteIndex];
    const textToCopy = `"${item.quote}" — Dr. A.P.J. Abdul Kalam`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyBtn = document.getElementById("btn-copy-quote");
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copied! ✓";
            setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
        }
    }).catch(err => {
        console.warn("Clipboard copy failed:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayQuote(0);
    const nextBtn = document.getElementById("btn-next-quote");
    const copyBtn = document.getElementById("btn-copy-quote");

    if (nextBtn) nextBtn.addEventListener("click", nextQuote);
    if (copyBtn) copyBtn.addEventListener("click", copyQuote);
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { KALAM_QUOTES, displayQuote, nextQuote };
}
