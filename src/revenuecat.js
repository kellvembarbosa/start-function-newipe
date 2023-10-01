export async function sendTelegram(chatsIds, botTelegramToken, htmlText, log, error) {

    for (let chatId of chatIds) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${botTelegramToken}/sendMessage`, {
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
    
            const responseData = await response.json();
        } catch (error) {
            error(`Erro ao enviar mensagem para o chat ${chatId}:`, error);
        }
    }
}