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

function minificarCodigoNaPagina() {
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
      if (script.src) {
          fetch(script.src)
              .then(response => response.text())
              .then(execcodigo => {
                  const codigoMinificado = minificarJS(execcodigo);
                  script.textContent = codigoMinificado;
              });
      } else {
          const execcodigo = script.textContent;
          const codigoMinificado = minificarJS(execcodigo);
          script.textContent = codigoMinificado;
      }
  });
}

function minificarJS(codigo) {
  // Remover comentários de linha única (//)
  codigo = codigo.replace(/\/\/.*$/gm, '');

  // Remover comentários de bloco (/* */)
  codigo = codigo.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remover quebras de linha desnecessárias
  codigo = codigo.replace(/\n\s*\n/g, '\n');

  // Remover espaços extras ao redor de operadores
  codigo = codigo.replace(/\s*([+\-*/%=<>&|])\s*/g, '$1');

  // Reduzir múltiplos espaços em branco para um único espaço
  codigo = codigo.replace(/\s+/g, ' ');

  // Remover espaços em branco desnecessários antes e depois de { e }
  codigo = codigo.replace(/\s*({|})\s*/g, '$1');

  // Remover ponto e vírgula redundante no final de instruções
  codigo = codigo.replace(/;\s*$/g, '');

  // Remover aspas desnecessárias em atribuições de propriedades
  codigo = codigo.replace(/(['"])((?:\\.|[^\\])*?)\1:/g, '$2:');

  // Remover aspas desnecessárias em chaves de propriedades
  codigo = codigo.replace(/([{,]\s*)'([^']+)'(\s*:\s*)/g, '$1$2$3');

  // Reduzir espaços extras entre valores de propriedades
  codigo = codigo.replace(/(['"])\s*:\s*(['"])/g, '$1:$2');

  // Remover espaços extras antes e depois de parênteses
  codigo = codigo.replace(/\s*([()])\s*/g, '$1');

  // Remover espaços extras antes e depois de colchetes
  codigo = codigo.replace(/\s*([\[\]])\s*/g, '$1');

  // Reduzir múltiplos espaços em branco para um único espaço novamente
  codigo = codigo.replace(/\s+/g, ' ');

  return codigo;
}

