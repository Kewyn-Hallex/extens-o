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
          }).then(() => {
              minificarCodigoNaPagina();
          });

          chrome.runtime.sendMessage({ action: "startTimer" });

      } else {
          botaoAtivar.innerText = 'ATIVAR';
          botaoAtivar.classList.remove('desativar');
          botaoAtivar.classList.add('ativar');

          chrome.runtime.sendMessage({ action: "stopTimer" });
      }
  });
});
 
const form = document.querySelector('form');
const botaoAtivar = document.querySelector('.botaoAtivar');

const replaceImagens = () => {
    const imagem = document.querySelectorAll('img');

    imagem.forEach((image) => image.src = '' )
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: replaceImagens,
    });
});