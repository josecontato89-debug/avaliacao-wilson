document.addEventListener('DOMContentLoaded', () => { // Executa o código quando o DOM estiver totalmente carregado
    const extra = { // Objeto com textos extras mapeados por título (usado nos cards "Saiba mais")
        'Elevador Lacerda': 'O elevador Lacerda trata-se do primeiro elevador urbano do mundo. Em 8 de dezembro de 1873, quando a primeira torre foi inaugurada, era o elevador mais alto do mundo, com 63 metros. A estrutura atual, de 1930, tem 72 metros de altura.[1] Faz o transporte de pessoas entre a Praça Cairu, na Cidade Baixa, e a Praça Tomé de Sousa, na Cidade Alta. É um dos principais pontos turísticos e cartão-postal da cidade. Do alto de suas torres, descortina-se a vista para a Baía de Todos-os-Santos, o Mercado Modelo e, ao fundo, o Forte de São Marcelo',
        'Moqueca Baiana': 'Sobre a muqueca importante saber que os tupis originários desta terra produziam um prato chamado pokeka, que em tupi significa “enrolado” e o forno onde cozinhavam se chamava “moquém”. Acrescente aí a tradição dos cozidos portugueses, a fartura de pescados, mariscos e crustáceos e o toque final, os temperos africanos, que acrescentaram a pimenta malagueta, o leite de coco e, principalmente, o azeite de dendê.',
        'Festa de Iemanjá': 'No dia 2 de fevereiro, e começa já de madrugada, na chamada Casa de Iemanjá, no Rio Vermelho. Ali as pessoas depositam todos os presentes que os pescadores levarão para alto mar no final do dia. É um momento de extrema importância e gratidão para o candomblé, e também um momento de festejar! Nessa festa você encontrará muita música, comidas locais, apresentações de capoeira e outros atrativos, em diversas ruas do bairro. Mas, atenção: antecipe-se para conseguir seu lugar na areia para entregar sua oferenda, pois o local fica disputado.'
    };

    // cards: expand/ocultar informação extra
    document.querySelectorAll('.card').forEach(card => { // Seleciona todos os elementos .card e itera sobre eles
        const btn = card.querySelector('button'); // Busca o botão interno do card
        const title = card.querySelector('.content h2')?.textContent?.trim() || ''; // Lê o título do card (h2) ou string vazia
        btn.setAttribute('aria-expanded', 'false'); // Define atributo ARIA para acessibilidade indicando que está recolhido

        btn.addEventListener('click', () => { // Adiciona o evento de clique no botão
            let info = card.querySelector('.extra-info'); // Procura se já existe o parágrafo com informação extra
            if (info) {
                // ocultar
                info.remove(); // Remove o elemento info (fecha)
                btn.setAttribute('aria-expanded', 'false'); // Atualiza ARIA para fechado
            } else {
                // criar e mostrar
                info = document.createElement('p'); // Cria um parágrafo novo
                info.className = 'extra-info'; // Define a classe para estilização
                info.textContent = extra[title] || 'Informação adicional não disponível.'; // Preenche com texto do objeto extra ou fallback
                card.querySelector('.content').appendChild(info); // Anexa o parágrafo dentro da área .content do card
                btn.setAttribute('aria-expanded', 'true'); // Atualiza ARIA para aberto
                info.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Rola suavemente para o elemento recém-criado
            }
        });
    });

    // curiosidades: preenche a caixa fixa (não remove automaticamente)
    const curiosities = [ // Array de strings com curiosidades utilizadas no botão aleatório
        'Salvador foi a primeira capital do Brasil colonial.',
        'A Bahia tem mais de 1.000 km de litoral com praias famosas como Morro de São Paulo.',
        'O axé nasceu em Salvador na década de 1980.',
        'A culinária baiana é famosa pelo uso de azeite de dendê e leite de coco.',
        'A Festa de Iemanjá no Rio Vermelho reúne milhares de pessoas todo 2 de fevereiro.'
    ];
    const randomBtn = document.getElementById('btn'); // Botão que dispara a curiosidade aleatória
    const curiosityBox = document.querySelector('.curiosity-box'); // Caixa onde a curiosidade será exibida
    if (randomBtn && curiosityBox) { // Verifica se os elementos existem antes de adicionar eventos
        randomBtn.addEventListener('click', () => { // Ao clicar no botão
            const text = curiosities[Math.floor(Math.random() * curiosities.length)]; // Seleciona um item aleatório do array
            curiosityBox.textContent = text; // Atualiza o texto da caixa de curiosidade
            curiosityBox.focus(); // Define foco na caixa (ajuda leitores de tela/mobile)
        });
    }

    // modal da galeria
    const modal = document.getElementById('imageModal'); // Elemento do modal
    const modalImg = document.getElementById('modalImg'); // Imagem exibida no modal
    const modalCaption = document.getElementById('modalCaption'); // Legenda do modal
    const modalClose = document.getElementById('modalClose'); // Botão de fechar do modal
    const modalBackdrop = document.getElementById('modalBackdrop'); // Backdrop (fundo escuro) do modal

    document.querySelectorAll('.gallery-item img').forEach(img => { // Seleciona todas as imagens da galeria e itera
        img.style.cursor = 'zoom-in'; // Ajusta cursor para indicar ação de zoom
        img.addEventListener('click', () => { // Ao clicar na imagem da galeria
            modalImg.src = img.src; // Copia a fonte da imagem para o modal
            modalImg.alt = img.alt || ''; // Copia alt para o modal
            modalCaption.textContent = img.alt || ''; // Usa alt como legenda
            modal.classList.add('open'); // Abre o modal (classe CSS controla exibição)
            modal.setAttribute('aria-hidden', 'false'); // Atualiza ARIA para visível
            document.body.style.overflow = 'hidden'; // Evita scroll de fundo enquanto o modal estiver aberto
            modalClose.focus(); // Move foco para o botão de fechar para acessibilidade
        });
    });

    function closeModal() { // Função que fecha o modal
        modal.classList.remove('open'); // Remove classe que abre o modal
        modal.setAttribute('aria-hidden', 'true'); // Marca como escondido para leitores de tela
        modalImg.src = ''; // Limpa src da imagem do modal
        modalCaption.textContent = ''; // Limpa legenda
        document.body.style.overflow = ''; // Restaura comportamento de scroll do body
    }

    modalClose.addEventListener('click', closeModal); // Fecha modal ao clicar no botão de fechar
    modalBackdrop.addEventListener('click', closeModal); // Fecha modal ao clicar no backdrop
    document.addEventListener('keydown', (e) => { // Escuta a tecla Escape para fechar o modal
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); // Fecha se modal estiver aberto
    });
}); // Fim do listener DOMContentLoaded