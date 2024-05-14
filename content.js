let timerId;

let inactivityTime = function () {
  let timeout = 5000;

  function resetTimer() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log("Inatividade detectada, enviando mensagem para iniciar o temporizador");
      chrome.runtime.sendMessage({ action: "startTimer" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Erro ao enviar mensagem:", chrome.runtime.lastError);
        } else {
          console.log("Mensagem enviada com sucesso:", response);
        }
      });
    }, timeout);
  }

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  document.onclick = resetTimer;
  document.onscroll = resetTimer;

  resetTimer();
};

inactivityTime();
