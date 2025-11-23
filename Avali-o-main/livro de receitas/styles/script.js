document.addEventListener('DOMContentLoaded', () => { // Aguarda o carregamento completo do DOM antes de executar
  const cards = Array.from(document.querySelectorAll('.card')); // Seleciona todos os elementos .card e converte em array
  const display = document.getElementById('recipeDisplay'); // Elemento que contém a área de exibição da receita
  const recipeTitle = document.getElementById('recipeTitle'); // Elemento onde o título será inserido
  const recipeContent = document.getElementById('recipeContent'); // Elemento onde o conteúdo da receita será inserido
  const surpriseBtn = document.getElementById('surprise'); // Botão que ativa a seleção aleatória

  async function loadRecipe(filePath){ // Função assíncrona que busca o arquivo .txt da receita
    try {
      const res = await fetch(filePath); // Faz requisição usando fetch para obter o arquivo
      if(!res.ok) throw new Error('Arquivo não encontrado'); // Lança erro se a resposta não for OK
      const text = await res.text(); // Lê o corpo da resposta como texto
      return text; // Retorna o texto da receita
    } catch (e) {
      return 'Erro ao carregar a receita.'; // Em caso de erro retorna mensagem amigável
    }
  }

  function renderText(raw){ // Função que transforma o texto cru em HTML minimamente formatado
    // simples formatação: separa por quebras de linha duplas em parágrafos
    const html = raw
      .split(/\r?\n\r?\n/) // Separa blocos por linhas em branco (parágrafos)
      .map(p => `<p>${p.replace(/\r?\n/g, '<br>')}</p>`) // Para cada bloco substitui quebras de linha por <br> e envolve em <p>
      .join(''); // Junta tudo em uma string única
    return html; // Retorna o HTML gerado
  }

  async function showRecipe(card){ // Função que exibe a receita associada a um cartão
    const file = card.dataset.file; // Lê o caminho do arquivo a partir do atributo data-file do cartão
    const title = card.dataset.title || 'Receita'; // Lê o título (data-title) ou usa 'Receita' como fallback
    recipeTitle.textContent = title; // Define o texto do título na área de exibição
    recipeContent.innerHTML = '<p class="small">Carregando...</p>'; // Mostra mensagem de carregando enquanto busca o arquivo
    const raw = await loadRecipe(file); // Carrega o conteúdo do arquivo
    recipeContent.innerHTML = renderText(raw); // Converte o texto em HTML e insere no container
    display.scrollIntoView({behavior:'smooth', block:'center'}); // Rola suavemente até a área de exibição
  }

  cards.forEach(card => { // Para cada cartão
    card.querySelector('.btn-open').addEventListener('click', () => showRecipe(card)); // Adiciona listener ao botão para abrir a receita correspondente
  });

  function pickRandom(){ // Função que escolhe um cartão aleatório
    const idx = Math.floor(Math.random() * cards.length); // Calcula índice aleatório baseado no tamanho do array
    return cards[idx]; // Retorna o cartão selecionado
  }

  surpriseBtn.addEventListener('click', () => { // Ao clicar no botão surpresa
    const card = pickRandom(); // Seleciona um cartão aleatório
    showRecipe(card); // Mostra a receita desse cartão
  });
}); // Fim