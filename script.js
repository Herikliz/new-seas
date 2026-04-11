const firebaseConfig = {
  apiKey: "AIzaSyDG9zDcphqyTfXXZBWc0-uRV74eeie_tEE",
  authDomain: "new-seas.firebaseapp.com",
  projectId: "new-seas",
  storageBucket: "new-seas.firebasestorage.app",
  messagingSenderId: "551983006255",
  appId: "1:551983006255:web:29dae15ad04dabff7afcda"
};

let db = null;
let isFirebaseReady = false;

let isReadOnly = false;
const ADMIN_PASSWORD = "Ben10";

let currentDocId = ''; 
document.getElementById('doc-id').value = currentDocId;

const ilhasFixas = {
  "East Blue": ["Base da Marinha G-03", "Clockwork", "Conomi", "Cozia", "Dawn", "Gecko", "Goat", "Ilha dos Animais Raros", "Ilha Navio de Guerra", "Ilha Shimotsuki", "Kumate", "Mirrorball", "Organ", "Oykot", "Polestar", "Tequila Wolf", "Yotsuba"],
  "West Blue": ["Ballywood", "Base da Marinha G-12", "God Valley", "Ilusia", "Kano", "Las Camp", "Ohara", "Soja", "Thriller Bark", "Toroa"],
  "North Blue": ["Base da Marinha G-11", "Deul", "Downs", "Flevance", "Kuen", "Lvneel", "Minion", "Notice", "Polo Norte", "Rakesh", "Rubeck", "Spider Miles", "Swallow", "Welbems", "Whiteland"],
  "South Blue": ["Base da Marinha G-10", "Baterilla", "Briss", "Centaurea", "Karate", "Kutsukku", "Reino Negro de Drum", "Roshwan", "Samba", "Samuwanai", "Sorbet", "Taya", "Torino", "Tumi", "Vespa"],
  "Paraíso": ["Baltigo", "Banaro", "Base da Marinha G-02", "Base da Marinha G-08", "Boin", "Cactus", "Corrente Tarai", "Base da Marinha G-01", "Enies Lobby", "Drum", "Foolshout", "Ilha Spa", "Jaya", "Skypiea", "Karakuri", "Kenzan", "Kuraigana", "Kyuka", "Little Garden", "Long Ring Long Land", "Lulusia", "Mary Geoise", "Merveille", "Momoiro", "Namakura", "Nanimonai", "Pucci", "Sabaody", "Ilha dos Homens-Peixe", "San Faldo", "Sandy", "Water 7"],
  "Novo Mundo": ["Applenine", "Green Bit", "Mystoria", "Prodence", "Whole Cake", "Yukiryu", "Base da Marinha G-09", "Base da Marinha G-13", "Base da Marinha G-14", "Base da Marinha G-15", "Dressrosa", "Egghead", "Punk Hazard", "Elbaf", "Foodvalten", "Hachinosu", "Raijin", "Risky Red", "Wano"],
  "Calm Belt": ["Amazon Lily", "Rusukaina", "Shitsurakujima", "Base da Marinha G-04", "Base da Marinha G-05", "Base da Marinha G-06", "Base da Marinha G-07", "Impel Down"],
  "Localização Desconhecida": ["Arkham Island", "Gran Tesoro", "Ilha do Sol", "Atlantis", "Zou"],
};

const akumasFixas = {
  "Paramecia": ["Awa Awa no Mi", "Baku Baku no Mi", "Bane Bane no Mi", "Bara Bara no Mi", "Bari Bari no Mi", "Bata Bata no Mi", "Beri Beri no Mi", "Beta Beta no Mi", "Bijo Bijo no Mi", "Bisu Bisu no Mi", "Bomu Bomu no Mi", "Buki Buki no Mi", "Buku Buku no Mi", "Chiyu Chiyu no Mi", "Choki Choki no Mi", "Deka Deka no Mi", "Dero Dero no Mi", "Doa Doa no Mi", "Doku Doku no Mi", "Doru Doru no Mi", "Fude Fude no Mi", "Fuku Fuku no Mi", "Fuwa Fuwa no Mi", "Gabu Gabu no Mi", "Gasha Gasha no Mi", "Gatsu Gatsu no Mi", "Genso Genso no Mi", "Giro Giro no Mi", "Gocha Gocha no Mi", "Goe Goe no Mi", "Gomu Gomu no Mi", "Goru Goru no Mi", "Gura Gura no Mi", "Guru Guru no Mi", "Gutsu Gutsu no Mi", "Hana Hana no Mi", "Hemo Hemo no Mi", "Hira Hira no Mi", "Hiso Hiso no Mi", "Hobi Hobi no Mi", "Hone Hone no Mi", "Horo Horo no Mi", "Horu Horu no Mi", "Hoya Hoya no Mi", "Iro Iro no Mi", "Ishi Ishi no Mi", "Ito Ito no Mi", "Jake Jake no Mi", "Jara Jara no Mi", "Jiki Jiki no Mi", "Juku Juku no Mi", "Kachi Kachi no Mi", "Kage Kage no Mi", "Kama Kama no Mi", "Kegawa Kegawa no Mi", "Kesshō Kesshō no Mi", "Kibi Kibi no Mi", "Kira Kira no Mi", "Kiro Kiro no Mi", "Kobu Kobu no Mi", "Kon Kon no Mi", "Koro Koro no Mi", "Kuku Kuku no Mi", "Kuri Kuri no Mi", "Kyubu Kyubu no Mi", "Maki Maki no Mi", "Mane Mane no Mi", "Mato Mato no Mi", "Memo Memo no Mi", "Mero Mero no Mi", "Mini Mini no Mi", "Mira Mira no Mi", "Moa Moa no Mi", "Modo Modo no Mi", "Mosa Mosa no Mi", "Muchi Muchi no Mi", "Nagi Nagi no Mi", "Nawa Nawa no Mi", "Nemu Nemu no Mi", "Netsu Netsu no Mi", "Nikyu Nikyu no Mi", "Noko Noko no Mi", "Noku Noku no Mi", "Nomi Nomi no Mi", "Nori Nori no Mi", "Noro Noro no Mi", "Nui Nui no Mi", "Nuke Nuke no Mi", "Ope Ope no Mi", "Ori Ori no Mi", "Oshi Oshi no Mi", "Oto Oto no Mi", "Pamu Pamu no Mi", "Pero Pero no Mi", "Peto Peto no Mi", "Poke Poke no Mi", "Rashin Rashin no Mi", "Riki Riki no Mi", "Sabi Sabi no Mi", "Shari Shari no Mi", "Shibo Shibo no Mi", "Shiku Shiku no Mi", "Shima Shima no Mi", "Shiro Shiro no Mi", "Soru Soru no Mi", "Sube Sube no Mi", "Sui Sui no Mi", "Suji Suji no Mi", "Suke Suke no Mi", "Supa Supa no Mi", "Toge Toge no Mi", "Toki Toki no Mi", "Ton Ton no Mi", "Toshi Toshi no Mi", "Tsutsu Tsutsu no Mi", "Uta Uta no Mi", "Wapu Wapu no Mi", "Wara Wara no Mi", "Woshu Woshu no Mi", "Yomi Yomi no Mi", "Zushi Zushi no Mi"],
  "Paramecia Especial": ["Karan Karan no Mi", "Mochi Mochi no Mi"],
  "Logia": ["Ame Ame no Mi", "Chikyū Chikyū no Mi", "Gasu Gasu no Mi", "Goro Goro no Mi", "Hie Hie no Mi", "Kaze Kaze no Mi", "Kumo Kumo no Mi", "Magu Magu no Mi", "Mera Mera no Mi", "Moku Moku no Mi", "Mori Mori no Mi", "Numa Numa no Mi", "Pasa Pasa no Mi", "Pika Pika no Mi", "Suna Suna no Mi", "Susu Susu no Mi", "Toro Toro no Mi", "Yami Yami no Mi", "Yuki Yuki no Mi"],
  "Zoan": ["Batto Batto no Mi", "Gama Gama no Mi", "Hebi Hebi no Mi, Modelo: Anaconda", "Hebi Hebi no Mi, Modelo: Cobra-Real", "Hito Hito no Mi", "Inu Inu no Mi, Modelo: Cão de Caça", "Inu Inu no Mi, Modelo: Cão-Guaxinim", "Inu Inu no Mi, Modelo: Chacal", "Inu Inu no Mi, Modelo: Dachshund", "Inu Inu no Mi, Modelo: Lobo", "Kame Kame no Mi", "Mogu Mogu no Mi", "Mushi Mushi no Mi, Modelo: Besouro-Rinoceronte", "Mushi Mushi no Mi, Modelo: Vespa-Mandarina", "Neko Neko no Mi, Modelo: Leão", "Neko Neko no Mi, Modelo: Leopardo", "Neko Neko no Mi, Modelo: Pantera Negra", "Neko Neko no Mi, Modelo: Tigre de Bengala", "Rako Rako no Mi", "Sara Sara no Mi, Modelo: Axolote", "Tama Tama no Mi", "Tori Tori no Mi, Modelo: Águia", "Tori Tori no Mi, Modelo: Albatroz", "Tori Tori no Mi, Modelo: Falcão", "Uma Uma no Mi", "Usagi Usagi no Mi", "Ushi Ushi no Mi, Modelo: Bisão", "Ushi Ushi no Mi, Modelo: Girafa", "Ushi Ushi no Mi, Modelo: Rinoceronte", "Zou Zou no Mi"],
  "Zoan Ancestral": ["Kumo Kumo no Mi, Modelo: Rosamygale grauvogeli", "Neko Neko no Mi, Modelo: Tigre Dentes de Sabre", "Ryū Ryū no Mi, Modelo: Alossauro", "Ryū Ryū no Mi, Modelo: Braquiossauro", "Ryū Ryū no Mi, Modelo: Espinossauro", "Ryū Ryū no Mi, Modelo: Paquicefalossauro", "Ryū Ryū no Mi, Modelo: Pteranodonte", "Ryū Ryū no Mi, Modelo: Triceratops", "Zou Zou no Mi, Modelo: Mamute"],
  "Zoan Mítica": ["Batto Batto no Mi, Modelo: Vampiro", "Hebi Hebi no Mi, Modelo: Kaijū", "Hebi Hebi no Mi, Modelo: Yamata no Orochi", "Hito Hito no Mi, Modelo: Daibutsu", "Hito Hito no Mi, Modelo: O Anfitrião", "Hito Hito no Mi, Modelo: Ōnyūdō", "Inu Inu no Mi, Modelo: Bake-Danuki", "Inu Inu no Mi, Modelo: Cérbero", "Inu Inu no Mi, Modelo: Ōkuchi no Makami", "Inu Inu no Mi, Modelo: Raposa de Nove Caudas", "Ryū Ryū no Mi, Modelo: Dragão Ocidental", "Ryū Ryū no Mi, Modelo: Kirin", "Saru Saru no Mi, Modelo: Sun Wukong", "Tori Tori no Mi, Modelo: Fênix", "Tori Tori no Mi, Modelo: Nue", "Tori Tori no Mi, Modelo: Pássaro de Cinzas", "Tori Tori no Mi, Modelo: Pássaro de Gelo", "Tori Tori no Mi, Modelo: Thunderbird", "Uma Uma no Mi, Modelo: Pégaso", "Uo Uo no Mi, Modelo: Carpa Seiryū"],
};

const baseClassesList = ["Arqueólogo", "Artista", "Atirador", "Carpinteiro", "Cientista", "Combatente", "Cozinheiro", "Ferreiro", "Inventor", "Médico", "Musicista", "Navegador"];
const racas = { "Braços Longos":{f:.40}, "Bucaneiro":{f:.40,r:.40}, "Gigante":{f:.30,r:.30,v:-.15}, "Humano":{}, "Kuja":{}, "Kumate":{d:.40}, "Lunariano":{v:.35,r:.45}, "Meio-Gigante":{f:.25,r:.25}, "Mink":{v:.15,r:.15}, "Oni":{f:.35,r:.45}, "Pernas Longas":{v:.40}, "Povo do Céu: Birkan":{d:.20,v:.20}, "Povo do Céu: Shandia":{d:.20,v:.20}, "Povo do Céu: Skypieano":{d:.20,v:.20}, "Sereiano":{v:.40}, "Tontatta":{f:.20,v:.20}, "Três-Olhos":{v:.15,r:.15}, "Tritão":{f:.20,r:.20,v:.30}, "Wotan":{f:.25,r:.25} };
const linhagens = { "Nenhuma":{}, "Augur":{v:.10,d:.20,req:["Humano"]}, "Barnum":{req:["Braços Longos","Pernas Longas","Kumate","Três-Olhos"]}, "Beckman":{d:.20,v:.15,ho:.15,req:["Humano"]}, "Boa":{f:.15,ha:.15,req:["Kuja"]}, "Capone":{v:.10,d:.15,req:["Humano"]}, "Charlotte":{charlotte:true}, "Chinjao":{f:.15,r:.15,req:["Humano"]}, "D.":{}, "Dracule":{d:.20,ho:.10,req:["Humano"]}, "Drole":{f:.20,r:.10,v:.10,req:["Gigante","Meio-Gigante","Wotan"]}, "Família do Sol":{f:.15,r:.15,req:["Tritão","Sereiano","Wotan"]}, "Gan":{esp:.15,req:["Povo do Céu: Birkan","Povo do Céu: Shandia","Povo do Céu: Skypieano"]}, "Kong":{req:["Humano"]}, "Kozuki":{v:.10,d:.10,esp:.10,req:["Humano"]}, "Kurozumi":{v:.10,d:.20,req:["Humano"]}, "Laufey":{f:.15,r:.15,v:-.5,req:["Gigante"]}, "Mokomo":{v:.10,req:["Mink"]}, "Nefertari":{d:.15,v:.15,req:["Humano"]}, "Neptune":{v:.25,req:["Sereiano"]}, "Newgate":{f:.10,r:.20,req:["Humano","Meio-Gigante"]}, "Sakazuki":{r:.10,f:.20,req:["Humano"]}, "Silvers":{esp:.15,req:["Humano"]}, "Tenryūbito: Família Donquixote":{d:.15,ami:.15,req:["Humano"]}, "Tenryūbito: Família Figarland":{d:.15,esp:.15,req:["Humano"]} };

const habilidadesExclusivasDict = {
    "Arte da Esgrima": "+10% em Destreza quando tiver 5.000 pontos (15% aos 10k, 20% aos 15k). -20% de gasto de Estamina.",
    "Batedor de Carteiras": "+15% em Destreza quando tiver 5.000 pontos (20% aos 10k, 25% aos 15k).",
    "Caminho do Atirador": "+5% em Destreza quando tiver 5.000 pontos (10% aos 10k, 15% aos 15k). +10% em Destreza ao atirar com armas de fogo (15% aos 10k, 20% aos 15k).",
    "Constituição Única": "+10% de Força e +15% de Resistência.",
    "Contração Muscular": "+10% de Força e Resistência quando tiver 5.000 pontos (20% aos 10k).",
    "Espírito Contagiante": "Aliados recebem um bônus passivo de +5% em todos os atributos.",
    "Favoritismo Armista": "Aos 10.000: Ao empunhar criações: +10% R e V, e F ou D. Aos 15.000: Bônus massivos de R, V, Dano e Redução de Dano.",
    "Filho do Mar": "+5% em Reflexo e Resistência aos 5.000 (10% aos 10k, 15% aos 15k).",
    "Flexibilidade": "+10% em Velocidade aos 5.000 (20% aos 10k).",
    "Fúria Ardente": "+5% em Força aos 5.000 (10% aos 10k, 15% aos 15k).",
    "O Escolhido": "+5% em todos os tipos de Haki aos 5.000 (10% aos 10k, 15% aos 20k).",
    "Pensamento Acelerado": "+20% em Reflexo aos 5.000 (25% aos 10k).",
    "Último Recurso": "Habilidade oculta.",
    "Vontade Inabalável": "Habilidade oculta.",
    "Treinamento de Cavaleiro": "Habilidade oculta.",
    "QI Avançado": "O gasto de estamina é reduzido em 50%. Caso dure mais de 3 turnos, Reflexos aumentados em 5%."
};

const linhagemHabilidades = {
    "Dracule": ["Arte da Esgrima"], "Capone": ["Batedor de Carteiras"], "Augur": ["Caminho do Atirador"], "Drole": ["Constituição Única"], "Laufey": ["Constituição Única", "Vontade Inabalável"], "Mokomo": ["Constituição Única", "Vontade Inabalável"], "Newgate": ["Contração Muscular", "Espírito Contagiante"], "Kozuki": ["Favoritismo Armista"], "Kurozumi": ["Favoritismo Armista"], "Neptune": ["Filho do Mar", "Flexibilidade"], "Boa": ["Flexibilidade"], "Sakazuki": ["Fúria Ardente"], "Silvers": ["O Escolhido", "Pensamento Acelerado"], "D.": ["Espírito Contagiante", "Vontade Inabalável"], "Gan": ["Treinamento de Cavaleiro"], "Beckman": ["QI Avançado"]
};

const allStyles = ["Nenhum", "Armadilha de Cores", "Arsenal", "Arte do Tempo", "Artista Marcial", "Atirador", "Black Cat", "Boujutsu", "Boxe", "Combate Gigante", "Combate Tontatta", "Cortes Precisos", "Electro", "Escultura de Forma", "Fencing", "Freestyle", "Fúria das Marés", "Galaxy Combat", "Hasshoken", "Impacto Estrutural", "Instinto Animal", "Jao Kun Dō", "Karatê Homem-Peixe", "Kitsunebi-ryū", "Kozuki-Nitōryū", "Kung Fu", "Melodia Impactante", "Mutōryū", "Ninjutsu", "Okama Kenpō", "Paladino", "Perna Negra", "Punchstyle", "Punho Suave", "Ranger", "Rokushiki", "Rope Action", "Seimei Kikan", "Sinfonia Ilusória", "Stinstyle", "Sumô", "Swordstyle", "Tōryū", "Yaristyle"];
const classStyles = {"Arqueólogo":["Instinto Animal"],"Artista":["Armadilha de Cores","Escultura de Forma"],"Atirador":["Atirador"],"Carpinteiro":["Impacto Estrutural","Rope Action"],"Cientista":["Punho Suave"],"Combatente":["Freestyle"],"Cozinheiro":["Cortes Precisos","Perna Negra"],"Ferreiro":["Impacto Estrutural","Rope Action"],"Inventor":["Impacto Estrutural","Rope Action"],"Médico":["Punho Suave"],"Musicista":["Melodia Impactante","Sinfonia Ilusória"],"Navegador":["Arte do Tempo","Fúria das Marés"]};

const patenteGender = {
  "Aprendiz": {m: "Aprendiz", f: "Aprendiz"},
  "Marinheiro": {m: "Marinheiro", f: "Marinheira"},
  "Cabo": {m: "Cabo", f: "Cabo"},
  "Sargento": {m: "Sargento", f: "Sargento"},
  "Tenente": {m: "Tenente", f: "Tenente"},
  "Comandante": {m: "Comandante", f: "Comandante"},
  "Capitão": {m: "Capitão", f: "Capitã"},
  "Comodoro": {m: "Comodoro", f: "Comodoro"},
  "Contra-Almirante": {m: "Contra-Almirante", f: "Contra-Almirante"},
  "Vice-Almirante": {m: "Vice-Almirante", f: "Vice-Almirante"},
  "Almirante": {m: "Almirante", f: "Almirante"},
  "Almirante-de-Frota": {m: "Almirante-de-Frota", f: "Almirante-de-Frota"},
  "Agente Judicial": {m: "Agente Judicial", f: "Agente Judicial"},
  "CP-1": {m: "CP-1", f: "CP-1"},
  "CP-2": {m: "CP-2", f: "CP-2"},
  "CP-3": {m: "CP-3", f: "CP-3"},
  "CP-4": {m: "CP-4", f: "CP-4"},
  "CP-5": {m: "CP-5", f: "CP-5"},
  "CP-6": {m: "CP-6", f: "CP-6"},
  "CP-7": {m: "CP-7", f: "CP-7"},
  "CP-8": {m: "CP-8", f: "CP-8"},
  "CP-9": {m: "CP-9", f: "CP-9"},
  "CP-0": {m: "CP-0", f: "CP-0"},
  "Gorosei": {m: "Gorosei", f: "Gorosei"},
  "Líder do Governo": {m: "Líder do Governo", f: "Líder do Governo"}
};

const baseClassGender = {
  "Arqueólogo": {m: "Arqueólogo", f: "Arqueóloga"},
  "Artista": {m: "Artista", f: "Artista"},
  "Atirador": {m: "Atirador", f: "Atiradora"},
  "Carpinteiro": {m: "Carpinteiro", f: "Carpinteira"},
  "Cientista": {m: "Cientista", f: "Cientista"},
  "Combatente": {m: "Combatente", f: "Combatente"},
  "Cozinheiro": {m: "Cozinheiro", f: "Cozinheira"},
  "Ferreiro": {m: "Ferreiro", f: "Ferreira"},
  "Inventor": {m: "Inventor", f: "Inventora"},
  "Médico": {m: "Médico", f: "Médica"},
  "Musicista": {m: "Musicista", f: "Musicista"},
  "Navegador": {m: "Navegador", f: "Navegadora"}
};

const classTitles = {
  "Arqueólogo": [{m:"Aprendiz de Arqueologia",f:"Aprendiz de Arqueologia"},{m:"Historiador",f:"Historiadora"},{m:"Mestre de Artefatos",f:"Mestra de Artefatos"},{m:"Dominante da História",f:"Dominante da História"},{m:"Guru",f:"Guru"}],
  "Artista": [{m:"Ilustrador",f:"Ilustradora"},{m:"Empresário",f:"Empresária"},{m:"Estilista de Mil Faces",f:"Estilista de Mil Faces"},{m:"Escultor de Símbolos",f:"Escultora de Símbolos"},{m:"Patrono do Mundo",f:"Patrona do Mundo"}],
  "Atirador": [{m:"Atirador Iniciante",f:"Atiradora Iniciante"},{m:"Atirador de Precisão",f:"Atiradora de Precisão"},{m:"Atirador de Elite",f:"Atiradora de Elite"},{m:"Criador Bélico",f:"Criadora Bélica"},{m:"Rambo",f:"Rambo"}],
  "Carpinteiro": [{m:"Aprendiz da Madeira",f:"Aprendiz da Madeira"},{m:"Construtor de Bordo",f:"Construtora de Bordo"},{m:"Engenheiro Naval",f:"Engenheira Naval"},{m:"Mestre da Madeira",f:"Mestra da Madeira"},{m:"Irmão à Obra",f:"Irmã à Obra"}],
  "Cientista": [{m:"Estudioso",f:"Estudiosa"},{m:"Biólogo",f:"Bióloga"},{m:"Bioengenheiro",f:"Bioengenheira"},{m:"Alquimista",f:"Alquimista"},{m:"Gênio Científico",f:"Gênia Científica"}],
  "Combatente": [{m:"Discípulo do Punho",f:"Discípula do Punho"},{m:"Guerreiro de Aço",f:"Guerreira de Aço"},{m:"Mestre da Guerra",f:"Mestra da Guerra"},{m:"Doutrinador Marcial",f:"Doutrinadora Marcial"},{m:"Colosso",f:"Colosso"}],
  "Cozinheiro": [{m:"Garçom",f:"Garçonete"},{m:"Especialista Culinário",f:"Especialista Culinária"},{m:"Nutricionista",f:"Nutricionista"},{m:"Chef",f:"Chef"},{m:"Mestre do Paladar",f:"Mestra do Paladar"}],
  "Ferreiro": [{m:"Artesão",f:"Artesã"},{m:"Forjador de Imperfeições",f:"Forjadora de Imperfeições"},{m:"Forjador de Lendas Menores",f:"Forjadora de Lendas Menores"},{m:"Mestre das Lâminas",f:"Mestra das Lâminas"},{m:"Forjador Supremo",f:"Forjadora Suprema"}],
  "Inventor": [{m:"Improvisador",f:"Improvisadora"},{m:"Mecânico",f:"Mecânica"},{m:"Arquitetônico",f:"Arquitetônica"},{m:"Condutor",f:"Condutora"},{m:"Artífice",f:"Artífice"}],
  "Médico": [{m:"Clínico de Campo",f:"Clínica de Campo"},{m:"Cirurgião",f:"Cirurgiã"},{m:"Biomédico Avançado",f:"Biomédica Avançada"},{m:"Mestre da Vida",f:"Mestra da Vida"},{m:"Apóstolo da Cura",f:"Apóstola da Cura"}],
  "Musicista": [{m:"Sonante",f:"Sonante"},{m:"Celebridade Local",f:"Celebridade Local"},{m:"Pop Star",f:"Pop Star"},{m:"Ídolo Mundial",f:"Ídolo Mundial"},{m:"Imperador Sonoro",f:"Imperatriz Sonora"}],
  "Navegador": [{m:"Marujo",f:"Maruja"},{m:"Cartógrafo",f:"Cartógrafa"},{m:"Timoneiro",f:"Timoneira"},{m:"Capitão dos Ventos",f:"Capitã dos Ventos"},{m:"Semipeixe",f:"Semipeixe"}]
};

const salarios = {"Aprendiz":0,"Marinheiro":10000000,"Cabo":20000000,"Sargento":30000000,"Tenente":40000000,"Comandante":50000000,"Capitão":60000000,"Comodoro":80000000,"Contra-Almirante":90000000,"Vice-Almirante":100000000,"Almirante":150000000,"Almirante-de-Frota":200000000,"Agente Judicial":10000000,"CP-1":20000000,"CP-2":30000000,"CP-3":40000000,"CP-4":50000000,"CP-5":60000000,"CP-6":70000000,"CP-7":80000000,"CP-8":100000000,"CP-9":150000000,"CP-0":200000000,"Gorosei":500000000,"Líder do Governo":0};

let charData = {
  password: "",
  pcs: []
};
let activePcIndex = 0;
let activeNpcIndex = -1;
let currentChar = null;

function createEmptyChar(isNPC) {
    return {
        isNPC: isNPC,
        name: "",
        info: {},
        tecnicasList: [],
        logList: [],
        stats: { f: 0, d: 0, r: 0, v: 0, esp: 0, ami: 0 },
        substats: { refl: 0, vcorp: 0, hArm: 0, hObs: 0, hRei: 0, amiAlc: 0, amiDur: 0, amiPot: 0, amiVel: 0 }
    };
}

function switchChar(pIdx, nIdx) {
    activePcIndex = pIdx;
    activeNpcIndex = nIdx;
    currentChar = nIdx === -1 ? charData.pcs[pIdx].pc : charData.pcs[pIdx].npcs[nIdx];
    renderTabs();
    updateUI();
    renderTecnicas();
    renderNpcsComuns();
    renderNpcsEspeciais();
    renderLogs();
    toggleEditability();
}

function addPC() {
    charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
    saveData();
    switchChar(charData.pcs.length - 1, -1);
}

function addNPC(pIdx) {
    charData.pcs[pIdx].npcs.push(createEmptyChar(true));
    saveData();
    switchChar(pIdx, charData.pcs[pIdx].npcs.length - 1);
}

function renderTabs() {
    const container = document.getElementById('char-tabs-container');
    let html = '';
    charData.pcs.forEach((pcObj, pIdx) => {
        html += `<div class="char-row">`;
        let pcName = pcObj.pc.name.trim() === "" ? `Personagem ${pIdx + 1}` : pcObj.pc.name;
        let pcActive = (pIdx === activePcIndex && activeNpcIndex === -1) ? 'active' : '';
        html += `<button class="btn-tab ${pcActive}" onclick="switchChar(${pIdx}, -1)">${pcName}</button>`;
        
        pcObj.npcs.forEach((npc, nIdx) => {
            let npcName = npc.name.trim() === "" ? `NPC ${nIdx + 1}` : npc.name;
            let npcActive = (pIdx === activePcIndex && nIdx === activeNpcIndex) ? 'active' : '';
            html += `<button class="btn-tab npc-tab ${npcActive}" onclick="switchChar(${pIdx}, ${nIdx})">${npcName}</button>`;
        });
        html += `<button class="btn-add" onclick="addNPC(${pIdx})" title="Adicionar NPC">+</button>`;
        html += `</div>`;
    });
    html += `<div style="display: flex; gap: 10px; margin-top: 5px;">
                <button class="btn-add btn-add-pc" onclick="addPC()">+ Personagem</button>
                <button class="btn-add btn-add-pc" style="border-color: var(--danger); color: var(--danger);" onclick="deleteCurrentChar()">🗑️ Apagar Selecionado</button>
             </div>`;
    container.innerHTML = html;
}

async function deleteCurrentChar() {
    if (isReadOnly) {
        await customAlert("Você está no modo de leitura. Não é possível apagar.");
        return;
    }

    if (charData.password && charData.password.trim() !== "") {
        let pwd = await customPrompt("Digite a senha da ficha para confirmar a exclusão:");
        if (pwd !== charData.password && pwd !== ADMIN_PASSWORD) {
            if (pwd !== null) await customAlert("Senha incorreta! Exclusão cancelada.");
            return;
        }
    } else {
        let pwd = await customPrompt("A ficha não tem senha. Digite 'SIM' para confirmar a exclusão:");
        if (pwd !== "SIM" && pwd !== "sim") {
            return;
        }
    }

    if (activeNpcIndex !== -1) {
        charData.pcs[activePcIndex].npcs.splice(activeNpcIndex, 1);
        activeNpcIndex = -1;
    } else {
        charData.pcs.splice(activePcIndex, 1);
        if (charData.pcs.length === 0) {
            charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
        }
        activePcIndex = 0;
        activeNpcIndex = -1;
    }

    currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
    saveData();
    renderTabs();
    renderTecnicas();
    renderNpcsComuns();
    renderNpcsEspeciais();
    renderLogs();
    updateUI();
    toggleEditability();
    await customAlert("Apagado com sucesso!");
}

function getClassDisplayName(baseClassWithLevel, sexo) {
    if (!baseClassWithLevel) return "";
    let match = baseClassWithLevel.match(/(.+) (\d+)/);
    if (!match) return baseClassWithLevel; 
    let baseClass = match[1];
    let lvl = parseInt(match[2]);
    let gender = (sexo === 'Feminino') ? 'f' : 'm';
    
    let cName = baseClassGender[baseClass] ? baseClassGender[baseClass][gender] : baseClass;
    let cTitle = "";
    if (classTitles[baseClass] && classTitles[baseClass][lvl - 1]) {
        cTitle = classTitles[baseClass][lvl - 1][gender];
    } else {
        cTitle = `Nível ${lvl}`; 
    }
    return `${cName}: ${cTitle}`;
}

function customPrompt(msg, numericOnly = false) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-prompt-overlay');
        const msgEl = document.getElementById('custom-prompt-msg');
        const inputEl = document.getElementById('custom-prompt-input');
        const btnOk = document.getElementById('custom-prompt-ok');
        const btnCancel = document.getElementById('custom-prompt-cancel');

        msgEl.textContent = msg;
        inputEl.value = '';
        
        if (numericOnly) {
            inputEl.setAttribute('inputmode', 'numeric');
            inputEl.oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };
        } else {
            inputEl.removeAttribute('inputmode');
            inputEl.oninput = null;
        }
        
        overlay.style.display = 'flex';
        inputEl.focus();

        const cleanup = () => {
            overlay.style.display = 'none';
            btnOk.onclick = null;
            btnCancel.onclick = null;
            inputEl.onkeydown = null;
        };

        btnOk.onclick = () => {
            let val = inputEl.value;
            cleanup();
            resolve(val);
        };

        btnCancel.onclick = () => {
            cleanup();
            resolve(null);
        };

        inputEl.onkeydown = (e) => {
            if (e.key === 'Enter') {
                btnOk.click();
            } else if (e.key === 'Escape') {
                btnCancel.click();
            }
        };
    });
}

function customAlert(msg) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-alert-overlay');
        const msgEl = document.getElementById('custom-alert-msg');
        const btnOk = document.getElementById('custom-alert-ok');

        msgEl.textContent = msg;
        overlay.style.display = 'flex';
        btnOk.focus();

        const cleanup = () => {
            overlay.style.display = 'none';
            btnOk.onclick = null;
            btnOk.onkeydown = null;
        };

        btnOk.onclick = () => {
            cleanup();
            resolve();
        };

        btnOk.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
                cleanup();
                resolve();
            }
        };
    });
}

function setupSumButtons() {
    const inputs = document.querySelectorAll("input[oninput*='formatAndSave'], input[oninput*='formatCurrency']");
    inputs.forEach(inp => {
        if (inp.parentNode.classList.contains('sum-wrapper') || inp.classList.contains('no-sum')) return;

        let wrapper = document.createElement('div');
        wrapper.className = 'sum-wrapper';
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "stretch";
        wrapper.style.gap = "4px";
        wrapper.style.width = "100%";
        
        inp.parentNode.insertBefore(wrapper, inp);
        wrapper.appendChild(inp);

        let btnMinus = document.createElement('button');
        btnMinus.type = "button";
        btnMinus.textContent = '-';
        btnMinus.className = 'btn btn-outline';
        btnMinus.style.cssText = 'padding: 0 8px; margin: 0; font-size: 16px; font-weight: bold; border-color: var(--danger); color: var(--danger); cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center;';
        btnMinus.title = "Subtrair";

        btnMinus.onclick = async () => {
            if(inp.disabled || isReadOnly) {
                await customAlert("Campo bloqueado ou em modo de leitura.");
                return;
            }
            let val = await customPrompt("Digite o valor para SUBTRAIR:", true);
            if(val !== null && val.trim() !== "") {
                let numToSub = parseInt(val.replace(/\D/g, ''), 10);
                if(!isNaN(numToSub)) {
                    let currentVal = parseInt(inp.value.replace(/\D/g, ''), 10) || 0;
                    let newVal = currentVal - numToSub;
                    if(newVal < 0) newVal = 0;
                    inp.value = newVal;
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        };

        let btnPlus = document.createElement('button');
        btnPlus.type = "button";
        btnPlus.textContent = '+';
        btnPlus.className = 'btn btn-outline';
        btnPlus.style.cssText = 'padding: 0 8px; margin: 0; font-size: 16px; font-weight: bold; border-color: var(--success); color: var(--success); cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center;';
        btnPlus.title = "Somar";

        btnPlus.onclick = async () => {
            if(inp.disabled || isReadOnly) {
                await customAlert("Campo bloqueado ou em modo de leitura.");
                return;
            }
            let val = await customPrompt("Digite o valor para SOMAR:", true);
            if(val !== null && val.trim() !== "") {
                let numToAdd = parseInt(val.replace(/\D/g, ''), 10);
                if(!isNaN(numToAdd)) {
                    let currentVal = parseInt(inp.value.replace(/\D/g, ''), 10) || 0;
                    let newVal = currentVal + numToAdd;
                    inp.value = newVal;
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        };

        wrapper.appendChild(btnMinus);
        wrapper.appendChild(btnPlus);
    });
}

function init() {
  populateSelects();
  runFallbackChecks();
  currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
  setupSumButtons();
  renderTabs();
  renderTecnicas();
  renderNpcsComuns();
  renderNpcsEspeciais();
  renderLogs();
  updateUI();
  initFirebase();
  toggleEditability();
}

function initFirebase() {
  try {
      firebase.initializeApp(firebaseConfig); db = firebase.firestore(); isFirebaseReady = true;
      document.getElementById('db-status').classList.add('online');
      if(currentDocId !== '') { loadFromCloud(); }
      iniciarMonitoramentoBancoDeDados();
  } catch(e) {}
}

async function changeDocId(newId) {
  if (!newId || newId.trim() === '') {
      currentDocId = '';
      return;
  }
  newId = newId.trim();
  
  if (!/^\d{4}$/.test(newId)) {
      await customAlert("O ID da ficha deve conter EXATAMENTE 4 NÚMEROS (ex: 1234).");
      document.getElementById('doc-id').value = currentDocId;
      return;
  }
  
  currentDocId = newId;
  loadFromCloud();
}

async function loadFromCloud() {
  if (!isFirebaseReady || !db || currentDocId === '') return;
  document.getElementById('db-status').classList.add('syncing');
  try {
      const doc = await db.collection("fichas_op").doc(currentDocId).get();
      if (doc.exists) { 
          let data = doc.data(); 
          isReadOnly = false;

          if (data.password && data.password.trim() !== '') {
              let entered = await customPrompt("Esta ficha é protegida por senha. Digite a senha para editar (ou cancele para apenas visualizar a ficha):");
              if (entered !== data.password && entered !== ADMIN_PASSWORD) {
                  isReadOnly = true;
                  if(entered !== null) await customAlert("Senha incorreta. A ficha foi aberta no Modo de Leitura.");
              } else {
                  await customAlert("Acesso concedido!");
              }
          }

          charData = data; 
          runFallbackChecks();
          currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
          renderTabs();
          renderTecnicas(); 
          renderNpcsComuns();
          renderNpcsEspeciais();
          renderLogs();
          updateUI(); 
          toggleEditability();
      } 
      else { 
          isReadOnly = false;
          saveData(); 
          toggleEditability();
      }
  } catch(e) {}
  setTimeout(() => document.getElementById('db-status').classList.remove('syncing'), 500);
}

function saveData() {
  if (isReadOnly) return;

  if (isFirebaseReady && db && currentDocId !== '') {
      document.getElementById('db-status').classList.add('syncing');
      
      let dataToSave = JSON.parse(JSON.stringify(charData));
      dataToSave.pcs.forEach(p => {
          if (p.pc && p.pc.info && p.pc.info.sceneType !== "Extra-Narrada") p.pc.info.sceneText = "";
          if (p.npcs) {
              p.npcs.forEach(n => {
                  if (n.info && n.info.sceneType !== "Extra-Narrada") n.info.sceneText = "";
              });
          }
      });

      db.collection('fichas_op').doc(currentDocId).set(dataToSave)
        .then(() => { 
            setTimeout(() => document.getElementById('db-status').classList.remove('syncing'), 300); 
            let toast = document.getElementById('save-toast');
            if(toast) { toast.style.opacity = '1'; setTimeout(() => toast.style.opacity = '0', 2000); }
        })
        .catch(error => { document.getElementById('db-status').classList.remove('syncing'); document.getElementById('db-status').classList.remove('online'); });
  }
}

async function managePassword() {
    if (currentDocId === '') {
        await customAlert("Digite um ID na nuvem e puxe ou crie uma ficha primeiro!");
        return;
    }
    if (isReadOnly) {
        await customAlert("Você está no modo de leitura. Recarregue a ficha e insira a senha correta antes de tentar modificar a segurança.");
        return;
    }

    if (charData.password && charData.password.trim() !== "") {
        let oldPass = await customPrompt("Digite a senha atual para autorizar a mudança:");
        if (oldPass === charData.password || oldPass === ADMIN_PASSWORD) {
            let newPass = await customPrompt("Digite a nova senha (ou deixe totalmente em branco para REMOVER a proteção atual):");
            if (newPass !== null) {
                charData.password = newPass.trim();
                saveData();
                await customAlert(charData.password === "" ? "A senha foi removida com sucesso!" : "Senha redefinida com sucesso!");
                toggleEditability();
            }
        } else {
            if (oldPass !== null) await customAlert("Senha incorreta!");
        }
    } else {
        let newPass = await customPrompt("Defina uma senha para proteger a edição desta ficha:");
        if (newPass !== null && newPass.trim() !== "") {
            charData.password = newPass.trim();
            saveData();
            await customAlert("Senha definida com sucesso!");
            toggleEditability();
        }
    }
}

function toggleEditability() {
    const elements = document.querySelectorAll('.container input:not(#info-salario), .container select, .container textarea, .container button');
    let isNPC = currentChar.isNPC;
    elements.forEach(el => {
        if((el.innerText && (el.innerText.includes("Copiar") || el.innerText.includes("Colapsar"))) || el.id === 'num-logs-copy') {
            el.disabled = false;
            return;
        }
        if(el.value === "Electro") {
            el.disabled = true;
            return;
        }
        if(isNPC && (el.id === 'info-berries' || el.id === 'btn-add-npc-c' || el.id === 'btn-add-npc-e' || (el.closest && (el.closest('#npcs-comuns-container') || el.closest('#npcs-especiais-container'))))) {
            el.disabled = true;
        } else if(el.type === 'checkbox') {
            el.disabled = isReadOnly;
        } else {
            el.disabled = isReadOnly;
        }
    });

    let pwdBtn = document.getElementById('btn-senha');
    if (pwdBtn) {
        if (isReadOnly) {
            pwdBtn.style.display = 'none';
        } else {
            pwdBtn.style.display = 'inline-block';
            pwdBtn.innerText = (charData.password && charData.password !== "") ? "🔑 Redefinir Senha" : "🔑 Definir Senha";
        }
    }
    
    updateUI();
}

function runFallbackChecks() {
  if (typeof charData.password === 'undefined') charData.password = "";
  
  if (!charData.pcs) {
      charData.pcs = [];
      if (charData.characters && charData.characters.length > 0) {
          let mainPC = charData.characters[0];
          mainPC.isNPC = false;
          let npcs = charData.characters.slice(1).filter(c => c.name || c.info.classe !== "Arqueólogo 1");
          npcs.forEach(n => n.isNPC = true);
          charData.pcs.push({ pc: mainPC, npcs: npcs });
      } else if (charData.info) {
          let c = createEmptyChar(false);
          c.name = charData.name || "";
          c.info = charData.info;
          c.tecnicasList = charData.tecnicasList || [];
          c.logList = charData.logList || [];
          c.stats = charData.stats || { f: 0, d: 0, r: 0, v: 0, esp: 0, ami: 0 };
          c.substats = charData.substats || { refl: 0, vcorp: 0, hArm: 0, hObs: 0, hRei: 0, amiAlc: 0, amiDur: 0, amiPot: 0, amiVel: 0 };
          charData.pcs.push({ pc: c, npcs: [] });
      } else {
          charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
      }
      delete charData.characters;
      delete charData.info;
      delete charData.name;
      delete charData.tecnicasList;
      delete charData.logList;
      delete charData.stats;
      delete charData.substats;
  }
  if(charData.pcs.length === 0) {
      charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
  }

  charData.pcs.forEach(pObj => {
      let charsToCheck = [pObj.pc, ...pObj.npcs];
      charsToCheck.forEach(c => {
          if (!c.info) c.info = {};
          if (typeof c.info.recompensa === 'string') c.info.recompensa = parseInt(c.info.recompensa.replace(/\D/g, "")) || "";
          if (typeof c.info.berries === 'string') c.info.berries = parseInt(c.info.berries.replace(/\D/g, "")) || "";

          if (typeof c.info.boxTec === 'undefined') c.info.boxTec = c.info.tecnicasColapsado || false;
          if (typeof c.info.boxLog === 'undefined') c.info.boxLog = c.info.logsColapsado || false;
          if (typeof c.info.boxRes === 'undefined') c.info.boxRes = c.info.resumoColapsado || false;

          const defInfo = { 
              classe: "", classe2: "", classe3: "", classe4: "", classe5: "", raca: "", raca2: "", animal: "", animal2: "", racaNomeCustom: "", customBuffF: "", customBuffD: "", customBuffR: "", customBuffV: "", racaNomeCustom2: "", customBuffF2: "", customBuffD2: "", customBuffR2: "", customBuffV2: "", 
              linhagem: "", selClasseDF: "d", selDF: "d", selRV: "r", selLinDF: "d", selLinRV: "r", selLin4: "d", selLinEspAmi: "esp", 
              alcunha: "", alcunhasList: [], alcunhaAtiva: "", recompensa: "", altura: "", idade: "", sexo: "", sangue: "", nacionalidade: "", localizacao: "", 
              telefone: "", orgTipo: "", tripulacao: "", patente: "", salario: "", estilo1: "", freestyle1: "", estilo2: "", freestyle2: "", 
              estilo3: "", freestyle3: "", estilo4: "", freestyle4: "", berries: 5000000, npcsComunsList: [], npcsEspeciaisList: [], akumaNome: "", 
              personalidade: "", historia: "", aparencia: "", inventario: "", hasAmiAlc: true, hasAmiDur: true, hasAmiPot: true, hasAmiVel: true, hasAmiDesp: false,
              amiResPct: "", amiAlcMult: "1", calcUseAttr: "", calcInimigoRes: "", calcResIgnorada: "", calcBuffFlat: "", calcBuffPct: "", calcUseAmi: "sim", calcUseHaki: "nao", sceneType: "Treino Padrão", sceneText: "", hpAtual: -1,
              boxIden: false, boxMec: false, boxSoc: false, boxBase: false, boxEsp: false, boxAmi: false, boxHist: false, 
              boxInv: false, boxCalc: false, boxEstamina: false, estaminaAtual: -1, estaminaVelocidade: "", estaminaDano: "", estaminaBuffPct: "", estaminaHakiArm: "nao", estaminaHakiObs: "nao", boxScene: false, akumaId: "", selCharR1: "", selCharR2: "", treinosAcumulados: 0, ordemTecnicas: "alfabetica", hideHistoria: false, exaustaoCompleta: false, habilidadesExclusivas: [], habCaminhoAtiradorAtivo: false, habFavArmistaAtivo: "nenhum", habFavArmistaAttr: "d", habQIAvancadoAtivo: false, linhagemBeckmanArma: false
          };
          for(let k in defInfo) if (typeof c.info[k] === 'undefined') c.info[k] = defInfo[k];
          
          if (!c.stats) c.stats = { f: 0, d: 0, r: 0, v: 0, esp: 0, ami: 0 };
          if (!c.substats) c.substats = { refl: 0, vcorp: 0, hArm: 0, hObs: 0, hRei: 0, amiAlc: 0, amiDur: 0, amiPot: 0, amiVel: 0, amiDesp: 0 };
          if (!c.tecnicasList) c.tecnicasList = [];
          c.tecnicasList.forEach(t => { if (typeof t.estilo === 'undefined') t.estilo = ""; });
          if (!c.logList) c.logList = [];
      });
  });
  
  if(activePcIndex >= charData.pcs.length) activePcIndex = 0;
  if(activeNpcIndex >= charData.pcs[activePcIndex].npcs.length) activeNpcIndex = -1;

  currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
}

window.toggleBox = function(id) {
    if (!currentChar) return;
    currentChar.info[id] = !currentChar.info[id];
    saveData();
    updateUI();
};

window.toggleBox = function(id) {
    if (!currentChar) return;
    currentChar.info[id] = !currentChar.info[id];
    saveData();
    updateUI();
};

window.toggleAllBoxes = function(state) {
    if (!currentChar) return;
    const boxKeys = ['boxIden', 'boxMec', 'boxSoc', 'boxHab', 'boxBase', 'boxEsp', 'boxAmi', 'boxHist', 'boxLog', 'boxInv', 'boxTec', 'boxRes', 'boxCalc', 'boxEstamina', 'boxScene'];
    boxKeys.forEach(k => currentChar.info[k] = state);
    saveData();
    updateUI();
};

window.addHabilidade = function() {
    if(isReadOnly) return;
    let sel = document.getElementById('hab-select');
    let val = sel.value;
    if(val && !currentChar.info.habilidadesExclusivas.includes(val)) {
        currentChar.info.habilidadesExclusivas.push(val);
        saveData(); updateUI();
    }
    sel.value = "";
};

window.removeHabilidade = function(hab) {
    if(isReadOnly) return;
    let ln = currentChar.info.linhagem;
    let mand = linhagemHabilidades[ln] || [];
    if(mand.includes(hab)) return; 
    currentChar.info.habilidadesExclusivas = currentChar.info.habilidadesExclusivas.filter(h => h !== hab);
    
    if(hab === "Caminho do Atirador") currentChar.info.habCaminhoAtiradorAtivo = false;
    if(hab === "Favoritismo Armista") { currentChar.info.habFavArmistaAtivo = "nenhum"; currentChar.info.habFavArmistaAttr = "d"; }
    if(hab === "QI Avançado") currentChar.info.habQIAvancadoAtivo = false;
    
    saveData(); updateUI();
};

function addNpcComum() {
    if (!currentChar.info.npcsComunsList) currentChar.info.npcsComunsList = [];
    currentChar.info.npcsComunsList.push({quantidade: "", raca: "Humano", pontos: ""});
    saveData(); renderNpcsComuns(); updateUI(); toggleEditability();
}
function removeNpcComum(idx) {
    currentChar.info.npcsComunsList.splice(idx, 1);
    saveData(); renderNpcsComuns(); updateUI(); toggleEditability();
}
function updateNpcComum(idx, field, val) {
    currentChar.info.npcsComunsList[idx][field] = val;
    saveData(); updateUI();
}
function formatNpcNumber(el) {
    let cleanVal = el.value.replace(/\D/g, "");
    let num = cleanVal ? parseInt(cleanVal, 10) : "";
    let cursor = el.selectionStart;
    let oldLength = el.value.length;
    el.value = cleanVal ? num.toLocaleString("pt-BR") : "";
    let newLength = el.value.length;
    try { el.setSelectionRange(cursor + (newLength - oldLength), cursor + (newLength - oldLength)); } catch(e){}
    return num;
}
function renderNpcsComuns() {
    const container = document.getElementById('npcs-comuns-container');
    if(!container) return;
    let finalHtml = '';
    (currentChar.info.npcsComunsList || []).forEach((n, idx) => {
        let rHtml = `<option value="Outra" ${(!racas[n.raca] && n.raca) ? 'selected' : ''}>Outra...</option>`;
        Object.keys(racas).forEach(r => {
            let isSelected = (n.raca || "Humano") === r ? 'selected' : '';
            rHtml += `<option value="${r}" ${isSelected}>${r}</option>`;
        });
        let cQtd = String(n.quantidade || "").replace(/\D/g, ""); let numQtd = parseInt(cQtd) || "";
        let cPts = String(n.pontos || "").replace(/\D/g, ""); let numPts = parseInt(cPts) || "";
        finalHtml += `
            <div style="background: rgba(0,0,0,0.3); padding: 5px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 5px; display: flex; gap: 5px; align-items: center;">
                <input type="text" placeholder="Qtd" value="${cQtd ? numQtd.toLocaleString('pt-BR') : ''}" oninput="updateNpcComum(${idx}, 'quantidade', formatNpcNumber(this))" style="width: 60px;">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                    <select onchange="updateNpcComum(${idx}, 'raca', this.value)" style="width: 100%;">${rHtml}</select>
                    <input type="text" placeholder="Nome da Raça" value="${(!racas[n.raca] && n.raca) ? n.raca : ''}" 
                           style="display: ${(!racas[n.raca] && n.raca) ? 'block' : 'none'};" 
                           oninput="updateNpcComum(${idx}, 'raca', this.value)">
                </div>
                <input type="text" placeholder="Pontos" value="${cPts ? numPts.toLocaleString('pt-BR') : ''}" oninput="updateNpcComum(${idx}, 'pontos', formatNpcNumber(this))" style="width: 80px;">
                <button type="button" class="btn btn-outline btn-danger" style="padding: 2px 6px; font-size: 10px; margin: 0;" onclick="removeNpcComum(${idx})">X</button>
            </div>
        `;
    });
    container.innerHTML = finalHtml;
}

function addNpcEspecial() {
    if (!currentChar.info.npcsEspeciaisList) currentChar.info.npcsEspeciaisList = [];
    let domCount = currentChar.info.npcsEspeciaisList.filter(n => n.origem === 'Dominação').length;
    let extCount = currentChar.info.npcsEspeciaisList.filter(n => n.origem === 'Extra-Narrada').length;
    let origem = "Evento";
    if (domCount < 3) origem = "Dominação";
    else if (extCount < 3) origem = "Extra-Narrada";
    currentChar.info.npcsEspeciaisList.push({nome: "", origem: origem, sexo: "Masculino", pontos: "", classe: "", classe2: "", classe3: "", classe4: "", classe5: ""});
    saveData(); renderNpcsEspeciais(); updateUI(); toggleEditability();
}
function removeNpcEspecial(idx) {
    currentChar.info.npcsEspeciaisList.splice(idx, 1);
    saveData(); renderNpcsEspeciais(); updateUI(); toggleEditability();
}
function updateNpcEspecial(idx, field, val) {
    let n = currentChar.info.npcsEspeciaisList[idx];
    let oldOrigem = n.origem;
    n[field] = val;
    
    if (field === 'origem') {
        let domCount = currentChar.info.npcsEspeciaisList.filter(x => x.origem === 'Dominação').length;
        let extCount = currentChar.info.npcsEspeciaisList.filter(x => x.origem === 'Extra-Narrada').length;
        if (val === 'Dominação' && domCount > 3) {
            n.origem = oldOrigem;
            customAlert("Limite de 3 NPCs de Dominação atingido!");
        } else if (val === 'Extra-Narrada' && extCount > 3) {
            n.origem = oldOrigem;
            customAlert("Limite de 3 NPCs de Extra-Narrada atingido!");
        }
    }
    
    if (field === 'origem' || field === 'pontos' || field.startsWith('classe')) {
        renderNpcsEspeciais();
    }
    saveData(); updateUI();
}
function renderNpcsEspeciais() {
    const container = document.getElementById('npcs-especiais-container');
    if(!container) return;
    let list = currentChar.info.npcsEspeciaisList || [];
    let domCount = list.filter(n => n.origem === 'Dominação').length;
    let extCount = list.filter(n => n.origem === 'Extra-Narrada').length;
    let elDom = document.getElementById('count-npc-dom'); if(elDom) elDom.textContent = domCount;
    let elExt = document.getElementById('count-npc-ext'); if(elExt) elExt.textContent = extCount;

    let finalHtml = '';
    list.forEach((n, idx) => {
        let cleanPtsStr = String(n.pontos || "").replace(/\D/g, "");
        let pts = parseInt(cleanPtsStr) || 0;
        let cHTML = (slotId, reqPts, prevSlots) => {
            if (pts < reqPts) return `<select disabled style="flex:1; font-size:10px;"><option>🔒 Req ${reqPts.toLocaleString('pt-BR')}</option></select>`;
            let counts = {};
            baseClassesList.forEach(c => counts[c] = 1);
            prevSlots.forEach(p => {
                if(n[p]) { let match = n[p].match(/(.+) (\d+)/); if(match) counts[match[1]] = Math.max(counts[match[1]], parseInt(match[2]) + 1); }
            });
            let html = `<select onchange="updateNpcEspecial(${idx}, '${slotId}', this.value)" style="flex:1; font-size:10px;"><option value="">-- Classe --</option>`;
            baseClassesList.forEach(c => {
                if(counts[c] <= 5) {
                    html += `<option value="${c} ${counts[c]}" ${n[slotId] === c+' '+counts[c] ? 'selected' : ''}>${c} ${counts[c]}</option>`;
                }
            });
            if (n[slotId] && !html.includes(`value="${n[slotId]}"`)) { html += `<option value="${n[slotId]}" selected>${n[slotId]}</option>`; }
            html += `</select>`;
            return html;
        };

        finalHtml += `
            <div style="background: rgba(0,0,0,0.3); padding: 5px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 5px; display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; gap: 5px; align-items: center;">
                    <input type="text" placeholder="Nome" value="${n.nome || ''}" oninput="updateNpcEspecial(${idx}, 'nome', this.value)" style="flex: 2;">
                    <select onchange="updateNpcEspecial(${idx}, 'sexo', this.value)" style="width: 60px;">
                        <option value="Masculino" ${n.sexo !== 'Feminino' ? 'selected' : ''}>Masc</option>
                        <option value="Feminino" ${n.sexo === 'Feminino' ? 'selected' : ''}>Fem</option>
                    </select>
                    <select onchange="updateNpcEspecial(${idx}, 'origem', this.value)" style="flex: 1;">
                        <option value="Dominação" ${n.origem === 'Dominação' ? 'selected' : ''}>Dominação</option>
                        <option value="Evento" ${n.origem === 'Evento' ? 'selected' : ''}>Evento</option>
                        <option value="Extra-Narrada" ${n.origem === 'Extra-Narrada' ? 'selected' : ''}>Extra-Narrada</option>
                    </select>
                    <input type="text" placeholder="Pontos" value="${cleanPtsStr ? pts.toLocaleString('pt-BR') : ''}" oninput="formatNpcNumber(this)" onchange="updateNpcEspecial(${idx}, 'pontos', this.value.replace(/\\D/g, ''))" style="width: 80px;">
                    <button type="button" class="btn btn-outline btn-danger" style="padding: 2px 6px; font-size: 10px; margin: 0;" onclick="removeNpcEspecial(${idx})">X</button>
                </div>
                <div style="display: flex; gap: 5px;">
                    ${cHTML('classe', 0, [])}
                    ${cHTML('classe2', 5000, ['classe'])}
                    ${cHTML('classe3', 10000, ['classe', 'classe2'])}
                    ${cHTML('classe4', 20000, ['classe', 'classe2', 'classe3'])}
                    ${cHTML('classe5', 35000, ['classe', 'classe2', 'classe3', 'classe4'])}
                </div>
            </div>
        `;
    });
    container.innerHTML = finalHtml;
}

function addTecnica() {
    currentChar.tecnicasList.push({nome: "", desc: "", efeito: "", estilo: ""});
    saveData();
    renderTecnicas();
    updateUI();
    toggleEditability();
}

function removeTecnica(idx) {
    currentChar.tecnicasList.splice(idx, 1);
    saveData();
    renderTecnicas();
    updateUI();
    toggleEditability();
}

function updateTecnica(idx, field, val) {
    currentChar.tecnicasList[idx][field] = val;
    saveData();
    updateUI();
}

function changeOrdemTecnicas(val) {
    currentChar.info.ordemTecnicas = val;
    if (val === 'alfabetica') {
        currentChar.tecnicasList.sort((a, b) => {
            let nA = (a.nome || "").trim().toLowerCase();
            let nB = (b.nome || "").trim().toLowerCase();
            return nA.localeCompare(nB);
        });
        renderTecnicas();
    }
    saveData();
    updateUI();
}

function moveTecnica(idx, dir) {
    if (currentChar.info.ordemTecnicas === 'alfabetica') {
        currentChar.info.ordemTecnicas = 'manual';
        let selectOrdem = document.getElementById('info-ordemTecnicas');
        if (selectOrdem) selectOrdem.value = 'manual';
    }
    if (dir === -1 && idx > 0) {
        let temp = currentChar.tecnicasList[idx];
        currentChar.tecnicasList[idx] = currentChar.tecnicasList[idx - 1];
        currentChar.tecnicasList[idx - 1] = temp;
    } else if (dir === 1 && idx < currentChar.tecnicasList.length - 1) {
        let temp = currentChar.tecnicasList[idx];
        currentChar.tecnicasList[idx] = currentChar.tecnicasList[idx + 1];
        currentChar.tecnicasList[idx + 1] = temp;
    }
    saveData();
    renderTecnicas();
    updateUI();
}

function renderTecnicas() {
    const container = document.getElementById('tecnicas-container');
    container.innerHTML = '';
    let i = currentChar.info;
    let availableStyles = [];
    let isMink = (i.raca === "Mink" || (i.linhagem === "Charlotte" && i.raca2 === "Mink"));
    if (isMink) availableStyles.push({ id: "Electro", name: "Electro" });
    [1, 2, 3, 4].forEach(n => {
        let st = i['estilo'+n];
        if (st && st !== "Nenhum") {
            let dName = st;
            if (st === "Freestyle") dName = (i['freestyle'+n] && i['freestyle'+n].trim() !== "") ? i['freestyle'+n] : "Freestyle";
            availableStyles.push({ id: 'estilo'+n, name: dName });
        }
    });

    currentChar.tecnicasList.forEach((t, idx) => {
        let styleOptions = '<option value="">-- Sem Estilo --</option>';
        availableStyles.forEach(st => {
            styleOptions += `<option value="${st.id}" ${t.estilo === st.id ? 'selected' : ''}>${st.name}</option>`;
        });

        container.innerHTML += `
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 10px;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 5px;">
                    <label style="color:var(--info);">Técnica ${idx + 1}</label>
                    <div style="display:flex; gap: 5px;">
                        <button type="button" class="btn btn-outline" style="font-size:10px; padding:2px 6px;" onclick="moveTecnica(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>⬆️</button>
                        <button type="button" class="btn btn-outline" style="font-size:10px; padding:2px 6px;" onclick="moveTecnica(${idx}, 1)" ${idx === currentChar.tecnicasList.length - 1 ? 'disabled' : ''}>⬇️</button>
                        <button type="button" class="btn btn-outline" style="color:var(--danger); border-color:var(--danger); font-size:10px; padding:2px 6px;" onclick="removeTecnica(${idx})">Remover</button>
                    </div>
                </div>
                <select onchange="updateTecnica(${idx}, 'estilo', this.value)" style="margin-bottom:5px; background-color:#222; border:1px solid #555; color:var(--text); padding:4px; font-size:11px; border-radius:4px;">
                    ${styleOptions}
                </select>
                <textarea placeholder="Nome da Técnica (Ex: Golpe Rápido)" oninput="updateTecnica(${idx}, 'nome', this.value)" style="min-height:38px; margin-bottom:5px; text-align:justify; padding-top:8px;">${t.nome}</textarea>
                <textarea placeholder="Descrição da Técnica" oninput="updateTecnica(${idx}, 'desc', this.value)" style="min-height:50px; margin-bottom:5px; text-align:justify;">${t.desc}</textarea>
                <textarea placeholder="Efeito / Buff (Ex: Perde 10% de Res)" oninput="updateTecnica(${idx}, 'efeito', this.value)" style="min-height:38px; text-align:justify; padding-top:8px;">${t.efeito}</textarea>
            </div>
        `;
    });

    setTimeout(() => {
        container.querySelectorAll('textarea').forEach(ta => {
            ta.style.height = 'auto';
            ta.style.height = (ta.scrollHeight) + 'px';
        });
    }, 10);
}

function addLog() {
    currentChar.logList.push({titulo: "", conteudo: ""});
    saveData();
    renderLogs();
    updateUI();
    toggleEditability();
}

function removeLog(idx) {
    currentChar.logList.splice(idx, 1);
    saveData();
    renderLogs();
    updateUI();
    toggleEditability();
}

function updateLog(idx, field, val) {
    currentChar.logList[idx][field] = val;
    saveData();
    updateUI();
}

function renderLogs() {
    const container = document.getElementById('logs-container');
    container.innerHTML = '';
    currentChar.logList.forEach((l, idx) => {
        container.innerHTML += `
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 10px;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 5px;">
                    <label style="color:var(--warning);">Entrada ${idx + 1}</label>
                    <button type="button" class="btn btn-outline" style="color:var(--danger); border-color:var(--danger); font-size:10px; padding:2px 6px;" onclick="removeLog(${idx})">Remover</button>
                </div>
                <input type="text" placeholder="Ex: Semana 1 (Semana Normal [09/02/2026 – 15/02/2026])" value="${l.titulo}" oninput="updateLog(${idx}, 'titulo', this.value)" style="margin-bottom:5px;">
                <textarea placeholder="- Auto-narrada [฿50.000.000 | 250 pontos]\n- Interação [300 pontos | 2 treinos de técnicas]\n- Recrutar NPCs [Humanos: 25 NPCs]\n- Trabalho [Tipo 1: ฿30.000.000]\n- Treino de Técnicas [150 pontos | 6 treinos de técnicas]\n- Treino Padrão [250 pontos]" oninput="updateLog(${idx}, 'conteudo', this.value)" style="min-height:80px;">${l.conteudo}</textarea>
            </div>
        `;
    });
}

let editingAlcunhaOldName = "";

function openAlcunhaModal() {
    if(isReadOnly) return;
    editingAlcunhaOldName = "";
    document.getElementById('modal-alcunha-title').innerText = 'Criar Nova Alcunha';
    document.getElementById('alcunha-nome').value = '';
    document.getElementById('alcunha-has-buff').checked = false;
    document.getElementById('alcunha-buffs-container').style.display = 'none';
    document.getElementById('alcunha-buffs-list').innerHTML = '';
    document.getElementById('btn-delete-alcunha').style.display = 'none';
    document.getElementById('modal-alcunha').style.display = 'flex';
}

function editAlcunhaModal() {
    if(isReadOnly || !currentChar.info.alcunhasList || currentChar.info.alcunhasList.length === 0 || !currentChar.info.alcunhaAtiva) return;
    let ativa = currentChar.info.alcunhasList.find(a => a.nome === currentChar.info.alcunhaAtiva);
    if(!ativa) return;
    
    editingAlcunhaOldName = ativa.nome;
    document.getElementById('modal-alcunha-title').innerText = 'Editar Alcunha';
    document.getElementById('alcunha-nome').value = ativa.nome;
    document.getElementById('alcunha-buffs-list').innerHTML = '';
    
    if (ativa.buffs && ativa.buffs.length > 0) {
        document.getElementById('alcunha-has-buff').checked = true;
        document.getElementById('alcunha-buffs-container').style.display = 'block';
        ativa.buffs.forEach(b => {
            addAlcunhaBuffRow();
            let rows = document.getElementById('alcunha-buffs-list').children;
            let lastRow = rows[rows.length - 1];
            lastRow.querySelector('.buff-stat').value = b.stat;
            lastRow.querySelector('.buff-type').value = b.type;
            lastRow.querySelector('.buff-val').value = b.val;
        });
    } else {
        document.getElementById('alcunha-has-buff').checked = false;
        document.getElementById('alcunha-buffs-container').style.display = 'none';
    }
    
    document.getElementById('btn-delete-alcunha').style.display = 'inline-block';
    document.getElementById('modal-alcunha').style.display = 'flex';
}

function addAlcunhaBuffRow() {
    const list = document.getElementById('alcunha-buffs-list');
    const row = document.createElement('div');
    row.style.display = 'flex'; row.style.gap = '5px'; row.style.marginBottom = '5px';
    row.innerHTML = `
        <select class="buff-stat" style="flex:2; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;">
            <optgroup label="Tudo"><option value="tudo">Todos os Atributos</option></optgroup>
            <optgroup label="Atributos"><option value="d">Destreza</option><option value="f">Força</option><option value="r">Resistência</option><option value="v">Velocidade</option><option value="refl">Reflexo</option><option value="vcorp">Vel. Corporal</option><option value="vAgua">Velocidade (Água)</option><option value="reflAgua">Reflexo (Água)</option><option value="vcorpAgua">Vel. Corporal (Água)</option></optgroup>
            <optgroup label="Espírito"><option value="ha">Armamento</option><option value="ho">Observação</option><option value="hr">Rei</option></optgroup>
            <optgroup label="Akuma no Mi"><option value="amiAlc">Alcance</option><option value="amiDur">Durabilidade</option><option value="amiPot">Potência</option><option value="amiVel">Velocidade</option></optgroup>
        </select>
        <select class="buff-type" style="flex:1; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;">
            <option value="flat">Pts (+X)</option>
            <option value="pct">% (+X%)</option>
        </select>
        <input type="number" class="buff-val" placeholder="Qtd" style="flex:1; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;">
        <button class="btn btn-outline btn-danger" style="padding:2px 6px; font-size:10px; margin:0;" onclick="this.parentElement.remove()">X</button>
    `;
    list.appendChild(row);
}

function saveAlcunha() {
    let nome = document.getElementById('alcunha-nome').value.trim();
    if(!nome) return;
    let hasBuff = document.getElementById('alcunha-has-buff').checked;
    let buffs = [];
    if(hasBuff) {
        document.querySelectorAll('#alcunha-buffs-list > div').forEach(row => {
            let stat = row.querySelector('.buff-stat').value;
            let type = row.querySelector('.buff-type').value;
            let val = parseInt(row.querySelector('.buff-val').value) || 0;
            if(val !== 0) buffs.push({stat, type, val});
        });
    }
    if(!currentChar.info.alcunhasList) currentChar.info.alcunhasList = [];
    
    if (editingAlcunhaOldName !== "") {
        let idx = currentChar.info.alcunhasList.findIndex(a => a.nome === editingAlcunhaOldName);
        if (idx !== -1) {
            currentChar.info.alcunhasList[idx] = {nome, buffs};
        }
    } else {
        currentChar.info.alcunhasList.push({nome, buffs});
    }
    
    currentChar.info.alcunhaAtiva = nome;
    document.getElementById('modal-alcunha').style.display = 'none';
    saveData(); updateUI();
}

function deleteAlcunha() {
    if(isReadOnly || !currentChar.info.alcunhasList || currentChar.info.alcunhasList.length === 0 || !currentChar.info.alcunhaAtiva) return;
    let targetName = editingAlcunhaOldName || currentChar.info.alcunhaAtiva;
    currentChar.info.alcunhasList = currentChar.info.alcunhasList.filter(a => a.nome !== targetName);
    currentChar.info.alcunhaAtiva = currentChar.info.alcunhasList.length > 0 ? currentChar.info.alcunhasList[0].nome : "";
    document.getElementById('modal-alcunha').style.display = 'none';
    saveData(); updateUI();
}

function populateSelects() {}

function updateField(category, field, value) { 
    if (category === 'name') { 
        currentChar.name = value || ""; 
        renderTabs();
    } else { 
        currentChar[category][field] = value; 
    } 
    
    if (field === 'sceneText' && currentChar.info.sceneType !== "Extra-Narrada") {
        updateUI();
        return;
    }
    
    saveData(); updateUI(); 
    if (field.startsWith('estilo') || field.startsWith('freestyle') || field === 'raca' || field === 'raca2' || field === 'linhagem') renderTecnicas();
}

async function handlePatenteChange(val) {
    const restritas = ["Vice-Almirante", "Almirante", "Almirante-de-Frota", "CP-8", "CP-9", "CP-0", "Gorosei", "Líder do Governo"];
    const senhasPatentes = { "CP-8": "dafne", "CP-9": "maackia", "CP-0": "ochna", "Gorosei": "abelia", "Líder do Governo": "Ἑρμής" };
    let finalVal = val;
    if (restritas.includes(val)) {
        let pwd = await customPrompt("Você é merecedor deste cargo?");
        if (senhasPatentes[val] ? pwd === senhasPatentes[val] : pwd === ADMIN_PASSWORD) {
            let discurso = currentChar.info.orgTipo === "Marinha" ? "Você é merecedor sim! A Justiça Absoluta prevalecerá! Que os mares temam a nossa fúria!" : "Você é merecedor sim! A ordem do mundo reside em nossas mãos. O equilíbrio será mantido a qualquer custo!";
            await customAlert(discurso);
        } else {
            await customAlert("Você não merece aquele cargo.");
            document.getElementById('info-patente').value = "";
            finalVal = "";
        }
    }
    
    currentChar.info.patente = finalVal;
    if (finalVal !== "" && typeof salarios[finalVal] !== 'undefined') {
        currentChar.info.salario = salarios[finalVal] === 0 ? "0" : salarios[finalVal].toLocaleString("pt-BR");
    } else {
        currentChar.info.salario = "";
    }
    saveData(); updateUI();
}

function formatAndSave(category, field, el) {
    let cleanVal = el.value.replace(/\D/g, ""); let num = cleanVal ? parseInt(cleanVal, 10) : 0;
    currentChar[category][field] = num;
    let cursor = el.selectionStart; let oldLength = el.value.length; 
    el.value = cleanVal ? num.toLocaleString("pt-BR") : "";
    let newLength = el.value.length; try { el.setSelectionRange(cursor + (newLength - oldLength), cursor + (newLength - oldLength)); } catch(e){}
    saveData(); updateUI();
}

function formatCurrency(category, field, el) {
    let cleanVal = el.value.replace(/\D/g, "");
    let num = cleanVal ? parseInt(cleanVal, 10) : "";
    currentChar[category][field] = num;
    let cursor = el.selectionStart; let oldLength = el.value.length; 
    el.value = cleanVal ? num.toLocaleString("pt-BR") : "";
    let newLength = el.value.length; try { el.setSelectionRange(cursor + (newLength - oldLength), cursor + (newLength - oldLength)); } catch(e){}
    saveData(); updateUI();
}

function formatPhone(el) {
    let v = el.value.replace(/\D/g, "").substring(0, 11);
    let res = v;
    if (v.length > 2) res = "(" + v.substring(0, 2) + ") " + v.substring(2);
    if (v.length > 7) res = res.substring(0, 10) + "-" + res.substring(10);
    el.value = res;
    currentChar.info.telefone = res;
    saveData();
}

function strCalc(base, bonus, flat = 0) {
    if(bonus === 0 && flat === 0) return base.toLocaleString("pt-BR");
    let total = Math.round((base + flat) * (1 + bonus)); 
    let parts = [base.toLocaleString("pt-BR")];
    if (flat !== 0) parts.push(`${flat >= 0 ? "+" : ""}${flat.toLocaleString("pt-BR")}`);
    if (bonus !== 0) parts.push(`${bonus >= 0 ? "+" : ""}${(bonus * 100).toFixed(0)}%`);
    return `${parts.join("")} = ${total.toLocaleString("pt-BR")}`;
}

function formatRaceStr(rName, aName, isFem) {
    if (!rName) return "";
    let res = rName.replace("Povo do Céu: ", "");
    if (isFem) {
        if (res === "Bucaneiro") res = "Bucaneira";
        else if (res === "Humano") res = "Humana";
        else if (res === "Lunariano") res = "Lunariana";
        else if (res === "Skypieano") res = "Skypiana";
        else if (res === "Sereiano") res = "Sereiana";
    }
    if (["Tritão", "Wotan", "Mink"].includes(rName)) {
        if (aName && aName.trim() !== "") res += `: ${aName.trim()}`;
    }
    return res;
}

function toggleAmi(field, isChecked) {
    let key = 'has' + field.charAt(0).toUpperCase() + field.slice(1);
    currentChar.info[key] = isChecked;
    if (!isChecked) {
        currentChar.substats[field] = 0;
        let el = document.getElementById('sub-' + field);
        if(el) el.value = "";
    }
    saveData();
    updateUI();
}

function updateUI() {
    let i = currentChar.info;
    let isNPC = currentChar.isNPC;

    ['boxIden', 'boxMec', 'boxSoc', 'boxHab', 'boxBase', 'boxEsp', 'boxAmi', 'boxHist', 'boxLog', 'boxInv', 'boxTec', 'boxRes', 'boxCalc', 'boxEstamina', 'boxScene'].forEach(id => {
        let wrapper = document.getElementById('wrapper-' + id);
        let icon = document.getElementById('icon-' + id);
        let titleBlock = document.getElementById('title-' + id);
        if (wrapper && icon && titleBlock) {
            if (i[id]) { 
                wrapper.style.display = 'none';
                icon.textContent = '◀';
                titleBlock.style.borderBottom = 'none';
                titleBlock.style.paddingBottom = '0';
            } else {
                wrapper.style.display = 'block';
                icon.textContent = '▼';
                titleBlock.style.borderBottom = '1px dashed #444';
                titleBlock.style.paddingBottom = '8px';
            }
        }
    });

    if (i.raca === "Kuja" && i.sexo !== "Feminino") i.raca = "";
    if (i.raca2 === "Kuja" && i.sexo !== "Feminino") i.raca2 = "";

    const noCharlotteRaces = ["Bucaneiro", "Lunariano", "Oni", "Meio-Gigante", "Wotan"];
    if (i.linhagem === "Charlotte") {
        if (noCharlotteRaces.includes(i.raca)) i.raca = "";
        if (noCharlotteRaces.includes(i.raca2)) i.raca2 = "";
    }

    let rHtml = '<option value="">-- Selecione --</option>';
    if (isNPC) rHtml += `<option value="Outra" ${i.raca === 'Outra' ? 'selected' : ''}>Outra...</option>`;
    for(let r in racas) {
        if (r === "Kuja" && i.sexo !== "Feminino") continue;
        if (i.linhagem === "Charlotte" && noCharlotteRaces.includes(r)) continue;
        rHtml += `<option value="${r}">${r}</option>`;
    }
    let sRaca = document.getElementById('info-raca');
    if (sRaca.innerHTML !== rHtml) sRaca.innerHTML = rHtml;
    sRaca.value = i.raca;
    let boxCustom = document.getElementById('box-racaCustom');
    if (boxCustom) {
        if (isNPC && i.raca === 'Outra') {
            boxCustom.style.display = 'flex';
            document.getElementById('info-racaNomeCustom').value = i.racaNomeCustom || "";
            document.getElementById('info-customBuffF').value = i.customBuffF || "";
            document.getElementById('info-customBuffD').value = i.customBuffD || "";
            document.getElementById('info-customBuffR').value = i.customBuffR || "";
            document.getElementById('info-customBuffV').value = i.customBuffV || "";
        } else {
            boxCustom.style.display = 'none';
        }
    }
    let boxCustom2 = document.getElementById('box-racaCustom2');
    if (boxCustom2) {
        if (isNPC && i.linhagem === 'Charlotte' && i.raca2 === 'Outra') {
            boxCustom2.style.display = 'flex';
            document.getElementById('info-racaNomeCustom2').value = i.racaNomeCustom2 || "";
            document.getElementById('info-customBuffF2').value = i.customBuffF2 || "";
            document.getElementById('info-customBuffD2').value = i.customBuffD2 || "";
            document.getElementById('info-customBuffR2').value = i.customBuffR2 || "";
            document.getElementById('info-customBuffV2').value = i.customBuffV2 || "";
        } else {
            boxCustom2.style.display = 'none';
        }
    }

    let sRaca2 = document.getElementById('info-raca2');
    if (i.linhagem === "Charlotte") {
        sRaca2.style.display = "block";
        let r2Html = '<option value="">-- Selecione --</option>';
        if (isNPC) r2Html += `<option value="Outra" ${i.raca2 === 'Outra' ? 'selected' : ''}>Outra...</option>`;
        for(let r in racas) {
            if (r === "Kuja" && i.sexo !== "Feminino") continue;
            if (noCharlotteRaces.includes(r)) continue;
            r2Html += `<option value="${r}">${r}</option>`;
        }
        if (sRaca2.innerHTML !== r2Html) sRaca2.innerHTML = r2Html;
        sRaca2.value = i.raca2;
    } else {
        sRaca2.style.display = "none";
    }

    let boxCharRacas = document.getElementById('box-charlotteRacas');
    if (boxCharRacas) {
        if (i.linhagem === "Charlotte") {
            boxCharRacas.style.display = "flex";
            let nomes = {d: "Destreza", f: "Força", r: "Resistência", v: "Velocidade"};
            let buildOpts = (racaName, suffix = "") => {
                let html = '<option value="">-- Escolher Buff --</option>';
                if (racaName === "Humano" || racaName === "Kuja") {
                    for (let s in nomes) html += `<option value="${s}">${nomes[s]} (+${racaName === "Kuja" && (s === "f" || s === "d") ? "30" : "20"}%)</option>`;
                } else if (racas[racaName]) {
                    for (let s in racas[racaName]) {
                        if (racas[racaName][s] > 0) {
                            html += `<option value="${s}">${nomes[s]} (+${(racas[racaName][s]*100).toFixed(0)}%)</option>`;
                        }
                    }
                } else if (isNPC && racaName === "Outra") {
                    let f = parseInt(i['customBuffF' + suffix]) || 0;
                    let d = parseInt(i['customBuffD' + suffix]) || 0;
                    let r = parseInt(i['customBuffR' + suffix]) || 0;
                    let v = parseInt(i['customBuffV' + suffix]) || 0;
                    if (f > 0) html += `<option value="f">${nomes["f"]} (+${f}%)</option>`;
                    if (d > 0) html += `<option value="d">${nomes["d"]} (+${d}%)</option>`;
                    if (r > 0) html += `<option value="r">${nomes["r"]} (+${r}%)</option>`;
                    if (v > 0) html += `<option value="v">${nomes["v"]} (+${v}%)</option>`;
                }
                return html;
            };

            let sC1 = document.getElementById('info-selCharR1');
            if (sC1) {
                let h1 = buildOpts(i.raca, "");
                if (sC1.innerHTML !== h1) sC1.innerHTML = h1;
                if (Array.from(sC1.options).some(o => o.value === i.selCharR1)) sC1.value = i.selCharR1; else { sC1.value = ""; i.selCharR1 = ""; }
            }

            let sC2 = document.getElementById('info-selCharR2');
            if (sC2) {
                let h2 = buildOpts(i.raca2, "2");
                if (sC2.innerHTML !== h2) sC2.innerHTML = h2;
                if (Array.from(sC2.options).some(o => o.value === i.selCharR2)) sC2.value = i.selCharR2; else { sC2.value = ""; i.selCharR2 = ""; }
            }
        } else {
            boxCharRacas.style.display = "none";
        }
    }

    let anim1 = document.getElementById('info-animal');
    if (["Tritão", "Wotan", "Mink"].includes(i.raca)) {
        anim1.style.display = "block"; anim1.placeholder = i.raca === "Mink" ? "Mamífero" : "Animal Marinho";
    } else { anim1.style.display = "none"; }

    let anim2 = document.getElementById('info-animal2');
    if (i.linhagem === "Charlotte" && ["Tritão", "Wotan", "Mink"].includes(i.raca2)) {
        anim2.style.display = "block"; anim2.placeholder = i.raca2 === "Mink" ? "Mamífero" : "Animal Marinho";
    } else { anim2.style.display = "none"; }

    document.getElementById('pc-name').value = currentChar.name;
    const textFields = ['selClasseDF', 'selDF', 'selRV', 'selLinDF', 'selLinRV', 'selLin4', 'selLinEspAmi', 'altura', 'idade', 'sexo', 'sangue', 'telefone', 'nacionalidade', 'localizacao', 'tripulacao', 'akumaNome', 'personalidade', 'historia', 'aparencia', 'inventario', 'animal', 'animal2', 'sceneType', 'sceneText', 'calcUseAmi', 'calcUseHaki', 'amiAlcMult', 'ordemTecnicas', 'estaminaHakiArm', 'estaminaHakiObs'];
    textFields.forEach(f => { let el = document.getElementById('info-'+f); if(el) el.value = i[f] || ""; });
    let chkHideHist = document.getElementById('info-hideHistoria'); if (chkHideHist) chkHideHist.checked = i.hideHistoria || false;
    let chkExaustao = document.getElementById('info-exaustaoCompleta'); if (chkExaustao) chkExaustao.checked = i.exaustaoCompleta || false;

    let selAlcunha = document.getElementById('info-alcunha');
    if(selAlcunha) {
        let htmlAlc = '<option value="">-- Nenhuma --</option>';
        if(i.alcunhasList) { i.alcunhasList.forEach(a => { htmlAlc += `<option value="${a.nome}">${a.nome}</option>`; }); }
        if(selAlcunha.innerHTML !== htmlAlc) selAlcunha.innerHTML = htmlAlc;
        selAlcunha.value = i.alcunhaAtiva || "";
    }

    let calcAttrEl = document.getElementById('info-calcUseAttr');
    if(calcAttrEl) calcAttrEl.value = i.calcUseAttr ? i.calcUseAttr.toLocaleString("pt-BR") : "";
    let calcResEl = document.getElementById('info-calcInimigoRes');
    if(calcResEl) calcResEl.value = i.calcInimigoRes ? i.calcInimigoRes.toLocaleString("pt-BR") : "";
    let calcResIgnEl = document.getElementById('info-calcResIgnorada');
    if(calcResIgnEl) calcResIgnEl.value = i.calcResIgnorada ? i.calcResIgnorada.toLocaleString("pt-BR") : "";
    let calcBuffFlatEl = document.getElementById('info-calcBuffFlat');
    if(calcBuffFlatEl) calcBuffFlatEl.value = i.calcBuffFlat ? i.calcBuffFlat.toLocaleString("pt-BR") : "";
    let calcBuffPctEl = document.getElementById('info-calcBuffPct');
    if(calcBuffPctEl) calcBuffPctEl.value = i.calcBuffPct ? i.calcBuffPct.toLocaleString("pt-BR") : "";

    let estVelEl = document.getElementById('info-estaminaVelocidade');
    if(estVelEl) estVelEl.value = i.estaminaVelocidade ? i.estaminaVelocidade.toLocaleString("pt-BR") : "";
    let estDanoEl = document.getElementById('info-estaminaDano');
    if(estDanoEl) estDanoEl.value = i.estaminaDano ? i.estaminaDano.toLocaleString("pt-BR") : "";
    let estBuffPctEl = document.getElementById('info-estaminaBuffPct');
    if(estBuffPctEl) estBuffPctEl.value = i.estaminaBuffPct ? i.estaminaBuffPct.toLocaleString("pt-BR") : "";

    let recEl = document.getElementById('info-recompensa');
    if(recEl) recEl.value = i.recompensa ? i.recompensa.toLocaleString("pt-BR") : "";

    let elTreinos = document.getElementById('info-treinosAcumulados');
    if(elTreinos) elTreinos.value = i.treinosAcumulados ? i.treinosAcumulados.toLocaleString("pt-BR") : "";

    if(isNPC) {
        document.getElementById('info-berries').value = "Bloqueado";
    } else {
        let berEl = document.getElementById('info-berries');
        if(berEl) berEl.value = i.berries ? i.berries.toLocaleString("pt-BR") : "";
    }

    let orgTipo = i.orgTipo || "";
    document.getElementById('info-orgTipo').value = orgTipo;
    if(orgTipo === "Pirata") {
        document.getElementById('box-tripulacao').style.display = "block";
        document.getElementById('box-patente-salario').style.display = "none";
        i.patente = ""; i.salario = "";
        let selPatente = document.getElementById('info-patente');
        if(selPatente) selPatente.value = "";
    } else if (orgTipo !== "") {
        document.getElementById('box-tripulacao').style.display = "none";
        document.getElementById('box-patente-salario').style.display = "flex";
        
        let pMarinha = ["", "Aprendiz", "Marinheiro", "Cabo", "Sargento", "Tenente", "Comandante", "Capitão", "Comodoro", "Contra-Almirante", "Vice-Almirante", "Almirante", "Almirante-de-Frota"];
        let pGoverno = ["", "Agente Judicial", "CP-1", "CP-2", "CP-3", "CP-4", "CP-5", "CP-6", "CP-7", "CP-8", "CP-9", "CP-0", "Gorosei", "Líder do Governo"];
        let options = orgTipo === "Marinha" ? pMarinha : pGoverno;
        
        let selPatente = document.getElementById('info-patente');
        if (selPatente) {
            let html = "";
            let gKey = i.sexo === 'Feminino' ? 'f' : 'm';
            options.forEach(p => {
                let dName = (p !== "" && patenteGender[p]) ? patenteGender[p][gKey] : (p === "" ? "-- Selecione --" : p);
                html += `<option value="${p}">${dName}</option>`;
            });
            if(selPatente.innerHTML !== html) selPatente.innerHTML = html;
            if(options.includes(i.patente)) { selPatente.value = i.patente; } 
            else { i.patente = options[0]; selPatente.value = options[0]; i.salario = ""; }
        }
    } else {
        document.getElementById('box-tripulacao').style.display = "none";
        document.getElementById('box-patente-salario').style.display = "none";
    }
    
    let elSalario = document.getElementById('info-salario');
    if (elSalario) elSalario.value = i.salario || "";

    let D = currentChar.stats.d, F = currentChar.stats.f, R = currentChar.stats.r, V = currentChar.stats.v;
    let totalBase = D + F + R + V;

    let totalBaseDisplay = document.getElementById('totalBaseDisplay');
    if(totalBaseDisplay) {
        totalBaseDisplay.textContent = totalBase.toLocaleString("pt-BR");
        totalBaseDisplay.style.color = totalBase > 1000 ? "var(--warning)" : "var(--info)";
        totalBaseDisplay.style.borderColor = totalBase > 1000 ? "var(--warning)" : "var(--info)";
    }

    let avisoBase = document.getElementById('avisoBase');
    
    let displayAviso = "none";
    let textAviso = "";
    
    if(totalBase > 1000) { 
        displayAviso = "block"; 
        textAviso = `Atenção: Limite inicial de 1.000 pontos ultrapassado!`; 
    } else if(totalBase < 1000) { 
        displayAviso = "block"; 
        textAviso = `Atenção: Faltam distribuir ${(1000 - totalBase).toLocaleString("pt-BR")} dos pontos iniciais!`; 
    }
    
    if(avisoBase) { avisoBase.style.display = displayAviso; avisoBase.textContent = textAviso; }

    let html1 = '<option value="">-- Selecione --</option>';
    baseClassesList.forEach(c => {
        let display = getClassDisplayName(`${c} 1`, i.sexo);
        html1 += `<option value="${c} 1">${display}</option>`;
    });
    let el1 = document.getElementById('info-classe');
    if(el1.innerHTML !== html1) el1.innerHTML = html1;
    if(i.classe && el1.querySelector(`option[value="${i.classe}"]`)) el1.value = i.classe;
    else el1.value = ""; 

    const classSlots = [
        {id: 'classe2', req: 5000, prev: [i.classe]},
        {id: 'classe3', req: 10000, prev: [i.classe, i.classe2]},
        {id: 'classe4', req: 20000, prev: [i.classe, i.classe2, i.classe3]},
        {id: 'classe5', req: 35000, prev: [i.classe, i.classe2, i.classe3, i.classe4]}
    ];

    classSlots.forEach(slot => {
        let el = document.getElementById('info-' + slot.id);
        if (totalBase >= slot.req) {
            el.disabled = isReadOnly ? true : false;
            let counts = {};
            baseClassesList.forEach(c => counts[c] = 1);
            slot.prev.forEach(p => {
                if(p) { let match = p.match(/(.+) (\d+)/); if(match) counts[match[1]] = Math.max(counts[match[1]], parseInt(match[2]) + 1); }
            });
            let html = `<option value="">-- Selecione --</option>`;
            baseClassesList.forEach(c => {
                if(counts[c] <= 5) {
                    let display = getClassDisplayName(`${c} ${counts[c]}`, i.sexo);
                    html += `<option value="${c} ${counts[c]}">${display}</option>`;
                }
            });
            if(el.innerHTML !== html) el.innerHTML = html;
            let currentVal = i[slot.id];
            if(Array.from(el.options).some(o => o.value === currentVal) && currentVal !== "") { el.value = currentVal; } else { el.value = ""; i[slot.id] = ""; }
        } else {
            el.innerHTML = `<option value="">🔒 Requer ${slot.req.toLocaleString('pt-BR')}</option>`;
            el.disabled = true; i[slot.id] = "";
        }
    });

    let combatenteLevel = 0;
    [i.classe, i.classe2, i.classe3, i.classe4, i.classe5].forEach(c => {
        if(c && c.startsWith("Combatente")) {
            let match = c.match(/Combatente (\d+)/);
            if(match) combatenteLevel = Math.max(combatenteLevel, parseInt(match[1]));
        }
    });
    document.getElementById('box-selClasseDF').style.display = (combatenteLevel > 0) ? "block" : "none";

    const selLin = document.getElementById('info-linhagem');
    let currentLin = i.linhagem; 
    let htmlLin = '<option value="">-- Selecione --</option>';
    for(let l in linhagens) { if(l!=="Nenhuma" && (!linhagens[l].req || linhagens[l].req.includes(i.raca))) { htmlLin += `<option value="${l}">${l}</option>`; } }
    if(selLin.innerHTML !== htmlLin) selLin.innerHTML = htmlLin;
    if(Array.from(selLin.options).some(o => o.value === currentLin)) { selLin.value = currentLin; } else { i.linhagem = ""; selLin.value = ""; currentLin = ""; }

    let rc = i.raca, rc2 = i.raca2, ln = currentLin;
    let isLinhagemVisible = (rc && !["Bucaneiro","Oni","Lunariano"].includes(rc));
    document.getElementById('container-linhagem').style.display = isLinhagemVisible ? "block" : "none"; 
    
    document.getElementById('box-extraRaca').style.display = (ln !== "Charlotte" && ["Humano","Kuja","Três-Olhos","Mink"].includes(rc)) ? "flex" : "none";
    document.getElementById('info-selDF').style.display = (ln !== "Charlotte" && ["Humano","Kuja","Três-Olhos","Mink"].includes(rc)) ? "block" : "none";
    document.getElementById('info-selRV').style.display = (ln !== "Charlotte" && ["Humano","Kuja"].includes(rc)) ? "block" : "none";

    let showExtraLin = isLinhagemVisible && ["Barnum","Charlotte","D.","Gan","Kong","Silvers"].includes(ln);
    document.getElementById('box-extraLin').style.display = showExtraLin ? "flex" : "none";
    document.getElementById('info-selLinDF').style.display = ["Barnum","Gan"].includes(ln) ? "block" : "none";
    document.getElementById('info-selLinRV').style.display = ["Barnum"].includes(ln) ? "block" : "none";
    document.getElementById('info-selLin4').style.display = ["D.","Kong","Silvers"].includes(ln) ? "block" : "none";
    document.getElementById('info-selLinEspAmi').style.display = ["D."].includes(ln) ? "block" : "none";

    let isMink = (rc === "Mink" || (ln === "Charlotte" && rc2 === "Mink"));
    document.getElementById('box-estilo-mink').style.display = isMink ? "flex" : "none";

    let baseClass = (i.classe || "Arqueólogo 1").split(" ")[0];
    let allowedEstilo1 = classStyles[baseClass] || ["Freestyle"];
    let elEst1 = document.getElementById('info-estilo1');
    if (elEst1) {
        let htmlE1 = '<option value="">-- Selecione --</option>';
        allowedEstilo1.forEach(e => {
            let disabled = (e !== "Freestyle" && e !== "Nenhum" && e !== i.estilo1 && [i.estilo2, i.estilo3, i.estilo4].includes(e)) ? "disabled" : "";
            htmlE1 += `<option value="${e}" ${disabled}>${e}</option>`;
        });
        if (elEst1.innerHTML !== htmlE1) elEst1.innerHTML = htmlE1;
        elEst1.value = i.estilo1;
    }

    [2, 3, 4].forEach(n => {
        let elEst = document.getElementById('info-estilo'+n);
        if (elEst) {
            let htmlE = '<option value="">-- Selecione --</option>';
            let otherStyles = [1, 2, 3, 4].filter(x => x !== n).map(x => i['estilo'+x]);
            allStyles.forEach(e => {
                let disabled = (e !== "Freestyle" && e !== "Nenhum" && e !== i['estilo'+n] && otherStyles.includes(e)) ? "disabled" : "";
                htmlE += `<option value="${e}" ${disabled}>${e}</option>`;
            });
            if (elEst.innerHTML !== htmlE) elEst.innerHTML = htmlE;
            elEst.value = i['estilo'+n];
        }
    });

    document.getElementById('info-estilo3').disabled = totalBase < 5000 || isReadOnly;
    document.getElementById('info-estilo4').disabled = totalBase < 10000 || isReadOnly;

    [1, 2, 3, 4].forEach(n => {
        let elFree = document.getElementById('info-freestyle'+n);
        if (elFree) {
            elFree.style.display = i['estilo'+n] === 'Freestyle' ? 'block' : 'none';
            elFree.value = i['freestyle'+n] || "";
        }
    });

    let reqEsp = (rc === "Kuja" || ln === "Silvers") ? 12000 : 15000;
    let espEl = document.getElementById('stat-esp');
    let hasEspPoints = currentChar.stats.esp > 0;
    if(totalBase >= reqEsp || hasEspPoints) { 
        espEl.disabled = isReadOnly ? true : false; 
        espEl.placeholder = "0"; 
        document.getElementById('box-haki').style.display = "block"; 
    } else {
        espEl.disabled = true; espEl.placeholder = `🔒 Requer ${reqEsp.toLocaleString("pt-BR")}`;
        currentChar.stats.esp = 0; currentChar.substats.hArm = 0; currentChar.substats.hObs = 0; currentChar.substats.hRei = 0;
        document.getElementById('box-haki').style.display = "none";
    }

    let amiEl = document.getElementById('stat-ami');
    let temFruta = (i.akumaNome && i.akumaNome !== "nenhuma" && i.akumaNome !== "");
    
    let boxCalcAmi = document.getElementById('box-calcUseAmi');
    if (boxCalcAmi) boxCalcAmi.style.display = (temFruta && ln !== "Silvers") ? "block" : "none";
    
    let containerBoxAmi = document.getElementById('container-boxAmi');
    if (containerBoxAmi) containerBoxAmi.style.display = (ln === "Silvers") ? "none" : "flex";

    if(ln === "Silvers") {
        amiEl.disabled = true; amiEl.placeholder = "🔒 Indisponível";
        currentChar.stats.ami = 0; currentChar.substats.amiAlc = 0; currentChar.substats.amiDur = 0; currentChar.substats.amiPot = 0; currentChar.substats.amiVel = 0;
    } else if(!temFruta) {
        amiEl.disabled = true; amiEl.placeholder = "🔒 Requer Fruta";
        currentChar.stats.ami = 0; currentChar.substats.amiAlc = 0; currentChar.substats.amiDur = 0; currentChar.substats.amiPot = 0; currentChar.substats.amiVel = 0;
    } else { 
        amiEl.disabled = isReadOnly ? true : false; 
        amiEl.placeholder = "0"; 
    }

    let bonus = {d:0, f:0, r:0, v:0, esp:0, ha:0, ho:0, hr:0, ami:0, refl:0, vcorp:0, amiAlc:0, amiDur:0, amiPot:0, amiVel:0, vAgua:0, reflAgua:0, vcorpAgua:0};
    let flatBonus = {d:0, f:0, r:0, v:0, esp:0, ha:0, ho:0, hr:0, ami:0, refl:0, vcorp:0, amiAlc:0, amiDur:0, amiPot:0, amiVel:0, vAgua:0, reflAgua:0, vcorpAgua:0};

    if (i.alcunhasList && i.alcunhaAtiva) {
        let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
        if (ativa && ativa.buffs) {
            ativa.buffs.forEach(b => {
                let targets = b.stat === "tudo" ? ["d","f","r","v"] : [b.stat];
                targets.forEach(t => {
                    if (b.type === "pct") { if(typeof bonus[t] !== 'undefined') bonus[t] += (b.val / 100); }
                    else { if(typeof flatBonus[t] !== 'undefined') flatBonus[t] += b.val; }
                });
            });
        }
    }

    if(combatenteLevel > 0) { bonus[i.selClasseDF] += combatenteLevel * 0.05; }

    if(ln !== "Charlotte") {
        if(racas[rc]) { 
            bonus.d += racas[rc].d || 0; bonus.f += racas[rc].f || 0; bonus.r += racas[rc].r || 0; bonus.v += racas[rc].v || 0; 
        } else if (isNPC && rc === 'Outra') {
            bonus.f += (parseInt(i.customBuffF) || 0) / 100;
            bonus.d += (parseInt(i.customBuffD) || 0) / 100;
            bonus.r += (parseInt(i.customBuffR) || 0) / 100;
            bonus.v += (parseInt(i.customBuffV) || 0) / 100;
        }
        if(rc === "Humano") { bonus[i.selDF] += 0.20; bonus[i.selRV] += 0.20; } else if(rc === "Kuja") { bonus[i.selDF] += 0.30; bonus[i.selRV] += 0.20; } else if(rc === "Três-Olhos" || rc === "Mink") { bonus[i.selDF] += 0.15; }
    } else {
        let applyCharlotteBuff = (rName, selVal, suffix = "") => {
            if (racas[rName]) {
                for (let s in racas[rName]) { if (racas[rName][s] < 0) bonus[s] += racas[rName][s]; }
            } else if (isNPC && rName === 'Outra') {
                bonus.f += (parseInt(i['customBuffF' + suffix]) || 0) / 100;
                bonus.d += (parseInt(i['customBuffD' + suffix]) || 0) / 100;
                bonus.r += (parseInt(i['customBuffR' + suffix]) || 0) / 100;
                bonus.v += (parseInt(i['customBuffV' + suffix]) || 0) / 100;
            }
            if (selVal) {
                if (rName === "Humano") bonus[selVal] += 0.20;
                else if (rName === "Kuja") bonus[selVal] += (selVal === "f" || selVal === "d") ? 0.30 : 0.20;
                else if (racas[rName] && racas[rName][selVal] > 0) bonus[selVal] += racas[rName][selVal];
            }
        };
        applyCharlotteBuff(rc, i.selCharR1);
        applyCharlotteBuff(rc2, i.selCharR2, "2");
    }

    if(document.getElementById('container-linhagem').style.display === "block" && linhagens[ln]) {
            bonus.d += linhagens[ln].d || 0; bonus.f += linhagens[ln].f || 0; bonus.r += linhagens[ln].r || 0; bonus.v += linhagens[ln].v || 0; bonus.esp += linhagens[ln].esp || 0; bonus.ha += linhagens[ln].ha || 0; bonus.ho += linhagens[ln].ho || 0; bonus.hr += linhagens[ln].hr || 0; bonus.ami += linhagens[ln].ami || 0;
            
            if(ln === "Barnum") { bonus[i.selLinDF] += 0.15; bonus[i.selLinRV] += 0.15; } else if(ln === "D.") { bonus[i.selLin4] += 0.15; bonus[i.selLinEspAmi] += 0.15; } else if(ln === "Gan") { bonus[i.selLinDF] += 0.15; } else if(ln === "Kong") { bonus[i.selLin4] += 0.10; } else if(ln === "Silvers") { bonus[i.selLin4] += 0.15; }
        }

        let mandHab = linhagemHabilidades[ln] || [];
        let currentHabSet = new Set(i.habilidadesExclusivas || []);
        mandHab.forEach(h => currentHabSet.add(h));
        i.habilidadesExclusivas = Array.from(currentHabSet);

        let habListHtml = "";
        let habSelectHtml = '<option value="">-- Adicionar Habilidade --</option>';
        Object.keys(habilidadesExclusivasDict).forEach(hab => {
            if (!i.habilidadesExclusivas.includes(hab)) habSelectHtml += `<option value="${hab}">${hab}</option>`;
        });
        i.habilidadesExclusivas.forEach(hab => {
            let isMandatory = mandHab.includes(hab);
            habListHtml += `<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:4px 8px; border-radius:4px; border:1px solid #444;">
                <span style="font-size:12px;">${hab}</span>
                ${isMandatory ? '<span style="font-size:10px; color:#aaa;">(Linhagem)</span>' : `<button class="btn btn-outline btn-danger" style="padding:2px 6px; font-size:10px; margin:0;" onclick="removeHabilidade('${hab}')">X</button>`}
            </div>`;
        });
        let habSelEl = document.getElementById('hab-select'); if(habSelEl) habSelEl.innerHTML = habSelectHtml;
        let habListEl = document.getElementById('hab-list'); if(habListEl) habListEl.innerHTML = habListHtml;

        let hasHab = (hab) => i.habilidadesExclusivas.includes(hab);
        let hasAtirador = hasHab("Caminho do Atirador");
        let hasFavArm = hasHab("Favoritismo Armista");
        let hasQI = hasHab("QI Avançado");
        let isBeckman = ln === "Beckman";
        
        let habAtivosContainer = document.getElementById('hab-ativos');
        if(habAtivosContainer) {
            habAtivosContainer.style.display = (hasAtirador || hasFavArm || hasQI || isBeckman) ? 'block' : 'none';
            let elAtirador = document.getElementById('hab-ativo-atirador'); if(elAtirador) { elAtirador.style.display = hasAtirador ? 'block' : 'none'; document.getElementById('chk-atirador').checked = i.habCaminhoAtiradorAtivo; }
            let elQI = document.getElementById('hab-ativo-qi'); if(elQI) { elQI.style.display = hasQI ? 'block' : 'none'; document.getElementById('chk-qi').checked = i.habQIAvancadoAtivo; }
            let elBeckman = document.getElementById('hab-ativo-beckman'); if(elBeckman) { elBeckman.style.display = isBeckman ? 'block' : 'none'; document.getElementById('chk-beckman').checked = i.linhagemBeckmanArma; }
            let elArmista = document.getElementById('hab-ativo-armista'); if(elArmista) { elArmista.style.display = hasFavArm ? 'flex' : 'none'; document.getElementById('sel-armista-ativo').value = i.habFavArmistaAtivo; document.getElementById('sel-armista-attr').value = i.habFavArmistaAttr; }
        }

        if(hasHab("Arte da Esgrima")) { if(totalBase >= 15000) bonus.d += 0.20; else if(totalBase >= 10000) bonus.d += 0.15; else if(totalBase >= 5000) bonus.d += 0.10; }
        if(hasHab("Batedor de Carteiras")) { if(totalBase >= 15000) bonus.d += 0.25; else if(totalBase >= 10000) bonus.d += 0.20; else if(totalBase >= 5000) bonus.d += 0.15; }
        if(hasHab("Caminho do Atirador")) { 
            if(totalBase >= 15000) bonus.d += 0.15; else if(totalBase >= 10000) bonus.d += 0.10; else if(totalBase >= 5000) bonus.d += 0.05; 
            if(i.habCaminhoAtiradorAtivo) { if(totalBase >= 15000) bonus.d += 0.20; else if(totalBase >= 10000) bonus.d += 0.15; else if(totalBase >= 5000) bonus.d += 0.10; }
        }
        if(hasHab("Constituição Única")) { bonus.f += 0.10; bonus.r += 0.15; }
        if(hasHab("Contração Muscular")) { if(totalBase >= 10000) { bonus.f += 0.20; bonus.r += 0.20; } else if(totalBase >= 5000) { bonus.f += 0.10; bonus.r += 0.10; } }
        if(hasHab("Favoritismo Armista")) {
            if(totalBase >= 15000) {
                if(i.habFavArmistaAtivo === "favorita") { bonus.r += 0.15; bonus.v += 0.15; }
                else if(i.habFavArmistaAtivo === "criacao") { bonus.r += 0.20; bonus.v += 0.20; }
                else if(i.habFavArmistaAtivo === "criacao_favorita") { bonus.r += 0.25; bonus.v += 0.25; }
            } else if(totalBase >= 10000) {
                if(i.habFavArmistaAtivo === "criacao" || i.habFavArmistaAtivo === "criacao_favorita") { 
                    bonus.r += 0.10; bonus.v += 0.10; 
                    if(i.habFavArmistaAttr === 'f') bonus.f += 0.10; else bonus.d += 0.10;
                }
            }
        }
        if(hasHab("Filho do Mar")) { if(totalBase >= 15000) { bonus.refl += 0.15; bonus.r += 0.15; } else if(totalBase >= 10000) { bonus.refl += 0.10; bonus.r += 0.10; } else if(totalBase >= 5000) { bonus.refl += 0.05; bonus.r += 0.05; } }
        if(hasHab("Flexibilidade")) { if(totalBase >= 10000) bonus.v += 0.20; else if(totalBase >= 5000) bonus.v += 0.10; }
        if(hasHab("Fúria Ardente")) { if(totalBase >= 15000) bonus.f += 0.15; else if(totalBase >= 10000) bonus.f += 0.10; else if(totalBase >= 5000) bonus.f += 0.05; }
        if(hasHab("O Escolhido")) { if(totalBase >= 20000) { bonus.ha += 0.15; bonus.ho += 0.15; bonus.hr += 0.15; } else if(totalBase >= 10000) { bonus.ha += 0.10; bonus.ho += 0.10; bonus.hr += 0.10; } else if(totalBase >= 5000) { bonus.ha += 0.05; bonus.ho += 0.05; bonus.hr += 0.05; } }
        if(hasHab("Pensamento Acelerado")) { if(totalBase >= 10000) bonus.refl += 0.25; else if(totalBase >= 5000) bonus.refl += 0.20; }
        if(hasHab("QI Avançado")) { if(i.habQIAvancadoAtivo) bonus.refl += 0.05; }
        if(isBeckman && i.linhagemBeckmanArma) { bonus.v += 0.05; }

    const statFields = ['f', 'd', 'r', 'v', 'esp', 'ami'];
    statFields.forEach(f => { let el = document.getElementById('stat-'+f); if(el) el.value = currentChar.stats[f] ? currentChar.stats[f].toLocaleString("pt-BR") : ""; });

    let estTotalVal = Math.round((R + flatBonus.r) * (1 + bonus.r)) * 2;
    if (ln === "Beckman") estTotalVal = Math.floor(estTotalVal * 1.10);
    if (typeof i.lastEstTotal === 'undefined') i.lastEstTotal = estTotalVal;
    if (estTotalVal !== i.lastEstTotal && (i.estaminaAtual === 0 || i.estaminaAtual === i.lastEstTotal)) i.estaminaAtual = estTotalVal;
    i.lastEstTotal = estTotalVal;
    if (typeof i.estaminaAtual === 'undefined' || i.estaminaAtual === -1) i.estaminaAtual = estTotalVal;
    if (i.estaminaAtual > estTotalVal) i.estaminaAtual = estTotalVal;

    if (i.exaustaoCompleta) {
        bonus.d -= 0.20; bonus.f -= 0.20; bonus.r -= 0.20; bonus.v -= 0.20; bonus.esp -= 0.20; bonus.ami -= 0.20;
    }

    let totalD = Math.round((D + flatBonus.d) * (1 + bonus.d)); document.getElementById('total-d').innerText = "Total: " + totalD.toLocaleString("pt-BR");
    let totalF = Math.round((F + flatBonus.f) * (1 + bonus.f)); document.getElementById('total-f').innerText = "Total: " + totalF.toLocaleString("pt-BR");
    let totalR = Math.round((R + flatBonus.r) * (1 + bonus.r)); document.getElementById('total-r').innerText = "Total: " + totalR.toLocaleString("pt-BR");
    
    let waterBuffV = 0;
    if(ln !== "Charlotte") {
        if(rc === "Sereiano") waterBuffV += 0.40;
        if(rc === "Tritão") waterBuffV += 0.30;
    } else {
        if(rc === "Sereiano" && i.selCharR1 === "v") waterBuffV += 0.40;
        if(rc === "Tritão" && i.selCharR1 === "v") waterBuffV += 0.30;
        if(rc2 === "Sereiano" && i.selCharR2 === "v") waterBuffV += 0.40;
        if(rc2 === "Tritão" && i.selCharR2 === "v") waterBuffV += 0.30;
    }
    if(document.getElementById('container-linhagem').style.display === "block" && ln === "Neptune") {
        waterBuffV += 0.25;
        if(totalBase >= 10000) waterBuffV += 0.20;
        else if(totalBase >= 5000) waterBuffV += 0.10;
    }
    bonus.v -= waterBuffV;

    let totalV = Math.round((V + flatBonus.v) * (1 + bonus.v)); document.getElementById('total-v').innerText = "Total: " + totalV.toLocaleString("pt-BR");
    document.getElementById('container-boxVel').style.display = totalV > 0 ? "block" : "none";
    
    if(totalV === 0) { currentChar.substats.refl = 0; currentChar.substats.vcorp = 0; }
    
    let REF = currentChar.substats.refl || 0, VCORP = currentChar.substats.vcorp || 0;
    let totalVelSub = REF + VCORP;
    
    if(totalVelSub > totalV) {
        let diff = totalVelSub - totalV;
        let active = document.activeElement;
        if(active && active.id === 'sub-refl') { REF -= diff; currentChar.substats.refl = REF; }
        else if(active && active.id === 'sub-vcorp') { VCORP -= diff; currentChar.substats.vcorp = VCORP; }
        else {
            if(VCORP >= diff) { VCORP -= diff; currentChar.substats.vcorp = VCORP; }
            else if(REF >= diff) { REF -= diff; currentChar.substats.refl = REF; }
        }
        document.getElementById('avisoVel').style.display = "block"; document.getElementById('avisoVel').textContent = `Limite atingido!\n Máx: ${totalV.toLocaleString("pt-BR")}`;
    } else if (totalVelSub < totalV && totalV > 0) {
        let diff = totalV - totalVelSub;
        document.getElementById('avisoVel').style.display = "block"; document.getElementById('avisoVel').textContent = `Pontos não distribuídos nos sub-atributos de Velocidade: ${diff.toLocaleString("pt-BR")}`;
    } else { document.getElementById('avisoVel').style.display = "none"; }
    
    document.getElementById('sub-refl').value = currentChar.substats.refl ? currentChar.substats.refl.toLocaleString("pt-BR") : "";
    document.getElementById('sub-vcorp').value = currentChar.substats.vcorp ? currentChar.substats.vcorp.toLocaleString("pt-BR") : "";

    let hasWaterDiff = (waterBuffV !== 0 || bonus.vAgua !== 0 || flatBonus.vAgua !== 0 || bonus.reflAgua !== 0 || flatBonus.reflAgua !== 0 || bonus.vcorpAgua !== 0 || flatBonus.vcorpAgua !== 0);
    let elBoxVelAgua = document.getElementById('container-boxVelAgua');
    if (elBoxVelAgua) {
        if (hasWaterDiff && V > 0) {
            elBoxVelAgua.style.display = "block";
            
            let totalBonusVAgua = bonus.v + waterBuffV + bonus.vAgua;
            let totalFlatBonusVAgua = flatBonus.v + flatBonus.vAgua;
            let totalVAgua = Math.round((V + totalFlatBonusVAgua) * (1 + totalBonusVAgua));
            document.getElementById('total-vAgua').innerText = "Total na Água: " + totalVAgua.toLocaleString("pt-BR");
            
            if(typeof currentChar.substats.reflAgua === 'undefined') currentChar.substats.reflAgua = 0;
            if(typeof currentChar.substats.vcorpAgua === 'undefined') currentChar.substats.vcorpAgua = 0;
            
            let REFAgua = currentChar.substats.reflAgua || 0, VCORPAgua = currentChar.substats.vcorpAgua || 0;
            let isBuffAgua = totalVAgua >= totalV;

            if (isBuffAgua) {
                if (REFAgua < REF) { REFAgua = REF; currentChar.substats.reflAgua = REFAgua; }
                if (VCORPAgua < VCORP) { VCORPAgua = VCORP; currentChar.substats.vcorpAgua = VCORPAgua; }
            } else {
                if (REFAgua > REF) { REFAgua = REF; currentChar.substats.reflAgua = REFAgua; }
                if (VCORPAgua > VCORP) { VCORPAgua = VCORP; currentChar.substats.vcorpAgua = VCORPAgua; }
            }
            
            let totalVelSubAgua = REFAgua + VCORPAgua;
            
            if(totalVelSubAgua > totalVAgua) {
                let diff = totalVelSubAgua - totalVAgua;
                let active = document.activeElement;
                if(active && active.id === 'sub-reflAgua') { 
                    REFAgua -= diff; 
                    if(isBuffAgua && REFAgua < REF) { VCORPAgua -= (REF - REFAgua); REFAgua = REF; currentChar.substats.vcorpAgua = VCORPAgua; }
                    currentChar.substats.reflAgua = REFAgua; 
                }
                else if(active && active.id === 'sub-vcorpAgua') { 
                    VCORPAgua -= diff; 
                    if(isBuffAgua && VCORPAgua < VCORP) { REFAgua -= (VCORP - VCORPAgua); VCORPAgua = VCORP; currentChar.substats.reflAgua = REFAgua; }
                    currentChar.substats.vcorpAgua = VCORPAgua; 
                }
                else {
                    if(isBuffAgua) {
                        if(VCORPAgua - diff >= VCORP) { VCORPAgua -= diff; currentChar.substats.vcorpAgua = VCORPAgua; }
                        else if(REFAgua - diff >= REF) { REFAgua -= diff; currentChar.substats.reflAgua = REFAgua; }
                        else { REFAgua = REF; VCORPAgua = VCORP; currentChar.substats.reflAgua = REFAgua; currentChar.substats.vcorpAgua = VCORPAgua; }
                    } else {
                        if(VCORPAgua >= diff) { VCORPAgua -= diff; currentChar.substats.vcorpAgua = VCORPAgua; }
                        else if(REFAgua >= diff) { REFAgua -= diff; currentChar.substats.reflAgua = REFAgua; }
                        else { REFAgua = 0; VCORPAgua = 0; currentChar.substats.reflAgua = 0; currentChar.substats.vcorpAgua = 0; }
                    }
                }
                document.getElementById('avisoVelAgua').style.display = "block"; document.getElementById('avisoVelAgua').textContent = `Limite atingido!\n Máx: ${totalVAgua.toLocaleString("pt-BR")}`;
            } else if (totalVelSubAgua < totalVAgua && totalVAgua > 0) {
                let diff = totalVAgua - totalVelSubAgua;
                document.getElementById('avisoVelAgua').style.display = "block"; document.getElementById('avisoVelAgua').textContent = `Pontos não distribuídos na Água: ${diff.toLocaleString("pt-BR")}`;
            } else { document.getElementById('avisoVelAgua').style.display = "none"; }
            
            document.getElementById('sub-reflAgua').value = currentChar.substats.reflAgua ? currentChar.substats.reflAgua.toLocaleString("pt-BR") : "";
            document.getElementById('sub-vcorpAgua').value = currentChar.substats.vcorpAgua ? currentChar.substats.vcorpAgua.toLocaleString("pt-BR") : "";
        } else {
            elBoxVelAgua.style.display = "none";
            if(currentChar.substats.reflAgua) currentChar.substats.reflAgua = 0; 
            if(currentChar.substats.vcorpAgua) currentChar.substats.vcorpAgua = 0;
        }
    }

    let ESP = currentChar.stats.esp; let totalEsp = Math.round((ESP + flatBonus.esp) * (1 + bonus.esp)); document.getElementById('total-esp').innerText = "Total: " + totalEsp.toLocaleString("pt-BR");
    
    let HA = currentChar.substats.hArm || 0, HO = currentChar.substats.hObs || 0, HR = currentChar.substats.hRei || 0;
    let totalHaki = HA + HO + HR;
    
    if(totalHaki > totalEsp) {
        let diff = totalHaki - totalEsp; let active = document.activeElement;
        if(active && active.id === 'sub-hArm') { HA -= diff; currentChar.substats.hArm = HA; }
        else if(active && active.id === 'sub-hObs') { HO -= diff; currentChar.substats.hObs = HO; }
        else if(active && active.id === 'sub-hRei') { HR -= diff; currentChar.substats.hRei = HR; }
        else {
            if(HR >= diff) { HR -= diff; currentChar.substats.hRei = HR; } else if(HO >= diff) { HO -= diff; currentChar.substats.hObs = HO; } else if(HA >= diff) { HA -= diff; currentChar.substats.hArm = HA; }
        }
        document.getElementById('avisoEsp').style.display = "block"; document.getElementById('avisoEsp').textContent = `Limite atingido! Máx: ${totalEsp.toLocaleString("pt-BR")}`;
    } else if (totalHaki < totalEsp && totalEsp > 0) {
        let diff = totalEsp - totalHaki;
        document.getElementById('avisoEsp').style.display = "block"; document.getElementById('avisoEsp').textContent = `Pontos não distribuídos nos sub-atributos de Espírito: ${diff.toLocaleString("pt-BR")}`;
    } else { document.getElementById('avisoEsp').style.display = "none"; }
    
    document.getElementById('sub-hArm').value = currentChar.substats.hArm ? currentChar.substats.hArm.toLocaleString("pt-BR") : "";
    document.getElementById('sub-hObs').value = currentChar.substats.hObs ? currentChar.substats.hObs.toLocaleString("pt-BR") : "";
    document.getElementById('sub-hRei').value = currentChar.substats.hRei ? currentChar.substats.hRei.toLocaleString("pt-BR") : "";

    ['amiAlc', 'amiDur', 'amiPot', 'amiVel', 'amiDesp'].forEach(f => {
        let chk = document.getElementById('chk-' + f); let inp = document.getElementById('sub-' + f); let key = 'has' + f.charAt(0).toUpperCase() + f.slice(1);
        let has = i[key]; if (chk) chk.checked = has; if (inp) inp.disabled = !has || isReadOnly;
    });

    let AMI = currentChar.stats.ami;
    
    let baseAmiStats = 0;
    if(i.hasAmiAlc) baseAmiStats++; if(i.hasAmiDur) baseAmiStats++; if(i.hasAmiPot) baseAmiStats++; if(i.hasAmiVel) baseAmiStats++;
    
    let maxStatAmiInput = (baseAmiStats * 10000) + (i.hasAmiDesp ? 10000 : 0);
    if (AMI > maxStatAmiInput) {
        AMI = maxStatAmiInput;
        currentChar.stats.ami = AMI;
        let amiElUpdate = document.getElementById('stat-ami');
        if (amiElUpdate) amiElUpdate.value = AMI.toLocaleString("pt-BR");
    }

    let totalAmi = Math.round((AMI + flatBonus.ami) * (1 + bonus.ami)); document.getElementById('total-ami').innerText = "Total: " + totalAmi.toLocaleString("pt-BR");
    document.getElementById('box-amiSub').style.display = AMI > 0 ? "block" : "none";
    if(AMI === 0) { currentChar.substats.amiAlc = 0; currentChar.substats.amiDur = 0; currentChar.substats.amiPot = 0; currentChar.substats.amiVel = 0; currentChar.substats.amiDesp = 0; }
    
    let activeAmiStats = baseAmiStats + (i.hasAmiDesp ? 1 : 0);

    let maxAmiPoints = 10000;
    if (bonus.ami > 0 && activeAmiStats > 0) {
        maxAmiPoints = Math.max(10000, Math.floor(totalAmi / activeAmiStats));
    }

    let aAlc = currentChar.substats.amiAlc || 0, aDur = currentChar.substats.amiDur || 0, aPot = currentChar.substats.amiPot || 0, aVel = currentChar.substats.amiVel || 0, aDesp = currentChar.substats.amiDesp || 0;
    
    let controlePct = 0;
    if(baseAmiStats > 0) {
        let currentBasePoints = aAlc + aDur + aPot + aVel;
        controlePct = Math.round((currentBasePoints / (baseAmiStats * 10000)) * 100);
    }

    let despContainer = document.getElementById('box-despertar');
    if (despContainer) {
        if (controlePct >= 100) {
            despContainer.style.opacity = '1';
            despContainer.style.pointerEvents = 'auto';
        } else {
            despContainer.style.opacity = '0.5';
            despContainer.style.pointerEvents = 'none';
            if (aDesp > 0 || i.hasAmiDesp) {
                currentChar.substats.amiDesp = 0;
                i.hasAmiDesp = false;
                aDesp = 0;
                let chkDesp = document.getElementById('chk-amiDesp'); if(chkDesp) chkDesp.checked = false;
                let subDesp = document.getElementById('sub-amiDesp'); if(subDesp) subDesp.value = "";
                
                maxStatAmiInput = baseAmiStats * 10000;
                if (AMI > maxStatAmiInput) {
                    AMI = maxStatAmiInput;
                    currentChar.stats.ami = AMI;
                    let amiElUpdate = document.getElementById('stat-ami');
                    if (amiElUpdate) amiElUpdate.value = AMI.toLocaleString("pt-BR");
                    totalAmi = Math.round((AMI + flatBonus.ami) * (1 + bonus.ami)); document.getElementById('total-ami').innerText = "Total: " + totalAmi.toLocaleString("pt-BR");
                }
                activeAmiStats = baseAmiStats;
                maxAmiPoints = Math.max(10000, Math.floor(totalAmi / activeAmiStats));
            }
        }
    }

    let limitAmiExcedido = false;
    if(aAlc > maxAmiPoints) { aAlc = maxAmiPoints; currentChar.substats.amiAlc = maxAmiPoints; limitAmiExcedido = true; }
    if(aDur > maxAmiPoints) { aDur = maxAmiPoints; currentChar.substats.amiDur = maxAmiPoints; limitAmiExcedido = true; }
    if(aPot > maxAmiPoints) { aPot = maxAmiPoints; currentChar.substats.amiPot = maxAmiPoints; limitAmiExcedido = true; }
    if(aVel > maxAmiPoints) { aVel = maxAmiPoints; currentChar.substats.amiVel = maxAmiPoints; limitAmiExcedido = true; }
    if(aDesp > maxAmiPoints) { aDesp = maxAmiPoints; currentChar.substats.amiDesp = maxAmiPoints; limitAmiExcedido = true; }
    
    let totalAmiSub = aAlc + aDur + aPot + aVel + aDesp;
    let pontosDisponiveis = totalAmi - totalAmiSub;
    let elDisp = document.getElementById('ami-distribuiveis');
    if(elDisp) elDisp.textContent = `Disponível: ${Math.max(0, pontosDisponiveis).toLocaleString("pt-BR")}`;
    
    if(totalAmiSub > totalAmi) {
        let diff = totalAmiSub - totalAmi; let active = document.activeElement;
        if(active && active.id === 'sub-amiAlc') { aAlc -= diff; currentChar.substats.amiAlc = Math.max(0, aAlc); }
        else if(active && active.id === 'sub-amiDur') { aDur -= diff; currentChar.substats.amiDur = Math.max(0, aDur); }
        else if(active && active.id === 'sub-amiPot') { aPot -= diff; currentChar.substats.amiPot = Math.max(0, aPot); }
        else if(active && active.id === 'sub-amiVel') { aVel -= diff; currentChar.substats.amiVel = Math.max(0, aVel); }
        else if(active && active.id === 'sub-amiDesp') { aDesp -= diff; currentChar.substats.amiDesp = Math.max(0, aDesp); }
        else {
            if(aDesp >= diff) { aDesp -= diff; currentChar.substats.amiDesp = Math.max(0, aDesp); }
            else if(aVel >= diff) { aVel -= diff; currentChar.substats.amiVel = Math.max(0, aVel); } 
            else if(aPot >= diff) { aPot -= diff; currentChar.substats.amiPot = Math.max(0, aPot); }
            else if(aDur >= diff) { aDur -= diff; currentChar.substats.amiDur = Math.max(0, aDur); } 
            else if(aAlc >= diff) { aAlc -= diff; currentChar.substats.amiAlc = Math.max(0, aAlc); }
        }
        document.getElementById('avisoAmi').style.display = "block"; document.getElementById('avisoAmi').textContent = `Limite atingido! Máx: ${totalAmi.toLocaleString("pt-BR")}`;
    } else if (limitAmiExcedido) {
        document.getElementById('avisoAmi').style.display = "block"; document.getElementById('avisoAmi').textContent = `Máximo de ${maxAmiPoints.toLocaleString("pt-BR")} pontos por atributo alcançado!`;
    } else { document.getElementById('avisoAmi').style.display = "none"; }
    
    document.getElementById('sub-amiAlc').value = currentChar.substats.amiAlc ? currentChar.substats.amiAlc.toLocaleString("pt-BR") : "";
    document.getElementById('sub-amiDur').value = currentChar.substats.amiDur ? currentChar.substats.amiDur.toLocaleString("pt-BR") : "";
    document.getElementById('sub-amiPot').value = currentChar.substats.amiPot ? currentChar.substats.amiPot.toLocaleString("pt-BR") : "";
    document.getElementById('sub-amiVel').value = currentChar.substats.amiVel ? currentChar.substats.amiVel.toLocaleString("pt-BR") : "";
    let despEl = document.getElementById('sub-amiDesp');
    if (despEl) despEl.value = currentChar.substats.amiDesp ? currentChar.substats.amiDesp.toLocaleString("pt-BR") : "";

    let amiResPctVal = parseInt(i.amiResPct) || 0;
    if (amiResPctVal > 0 && aDur > 0) {
        let totalDurCalc = aDur + Math.floor(aDur * (amiResPctVal / 100));
        document.getElementById('ami-res-total').textContent = `(${aDur.toLocaleString("pt-BR")} + ${amiResPctVal}% = ${totalDurCalc.toLocaleString("pt-BR")})`;
    } else { document.getElementById('ami-res-total').textContent = ""; }

    let baseCalcAttr = parseInt(i.calcUseAttr) || 0;
    let buffFlat = parseInt(i.calcBuffFlat) || 0;
    let buffPct = parseInt(i.calcBuffPct) || 0;
    let step1Attr = baseCalcAttr + buffFlat;
    let calcAttrVal = step1Attr;
    if (buffPct !== 0) {
        calcAttrVal = step1Attr + Math.floor(step1Attr * (buffPct / 100));
    }

    let calcResInimiga = parseInt(i.calcInimigoRes) || 0;
    let calcResIgn = parseInt(i.calcResIgnorada) || 0;
    let calcRes = calcResInimiga - Math.floor(calcResInimiga * (calcResIgn / 100));
    if (calcRes < 0) calcRes = 0;
    let K = 25000;
    
    let isParamecia = false;
    if (typeof akumasFixas !== 'undefined' && i.akumaNome) {
        if (akumasFixas['Paramecia'].includes(i.akumaNome) || akumasFixas['Paramecia Especial'].includes(i.akumaNome)) isParamecia = true;
    }
    
    let calcAPot = Math.round((aPot + flatBonus.amiPot) * (1 + bonus.amiPot));
    let danoAmi = 0;
    if (i.calcUseAmi !== 'nao' && isParamecia) {
        danoAmi = Math.floor(calcAPot * (controlePct / 100));
    }

    let calcHA = Math.round((HA + flatBonus.ha) * (1 + bonus.ha));
    let elCalcUseHaki = document.getElementById('info-calcUseHaki');
    if (elCalcUseHaki) {
        let htmlHaki = '<option value="nao">Não</option>';
        if (calcHA > 0) {
            htmlHaki += '<option value="invisivel">Haki do Armamento Invisível</option>';
            htmlHaki += '<option value="visivel">Haki do Armamento Visível</option>';
            if (calcHA >= 3000) htmlHaki += '<option value="imbuicao">Haki do Armamento: Imbuição</option>';
            if (calcHA >= 5000) htmlHaki += '<option value="fullbody">Haki do Armamento: Full Body</option>';
            if (calcHA >= 7000) htmlHaki += '<option value="emissao">Haki do Armamento: Emissão</option>';
            if (calcHA >= 8000) htmlHaki += '<option value="avancado">Haki do Armamento: Avançado</option>';
        }
        if (elCalcUseHaki.innerHTML !== htmlHaki) elCalcUseHaki.innerHTML = htmlHaki;
        if (Array.from(elCalcUseHaki.options).some(o => o.value === i.calcUseHaki)) {
            elCalcUseHaki.value = i.calcUseHaki;
        } else {
            elCalcUseHaki.value = "nao";
            i.calcUseHaki = "nao";
        }
    }
    let danoHaki = 0;
    if (calcHA > 0) {
        if (i.calcUseHaki === 'invisivel') danoHaki = Math.floor(calcHA * 0.25);
        else if (i.calcUseHaki === 'visivel') danoHaki = Math.floor(calcHA * 0.50);
        else if (i.calcUseHaki === 'imbuicao') danoHaki = Math.floor(calcHA * 0.80);
        else if (i.calcUseHaki === 'fullbody') danoHaki = calcHA;
        else if (i.calcUseHaki === 'emissao') danoHaki = calcHA;
        else if (i.calcUseHaki === 'avancado') {
            danoHaki = calcHA;
            calcRes = Math.floor(calcRes * 0.75);
        }
    }

    let calcAttrSemAmi = calcAttrVal;
    calcAttrVal += danoHaki + danoAmi;

    let favArmDano = 0;
    if (hasHab("Favoritismo Armista") && totalBase >= 15000) {
        if(i.habFavArmistaAtivo === "favorita") favArmDano = 0.10;
        else if(i.habFavArmistaAtivo === "criacao") favArmDano = 0.15;
        else if(i.habFavArmistaAtivo === "criacao_favorita") favArmDano = 0.20;
    }
    if (favArmDano > 0) calcAttrVal += Math.floor(calcAttrVal * favArmDano);

    let calcFator = K / (K + calcRes);
    let danoFisico = Math.floor(calcAttrVal * calcFator);
    let calcDanoFinal = danoFisico;
    
    document.getElementById('calc-dano-final').textContent = calcDanoFinal.toLocaleString("pt-BR");
    
    let calcFormTexto = "";
    if (buffFlat > 0 || buffPct !== 0 || danoAmi > 0 || danoHaki > 0) {
        calcFormTexto += `<span style="color:#0dcaf0;">${baseCalcAttr.toLocaleString("pt-BR")} (Atributo)</span>`;
        if (buffFlat > 0) calcFormTexto += ` <span style="color:#ffc107;">+ ${buffFlat.toLocaleString("pt-BR")} (Bônus de Estilo) = ${step1Attr.toLocaleString("pt-BR")}</span>`;
        if (buffPct !== 0) calcFormTexto += ` <span style="color:#198754;">+ ${buffPct}% (Buff Ativo) = ${calcAttrSemAmi.toLocaleString("pt-BR")}</span>`;
        
        let somaAtual = calcAttrSemAmi;
        if (danoHaki > 0) {
            somaAtual += danoHaki;
            calcFormTexto += ` <span style="color:#a461ff;">+ ${danoHaki.toLocaleString("pt-BR")} (Haki) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
        }
        if (danoAmi > 0) {
            somaAtual += danoAmi;
            calcFormTexto += ` <span style="color:#dc3545;">+ ${danoAmi.toLocaleString("pt-BR")} (Bônus Paramecia: ${controlePct}% de ${aPot.toLocaleString("pt-BR")}) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
        }
        calcFormTexto += `<br>`;
    }
    if (calcResIgn > 0) {
        calcFormTexto += `Resistência Ignorada: ${calcResInimiga.toLocaleString("pt-BR")} - ${calcResIgn}% = ${calcRes.toLocaleString("pt-BR")}<br>`;
    }
    calcFormTexto += `Dano Básico: ${calcAttrVal.toLocaleString("pt-BR")} × (${K.toLocaleString("pt-BR")} / (${K.toLocaleString("pt-BR")} + ${calcRes.toLocaleString("pt-BR")})) = ${danoFisico.toLocaleString("pt-BR")}`;
    document.getElementById('calc-formula').innerHTML = calcFormTexto;

    document.getElementById('estamina-total').textContent = estTotalVal.toLocaleString("pt-BR");
    let elEstAtual = document.getElementById('estamina-atual');
    if (elEstAtual) elEstAtual.value = i.estaminaAtual.toLocaleString("pt-BR");

    let eVel = parseInt(i.estaminaVelocidade) || 0;
    let eDano = parseInt(i.estaminaDano) || 0;
    let eBuff = parseInt(i.estaminaBuffPct) || 0;
    let eHArm = i.estaminaHakiArm === 'sim' ? 300 : 0;
    let eHObs = i.estaminaHakiObs === 'sim' ? 200 : 0;

    let custoVel = Math.floor(eVel * 0.10);
    let custoDano = Math.floor(eDano * 0.10);
    let custoBuff = Math.floor((eBuff / 10) * 150);
    let custoHaki = eHArm + eHObs;

    let custoEstTotal = custoVel + custoDano + custoBuff + custoHaki;
    if (hasHab("Arte da Esgrima") && totalBase >= 5000) custoEstTotal = Math.floor(custoEstTotal * 0.80);
    if (hasHab("QI Avançado")) custoEstTotal = Math.floor(custoEstTotal * 0.50);
    document.getElementById('estamina-custo-final').textContent = custoEstTotal.toLocaleString("pt-BR");

    let estFormula = "";
    if (custoEstTotal > 0) {
        if (custoVel > 0) estFormula += `<span style="color:#0dcaf0;">+ ${custoVel.toLocaleString("pt-BR")} (10% de Vel.)</span><br>`;
        if (custoDano > 0) estFormula += `<span style="color:#dc3545;">+ ${custoDano.toLocaleString("pt-BR")} (10% de Dano)</span><br>`;
        if (custoBuff > 0) estFormula += `<span style="color:#198754;">+ ${custoBuff.toLocaleString("pt-BR")} (${eBuff}% de Buff)</span><br>`;
        if (custoHaki > 0) estFormula += `<span style="color:#a461ff;">+ ${custoHaki.toLocaleString("pt-BR")} (Haki)</span><br>`;
        estFormula += `Gasto Total: ${custoEstTotal.toLocaleString("pt-BR")} de Estamina`;
    } else {
        estFormula = "Nenhum gasto registrado.";
    }
    document.getElementById('estamina-formula').innerHTML = estFormula;

    let typeMin = { "Treino Padrão": 250, "Treino de Técnicas": 60, "Interação": 50, "Missão": 250, "Recrutar NPCs": 200, "Trabalho Tipo 1": 200, "Trabalho Tipo 2": 300, "Trabalho Tipo 3": 500, "Extra-Narrada": 2000 };
    let sceneTxt = i.sceneText || "";
    let sChars = sceneTxt.length;
    let sParas = sceneTxt.trim() === "" ? 0 : sceneTxt.split(/\n+/).filter(p => p.trim().length > 0).length;
    let sWords = sceneTxt.trim() === "" ? 0 : sceneTxt.trim().split(/\s+/).length;
    let minW = typeMin[i.sceneType] || 0;
    
    document.getElementById('scene-chars').textContent = sChars;
    document.getElementById('scene-paras').textContent = sParas;
    document.getElementById('scene-words').textContent = sWords;
    let statusEl = document.getElementById('scene-status');
    if (sWords >= minW) { statusEl.textContent = `(✔️ Alcançou o mínimo de ${minW})`; statusEl.style.color = "var(--success)"; } 
    else { statusEl.textContent = `(❌ Faltam ${minW - sWords})`; statusEl.style.color = "var(--danger)"; }

    let rHP = i.exaustaoCompleta ? Math.round(R / 0.8) : R;
    let totalHP = 10000 + Math.round((rHP + flatBonus.r) * (1 + bonus.r));
    if (typeof i.lastHPTotal === 'undefined') i.lastHPTotal = totalHP;
    if (totalHP !== i.lastHPTotal && (i.hpAtual === 0 || i.hpAtual === i.lastHPTotal)) i.hpAtual = totalHP;
    i.lastHPTotal = totalHP;
    if (typeof i.hpAtual === 'undefined' || i.hpAtual === -1) i.hpAtual = totalHP;
    if (i.hpAtual > totalHP) i.hpAtual = totalHP;
    let elHPTotal = document.getElementById('hp-total');
    if (elHPTotal) elHPTotal.textContent = totalHP.toLocaleString("pt-BR");
    let elHPAtual = document.getElementById('hp-atual');
    if (elHPAtual) elHPAtual.value = i.hpAtual.toLocaleString("pt-BR");

    let formatHistPers = (text) => { return text.split('\n').map(l => { let trimL = l.trim(); if (trimL === "") return ""; return '> ' + trimL.replace(/^>\s*/, ''); }).join('\n'); };
    let histPersOut = "";
    if(i.personalidade && i.personalidade.trim() !== "") { histPersOut += `\n  : ᓩ _𝐏ᴇʀsᴏɴᴀʟɪᴅᴀᴅᴇ:_\n${formatHistPers(i.personalidade)}\n`; }
    if(!i.hideHistoria && i.historia && i.historia.trim() !== "") { histPersOut += `\n  : ᓩ _𝐇ɪsᴛᴏ́ʀɪᴀ:_\n${formatHistPers(i.historia)}\n`; }

    let attrOut = "";
    if (D > 0) attrOut += `↠ *𝙳𝚎𝚜𝚝𝚛𝚎𝚣𝚊:* ${strCalc(D, bonus.d, flatBonus.d)}\n\n`;
    if (F > 0) attrOut += `↠ *𝙵𝚘𝚛𝚌̧𝚊:* ${strCalc(F, bonus.f, flatBonus.f)}\n\n`;
    if (R > 0) { attrOut += `↠ *𝚁𝚎𝚜𝚒𝚜𝚝𝚎̂𝚗𝚌𝚒𝚊:* ${strCalc(R, bonus.r, flatBonus.r)}\n> 𝙴𝚜𝚝𝚊𝚖𝚒𝚗𝚊: ${i.estaminaAtual.toLocaleString("pt-BR")} / ${estTotalVal.toLocaleString("pt-BR")}\n\n`; }
    if (V > 0) {
        let velNormalStr = strCalc(V, bonus.v, flatBonus.v);
        let hasWaterDiff = (waterBuffV !== 0 || bonus.vAgua !== 0 || flatBonus.vAgua !== 0 || bonus.reflAgua !== 0 || flatBonus.reflAgua !== 0 || bonus.vcorpAgua !== 0 || flatBonus.vcorpAgua !== 0);
        
        if (hasWaterDiff) {
            let totalBonusVAgua = bonus.v + waterBuffV + bonus.vAgua;
            let totalFlatBonusVAgua = flatBonus.v + flatBonus.vAgua;
            let strTotalAgua = strCalc(V, totalBonusVAgua, totalFlatBonusVAgua);
            attrOut += `↠ *𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:* ${velNormalStr} | ${strTotalAgua} (dentro d'água)\n`;
            
            let REFAgua = currentChar.substats.reflAgua || 0;
            let VCORPAgua = currentChar.substats.vcorpAgua || 0;
            let totalBonusReflAgua = bonus.refl + bonus.reflAgua;
            let totalFlatBonusReflAgua = flatBonus.refl + flatBonus.reflAgua;
            let totalBonusVcorpAgua = bonus.vcorp + bonus.vcorpAgua;
            let totalFlatBonusVcorpAgua = flatBonus.vcorp + flatBonus.vcorpAgua;

            if (REF > 0 || REFAgua > 0) {
                let refNormStr = REF > 0 ? strCalc(REF, bonus.refl, flatBonus.refl) : "";
                let refWaterStr = REFAgua > 0 ? strCalc(REFAgua, totalBonusReflAgua, totalFlatBonusReflAgua) : "";
                if (REF > 0 && REFAgua > 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr} | ${refWaterStr} (dentro d'água)\n`;
                else if (REF > 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr}\n`;
                else if (REFAgua > 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘 (𝙳𝚎𝚗𝚝𝚛𝚘 𝚍'𝚊́𝚐𝚞𝚊):_ ${refWaterStr}\n`;
            }
            if (VCORP > 0 || VCORPAgua > 0) {
                let vcorpNormStr = VCORP > 0 ? strCalc(VCORP, bonus.vcorp, flatBonus.vcorp) : "";
                let vcorpWaterStr = VCORPAgua > 0 ? strCalc(VCORPAgua, totalBonusVcorpAgua, totalFlatBonusVcorpAgua) : "";
                if (VCORP > 0 && VCORPAgua > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr} | ${vcorpWaterStr} (dentro d'água)\n`;
                else if (VCORP > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr}\n`;
                else if (VCORPAgua > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕 (𝙳𝚎𝚗𝚝𝚛𝚘 𝚍'𝚊́𝚐𝚞𝚊):_ ${vcorpWaterStr}\n`;
            }
        } else {
            attrOut += `↠ *𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:* ${velNormalStr}\n`;
            if (REF > 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${strCalc(REF, bonus.refl, flatBonus.refl)}\n`;
            if (VCORP > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${strCalc(VCORP, bonus.vcorp, flatBonus.vcorp)}\n`;
        }
        attrOut += `\n`;
    }
    
    if (totalBase >= reqEsp && ESP > 0) {
        attrOut += `↠ *𝙴𝚜𝚙𝚒́𝚛𝚒𝚝𝚘:* ${strCalc(ESP, bonus.esp, flatBonus.esp)}\n`;
        if (HA > 0) attrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚘 𝙰𝚛𝚖𝚊𝚖𝚎𝚗𝚝𝚘:_ ${strCalc(HA, bonus.ha, flatBonus.ha)}\n`;
        if (HO > 0) attrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚊 𝙾𝚋𝚜𝚎𝚛𝚟𝚊𝚌̧𝚊̃𝚘:_ ${strCalc(HO, bonus.ho, flatBonus.ho)}\n`;
        if (HR > 0) attrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚘 𝚁𝚎𝚒:_ ${strCalc(HR, bonus.hr, flatBonus.hr)}\n`;
        attrOut += `\n`;
    }
    
    if (AMI > 0) {
        attrOut += `↠ *𝙰𝚔𝚞𝚖𝚊 𝚗𝚘 𝙼𝚒:* ${strCalc(AMI, bonus.ami, flatBonus.ami)}\n`;
        if (i.hasAmiAlc && aAlc > 0) {
            let calcAAlc = Math.round((aAlc + flatBonus.amiAlc) * (1 + bonus.amiAlc));
            let mult = parseFloat((i.amiAlcMult || "1").toString().replace(',', '.')) || 1;
            let metros = (calcAAlc / 20) * mult;
            attrOut += `> _𝙰𝚕𝚌𝚊𝚗𝚌𝚎:_ ${strCalc(aAlc, bonus.amiAlc, flatBonus.amiAlc)} (${metros.toLocaleString("pt-BR", {maximumFractionDigits: 1})}m)\n`;
        }
        if (i.hasAmiDur && aDur > 0) {
            let calcADur = Math.round((aDur + flatBonus.amiDur) * (1 + bonus.amiDur));
            let cenas = Math.floor(calcADur / 500);
            attrOut += `> _𝙳𝚞𝚛𝚊𝚋𝚒𝚕𝚒𝚍𝚊𝚍𝚎:_ ${strCalc(aDur, bonus.amiDur, flatBonus.amiDur)} (${cenas} cena${cenas !== 1 ? 's' : ''})\n`;
        }
        if (i.hasAmiPot && aPot > 0) attrOut += `> _𝙿𝚘𝚝𝚎̂𝚗𝚌𝚒𝚊:_ ${strCalc(aPot, bonus.amiPot, flatBonus.amiPot)}\n`;
        if (i.hasAmiVel && aVel > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:_ ${strCalc(aVel, bonus.amiVel, flatBonus.amiVel)}\n`;
        if (i.hasAmiDesp && aDesp > 0) attrOut += `> _𝙳𝚎𝚜𝚙𝚎𝚛𝚝𝚊𝚛:_ ${aDesp.toLocaleString("pt-BR")}\n`;
        if (activeAmiStats > 0) attrOut += `> _𝙲𝚘𝚗𝚝𝚛ᴏ𝚕𝚎:_ ${controlePct}%\n`;
        attrOut += `\n`;
    }

    let outNpcsC = "";
    let listC = [...(i.npcsComunsList || [])];
    if (listC.length > 0) {
        listC.sort((a, b) => {
            let qA = parseInt(String(a.quantidade || "").replace(/\D/g, "")) || 0; let qB = parseInt(String(b.quantidade || "").replace(/\D/g, "")) || 0;
            if (qA !== qB) return qB - qA;
            let pA = parseInt(String(a.pontos || "").replace(/\D/g, "")) || 0; let pB = parseInt(String(b.pontos || "").replace(/\D/g, "")) || 0;
            if (pA !== pB) return pB - pA;
            let rA = (a.raca || "").toLowerCase(); let rB = (b.raca || "").toLowerCase();
            return rA.localeCompare(rB);
        });
        listC.forEach(n => {
            let rFormatada = (n.raca || "Humano").toLowerCase();
            if ((parseInt(String(n.quantidade || "").replace(/\D/g, "")) || 0) > 1) {
                if (rFormatada === "humano") rFormatada = "humanos";
                else if (rFormatada === "tritão") rFormatada = "tritões";
                else if (rFormatada === "sereiano") rFormatada = "sereianos";
                else if (rFormatada === "gigante") rFormatada = "gigantes";
                else if (rFormatada === "mink") rFormatada = "minks";
                else if (rFormatada === "bucaneiro") rFormatada = "bucaneiros";
                else if (rFormatada === "lunariano") rFormatada = "lunarianos";
                else if (rFormatada === "oni") rFormatada = "onis";
                else if (rFormatada === "tontatta") rFormatada = "tontattas";
            }
            let cleanPtsStr = String(n.pontos || "").replace(/\D/g, "");
            let ptsNum = parseInt(cleanPtsStr) || 0;
            let ptsStr = ptsNum.toLocaleString("pt-BR");
            let cleanQtdStr = String(n.quantidade || "").replace(/\D/g, "");
            let qtdStr = cleanQtdStr ? (parseInt(cleanQtdStr) || 0).toLocaleString("pt-BR") : "0";
            if (ptsNum === 0) {
                outNpcsC += `> ${qtdStr} ${rFormatada}\n`;
            } else {
                outNpcsC += `> ${qtdStr} ${rFormatada} [${ptsStr} pontos]\n`;
            }
        });
        outNpcsC = outNpcsC.trim();
    } else {
        outNpcsC = "> ";
    }

    let outNpcsE = "";
    let listE = [...(i.npcsEspeciaisList || [])];
    if (listE.length > 0) {
        let getDisplayClasses = (n) => {
            let maxLvl = {};
            [n.classe, n.classe2, n.classe3, n.classe4, n.classe5].forEach(c => {
                if (c) {
                    let match = c.match(/(.+) (\d+)/);
                    if (match) {
                        let base = match[1]; let lvl = parseInt(match[2]);
                        if (!maxLvl[base] || lvl > maxLvl[base]) maxLvl[base] = lvl;
                    }
                }
            });
            let cStrs = [];
            Object.keys(maxLvl).sort().forEach(b => {
                let cName = getClassDisplayName(`${b} ${maxLvl[b]}`, n.sexo || "Masculino");
                if (cName.includes(":")) {
                    cName = cName.split(":").pop().trim();
                }
                cStrs.push(cName); 
            });
            return cStrs.length > 0 ? cStrs.join(" / ") : "Sem Classe";
        };

        ['Dominação', 'Evento', 'Extra-Narrada'].forEach(origem => {
            let filtrados = listE.filter(n => n.origem === origem);
            if (filtrados.length > 0) {
                filtrados.sort((a, b) => {
                    let pA = parseInt(String(a.pontos || "").replace(/\D/g, "")) || 0; let pB = parseInt(String(b.pontos || "").replace(/\D/g, "")) || 0;
                    if (pA !== pB) return pB - pA;
                    let nA = (a.nome || "").toLowerCase(); let nB = (b.nome || "").toLowerCase();
                    return nA.localeCompare(nB);
                });
                outNpcsE += `➾ ${origem === 'Dominação' ? '𝐃𝐨𝐦𝐢𝐧𝐚𝐜̧𝐚̃𝐨' : origem === 'Evento' ? '𝐄𝐯𝐞𝐧𝐭𝐨' : '𝐄𝐱𝐭𝐫𝐚-𝐍𝐚𝐫𝐫𝐚𝐝𝐚'}\n`;
                filtrados.forEach((n, idx) => {
                    let cleanPtsStr = String(n.pontos || "").replace(/\D/g, "");
                    let ptsNum = parseInt(cleanPtsStr) || 0;
                    let ptsStr = ptsNum.toLocaleString("pt-BR");
                    let classStr = getDisplayClasses(n);
                    
                    let displayStr = "";
                    if (classStr === "Sem Classe") {
                        displayStr = ptsNum > 0 ? `${ptsStr} pontos` : "";
                    } else {
                        displayStr = ptsNum > 0 ? `${classStr} - ${ptsStr} pontos` : classStr;
                    }
                    
                    if (displayStr === "") {
                        outNpcsE += `${idx + 1}. ${n.nome || "Desconhecido"}\n`;
                    } else {
                        outNpcsE += `${idx + 1}. ${n.nome || "Desconhecido"} [${displayStr}]\n`;
                    }
                });
            }
        });
        outNpcsE = outNpcsE.trim();
    } else {
        outNpcsE = "> 🔒";
    }

    let tecnicasOut = "";
    let hasValidTecnica = currentChar.tecnicasList && currentChar.tecnicasList.some(t => t.nome || t.desc || t.efeito);
    let trAcum = i.treinosAcumulados ? i.treinosAcumulados : 0;

    if (hasValidTecnica || trAcum > 0) {
        tecnicasOut += "▬▬▬▬  [ 𝐓ᴇ́ᴄɴɪᴄᴀs ]  ▬▬▬▬\n\n";
        tecnicasOut += `Treinos Acumulados: ${trAcum.toLocaleString("pt-BR")}\n\n`;

        let tecnicasOrdenadas = [...currentChar.tecnicasList].filter(t => t.nome || t.desc || t.efeito);
        if (i.ordemTecnicas !== "manual") {
            tecnicasOrdenadas.sort((a, b) => { let nA = (a.nome || "").trim().toLowerCase(); let nB = (b.nome || "").trim().toLowerCase(); return nA.localeCompare(nB); });
        }

        let availableStylesMap = {};
        let isMinkEstilo = (i.raca === "Mink" || (i.linhagem === "Charlotte" && i.raca2 === "Mink"));
        if (isMinkEstilo) availableStylesMap["Electro"] = "Electro";
        [1, 2, 3, 4].forEach(n => {
            let st = i['estilo'+n];
            if (st && st !== "Nenhum") {
                let dName = st;
                if (st === "Freestyle") dName = (i['freestyle'+n] && i['freestyle'+n].trim() !== "") ? i['freestyle'+n] : "Freestyle";
                availableStylesMap['estilo'+n] = dName;
            }
        });

        let agrupado = {};
        tecnicasOrdenadas.forEach(t => {
            let stNome = "Sem Estilo";
            if (t.estilo) {
                if (availableStylesMap[t.estilo]) {
                    stNome = availableStylesMap[t.estilo];
                } else {
                    let foundId = Object.keys(availableStylesMap).find(k => availableStylesMap[k] === t.estilo);
                    if (foundId) {
                        stNome = availableStylesMap[foundId];
                        t.estilo = foundId;
                    }
                }
            }
            if (!agrupado[stNome]) agrupado[stNome] = [];
            agrupado[stNome].push(t);
        });

        let estilosKeys = Object.keys(agrupado).sort((a, b) => {
            if (a === "Sem Estilo") return 1;
            if (b === "Sem Estilo") return -1;
            return a.localeCompare(b);
        });

        estilosKeys.forEach(stKey => {
            tecnicasOut += `« ${stKey} »\n`;
            agrupado[stKey].forEach(t => {
                if (t.nome) tecnicasOut += `* ${t.nome}\n`;
                if (t.desc) { t.desc.split('\n').forEach(line => { let trimLine = line.trim(); if(trimLine !== "") tecnicasOut += `> ${trimLine.replace(/^>\s*/, '')}\n`; }); }
                if (t.efeito) { t.efeito.split('\n').forEach((line, idx) => { let trimLine = line.trim(); if(trimLine !== "") { if (idx === 0) tecnicasOut += `> Efeito: ${trimLine.replace(/^>\s*/, '')}\n`; else tecnicasOut += `> ${trimLine.replace(/^>\s*/, '')}\n`; } }); }
                tecnicasOut += `\n`;
            });
        });

        tecnicasOut += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`;
    } else { 
        tecnicasOut += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`; 
    }

    let orgOut = "";
    if(i.orgTipo === "Pirata") {
        if(i.tripulacao && i.tripulacao.trim() !== "") { orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ:_\n* Pirata: ${i.tripulacao}\n`; } else { orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ:_\n* Pirata\n`; }
    } else if (i.orgTipo && i.orgTipo !== "") {
        let displayPatente = i.patente || '';
        if (displayPatente !== "") { let gKey = i.sexo === 'Feminino' ? 'f' : 'm'; displayPatente = patenteGender[displayPatente] ? patenteGender[displayPatente][gKey] : displayPatente; }
        orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ | 𝐏ᴀᴛᴇɴᴛᴇ | 𝐒ᴀʟᴀ́ʀɪᴏ:_\n* ${i.orgTipo}\n* ${displayPatente}\n* ${i.salario ? '฿' + i.salario : ''}\n`;
    } else {
        orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ:_\n> \n`;
    }

    let outRecompensa = i.recompensa ? `฿${i.recompensa.toLocaleString("pt-BR")}` : '🔒';
    let outBerries = i.berries ? `฿${i.berries.toLocaleString("pt-BR")}` : '฿0';
    let estilosText = ""; if(isMink) estilosText += "* Electro\n";
    
    let formatStyle = (n) => { let st = i['estilo'+n]; if (!st || st === "Nenhum") return null; if (st === "Freestyle") return i['freestyle'+n] && i['freestyle'+n].trim() !== "" ? `Freestyle: ${i['freestyle'+n]}` : "Freestyle"; return st; };
    let e1 = formatStyle(1); if (e1) estilosText += `* ${e1}\n`;
    let e2 = formatStyle(2); if (e2) estilosText += `* ${e2}\n`;

    if (totalBase >= 5000) { let e3 = formatStyle(3); if (e3) estilosText += `* ${e3}\n`; else estilosText += `* (Vazio)\n`; } else { estilosText += `* 🔒 (Libera com 5.000)\n`; }
    if (totalBase >= 10000) { let e4 = formatStyle(4); if (e4) estilosText += `* ${e4}\n`; else estilosText += `* (Vazio)\n`; } else { estilosText += `* 🔒 (Libera com 10.000)\n`; }

    let c1Out = i.classe ? getClassDisplayName(i.classe, i.sexo) : '🔒';
    let c2Out = i.classe2 ? getClassDisplayName(i.classe2, i.sexo) : '5.000';
    let c3Out = i.classe3 ? getClassDisplayName(i.classe3, i.sexo) : '10.000';
    let c4Out = i.classe4 ? getClassDisplayName(i.classe4, i.sexo) : '20.000';
    let c5Out = i.classe5 ? getClassDisplayName(i.classe5, i.sexo) : '35.000';

    let racaOutput = (isNPC && i.raca === 'Outra') ? (i.racaNomeCustom || 'Raça Custom') : (formatRaceStr(i.raca, i.animal, i.sexo === "Feminino") || '🔒');
    if (i.linhagem === "Charlotte") { 
        let raca2Output = (isNPC && i.raca2 === 'Outra') ? (i.racaNomeCustom2 || '2ª Raça Custom') : (formatRaceStr(i.raca2, i.animal2, i.sexo === "Feminino") || '🔒');
        racaOutput += ` / ${raca2Output}`; 
    }

    let alcunhaOut = "";
    if (!i.alcunhasList || i.alcunhasList.length === 0) {
        alcunhaOut = "🔒";
    } else if (i.alcunhaAtiva) {
        alcunhaOut = i.alcunhaAtiva;
        let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
        if (ativa && ativa.buffs && ativa.buffs.length > 0) {
            let buffGroups = {};
            let names = {tudo:"Todos os Atributos",d:"Destreza",f:"Força",r:"Resistência",v:"Velocidade",refl:"Reflexo",vcorp:"Vel. Corporal",vAgua:"Velocidade (Água)",reflAgua:"Reflexo (Água)",vcorpAgua:"Vel. Corporal (Água)",ha:"Haki do Armamento",ho:"Haki da Observação",hr:"Haki do Rei",amiAlc:"Alcance",amiDur:"Durabilidade",amiPot:"Potência",amiVel:"Velocidade"};
            ativa.buffs.forEach(b => {
                let key = (b.val >= 0 ? '+' : '') + b.val + (b.type === 'pct' ? '%' : '');
                if(!buffGroups[key]) buffGroups[key] = [];
                buffGroups[key].push(names[b.stat] || b.stat);
            });
            let buffStrings = [];
            for (let k in buffGroups) {
                let items = buffGroups[k];
                let joined = items.length > 1 ? items.slice(0, -1).join(", ") + " e " + items[items.length - 1] : items[0];
                buffStrings.push(`${k} em ${joined}`);
            }
            alcunhaOut = `${i.alcunhaAtiva} [${buffStrings.join("; ")}]`;
        }
    }

    let displayLinhagem = i.linhagem ? i.linhagem.replace("Tenryūbito: Família ", "") : 'Nenhuma';
    let recompensaOutText = `\n  : ᓩ _𝐑ᴇᴄᴏᴍᴘᴇɴsᴀ:_\n> ${outRecompensa}\n`;
    let berriesOutText = !isNPC ? `\n : ᓩ _𝐁ᴇʀʀɪᴇs:_\n> ${outBerries}\n` : "";
    
    let habilidadesOut = "";
    if (i.habilidadesExclusivas && i.habilidadesExclusivas.length > 0) {
        if (i.habilidadesExclusivas.length === 1) {
            habilidadesOut = `  : ᓩ _𝐇ᴀʙɪʟɪᴅᴀᴅᴇ 𝐄xᴄʟᴜꜱɪᴠᴀ:_\n`;
        } else {
            habilidadesOut = `  : ᓩ _𝐇ᴀʙɪʟɪᴅᴀᴅᴇꜱ 𝐄xᴄʟᴜꜱɪᴠᴀꜱ:_\n`;
        }
        
        let getHabDesc = (hab, tb) => {
            if (hab === "Arte da Esgrima") { if (tb >= 15000) return "+20% Destreza, -20% gasto de Estamina."; if (tb >= 10000) return "+15% Destreza, -20% gasto de Estamina."; if (tb >= 5000) return "+10% Destreza, -20% gasto de Estamina."; return ""; }
            if (hab === "Batedor de Carteiras") { if (tb >= 15000) return "+25% Destreza."; if (tb >= 10000) return "+20% Destreza."; if (tb >= 5000) return "+15% Destreza."; return ""; }
            if (hab === "Caminho do Atirador") { if (tb >= 15000) return "+15% Destreza (+20% atirando)."; if (tb >= 10000) return "+10% Destreza (+15% atirando)."; if (tb >= 5000) return "+5% Destreza (+10% atirando)."; return ""; }
            if (hab === "Constituição Única") return "+10% Força, +15% Resistência.";
            if (hab === "Contração Muscular") { if (tb >= 10000) return "+20% Força e Resistência."; if (tb >= 5000) return "+10% Força e Resistência."; return ""; }
            if (hab === "Espírito Contagiante") return "Aliados recebem +5% em todos os atributos.";
            if (hab === "Favoritismo Armista") { if (tb >= 15000) return "Bônus massivos em Resistência, Velocidade, Dano e Red. de Dano (Arma/Criações)."; if (tb >= 10000) return "+10% Resistência e Velocidade, +10% Força/Destreza (Criações)."; return ""; }
            if (hab === "Filho do Mar") { if (tb >= 15000) return "+15% Reflexo e Resistência."; if (tb >= 10000) return "+10% Reflexo e Resistência."; if (tb >= 5000) return "+5% Reflexo e Resistência."; return ""; }
            if (hab === "Flexibilidade") { if (tb >= 10000) return "+20% Velocidade."; if (tb >= 5000) return "+10% Velocidade."; return ""; }
            if (hab === "Fúria Ardente") { if (tb >= 15000) return "+15% Força."; if (tb >= 10000) return "+10% Força."; if (tb >= 5000) return "+5% Força."; return ""; }
            if (hab === "O Escolhido") { if (tb >= 20000) return "+15% em todos os Hakis."; if (tb >= 10000) return "+10% em todos os Hakis."; if (tb >= 5000) return "+5% em todos os Hakis."; return ""; }
            if (hab === "Pensamento Acelerado") { if (tb >= 10000) return "+25% Reflexos."; if (tb >= 5000) return "+20% Reflexos."; return ""; }
            if (hab === "QI Avançado") return "-50% gasto de Estamina. +5% Reflexos se durar >3 turnos.";
            return "oculta";
        };

        i.habilidadesExclusivas.forEach(hab => {
            let desc = getHabDesc(hab, totalBase);
            if (desc && desc !== "oculta") {
                habilidadesOut += `> ${hab}: ${desc}\n`;
            } else {
                habilidadesOut += `> ${hab}\n`;
            }
        });
        habilidadesOut += `\n`;
    }
    let npcsOutText = !isNPC ? `\n  : ᓩ _𝐍𝐏𝐂s ᴄᴏᴍᴜɴꜱ:_\n${outNpcsC}\n\n  : ᓩ _𝐍𝐏𝐂s ᴇꜱᴘᴇᴄɪᴀɪꜱ:_\n${outNpcsE}\n` : "";

    let inventarioFormatado = "";
    if (i.inventario && i.inventario.trim() !== "") { inventarioFormatado = i.inventario.split('\n').map(l => { let t = l.trim(); if (t === "") return ""; return t.startsWith("*") ? t : "* " + t; }).filter(l => l !== "").join('\n'); }

    let out = `*Nᴇᴡ sᴇᴀs*
— ロールプレイングゲーム - 𝚁𝙿𝙶 [𝙾𝙽𝙴 𝙿𝙸𝙴𝙲𝙴]
     — 新しい海 - 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 ~*ɴꜱ*~
                          ${isNPC ? 'ᖴIᑕᕼᗩ ᗞᕮ ᘉᑭᑕ' : 'ᖴIᑕᕼᗩ'}
Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊
  : ᓩ _𝐍ᴏᴍᴇ:_
> ${currentChar.name || '🔒'}

  : ᓩ _𝐀ʟᴄᴜɴʜᴀ:_
> ${alcunhaOut}
${recompensaOutText}
  : ᓩ _𝐀ʟᴛᴜʀᴀ:_
> ${i.altura || '🔒'}

  : ᓩ _𝐈ᴅᴀᴅᴇ:_
> ${i.idade || '(Mínimo: 15)'}

  : ᓩ _${(i.linhagem && i.linhagem !== "Nenhuma") ? "𝐑ᴀᴄ̧ᴀ | 𝐋ɪɴʜᴀɢᴇᴍ" : "𝐑ᴀᴄ̧ᴀ"}:_
> ${(i.linhagem && i.linhagem !== "Nenhuma") ? racaOutput + " | " + displayLinhagem : racaOutput}

  : ᓩ _𝐒ᴇxᴏ:_
> ${i.sexo || '🔒'}

  : ᓩ _𝐒ᴀɴɢᴜᴇ:_
> ${i.sangue || '🔒'}
${histPersOut}
  : ᓩ _𝐀ᴘᴀʀᴇ̂ɴᴄɪᴀ:_
> ${i.aparencia || '🔒'}

  : ᓩ _𝐍ᴀᴄɪᴏɴᴀʟɪᴅᴀᴅᴇ:_
> ${i.nacionalidade || 'Desconhecida'}

  : ᓩ _𝐋ᴏᴄᴀʟɪᴢᴀᴄ̧ᴀ̃ᴏ ᴀᴛᴜᴀʟ:_
> ${i.localizacao || '(Local presente no mapa do RPG)'}

▬▬▬▬▬▬▬▬▬▬▬▬

  : ᓩ _Cʟᴀssᴇ(s):_
1. *${c1Out}*
2. *${c2Out}*
3. *${c3Out}*
4. *${c4Out}*
5. *${c5Out}*

${orgOut}
  : ᓩ _𝐄sᴛɪʟᴏs ᴅᴇ ʟᴜᴛᴀ:_
${estilosText.trim()}
${berriesOutText}${npcsOutText}
> _𝐈ɴᴠᴇɴᴛᴀ́ʀɪᴏ:_
${inventarioFormatado}

${habilidadesOut}  : ᓩ _𝐀ᴋᴜᴍᴀ ɴᴏ ᴍɪ:_
> ${i.akumaNome || '🔒'}

▬▬▬▬  [ 𝐒ᴛᴀᴛᴜs ]  ▬▬▬▬
HP: ${i.hpAtual.toLocaleString("pt-BR")} / ${totalHP.toLocaleString("pt-BR")}

↠  *𝐀ᴛʀɪʙᴜᴛᴏs*
* ${totalBase.toLocaleString("pt-BR")}

${attrOut}${tecnicasOut}`;

    window.copyDataAtributos = `▬▬▬▬  [ 𝐒ᴛᴀᴛᴜs ]  ▬▬▬▬\nHP: ${i.hpAtual.toLocaleString("pt-BR")} / ${totalHP.toLocaleString("pt-BR")}\n\n↠  *𝐀ᴛʀɪʙᴜᴛᴏs*\n* ${totalBase.toLocaleString("pt-BR")}\n\n${attrOut}`.trim();
    window.copyDataTecnicas = tecnicasOut.trim();
    document.getElementById('resBox').textContent = out.trim();

    let logOut = "*Log de Atualizações:*Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊\n";
    if (currentChar.logList && currentChar.logList.length > 0) {
        currentChar.logList.forEach(l => {
            if (l.titulo || l.conteudo) {
                if (l.titulo) logOut += `> ${l.titulo}\n`;
                if (l.conteudo) logOut += `${l.conteudo}\n`;
                logOut += `\n`;
            }
        });
    }
    document.getElementById('logBox').textContent = logOut.trim();
}

async function copyFicha() {
    let text = document.getElementById('resBox').textContent;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Ficha copiada para a área de transferência!");
}

async function copyAtributos() {
    let text = window.copyDataAtributos || "";
    if(!text) { await customAlert("Nada para copiar!"); return; }
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Atributos copiados para a área de transferência!");
}

async function copyTecnicas() {
    let text = window.copyDataTecnicas || "";
    if(!text) { await customAlert("Nada para copiar!"); return; }
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Técnicas copiadas para a área de transferência!");
}

async function copyLog() {
    let text = document.getElementById('logBox').textContent;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Log copiado para a área de transferência!");
}

async function copyPartialLog() {
    if (!currentChar || !currentChar.logList || currentChar.logList.length === 0) { await customAlert("Não há logs para copiar."); return; }
    let numToCopy = parseInt(document.getElementById('num-logs-copy').value, 10);
    if (isNaN(numToCopy) || numToCopy < 1) numToCopy = 1;
    if (numToCopy > currentChar.logList.length) numToCopy = currentChar.logList.length;
    let logsToCopy = currentChar.logList.slice(-numToCopy);
    let logOut = "*Log de Atualizações:*Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊\n";
    if (logsToCopy && logsToCopy.length > 0) { logsToCopy.forEach(l => { if (l.titulo || l.conteudo) { if (l.titulo) logOut += `> ${l.titulo}\n`; if (l.conteudo) logOut += `${l.conteudo}\n`; logOut += `\n`; } }); }
    let text = logOut.trim();
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert(numToCopy === 1 ? "Última entrada copiada com sucesso!" : `As últimas ${numToCopy} entradas foram copiadas com sucesso!`);
}

async function changeFichaID() {
    if (!isFirebaseReady || !db) return;
    if (currentDocId === '') { await customAlert("Você precisa carregar ou salvar uma ficha primeiro para poder mudar o ID dela."); return; }
    if (isReadOnly) { await customAlert("Você está no modo de leitura. Insira a senha da ficha atual para provar que é o dono e poder mudar o ID."); return; }

    let novoId = await customPrompt(`O ID atual é "${currentDocId}". Digite o NOVO ID desejado (Exatamente 4 números):`);
    if (!novoId || novoId.trim() === "" || novoId.trim() === currentDocId) { return; }
    novoId = novoId.trim();
    if (!/^\d{4}$/.test(novoId)) { await customAlert("O NOVO ID deve conter EXATAMENTE 4 NÚMEROS (ex: 1234)."); return; }
    document.getElementById('db-status').classList.add('syncing');

    try {
        const docRef = await db.collection("fichas_op").doc(novoId).get();
        if (docRef.exists) {
            let conf = await customPrompt(`ATENÇÃO: Já existe uma ficha salva no ID "${novoId}". Digite a SENHA DE ADM para sobrescrevê-la e apagar a ficha que está lá:`);
            if (conf !== ADMIN_PASSWORD) {
                document.getElementById('db-status').classList.remove('syncing');
                if (conf !== null) await customAlert("Senha incorreta! Operação cancelada.");
                return;
            }
        }
        await db.collection("fichas_op").doc(novoId).set(charData);
        await db.collection("fichas_op").doc(currentDocId).delete();
        currentDocId = novoId; document.getElementById('doc-id').value = currentDocId;
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert(`Sucesso! O ID da ficha agora é "${novoId}".`);
    } catch (e) {
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert("Erro de conexão ao tentar mudar o ID.");
    }
}

document.body.addEventListener('input', function(e) {
    if (e.target.tagName.toLowerCase() === 'textarea') {
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
    }
});

async function deleteFichaID() {
    if (!isFirebaseReady || !db) return;
    if (currentDocId === '') { await customAlert("Nenhuma ficha foi carregada para ser apagada."); return; }
    let conf = await customPrompt(`ATENÇÃO: Você está prestes a apagar COMPLETAMENTE o ID "${currentDocId}" do banco de dados. Digite a SENHA DE ADM para confirmar:`);
    if (conf !== ADMIN_PASSWORD) { if (conf !== null) await customAlert("Senha de ADM incorreta! Operação cancelada."); return; }

    document.getElementById('db-status').classList.add('syncing');
    try {
        await db.collection("fichas_op").doc(currentDocId).delete();
        currentDocId = ''; document.getElementById('doc-id').value = ''; charData = { password: "", pcs: [] }; isReadOnly = false;
        runFallbackChecks(); currentChar = charData.pcs[0].pc;
        renderTabs(); renderTecnicas(); renderLogs(); updateUI(); toggleEditability();
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert(`Sucesso! O ID foi completamente apagado.`);
    } catch (e) { document.getElementById('db-status').classList.remove('syncing'); await customAlert("Erro de conexão ao tentar apagar o ID."); }
}

window.onload = init;

window.puxarVelocidade = function() {
    if(isReadOnly) return;
    let val = currentChar.substats.vcorp || 0;
    document.getElementById('info-estaminaVelocidade').value = val.toLocaleString("pt-BR");
    currentChar.info.estaminaVelocidade = val;
    saveData(); updateUI();
};

window.puxarDestrezaDano = function() {
    if(isReadOnly) return;
    let valStr = document.getElementById('total-d').textContent;
    let val = parseInt(valStr.replace(/\D/g, '')) || 0;
    document.getElementById('info-calcUseAttr').value = val.toLocaleString("pt-BR");
    currentChar.info.calcUseAttr = val;
    saveData(); updateUI();
};

window.puxarForcaDano = function() {
    if(isReadOnly) return;
    let valStr = document.getElementById('total-f').textContent;
    let val = parseInt(valStr.replace(/\D/g, '')) || 0;
    document.getElementById('info-calcUseAttr').value = val.toLocaleString("pt-BR");
    currentChar.info.calcUseAttr = val;
    saveData(); updateUI();
};

window.puxarResistenciaDano = function() {
    if(isReadOnly) return;
    let valStr = document.getElementById('total-r').textContent;
    let val = parseInt(valStr.replace(/\D/g, '')) || 0;
    document.getElementById('info-calcInimigoRes').value = val.toLocaleString("pt-BR");
    currentChar.info.calcInimigoRes = val;
    saveData(); updateUI();
};

window.sofrerDano = async function() {
    if(isReadOnly) { await customAlert("A ficha está no modo leitura."); return; }
    let danoStr = document.getElementById('calc-dano-final').textContent;
    let dano = parseInt(danoStr.replace(/\D/g, '')) || 0;
    if (dano === 0) { await customAlert("O dano calculado é 0."); return; }

    let conf = await customPrompt(`ATENÇÃO: Você está prestes a subtrair ${dano.toLocaleString('pt-BR')} de dano da SUA PRÓPRIA VIDA (HP Atual), e não da vida do inimigo. Digite 'SIM' para confirmar que deseja receber esse dano:`);
    if (conf !== "SIM" && conf !== "sim" && conf !== "Sim") {
        if (conf !== null) await customAlert("Operação cancelada.");
        return; 
    }

    let hpAtual = currentChar.info.hpAtual;
    let novoHp = hpAtual - dano;
    if (novoHp < 0) novoHp = 0;
    
    currentChar.info.hpAtual = novoHp;
    saveData(); updateUI();
    
    await customAlert(`Dano de ${dano.toLocaleString('pt-BR')} recebido! HP atualizado para: ${novoHp.toLocaleString('pt-BR')}`);
};

window.copiarDano = async function() {
    let finalStr = document.getElementById('calc-dano-final').textContent;
    let formStr = document.getElementById('calc-formula').innerText;
    let text = `*Dano Final:* ${finalStr}\n_Fórmula:_\n${formStr}`;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Cálculo de Dano copiado para a área de transferência!");
};

window.copiarEstamina = async function() {
    let finalStr = document.getElementById('estamina-custo-final').textContent;
    let formStr = document.getElementById('estamina-formula').innerText;
    let text = `*Custo de Estamina:* ${finalStr}\n_Fórmula:_\n${formStr}`;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Cálculo de Estamina copiado para a área de transferência!");
};

window.puxarDano = function() {
    if(isReadOnly) return;
    let valStr = document.getElementById('calc-dano-final').textContent;
    let val = parseInt(valStr.replace(/\D/g, '')) || 0;
    document.getElementById('info-estaminaDano').value = val.toLocaleString("pt-BR");
    currentChar.info.estaminaDano = val;
    saveData(); updateUI();
};

window.gastarEstamina = async function() {
    if(isReadOnly) { await customAlert("A ficha está no modo leitura."); return; }
    let custoStr = document.getElementById('estamina-custo-final').textContent;
    let custo = parseInt(custoStr.replace(/\D/g, '')) || 0;
    if (custo === 0) { await customAlert("O custo de Estamina é 0."); return; }

    let estAtual = currentChar.info.estaminaAtual;
    let novaEst = estAtual - custo;
    if (novaEst < 0) novaEst = 0;
    
    currentChar.info.estaminaAtual = novaEst;
    currentChar.info.estaminaVelocidade = "";
    currentChar.info.estaminaDano = "";
    currentChar.info.estaminaBuffPct = "";
    currentChar.info.estaminaHakiArm = "nao";
    currentChar.info.estaminaHakiObs = "nao";
    
    saveData(); updateUI();
    await customAlert(`Gasto de ${custo.toLocaleString('pt-BR')} Estamina aplicado! Estamina atual: ${novaEst.toLocaleString('pt-BR')}`);
};

window.recuperarEstamina = async function(pct) {
    if(isReadOnly) { await customAlert("A ficha está no modo leitura."); return; }
    let totalStr = document.getElementById('estamina-total').textContent;
    let total = parseInt(totalStr.replace(/\D/g, '')) || 0;
    if(total === 0) return;
    
    let recup = Math.floor(total * pct);
    let estAtual = currentChar.info.estaminaAtual;
    if (estAtual >= total) { await customAlert("Estamina já está no máximo!"); return; }

    let novaEst = estAtual + recup;
    if (novaEst > total) novaEst = total;
    
    currentChar.info.estaminaAtual = novaEst;
    saveData(); updateUI();
    
    let nomeRecovery = pct === 0.10 ? "Em Movimento" : "Repouso Total";
    await customAlert(`Recuperação (${nomeRecovery}): +${recup.toLocaleString('pt-BR')} Estamina! Estamina atual: ${novaEst.toLocaleString('pt-BR')}`);
};

window.selecionarAkuma = function(novoAkumaNome) {
    if (!currentChar.info) currentChar.info = {};
    if(novoAkumaNome === "nenhuma" || !novoAkumaNome) { currentChar.info.akumaNome = ""; currentChar.info.akumaId = "nenhuma"; } 
    else { currentChar.info.akumaNome = novoAkumaNome; currentChar.info.akumaId = novoAkumaNome; }
    if(typeof saveData === 'function') saveData();
    if(typeof updateUI === 'function') updateUI();
};

function iniciarMonitoramentoBancoDeDados() {
    let selectAkuma = document.getElementById('select-akuma'); let selectNac = document.getElementById('info-nacionalidade'); let selectLoc = document.getElementById('info-localizacao');
    let currentAkumaVal = (currentChar && currentChar.info && currentChar.info.akumaNome) ? currentChar.info.akumaNome : "nenhuma";
    let currentNacVal = (currentChar && currentChar.info) ? currentChar.info.nacionalidade : "";
    let currentLocVal = (currentChar && currentChar.info) ? currentChar.info.localizacao : "";

    let akumaHTML = '<option value="nenhuma">Nenhuma</option>';
    if (typeof akumasFixas !== 'undefined') {
        ['Paramecia', 'Paramecia Especial', 'Logia', 'Zoan', 'Zoan Ancestral', 'Zoan Mítica'].forEach(tipo => {
            if (akumasFixas[tipo] && akumasFixas[tipo].length > 0) {
                akumaHTML += `<optgroup label="${tipo}">`;
                akumasFixas[tipo].forEach(nome => { akumaHTML += `<option value="${nome}">${nome}</option>`; });
                akumaHTML += `</optgroup>`;
            }
        });
    }
    if (selectAkuma) { selectAkuma.innerHTML = akumaHTML; selectAkuma.value = currentAkumaVal; }

    let ilhasHTML = '<option value="">-- Selecione --</option>';
    if (typeof ilhasFixas !== 'undefined') {
        const ordemMares = ['East Blue', 'West Blue', 'North Blue', 'South Blue', 'Paraíso', 'Novo Mundo', 'Calm Belt', 'Localização Desconhecida'];
        ordemMares.forEach(mar => {
            if (ilhasFixas[mar] && ilhasFixas[mar].length > 0) {
                ilhasHTML += `<optgroup label="${mar}">`;
                ilhasFixas[mar].forEach(ilha => { ilhasHTML += `<option value="${ilha}">${ilha}</option>`; });
                ilhasHTML += `</optgroup>`;
            }
        });
    }
    if (selectNac) { selectNac.innerHTML = ilhasHTML; selectNac.value = currentNacVal; }
    if (selectLoc) { selectLoc.innerHTML = ilhasHTML; selectLoc.value = currentLocVal; }
}

setInterval(() => {
    if(!currentChar || !currentChar.info) return;
    let selectAkuma = document.getElementById('select-akuma');
    if(selectAkuma) {
        let expectedAkuma = (currentChar.info.akumaNome && currentChar.info.akumaNome !== "") ? currentChar.info.akumaNome : "nenhuma";
        currentChar.info.akumaId = expectedAkuma;
        if(selectAkuma.value !== expectedAkuma && selectAkuma.querySelector(`option[value="${expectedAkuma}"]`)) selectAkuma.value = expectedAkuma;
    }
    let selectNac = document.getElementById('info-nacionalidade');
    if(selectNac) {
        let expectedNac = currentChar.info.nacionalidade || "";
        if(selectNac.value !== expectedNac && selectNac.querySelector(`option[value="${expectedNac}"]`)) selectNac.value = expectedNac;
    }
    let selectLoc = document.getElementById('info-localizacao');
    if(selectLoc) {
        let expectedLoc = currentChar.info.localizacao || "";
        if(selectLoc.value !== expectedLoc && selectLoc.querySelector(`option[value="${expectedLoc}"]`)) selectLoc.value = expectedLoc;
    }
}, 1000);

function openInfoModal(title, msg) {
    document.getElementById('info-modal-title').textContent = title;
    document.getElementById('info-modal-msg').textContent = msg;
    document.getElementById('info-modal-overlay').style.display = 'flex';
}