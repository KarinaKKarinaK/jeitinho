// Extra explanation, examples and practice for each lesson, added around the lesson's own steps.
import { I, C, T } from '../kit.js';

export const MORE_STEPS = {
	'sons-1': {
		start: [
			I('The big picture: spelling is not sound',
				'Brazilian Portuguese is not read the way it looks to English eyes. A few letters change sound depending on where they sit in the word: an o or e at the end, t and d before an "ee" sound, r at the start, l at the end. English does the same thing with its own odd spellings, so this is familiar ground. The good news is that the rules are regular. Learn the handful in this lesson and you can read a menu, a street sign or a name out loud and be understood. You need this from your very first "good morning".<br><br><b>Bom dia, tudo bem?</b><br>Good morning, how are you?<br><b>Boa noite, obrigada.</b><br>Good night, thank you.<br><b>O Rio é legal.</b><br>Rio is cool.',
				'Bom dia, tudo bem? Boa noite, obrigada. O Rio é legal.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: saying "LAY-tay"<br>Right: <b>leite</b> = LAY-chee<br>Why: te at the end of a word sounds like "chee".<br><br>2. Wrong: saying "REE-oh" with an English r<br>Right: <b>Rio</b> = HEE-oo<br>Why: r at the start of a word is an h, and the final o is "oo".<br><br>3. Wrong: saying "brah-ZEEL" with a hard l<br>Right: <b>Brasil</b> = brah-ZEE-oo<br>Why: l at the end of a syllable turns into a w sound.',
				'leite. Rio. Brasil.'),
			I('In real life: at the bakery',
				'<b>Bom dia! Tudo bem?</b><br><i>Good morning! How are you?</i><br><b>Tudo bem, obrigada.</b><br><i>All good, thank you.</i><br><b>Um pão e um leite, por favor.</b><br><i>One bread roll and one milk, please.</i><br><b>Mais alguma coisa?</b><br><i>Anything else?</i><br><b>Não, só isso. Obrigada!</b><br><i>No, just that. Thank you!</i><br><b>De nada. Até amanhã!</b><br><i>You are welcome. See you tomorrow!</i>',
				'Bom dia! Tudo bem? Tudo bem, obrigada. Um pão e um leite, por favor. Mais alguma coisa? Não, só isso. Obrigada! De nada. Até amanhã!'),
			C('In the dialogue, how does "de nada" sound?', 'jee NAH-dah', ['day NAH-dah', 'deh NAH-dah', 'dee NAH-thah'], 'The e in "de" is said "ee", so the d goes soft: "jee".'),
			C('The customer asks for "um pão". How is "pão" said?', 'in the nose, close to "pown"', ['like "pow"', 'like "pah-oh"', 'like "pan"'], 'ão is nasal. Without the nose it becomes "pau", a stick.'),
			I('Remember',
				'• Final o = "oo", final e = "ee": <b>obrigado</b>, <b>leite</b>.<br>• t and d go soft before "ee": <b>tia</b> is CHEE-ah, <b>dia</b> is JEE-ah.<br>• r at the start = h, l at the end = w: <b>Rio</b>, <b>Brasil</b>.<br><br>Memory trick: <b>leite</b> ends the way "cheese" begins. Milk and cheese, same sound.',
				'obrigado. leite. tia. dia. Rio. Brasil.')
		]
	},

	'sons-2': {
		start: [
			I('The big picture: it looks like Spanish, it does not sound like it',
				'On paper, Portuguese and Spanish are cousins. Out loud, they are far apart. Portuguese has more vowel sounds, a buzzing z where Spanish has s, and a soft "zh" like the s in the English word "measure". English speakers already own most of these sounds, so you have an advantage here. If you ever studied Spanish, this lesson shows you where your habits will give you away, and how to turn Spanish words you know into Portuguese ones. You need it every time you read a word that looks familiar.<br><br><b>A casa é bonita.</b><br>The house is pretty.<br><b>Minha avó mora na cidade.</b><br>My grandma lives in the city.<br><b>O peixe está bom.</b><br>The fish is good.',
				'A casa é bonita. Minha avó mora na cidade. O peixe está bom.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: saying "KAH-sah"<br>Right: <b>casa</b> = KAH-zah<br>Why: one s between two vowels is always a z sound.<br><br>2. Wrong: saying "HEN-teh", the Spanish way<br>Right: <b>gente</b> = ZHEN-chee<br>Why: g before e or i is "zh", and the final te is "chee".<br><br>3. Wrong: writing <i>información</i><br>Right: <b>informação</b><br>Why: Spanish -ción is always -ção in Portuguese, with a nasal ending.',
				'casa. gente. informação.'),
			I('In real life: a family Sunday',
				'<b>Hoje a gente vai visitar minha avó.</b><br><i>Today we are going to visit my grandma.</i><br><b>Ela mora em uma cidade pequena.</b><br><i>She lives in a small town.</i><br><b>Na mesa tem peixe e uma xícara de café.</b><br><i>On the table there is fish and a cup of coffee.</i><br><b>Meu avô lê o jornal todo dia.</b><br><i>My grandpa reads the paper every day.</i><br><b>É uma tradição da família.</b><br><i>It is a family tradition.</i>',
				'Hoje a gente vai visitar minha avó. Ela mora em uma cidade pequena. Na mesa tem peixe e uma xícara de café. Meu avô lê o jornal todo dia. É uma tradição da família.'),
			C('In the text, "mesa" sounds like', 'MEH-zah', ['MEH-sah', 'MAY-shah', 'MEE-tsah'], 's between vowels = z.'),
			T('Spanish "tradición" in Portuguese', 'tradição', '-ción becomes -ção.'),
			I('Remember',
				'• ´ opens the vowel, ^ closes it: <b>avó</b> is grandma, <b>avô</b> is grandpa.<br>• s between vowels = z, and j or soft g = "zh": <b>mesa</b>, <b>hoje</b>.<br>• Swap the endings: -ción to -ção, -dad to -dade, -ble to -vel.<br><br>Memory trick: the accent on <b>avô</b> looks like a little hat. Grandpa wears the hat.',
				'avó. avô. mesa. hoje.')
		]
	},

	'base-1': {
		start: [
			I('The big picture: two verb forms do almost all the work',
				'English verbs barely change: I speak, you speak, we speak. Most Romance languages make you learn five or six forms. Brazilian Portuguese sits in between, and daily speech leans toward the easy side. "You" is você, which shares its verb form with he and she. "We" is usually a gente, which uses that same form again. So two forms, eu and você, let you talk about almost anyone. This lesson also gives you "to be" in its two flavours and the small glued words like no and da. You will use all of this in your first real conversation.<br><br><b>Eu sou do Canadá e você é do Brasil.</b><br>I am from Canada and you are from Brazil.<br><b>A gente tá em casa.</b><br>We are at home.<br><b>Eu gosto da praia.</b><br>I like the beach.',
				'Eu sou do Canadá e você é do Brasil. A gente tá em casa. Eu gosto da praia.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>A gente vamos</i><br>Right: <b>A gente vai.</b><br>Why: a gente means "we" but takes the você form of the verb.<br><br>2. Wrong: <i>Estou em o Brasil</i><br>Right: <b>Estou no Brasil.</b><br>Why: em + o must melt into no. The two words never stand apart.<br><br>3. Wrong: <i>Eu gosto a cidade</i><br>Right: <b>Eu gosto da cidade.</b><br>Why: gostar always needs de, and de + a becomes da.',
				'A gente vai. Estou no Brasil. Eu gosto da cidade.'),
			I('In real life: meeting someone',
				'<b>Oi! Tudo bem?</b><br><i>Hi! How are you?</i><br><b>Tudo, e você?</b><br><i>Good, and you?</i><br><b>Tô cansada, mas tô feliz. Você é daqui?</b><br><i>I am tired, but I am happy. Are you from here?</i><br><b>Não, sou do Canadá. E você?</b><br><i>No, I am from Canada. And you?</i><br><b>Sou daqui, de BH. Você gosta da cidade?</b><br><i>I am from here, from BH. Do you like the city?</i><br><b>Gosto muito! A gente é feliz aqui.</b><br><i>I like it a lot! We are happy here.</i>',
				'Oi! Tudo bem? Tudo, e você? Tô cansada, mas tô feliz. Você é daqui? Não, sou do Canadá. E você? Sou daqui, de BH. Você gosta da cidade? Gosto muito! A gente é feliz aqui.'),
			C('"A gente é feliz aqui" means', 'We are happy here', ['People are happy here', 'They are happy here', 'You are happy here'], 'a gente = we, with the você form: é.'),
			T('I am from Brazil (ser + de + o Brasil)', 'sou do brasil', 'de + o = do.', ['eu sou do brasil']),
			I('Remember',
				'• Learn two forms per verb: eu and você. Ele, ela and a gente all share the você form.<br>• <b>sou</b> and <b>é</b> say what you are. <b>tô</b> and <b>tá</b> say how or where you are right now.<br>• em and de melt into the next word: <b>no</b>, <b>na</b>, <b>do</b>, <b>da</b>.<br><br>Memory trick: a gente is literally "the people", and "the people" is one group. One group, singular verb: <b>a gente vai</b>.',
				'sou. é. tô. tá. no. na. do. da. a gente vai.')
		]
	},

	'pres-1': {
		start: [
			I('The big picture: three tools for now and soon',
				'English has "I work", "I am working" and "I am going to work". Portuguese has the same three ideas, and this lesson gives you all of them. The simple present is for habits and facts. Estar plus a verb ending in -ndo is for what is happening right now. Ir plus an infinitive is the everyday future, and Brazilians use it far more than the formal future tense. The main difference from English is that the verb ending tells you who is doing it, so you must learn the eu and você endings. With these three tools you can talk about your job, your day and your plans.<br><br><b>Eu moro em BH e trabalho no centro.</b><br>I live in BH and work downtown.<br><b>Tô aprendendo português.</b><br>I am learning Portuguese.<br><b>Amanhã eu vou viajar.</b><br>Tomorrow I am going to travel.',
				'Eu moro em BH e trabalho no centro. Tô aprendendo português. Amanhã eu vou viajar.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Eu fazo o café</i><br>Right: <b>Eu faço o café.</b><br>Why: fazer is irregular in the eu form. Same for <b>posso</b>, <b>tenho</b> and <b>sei</b>.<br><br>2. Wrong: <i>Vou a viajar</i><br>Right: <b>Vou viajar.</b><br>Why: ir goes straight into the infinitive. Nothing sits in between.<br><br>3. Wrong: <i>Tô aprender português</i><br>Right: <b>Tô aprendendo português.</b><br>Why: after estar, the verb needs the -ndo ending, like English -ing.',
				'Eu faço o café. Vou viajar. Tô aprendendo português.'),
			I('In real life: small talk',
				'<b>O que você faz?</b><br><i>What do you do?</i><br><b>Eu trabalho em um hospital. E você?</b><br><i>I work in a hospital. And you?</i><br><b>Eu tô estudando português. Quero morar aqui.</b><br><i>I am studying Portuguese. I want to live here.</i><br><b>Que legal! Você pode sair hoje?</b><br><i>How cool! Can you go out today?</i><br><b>Hoje não posso. Amanhã eu vou viajar.</b><br><i>Today I cannot. Tomorrow I am going to travel.</i><br><b>Então a gente sai no sábado!</b><br><i>Then we go out on Saturday!</i>',
				'O que você faz? Eu trabalho em um hospital. E você? Eu tô estudando português. Quero morar aqui. Que legal! Você pode sair hoje? Hoje não posso. Amanhã eu vou viajar. Então a gente sai no sábado!'),
			C('"Hoje não posso" means', 'I cannot today', ['I do not want to today', 'I am not here today', 'I do not know today'], 'posso is the eu form of poder, can.'),
			T('I am going to work tomorrow', 'vou trabalhar amanhã', 'ir + infinitive, with nothing in between.', ['eu vou trabalhar amanhã', 'amanhã vou trabalhar', 'amanhã eu vou trabalhar']),
			I('Remember',
				'• In the present, eu ends in -o: <b>falo</b>, <b>como</b>, <b>abro</b>. Você ends in -a or -e: <b>fala</b>, <b>come</b>, <b>abre</b>.<br>• Happening now: <b>tô</b> + -ndo. Happening soon: <b>vou</b> + infinitive.<br>• The most used verbs are irregular in the eu form: <b>sou</b>, <b>tenho</b>, <b>vou</b>, <b>faço</b>, <b>posso</b>, <b>sei</b>.<br><br>Memory trick: <b>vou</b> + verb works like English "gonna". Two pieces, nothing between them.',
				'falo. como. abro. fala. come. abre. sou. tenho. vou. faço. posso. sei.')
		]
	},

	'perf-1': {
		start: [
			I('The big picture: saying what happened',
				'This tense is for finished actions: I ate, you called, she opened the door. English adds -ed and uses the same form for everyone. Portuguese changes the ending for each person, and the two forms you need most, eu and você, sound quite different. Mix them up and you say "you arrived" when you mean "I arrived", which confuses people fast. That is why this pair gets its own lesson. You will need it the moment someone asks about your weekend, your trip or what you had for lunch. This lesson sticks to regular verbs. The irregular ones come next.<br><br><b>Ontem eu trabalhei muito.</b><br>Yesterday I worked a lot.<br><b>Você comeu bem?</b><br>Did you eat well?<br><b>Eu cheguei em casa tarde.</b><br>I got home late.',
				'Ontem eu trabalhei muito. Você comeu bem? Eu cheguei em casa tarde.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Eu falou com ela</i><br>Right: <b>Eu falei com ela.</b><br>Why: -ou belongs to você, ele and ela. Eu takes -ei.<br><br>2. Wrong: <i>Você comi?</i><br>Right: <b>Você comeu?</b><br>Why: for -er verbs, eu is the short one (comi) and você adds a u (comeu).<br><br>3. Wrong: <i>Eu chegei</i><br>Right: <b>Eu cheguei.</b><br>Why: the extra u keeps the g hard. Without it, the word would be read "sheh-ZHAY".',
				'Eu falei com ela. Você comeu? Eu cheguei.'),
			I('In real life: the day after',
				'<b>Você chegou tarde ontem?</b><br><i>Did you get home late yesterday?</i><br><b>Cheguei. Trabalhei até as nove.</b><br><i>I did. I worked until nine.</i><br><b>Nossa! E você jantou?</b><br><i>Wow! And did you have dinner?</i><br><b>Comi um pão de queijo e bebi um suco.</b><br><i>I ate a cheese bread and drank a juice.</i><br><b>Só isso? Eu cozinhei ontem e sobrou comida.</b><br><i>Only that? I cooked yesterday and there is food left over.</i><br><b>Oba, aceito!</b><br><i>Yay, I will take it!</i><br><br>Notice the answer <b>Cheguei.</b> Brazilians often say yes by repeating the verb in the eu form.',
				'Você chegou tarde ontem? Cheguei. Trabalhei até as nove. Nossa! E você jantou? Comi um pão de queijo e bebi um suco. Só isso? Eu cozinhei ontem e sobrou comida. Oba, aceito!'),
			C('Someone asks "Você jantou?" The natural way to say yes is', 'Jantei.', ['Jantou.', 'Janta.', 'Jantar.'], 'Repeat the verb in the eu form: jantei.'),
			T('Eu _____ a conta (pagar)', 'paguei', 'pagar works like chegar: gu keeps the g hard in the eu form.'),
			I('Remember',
				'• -ar verbs: eu <b>falei</b>, você <b>falou</b>.<br>• -er and -ir verbs: eu <b>comi</b>, <b>abri</b>. Você <b>comeu</b>, <b>abriu</b>.<br>• -car, -gar and -çar change spelling in the eu form only: <b>fiquei</b>, <b>cheguei</b>, <b>comecei</b>.<br><br>Memory trick: <b>falei</b> ends in "ay", like "yay, I did it". <b>falou</b> ends in "oh", like "oh, you did it".',
				'falei. falou. comi. abri. comeu. abriu. fiquei. cheguei. comecei.')
		]
	},

	'perf-2': {
		start: [
			I('The big picture: the irregular past you cannot avoid',
				'In English, the most common verbs have the strangest past forms: went, was, did, had, saw. Portuguese is the same. Ser, ir, ter, fazer, ver and vir are the verbs you use every minute, and none of them follow the regular endings from the last lesson. There is one gift: ser and ir share a single past, so fui means both "I was" and "I went". There is also a pattern in the vowels that makes the eu and você forms easier to tell apart. You need these forms for any story about yesterday, so they are worth learning by heart.<br><br><b>Ontem eu fui ao mercado e fiz o jantar.</b><br>Yesterday I went to the market and made dinner.<br><b>Você viu o jogo?</b><br>Did you see the game?<br><b>Ela teve sorte.</b><br>She was lucky.',
				'Ontem eu fui ao mercado e fiz o jantar. Você viu o jogo? Ela teve sorte.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Eu foi ao cinema</i><br>Right: <b>Eu fui ao cinema.</b><br>Why: fui is eu, foi is você, ele and ela.<br><br>2. Wrong: <i>Você fiz o bolo?</i><br>Right: <b>Você fez o bolo?</b><br>Why: eu has the i sound (fiz), você has the e sound (fez).<br><br>3. Wrong: <i>Eu vi de ônibus</i><br>Right: <b>Eu vim de ônibus.</b><br>Why: vi is "I saw" (ver). vim is "I came" (vir). One letter changes the verb.',
				'Eu fui ao cinema. Você fez o bolo? Eu vim de ônibus.'),
			I('In real life: after the party',
				'<b>Você foi à festa da Ana?</b><br><i>Did you go to Ana\'s party?</i><br><b>Fui. Foi muito boa!</b><br><i>I did. It was really good!</i><br><b>Quem fez o bolo?</b><br><i>Who made the cake?</i><br><b>Eu fiz. E o Pedro trouxe o vinho.</b><br><i>I did. And Pedro brought the wine.</i><br><b>Eu não pude ir. Tive que trabalhar.</b><br><i>I could not go. I had to work.</i><br><b>Que pena! Eu só soube disso hoje.</b><br><i>What a pity! I only found that out today.</i>',
				'Você foi à festa da Ana? Fui. Foi muito boa! Quem fez o bolo? Eu fiz. E o Pedro trouxe o vinho. Eu não pude ir. Tive que trabalhar. Que pena! Eu só soube disso hoje.'),
			C('In "Fui. Foi muito boa!", what does "foi" mean?', 'it was', ['she went', 'I went', 'it did'], 'ser and ir share the same past. Here foi is ser: the party was good.'),
			T('Eu não _____ ir à festa (poder)', 'pude', 'eu pude, você pôde.'),
			I('Remember',
				'• <b>fui</b> and <b>foi</b> cover both "went" and "was". The context tells you which.<br>• Eu takes i or u, você takes e or o: <b>fiz</b> and <b>fez</b>, <b>tive</b> and <b>teve</b>, <b>pude</b> and <b>pôde</b>.<br>• <b>vim</b> is "I came", <b>vi</b> is "I saw". Você: <b>veio</b> and <b>viu</b>.<br><br>Memory trick: eu loves the letter i. <b>fui</b>, <b>fiz</b>, <b>tive</b>, <b>vim</b>, <b>vi</b>. If you hear an i, it is probably "I".',
				'fui. foi. fiz. fez. tive. teve. pude. pôde. vim. vi. veio. viu.')
		]
	},

	'imp-1': {
		start: [
			I('The big picture: the past as a background',
				'Portuguese has two simple past tenses, and they do different jobs. The perfeito from the last two lessons is for events: things that happened and ended. The imperfeito is for the background: how things used to be, what was going on, what you did again and again. English does this with "used to", "was doing" and sometimes "would", as in "we would play outside every day". You need the imperfeito to talk about your childhood, to describe a scene, and to set up any story before the action starts. The forms are easy. The real skill is choosing between the two tenses.<br><br><b>Quando eu era criança, eu morava em uma cidade pequena.</b><br>When I was a kid, I lived in a small town.<br><b>Eu tava em casa quando você ligou.</b><br>I was at home when you called.<br><b>A gente sempre comia junto.</b><br>We always ate together.',
				'Quando eu era criança, eu morava em uma cidade pequena. Eu tava em casa quando você ligou. A gente sempre comia junto.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Quando eu fui criança</i><br>Right: <b>Quando eu era criança.</b><br>Why: childhood is a long background period, not one event.<br><br>2. Wrong: <i>Ontem eu ia ao cinema</i> (for one trip)<br>Right: <b>Ontem eu fui ao cinema.</b><br>Why: one finished event takes the perfeito.<br><br>3. Wrong: <i>Eu tenia um cachorro</i><br>Right: <b>Eu tinha um cachorro.</b><br>Why: ter is one of the four irregular verbs here. Tenia is the Spanish habit.',
				'Quando eu era criança. Ontem eu fui ao cinema. Eu tinha um cachorro.'),
			I('In real life: a childhood memory',
				'<b>Quando eu era criança, eu morava no interior.</b><br><i>When I was a kid, I lived in the countryside.</i><br><b>A gente tinha um cachorro e brincava na rua todo dia.</b><br><i>We had a dog and played in the street every day.</i><br><b>Minha avó fazia pão de queijo aos domingos.</b><br><i>My grandma used to make cheese bread on Sundays.</i><br><b>Um dia, eu tava na cozinha e o cachorro comeu tudo.</b><br><i>One day, I was in the kitchen and the dog ate everything.</i><br><b>Minha avó riu muito.</b><br><i>My grandma laughed a lot.</i>',
				'Quando eu era criança, eu morava no interior. A gente tinha um cachorro e brincava na rua todo dia. Minha avó fazia pão de queijo aos domingos. Um dia, eu tava na cozinha e o cachorro comeu tudo. Minha avó riu muito.'),
			C('Why is it "o cachorro comeu tudo" and not "comia"?', 'It is one finished event', ['It is a habit', 'It is background description', 'It is still happening'], 'The dog ate everything once, on that day. Event = perfeito.'),
			T('A gente _____ na rua todo dia (brincar)', 'brincava', 'A repeated habit in the past = imperfeito.'),
			I('Remember',
				'• Endings: -ar gives -ava, -er and -ir give -ia. Eu and você are the same.<br>• Use it for habits, descriptions and what was going on: <b>eu morava</b>, <b>eu tava</b>, <b>eu era</b>.<br>• Only four irregulars: <b>era</b>, <b>tinha</b>, <b>vinha</b>, <b>punha</b>.<br><br>Memory trick: think of a film. The imperfeito is the set and the weather. The perfeito is what the actors do. First the set, then the action.',
				'eu morava. eu tava. eu era. era. tinha. vinha. punha.')
		]
	},

	'subj-1': {
		start: [
			I('The big picture: a mood for things that are not facts',
				'So far every verb has stated a fact. The subjunctive is for things that are not facts yet: wishes, doubts, what-ifs and future moments that may or may not come. English has only traces of it, as in "if I were you" or "I suggest he go". Portuguese uses it all day, in three versions: present, imperfect and future. This lesson is a first tour of all three, each with one simple recipe. Later lessons go deeper into each one. You need it as soon as you want to hope, invite, imagine or plan out loud.<br><br><b>Espero que você goste da comida.</b><br>I hope you like the food.<br><b>Se eu tivesse tempo, viajaria mais.</b><br>If I had time, I would travel more.<br><b>Se você quiser, eu te ajudo.</b><br>If you want, I will help you.',
				'Espero que você goste da comida. Se eu tivesse tempo, viajaria mais. Se você quiser, eu te ajudo.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Espero que você gosta</i><br>Right: <b>Espero que você goste.</b><br>Why: a wish with que needs the present subjunctive.<br><br>2. Wrong: <i>Se eu teria dinheiro, viajaria</i><br>Right: <b>Se eu tivesse dinheiro, viajaria.</b><br>Why: the -ria form never comes right after se. The unreal if takes -sse.<br><br>3. Wrong: <i>Quando eu vou ao Brasil, vou te visitar</i><br>Right: <b>Quando eu for ao Brasil, vou te visitar.</b><br>Why: quando pointing at the future takes the future subjunctive.',
				'Espero que você goste. Se eu tivesse dinheiro, viajaria. Quando eu for ao Brasil, vou te visitar.'),
			I('In real life: weekend plans',
				'<b>Tomara que faça sol no sábado.</b><br><i>I hope it is sunny on Saturday.</i><br><b>Tomara! Se fizer sol, a gente vai à praia?</b><br><i>Fingers crossed! If it is sunny, shall we go to the beach?</i><br><b>Vamos! Quero que você conheça meus amigos.</b><br><i>Yes! I want you to meet my friends.</i><br><b>E se chover?</b><br><i>And if it rains?</i><br><b>Aí a gente fica em casa. Quando eu souber a previsão, te aviso.</b><br><i>Then we stay home. When I know the forecast, I will tell you.</i>',
				'Tomara que faça sol no sábado. Tomara! Se fizer sol, a gente vai à praia? Vamos! Quero que você conheça meus amigos. E se chover? Aí a gente fica em casa. Quando eu souber a previsão, te aviso.'),
			C('"Se fizer sol" uses which form of fazer?', 'future subjunctive', ['present subjunctive', 'imperfect subjunctive', 'plain infinitive'], 'A real possibility in the future: fizeram minus -am = fizer.'),
			T('Quero que você _____ meus amigos (conhecer)', 'conheça', 'conheço, drop the o, add a: conheça.'),
			I('Remember',
				'• Wish or doubt about now: que, talvez, tomara + present subjunctive. <b>Espero que você goste.</b><br>• Unreal if: se + -sse, then -ria. <b>Se eu fosse você, eu iria.</b><br>• Real future: quando or se + future subjunctive. <b>Quando eu puder, eu vou.</b><br><br>Memory trick: three clocks. Que is a wish for now, -sse is a daydream, quando is a date that has not come yet.',
				'Espero que você goste. Se eu fosse você, eu iria. Quando eu puder, eu vou.')
		]
	},

	'es-1': {
		start: [
			I('The big picture: words that lie to you',
				'A false friend is a word that looks like one you know and means something else. English speakers meet them too: esquisito looks like "exquisite", and a Spanish speaker reads embaraçada as "pregnant". The more Spanish you know, the bigger the risk, because so much really is the same that you start to trust every lookalike. Most slips are harmless and funny. A few are not, like offering a waiter a bribe when you meant a tip. This lesson collects the ones that come up in shops, restaurants and offices, plus one grammar trick that Spanish does not have.<br><br><b>Que comida esquisita!</b><br>What weird food!<br><b>Meu apelido é Gabi.</b><br>My nickname is Gabi.<br><b>Vou pegar o ônibus.</b><br>I am going to catch the bus.',
				'Que comida esquisita! Meu apelido é Gabi. Vou pegar o ônibus.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Estou embaraçada</i> (to say you are pregnant)<br>Right: <b>Estou grávida.</b><br>Why: embaraçada means embarrassed or tangled.<br><br>2. Wrong: <i>Trabalho em uma oficina</i> (to say you work in an office)<br>Right: <b>Trabalho em um escritório.</b><br>Why: an oficina is where they fix your car.<br><br>3. Wrong: <i>Deixei uma propina</i> (to say you left a tip)<br>Right: <b>Deixei uma gorjeta.</b><br>Why: propina is a bribe. The waiter will be confused.',
				'Estou grávida. Trabalho em um escritório. Deixei uma gorjeta.'),
			I('In real life: a normal day',
				'<b>Meu sobrenome é Oliveira, mas meu apelido é Lili.</b><br><i>My surname is Oliveira, but my nickname is Lili.</i><br><b>Eu trabalho em um escritório perto de uma oficina de carros.</b><br><i>I work in an office near a car repair shop.</i><br><b>Todo dia eu pego o ônibus em uma avenida bem larga.</b><br><i>Every day I catch the bus on a very wide avenue.</i><br><b>Hoje no almoço eu pedi polvo e achei esquisito.</b><br><i>Today at lunch I ordered octopus and found it weird.</i><br><b>Mas deixei uma gorjeta para o garçom.</b><br><i>But I left a tip for the waiter.</i>',
				'Meu sobrenome é Oliveira, mas meu apelido é Lili. Eu trabalho em um escritório perto de uma oficina de carros. Todo dia eu pego o ônibus em uma avenida bem larga. Hoje no almoço eu pedi polvo e achei esquisito. Mas deixei uma gorjeta para o garçom.'),
			C('In the text, "Lili" is her', 'nickname', ['surname', 'job title', 'street'], 'apelido = nickname. Surname is sobrenome.'),
			C('Where does she work?', 'In an office, near a car repair shop', ['In a car repair shop, near an office', 'In a restaurant on a long avenue', 'In a factory, near a bus stop'], 'escritório = office, oficina = repair shop.'),
			I('Remember',
				'• If a word looks Spanish or English, check it once before you trust it.<br>• The risky ones: <b>propina</b> is a bribe, <b>embaraçada</b> is embarrassed, <b>esquisito</b> is weird.<br>• Portuguese can give an infinitive a subject: <b>É importante vocês chegarem cedo.</b><br><br>Memory trick: <b>polvo</b> has eight legs and <b>pó</b> has two letters. The tiny word is the dust.',
				'propina. embaraçada. esquisito. É importante vocês chegarem cedo. polvo. pó.')
		]
	},

	'bh-1': {
		start: [
			I('The big picture: the accent of Minas',
				'Every big language has regional speech. English has "y\'all" in the American South and "wee" in Scotland. Brazil has mineirês, the speech of Minas Gerais, and Brazilians find it charming. It is not a separate language. It is everyday Portuguese with a few signature words, shortened forms and a relaxed rhythm. You will not see it in a textbook or a newspaper, but you will hear it in every bakery, bus and bar in Belo Horizonte. Knowing a few of these words helps you understand people, and using one at the right moment earns you a big smile.<br><br><b>Nó, que trem bão!</b><br>Wow, what a great thing!<br><b>Cê é de BH, uai?</b><br>So you are from BH?<br><b>Esse café tá bão demais da conta.</b><br>This coffee is insanely good.',
				'Nó, que trem bão! Cê é de BH, uai? Esse café tá bão demais da conta.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Uai?</i> (to ask "why?")<br>Right: <b>Por quê?</b><br>Why: uai only sounds like "why". It is an exclamation, never a question word.<br><br>2. Wrong: <i>Ela tá bão</i><br>Right: <b>Ela tá boa.</b><br>Why: bão replaces bom, the masculine form. The feminine stays boa.<br><br>3. Wrong: <i>Cê tá bão?</i> (to a client or in an email)<br>Right: <b>O senhor está bem?</b><br>Why: mineirês is for relaxed speech. In formal moments, use standard Portuguese.',
				'Por quê? Ela tá boa. O senhor está bem?'),
			I('In real life: running into a friend',
				'<b>Uai, cê por aqui?</b><br><i>Hey, you around here?</i><br><b>Nó, quanto tempo! Cê tá bão?</b><br><i>Wow, long time! You good?</i><br><b>Tô bão demais. E esse trem aí, o que é?</b><br><i>I am great. And that thing there, what is it?</i><br><b>É doce de leite. Prova, sô!</b><br><i>It is doce de leite. Try it, man!</i><br><b>Nossa, bão demais da conta!</b><br><i>Wow, insanely good!</i>',
				'Uai, cê por aqui? Nó, quanto tempo! Cê tá bão? Tô bão demais. E esse trem aí, o que é? É doce de leite. Prova, sô! Nossa, bão demais da conta!'),
			C('"E esse trem aí, o que é?" asks about', 'that thing over there', ['the train timetable', 'the way to the station', 'the bill'], 'trem = thing, any thing.'),
			T('Essa comida tá _____ (the feminine of bão)', 'boa', 'bão is only for masculine words. Comida is feminine: boa.'),
			I('Remember',
				'• <b>uai</b> is surprise or emphasis. <b>trem</b> is any thing. <b>cê</b> is você.<br>• <b>bão</b> is bom, and <b>demais da conta</b> turns the praise all the way up.<br>• <b>Nó!</b> and <b>Nossa!</b> mean wow. <b>sô</b> is a friendly "man".<br><br>Memory trick: <b>uai</b> sounds like "why", but it never waits for an answer. It is a sound of surprise, like "huh!".',
				'uai. trem. cê. bão. demais da conta. Nó! Nossa! sô.')
		]
	},

	'bh-2': {
		start: [
			I('The big picture: fast speech and local words',
				'In relaxed English, "going to" becomes "gonna" and "do you want to" becomes "d\'you wanna". Mineiros do the same, only more. Endings drop, small words melt together, and -inho shrinks to -im. On top of that, BH has its own vocabulary for moving over, looking for things and going out for a beer. This lesson is mostly about your ears. You do not have to speak this way, but if you spend time in Minas you will hear it at every boteco table, and it stops sounding like one long word once you know the pieces.<br><br><b>Quer um cafezim?</b><br>Want a little coffee?<br><b>Tô caçando um boteco bão.</b><br>I am looking for a good bar.<br><b>Bora comer um pão de queijo?</b><br>Shall we go eat a cheese bread?',
				'Quer um cafezim? Tô caçando um boteco bão. Bora comer um pão de queijo?')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Esse celular é custoso</i> (to say it costs a lot)<br>Right: <b>Esse celular é caro.</b><br>Why: custoso means hard work or difficult. Pricey is caro.<br><br>2. Wrong: <i>Só um tiquim café</i><br>Right: <b>Só um tiquim de café.</b><br>Why: a bit "of" something needs de, the same as um pouco de.<br><br>3. Wrong: <i>Oncotô?</i> (in an email or a form)<br>Right: <b>Onde eu estou?</b><br>Why: the glued forms belong to speech and jokes. Nobody writes them seriously.',
				'Esse celular é caro. Só um tiquim de café. Onde eu estou?'),
			I('In real life: heading to the boteco',
				'<b>Bora tomar uma no boteco?</b><br><i>Shall we grab a beer at the bar?</i><br><b>Bora! Mas tô caçando minha carteira.</b><br><i>Let\'s go! But I am looking for my wallet.</i><br><b>Tá aí no seu bolso, uai.</b><br><i>It is right there in your pocket.</i><br><b>Nó, é mesmo! Esse dia tá custoso.</b><br><i>Wow, so it is! This day is hard work.</i><br><b>Calma, sô. Só um tiquim de paciência.</b><br><i>Relax, man. Just a tiny bit of patience.</i>',
				'Bora tomar uma no boteco? Bora! Mas tô caçando minha carteira. Tá aí no seu bolso, uai. Nó, é mesmo! Esse dia tá custoso. Calma, sô. Só um tiquim de paciência.'),
			C('"Esse dia tá custoso" means the day is', 'hard work', ['expensive', 'too long', 'boring'], 'custoso = difficult, a struggle. Not about money.'),
			T('Só um tiquim _____ paciência (a tiny bit of patience)', 'de', 'um tiquim de, like um pouco de.'),
			I('Remember',
				'• Mineiros glue and cut: <b>Oncotô?</b> is "Onde que eu tô?".<br>• -inho becomes -im: <b>tiquim</b>, <b>cafezim</b>, <b>bunitim</b>.<br>• Local words: <b>arreda</b> is move over, <b>caçar</b> is to look for, <b>custoso</b> is hard work, <b>bora</b> is let\'s go.<br><br>Memory trick: chop the tail. Take -inho, cut off the end, and you get -im. <b>cafezinho</b> becomes <b>cafezim</b>.',
				'Oncotô? tiquim. cafezim. bunitim. arreda. caçar. custoso. bora. cafezinho. cafezim.')
		]
	},

	'subj-2': {
		start: [
			I('The big picture: words that switch the verb',
				'In English you say "I hope you get home safe" and the verb "get" stays the same as always. In Portuguese, the word "hope" flips a switch, and the next verb changes its vowel. That changed form is the present subjunctive. The useful way to think about it is as a list of trigger words. When you say espero que, tomara que, talvez or embora, the subjunctive follows automatically. You need it for the kindest things people say to each other: good wishes, invitations, polite requests and careful opinions. Brazilians use it constantly, even in very casual speech.<br><br><b>Espero que você chegue bem.</b><br>I hope you get there safe.<br><b>Talvez a gente viaje em dezembro.</b><br>Maybe we will travel in December.<br><b>Embora eu goste de praia, prefiro montanha.</b><br>Although I like the beach, I prefer the mountains.',
				'Espero que você chegue bem. Talvez a gente viaje em dezembro. Embora eu goste de praia, prefiro montanha.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Talvez ele vem</i><br>Right: <b>Talvez ele venha.</b><br>Why: talvez before the verb is a trigger. Doubt takes the subjunctive.<br><br>2. Wrong: <i>Embora é caro</i><br>Right: <b>Embora seja caro.</b><br>Why: embora always takes the subjunctive, even when the thing is true.<br><br>3. Wrong: <i>Acho que ele venha</i><br>Right: <b>Acho que ele vem.</b><br>Why: acho que states what you believe, so it is not a trigger. Not every que switches the verb.',
				'Talvez ele venha. Embora seja caro. Acho que ele vem.'),
			I('In real life: before a job interview',
				'<b>Tomara que a entrevista dê certo amanhã.</b><br><i>I hope the interview goes well tomorrow.</i><br><b>Obrigada! Talvez eu fique nervosa.</b><br><i>Thank you! Maybe I will get nervous.</i><br><b>Duvido que você fique. Você tá preparada.</b><br><i>I doubt you will. You are prepared.</i><br><b>Espero que eles gostem de mim.</b><br><i>I hope they like me.</i><br><b>Vão gostar. Quero que você me conte tudo depois.</b><br><i>They will. I want you to tell me everything afterwards.</i>',
				'Tomara que a entrevista dê certo amanhã. Obrigada! Talvez eu fique nervosa. Duvido que você fique. Você tá preparada. Espero que eles gostem de mim. Vão gostar. Quero que você me conte tudo depois.'),
			T('Duvido que você _____ nervosa (ficar)', 'fique', 'fico gives fique. The qu keeps the k sound.'),
			C('Which is right?', 'Acho que ela vem', ['Acho que ela venha', 'Talvez ela vem', 'Espero que ela vem'], 'acho que is belief, so normal verb. Talvez and espero que need venha.'),
			I('Remember',
				'• The trigger decides. Wish, doubt and embora switch the next verb: <b>Tomara que dê certo.</b><br>• Form: eu form, drop the o, swap the vowel. <b>falo</b> gives <b>fale</b>, <b>tenho</b> gives <b>tenha</b>.<br>• Belief is not a trigger: <b>Acho que ele vem.</b><br><br>Memory trick: the subjunctive wears the other team\'s shirt. -ar verbs take e, and -er and -ir verbs take a.',
				'Tomara que dê certo. falo. fale. tenho. tenha. Acho que ele vem.')
		]
	},

	'subj-3': {
		start: [
			I('The big picture: imagining a different world',
				'English says "if I had time" and "if I were you". The verbs look past, but the meaning is not past at all. It is unreal: you do not have time, and you are not that person. Portuguese has a special form for this, the imperfect subjunctive, which ends in -sse. You pair it with a second verb that says what would happen. You need it to give advice, to daydream, to make a polite request softer, and to talk about wishes that depend on someone else. It sounds advanced, but people use it in everyday chat all the time.<br><br><b>Se eu morasse no Rio, ia à praia todo dia.</b><br>If I lived in Rio, I would go to the beach every day.<br><b>Se você pudesse, você viria?</b><br>If you could, would you come?<br><b>Eu queria que fizesse sol.</b><br>I wish it were sunny.',
				'Se eu morasse no Rio, ia à praia todo dia. Se você pudesse, você viria? Eu queria que fizesse sol.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Se eu teria tempo, eu viajaria</i><br>Right: <b>Se eu tivesse tempo, eu viajaria.</b><br>Why: the -ria form goes in the result, never right after se.<br><br>2. Wrong: <i>Eu queria que você vem</i><br>Right: <b>Eu queria que você viesse.</b><br>Why: a wish in the past or polite form pulls the next verb into -sse.<br><br>3. Wrong: <i>Se eu fosse você, eu vou</i><br>Right: <b>Se eu fosse você, eu ia.</b><br>Why: an unreal if needs an unreal result: iria, or ia in speech. Not the present.',
				'Se eu tivesse tempo, eu viajaria. Eu queria que você viesse. Se eu fosse você, eu ia.'),
			I('In real life: daydreaming',
				'<b>Se você ganhasse na loteria, o que você faria?</b><br><i>If you won the lottery, what would you do?</i><br><b>Eu comprava uma casa na praia. E você?</b><br><i>I would buy a house at the beach. And you?</i><br><b>Se eu pudesse, viajava pelo mundo inteiro.</b><br><i>If I could, I would travel the whole world.</i><br><b>Eu queria que a gente fosse junto.</b><br><i>I would love for us to go together.</i><br><b>Se eu fosse rica, pagava tudo!</b><br><i>If I were rich, I would pay for everything!</i><br><br>Notice <b>comprava</b>, <b>viajava</b> and <b>pagava</b>. In speech, the imperfeito often replaces the -ria form.',
				'Se você ganhasse na loteria, o que você faria? Eu comprava uma casa na praia. E você? Se eu pudesse, viajava pelo mundo inteiro. Eu queria que a gente fosse junto. Se eu fosse rica, pagava tudo!'),
			T('Se eu _____ na loteria, comprava uma casa (ganhar)', 'ganhasse', 'ganharam, drop -ram, add -sse.'),
			C('"Eu queria que a gente fosse junto" means', 'I would love for us to go together', ['I know that we went together', 'I asked if we went together', 'I am glad we went together'], 'queria que + -sse is a wish. fosse here is ir.'),
			I('Remember',
				'• Unreal if: se + -sse, then -ria or the spoken -va and -ia. <b>Se eu pudesse, eu ajudaria.</b><br>• Form: the eles past, minus -ram, plus -sse. <b>tiveram</b> gives <b>tivesse</b>.<br>• Past or polite wishes use it too: <b>Queria que você viesse.</b><br><br>Memory trick: -sse sounds like a sigh. "Ah, se eu pudesse..." Sighs are for things that are not real.',
				'Se eu pudesse, eu ajudaria. tiveram. tivesse. Queria que você viesse.')
		]
	},

	'subj-4': {
		start: [
			I('The big picture: a tense for "when it happens"',
				'In English you say "when I arrive, I will call you". The verb "arrive" is in the present, although the arriving has not happened yet. Portuguese does not allow that. After quando, se and a few similar words, a future moment needs its own form: the future subjunctive. Spanish lost this tense and French never had it, so no other language you know will help. But it is everywhere in Brazilian speech, in plans, promises, invitations and instructions. Regular verbs make it easy, because the form looks like the infinitive. The irregular ones are the real work of this lesson.<br><br><b>Se você puder, passa aqui em casa.</b><br>If you can, stop by my place.<br><b>Quando eu for ao Brasil, vou comer pão de queijo todo dia.</b><br>When I go to Brazil, I will eat cheese bread every day.<br><b>Assim que eu chegar, te mando mensagem.</b><br>As soon as I arrive, I will text you.',
				'Se você puder, passa aqui em casa. Quando eu for ao Brasil, vou comer pão de queijo todo dia. Assim que eu chegar, te mando mensagem.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Se eu poder, eu vou</i><br>Right: <b>Se eu puder, eu vou.</b><br>Why: irregular verbs build this tense from the past form (puderam), not from the infinitive.<br><br>2. Wrong: <i>Quando eu chegue, te ligo</i><br>Right: <b>Quando eu chegar, te ligo.</b><br>Why: that is the Spanish habit. After quando for the future, Portuguese wants the future subjunctive.<br><br>3. Wrong: <i>Se ele vir amanhã, a gente sai</i> (to say "if he comes")<br>Right: <b>Se ele vier amanhã, a gente sai.</b><br>Why: vier is from vir, to come. Vir here would mean "if he sees".',
				'Se eu puder, eu vou. Quando eu chegar, te ligo. Se ele vier amanhã, a gente sai.'),
			I('In real life: planning a visit',
				'<b>Quando você vier a BH, me avisa.</b><br><i>When you come to BH, let me know.</i><br><b>Aviso sim! Se der, eu vou em julho.</b><br><i>I will! If it works out, I will go in July.</i><br><b>Fica aqui em casa o tempo que você quiser.</b><br><i>Stay at my place as long as you want.</i><br><b>Obrigada! Assim que eu comprar a passagem, te falo.</b><br><i>Thank you! As soon as I buy the ticket, I will tell you.</i><br><b>Combinado. Quando você chegar, a gente faz um churrasco.</b><br><i>Deal. When you arrive, we will have a barbecue.</i>',
				'Quando você vier a BH, me avisa. Aviso sim! Se der, eu vou em julho. Fica aqui em casa o tempo que você quiser. Obrigada! Assim que eu comprar a passagem, te falo. Combinado. Quando você chegar, a gente faz um churrasco.'),
			C('"Se der, eu vou em julho" means', 'If it works out, I will go in July', ['If he gives it to me, I go in July', 'Since it worked out, I went in July', 'I gave up on going in July'], 'der is dar. "Se der" = if it is possible, if it works out.'),
			T('Quando eu _____ 30 anos, vou dar uma festa (fazer)', 'fizer', 'fizeram minus -am = fizer.'),
			I('Remember',
				'• Future moment after quando, se, assim que: use the future subjunctive. <b>Quando eu chegar, te ligo.</b><br>• Form: the eles past minus -am. <b>tiveram</b> gives <b>tiver</b>, <b>puderam</b> gives <b>puder</b>.<br>• See is <b>vir</b>, come is <b>vier</b>.<br><br>Memory trick: three little phrases carry the tense, so learn them whole. <b>Se der.</b> <b>Se você quiser.</b> <b>Quando eu puder.</b>',
				'Quando eu chegar, te ligo. tiveram. tiver. puderam. puder. vir. vier. Se der. Se você quiser. Quando eu puder.')
		]
	},

	'inf-1': {
		start: [
			I('The big picture: an infinitive that knows who is acting',
				'English says "it is better for us to leave" and "I bought bread for you to eat". The words "for us" and "for you" tell you who does the action. Portuguese can do this in a shorter way: it puts the person before the infinitive and, for plural people, adds an ending to it. This is the personal infinitive, and it is a Portuguese speciality. The practical reward is big. After words like para, antes de, depois de and sem, it lets you skip the subjunctive completely. You will use it to explain purposes, give advice and organise people.<br><br><b>É melhor a gente sair cedo.</b><br>It is better for us to leave early.<br><b>Liguei para eles saberem a novidade.</b><br>I called so that they would know the news.<br><b>Antes de vocês irem, comam alguma coisa.</b><br>Before you all go, eat something.',
				'É melhor a gente sair cedo. Liguei para eles saberem a novidade. Antes de vocês irem, comam alguma coisa.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Fiz isso para eles entender</i><br>Right: <b>Fiz isso para eles entenderem.</b><br>Why: with eles or vocês as the subject, the infinitive takes -em.<br><br>2. Wrong: <i>Isso é para mim fazer</i><br>Right: <b>Isso é para eu fazer.</b><br>Why: the person doing the action is a subject, so it is eu, not mim.<br><br>3. Wrong: <i>Antes de que vocês cheguem</i><br>Right: <b>Antes de vocês chegarem.</b><br>Why: after a preposition, Portuguese prefers the personal infinitive to a que clause.',
				'Fiz isso para eles entenderem. Isso é para eu fazer. Antes de vocês chegarem.'),
			I('In real life: leaving on a trip',
				'<b>Deixa eu te ajudar com as malas.</b><br><i>Let me help you with the bags.</i><br><b>Obrigada. É melhor a gente sair agora pra não pegar trânsito.</b><br><i>Thanks. We had better leave now so we do not hit traffic.</i><br><b>Calma. Espera os meninos descerem.</b><br><i>Hold on. Wait for the boys to come down.</i><br><b>Pedi pra eles arrumarem tudo ontem!</b><br><i>I asked them to pack everything yesterday!</i><br><b>Pois é. Sem eles ajudarem, a gente não sai nunca.</b><br><i>I know. Without them helping, we will never leave.</i>',
				'Deixa eu te ajudar com as malas. Obrigada. É melhor a gente sair agora pra não pegar trânsito. Calma. Espera os meninos descerem. Pedi pra eles arrumarem tudo ontem! Pois é. Sem eles ajudarem, a gente não sai nunca.'),
			T('Pedi pra eles _____ tudo (arrumar)', 'arrumarem', 'eles: infinitive + em.'),
			C('Which is right?', 'Isso é para eu fazer', ['Isso é para mim fazer', 'Isso é para eu fazermos', 'Isso é para que eu fazer'], 'eu is the subject of fazer, and eu adds no ending.'),
			I('Remember',
				'• Person + infinitive: <b>para eu fazer</b>, <b>para a gente fazer</b>, <b>para eles fazerem</b>.<br>• Endings only for plural people: nós adds -mos, vocês and eles add -em.<br>• It follows prepositions: <b>para</b>, <b>antes de</b>, <b>depois de</b>, <b>sem</b>, <b>apesar de</b>.<br><br>Memory trick: only a crowd gets a tail. One person, bare infinitive. Several people, add -mos or -em.',
				'para eu fazer. para a gente fazer. para eles fazerem. para. antes de. depois de. sem. apesar de.')
		]
	},

	'comp-1': {
		start: [
			I('The big picture: two-word pasts',
				'English builds a lot of its past with "have" and "had": I had left, I have been working, I would have gone. Portuguese builds the same shapes with ter plus a participle, and two of them work just as you expect. Tinha feito is "had done", and teria feito is "would have done". The third one is a trap. Tenho feito looks like "I have done", but it only means "I have been doing lately". For a plain "I have done it", Brazilians use the simple past. You need these forms to tell stories in the right order and to talk about regrets.<br><br><b>Quando eu cheguei, o filme já tinha começado.</b><br>When I arrived, the film had already started.<br><b>Tenho estudado muito ultimamente.</b><br>I have been studying a lot lately.<br><b>Se eu tivesse visto sua mensagem, teria respondido.</b><br>If I had seen your message, I would have replied.',
				'Quando eu cheguei, o filme já tinha começado. Tenho estudado muito ultimamente. Se eu tivesse visto sua mensagem, teria respondido.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Tenho estado no Rio</i> (to say "I have been to Rio")<br>Right: <b>Já fui ao Rio.</b><br>Why: a life experience is one finished fact, so it takes the simple past with já.<br><br>2. Wrong: <i>Ela tinha abrido a porta</i><br>Right: <b>Ela tinha aberto a porta.</b><br>Why: abrir has an irregular participle, like feito, dito, visto and escrito.<br><br>3. Wrong: <i>Se eu teria sabido, teria ido</i><br>Right: <b>Se eu tivesse sabido, teria ido.</b><br>Why: after se comes tivesse. Teria belongs only in the result half.',
				'Já fui ao Rio. Ela tinha aberto a porta. Se eu tivesse sabido, teria ido.'),
			I('In real life: catching up',
				'<b>Você sumiu! O que você tem feito?</b><br><i>You disappeared! What have you been up to?</i><br><b>Tenho trabalhado demais. Ontem, quando saí, já tinha escurecido.</b><br><i>I have been working too much. Yesterday, when I left, it had already got dark.</i><br><b>Nossa. Você já jantou?</b><br><i>Wow. Have you had dinner yet?</i><br><b>Já comi, obrigada. Eu tinha feito uma sopa no domingo.</b><br><i>I have eaten, thanks. I had made a soup on Sunday.</i><br><b>Se você tivesse me chamado, eu teria ajudado.</b><br><i>If you had called me, I would have helped.</i>',
				'Você sumiu! O que você tem feito? Tenho trabalhado demais. Ontem, quando saí, já tinha escurecido. Nossa. Você já jantou? Já comi, obrigada. Eu tinha feito uma sopa no domingo. Se você tivesse me chamado, eu teria ajudado.'),
			C('"O que você tem feito?" asks', 'What have you been doing lately?', ['What did you do that one time?', 'What do you have to do?', 'What had you done before?'], 'tem feito = an activity repeated over the recent past.'),
			T('"Have you had dinner yet?": Você já _____? (jantar)', 'jantou', 'One finished action, even with "yet" or "already": simple past.'),
			I('Remember',
				'• <b>tinha</b> + participle = had done: <b>Eu já tinha saído.</b><br>• <b>tenho</b> + participle = have been doing lately: <b>Tenho dormido pouco.</b> For "I have done it", say <b>Já fiz.</b><br>• Regrets: <b>Se eu tivesse sabido, teria ido.</b><br><br>Memory trick: read <b>tenho feito</b> as "I keep doing". If "keep" does not fit the sentence, you want the simple past.',
				'Eu já tinha saído. Tenho dormido pouco. Já fiz. Se eu tivesse sabido, teria ido. tenho feito.')
		]
	},

	'con-1': {
		start: [
			I('The big picture: the words between your sentences',
				'You can know every tense and still sound like a list of separate sentences. What makes speech flow is the small words in between: but, so, since, even so, unless, by the way. English speakers use them without noticing, and so do Brazilians. This lesson gives you the spoken set first, then the ones that force the subjunctive, then a formal set for emails and meetings. Choosing the right register matters as much as the meaning. The reward is quick: add só que and já que to what you already say, and you sound a level higher right away.<br><br><b>Eu ia sair, só que começou a chover.</b><br>I was going to go out, but it started to rain.<br><b>Já que você vai ao mercado, traz leite.</b><br>Since you are going to the market, bring milk.<br><b>Mesmo que chova, eu vou.</b><br>Even if it rains, I am going.',
				'Eu ia sair, só que começou a chover. Já que você vai ao mercado, traz leite. Mesmo que chova, eu vou.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Mesmo que é difícil, eu tento</i><br>Right: <b>Mesmo que seja difícil, eu tento.</b><br>Why: mesmo que opens a possibility, so it forces the subjunctive.<br><br>2. Wrong: <i>Já que você esteja aqui, me ajuda</i><br>Right: <b>Já que você tá aqui, me ajuda.</b><br>Why: já que states a fact. Facts take the normal verb.<br><br>3. Wrong: <i>Eu queria ir, no entanto tô cansada</i> (chatting with a friend)<br>Right: <b>Eu queria ir, só que tô cansada.</b><br>Why: no entanto is for writing. In speech it sounds like a report.',
				'Mesmo que seja difícil, eu tento. Já que você tá aqui, me ajuda. Eu queria ir, só que tô cansada.'),
			I('In real life: talked into a party',
				'<b>Você vai na festa da Carol?</b><br><i>Are you going to Carol\'s party?</i><br><b>Eu queria, só que tenho prova amanhã.</b><br><i>I would like to, but I have an exam tomorrow.</i><br><b>Ah, vai! Mesmo que você fique só uma hora.</b><br><i>Oh, come on! Even if you stay just one hour.</i><br><b>Tá bom. Já que você insiste, eu vou. Aliás, quem vai levar o bolo?</b><br><i>Fine. Since you insist, I will go. By the way, who is bringing the cake?</i><br><b>Eu levo, desde que você leve o refrigerante.</b><br><i>I will, as long as you bring the soda.</i><br><b>Fechado. Ou seja, vou estudar no ônibus.</b><br><i>Deal. In other words, I will study on the bus.</i>',
				'Você vai na festa da Carol? Eu queria, só que tenho prova amanhã. Ah, vai! Mesmo que você fique só uma hora. Tá bom. Já que você insiste, eu vou. Aliás, quem vai levar o bolo? Eu levo, desde que você leve o refrigerante. Fechado. Ou seja, vou estudar no ônibus.'),
			C('"Eu levo, desde que você leve o refrigerante" means', 'I will bring it, as long as you bring the soda', ['I will bring it, because you brought the soda', 'I will bring it, unless you bring the soda', 'I have brought it since you brought the soda'], 'desde que + subjunctive = on the condition that.'),
			T('Mesmo que você _____ só uma hora (ficar)', 'fique', 'mesmo que forces the subjunctive: fico gives fique.'),
			I('Remember',
				'• For speech: <b>só que</b>, <b>já que</b>, <b>aliás</b>, <b>ou seja</b>, <b>mesmo assim</b>.<br>• These force the subjunctive: <b>mesmo que</b>, <b>a não ser que</b>, <b>desde que</b>, <b>por mais que</b>.<br>• For writing: <b>no entanto</b>, <b>portanto</b>, <b>além disso</b>.<br><br>Memory trick: ask if the connector states a fact or opens a door. Fact (já que, só que): normal verb. Open door (unless, even if, as long as): subjunctive.',
				'só que. já que. aliás. ou seja. mesmo assim. mesmo que. a não ser que. desde que. por mais que. no entanto. portanto. além disso.')
		]
	},

	'idi-1': {
		start: [
			I('The big picture: phrases you cannot translate word by word',
				'Every language has phrases that make no sense piece by piece. In English it rains cats and dogs and people spill the beans. In Brazil, tokens drop, frogs get swallowed and buckets get kicked. Idioms matter because Brazilians use them in ordinary talk about dates, work and money, and a literal reading leaves you lost. They are also fixed: change one word and the phrase stops working. Start by recognising them when you hear them. Then pick two or three you like and use them with friends. They are informal, so keep them out of formal emails.<br><br><b>Demorou, mas a ficha caiu.</b><br>It took a while, but it finally sank in.<br><b>Meu irmão mandou bem na prova.</b><br>My brother did great on the test.<br><b>A gente fez uma vaquinha pro churrasco.</b><br>We all chipped in for the barbecue.',
				'Demorou, mas a ficha caiu. Meu irmão mandou bem na prova. A gente fez uma vaquinha pro churrasco.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Fica de bom</i><br>Right: <b>Fica de boa.</b><br>Why: the phrase is fixed. It is always de boa, for men and women alike.<br><br>2. Wrong: <i>Vamos fazer uma vaca</i><br>Right: <b>Vamos fazer uma vaquinha.</b><br>Why: the diminutive is part of the idiom. A plain vaca is just a cow.<br><br>3. Wrong: <i>O avô dele chutou o balde</i> (to say he died)<br>Right: <b>O avô dele morreu.</b><br>Why: chutar o balde means to stop caring and quit. Nobody dies, unlike in English.',
				'Fica de boa. Vamos fazer uma vaquinha. O avô dele morreu.'),
			I('In real life: the bad date',
				'<b>E o encontro de ontem?</b><br><i>And the date yesterday?</i><br><b>Ele me deu um bolo. Fiquei uma hora esperando.</b><br><i>He stood me up. I waited for an hour.</i><br><b>Sério? Eu já tava com a pulga atrás da orelha.</b><br><i>Really? I already had a bad feeling about him.</i><br><b>Que mico, sozinha no restaurante!</b><br><i>So embarrassing, alone at the restaurant!</i><br><b>Fica de boa. Hoje a gente sai pra você esquecer isso.</b><br><i>Do not worry. Tonight we go out so you can forget it.</i><br><b>Bora. Dessa vez eu chutei o balde: bloqueei ele.</b><br><i>Let\'s go. This time I am done: I blocked him.</i>',
				'E o encontro de ontem? Ele me deu um bolo. Fiquei uma hora esperando. Sério? Eu já tava com a pulga atrás da orelha. Que mico, sozinha no restaurante! Fica de boa. Hoje a gente sai pra você esquecer isso. Bora. Dessa vez eu chutei o balde: bloqueei ele.'),
			C('What happened on the date?', 'He never showed up', ['He brought her a cake', 'He arrived an hour late', 'He left without paying'], 'dar um bolo = to stand someone up.'),
			T('Fica de _____ (relax, it is fine)', 'boa', 'ficar de boa. Always boa.'),
			I('Remember',
				'• Idioms are fixed blocks. Learn the whole phrase: <b>cair a ficha</b>, <b>dar um bolo</b>, <b>pagar mico</b>.<br>• Many use animals: <b>engolir sapo</b>, <b>dar zebra</b>, <b>fazer uma vaquinha</b>.<br>• They are for friends and casual talk, not for formal writing.<br><br>Memory trick: picture each one literally. A frog going down your throat, a flea behind your ear, a small cow collecting coins. The sillier the picture, the better it sticks.',
				'cair a ficha. dar um bolo. pagar mico. engolir sapo. dar zebra. fazer uma vaquinha.')
		]
	},

	'reg-1': {
		start: [
			I('The big picture: one language for talking, another for writing',
				'English changes a little between a chat and a cover letter: "gonna" becomes "going to", and "hey" becomes "Dear Ms Silva". In Brazil the gap is much wider. Spoken Portuguese shortens words, uses ter for "there is", and places pronouns in ways that school grammar marks as wrong. Written Portuguese keeps the full forms and the old rules. Neither one is better. Each has its place, and using the wrong one stands out. You need the spoken set to follow any conversation and to text friends, and the written set for work, exams and anything official.<br><br><b>Tô indo pro trabalho.</b><br>I am on my way to work.<br><b>Cadê a chave? Tem uma cópia na gaveta.</b><br>Where is the key? There is a copy in the drawer.<br><b>Me liga rapidinho?</b><br>Can you give me a quick call?',
				'Tô indo pro trabalho. Cadê a chave? Tem uma cópia na gaveta. Me liga rapidinho?')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Há uma festa hoje, bora?</i> (talking to a friend)<br>Right: <b>Tem uma festa hoje, bora?</b><br>Why: in speech, "there is" is tem. Há sounds like a newspaper.<br><br>2. Wrong: <i>Cadê está meu celular?</i><br>Right: <b>Cadê meu celular?</b><br>Why: cadê already means "where is". Adding está says it twice.<br><br>3. Wrong: <i>Tô te mandando o documento, tá?</i> (in a formal email)<br>Right: <b>Envio o documento em anexo.</b><br>Why: tô, te and tá are spoken forms. Formal writing wants full words and a neutral tone.',
				'Tem uma festa hoje, bora? Cadê meu celular? Envio o documento em anexo.'),
			I('In real life: texting a friend',
				'<b>Cadê você? Tô te esperando.</b><br><i>Where are you? I am waiting for you.</i><br><b>Tô chegando! Só um minutinho.</b><br><i>Almost there! Just a minute.</i><br><b>Tem uma mesa livre lá fora, né?</b><br><i>There is a free table outside, right?</i><br><b>Tem sim. A Ju tá lá. Você viu ela?</b><br><i>Yes, there is. Ju is there. Did you see her?</i><br><b>Vi. Chego rapidinho, me espera!</b><br><i>I did. I will be there real quick, wait for me!</i>',
				'Cadê você? Tô te esperando. Tô chegando! Só um minutinho. Tem uma mesa livre lá fora, né? Tem sim. A Ju tá lá. Você viu ela? Vi. Chego rapidinho, me espera!'),
			C('Which sentence belongs in a formal email?', 'Há uma reunião amanhã às dez.', ['Tem uma reunião amanhã, né?', 'Cadê a reunião?', 'Tô indo pra reunião.'], 'há, full words and no né: that is the written register.'),
			T('Tô indo _____ casa (spoken form of "para")', 'pra', 'para becomes pra in speech.'),
			I('Remember',
				'• Speech shortens: <b>tô</b>, <b>tá</b>, <b>pra</b>, <b>pro</b>, <b>né</b>, <b>cadê</b>.<br>• There is: <b>tem</b> when you talk, <b>há</b> when you write.<br>• Pronouns: <b>Eu vi ela.</b> in speech, <b>Eu a vi.</b> on paper.<br><br>Memory trick: ask yourself one question. Would I text this to a friend? Then tô, pra, tem. Would I sign it with my full name? Then estou, para, há.',
				'tô. tá. pra. pro. né. cadê. tem. há. Eu vi ela. Eu a vi.')
		]
	},

	'c2-2': {
		start: [
			I('The big picture: the vocabulary of people who read',
				'English has everyday words and bookish ones: "look into" and "scrutinise", "odd" and "outlandish". Portuguese has the same two layers. The words in this lesson come from the upper layer. You find them in newspapers, novels, contracts and careful speech, and a foreigner who uses one correctly gets a surprised look. The point is precision. Esmiuçar says more than "look at", and ressalva is more exact than "but". Use them where they fit: in writing, at work, in a serious conversation. At a bar they can sound like a joke, which is sometimes exactly what you want.<br><br><b>Vamos esmiuçar o contrato antes de assinar.</b><br>Let us go through the contract in detail before signing.<br><b>Foi uma desculpa estapafúrdia.</b><br>It was an absurd excuse.<br><b>Agradeço de antemão pela ajuda.</b><br>Thank you in advance for the help.',
				'Vamos esmiuçar o contrato antes de assinar. Foi uma desculpa estapafúrdia. Agradeço de antemão pela ajuda.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Adorei, que plano mirabolante!</i> (as plain praise)<br>Right: <b>Adorei, que plano primoroso!</b><br>Why: mirabolante means far-fetched and overcomplicated. Praise is primoroso.<br><br>2. Wrong: <i>A despeito que choveu, a gente foi</i><br>Right: <b>A despeito da chuva, a gente foi.</b><br>Why: a despeito de is followed by a noun, not by a que clause.<br><br>3. Wrong: <i>Quiçá eu vá no boteco hoje</i> (said seriously)<br>Right: <b>Talvez eu vá no boteco hoje.</b><br>Why: quiçá is literary. In casual speech, talvez is the natural word.',
				'Adorei, que plano primoroso! A despeito da chuva, a gente foi. Talvez eu vá no boteco hoje.'),
			I('In real life: a project report',
				'<b>O projeto era ambicioso, quiçá mirabolante.</b><br><i>The project was ambitious, perhaps even far-fetched.</i><br><b>A despeito dos empecilhos, a equipe não desistiu.</b><br><i>In spite of the obstacles, the team did not give up.</i><br><b>O diretor ponderou os riscos e deu seu respaldo.</b><br><i>The director weighed up the risks and gave his backing.</i><br><b>Concordo com o relatório, com uma ressalva: o prazo é curto.</b><br><i>I agree with the report, with one caveat: the deadline is short.</i><br><b>Ainda assim, o resultado ficou primoroso.</b><br><i>Even so, the result turned out superb.</i>',
				'O projeto era ambicioso, quiçá mirabolante. A despeito dos empecilhos, a equipe não desistiu. O diretor ponderou os riscos e deu seu respaldo. Concordo com o relatório, com uma ressalva: o prazo é curto. Ainda assim, o resultado ficou primoroso.'),
			C('"A despeito dos empecilhos" means', 'In spite of the obstacles', ['Because of the delays', 'With respect to the employees', 'Thanks to the support'], 'a despeito de = in spite of. empecilho = obstacle.'),
			T('O diretor deu seu _____ (backing, support)', 'respaldo'),
			I('Remember',
				'• These words belong to writing and careful speech. Match them to the moment.<br>• Check how each one is built: <b>a despeito de</b> + noun, <b>de antemão</b> after the verb.<br>• Watch the false friend: <b>relevar</b> is to let it slide, <b>revelar</b> is to reveal.<br><br>Memory trick: <b>relevar</b> has <b>leve</b>, "light", inside it. You take the thing lightly and let it go.',
				'a despeito de. de antemão. relevar. revelar. leve.')
		]
	},

	'conv-1': {
		start: [
			I('The big picture: the small words that keep a chat alive',
				'Listen to English speakers and you hear "like", "you know", "right?", "anyway" and "no way!" in almost every sentence. They carry little meaning, but they show you are listening and give you time to think. Brazilians have their own set, and a conversation without them feels stiff, like reading aloud. This lesson gives you the fillers, the quick reactions, and two verbs, ficar and dar, that turn up in dozens of everyday phrases. You need them from your first real chat. They are also the cheapest way to sound natural, because they need no grammar at all.<br><br><b>Então, tipo, eu não sei se vou.</b><br>So, like, I do not know if I am going.<br><b>Pois é, tá caro, né?</b><br>Yeah, it is expensive, right?<br><b>Enfim, a gente deu um jeito.</b><br>Anyway, we found a way.',
				'Então, tipo, eu não sei se vou. Pois é, tá caro, né? Enfim, a gente deu um jeito.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Sim. Sim. Sim.</i> (to show you are listening)<br>Right: <b>Pois é. Sério? Nossa!</b><br>Why: Brazilians rarely react with sim. They use these small reactions.<br><br>2. Wrong: <i>O plano funcionou!</i> (when things worked out)<br>Right: <b>Deu certo!</b><br>Why: funcionar is mostly for machines. Plans and luck use dar certo.<br><br>3. Wrong: <i>Não é possível hoje</i><br>Right: <b>Hoje não dá.</b><br>Why: não dá is the everyday way to say you cannot make it.',
				'Pois é. Sério? Nossa! Deu certo! Hoje não dá.'),
			I('In real life: making a plan',
				'<b>Então, o show é sábado. Você vai?</b><br><i>So, the concert is on Saturday. Are you going?</i><br><b>Sei lá. Tô sem dinheiro, né?</b><br><i>I dunno. I am out of money, you know?</i><br><b>Pois é, tá caro. Mas eu dou um jeito: te empresto.</b><br><i>Yeah, it is expensive. But I will sort it out: I will lend you some.</i><br><b>Sério? Nossa, valeu!</b><br><i>Really? Wow, thanks!</i><br><b>Imagina! Então fechou, sábado às oito.</b><br><i>Do not mention it! So it is a deal, Saturday at eight.</i><br><b>Fechou. Tomara que dê certo!</b><br><i>Deal. I hope it works out!</i>',
				'Então, o show é sábado. Você vai? Sei lá. Tô sem dinheiro, né? Pois é, tá caro. Mas eu dou um jeito: te empresto. Sério? Nossa, valeu! Imagina! Então fechou, sábado às oito. Fechou. Tomara que dê certo!'),
			C('In the dialogue, "Imagina!" means', 'Do not mention it', ['Imagine that', 'No way', 'I doubt it'], 'After a thank-you, Imagina! is a warm "you are welcome".'),
			T('"Thanks!" (casual, one word)', 'valeu', 'Valeu is the relaxed thank-you among friends.'),
			I('Remember',
				'• Fillers buy time: <b>então</b>, <b>tipo</b>, <b>né</b>, <b>sei lá</b>, <b>enfim</b>.<br>• Reactions show you are listening: <b>Pois é.</b> <b>Sério?</b> <b>Nossa!</b><br>• <b>dar</b> does a lot: <b>deu certo</b>, <b>dar um jeito</b>, <b>não dá</b>.<br><br>Memory trick: three replies cover most chats. <b>Pois é</b> to agree, <b>Sério?</b> to hear more, <b>Fechou</b> to seal the plan.',
				'então. tipo. né. sei lá. enfim. Pois é. Sério? Nossa! deu certo. dar um jeito. não dá. Fechou.')
		]
	},

	'c2-1': {
		start: [
			I('The big picture: words Brazilians are proud of',
				'Some words carry a whole idea that English needs a sentence for. Saudade is the famous one, but daily life is full of others: the stress of a perrengue, the cleverness of a gambiarra, the relief of being able to desabafar. Brazilians know these words are special and light up when a foreigner uses one well. This lesson mixes them with a few educated connectors and idioms, so you can sound warm in one sentence and precise in the next. You will need them when you tell a story about something going wrong, which is half of all good stories.<br><br><b>Tô com saudade de casa.</b><br>I miss home.<br><b>Preciso desabafar com alguém.</b><br>I need to vent to someone.<br><b>Foi um perrengue, mas a gente resolveu com uma gambiarra.</b><br>It was rough, but we solved it with a hacky fix.',
				'Tô com saudade de casa. Preciso desabafar com alguém. Foi um perrengue, mas a gente resolveu com uma gambiarra.')
		],
		end: [
			I('Common mistakes',
				'1. Wrong: <i>Eu saudade você</i><br>Right: <b>Tô com saudade de você.</b><br>Why: saudade is a noun, not a verb. You are "with" it, and it takes de.<br><br>2. Wrong: <i>Faço questão pagar</i><br>Right: <b>Faço questão de pagar.</b><br>Why: fazer questão always needs de before the verb.<br><br>3. Wrong: <i>Ele pisou a bola</i><br>Right: <b>Ele pisou na bola.</b><br>Why: the idiom is fixed with na. Without it, he just stepped on a ball.',
				'Tô com saudade de você. Faço questão de pagar. Ele pisou na bola.'),
			I('In real life: a rough week',
				'<b>Posso desabafar? Minha semana foi um perrengue.</b><br><i>Can I vent? My week was rough.</i><br><b>Claro. O que aconteceu?</b><br><i>Of course. What happened?</i><br><b>O chuveiro quebrou e eu fiz uma gambiarra. Convenhamos, ficou horrível.</b><br><i>The shower broke and I rigged up a fix. Let\'s face it, it looks awful.</i><br><b>Meu primo quebra o galho. Ele conserta tudo.</b><br><i>My cousin can help out. He fixes everything.</i><br><b>Sério? Eu faço questão de pagar.</b><br><i>Really? I insist on paying.</i><br><b>Imagina. Ele capricha e cobra pouco.</b><br><i>No need to worry. He does careful work and charges little.</i>',
				'Posso desabafar? Minha semana foi um perrengue. Claro. O que aconteceu? O chuveiro quebrou e eu fiz uma gambiarra. Convenhamos, ficou horrível. Meu primo quebra o galho. Ele conserta tudo. Sério? Eu faço questão de pagar. Imagina. Ele capricha e cobra pouco.'),
			C('"Meu primo quebra o galho" means', 'My cousin can help out', ['My cousin broke a branch', 'My cousin made it worse', 'My cousin is too busy'], 'quebrar o galho = to help out, to solve it for now.'),
			T('Tô com _____ de você (I miss you)', 'saudade', 'estar com saudade de.', ['saudades']),
			I('Remember',
				'• Feelings and situations: <b>saudade</b>, <b>desabafar</b>, <b>perrengue</b>, <b>gambiarra</b>, <b>caprichar</b>.<br>• Small words matter: <b>saudade de</b>, <b>fazer questão de</b>, <b>pisar na bola</b>.<br>• <b>convenhamos</b> and <b>tampouco</b> lift your register in one word.<br><br>Memory trick: a <b>perrengue</b> is the problem and a <b>gambiarra</b> is the duct tape. They usually show up together.',
				'saudade. desabafar. perrengue. gambiarra. caprichar. saudade de. fazer questão de. pisar na bola. convenhamos. tampouco.')
		]
	}
};
