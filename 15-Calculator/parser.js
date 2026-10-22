// Safe Mathematical Expression Parser using Shunting-Yard Algorithm
// Replaces unsafe eval() with a secure tokenized math evaluator

const SafeParser = {
    tokenize(expr) {
        const tokens = [];
        let i = 0;
        const s = expr.replace(/\s+/g, "");

        while (i < s.length) {
            const ch = s[i];

            // Numbers (including decimals)
            if (/[\d.]/.test(ch)) {
                let numStr = "";
                let dotCount = 0;
                while (i < s.length && /[\d.]/.test(s[i])) {
                    if (s[i] === ".") {
                        dotCount++;
                        if (dotCount > 1) throw new Error("Invalid decimal number");
                    }
                    numStr += s[i];
                    i++;
                }
                tokens.push({ type: "NUMBER", value: parseFloat(numStr) });
                continue;
            }

            // Unary minus vs binary subtraction
            if (ch === "-") {
                const prev = tokens[tokens.length - 1];
                if (!prev || prev.type === "OPERATOR" || prev.type === "LPAREN") {
                    // Unary minus
                    tokens.push({ type: "OPERATOR", value: "neg", precedence: 4, assoc: "right" });
                    i++;
                    continue;
                }
            }

            // Operators
            if (["+", "-", "*", "/", "%", "^"].includes(ch)) {
                let prec = 1;
                let assoc = "left";
                if (ch === "*" || ch === "/" || ch === "%") prec = 2;
                if (ch === "^") { prec = 3; assoc = "right"; }
                tokens.push({ type: "OPERATOR", value: ch, precedence: prec, assoc });
                i++;
                continue;
            }

            // Parentheses
            if (ch === "(") {
                tokens.push({ type: "LPAREN", value: "(" });
                i++;
                continue;
            }
            if (ch === ")") {
                tokens.push({ type: "RPAREN", value: ")" });
                i++;
                continue;
            }

            // Math functions (e.g. sqrt)
            if (s.slice(i, i + 4) === "sqrt") {
                tokens.push({ type: "FUNCTION", value: "sqrt" });
                i += 4;
                continue;
            }

            throw new Error(`Unexpected character: ${ch}`);
        }

        return tokens;
    },

    toRPN(tokens) {
        const outputQueue = [];
        const operatorStack = [];

        for (const token of tokens) {
            if (token.type === "NUMBER") {
                outputQueue.push(token);
            } else if (token.type === "FUNCTION") {
                operatorStack.push(token);
            } else if (token.type === "OPERATOR") {
                while (operatorStack.length > 0) {
                    const top = operatorStack[operatorStack.length - 1];
                    if (
                        top.type === "OPERATOR" &&
                        ((token.assoc === "left" && token.precedence <= top.precedence) ||
                         (token.assoc === "right" && token.precedence < top.precedence))
                    ) {
                        outputQueue.push(operatorStack.pop());
                    } else if (top.type === "FUNCTION") {
                        outputQueue.push(operatorStack.pop());
                    } else {
                        break;
                    }
                }
                operatorStack.push(token);
            } else if (token.type === "LPAREN") {
                operatorStack.push(token);
            } else if (token.type === "RPAREN") {
                let foundLeft = false;
                while (operatorStack.length > 0) {
                    const top = operatorStack.pop();
                    if (top.type === "LPAREN") {
                        foundLeft = true;
                        break;
                    }
                    outputQueue.push(top);
                }
                if (!foundLeft) throw new Error("Mismatched parentheses");
                if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === "FUNCTION") {
                    outputQueue.push(operatorStack.pop());
                }
            }
        }

        while (operatorStack.length > 0) {
            const top = operatorStack.pop();
            if (top.type === "LPAREN" || top.type === "RPAREN") {
                throw new Error("Mismatched parentheses");
            }
            outputQueue.push(top);
        }

        return outputQueue;
    },

    evaluateRPN(rpn) {
        const stack = [];

        for (const token of rpn) {
            if (token.type === "NUMBER") {
                stack.push(token.value);
            } else if (token.type === "OPERATOR") {
                if (token.value === "neg") {
                    if (stack.length < 1) throw new Error("Invalid expression");
                    stack.push(-stack.pop());
                    continue;
                }

                if (stack.length < 2) throw new Error("Invalid operator usage");
                const b = stack.pop();
                const a = stack.pop();

                switch (token.value) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/":
                        if (b === 0) throw new Error("Cannot divide by zero");
                        stack.push(a / b);
                        break;
                    case "%": stack.push(a % b); break;
                    case "^": stack.push(Math.pow(a, b)); break;
                    default: throw new Error(`Unknown operator: ${token.value}`);
                }
            } else if (token.type === "FUNCTION") {
                if (token.value === "sqrt") {
                    if (stack.length < 1) throw new Error("Invalid sqrt expression");
                    const val = stack.pop();
                    if (val < 0) throw new Error("Invalid square root of negative");
                    stack.push(Math.sqrt(val));
                }
            }
        }

        if (stack.length !== 1) throw new Error("Malformed expression");
        const res = stack[0];
        if (!Number.isFinite(res)) throw new Error("Result is not finite");
        return res;
    },

    calculate(expression) {
        if (!expression || expression.trim() === "") return "";
        const tokens = this.tokenize(expression);
        const rpn = this.toRPN(tokens);
        return this.evaluateRPN(rpn);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SafeParser };
}
