/* ESTRELAS DO INÍCIO */
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

/*  SLIDES */
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

/*QUIZ*/
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

/*SIMULADOR ORBITAL — Seção 07 */
(function configurarSimulador() {

  const MU = 398600;
  const R_TERRA = 6371;

  const cenarios = [
    { nome: 'Satélite × Detrito', tipoB: 'detrito', altA: 550, altB: 555, velA: 7.6,  velB: 7.65, incA: 53, incB: 51 },
    { nome: 'Satélite × Satélite', tipoB: 'satelite', altA: 520, altB: 518, velA: 7.7,  velB: 7.72, incA: 45, incB: 47 },
    { nome: 'Risco Crítico',       tipoB: 'detrito', altA: 400, altB: 401, velA: 7.9,  velB: 7.88, incA: 90, incB: 88 },
  ];
  let cenarioAtual = 0;
  let estadoResultado = null;

  const botoesCenario = document.querySelectorAll('.sim-cenario-btn');
  const sliderA       = document.getElementById('sim-alt-a');
  const sliderB       = document.getElementById('sim-alt-b');
  const valA          = document.getElementById('sim-val-alt-a');
  const valB          = document.getElementById('sim-val-alt-b');
  const btnAnalisar   = document.getElementById('sim-btn-analisar');
  const btnReiniciar  = document.getElementById('sim-btn-reiniciar');
  const canvas        = document.getElementById('sim-canvas');
  const divResultado  = document.getElementById('sim-resultado');
  const badgeBLabel   = document.getElementById('sim-badge-b-label');
  const nomeB         = document.getElementById('sim-nome-b');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function carregarCenario(idx) {
    const c = cenarios[idx];
    sliderA.value = c.altA;
    sliderB.value = c.altB;
    valA.textContent = c.altA;
    valB.textContent = c.altB;

    if (c.tipoB === 'detrito') {
      badgeBLabel.textContent = 'DET-B';
      badgeBLabel.className = 'sim-obj-badge sim-badge-b';
      nomeB.textContent = 'Detrito B';
    } else {
      badgeBLabel.textContent = 'SAT-B';
      badgeBLabel.className = 'sim-obj-badge sim-badge-b-sat';
      nomeB.textContent = 'Satélite B';
    }
    desenharCanvas(false);
  }

  botoesCenario.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesCenario.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      cenarioAtual = parseInt(btn.dataset.cenario);
      carregarCenario(cenarioAtual);

      divResultado.classList.add('oculto');
    });
  });

  sliderA.addEventListener('input', () => {
    valA.textContent = sliderA.value;
    desenharCanvas(false);
  });
  sliderB.addEventListener('input', () => {
    valB.textContent = sliderB.value;
    desenharCanvas(false);
  });

  function velCircular(altKm) {
    return Math.sqrt(MU / (R_TERRA + altKm));
  }

  function dvHohmann(r1, r2) {
    const v1  = Math.sqrt(MU / r1);
    const vt1 = Math.sqrt(2 * MU * r2 / (r1 * (r1 + r2)));
    const vt2 = Math.sqrt(2 * MU * r1 / (r2 * (r1 + r2)));
    const v2  = Math.sqrt(MU / r2);
    return Math.abs(vt1 - v1) + Math.abs(v2 - vt2);
  }

  function calcularRisco(altA, altB, cenario) {
    const diferencaAlt = Math.abs(altA - altB);      
    const diferencaInc = Math.abs(cenario.incA - cenario.incB); 

    const distMin = Math.max(0.5, diferencaAlt * 1.2 + diferencaInc * 0.8);

    const vRel = Math.abs(velCircular(altA) - velCircular(altB)) + diferencaInc * 0.08;

    const score = Math.min(99, Math.round(100 / (1 + distMin / 12) * (1 + vRel * 2)));

    let nivel, classeFaixa, classeNivel, icone;
    if (distMin > 20)      { nivel = 'BAIXO';    classeFaixa = 'faixa-verde';    classeNivel = 'nivel-verde';    icone = '<i class="bx bx-check-circle"></i>'; }
    else if (distMin > 5)  { nivel = 'MODERADO'; classeFaixa = 'faixa-amarelo'; classeNivel = 'nivel-amarelo'; icone = '<i class="bx bx-alert-triangle"></i>'; }
    else                   { nivel = 'CRÍTICO';  classeFaixa = 'faixa-vermelho'; classeNivel = 'nivel-vermelho'; icone = '<i class="bx bx-alarm-exclamation"></i>'; }

    const tempo = Math.max(0.5, Math.round((distMin * 0.4 + 2) * 10) / 10);

    const rA = R_TERRA + altA;
    const rB = R_TERRA + altB;
    const deltaAlt = altA < altB ? +12 : -12;
    const dvManobra = dvHohmann(rA, rA + deltaAlt) * 1000; 
    const dvUnidades = Math.round(dvManobra * 0.18 * 10) / 10; 

    const dvSemCoord = Math.round(dvUnidades * 1.6 * 10) / 10; 
    const distNova   = Math.round((distMin + 22 + Math.random() * 8) * 10) / 10;

    const quemDesvia = cenario.tipoB === 'detrito'
      ? 'Satélite A'
      : (dvUnidades < 5 ? 'Satélite A' : 'Ambos (coordenado)');

    const acao = deltaAlt > 0 ? `elevar ${Math.abs(deltaAlt)} km` : `reduzir ${Math.abs(deltaAlt)} km`;

    return { distMin, vRel, score, nivel, classeFaixa, classeNivel, icone, tempo, dvUnidades, dvSemCoord, distNova, quemDesvia, acao };
  }

  function desenharCanvas(comResultado) {
    const W = canvas.offsetWidth || 700;
    canvas.width  = W;
    canvas.height = 240;

    const cx = W / 2, cy = 120;
    const altA = parseInt(sliderA.value);
    const altB = parseInt(sliderB.value);
    const cenario = cenarios[cenarioAtual];

    ctx.fillStyle = '#030c18';
    ctx.fillRect(0, 0, W, 240);

    for (let i = 0; i < 80; i++) {
      const op = (Math.random() * 0.5 + 0.1).toFixed(2);
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * 240, Math.random() * 1.2 + 0.2, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${op})`;
      ctx.fill();
    }

    ctx.save();
    ctx.translate(cx, cy);

    const raioMax  = Math.min(cx, cy) * 0.88;
    const rTerra   = 30;
    const escala   = (raioMax - rTerra - 8) / 500; 
    const raioOrbA = rTerra + (altA - 300) * escala;
    const raioOrbB = rTerra + (altB - 300) * escala;

    const gradTerra = ctx.createRadialGradient(0, 0, rTerra * 0.3, 0, 0, rTerra);
    gradTerra.addColorStop(0, '#1a6fbf');
    gradTerra.addColorStop(0.65, '#0a3d6b');
    gradTerra.addColorStop(1, '#051c32');
    ctx.beginPath();
    ctx.arc(0, 0, rTerra, 0, 2 * Math.PI);
    ctx.fillStyle = gradTerra;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,212,255,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, raioOrbA, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0,212,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, raioOrbB, 0, 2 * Math.PI);
    ctx.strokeStyle = cenario.tipoB === 'detrito' ? 'rgba(255,69,96,0.2)' : 'rgba(123,47,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    const agora = Date.now() / 1000;
    const nA = Math.sqrt(MU / Math.pow(R_TERRA + altA, 3)) * 0.00012;
    const nB = Math.sqrt(MU / Math.pow(R_TERRA + altB, 3)) * 0.00012;
    const angA = agora * nA * 900;
    const angB = agora * nB * 850 + 1.1;

    const incARad = cenario.incA * Math.PI / 180;
    const incBRad = cenario.incB * Math.PI / 180;

    const pAx = raioOrbA * Math.cos(angA);
    const pAy = raioOrbA * Math.sin(angA) * Math.cos(incARad);
    const pBx = raioOrbB * Math.cos(angB);
    const pBy = raioOrbB * Math.sin(angB) * Math.cos(incBRad);

    if (comResultado && estadoResultado) {
      const distKm = estadoResultado.distMin;
      const corLinha = distKm <= 5 ? 'rgba(255,69,96,0.7)' : distKm <= 20 ? 'rgba(255,184,0,0.55)' : 'rgba(0,255,159,0.3)';
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(pAx, pAy);
      ctx.lineTo(pBx, pBy);
      ctx.strokeStyle = corLinha;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      const mx = (pAx + pBx) / 2;
      const my = (pAy + pBy) / 2;
      ctx.font = 'bold 10px Orbitron, monospace';
      ctx.fillStyle = corLinha.replace('0.7','1').replace('0.55','1').replace('0.3','0.9');
      ctx.textAlign = 'center';
      ctx.fillText(distKm.toFixed(1) + ' km', mx, my - 6);
    }

    ctx.beginPath();
    ctx.arc(pAx, pAy, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#00d4ff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(pAx, pAy, 9, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0,212,255,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const corB = cenario.tipoB === 'detrito' ? '#ff4560' : '#a57fff';
    const corBHalo = cenario.tipoB === 'detrito' ? 'rgba(255,69,96,0.35)' : 'rgba(165,127,255,0.35)';
    ctx.beginPath();
    ctx.arc(pBx, pBy, cenario.tipoB === 'detrito' ? 4 : 5, 0, 2 * Math.PI);
    ctx.fillStyle = corB;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(pBx, pBy, 8, 0, 2 * Math.PI);
    ctx.strokeStyle = corBHalo;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = '9px Orbitron, monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText('SAT-A', pAx, pAy - 13);
    ctx.fillStyle = corB;
    ctx.fillText(cenario.tipoB === 'detrito' ? 'DET-B' : 'SAT-B', pBx, pBy - 13);

    ctx.restore();

    ctx.font = '10px Orbitron, monospace';
    ctx.fillStyle = 'rgba(0,212,255,0.6)';
    ctx.textAlign = 'left';
    ctx.fillText('A: ' + altA + ' km', 10, 20);
    ctx.fillStyle = cenario.tipoB === 'detrito' ? 'rgba(255,69,96,0.7)' : 'rgba(165,127,255,0.7)';
    ctx.fillText('B: ' + altB + ' km', 10, 34);
  }

  btnAnalisar.addEventListener('click', () => {
    const altA = parseInt(sliderA.value);
    const altB = parseInt(sliderB.value);
    const cenario = cenarios[cenarioAtual];

    estadoResultado = calcularRisco(altA, altB, cenario);
    const r = estadoResultado;

    const faixa = document.getElementById('sim-risco-faixa');
    faixa.className = 'sim-risco-faixa ' + r.classeFaixa;
    document.getElementById('sim-risco-icone').innerHTML = r.icone;
    const elNivel = document.getElementById('sim-risco-nivel');
    elNivel.textContent = 'RISCO ' + r.nivel;
    elNivel.className = 'sim-risco-nivel ' + r.classeNivel;
    document.getElementById('sim-risco-detalhe').textContent =
      `Distância mínima em ~${r.tempo.toFixed(1)}h — velocidade relativa ${r.vRel.toFixed(2)} km/s`;
    document.getElementById('sim-dist-num').textContent = r.distMin.toFixed(1);

    document.getElementById('sim-rec-corpo').innerHTML = `
      <div class="sim-rec-item">
        <p class="sim-rec-label">Quem manobra</p>
        <p class="sim-rec-valor cor-neon">${r.quemDesvia}</p>
      </div>
      <div class="sim-rec-item">
        <p class="sim-rec-label">Ação</p>
        <p class="sim-rec-valor">${r.acao}</p>
      </div>
      <div class="sim-rec-item">
        <p class="sim-rec-label">Combustível (ΔV)</p>
        <p class="sim-rec-valor cor-verde">${r.dvUnidades.toFixed(1)} u</p>
      </div>
      <div class="sim-rec-item">
        <p class="sim-rec-label">Nova distância mínima</p>
        <p class="sim-rec-valor cor-verde">${r.distNova.toFixed(1)} km</p>
      </div>
    `;

    document.getElementById('sim-dv-sem').textContent = r.dvSemCoord.toFixed(1) + ' ΔV';
    document.getElementById('sim-dv-com').textContent  = r.dvUnidades.toFixed(1) + ' ΔV';

    divResultado.classList.remove('oculto');
    desenharCanvas(true);

    divResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  btnReiniciar.addEventListener('click', () => {
    estadoResultado = null;
    divResultado.classList.add('oculto');
    desenharCanvas(false);
    document.getElementById('sim-passo-cenario').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function loop() {
    desenharCanvas(!!estadoResultado);
    requestAnimationFrame(loop);
  }

  carregarCenario(0);
  loop();

})();