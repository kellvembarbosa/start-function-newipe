import { getCountryName, getType } from './utils.js';

export async function sendRevTelegram(chatIds, telegramToken, htmlText, log, error) {

    for (let chatId of chatIds) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: htmlText,
                    parse_mode: 'HTML'
                })
            });
    
            if (!response.ok) {
                log(`Erro ao enviar mensagem para o chat ${chatId}`)
                throw new Error(`Erro ao enviar mensagem para o chat ${chatId}`);
            }

            log(`===> Mensagem enviada para o chat ${chatId}`);
        } catch (err) {
            error(`Erro ao enviar mensagem para o chat ${chatId}:`, err);
        }
    }
}

export function revenueCatInfos(req, revInfos) {
    const { revCatProjectId, htmlText, name, botName, defaultCurrency } = revInfos;
    let type = getType(req.body.event.type);

    return {
        type: type.typeShort,
        typeMessage: type.typeMessage,
        typeEmoji: type.typeEmoji,
        environment: req.body.event.environment,
        appUserId: req.body.event.app_user_id,
        productId: req.body.event.product_id,
        countryCode: req.body.event.country_code,
        countryName: getCountryName(req.body.event.country_code),
        storeCountry: req.body.event.store,
        taxPercentage: getTaxPercentage(req.body.event.tax_percentage),
        botLink: `https://app.revenuecat.com/customers/${revCatProjectId}/${req.body.event.app_user_id}`,
        revCatProjectId: revCatProjectId,
        appName: name,
        botName: botName,
        defaultCurrency: defaultCurrency,
    };
}

// Função para substituir as variáveis no HTML
// Exemplo: replaceVariables("Olá {{name}}, tudo bem?", {name: "João"});
export function revReplaceVariables(htmlText, variables) {
    let text = htmlText;
    for (const key in variables) {
        const value = variables[key];
        text = text.replace(`{{${key}}}`, value);
    }

    return text;
}


// Função para obter porcentagem da taxa do país
// Exemplo: getTaxPercentage("0.1");
export function getTaxPercentage(taxPercentage) {
    return `${parseFloat(taxPercentage) * 100}%`;
}