# Dr. A.P.J. Abdul Kalam Tribute Website

A tribute web application honoring Dr. A.P.J. Abdul Kalam, the 11th President of India and the "Missile Man of India".

## 📋 Overview

This tribute website commemorates the life, vision, and legacy of Dr. A.P.J. Abdul Kalam. It resolves broken asset references, cleans up malformed and duplicated biography markup, and introduces an interactive inspirational quotes generator with clipboard copying and a career milestones timeline.

## ✨ Key Features

- **Asset Reference Resolution**: Corrected stylesheet link (`Tribute_Style.css` -> `style.css`) and portrait image path (`./image/apj.png` -> `./A._P._J._Abdul_Kalam.jpg.webp`).
- **Cleaned Biography Section**: Removed corrupt nested HTML (`Etern<ul>...</ul>al Quest`) and deduplicated repeated book references.
- **Interactive Quotes Generator**: Shuffles through inspiring thoughts and quotes by Dr. Kalam with a one-click clipboard copy feature.
- **Career Milestones Timeline**: Interactive filterable timeline categorizing key stages of Dr. Kalam's life (Early Life, DRDO & ISRO, Presidency, Legacy).
- **Responsive & Accessible Design**: Mobile-friendly card layout with elegant typography and high-contrast color scheme.

## 📁 Project Structure

```text
07-Tribute-Website/
├── index.html                           # Semantic tribute page layout
├── quotes.js                            # Interactive quotes data and shuffle/copy logic
├── timeline.js                          # Career milestones data and filtering
├── style.css                            # Modern responsive typography and timeline styling
├── A._P._J._Abdul_Kalam.jpg.webp        # Dr. Kalam portrait image
└── README.md                            # Project documentation
```

## 🚀 Getting Started

1. Open `index.html` in any web browser.
2. Click **Shuffle Quote** to browse inspiring thoughts or **Copy** to share them.
3. Use the timeline filter buttons to explore milestones across different life periods.
