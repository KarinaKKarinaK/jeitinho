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
		title: 'Subjuntivo na vida real',
		sub: 'Wishes, doubts and what-ifs, the way people use them',
		lessons: [
			{
				id: 'subj-2', title: 'Tomara que dê certo', sub: 'The triggers that force the subjunctive',
				steps: [
					I('Triggers, not rules', 'You do not choose the subjunctive. Certain words force it. Learn the triggers and the verb follows.<br><b>espero que</b>, <b>tomara que</b>, <b>quero que</b> (wish)<br><b>talvez</b>, <b>duvido que</b> (doubt)<br><b>embora</b>, <b>para que</b>, <b>caso</b> (always)', 'Tomara que dê certo. Talvez ele venha.'),
					I('The form', 'Take the eu form of the present, drop the o, swap the vowel.<br>falar: fal<b>e</b> · comer: com<b>a</b> · abrir: abr<b>a</b><br>Irregular eu forms carry over: tenho gives <b>tenha</b>, faço gives <b>faça</b>, venho gives <b>venha</b>.<br>Spanish speakers: same logic as hable, coma, tenga.'),
					T('Espero que você _____ (gostar)', 'goste', 'gostar: gosto, goste.'),
					T('Tomara que _____ certo (dar)', 'dê', 'dar is irregular: dê. "Tomara que dê certo" = I hope it works out.'),
					C('"Talvez eu vá" means', 'Maybe I will go', ['I will surely go', 'I went, perhaps', 'I would go'], 'talvez + subjunctive. vá is ir.'),
					T('Quero que você _____ comigo (vir)', 'venha', 'venho gives venha.'),
					I('Embora and caso', '<b>embora</b> = although. Always subjunctive, unlike Spanish aunque.<br>Embora <b>seja</b> caro, vale a pena.<br><b>caso</b> = in case, if.<br>Caso você <b>precise</b>, me liga.', 'Embora seja caro, vale a pena. Caso você precise, me liga.'),
					T('Embora ele _____ rico, é infeliz (ser)', 'seja'),
					T('Vou explicar de novo para que vocês _____ (entender)', 'entendam', 'para que + subjunctive.'),
					C('Which is right?', 'Duvido que ele saiba', ['Duvido que ele sabe', 'Duvido que ele soube', 'Duvido que ele sabia'], 'Doubt forces the subjunctive: saber gives saiba.'),
					L('Tomara que dê tudo certo', 'I hope everything works out.'),
					T('Espero que você _____ bem (estar)', 'esteja', 'estar gives esteja.')
				]
			},
			{
				id: 'subj-3', title: 'Se eu fosse você', sub: 'Unreal ifs and polite distance',
				steps: [
					I('The unreal if', 'For things that are not true now: <b>se + imperfect subjunctive, conditional</b>.<br>Se eu <b>tivesse</b> tempo, <b>viajaria</b> mais.<br>In speech the second half often becomes the imperfect: Se eu tivesse tempo, <b>viajava</b> mais.', 'Se eu tivesse tempo, viajaria mais.'),
					I('The form', 'Take the eles form of the preterite, drop -ram, add -sse.<br>falaram: fala<b>sse</b> · tiveram: tive<b>sse</b> · foram: fo<b>sse</b> · fizeram: fize<b>sse</b><br>Spanish speakers: it is your -se form (hablase, tuviese).'),
					T('Se eu _____ você, eu ia (ser)', 'fosse', 'foram gives fosse. "Se eu fosse você" = if I were you.'),
					T('Se a gente _____ dinheiro, comprava (ter)', 'tivesse'),
					T('Se você _____, você entenderia (saber)', 'soubesse', 'souberam gives soubesse.'),
					C('"Ele fala como se soubesse tudo" means', 'He talks as if he knew everything', ['He talks because he knows everything', 'He talked when he knew everything', 'He says he knows everything'], 'como se + imperfect subjunctive, always.'),
					I('After a past wish', 'When the trigger is in the past, the subjunctive goes to the past too.<br>Quero que você <b>venha</b>. (now)<br>Queria que você <b>viesse</b>. (past or polite)', 'Queria que você viesse.'),
					T('Eu queria que você _____ comigo (vir)', 'viesse'),
					T('Ela pediu que eu _____ mais cedo (chegar)', 'chegasse'),
					C('Which is right?', 'Se eu pudesse, eu ajudaria', ['Se eu poderia, eu ajudaria', 'Se eu posso, eu ajudaria', 'Se eu pude, eu ajudaria'], 'Never the conditional after se. poder: puderam, pudesse.'),
					L('Se eu fosse você, eu não ia', 'If I were you, I would not go.')
				]
			},
			{
				id: 'subj-4', title: 'Quando eu puder', sub: 'The tense Spanish lost',
				steps: [
					I('Future subjunctive', 'After <b>quando, se, assim que, enquanto, quem, como</b> pointing at the future, Portuguese uses a tense Spanish dropped centuries ago.<br>Quando eu <b>chegar</b>, te ligo.<br>Spanish: cuando llegue. Portuguese: quando chegar.', 'Quando eu chegar, te ligo.'),
					I('The form', 'Take the eles preterite, drop -am.<br>falaram: <b>falar</b> · tiveram: <b>tiver</b> · foram: <b>for</b> · fizeram: <b>fizer</b> · puderam: <b>puder</b> · quiseram: <b>quiser</b><br>Regular verbs look just like the infinitive. The irregular ones are where you show your level.'),
					T('Quando eu _____ tempo, eu te ajudo (ter)', 'tiver'),
					T('Se você _____, a gente vai junto (querer)', 'quiser'),
					T('Assim que eu _____, eu aviso (saber)', 'souber'),
					C('"Seja o que for" means', 'Whatever it may be', ['Be what you were', 'It will be what it was', 'Let it go'], 'for = future subjunctive of ser and ir.'),
					I('The ver and vir trap', 'The future subjunctive of <b>ver</b> (to see) is <b>vir</b>. The one for <b>vir</b> (to come) is <b>vier</b>.<br>Quando você <b>vir</b> a Ana, fala com ela. (see)<br>Quando você <b>vier</b>, traz pão. (come)<br>Many Brazilians get this wrong. Get it right and people notice.', 'Quando você vir a Ana, fala com ela. Quando você vier, traz pão.'),
					T('Quando você _____ aqui, me avisa (vir, to come)', 'vier'),
					T('Se você _____ o Pedro, manda um abraço (ver, to see)', 'vir'),
					T('Faça como você _____ (querer)', 'quiser', 'como + future subjunctive = however you like.'),
					C('Which is right?', 'Se eu puder, eu vou', ['Se eu posso, eu irei', 'Se eu poderia, eu vou', 'Se eu possa, eu vou'], 'A real future if takes the future subjunctive.'),
					L('Quando der, a gente se vê', 'When we can, we will see each other. der = dar.')
				]
			}
		]
	},
	{
		title: 'Gramática fina',
		sub: 'The details that separate good from fluent',
		lessons: [
			{
				id: 'inf-1', title: 'Para a gente fazer', sub: 'The personal infinitive',
				steps: [
					I('An infinitive with a subject', 'Portuguese can conjugate the infinitive. No other major Romance language does this.<br>É melhor <b>a gente ir</b>. · É melhor <b>vocês irem</b>.<br>Endings: eu and você add nothing, nós adds <b>-mos</b>, vocês and eles add <b>-em</b>.', 'É melhor vocês irem.'),
					I('It replaces "que" clauses', 'After a preposition, use it and skip the subjunctive.<br>Comprei pão <b>para vocês comerem</b>. (for you to eat)<br>Antes de <b>eles chegarem</b>, arruma a casa.<br>Spanish needs "para que coman". Portuguese does not.', 'Comprei pão para vocês comerem.'),
					T('É melhor vocês _____ agora (sair)', 'saírem', 'sair + em. The accent keeps the i stressed.'),
					T('Trouxe o livro para você _____ (ler)', 'ler', 'você adds nothing.'),
					T('Antes de nós _____, vamos comer (ir)', 'irmos'),
					C('"Fiz isso para eles entenderem" means', 'I did this so that they would understand', ['I did this because they understood', 'I did this for understanding them', 'They did this to understand']),
					T('Apesar de eles _____ cansados, vieram (estar)', 'estarem'),
					C('Which sounds most natural?', 'Deixa eu ver', ['Deixa-me ver que', 'Deixa que eu veja-o', 'Deixe eu a ver'], '"Deixa eu ver" = let me see. Spoken Brazilian uses eu, not me, before the infinitive.'),
					T('Sem a gente _____, nada muda (falar)', 'falar', 'a gente takes the você form: nothing added.'),
					L('É difícil eles aceitarem isso', 'It is hard for them to accept that.'),
					T('Depois de vocês _____, a gente conversa (chegar)', 'chegarem')
				]
			},
			{
				id: 'comp-1', title: 'Tinha feito, tenho feito', sub: 'Compound pasts and a Spanish false friend',
				steps: [
					I('Tinha feito = had done', '<b>tinha + participle</b> is the past before the past.<br>Quando cheguei, ela já <b>tinha saído</b>.<br>Spanish uses haber. Brazilians use <b>ter</b>. "Havia saído" exists but sounds written.', 'Quando cheguei, ela já tinha saído.'),
					T('Eu já _____ comido quando você ligou (had)', 'tinha'),
					I('Irregular participles', 'fazer: <b>feito</b> · dizer: <b>dito</b> · ver: <b>visto</b> · pôr: <b>posto</b><br>escrever: <b>escrito</b> · abrir: <b>aberto</b> · vir: <b>vindo</b><br>Close to Spanish: hecho, dicho, visto, puesto.'),
					T('Ela nunca tinha _____ isso (ver)', 'visto'),
					T('Eu não tinha _____ nada (dizer)', 'dito'),
					I('False friend: tenho feito', 'Spanish "he hecho" = I have done. Portuguese <b>tenho feito</b> does NOT mean that.<br>It means "I have been doing, repeatedly, lately".<br><b>Tenho dormido mal.</b> = I have been sleeping badly.<br>For "I have done it", use the simple past: <b>Já fiz.</b>', 'Tenho dormido mal. Já fiz.'),
					C('"I have already eaten" is', 'Já comi', ['Tenho comido', 'Já tenho comido', 'Hei comido'], 'One finished action = simple past, even with já.'),
					C('"Tenho trabalhado muito" means', 'I have been working a lot lately', ['I worked a lot once', 'I have to work a lot', 'I had worked a lot']),
					I('Regrets: teria and tivesse', 'Se eu <b>tivesse sabido</b>, <b>teria ido</b>.<br>If I had known, I would have gone.<br>In speech: Se eu soubesse, <b>tinha ido</b>.', 'Se eu tivesse sabido, teria ido.'),
					T('Se eu tivesse estudado, eu _____ passado (would have)', 'teria', 'In speech you also hear "tinha passado".', ['tinha']),
					T('Se você _____ avisado, eu teria esperado (had)', 'tivesse'),
					L('Eu nunca tinha visto nada igual', 'I had never seen anything like it.')
				]
			},
			{
				id: 'con-1', title: 'Só que, aliás, ou seja', sub: 'Connectors that make you sound fluent',
				steps: [
					I('Spoken glue', 'Fluent speech is short sentences joined well.<br><b>só que</b> = but, except that (more common than "mas" in speech)<br><b>aliás</b> = by the way, actually<br><b>ou seja</b> = in other words<br><b>mesmo assim</b> = even so', 'Eu queria ir, só que tô sem dinheiro.'),
					T('Eu ia, _____ choveu (but, two words)', 'só que'),
					C('"Aliás, você viu a Ana?"', 'By the way, did you see Ana?', ['Anyway, you saw Ana', 'So you saw Ana?', 'Otherwise, you saw Ana']),
					I('Cause', '<b>já que</b> = since, given that: Já que você tá aqui, me ajuda.<br><b>uma vez que</b> = given that (formal)<br><b>por isso</b> = that is why<br><b>afinal</b> = after all', 'Já que você tá aqui, me ajuda.'),
					T('_____ você vai sair, compra pão (since, two words)', 'já que'),
					I('These force the subjunctive', '<b>por mais que</b> = however much: Por mais que eu <b>tente</b>, não consigo.<br><b>a não ser que</b> = unless: Eu vou, a não ser que <b>chova</b>.<br><b>desde que</b> = as long as: Pode ir, desde que <b>volte</b> cedo.<br><b>mesmo que</b> = even if: Mesmo que <b>seja</b> difícil.', 'Por mais que eu tente, não consigo.'),
					T('Eu vou, a não ser que _____ (chover)', 'chova'),
					T('Por mais que eu _____, não entendo (estudar)', 'estude'),
					C('"Pode usar, desde que devolva" means', 'You can use it as long as you return it', ['You can use it since you returned it', 'You can use it until you return it', 'Use it, then return it']),
					I('For writing and meetings', '<b>no entanto, contudo</b> = however<br><b>portanto</b> = therefore<br><b>além disso</b> = besides<br><b>por outro lado</b> = on the other hand<br><b>ainda assim</b> = still, even so'),
					T('therefore (one word)', 'portanto'),
					L('Mesmo assim, valeu a pena', 'Even so, it was worth it.')
				]
			}
		]
	},
	{
		title: 'Fala de nativo',
		sub: 'Idioms, register and words that turn heads',
		lessons: [
			{
				id: 'idi-1', title: 'Cair a ficha', sub: 'Idioms Brazilians use every day',
				steps: [
					I('Everyday idioms', '<b>cair a ficha</b> = to finally sink in (the token drops in the payphone)<br><b>dar um bolo</b> = to stand someone up<br><b>pagar mico</b> = to embarrass yourself<br><b>ficar de boa</b> = to chill, be fine with it', 'Só agora caiu a ficha. Ele me deu um bolo.'),
					C('"Ela me deu um bolo ontem" means', 'She stood me up yesterday', ['She baked me a cake yesterday', 'She hit me yesterday', 'She paid for me yesterday']),
					T('Só agora caiu a _____ (it finally sank in)', 'ficha'),
					C('"Paguei o maior mico" means', 'I really embarrassed myself', ['I paid the highest price', 'I bought a monkey', 'I got ripped off']),
					I('When things go wrong', '<b>engolir sapo</b> = to put up with something in silence (swallow a frog)<br><b>chutar o balde</b> = to stop caring and quit (kick the bucket, but nobody dies)<br><b>estar com a pulga atrás da orelha</b> = to be suspicious<br><b>dar zebra</b> = to go unexpectedly wrong', 'Cansei de engolir sapo. Chutei o balde.'),
					C('"Chutei o balde" means', 'I gave up and stopped caring', ['I died', 'I kicked something by accident', 'I started over'], 'A false friend with English "kick the bucket".'),
					T('Cansei de engolir _____ (put up with it)', 'sapo'),
					I('Good ones', '<b>matar a saudade</b> = to finally see or do what you missed<br><b>fazer uma vaquinha</b> = to chip in together<br><b>mandar bem</b> = to do great<br><b>de mão cheia</b> = really good at it: uma cozinheira de mão cheia', 'Vim matar a saudade. Você mandou bem!'),
					T('Vamos fazer uma _____ pra comprar o presente (chip in)', 'vaquinha'),
					T('Você _____ bem! (you did great)', 'mandou'),
					C('"Tô com a pulga atrás da orelha" means', 'I am suspicious', ['I have an earache', 'I am distracted', 'I am annoyed']),
					L('Vim matar a saudade de vocês', 'I came because I missed you all.')
				]
			},
			{
				id: 'reg-1', title: 'Falado vs escrito', sub: 'Two languages in one',
				steps: [
					I('Spoken shortcuts', 'Nobody says the full forms in conversation.<br>estou: <b>tô</b> · está: <b>tá</b> · para: <b>pra</b> · para o: <b>pro</b><br>não é: <b>né</b> · você: <b>cê</b> · onde está: <b>cadê</b><br>Write them in messages, not in a cover letter.', 'Tô indo pra casa. Cadê você?'),
					T('_____ meu celular? (where is)', 'cadê'),
					T('Vou _____ trabalho (spoken form of "para o")', 'pro'),
					I('Ter, not haver', 'For "there is", speech uses <b>tem</b>. Writing uses <b>há</b>.<br><b>Tem</b> um bar aqui perto. (spoken)<br><b>Há</b> um bar nas proximidades. (written)<br>Spanish hay = tem.', 'Tem um bar aqui perto.'),
					T('_____ muita gente aqui (there are, spoken)', 'tem'),
					I('Pronouns: the big split', 'Speech: <b>Eu vi ele.</b> · <b>Me dá</b> um café. · <b>Te ligo</b> amanhã.<br>Formal writing: Eu <b>o</b> vi. · <b>Dê-me</b> um café.<br>Saying "eu o vi" at a bar sounds like a textbook. Writing "vi ele" in an exam costs points. Know both.', 'Eu vi ele ontem. Me dá um café.'),
					C('At a bar with friends, you say', 'Eu vi ela ontem', ['Eu a vi ontem', 'Vi-a ontem', 'Eu lhe vi ontem'], 'The second and third are right on paper. Only the first is natural in speech.'),
					C('In a formal email, you write', 'Envio-lhe o documento em anexo', ['Te mando o documento aí', 'Mando pra você o trem', 'Cê recebe o documento']),
					I('Diminutives do work', '<b>-inho / -inha</b> is not only "small". It softens, warms or shrinks the effort.<br><b>rapidinho</b> = real quick · <b>cedinho</b> = nice and early<br><b>um minutinho</b> = just a sec<br>And <b>jeitinho</b>: the little way around a problem.', 'Volto rapidinho. Só um minutinho.'),
					T('Só um _____ (just a sec)', 'minutinho'),
					T('Volto _____ (real quick)', 'rapidinho'),
					L('Cadê o trem que eu te pedi?', 'Where is the thing I asked you for? (trem = thing, in Minas)')
				]
			},
			{
				id: 'c2-2', title: 'Palavras de quem lê muito', sub: 'Vocabulary that makes natives ask where you learned',
				steps: [
					I('Precise verbs', '<b>esmiuçar</b> = to go through in fine detail<br><b>almejar</b> = to long for, aim at<br><b>vislumbrar</b> = to glimpse, begin to see<br><b>relevar</b> = to let it slide, overlook<br><b>ponderar</b> = to weigh up', 'esmiuçar. almejar. vislumbrar. relevar. ponderar.'),
					T('to go through something in fine detail', 'esmiuçar'),
					C('"Releva, ele tá cansado" means', 'Let it slide, he is tired', ['Tell him, he is tired', 'Wake him, he is tired', 'Leave, he is tired'], 'False friend: relevar is not "to reveal". That is revelar.'),
					I('Adjectives with flavor', '<b>corriqueiro</b> = everyday, commonplace<br><b>mirabolante</b> = wildly elaborate, far-fetched<br><b>estapafúrdio</b> = absurd, outlandish<br><b>efêmero</b> = short-lived<br><b>primoroso</b> = exquisitely done', 'corriqueiro. mirabolante. estapafúrdio. efêmero. primoroso.'),
					C('"Um plano mirabolante" is', 'A wildly elaborate plan', ['A wonderful plan', 'A secret plan', 'A failed plan']),
					T('everyday, commonplace (adjective, masculine)', 'corriqueiro'),
					I('Formal glue', '<b>a despeito de</b> = in spite of<br><b>de antemão</b> = beforehand<br><b>à mercê de</b> = at the mercy of<br><b>porventura</b> = by any chance<br><b>quiçá</b> = perhaps, maybe even', 'a despeito de. de antemão. à mercê de. porventura. quiçá.'),
					T('Agradeço de _____ (thank you in advance)', 'antemão'),
					C('"Se porventura você mudar de ideia" means', 'If by any chance you change your mind', ['If luckily you change your mind', 'If you never change your mind', 'Since you changed your mind']),
					I('Nouns worth owning', '<b>ressalva</b> = caveat, reservation: Concordo, com uma ressalva.<br><b>respaldo</b> = backing, support<br><b>desdém</b> = disdain<br><b>empecilho</b> = obstacle, snag<br><b>alento</b> = encouragement, relief', 'Concordo, com uma ressalva.'),
					T('Concordo, com uma _____ (one caveat)', 'ressalva'),
					T('obstacle, snag', 'empecilho'),
					L('A despeito de tudo, deu certo', 'In spite of everything, it worked out.')
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

// Placement test for new users. One band per CEFR level, easiest first. The test climbs a band at a time
// and stops at the first band you do not pass, the staircase design used by adaptive placement tests.
// Items are production-heavy (typing a verb form) because recognising an answer overstates what you can say.
export const PLACEMENT = [
	{ band: 'A1', steps: [
		C('"Bom dia, tudo bem?" means', 'Good morning, how are you?', ['Good night, sleep well', 'Good day, see you later', 'Good luck with everything']),
		T('Eu _____ estudante (ser)', 'sou'),
		C('Você _____ café?', 'quer', ['quero', 'querem', 'queremos']),
		T('A gente _____ português (falar)', 'fala')
	] },
	{ band: 'A2', steps: [
		T('Ontem eu _____ ao mercado (ir)', 'fui'),
		T('Ontem você _____ o jantar (fazer)', 'fez'),
		C('Quando eu era criança, eu _____ na rua todo dia', 'brincava', ['brinquei', 'brinco', 'brincaria']),
		C('"Tô com fome" means', 'I am hungry', ['I am in a hurry', 'I am with a friend', 'I am tired'])
	] },
	{ band: 'B1', steps: [
		T('Se eu tivesse dinheiro, eu _____ mais (viajar)', 'viajaria', undefined, ['viajava']),
		C('Espero que você _____ bem', 'esteja', ['está', 'estar', 'estará']),
		T('Eu já _____ comido quando ela chegou (had)', 'tinha'),
		C('"A gente vai dar um jeito" means', 'We will find a way', ['We will give a gift', 'We will take a look', 'We will give up'])
	] },
	{ band: 'B2', steps: [
		T('Quando eu _____ tempo, eu te ligo (ter)', 'tiver'),
		T('Se eu _____ você, eu não iria (ser)', 'fosse'),
		C('"Tenho dormido mal" means', 'I have been sleeping badly lately', ['I slept badly once', 'I have to sleep badly', 'I had slept badly']),
		C('É melhor vocês _____ agora', 'saírem', ['saíam', 'saíram', 'sairão'])
	] },
	{ band: 'C1', steps: [
		T('Quando você _____ a Ana, fala com ela (ver, to see)', 'vir'),
		T('Por mais que eu _____, não consigo (tentar)', 'tente'),
		C('"Cansei de engolir sapo" means', 'I am tired of putting up with it in silence', ['I am tired of eating badly', 'I am tired of telling lies', 'I am tired of waiting']),
		C('"A despeito de" means', 'in spite of', ['with respect to', 'because of', 'on behalf of'])
	] }
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
