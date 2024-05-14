document.addEventListener('DOMContentLoaded', function () {
    const botaoAtivar = document.getElementById('botaoAtivar');
  
    botaoAtivar.classList.add('ativar');
  
    botaoAtivar.addEventListener('click', function () {
      if (botaoAtivar.innerText === 'ATIVAR') {
        botaoAtivar.innerText = 'DESATIVAR';
        botaoAtivar.classList.remove('ativar');
        botaoAtivar.classList.add('desativar');
  
        Swal.fire({
          icon: 'success',
          background: '#dff0d8',
          timer: 1350,
          showConfirmButton: false,
          customClass: {
            popup: 'swal2-popup-custom',
            title: 'swal2-title'
          }
        });
  
        chrome.runtime.sendMessage({ action: "startTimer" });
        console.log("Botão ATIVAR clicado, timer iniciado");
  
      } else {
        botaoAtivar.innerText = 'ATIVAR';
        botaoAtivar.classList.remove('desativar');
        botaoAtivar.classList.add('ativar');
  
        chrome.runtime.sendMessage({ action: "stopTimer" });
        console.log("Botão DESATIVAR clicado, timer parado");
      }
    });
  });
  