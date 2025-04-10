// DECLARAÇÃO DE VARIÁVEIS GLOBAIS
let indiceAtual = 0;
let acertos = 0;
let respostasErradas = [];

// Obtém referências dos elementos HTML
const quiz = document.getElementById('quiz');
const proximaBtn = document.getElementById('proximaBtn');
const feedbackDiv = document.getElementById('feedback');
const resultadoContainer = document.getElementById('resultadoContainer');
const quizContainer = document.getElementById('quizContainer');

// Array de questões
const questoes = [
    {
      pergunta: "O que é uma pilha na estrutura de dados?",
      opcoes: [
        "FIFO (First In, First Out)",
        "Banco de dados",
        "LIFO (Last In, First Out)",
        "Função recursiva"
      ],
      correta: 2,
      explicacao: "Pilha segue o princípio LIFO: o último elemento inserido é o primeiro a sair."
    },
    {
      pergunta: "Qual operação insere um elemento no topo da pilha?",
      opcoes: [
        "Pop",
        "Top",
        "Push",
        "Peek"
      ],
      correta: 2,
      explicacao: "Push é a operação que insere um novo elemento no topo da pilha."
    },
    {
      pergunta: "Qual operação remove o elemento do topo da pilha?",
      opcoes: [
        "Push",
        "Peek",
        "Insert",
        "Pop"
      ],
      correta: 3,
      explicacao: "Pop remove o elemento que está no topo da pilha."
    },
    {
      pergunta: "O que a função 'verTopo' (ou 'Peek') retorna?",
      opcoes: [
        "Total de elementos na pilha",
        "Valor do topo sem removê-lo",
        "Remove o elemento do topo",
        "Insere um novo elemento"
      ],
      correta: 1,
      explicacao: "verTopo retorna o valor do nó no topo da pilha sem removê-lo."
    },
    {
      pergunta: "Como identificamos uma pilha vazia?",
      opcoes: [
        "Topo aponta para o último elemento",
        "Pop retorna zero",
        "Topo é nulo (NULL ou nullptr)",
        "Todos os nós apontam para nullptr"
      ],
      correta: 2,
      explicacao: "Se o ponteiro do topo for nulo, a pilha está vazia."
    },
    {
      pergunta: "O que o ponteiro 'próximo' de um nó armazena?",
      opcoes: [
        "Valor atual do nó",
        "Quantidade de elementos",
        "Endereço do próximo nó",
        "Endereço do topo da pilha"
      ],
      correta: 2,
      explicacao: "O ponteiro 'próximo' armazena o endereço do próximo nó na lista encadeada."
    },
    {
      pergunta: "Como inicializar uma pilha vazia?",
      opcoes: [
        "Topo aponta para o último elemento",
        "Topo = nullptr (ou NULL)",
        "Topo = 0",
        "Remover todos os elementos existentes"
      ],
      correta: 1,
      explicacao: "Atribuímos nullptr (ou NULL) ao topo para indicar que a pilha está vazia."
    },
    {
      pergunta: "O que faz a função 'exibirPilha'?",
      opcoes: [
        "Adiciona um novo nó",
        "Mostra todos os elementos da pilha",
        "Busca um valor específico",
        "Libera toda a memória alocada"
      ],
      correta: 1,
      explicacao: "A função exibirPilha percorre a pilha e exibe os seus elementos."
    },
    {
      pergunta: "O que acontece com o antigo topo após um empilhar (push)?",
      opcoes: [
        "É excluído da memória",
        "Vai para o fim da pilha",
        "Torna-se o próximo do novo topo",
        "Vira o nó base da pilha"
      ],
      correta: 2,
      explicacao: "Após empilhar, o novo nó aponta para o antigo topo, que passa a ser o próximo dele."
    },
    {
      pergunta: "Por que usamos ponteiro por referência na função empilhar?",
      opcoes: [
        "Para evitar alocação de memória",
        "Para copiar o valor do topo",
        "Para modificar o topo original",
        "Para retornar o valor inserido"
      ],
      correta: 2,
      explicacao: "Usamos passagem por referência para modificar o topo real da pilha."
    },
    {
      pergunta: "O que acontece se desempilharmos (pop) com pilha vazia?",
      opcoes: [
        "Empilha um valor nulo",
        "Retorna erro e -1 (ou valor especial)",
        "Nada acontece",
        "Finaliza o programa"
      ],
      correta: 1,
      explicacao: "Se a pilha estiver vazia, geralmente é retornado um valor especial (por exemplo, -1) ou mostra uma mensagem de erro."
    },
    {
      pergunta: "Resultado da sequência: empilha(5), empilha(10), desempilha(), empilha(20), verTopo()?",
      opcoes: [
        "5",
        "10",
        "20",
        "Erro"
      ],
      correta: 2,
      explicacao: "Após empilhar 5 e 10, desempilhar remove 10, e empilhar 20 coloca 20 no topo."
    },
    {
      pergunta: "Qual a ordem dos elementos após empilhar 10, 20, 30?",
      opcoes: [
        "10 → 20 → 30",
        "30 → 20 → 10",
        "NULL ← 10",
        "30 ← 20 ← 10"
      ],
      correta: 1,
      explicacao: "Empilhando 10, 20 e 30, o último inserido (30) fica no topo, formando a ordem 30, 20, 10."
    },
    {
      pergunta: "Por que retornamos -1 em verTopo se a pilha estiver vazia?",
      opcoes: [
        "Para desalocar memória",
        "Para indicar ausência de valor",
        "Para reiniciar a pilha",
        "Para evitar execução de código"
      ],
      correta: 1,
      explicacao: "O -1 serve como um aviso indicando que não há valor a ser retornado."
    },
    {
      pergunta: "Como a pilha encadeada é eficiente?",
      opcoes: [
        "Permite acesso direto a qualquer nó",
        "Todos os nós têm o mesmo valor",
        "Não usa ponteiros",
        "Operações ocorrem apenas no topo"
      ],
      correta: 3,
      explicacao: "A eficiência se deve às operações serem realizadas somente no topo, o que tem complexidade O(1)."
    },
    {
      pergunta: "O que a função 'pilhaVazia' retorna?",
      opcoes: [
        "true se topo == nullptr",
        "false sempre",
        "true se topo != nullptr",
        "Erro"
      ],
      correta: 0,
      explicacao: "A função verifica se o topo é nulo; se sim, retorna true indicando que a pilha está vazia."
    },
    {
      pergunta: "No código: empilhar(topo, 10); empilhar(topo, 20); desempilhar(topo); verTopo(topo); qual valor?",
      opcoes: [
        "10",
        "20",
        "NULL",
        "30"
      ],
      correta: 0,
      explicacao: "Após empilhar 10 e 20, a operação desempilhar remove 20, deixando 10 no topo."
    },
    {
      pergunta: "Por que empilhar aloca dinamicamente?",
      opcoes: [
        "Para evitar uso de ponteiros",
        "Para manter tamanho fixo",
        "Para criar novo nó na memória",
        "Para liberar memória automaticamente"
      ],
      correta: 2,
      explicacao: "A alocação dinâmica permite criar novos nós conforme a necessidade, sem limitar o tamanho da pilha."
    },
    {
      pergunta: "Que parte da struct armazena o valor da pilha?",
      opcoes: [
        "Ponteiro 'próximo'",
        "Campo 'valor'",
        "Ponteiro 'topo'",
        "NULL"
      ],
      correta: 1,
      explicacao: "O campo 'valor' é usado para armazenar os dados do nó."
    },
    {
      pergunta: "Por que chamamos a estrutura de 'nó'?",
      opcoes: [
        "Por ser circular",
        "Porque encadeia outros nós",
        "Por não usar ponteiros",
        "Por conter apenas dados"
      ],
      correta: 1,
      explicacao: "O nome 'nó' se dá pois cada elemento aponta para o próximo, formando uma cadeia."
    },
    {
      pergunta: "Como é feita a exibição da pilha?",
      opcoes: [
        "Do fim ao topo",
        "Recursivamente",
        "Iterando do topo até NULL",
        "Aleatoriamente"
      ],
      correta: 2,
      explicacao: "A exibição costuma ser feita iterando do topo até encontrar NULL."
    },
    {
      pergunta: "Qual tipo usamos na struct No?",
      opcoes: [
        "int e No*",
        "char e int",
        "float e string",
        "int apenas"
      ],
      correta: 0,
      explicacao: "A declaração típica é: int valor; No* proximo;"
    },
    {
      pergunta: "O que o topo aponta após desempilhar?",
      opcoes: [
        "Para o novo elemento",
        "Para o nó removido",
        "Para o próximo do antigo topo",
        "NULL"
      ],
      correta: 2,
      explicacao: "Depois de desempilhar, o topo passa a apontar para o nó que seguia ao removido."
    },
    {
      pergunta: "Qual é o retorno da função desempilhar (pop)?",
      opcoes: [
        "Valor removido",
        "Endereço de memória",
        "Novo topo",
        "NULL"
      ],
      correta: 0,
      explicacao: "A função retorna o valor que estava armazenado no nó removido."
    },
    {
      pergunta: "Quando usar pilha encadeada em vez de array?",
      opcoes: [
        "Quando o tamanho é fixo",
        "Para otimizar buscas",
        "Quando o tamanho da pilha é variável",
        "Para armazenar strings"
      ],
      correta: 2,
      explicacao: "A pilha encadeada é ideal quando o tamanho não é conhecido antecipadamente, pois cresce dinamicamente."
    },
    {
      pergunta: "Por que liberar memória ao desempilhar?",
      opcoes: [
        "Para resetar o topo",
        "Para evitar vazamento de memória",
        "Para remover o valor",
        "Para evitar erro de compilação"
      ],
      correta: 1,
      explicacao: "Liberar memória previne vazamentos e problemas de performance."
    },
    {
      pergunta: "Quantos ponteiros são necessários na struct No?",
      opcoes: [
        "2",
        "1 (próximo)",
        "0",
        "3"
      ],
      correta: 1,
      explicacao: "Normalmente, a struct No possui apenas um ponteiro para o próximo nó."
    },
    {
      pergunta: "Qual saída da função exibirPilha após push(5), push(10), push(15)?",
      opcoes: [
        "5 → 10 → 15",
        "15 → 10 → 5",
        "NULL",
        "Erro"
      ],
      correta: 1,
      explicacao: "Com push, o último inserido (15) fica no topo, invertendo a ordem de entrada."
    },
    {
      pergunta: "Em que situação o topo da pilha será NULL?",
      opcoes: [
        "Quando cheia",
        "Após remover o último elemento",
        "Quando cheia de inteiros",
        "Quando empilhar"
      ],
      correta: 1,
      explicacao: "Depois de remover o último elemento, o topo passa a ser NULL, indicando pilha vazia."
    },
    {
      pergunta: "Qual saída para verTopo se a pilha está vazia?",
      opcoes: [
        "0",
        "NULL",
        "-1 (ou valor especial)",
        "Erro"
      ],
      correta: 2,
      explicacao: "Retorna -1 (ou outro valor especial) para indicar que não há valor na pilha."
    }
  ];
  

// FUNÇÃO PARA INICIAR O QUIZ
function iniciarQuestoes() {
  document.getElementById('apresentacao').classList.add('hidden');
  quizContainer.classList.remove('hidden');
  document.getElementById('totalQuestions').textContent = questoes.length;
  mostrarQuestao();

  // Inicia animação de progresso
  const progress = document.getElementById('progress');
  progress.classList.add('pulse');
  setTimeout(() => progress.classList.remove('pulse'), 2000);
}

// FUNÇÃO PARA EXIBIR A QUESTÃO ATUAL
function mostrarQuestao() {
  quiz.innerHTML = '';
  proximaBtn.classList.add('hidden');
  feedbackDiv.classList.add('hidden');

  const q = questoes[indiceAtual];
  document.getElementById('currentQuestion').textContent = indiceAtual + 1;

  const div = document.createElement('div');
  div.className = 'space-y-4';
  
  // Exibição da pergunta
  const perguntaDiv = document.createElement('div');
  perguntaDiv.className = 'bg-blue-50 p-4 rounded-lg border border-blue-100';
  perguntaDiv.innerHTML = `
    <div class="flex items-start">
      <span class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">${indiceAtual + 1}</span>
      <p class="font-medium text-gray-800">${q.pergunta}</p>
    </div>
  `;
  div.appendChild(perguntaDiv);
  
  // Exibição das opções
  const opcoesDiv = document.createElement('div');
  opcoesDiv.className = 'space-y-3';
  
  q.opcoes.forEach((opcao, i) => {
    const botao = document.createElement('button');
    botao.className = 'w-full text-left p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all flex items-start';
    botao.innerHTML = `
      <span class="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">${i + 1}</span>
      <span>${opcao}</span>
    `;
    botao.onclick = () => verificarResposta(i, q);
    opcoesDiv.appendChild(botao);
  });
  
  div.appendChild(opcoesDiv);
  quiz.appendChild(div);
  
  // Atualiza pontuação
  document.getElementById('scoreValue').textContent = acertos;
  document.getElementById('score').classList.remove('hidden');
}

// FUNÇÃO PARA VERIFICAR A RESPOSTA
function verificarResposta(resposta, q) {
  const botoes = document.querySelectorAll('#quiz button');
  botoes.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('hover:bg-gray-50');
  });
  
  // Destaca a opção selecionada
  botoes[resposta].classList.add('option-selected');
  
  // Mostra feedback
  feedbackDiv.classList.remove('hidden');
  feedbackDiv.className = 'p-4 rounded-lg';
  
  if (resposta === q.correta) {
    botoes[resposta].classList.add('correct-answer');
    feedbackDiv.classList.add('bg-green-50', 'border', 'border-green-200');
    feedbackDiv.innerHTML = `
      <div class="flex items-start">
        <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
        <div>
          <p class="font-medium text-green-800">Resposta Correta!</p>
          <p class="text-sm text-gray-600 mt-1">${q.explicacao}</p>
        </div>
      </div>
    `;
    acertos++;
    document.getElementById('scoreValue').textContent = acertos;
  } else {
    botoes[resposta].classList.add('wrong-answer');
    botoes[q.correta].classList.add('correct-answer');
    feedbackDiv.classList.add('bg-red-50', 'border', 'border-red-200');
    feedbackDiv.innerHTML = `
      <div class="flex items-start">
        <i class="fas fa-times-circle text-red-500 mt-1 mr-2"></i>
        <div>
          <p class="font-medium text-red-800">Resposta Incorreta</p>
          <p class="text-sm text-gray-600 mt-1">${q.explicacao}</p>
        </div>
      </div>
    `;
    
    // Armazena a questão para exibir no resultado final
    respostasErradas.push({
      pergunta: q.pergunta,
      respostaErrada: q.opcoes[resposta],
      respostaCorreta: q.opcoes[q.correta],
      explicacao: q.explicacao
    });
  }
  
  proximaBtn.classList.remove('hidden');
  
  // Efeito de confetti em resposta correta
  if (resposta === q.correta) {
    const confetti = document.createElement('div');
    confetti.className = 'fixed inset-0 pointer-events-none z-50';
    confetti.id = 'confetti';
    document.body.appendChild(confetti);
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 rounded-full';
        particle.style.backgroundColor = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'][Math.floor(Math.random() * 5)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-10px';
        particle.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        
        const animation = particle.animate([
          { top: '-10px', opacity: 1 },
          { top: '100vh', opacity: 0 }
        ], {
          duration: 1000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
        });
        
        confetti.appendChild(particle);
        animation.onfinish = () => particle.remove();
      }, i * 50);
    }
    
    setTimeout(() => {
      document.getElementById('confetti').remove();
    }, 3000);
  }
}

// FUNÇÃO PARA PASSAR PARA A PRÓXIMA QUESTÃO OU MOSTRAR O RESULTADO FINAL
function mostrarProxima() {
  indiceAtual++;
  if (indiceAtual < questoes.length) {
    mostrarQuestao();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    mostrarResultado();
  }
}

// FUNÇÃO PARA EXIBIR O RESULTADO FINAL
function mostrarResultado() {
  quizContainer.classList.add('hidden');
  resultadoContainer.classList.remove('hidden');
  
  const porcentagem = Math.round((acertos / questoes.length) * 100);
  let mensagem = '';
  let emoji = '';
  
  if (porcentagem >= 90) {
    mensagem = `Excelente! Você acertou ${acertos} de ${questoes.length} questões (${porcentagem}%). Dominou completamente o conceito de pilhas encadeadas!`;
    emoji = '🏆';
  } else if (porcentagem >= 70) {
    mensagem = `Bom trabalho! Você acertou ${acertos} de ${questoes.length} questões (${porcentagem}%). Continue praticando para alcançar a perfeição!`;
    emoji = '👍';
  } else if (porcentagem >= 50) {
    mensagem = `Você acertou ${acertos} de ${questoes.length} questões (${porcentagem}%). Revise os conceitos e tente novamente!`;
    emoji = '💪';
  } else {
    mensagem = `Você acertou ${acertos} de ${questoes.length} questões (${porcentagem}%). Recomendamos estudar mais os conceitos básicos antes de tentar novamente.`;
    emoji = '📚';
  }
  
  document.getElementById('resultadoMessage').innerHTML = `${emoji} ${mensagem}`;
  
  // Detalhes das respostas erradas (se houver)
  const detailsDiv = document.getElementById('resultDetails');
  if (respostasErradas.length > 0) {
    detailsDiv.innerHTML = `
      <h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Questões que você errou:</h3>
      <div class="space-y-4">
        ${respostasErradas.map((erro, index) => `
          <div class="bg-red-50 p-4 rounded-lg border border-red-100">
            <p class="font-medium text-red-800">${index + 1}. ${erro.pergunta}</p>
            <p class="text-sm mt-2"><span class="font-bold">Sua resposta:</span> <span class="text-red-600">${erro.respostaErrada}</span></p>
            <p class="text-sm"><span class="font-bold">Resposta correta:</span> <span class="text-green-600">${erro.respostaCorreta}</span></p>
            <p class="text-sm mt-2 text-gray-600">${erro.explicacao}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    detailsDiv.innerHTML = `
      <div class="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
        <i class="fas fa-check-circle text-green-500 text-4xl mb-2"></i>
        <p class="font-bold text-green-800">Perfeito! Você não errou nenhuma questão!</p>
      </div>
    `;
  }
}

// FUNÇÃO PARA REINICIAR O QUIZ
function reiniciarQuiz() {
  indiceAtual = 0;
  acertos = 0;
  respostasErradas = [];
  resultadoContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  mostrarQuestao();
}

// FUNÇÃO PARA VOLTAR À TELA INICIAL
function voltarParaInicio() {
  indiceAtual = 0;
  acertos = 0;
  respostasErradas = [];
  resultadoContainer.classList.add('hidden');
  quizContainer.classList.add('hidden');
  document.getElementById('apresentacao').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Efeito de digitação para o código (typewriter)
const codigoExemplo = `struct No {\n  int valor;\n  No* proximo;\n};\n\nvoid empilhar(No*& topo, int valor) {\n  No* novo = new No;\n  novo->valor = valor;\n  novo->proximo = topo;\n  topo = novo;\n}`;

// Inicia o efeito de digitação após um pequeno delay
setTimeout(() => {
  document.querySelector('.typewriter').style.animation = 'none';
  setTimeout(() => {
    document.querySelector('.typewriter').style.animation = '';
  }, 10);
}, 3500);
