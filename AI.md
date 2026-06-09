# AI.md — Registro de Uso de Inteligência Artificia
StellarSync  
Equipe:
- Beatriz Soares Salve — RM568791
- Estela Mariano da Silva — RM569513
- Gabriela Correa Pinon Labrada — RM569849
---

## Interação 01 — Simulador Orbital (Cálculos Físicos)
### O que foi solicitado
Durante o desenvolvimento do simulador orbital (Seção 07), a equipe já havia mapeado previamente quais conceitos físicos seriam necessários para tornar a simulação realista: velocidade orbital circular, diferença de altitude entre objetos, variação de inclinação orbital e alguma forma de calcular o custo de uma manobra de desvio. Com esses conceitos em mãos, solicitamos à IA que implementasse as funções matemáticas correspondentes e as integrasse à lógica do simulador.

### O que a IA retornou
A IA implementou três funções principais:
- *velCircular(altKm)* - calcula a velocidade orbital circular de um objeto a uma dada altitude, usando o parâmetro gravitacional padrão da Terra (μ = 398600 km³/s²).
- *dvHohmann(r1, r2)* - calcula o delta-v total necessário para uma transferência de Hohmann entre duas órbitas circulares, baseado nas velocidades de transferência elíptica.
- *calcularRisco(altA, altB, cenario)* - função central que combina diferença de altitude, diferença de inclinação e velocidade relativa para estimar a distância mínima de aproximação e classificar o nível de risco em três faixas: baixo, moderado e crítico.
Além disso, a IA propôs a lógica de recomendação de manobra, determinando qual objeto deve desviar (satélite ou detrito), em qual direção (elevar ou reduzir altitude) e estimando o combustível economizado com coordenação versus sem coordenação.

### O que foi mantido
- As três funções matemáticas foram mantidas integralmente, pois os resultados foram validados contra referências de física orbital e os valores gerados pelo simulador se mostraram coerentes.
- A classificação em três níveis de risco (verde/amarelo/vermelho) foi mantida conforme proposta.
- A lógica de comparação "sem coordenação vs. com StellarSync" foi mantida, pois reforça diretamente o diferencial do projeto.
### O que foi alterado
- Os cenários predefinidos (altitudes e inclinações iniciais de cada situação) foram ajustados pela equipe para valores que gerassem resultados mais didáticos e visualmente distintos no canvas.
- Os textos de descrição de cada cenário ("Caso mais comum", "coordenação necessária", etc.) foram escritos pela equipe.
- O fator de escala visual do canvas foi calibrado manualmente para que as órbitas ficassem proporcionais e legíveis na tela.
### O que foi rejeitado
A IA inicialmente sugeriu incluir cálculo de probabilidade de colisão baseado em volume de erro posicional (covariância). A equipe optou por não incluir essa abordagem pois tornaria o código excessivamente complexo para o escopo do projeto e dificultaria a compreensão do simulador pelo público-alvo.
---

## Interação 2 - Sistema de Troca de Temas

### O que foi solicitado
Com os três temas de cor já definidos via variáveis CSS (data-tema="espaco-profundo", data-tema="nebulosa-roxa", data-tema="sol-solar"), solicitamos à IA que melhorasse o JavaScript responsável pela troca de tema, tornando o código mais robusto e organizado.

### O que a IA retornou
A IA propôs encapsular a lógica em (configurarTemas), seguindo o mesmo padrão já adotado no restante do script.js. A função itera sobre os botões de tema, aplica o data-tema correspondente no body via setAttribute e gerencia o estado ativo dos botões removendo e reaplicando a classe .ativo.

### O que foi mantido
- O padrão foi mantido por consistência com o restante do script.
- O uso de data-tema no body para acionar as variáveis CSS foi mantido, pois é a abordagem mais performática (sem manipulação direta de variáveis CSS via JavaScript).
- O gerenciamento da classe .ativo nos botões foi mantido conforme proposto.
### O que foi alterado
- A equipe definiu os três temas e suas paletas de cor integralmente, a IA apenas organizou a lógica de troca.
- Os títulos dos botões (title="Espaço Profundo", etc.) foram definidos pela equipe para melhorar a acessibilidade.
### O que foi rejeitado
A IA sugeriu salvar o tema escolhido no localStorage para persistir entre sessões. A equipe optou por não implementar essa funcionalidade, pois o projeto não utiliza nenhuma forma de armazenamento local e a página sempre carrega com o tema padrão, o que é o comportamento desejado.