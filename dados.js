/* ============================================================
   DADOS EDITÁVEIS — Bistrô Retrô
   Edite apenas este arquivo para atualizar o site.
   Campos vazios ("") não aparecem; nada aqui foi inventado.
   Itens com demo:true são exemplos e mostram a etiqueta
   "Demonstração" — troque-os pelos dados reais e remova demo.
   ============================================================ */
window.DADOS = {
  nome: "Bistrô Retrô",
  cidade: "Franca",
  estado: "SP",
  url: "https://bistroretro.com",

  contato: {
    endereco: "",     // ex.: "Rua Exemplo, 123 – Centro, Franca – SP, 14400-000"
    whatsapp: "",     // só números com DDI+DDD, ex.: "5516999999999"
    telefone: "",     // texto livre, ex.: "(16) 3333-0000"
    instagram: ""     // usuário sem @, ex.: "bistroretro"
  },

  // Preencha "horas" (ex.: "18h às 23h" ou "Fechado") e mude confirmados para true
  horariosConfirmados: false,
  horarios: [
    { dia: "Segunda-feira", horas: "" },
    { dia: "Terça-feira",   horas: "" },
    { dia: "Quarta-feira",  horas: "" },
    { dia: "Quinta-feira",  horas: "" },
    { dia: "Sexta-feira",   horas: "" },
    { dia: "Sábado",        horas: "" },
    { dia: "Domingo",       horas: "" }
  ],

  // Prato do dia: defina ativo:true e preencha nome/descricao/preco
  pratoDoDia: { ativo: false, nome: "", descricao: "", preco: "" },

  // Promoções: { titulo:"", descricao:"", validade:"" }
  promocoes: [],

  // Preço no formato texto, ex.: "R$ 00,00". Deixe "" para ocultar.
  cardapio: [
    { id: "alacarte", nome: "À la carte", itens: [
      { nome: "Prato de demonstração", descricao: "Substitua pelo prato real do cardápio.", preco: "", demo: true } ] },
    { id: "massas", nome: "Massas", itens: [
      { nome: "Massa de demonstração", descricao: "Substitua pelo prato real do cardápio.", preco: "", demo: true } ] },
    { id: "risotos", nome: "Risotos", itens: [
      { nome: "Risoto de demonstração", descricao: "Substitua pelo prato real do cardápio.", preco: "", demo: true } ] },
    { id: "saladas", nome: "Saladas", itens: [
      { nome: "Salada de demonstração", descricao: "Substitua pelo prato real do cardápio.", preco: "", demo: true } ] },
    { id: "petiscos", nome: "Petiscos", itens: [
      { nome: "Petisco de demonstração", descricao: "Substitua pelo prato real do cardápio.", preco: "", demo: true } ] },
    { id: "sobremesas", nome: "Sobremesas", itens: [
      { nome: "Sobremesa de demonstração", descricao: "Substitua pelo prato real do cardápio.", preco: "", demo: true } ] }
  ],

  // Galeria: use só fotos autorizadas. src:"imagens/foto1.jpg" (vazio = espaço de demonstração)
  galeria: [
    { src: "", alt: "Salão do restaurante" },
    { src: "", alt: "Prato servido na mesa" },
    { src: "", alt: "Balcão do bar" },
    { src: "", alt: "Sobremesa" },
    { src: "", alt: "Ambiente à noite" },
    { src: "", alt: "Detalhe da decoração" }
  ]
};
