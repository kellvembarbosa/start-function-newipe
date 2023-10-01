

// Função para obter o ambiente
// Exemplo: isEnvMod("SANDBOX");
export function isEnvMod(envMod) {
    if (envMod == "SANDBOX") {
        return true;
    } else {
        return false;
    }
}

// Função para obter o nome do país
// Exemplo: getCountryName("US");
export function getCountryName(countryCode) {
    const countryMapping = {
        'US': 'United States',
        'NL': 'Netherlands',
        'CA': 'Canada',
        'GB': 'United Kingdom',
        'AU': 'Australia',
        'FR': 'France',
        'DE': 'Germany',
        'JP': 'Japan',
        'BR': 'Brazil',
        'MX': 'Mexico',
        'IT': 'Italy',
        'ES': 'Spain',
        'SE': 'Sweden',
        'NO': 'Norway',
        'DK': 'Denmark',
        'FI': 'Finland',
        'CN': 'China',
        'IN': 'India',
        'RU': 'Russia',
        'SA': 'Saudi Arabia',
        'ZA': 'South Africa',
        'NZ': 'New Zealand',
        'KR': 'South Korea',
        // Você pode continuar adicionando outros códigos de países conforme necessário
    };
    return countryMapping[countryCode] || countryCode;
}


// Função para obter o nome do tipo de evento
// Exemplo: getType("INITIAL_PURCHASE");
export function getType(type) {
    const typeMapping = {
        UNCANCELLATION: {
            typeMessage: "Reactivated on APP",
            type: "Reactivated",
            typeEmoji: "🔄"
        },
        CANCELLATION: {
            typeMessage: "Cancelamento on APP",
            type: "Canceled",
            typeEmoji: "❌ 😢 💔"
        },
        RENEWAL: {
            typeMessage: "Renew on APP",
            type: "Renew",
            typeEmoji: "🔄"
        },
        INITIAL_PURCHASE: {
            typeMessage: "Initial purchase on APP",
            type: "Initial purchase",
            typeEmoji: "🎉"
        },
        SUBSCRIPTION_PAUSED: {
            typeMessage: "Subscription Paused on the APP",
            type: "Subscription Paused",
            typeEmoji: "⏸"
        },
        BILLING_ISSUE: {
            typeMessage: "Billing Problem on the APP",
            type: "Billing Problem",
            typeEmoji: "⚠️"
        },
        EXPIRATION: {
            typeMessage: "Subscription Expiration in APP",
            type: "Subscription Expiration",
            typeEmoji: "⏳ 😢"
        },
        NON_RENEWING_PURCHASE: {
            typeMessage: "Non-Renewable Purchase in the APP",
            type: "Non-Renewable Purchase",
            typeEmoji: "💰"
        }
    };

    const typeData = typeMapping[type] || {
        typeMessage: "Event on APP",
        type: "Unidentified type",
        typeEmoji: "🔍"
    };

    return typeData;
}

// Função para obter porcentagem da taxa do país
// Exemplo: getTaxPercentage("0.1");
export function getTaxPercentage(taxPercentage) {
    const taxPercentage = parseFloat(taxPercentage) * 100;
    return `${taxPercentage}%`;
}

// Função para substituir as variáveis no HTML
// Exemplo: replaceVariables("Olá {{name}}, tudo bem?", {name: "João"});
export function replaceVariables(htmlText, variables) {
    let text = htmlText;
    for (const key in variables) {
        const value = variables[key];
        text = text.replace(`{{${key}}}`, value);
    }
    return text;
}