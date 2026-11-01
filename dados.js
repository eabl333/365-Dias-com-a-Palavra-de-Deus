/* Conteúdo dos estudos. Cada objeto = 1 dia.
   Campos: dia, titulo, tema, ref, texto, explicacao, reflexao, ensino, pergunta, oracao */
window.MESES = [
  { nome:"Janeiro",   tema:"Começando uma caminhada com Deus", dias:31 },
  { nome:"Fevereiro", tema:"Aprendendo a confiar",             dias:28 },
  { nome:"Março",     tema:"Fortalecendo a fé",                dias:31 },
  { nome:"Abril",     tema:"O amor e o perdão",                dias:30 },
  { nome:"Maio",      tema:"Sabedoria para viver",             dias:31 },
  { nome:"Junho",     tema:"Uma vida de oração",               dias:30 },
  { nome:"Julho",     tema:"Esperança em tempos difíceis",     dias:31 },
  { nome:"Agosto",    tema:"Família e relacionamentos",        dias:31 },
  { nome:"Setembro",  tema:"Coragem e perseverança",           dias:30 },
  { nome:"Outubro",   tema:"Conhecendo os ensinamentos de Jesus", dias:31 },
  { nome:"Novembro",  tema:"Gratidão e reconhecimento",        dias:30 },
  { nome:"Dezembro",  tema:"Renovação espiritual e compromisso com Deus", dias:31 }
];

window.MENSAGENS = [
  "Deus não tem pressa, mas nunca se atrasa. Caminhe hoje com o coração em paz.",
  "Um passo de fé hoje vale mais que mil planos adiados.",
  "A graça de Deus alcança você exatamente onde você está.",
  "Seja constante: pequenas sementes diárias produzem grandes colheitas.",
  "Entregue o seu dia ao Senhor antes de entregá-lo às preocupações.",
  "Você não caminha sozinho(a); o Pastor vai à frente.",
  "Gratidão transforma o ordinário em milagre."
];

window.DIAS = [
  {
    dia:1, titulo:"O Senhor é o meu Pastor", tema:"Fé e confiança em Deus",
    ref:"Salmos 23:1",
    texto:"O Senhor é o meu pastor, nada me faltará.",
    explicacao:"O Salmo 23 é atribuído a Davi, que foi pastor de ovelhas antes de ser rei. Ele usa a imagem do pastor para descrever o cuidado pessoal de Deus: quem guia, sustenta e protege.",
    reflexao:"Começar o ano dizendo “o Senhor é o MEU pastor” é um ato de entrega. Em meio a contas, decisões e incertezas, lembrar quem conduz a sua vida muda a forma como você caminha.",
    ensino:"Quem tem Deus como Pastor pode descansar: o cuidado dele não depende da nossa força.",
    pergunta:"Em qual área da minha vida eu ainda tento ser o pastor de mim mesmo(a)?",
    oracao:"Senhor, hoje reconheço que o Senhor é o meu Pastor. Conduze os meus passos, supre as minhas necessidades e ensina-me a descansar no teu cuidado. Em nome de Jesus, amém."
  },
  {
    dia:2, titulo:"Confiar de todo o coração", tema:"Provérbios",
    ref:"Provérbios 3:5-6",
    texto:"Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    explicacao:"O livro de Provérbios reúne instruções de sabedoria. Esta passagem contrasta duas fontes de direção: o entendimento humano, limitado, e a orientação de Deus, que enxerga o caminho inteiro.",
    reflexao:"Confiar não significa deixar de pensar, mas colocar Deus antes dos nossos cálculos. Antes de decidir, ore; antes de agir, escute.",
    ensino:"Reconhecer a Deus em todos os caminhos é incluí-lo nas decisões grandes e nas pequenas.",
    pergunta:"Qual decisão desta semana eu ainda não entreguei a Deus em oração?",
    oracao:"Pai, ensina-me a confiar em ti de todo o coração. Quando eu não entender, que eu não me apoie apenas em mim, mas em tua sabedoria. Endireita as minhas veredas. Amém."
  },
  {
    dia:3, titulo:"Um amor que se entrega", tema:"Ensinamentos de Jesus",
    ref:"João 3:16",
    texto:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    explicacao:"Dito por Jesus a Nicodemos, este versículo resume o evangelho: a iniciativa é do amor de Deus, o meio é o dom do Filho e a resposta humana é a fé.",
    reflexao:"Antes de qualquer esforço nosso, já havia um amor que se doou. Receber esse amor liberta da necessidade de merecer o afeto de Deus.",
    ensino:"A salvação começa no amor de Deus e é recebida pela fé em Jesus.",
    pergunta:"Tenho vivido como alguém que precisa conquistar o amor de Deus ou como alguém que já o recebeu?",
    oracao:"Senhor Jesus, obrigado por tanto amor. Ajuda-me a receber a tua graça e a compartilhar esse amor com quem está ao meu redor. Amém."
  },
  {
    dia:4, titulo:"Ansiedade entregue, paz recebida", tema:"Paz",
    ref:"Filipenses 4:6-7",
    texto:"Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentidos em Cristo Jesus.",
    explicacao:"Paulo escreveu aos filipenses estando preso. Mesmo assim, ele ensina uma receita simples: levar tudo a Deus em oração, com gratidão, e receber em troca uma paz que guarda a mente e o coração.",
    reflexao:"A paz de Deus não depende de o problema desaparecer primeiro. Ela vem como guarda sobre o coração enquanto a situação ainda está em curso.",
    ensino:"Oração com gratidão substitui a ansiedade pela paz de Deus.",
    pergunta:"O que me tira a paz hoje e que eu posso apresentar a Deus agora, em oração?",
    oracao:"Pai, entrego a ti as minhas preocupações. Recebo a tua paz, que excede o entendimento, e agradeço por tudo o que já fizeste. Amém."
  },
  {
    dia:5, titulo:"Coragem porque Deus é contigo", tema:"Coragem",
    ref:"Josué 1:9",
    texto:"Não to mandei eu? Esforça-te, e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor teu Deus é contigo, por onde quer que andares.",
    explicacao:"Deus fala a Josué, que assumia a liderança de Israel após Moisés. O motivo da coragem não é a capacidade de Josué, mas a promessa da presença de Deus.",
    reflexao:"Coragem bíblica não é ausência de medo, é decidir avançar porque Deus está junto. Ele vai com você ao trabalho, à consulta, à conversa difícil.",
    ensino:"A presença de Deus é o fundamento da verdadeira coragem.",
    pergunta:"Que passo eu venho adiando por medo e que posso dar hoje confiando na presença de Deus?",
    oracao:"Senhor, tira de mim o medo que paralisa. Faz-me forte e corajoso(a), sabendo que estás comigo por onde eu andar. Amém."
  }
];