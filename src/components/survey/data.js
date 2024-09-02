// data.js
const partidoCores = {
    PV: "#0a860a",
    REDE: "#FF4500",
    PSD: "#716402",
    PT: "#FF0000",
    PP: "#0000FF",
    UNIÃO: "#0a60b3",
    Branco: "#FFFFFF",
    Nulo: "#737373"
};
// Lista de candidatos a vereador
const councilorOptions = [
    { nome: "ADINAEL CABELEIREIRO", partido: "PV", numero: 43333, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ADRIANA SINTAXE", partido: "REDE", numero: 18500, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ANA LAUREANO", partido: "PSD", numero: 55789, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "APARECIDA NAZÁRIO", partido: "PSD", numero: 55333, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "BATISTA RADICAL", partido: "PT", numero: 13676, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "BOSCO", partido: "REDE", numero: 18555, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "CANAMARY", partido: "REDE", numero: 18999, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "CICINHO DA ELETRONICA", partido: "PV", numero: 43555, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "CIDO MESSIAS", partido: "REDE", numero: 18789, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "CLENILDO TORRES", partido: "PP", numero: 11333, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "DIEGO MARENILSON", partido: "PT", numero: 13131, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "DJAILSON ELETRICISTA", partido: "UNIÃO", numero: 44555, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "DODA DA BELA VISTA", partido: "PSD", numero: 55123, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "DR ADAILTON", partido: "PSD", numero: 55888, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "DR JOÃO RAFAEL", partido: "PP", numero: 11123, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "EDINHO DO BODE", partido: "PSD", numero: 55111, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "EDU GONÇALVES", partido: "PP", numero: 11456, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ENEIDE CONSELHEIRA", partido: "PT", numero: 13223, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "FILHINHO DO CAIXÃO", partido: "UNIÃO", numero: 44888, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ISAAC COELHINHO", partido: "PP", numero: 11789, image: `${process.env.PUBLIC_URL}/isaac_coelhinho.png` },
    { nome: "JAILSON PÉ DE SERROTE", partido: "UNIÃO", numero: 44111, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JAILSON CELULAR", partido: "REDE", numero: 18777, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JANDUY", partido: "REDE", numero: 18000, image: `${process.env.PUBLIC_URL}/janduy_serafim.png` },
    { nome: "JESSYCA DE BAÚ", partido: "PSD", numero: 55345, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JOÃOZINHO DO POVO", partido: "UNIÃO", numero: 44400, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JOELMA FEITOSA", partido: "REDE", numero: 18666, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JULIANA (LIA)", partido: "UNIÃO", numero: 44945, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JULIANA DO CONSELHO", partido: "PV", numero: 43000, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "JUNIOR DA PADRE CICERO", partido: "PV", numero: 43133, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "KALLYANA DE LOURINHO", partido: "PP", numero: 11444, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "LENA DE OSVALDO", partido: "UNIÃO", numero: 44789, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "LUCIANA DA SAÚDE", partido: "REDE", numero: 18888, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "MARCELA DE DR RAIMUNDO", partido: "PV", numero: 43444, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "NANDO DE LAGOA DO MATO", partido: "PSD", numero: 55222, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "NAPOLIÃO FERNANDES", partido: "PP", numero: 11000, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "NARCISO TIDE", partido: "UNIÃO", numero: 44910, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "NILSÃO", partido: "PT", numero: 13000, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "PAI TIAGO", partido: "REDE", numero: 18222, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "PATRÍCIA DE LAGOA DO MATO", partido: "PSD", numero: 55456, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "PAULINHO DE KIKO", partido: "REDE", numero: 18123, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "PAULO MACIO", partido: "PSD", numero: 55575, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "PROFESSORA LUCIA MEDEIROS", partido: "PT", numero: 13123, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "RAQUEL FAUSTINO", partido: "PP", numero: 11112, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "RICARDO SABINO", partido: "PSD", numero: 55000, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "RICARDO SILVA", partido: "UNIÃO", numero: 44123, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "RODOLFO MORAIS", partido: "REDE", numero: 18444, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "RONNY DHAYSON", partido: "PSD", numero: 55555, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ROSA DE CAIANA", partido: "UNIÃO", numero: 44567, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ROSSANA PASSOS", partido: "PP", numero: 11111, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "RYAN COSTA", partido: "PP", numero: 11011, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "SI FERREIRA", partido: "PV", numero: 43456, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "SOLANGE AGENTE DE SAÚDE", partido: "PP", numero: 11234, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "TAMYRES SANTOS", partido: "PSD", numero: 55389, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "TOINHO MUCURANA", partido: "PT", numero: 13777, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "VALMIRA MACEDO", partido: "UNIÃO", numero: 44357, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "VANDERLLY ADESIVOS", partido: "PP", numero: 11321, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "VANILDO GUEDES", partido: "PP", numero: 11222, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "VITORINHA", partido: "UNIÃO", numero: 44444, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "WALDILEA", partido: "REDE", numero: 18100, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "ZÉ PEREIRA", partido: "UNIÃO", numero: 44000, image: `${process.env.PUBLIC_URL}/avatar_profile.png` },
    { nome: "Branco", partido: "", numero: "", image: `${process.env.PUBLIC_URL}/branco.png` },
    { nome: "Não Sei", partido: "", numero: "", image: `${process.env.PUBLIC_URL}/nao_sei.jpg` },
];



// Lista de candidatos a prefeito
const mayorOptions = [
    {
        nome: "CLAUDIO RÉGIS",
        partido: "PP",
        numero: 11,
        imagem: `${process.env.PUBLIC_URL}/claudio_regis.png`,
        cor: "#0754e4"  // Azul para Cláudio Régis
    },
    {
        nome: "GLEDS",
        partido: "REDE",
        numero: 18,
        imagem: `${process.env.PUBLIC_URL}/gledes.png`,
        cor: "#8b0000"  // Vermelho escuro para Gleds
    },
    {
        nome: "Não Sabe/ Não respondeu",


        partido: "",
        numero: "",
        imagem: `${process.env.PUBLIC_URL}/nao_sei.jpg`,
        cor: "#ffffff"  // isaac_coelhinho para opção isaac_coelhinho
    },
    {
        nome: "Nenhum/ Branco/ Nulo",
        partido: "",
        numero: "",
        imagem: `${process.env.PUBLIC_URL}/branco.png`,
        cor: "#ffffff"  // isaac_coelhinho para opção Nulo
    }
];


export {mayorOptions, councilorOptions, partidoCores};
