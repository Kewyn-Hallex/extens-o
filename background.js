let timerId; 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Mensagem recebida no background.js:", request);
  try {
    if (request.action === "startTimer") {
      chrome.storage.local.set({ active: true }, () => {
        if (chrome.runtime.lastError) {
          console.error("Erro ao salvar no armazenamento:", chrome.runtime.lastError);
        } else {
          console.log("Timer iniciado");
          if (sender && sender.tab && sender.tab.id) {
            timerId = setTimeout(() => {
              chrome.tabs.remove(sender.tab.id, () => {
                if (chrome.runtime.lastError) {
                  console.error("Erro ao fechar a aba:", chrome.runtime.lastError);
                } else {
                  console.log("Aba fechada com sucesso");
                }
              });
            }, 5000);
          } else {
            console.error("Sender inválido ou ID da aba não encontrado");
          }
        }
      });
    } else if (request.action === "stopTimer") {
      clearTimeout(timerId); 
      chrome.storage.local.set({ active: false }, () => {
        if (chrome.runtime.lastError) {
          console.error("Erro ao salvar no armazenamento:", chrome.runtime.lastError);
        } else {
          console.log("Timer parado");
        }
      });
    }
  } catch (error) {
    console.error("Erro ao processar a mensagem:", error);
  }
});
