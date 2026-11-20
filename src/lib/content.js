// Hand-written starter course. Bodies are trusted HTML (html: true); LLM lessons never get that flag.
const I = (title, body, say) => ({ kind: 'info', title, body, say, html: true });
const C = (prompt, answer, wrong, explain) => ({ kind: 'choice', prompt, answer, options: [answer, ...wrong], explain });
const T = (prompt, answer, explain, accept) => ({ kind: 'type', prompt, answer, explain, accept, speak: answer });
const L = (answer, explain) => ({ kind: 'listen', prompt: 'Type what you hear', speak: answer, answer, explain });

export const UNITS = [
	{
		title: 'Sons do Brasil',
		sub: 'Pronunciation, spelled out in English',
		lessons: [
			{
				id: 'sons-1', title: 'Sound like a Brazilian', sub: 'ch, j, h and the nose',
				steps: [
					I('Final vowels shrink', 'A final <b>o</b> sounds like "oo" and a final <b>e</b> like "ee".<br><b>obrigado</b> = oh-bree-GAH-doo<br><b>leite</b> = LAY-chee', 'obrigado. leite.'),
					I('T and D go soft', 'Before an "ee" sound, <b>t</b> becomes "ch" and <b>d</b> becomes "j".<br><b>dia</b> = JEE-ah · <b>tia</b> = CHEE-ah<br><b>cidade</b> = see-DAH-jee · <b>noite</b> = NOY-chee', 'dia. tia. cidade. noite.'),
					C('How do you say "leite" (milk)?', 'LAY-chee', ['LAY-tay', 'LEE-teh', 'LAY-tee'], 'te at the end = "chee".'),
					I('R is an H in disguise', 'At the start of a word, and written <b>rr</b>, R sounds like an English "h".<br><b>Rio</b> = HEE-oo · <b>carro</b> = KAH-hoo · <b>rua</b> = HOO-ah<br>Between vowels it is a quick tap: <b>caro</b> = KAH-roo.', 'Rio. carro. rua. caro.'),
					C('"carro" (car) sounds like...', 'KAH-hoo', ['KAH-roo', 'CAR-oh', 'KAH-rro'], 'KAH-roo is "caro" (expensive). rr = h.'),
					I('L at the end becomes W', '<b>Brasil</b> = brah-ZEE-oo<br><b>legal</b> = leh-GOW (cool, nice)<br><b>papel</b> = pah-PEH-oo', 'Brasil. legal. papel.'),
					L('legal', 'legal = cool, nice. Sounds like leh-GOW.'),
					I('Nasal sounds: ão, ãe, õe', 'Push the air through your nose and never close your lips on an N or M.<br><b>pão</b> = "pown" said in the nose<br><b>não</b> = "nown"<br><b>mãe</b> = "mying", one syllable', 'pão. não. mãe.'),
					C('Which one is bread?', 'pão', ['pau', 'pó', 'pá'], 'pau is a stick (and slang you want to avoid at the bakery). The nasal matters.'),
					I('LH and NH', '<b>lh</b> = "ly" as in "million": <b>filho</b> = FEE-lyoo<br><b>nh</b> = "ny" as in "canyon": <b>amanhã</b> = ah-mah-NYAH', 'filho. amanhã.'),
					L('Bom dia, tudo bem?', 'bong JEE-ah, TOO-doo bayng'),
					T('Thank you (you are a woman)', 'obrigada', 'Women say obrigada, men say obrigado.')
				]
			},
			{
				id: 'sons-2', title: 'Not Spanish with a cold', sub: 'Where Spanish habits betray you',
				steps: [
					I('Open and closed vowels', 'Spanish has 5 vowel sounds. Portuguese splits e and o in two.<br><b>avó</b> = ah-VAW (grandma, open)<br><b>avô</b> = ah-VOH (grandpa, closed)<br>The accent tells you: ´ is open, ^ is closed.', 'avó. avô.'),
					C('"avó" is...', 'grandmother', ['grandfather', 'bird', 'egg'], '´ = open "aw". avô with ^ is grandfather.'),
					I('S between vowels is a Z', '<b>casa</b> = KAH-zah (Spanish says KAH-sah)<br><b>mesa</b> = MEH-zah', 'casa. mesa.'),
					I('J and soft G are "zh"', 'Like the s in "measure". Never the Spanish throat sound.<br><b>gente</b> = ZHEN-chee<br><b>hoje</b> = OH-zhee', 'gente. hoje.'),
					C('"gente" sounds like...', 'ZHEN-chee', ['HEN-teh', 'GEN-tay', 'JEN-tee'], 'g before e/i = zh, and te = chee.'),
					I('X is a chameleon', 'Usually "sh": <b>xícara</b> = SHEE-kah-rah, <b>peixe</b> = PAY-shee.<br>Sometimes "s" (próximo), "z" (exemplo) or "ks" (táxi).', 'xícara. peixe. próximo. exemplo.'),
					I('Convert your Spanish', '-ción becomes <b>-ção</b> (nasal "sown")<br>-dad becomes <b>-dade</b> ("DAH-jee")<br>-ble becomes <b>-vel</b><br>información = informação · ciudad = cidade · posible = possível'),
					T('Spanish "nación" in Portuguese', 'nação'),
					T('Spanish "universidad" in Portuguese', 'universidade'),
					T('Spanish "increíble" in Portuguese', 'incrível'),
					L('A gente vai hoje', 'ah ZHEN-chee vy OH-zhee = We are going today.')
				]
			}
		]
	},
	{
		title: 'Primeiros passos',
		sub: 'The two verb forms that carry you',
		lessons: [
			{
				id: 'base-1', title: 'Eu, você, a gente', sub: 'Why Brazilian grammar is kinder',
				steps: [
					I('Two forms are enough', 'Brazil says <b>você</b> for "you", and it uses the same verb form as he/she. Learn the <b>eu</b> form and the <b>você/ele/ela</b> form and you can talk to almost anyone. Spanish speakers: forget tú.'),
					I('A gente = we', '<b>a gente</b> (ah ZHEN-chee) literally means "the people" but in daily speech it means "we", and it takes the você form.<br><b>A gente vai</b> = we go. Easier than "nós vamos".', 'a gente vai'),
					C('"A gente fala português" means', 'We speak Portuguese', ['People speak Portuguese', 'They speak Portuguese', 'You speak Portuguese']),
					I('Ser vs estar', 'Same idea as Spanish. <b>sou / é</b> for what you are, <b>estou / está</b> for how you are right now.<br>Spoken Brazilian cuts them: estou = <b>tô</b>, está = <b>tá</b>.<br>"Tô cansada" = I am tired.', 'tô cansada'),
					T('I am Brazilian (you are a woman)', 'sou brasileira', null, ['eu sou brasileira']),
					T('I am tired (short spoken form, you are a woman)', 'tô cansada', null, ['to cansada', 'estou cansada', 'eu tô cansada', 'eu estou cansada']),
					C('Someone says "Tudo bem?" Best reply:', 'Tudo, e você?', ['De nada', 'Com licença', 'Até logo']),
					I('Contractions are not optional', 'em + o = <b>no</b> · em + a = <b>na</b><br>de + o = <b>do</b> · de + a = <b>da</b><br>por + o = <b>pelo</b><br>Spanish "en el" is just "no": Estou <b>no</b> Brasil.'),
					T('I am in Brazil', 'estou no brasil', null, ['eu estou no brasil', 'tô no brasil', 'eu tô no brasil']),
					T('I like the city (gostar de + a cidade)', 'gosto da cidade', 'gostar always takes de. Spanish "me gusta" does not transfer: eu gosto de.', ['eu gosto da cidade']),
					L('A gente tá no centro', 'We are downtown.')
				]
			},
			{
				id: 'pres-1', title: 'Presente', sub: 'Regular endings and the irregular stars',
				steps: [
					I('The pattern', '<b>falar</b>: eu fal<b>o</b>, você fal<b>a</b>, nós fal<b>amos</b>, vocês fal<b>am</b><br><b>comer</b>: com<b>o</b>, com<b>e</b>, com<b>emos</b>, com<b>em</b><br><b>abrir</b>: abr<b>o</b>, abr<b>e</b>, abr<b>imos</b>, abr<b>em</b>'),
					T('Eu _____ em BH (morar)', 'moro'),
					T('Você _____ carne? (comer)', 'come'),
					I('Irregular stars', 'ser: <b>sou / é</b> · ter: <b>tenho / tem</b> · ir: <b>vou / vai</b><br>fazer: <b>faço / faz</b> · poder: <b>posso / pode</b><br>querer: <b>quero / quer</b> · saber: <b>sei / sabe</b>'),
					T('Eu _____ (ter)', 'tenho'),
					T('Você _____ (fazer)', 'faz'),
					T('Eu _____ (poder)', 'posso'),
					T('Ela _____ (querer)', 'quer'),
					I('The real-life present', '<b>estar + -ndo</b> for what is happening now.<br>"Tô aprendendo português" = I am learning Portuguese.<br>Spanish -ando/-iendo becomes -ando/-endo/-indo.', 'tô aprendendo português'),
					T('I am learning Portuguese (short spoken form)', 'tô aprendendo português', null, ['estou aprendendo português', 'eu tô aprendendo português', 'eu estou aprendendo português']),
					I('The easy future', '<b>ir + infinitive</b>, with no "a" in the middle.<br>"Vou viajar" (Spanish: voy <i>a</i> viajar).'),
					T('I am going to travel', 'vou viajar', null, ['eu vou viajar'])
				]
			}
		]
	},
	{
		title: 'Passado: eu vs você',
		sub: 'The tense pair that trips everyone',
		lessons: [
			{
				id: 'perf-1', title: 'Ontem: -ei vs -ou', sub: 'Pretérito perfeito, regular verbs',
				steps: [
					I('Finished actions', 'For -ar verbs: eu fal<b>ei</b> (fah-LAY), você fal<b>ou</b> (fah-LOH).<br>Spanish hablé / habló becomes falei / falou. In Portuguese the whole ending changes, not just the stress.', 'eu falei. você falou.'),
					T('Ontem eu _____ (falar)', 'falei'),
					T('Ontem você _____ (falar)', 'falou'),
					I('-er and -ir', 'eu com<b>i</b>, você com<b>eu</b><br>eu abr<b>i</b>, você abr<b>iu</b><br>Hook: eu is short (just i). Você adds a u.', 'eu comi. você comeu. eu abri. você abriu.'),
					T('Eu _____ pão de queijo (comer)', 'comi'),
					T('Você _____? (comer)', 'comeu'),
					T('Ela _____ a porta (abrir)', 'abriu'),
					T('Eu _____ água (beber)', 'bebi'),
					I('Spelling protects the sound', 'Only in the eu form:<br>fi<b>car</b> = fi<b>quei</b> · che<b>gar</b> = che<b>guei</b> · come<b>çar</b> = come<b>cei</b><br>Você stays normal: ficou, chegou, começou.'),
					T('I arrived', 'cheguei', null, ['eu cheguei']),
					T('Eu _____ em casa (ficar)', 'fiquei'),
					C('Você _____ ontem? (chegar)', 'chegou', ['cheguei', 'chegava', 'chegue'])
				]
			},
			{
				id: 'perf-2', title: 'The irregular gang', sub: 'fui/foi, fiz/fez, tive/teve',
				steps: [
					I('The ones you hear every minute', 'ser and ir share forms: eu <b>fui</b>, você <b>foi</b> ("fui" = I went or I was).<br>ter: <b>tive / teve</b><br>estar: <b>estive / esteve</b><br>fazer: <b>fiz / fez</b>', 'fui. foi. tive. teve. fiz. fez.'),
					T('I went', 'fui', null, ['eu fui']),
					T('Você _____ à festa? (ir)', 'foi'),
					T('Eu _____ um bolo (fazer)', 'fiz'),
					T('Ela _____ um bolo (fazer)', 'fez'),
					T('Eu _____ sorte (ter)', 'tive'),
					T('Você _____ tempo? (ter)', 'teve'),
					I('See the pattern', 'eu has the i/u sound, você has the e/o sound:<br>fiz/fez · tive/teve · estive/esteve · pude/pôde · pus/pôs<br>Same for both: disse, quis, trouxe, soube<br>Odd ones: vim/veio (vir) · vi/viu (ver) · dei/deu (dar)'),
					T('Eu _____ (poder)', 'pude'),
					T('Você _____ (poder)', 'pôde'),
					T('Eu _____ de ônibus (vir)', 'vim'),
					T('Ele _____ de ônibus (vir)', 'veio'),
					T('Eu _____ o jogo (ver)', 'vi'),
					C('"Eu soube ontem" means', 'I found out yesterday', ['I knew yesterday', 'I tasted it yesterday', 'I went up yesterday'], 'saber in the perfeito = found out, like Spanish "supe".')
				]
			},
			{
				id: 'imp-1', title: 'Imperfeito', sub: 'Used to, was doing, and tava',
				steps: [
					I('Background and habits', '-ar: fal<b>ava</b> · -er/-ir: com<b>ia</b>, abr<b>ia</b><br>Good news: eu and você are identical here.<br>Spanish hablaba = falava (b turns into v).', 'falava. comia. abria.'),
					T('Antigamente eu _____ em Lisboa (morar)', 'morava'),
					T('Você _____ carne? (comer)', 'comia'),
					I('Only four irregulars', 'ser = <b>era</b> · ter = <b>tinha</b> · vir = <b>vinha</b> · pôr = <b>punha</b>'),
					T('Quando eu _____ criança (ser)', 'era'),
					T('Eu _____ um cachorro (ter)', 'tinha'),
					I('Perfeito vs imperfeito', 'Same logic as Spanish. Background = imperfeito, event = perfeito.<br>"Eu <b>dormia</b> quando você <b>ligou</b>" = I was sleeping when you called.'),
					C('Eu _____ quando você chegou.', 'cozinhava', ['cozinhei', 'cozinho', 'cozinhe'], 'Ongoing background action = imperfeito.'),
					C('Ontem eu _____ ao cinema.', 'fui', ['ia', 'vou', 'fosse'], 'One finished event = perfeito.'),
					I('Spoken shortcut', 'estava becomes <b>tava</b>. "Eu tava em casa." Everyone says it.', 'eu tava em casa'),
					T('It was raining (estar + chovendo)', 'estava chovendo', null, ['tava chovendo'])
				]
			}
		]
	},
	{
		title: 'Subjuntivo',
		sub: 'What separates B2 from C1',
		lessons: [
			{
				id: 'subj-1', title: 'Espero que, se, quando', sub: 'Three subjunctives, one recipe each',
				steps: [
					I('Present subjunctive', 'Take the eu form, drop the -o, swap the vowel.<br>falo = fal<b>e</b> · como = com<b>a</b> · faço = faç<b>a</b> · tenho = tenh<b>a</b><br>Triggers: espero que, quero que, talvez, tomara que.'),
					T('Espero que você _____ (gostar)', 'goste'),
					T('Quero que você _____ isso (fazer)', 'faça'),
					T('Talvez eu _____ tempo (ter)', 'tenha'),
					I('Tomara que', '"Tomara que dê certo" = fingers crossed it works out.<br>Irregular: ser = seja · estar = esteja · ir = vá · dar = dê · saber = saiba · querer = queira', 'tomara que dê certo'),
					T('Tomara que _____ certo (dar)', 'dê'),
					I('If only: imperfect subjunctive', 'Take the "eles" past form, drop -ram, add <b>-sse</b>.<br>falaram = fala<b>sse</b> · fizeram = fize<b>sse</b> · foram = fo<b>sse</b><br>"Se eu <b>fosse</b> você..." = If I were you.<br>Pair it with the conditional: Se eu <b>tivesse</b> dinheiro, <b>viajaria</b>.'),
					T('Se eu _____ você (ser)', 'fosse'),
					T('Se eu _____ tempo, iria (ter)', 'tivesse'),
					I('Future subjunctive: the Spanish trap', 'Spanish dropped this tense. Portuguese uses it all day, after <b>quando</b>, <b>se</b>, <b>assim que</b> when talking about the future.<br>"Quando eu <b>for</b> ao Brasil" (Spanish: cuando vaya)<br>"Se você <b>quiser</b>" (Spanish: si quieres)<br>Recipe: "eles" past form minus -am. foram = for · quiseram = quiser · fizeram = fizer'),
					T('Quando eu _____ ao Brasil (ir)', 'for'),
					T('Se você _____, a gente vai (querer)', 'quiser'),
					T('Quando você _____, me liga (poder)', 'puder'),
					C('Assim que eu _____, te aviso. (chegar)', 'chegar', ['chegue', 'chego', 'chegasse'], 'For regular verbs the future subjunctive looks just like the infinitive.')
				]
			}
		]
	},
	{
		title: 'Espanhol vs Português',
		sub: 'False friends that embarrass you',
		lessons: [
			{
				id: 'es-1', title: 'Falsos amigos', sub: 'It looks Spanish. It is not.',
				steps: [
					C('"esquisito" means', 'weird', ['exquisite', 'delicious', 'expensive'], 'Spanish exquisito = delicious. In Portuguese, comida esquisita is strange food.'),
					C('"polvo" is', 'octopus', ['dust', 'powder', 'chicken'], 'Dust is pó or poeira.'),
					C('"borracha" is', 'an eraser, rubber', ['a drunk woman', 'a storm', 'a pillow'], 'Drunk is bêbada.'),
					C('"embaraçada" means', 'embarrassed, tangled', ['pregnant', 'boarded', 'hugged'], 'Pregnant is grávida.'),
					C('"apelido" is a', 'nickname', ['surname', 'appeal', 'apology'], 'Surname is sobrenome.'),
					C('"oficina" is a', 'repair shop, workshop', ['office', 'factory', 'pharmacy'], 'Office is escritório.'),
					C('"propina" is a', 'bribe', ['tip', 'tuition', 'property'], 'A tip is gorjeta. Do not offer the waiter a propina.'),
					C('"largo" means', 'wide', ['long', 'slow', 'far'], 'Long is comprido or longo.'),
					C('"pegar" means', 'to grab, take, catch', ['to hit', 'to glue', 'to pay'], 'Pegar o ônibus = to catch the bus.'),
					T('a tip (at a restaurant)', 'gorjeta'),
					T('surname', 'sobrenome'),
					I('Bonus: the personal infinitive', 'Portuguese can conjugate an infinitive. Spanish cannot.<br>"para nós fazer<b>mos</b>" · "antes de eles chegar<b>em</b>"<br>Spanish needs a full clause: para que hagamos.'),
					C('É importante vocês _____ cedo.', 'chegarem', ['cheguem', 'chegam', 'chegando'], 'Personal infinitive: chegar + em for vocês/eles.')
				]
			}
		]
	},
	{
		title: 'Mineirês',
		sub: 'How they talk in Belo Horizonte',
		lessons: [
			{
				id: 'bh-1', title: 'Uai, sô!', sub: 'Trem, cê, bão, nó',
				steps: [
					I('Beagá', 'Belo Horizonte is called <b>BH</b>, said "Beagá" (beh-ah-GAH). People from Minas Gerais are <b>mineiros</b>, and their way of speaking, <b>mineirês</b>, is famous across Brazil for being warm and for swallowing syllables.', 'Beagá'),
					I('Uai', '<b>Uai</b> (sounds like "why") is the mineiro word. Surprise, doubt, emphasis, or plain punctuation.<br>"Uai, cê não vem?" · "Uai, sô!"', 'Uai, cê não vem?'),
					I('Trem', '<b>trem</b> is literally a train, but in Minas it means "thing". Any thing.<br>"Que trem bão!" = What a great thing!<br>"Pega esse trem pra mim" = Grab that thing for me.', 'Que trem bão!'),
					C('"Me passa esse trem aí" means', 'Pass me that thing', ['The train is passing', 'Take me to the station', 'I missed the train']),
					I('Cê tá bão?', '<b>cê</b> (or ocê) = você · <b>bão</b> = bom<br>"Cê tá bão?" = You good?<br>Answer: "Tô bão demais, uai."', 'Cê tá bão? Tô bão demais, uai.'),
					T('The mineiro short form of "você"', 'cê', null, ['ocê']),
					I('Nó!', '<b>Nó!</b>, <b>Nu!</b> and <b>Nossa!</b> are all cut down from "Nossa Senhora". They mean wow.<br>"Nó, que trem caro!"', 'Nó, que trem caro!'),
					I('Demais da conta, sô', '<b>demais da conta</b> = a huge amount, usually praise. "Bão demais da conta."<br><b>sô</b> comes from "senhor" and works like "man": "Calma, sô!"', 'Bão demais da conta. Calma, sô!'),
					C('"Esse pão de queijo tá bão demais da conta" means', 'This cheese bread is insanely good', ['This cheese bread costs too much', 'This cheese bread is on the bill', 'There is too much cheese bread']),
					L('Uai, cê tá bão?', 'Hey, you good?'),
					T('"thing" in mineirês', 'trem')
				]
			},
			{
				id: 'bh-2', title: 'Comendo sílabas', sub: 'Oncotô? Tiquim. Arreda.',
				steps: [
					I('Mineiros eat syllables', 'Words lose their endings and glue together. The famous joke trio:<br>"Onde que eu tô?" = <b>Oncotô?</b><br>"Pra onde que eu vou?" = <b>Proncovô?</b><br>"Quem que eu sou?" = <b>Quencosô?</b>'),
					C('"Oncotô?" means', 'Where am I?', ['Who am I?', 'How much is it?', 'Where is the bathroom?']),
					I('-inho becomes -im', 'pouquinho = <b>tiquim</b> · cafezinho = <b>cafezim</b> · bonitinho = <b>bunitim</b><br>"Só um tiquim" = just a tiny bit.', 'Só um tiquim'),
					T('"a tiny bit": um _____', 'tiquim', null, ['tiquinho']),
					I('Words you will hear in BH', '<b>arreda</b> = move over: "Arreda um tiquim."<br><b>custoso</b> = hard work, said of people or things<br><b>caçar</b> = to look for: "Tô caçando minha chave."<br><b>quitanda</b> = homemade cakes and biscuits (elsewhere it is a grocery)', 'Arreda um tiquim. Tô caçando minha chave.'),
					C('"Arreda aí, sô" means', 'Move over, man', ['Hurry up, man', 'Calm down, man', 'Come here, man']),
					C('In BH, "tô caçando meu celular" means', 'I am looking for my phone', ['I am hunting with my phone', 'I am selling my phone', 'I broke my phone']),
					I('Life in BH', 'BH calls itself the bar capital of Brazil. A neighbourhood bar is a <b>boteco</b>.<br>"Bora tomar uma?" = Shall we grab a beer?<br>Eat: pão de queijo, feijão tropeiro, doce de leite.<br>Football: Atlético (o Galo) or Cruzeiro (a Raposa). Choose carefully.', 'Bora tomar uma?'),
					T('"Let\'s go" (slang, one word)', 'bora', null, ['bora lá', 'vamos']),
					C('The coffee joke "Pópôpó?" means', 'Can I put the powder in?', ['Is it ready?', 'One more cup?', 'Too much sugar?'], '"Pode pôr pó?" The answer is "Pó pô." (Pode pôr.)'),
					L('Arreda um tiquim, sô', 'Scoot over a little, man.')
				]
			}
		]
	},
	{
		title: 'Soar natural',
		sub: 'Glue words and words that impress',
		lessons: [
			{
				id: 'conv-1', title: 'Né, tipo, pois é', sub: 'Fillers and reactions',
				steps: [
					I('Glue words', 'Natives judge fluency by these.<br><b>né</b> = right? · <b>tipo</b> = like · <b>então</b> = so<br><b>pois é</b> = yeah, I know · <b>sei lá</b> = I dunno<br><b>enfim</b> = anyway · <b>aliás</b> = by the way, actually', 'né. tipo. então. pois é. sei lá. enfim. aliás.'),
					C('A friend complains about traffic. Show you agree:', 'Pois é...', ['Tomara', 'De nada', 'Com licença']),
					T('"I dunno" (two words)', 'sei lá'),
					I('Reactions', '<b>Nossa!</b> = wow · <b>Sério?</b> = really?<br><b>Imagina!</b> = not at all, you are welcome<br><b>Beleza</b> = ok, cool · <b>Valeu</b> = thanks · <b>Fechou</b> = deal', 'Nossa! Sério? Imagina! Beleza. Valeu. Fechou.'),
					C('Someone thanks you. Casual reply:', 'Imagina!', ['Pois é', 'Sei lá', 'Tomara']),
					T('"Deal!" after agreeing a plan', 'fechou', null, ['combinado', 'beleza']),
					I('Ficar and dar do everything', '<b>ficar</b>: ficar em casa (stay) · ficar feliz (become) · fica na Savassi (is located)<br><b>dar</b>: dar certo (work out) · dar um jeito (find a way) · dar conta (cope) · não dá (no can do)'),
					T('It worked out! (dar certo, past)', 'deu certo'),
					T('"No can do" (two words)', 'não dá'),
					C('"Vou dar um jeito" means', 'I will find a way', ['I will give a gift', 'I will take a look', 'I will give up']),
					L('Pois é, sei lá, né', 'Yeah, I dunno, right.')
				]
			},
			{
				id: 'c2-1', title: 'Palavras que impressionam', sub: 'Say these and watch faces change',
				steps: [
					I('Words with no English twin', '<b>saudade</b> = the ache of missing someone<br><b>desabafar</b> = to vent<br><b>caprichar</b> = to do it with extra care<br><b>perrengue</b> = a rough, stressful situation<br><b>gambiarra</b> = a hacky improvised fix', 'saudade. desabafar. caprichar. perrengue. gambiarra.'),
					C('"Passei um perrengue no aeroporto" means', 'I had a rough time at the airport', ['I spent a fortune at the airport', 'I met someone at the airport', 'I slept at the airport']),
					T('to vent, get it off your chest', 'desabafar'),
					C('"Capricha no café!" means', 'Make the coffee extra good!', ['Hurry up with the coffee!', 'No more coffee!', 'Pay for the coffee!']),
					I('Educated connectors', '<b>contudo, todavia</b> = however · <b>portanto</b> = therefore<br><b>ou seja</b> = that is · <b>sobretudo</b> = above all<br><b>tampouco</b> = neither · <b>convenhamos</b> = let\'s face it<br><b>diga-se de passagem</b> = incidentally'),
					T('"let\'s face it" (one word)', 'convenhamos'),
					C('"Não gostei do filme, tampouco do livro."', 'I did not like the film, nor the book', ['I liked the film but not the book', 'I liked the book more than the film', 'I did not see the film or read the book']),
					I('Idioms', '<b>quebrar o galho</b> = to help out, to make do<br><b>pisar na bola</b> = to mess up<br><b>encher linguiça</b> = to waffle, pad it out<br><b>fazer questão</b> = to insist: "Faço questão de pagar."', 'quebrar o galho. pisar na bola. encher linguiça. Faço questão de pagar.'),
					T('Faço _____ de pagar (I insist on paying)', 'questão'),
					C('"Ele pisou na bola" means', 'He messed up', ['He scored a goal', 'He stepped on the ball', 'He left early']),
					C('"Para de encher linguiça" means', 'Stop waffling', ['Stop eating sausage', 'Stop complaining', 'Stop showing off']),
					L('Convenhamos, foi um perrengue', 'Let\'s face it, it was rough.')
				]
			}
		]
	}
];

export const LESSON_LIST = UNITS.flatMap((u) => u.lessons);
export const LESSONS = Object.fromEntries(LESSON_LIST.map((l) => [l.id, l]));

// Starter word bank: [pt, en, say, example, example in English]
export const SEED = [
	['saudade', 'the ache of missing someone or something', 'sow-DAH-jee', 'Tô com saudade de você.', 'I miss you.'],
	['perrengue', 'a rough, stressful situation', 'peh-HENG-ghee', 'Passei um perrengue no aeroporto.', 'I had a rough time at the airport.'],
	['gambiarra', 'a hacky improvised fix', 'gahm-bee-AH-hah', 'Fiz uma gambiarra pra consertar o chuveiro.', 'I rigged up a fix for the shower.'],
	['desabafar', 'to vent, get it off your chest', 'deh-zah-bah-FAR', 'Preciso desabafar com alguém.', 'I need to vent to someone.'],
	['caprichar', 'to do something with extra care', 'kah-pree-SHAR', 'Capricha no molho!', 'Go all out on the sauce!'],
	['cafuné', "stroking someone's hair with affection", 'kah-foo-NEH', 'Ela adora um cafuné.', 'She loves having her hair stroked.'],
	['xodó', 'sweetheart, the apple of your eye', 'shoh-DAW', 'Esse cachorro é meu xodó.', 'This dog is my darling.'],
	['convenhamos', "let's face it", 'kon-veh-NYAH-moos', 'Convenhamos, o filme foi fraco.', "Let's face it, the film was weak."],
	['aliás', 'by the way; actually', 'ah-lee-ICE', 'Aliás, você viu a Ana?', 'By the way, did you see Ana?'],
	['inclusive', 'in fact, even', 'een-kloo-ZEE-vee', 'Eu gostei, inclusive comprei dois.', 'I liked it, in fact I bought two.'],
	['enfim', 'anyway, in short', 'en-FEENG', 'Enfim, deu tudo certo.', 'Anyway, it all worked out.'],
	['pois é', 'yeah, exactly; I know', 'poyz EH', 'Pois é, tá caro demais.', "Yeah, it's way too expensive."],
	['sei lá', 'I dunno', 'say LAH', 'Sei lá, acho que sim.', 'I dunno, I think so.'],
	['tomara', 'hopefully, fingers crossed', 'toh-MAH-rah', 'Tomara que dê certo.', 'I hope it works out.'],
	['quebrar o galho', 'to help out, to make do', 'keh-BRAR oo GAH-lyoo', 'Você pode quebrar o galho pra mim?', 'Can you help me out?'],
	['pisar na bola', 'to mess up, let someone down', 'pee-ZAR nah BAW-lah', 'Não quero pisar na bola de novo.', "I don't want to mess up again."],
	['dar um jeito', 'to find a way, sort it out', 'dar oong ZHAY-too', 'Calma, a gente vai dar um jeito.', "Relax, we'll find a way."],
	['fazer questão', 'to insist on, to make a point of', 'fah-ZEHR kes-TOWNG', 'Não precisa fazer questão disso.', "You don't need to insist on that."],
	['dar conta', 'to manage, to cope', 'dar KON-tah', 'Não vou dar conta de tanto trabalho.', "I won't cope with so much work."],
	['tampouco', 'neither, nor', 'tahm-POH-koo', 'Não fui, tampouco liguei.', "I didn't go, nor did I call."],
	['todavia', 'however (formal)', 'toh-dah-VEE-ah', 'O plano é bom; todavia, é caro.', "The plan is good; however, it's expensive."],
	['sobretudo', 'above all', 'soh-bree-TOO-doo', 'Gosto de Minas, sobretudo da comida.', 'I like Minas, above all the food.'],
	['imprescindível', 'indispensable', 'eem-preh-seen-JEE-veh-oo', 'Sua ajuda é imprescindível.', 'Your help is indispensable.'],
	['deslumbrante', 'stunning, dazzling', 'dez-loom-BRAHN-chee', 'A vista é deslumbrante.', 'The view is stunning.'],
	['uai', 'mineiro exclamation of surprise or emphasis', 'why', 'Uai, cê não vem?', "Huh, aren't you coming?"],
	['trem', 'thing (in Minas)', 'trayng', 'Que trem bão!', 'What a great thing!'],
	['tiquim', 'a tiny bit (in Minas)', 'chee-KEENG', 'Só um tiquim de café.', 'Just a tiny bit of coffee.'],
	['arredar', 'to move over (in Minas)', 'ah-heh-DAR', 'Dá pra arredar um tiquim?', 'Can you scoot over a bit?'],
	['custoso', 'hard work, difficult to deal with (in Minas)', 'koos-TOH-zoo', 'Esse menino é custoso demais.', 'This kid is such hard work.'],
	['boteco', 'a casual neighbourhood bar', 'boh-TEH-koo', 'Bora pro boteco?', 'Shall we hit the bar?'],
	['mancada', 'a blunder, a slip-up', 'mahn-KAH-dah', 'Que mancada a minha!', 'What a blunder on my part!'],
	['por incrível que pareça', 'believe it or not', 'por een-KREE-veh-oo kee pah-REH-sah', 'Por incrível que pareça, eu gostei.', 'Believe it or not, I liked it.'],
	['ainda bem', 'thank goodness', 'ah-EEN-dah bayng', 'Ainda bem que você veio.', 'Thank goodness you came.'],
	['diga-se de passagem', 'incidentally, it should be said', 'JEE-gah-see jee pah-SAH-zhayng', 'O bolo, diga-se de passagem, estava ótimo.', 'The cake, incidentally, was great.']
].map(([pt, en, say, ex, exEn]) => ({ pt, en, say, ex, exEn }));
