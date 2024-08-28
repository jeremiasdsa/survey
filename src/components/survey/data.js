// data.js

// Lista de candidatos a vereador
const councilorOptions = [
    { nome: "ADINAEL CABELEIREIRO", partido: "PV", numero: 43333 },
    { nome: "ADRIANA SINTAXE", partido: "REDE", numero: 18500 },
    { nome: "ANA LAUREANO", partido: "PSD", numero: 55789 },
    { nome: "APARECIDA NAZÁRIO", partido: "PSD", numero: 55333 },
    { nome: "BATISTA RADICAL", partido: "PT", numero: 13676 },
    { nome: "BOSCO", partido: "REDE", numero: 18555 },
    { nome: "CANAMARY", partido: "REDE", numero: 18999 },
    { nome: "CICINHO DA ELETRONICA", partido: "PV", numero: 43555 },
    { nome: "CIDO MESSIAS", partido: "REDE", numero: 18789 },
    { nome: "CLENILDO TORRES", partido: "PP", numero: 11333 },
    { nome: "DIEGO MARENILSON", partido: "PT", numero: 13131 },
    { nome: "DJAILSON ELETRICISTA", partido: "UNIÃO", numero: 44555 },
    { nome: "DODA DA BELA VISTA", partido: "PSD", numero: 55123 },
    { nome: "DR ADAILTON", partido: "PSD", numero: 55888 },
    { nome: "DR JOÃO RAFAEL", partido: "PP", numero: 11123 },
    { nome: "EDINHO DO BODE", partido: "PSD", numero: 55111 },
    { nome: "EDU GONÇALVES", partido: "PP", numero: 11456 },
    { nome: "ENEIDE CONSELHEIRA", partido: "PT", numero: 13223 },
    { nome: "FILHINHO DO CAIXÃO", partido: "UNIÃO", numero: 44888 },
    { nome: "ISAAC COELHINHO", partido: "PP", numero: 11789 },
    { nome: "JAILSON PÉ DE SERROTE", partido: "UNIÃO", numero: 44111 },
    { nome: "JAILSON CELULAR", partido: "REDE", numero: 18777 },
    { nome: "JANDUY", partido: "REDE", numero: 18000 },
    { nome: "JESSYCA DE BAÚ", partido: "PSD", numero: 55345 },
    { nome: "JOÃOZINHO DO POVO", partido: "UNIÃO", numero: 44400 },
    { nome: "JOELMA FEITOSA", partido: "REDE", numero: 18666 },
    { nome: "JULIANA (LIA)", partido: "UNIÃO", numero: 44945 },
    { nome: "JULIANA DO CONSELHO", partido: "PV", numero: 43000 },
    { nome: "JUNIOR DA PADRE CICERO", partido: "PV", numero: 43133 },
    { nome: "KALLYANA DE LOURINHO", partido: "PP", numero: 11444 },
    { nome: "LENA DE OSVALDO", partido: "UNIÃO", numero: 44789 },
    { nome: "LUCIANA DA SAÚDE", partido: "REDE", numero: 18888 },
    { nome: "MARCELA DE DR RAIMUNDO", partido: "PV", numero: 43444 },
    { nome: "NANDO DE LAGOA DO MATO", partido: "PSD", numero: 55222 },
    { nome: "NAPOLIÃO FERNANDES", partido: "PP", numero: 11000 },
    { nome: "NARCISO TIDE", partido: "UNIÃO", numero: 44910 },
    { nome: "NILSÃO", partido: "PT", numero: 13000 },
    { nome: "PAI TIAGO", partido: "REDE", numero: 18222 },
    { nome: "PATRÍCIA DE LAGOA DO MATO", partido: "PSD", numero: 55456 },
    { nome: "PAULINHO DE KIKO", partido: "REDE", numero: 18123 },
    { nome: "PAULO MACIO", partido: "PSD", numero: 55575 },
    { nome: "PROFESSORA LUCIA MEDEIROS", partido: "PT", numero: 13123 },
    { nome: "RAQUEL FAUSTINO", partido: "PP", numero: 11112 },
    { nome: "RICARDO SABINO", partido: "PSD", numero: 55000 },
    { nome: "RICARDO SILVA", partido: "UNIÃO", numero: 44123 },
    { nome: "RODOLFO MORAIS", partido: "REDE", numero: 18444 },
    { nome: "RONNY DHAYSON", partido: "PSD", numero: 55555 },
    { nome: "ROSA DE CAIANA", partido: "UNIÃO", numero: 44567 },
    { nome: "ROSSANA PASSOS", partido: "PP", numero: 11111 },
    { nome: "RYAN COSTA", partido: "PP", numero: 11011 },
    { nome: "SI FERREIRA", partido: "PV", numero: 43456 },
    { nome: "SOLANGE AGENTE DE SAÚDE", partido: "PP", numero: 11234 },
    { nome: "TAMYRES SANTOS", partido: "PSD", numero: 55389 },
    { nome: "TOINHO MUCURANA", partido: "PT", numero: 13777 },
    { nome: "VALMIRA MACEDO", partido: "UNIÃO", numero: 44357 },
    { nome: "VANDERLLY ADESIVOS", partido: "PP", numero: 11321 },
    { nome: "VANILDO GUEDES", partido: "PP", numero: 11222 },
    { nome: "VITORINHA", partido: "UNIÃO", numero: 44444 },
    { nome: "WALDILEA", partido: "REDE", numero: 18100 },
    { nome: "ZÉ PEREIRA", partido: "UNIÃO", numero: 44000 },
    { nome: "Branco", partido: "", numero: "" },
    { nome: "Nulo", partido: "", numero: "" },
];

// Lista de candidatos a prefeito
const mayorOptions = [
    {
        nome: "CLAUDIO RÉGIS",
        partido: "PP",
        numero: 11,
        imagem: `${process.env.PUBLIC_URL}/claudio_regis.png`,
        cor: "#1e90ff"  // Azul para Cláudio Régis
    },
    {
        nome: "GLEDS",
        partido: "REDE",
        numero: 18,
        imagem: `${process.env.PUBLIC_URL}/gledes.png`,
        cor: "#8b0000"  // Vermelho escuro para Gleds
    },
    {
        nome: "Branco",
        partido: "",
        numero: "",
        imagem: `${process.env.PUBLIC_URL}/branco.png`,
        cor: "#ffffff"  // Branco para opção Branco
    },
    {
        nome: "Nulo",
        partido: "",
        numero: "",
        imagem: `${process.env.PUBLIC_URL}/branco.png`,
        cor: "#ffffff"  // Branco para opção Nulo
    }
];

export {mayorOptions, councilorOptions};
