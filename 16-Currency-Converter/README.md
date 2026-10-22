# Currency Converter

A modern, responsive, real-time currency converter web application built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

The Currency Converter provides instant currency exchange calculations across 11 major global currencies. It features a modern glassmorphism design, instant bidirectional swapping, LocalStorage rate caching, and a built-in offline fallback rate dictionary.

## ✨ Key Features

- **Real-Time Exchange Rates**: Automatically fetches live rates using open currency API endpoints without exposed private keys.
- **Offline & Fallback Support**: Contains a local rate dictionary (`currencies.js`) and caches recent rates in `localStorage` so conversions work without internet connectivity.
- **Currency Swap**: One-click bidirectional swap button (`⇄`) with smooth transition animations.
- **Extended Currency Support**:
  - 🇺🇸 USD (United States Dollar)
  - 🇪🇺 EUR (Euro)
  - 🇬🇧 GBP (British Pound)
  - 🇮🇳 INR (Indian Rupee)
  - 🇯🇵 JPY (Japanese Yen)
  - 🇨🇦 CAD (Canadian Dollar)
  - 🇦🇺 AUD (Australian Dollar)
  - 🇨🇭 CHF (Swiss Franc)
  - 🇨🇳 CNY (Chinese Yuan)
  - 🇸🇬 SGD (Singapore Dollar)
  - 🇦🇪 AED (UAE Dirham)
- **Glassmorphism UI**: High-contrast, responsive card design with accessible focus rings and mobile adaptation.
- **Validation & Error Handling**: Gracefully handles non-numeric inputs, negative numbers, and network errors.

## 📁 Project Structure

```text
16-Currency-Converter/
├── index.html       # Semantic HTML5 layout with accessible ARIA tags
├── app.js          # Core conversion logic, caching, and DOM bindings
├── currencies.js   # Offline fallback rates and currency metadata
├── style.css       # Modern glassmorphism CSS design with responsive rules
└── README.md       # Project documentation
```

## 🚀 Getting Started

1. Open `index.html` in any modern web browser.
2. Select your source currency and target currency.
3. Type the amount you wish to convert in the source input field.
4. Click the swap button (`⇄`) to invert the source and target currencies instantly.

## 🔒 Security & Privacy

- No third-party API private keys are committed or exposed in client-side code.
- Uses public open endpoints with graceful fallback to local dictionaries.