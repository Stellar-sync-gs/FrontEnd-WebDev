/* ESTRELAS DO INÍCIO  */
(function gerarEstrelas() {
  const container = document.getElementById('estrelas');
  if (!container) return;

  const quantidade = 120;
  const fragmento = document.createDocumentFragment();

  for (let i = 0; i < quantidade; i++) {
    const estrela = document.createElement('div');
    estrela.className = 'estrela';

    const tamanho = Math.random() * 2.5 + 0.5;

    estrela.style.cssText = `
      width:${tamanho}px;
      height:${tamanho}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
      --atraso:-${(Math.random() * 5).toFixed(1)}s;
    `;
    fragmento.appendChild(estrela);
  }
  container.appendChild(fragmento);
})();

/* SLIDESHOW */
(function configurarSlideshow() {
  const slides = document.querySelectorAll('.slide:not(.controles-slide)');
  const pontos = document.querySelectorAll('.ponto');
  const botaoAnterior = document.getElementById('botao-anterior');
  const botaoProximo = document.getElementById('botao-proximo');
  if (!slides.length) return;

  let indiceAtual = 0;
  let reproduzirAuto;

  function irPara(indice) {
    slides[indiceAtual].classList.remove('ativo');
    pontos[indiceAtual].classList.remove('ativo');
    indiceAtual = (indice + slides.length) % slides.length;
    slides[indiceAtual].classList.add('ativo');
    pontos[indiceAtual].classList.add('ativo');
  }

  function iniciarAuto() {
    clearInterval(reproduzirAuto);
    reproduzirAuto = setInterval(() => irPara(indiceAtual + 1), 5000);
  }

  botaoAnterior.addEventListener('click', () => { irPara(indiceAtual - 1); iniciarAuto(); });
  botaoProximo.addEventListener('click', () => { irPara(indiceAtual + 1); iniciarAuto(); });

  pontos.forEach(ponto => {
    ponto.addEventListener('click', () => {
      irPara(parseInt(ponto.dataset.slide));
      iniciarAuto();
    });
  });

  iniciarAuto();
})();

/*QUIZ */
(function configurarQuiz() {
  const perguntas = [
    {
      q: 'Quantos objetos rastreáveis orbitam a Terra atualmente?',
      opcoes: ['5.000', '20.000', '45.700', '100.000'],
      correta: 2,
      explicacao: 'A ESA confirmou 45.700 objetos rastreáveis em órbita em 2024, mas a estimativa total chega a 130 milhões de fragmentos menores.'
    },
    {
      q: 'O que é o Efeito Kessler?',
      opcoes: [
        'Um tipo de combustível espacial',
        'Uma reação em cadeia de colisões que torna órbitas inutilizáveis',
        'Um sistema de rastreamento da NASA',
        'Um programa de limpeza orbital da ESA'
      ],
      correta: 1,
      explicacao: 'O Efeito Kessler é um cenário em que colisões em cascata geram detritos que causam mais colisões, tornando órbitas permanentemente inutilizáveis.'
    },
    {
      q: 'Quantos avisos de colisão são emitidos por dia atualmente?',
      opcoes: ['10', '100', '500', 'Mais de 1.000'],
      correta: 3,
      explicacao: 'Sem um sistema centralizado de coordenação, mais de 1.000 avisos de colisão são emitidos diariamente no espaço.'
    },
    {
      q: 'Para que servem as manobras orbitais realizadas pelos satélites Starlink?',
      opcoes: [
        'Aumentar a velocidade de transmissão de dados',
        'Desviar de detritos e evitar colisões',
        'Mudar a órbita para altitudes mais baixas',
        'Economizar bateria dos painéis solares'
      ],
      correta: 1,
      explicacao: 'Os satélites Starlink realizaram cerca de 75.000 manobras entre 2023 e 2024 para desviar de lixo espacial e evitar colisões.'
    },
    {
      q: 'Qual porcentagem das informações sobre clima e meio ambiente vem de satélites?',
      opcoes: ['20–30%', '40–50%', '70–80%', 'Quase 100%'],
      correta: 2,
      explicacao: 'Segundo a ESA, entre 70% e 80% de todas as informações sobre clima e meio ambiente vêm de satélites em órbita.'
    },
    {
      q: 'O que acontece quando um satélite colide com um detrito de apenas 10 cm?',
      opcoes: [
        'Causa danos leves e reparáveis',
        'Perde apenas um painel solar',
        'Pode ser completamente destruído',
        'Nada — o satélite é blindado'
      ],
      correta: 2,
      explicacao: 'Um fragmento de apenas 10 cm tem energia cinética suficiente para destruir completamente um satélite de muitos milhões de euros.'
    },
    {
      q: 'O que é propagação orbital?',
      opcoes: [
        'O processo de lançar um foguete',
        'A técnica de calcular onde um objeto estará no futuro com base em sua trajetória',
        'A transmissão de dados entre satélites',
        'A remoção de detritos da órbita'
      ],
      correta: 1,
      explicacao: 'Propagação orbital é o cálculo de posições futuras de objetos espaciais com base em física orbital — o mesmo princípio do SGP4 real.'
    },
    {
      q: 'Qual empresa chegou a 15 metros de um detrito espacial pela primeira vez em 2024?',
      opcoes: ['SpaceX', 'NASA', 'Astroscale', 'LeoLabs'],
      correta: 2,
      explicacao: 'A Astroscale chegou a 15 metros de um detrito espacial em dezembro de 2024 — um marco histórico para a remoção de lixo orbital.'
    },
    {
      q: 'O que o StellarSync faz quando detecta risco de colisão?',
      opcoes: [
        'Apaga o satélite do sistema',
        'Envia e-mail para a NASA',
        'Recomenda manobra coordenada indicando qual objeto deve desviar e em qual direção',
        'Aguarda confirmação humana sem agir'
      ],
      correta: 2,
      explicacao: 'O StellarSync calcula qual objeto deve desviar, em qual direção e quanto combustível isso consome — resolvendo o problema das decisões isoladas.'
    },
    {
      q: 'Qual é o principal diferencial do StellarSync em relação a outras soluções do mercado?',
      opcoes: [
        'Usa inteligência artificial avançada',
        'É o único sistema com hardware físico',
        'Coordena múltiplas operadoras em vez de apenas rastrear objetos isoladamente',
        'Funciona apenas com satélites da NASA'
      ],
      correta: 2,
      explicacao: 'O StellarSync preenche a lacuna de coordenação multioperadora — enquanto outras soluções focam só em rastreamento, ele recomenda manobras coordenadas.'
    }
  ];

  const classificacoes = [
    { minimo: 0, maximo: 3, titulo: 'Detrito Espacial', descricao: 'Ainda dá para aprender! Explore as seções acima e tente novamente.' },
    { minimo: 4, maximo: 6, titulo: 'Satélite em Órbita', descricao: 'Bom conhecimento! Você está no caminho certo para proteger o espaço.' },
    { minimo: 7, maximo: 9, titulo: 'Especialista Orbital', descricao: 'Impressionante! Você conhece profundamente os desafios da órbita terrestre.' },
    { minimo: 10, maximo: 10, titulo: 'Guardião do Espaço', descricao: 'Perfeito! Você domina completamente o universo do monitoramento orbital.' }
  ];

  const telaInicio = document.getElementById('tela-inicio-quiz');
  const telaJogo = document.getElementById('tela-jogo-quiz');
  const telaResultado = document.getElementById('tela-resultado-quiz');

  const botaoIniciar = document.getElementById('botao-iniciar-quiz');
  const botaoProxima = document.getElementById('botao-proxima-pergunta');
  const botaoReiniciar = document.getElementById('botao-reiniciar-quiz');

  const elementoPergunta = document.getElementById('texto-pergunta');
  const containerOpcoes = document.getElementById('container-opcoes');
  const elementoFeedback = document.getElementById('feedback-resposta');
  const preenchimentoProgresso = document.getElementById('preenchimento-progresso');
  const contadorEl = document.getElementById('contador-pergunta');
  const placarVivo = document.getElementById('placar-vivo');

  const badgeResultado = document.getElementById('badge-resultado');
  const tituloResultado = document.getElementById('titulo-resultado');
  const descResultado = document.getElementById('descricao-resultado');
  const numeroPlacar = document.getElementById('numero-placar-resultado');

  let perguntaAtual = 0;
  let pontuacao = 0;
  let respondeu = false;

  function exibirTela(tela) {
    [telaInicio, telaJogo, telaResultado].forEach(t => t.classList.add('oculto'));
    tela.classList.remove('oculto');
  }

  function carregarPergunta() {
    respondeu = false;
    elementoFeedback.classList.add('oculto');
    elementoFeedback.className = 'feedback-quiz oculto';
    botaoProxima.classList.add('oculto');

    const pergunta = perguntas[perguntaAtual];
    const letras = ['A', 'B', 'C', 'D'];

    contadorEl.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    placarVivo.textContent = `Pontos: ${pontuacao}`;
    preenchimentoProgresso.style.width = `${((perguntaAtual) / perguntas.length) * 100}%`;
    elementoPergunta.textContent = pergunta.q;

    containerOpcoes.innerHTML = '';
    pergunta.opcoes.forEach((opcao, i) => {
      const botao = document.createElement('button');
      botao.className = 'opcao-quiz';
      botao.innerHTML = `<span class="letra-opcao">${letras[i]}</span>${opcao}`;
      botao.addEventListener('click', () => selecionarResposta(i, botao));
      containerOpcoes.appendChild(botao);
    });
  }

  function selecionarResposta(indice, botaoClicado) {
    if (respondeu) return;
    respondeu = true;

    const pergunta = perguntas[perguntaAtual];
    const todosBotoes = containerOpcoes.querySelectorAll('.opcao-quiz');

    todosBotoes.forEach(b => b.disabled = true);

    if (indice === pergunta.correta) {
      pontuacao++;
      botaoClicado.classList.add('correta');
      elementoFeedback.textContent = ' Correto! ' + pergunta.explicacao;
      elementoFeedback.className = 'feedback-quiz feedback-correto';
    } else {
      botaoClicado.classList.add('errada');
      todosBotoes[pergunta.correta].classList.add('correta');
      elementoFeedback.textContent = ' Errado. ' + pergunta.explicacao;
      elementoFeedback.className = 'feedback-quiz feedback-errado';
    }

    elementoFeedback.classList.remove('oculto');
    placarVivo.textContent = `Pontos: ${pontuacao}`;

    if (perguntaAtual < perguntas.length - 1) {
      botaoProxima.classList.remove('oculto');
    } else {
      setTimeout(exibirResultado, 1800);
    }
  }

  function exibirResultado() {
    preenchimentoProgresso.style.width = '100%';
    const classificacao = classificacoes.find(c => pontuacao >= c.minimo && pontuacao <= c.maximo);
    tituloResultado.textContent = classificacao.titulo;
    descResultado.textContent = classificacao.descricao;
    numeroPlacar.textContent = pontuacao;
    exibirTela(telaResultado);
  }

  botaoIniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    exibirTela(telaJogo);
    carregarPergunta();
  });

  botaoProxima.addEventListener('click', () => {
    perguntaAtual++;
    carregarPergunta();
  });

  botaoReiniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    exibirTela(telaJogo);
    carregarPergunta();
  });
})();