function botaoAtivar() {
  var codigoOriginal = document.getElementById('codigo').value;
  var codigoMinificado = minificarJS(codigoOriginal);
  document.getElementById('codigoMinificado').value = codigoMinificado;
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