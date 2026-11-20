// Spanish pack: course, starter words, placement test, verb drill, roadmap.
// Stage targets follow the Instituto Cervantes Plan Curricular (A1 to C2, the basis of the DELE exams).
// Neutral standard Spanish, with Spain and Latin America differences pointed out where they matter.
import { I, C, T, L } from './kit.js';

const UNITS = [
	{
		title: 'Sonidos',
		sub: 'Pronunciation, spelled out in English',
		lessons: [
			{
				id: 'es-son-1', title: 'Five clean vowels', sub: 'Vowels, silent h, b and v, ll, ñ',
				steps: [
					I('Five vowels, always the same', 'Spanish vowels never change and never slide.<br><b>a</b> = ah · <b>e</b> = eh · <b>i</b> = ee · <b>o</b> = oh · <b>u</b> = oo<br><b>casa</b> = KAH-sah · <b>leche</b> = LEH-cheh · <b>mucho</b> = MOO-choh<br>Keep them short. English speakers stretch "o" into "ow". Do not.', 'casa. leche. mucho.'),
					C('How do you say "leche" (milk)?', 'LEH-cheh', ['LEE-chee', 'LAY-chay', 'LETCH'], 'e is always "eh", even at the end of a word.'),
					I('H is silent', 'Always. Pretend it is not there.<br><b>hola</b> = OH-lah · <b>hablar</b> = ah-BLAR · <b>ahora</b> = ah-OH-rah<br>Only <b>ch</b> has a sound: <b>chico</b> = CHEE-koh.', 'hola. hablar. ahora. chico.'),
					C('"hielo" (ice) sounds like', 'YEH-loh', ['HYEH-loh', 'HEE-loh', 'HIGH-loh'], 'The h is silent, so the word starts with the "ye" sound.'),
					I('B and V are one sound', 'Spanish has no English "v". <b>b</b> and <b>v</b> sound the same: a "b", softer between vowels.<br><b>vino</b> = BEE-noh · <b>vaca</b> = BAH-kah · <b>beber</b> and <b>vivir</b> start the same way.<br>Natives ask "¿con b o con v?" when spelling.', 'vino. vaca. beber. vivir.'),
					C('"vaca" (cow) and "baca" (roof rack) sound', 'exactly the same', ['different: v as in English "very"', 'different: the b is silent', 'different: v sounds like "f"'], 'b and v are the same sound in Spanish.'),
					I('LL and Y', 'Both sound like the "y" in "yes" (in many regions closer to the "j" in "jet").<br><b>llamar</b> = yah-MAR · <b>calle</b> = KAH-yeh · <b>pollo</b> = POH-yoh · <b>yo</b> = yoh<br>Never an English "l" sound.', 'llamar. calle. pollo. yo.'),
					I('Ñ', '<b>ñ</b> = "ny" as in "canyon".<br><b>año</b> = AH-nyoh (year) · <b>mañana</b> = mah-NYAH-nah · <b>niño</b> = NEE-nyoh<br>It is a separate letter and it matters: <b>año</b> is a year, "ano" is an anus.', 'año. mañana. niño.'),
					L('Hola, me llamo Ana', 'OH-lah, meh YAH-moh AH-nah = Hi, my name is Ana.'),
					I('QU and GU', 'The u is silent in <b>que, qui, gue, gui</b>.<br><b>queso</b> = KEH-soh · <b>quien</b> = kyen · <b>guerra</b> = GEH-rrah · <b>guitarra</b> = ghee-TAH-rrah<br>Two dots bring the u back: <b>pingüino</b> = peen-GWEE-noh.', 'queso. quien. guerra. guitarra. pingüino.'),
					C('"queso" (cheese) sounds like', 'KEH-soh', ['KWEH-soh', 'KWEE-zoh', 'CHEH-soh'], 'qu = k. The u is silent.'),
					T('tomorrow', 'mañana', 'mañana = mah-NYAH-nah. It also means "morning".')
				]
			},
			{
				id: 'es-son-2', title: 'R, J, Z and the accent mark', sub: 'The sounds English does not have',
				steps: [
					I('One tap or a trill', 'A single <b>r</b> between vowels is one quick tap, like the "tt" in American "butter".<br><b>rr</b> is a trill, and so is <b>r</b> at the start of a word.<br><b>pero</b> = PEH-roh (but) · <b>perro</b> = PEH-rroh (dog)<br><b>caro</b> (expensive) · <b>carro</b> (car) · <b>rojo</b> = RROH-hoh', 'pero. perro. caro. carro. rojo.'),
					C('"perro" means', 'dog', ['but', 'expensive', 'pear'], 'pero with one tap is "but". The trill makes it a dog.'),
					I('J and soft G', '<b>j</b>, and <b>g</b> before e or i, is a throaty "h", like the "ch" in Scottish "loch". Softer in Latin America, raspier in Spain.<br><b>jamón</b> = hah-MOHN · <b>gente</b> = HEN-teh · <b>hijo</b> = EE-hoh<br>Before a, o, u the g is hard: <b>gato</b> = GAH-toh.', 'jamón. gente. hijo. gato.'),
					C('"gente" (people) sounds like', 'HEN-teh', ['JEN-teh', 'GEN-teh', 'ZHEN-chee'], 'g before e or i sounds like the Spanish j.'),
					I('C and Z: Spain vs Latin America', 'In most of Spain, <b>z</b> and <b>c</b> before e or i sound like "th" in "think".<br><b>gracias</b> = GRAH-thyahs · <b>zapato</b> = thah-PAH-toh<br>In Latin America, the Canary Islands and much of Andalusia it is an "s": GRAH-syahs, sah-PAH-toh.<br>Both are correct. Pick one and stay with it.', 'gracias. zapato. cerveza.'),
					C('In Mexico, "cerveza" (beer) sounds like', 'sehr-BEH-sah', ['thehr-BEH-thah', 'kehr-VEH-zah', 'chehr-BEH-tsah'], 'Latin America says s. The "th" version is what you hear in Madrid. And v sounds like b everywhere.'),
					I('Where the stress falls', 'Two rules cover almost every word.<br>Ends in a vowel, n or s: stress the second to last syllable. <b>CA-sa</b>, <b>HA-blan</b>, <b>LU-nes</b><br>Ends in any other consonant: stress the last. <b>ha-BLAR</b>, <b>ciu-DAD</b>, <b>es-pa-ÑOL</b><br>A word that breaks the rules carries a written accent: <b>café</b>, <b>inglés</b>, <b>árbol</b>, <b>música</b>.', 'casa. hablan. hablar. ciudad. café. inglés. árbol. música.'),
					C('Where is the stress in "ciudad" (city)?', 'on the last syllable: syoo-DAHD', ['on the first syllable: SYOO-dahd', 'on both syllables equally', 'on a silent third syllable'], 'It ends in a consonant other than n or s, so the last syllable is stressed.'),
					I('Accents change the meaning', '<b>hablo</b> = I speak · <b>habló</b> = he or she spoke<br><b>esta</b> = this · <b>está</b> = is<br><b>el</b> = the · <b>él</b> = he · <b>tu</b> = your · <b>tú</b> = you · <b>si</b> = if · <b>sí</b> = yes<br>Question words always carry one: <b>¿qué?, ¿cómo?, ¿dónde?, ¿cuándo?</b>', 'hablo. habló. esta. está.'),
					C('"habló" means', 'he or she spoke', ['I speak', 'I spoke', 'speak!'], 'Stress on the end plus -ó = third person, pretérito. "I speak" is hablo, "I spoke" is hablé.'),
					T('coffee', 'café', 'kah-FEH. The accent shows the stress on the last syllable.'),
					L('El perro corre rápido', 'The dog runs fast. Two trills and a written accent.')
				]
			}
		]
	},
	{
		title: 'Primeros pasos',
		sub: 'Gender, two verbs "to be" and the present',
		lessons: [
			{
				id: 'es-gen-1', title: 'El, la, un, una', sub: 'Gender, articles and agreement',
				steps: [
					I('Every noun has a gender', 'Most nouns in <b>-o</b> are masculine, most in <b>-a</b> are feminine.<br><b>el libro</b> (the book) · <b>la casa</b> (the house)<br>Plural: <b>los libros</b> · <b>las casas</b><br>a, an: <b>un libro</b> · <b>una casa</b>. Some: <b>unos</b>, <b>unas</b>.', 'el libro. la casa. los libros. las casas.'),
					T('the house', 'la casa'),
					I('Endings that tell you', 'Feminine: <b>-ción, -sión, -dad, -tad, -tud</b>: la canción, la ciudad, la libertad.<br>Masculine: many words in <b>-ma</b> that came from Greek: <b>el problema</b>, <b>el tema</b>, <b>el idioma</b>, <b>el sistema</b>, <b>el clima</b>.', 'la canción. la ciudad. el problema. el idioma.'),
					C('Which one is right?', 'el problema', ['la problema', 'lo problema', 'una problema'], 'problema is masculine, like tema, idioma and sistema.'),
					I('The rebels', 'Learn these with their article:<br><b>el día</b> · <b>el mapa</b> · <b>el sofá</b><br><b>la mano</b> · <b>la foto</b> · <b>la moto</b> · <b>la radio</b><br>foto and moto are short for fotografía and motocicleta.', 'el día. el mapa. la mano. la foto.'),
					C('_____ mano (the hand)', 'la', ['el', 'lo', 'le'], 'la mano, las manos. It ends in -o but it is feminine.'),
					I('El agua', 'A feminine noun that starts with a stressed <b>a</b> sound takes <b>el</b> in the singular, only to avoid "la a...".<br><b>el agua fría</b> (the adjective stays feminine) · <b>las aguas</b><br>Same for <b>el hambre</b>, <b>el aula</b>, <b>el águila</b>.', 'el agua fría. las aguas.'),
					T('the cold water (agua, frío)', 'el agua fría', 'el for the sound, fría because agua is still feminine.'),
					I('Adjectives agree, and come after', '<b>un coche rojo</b> · <b>una casa roja</b> · <b>unos coches rojos</b> · <b>unas casas rojas</b><br>Adjectives in -e or a consonant do not change for gender: <b>grande</b>, <b>azul</b>, <b>fácil</b>.<br>Two contractions, and only two: a + el = <b>al</b> · de + el = <b>del</b>.', 'un coche rojo. una casa roja.'),
					T('a red house (rojo)', 'una casa roja'),
					T('Voy _____ cine (a + el)', 'al', 'a + el = al. "Voy al cine" = I am going to the cinema.'),
					L('Los días son largos', 'The days are long. día is masculine.')
				]
			},
			{
				id: 'es-ser-1', title: 'Soy, estoy', sub: 'Two verbs for "to be"',
				steps: [
					I('What you are, how you are', '<b>ser</b>: soy, eres, es, somos, son. For identity, origin, profession, character, time.<br><b>estar</b>: estoy, estás, está, estamos, están. For location, moods and states.<br><b>Soy</b> Ana. <b>Estoy</b> en Madrid.', 'Soy Ana. Estoy en Madrid.'),
					T('Yo _____ de Canadá (ser)', 'soy', 'Origin takes ser.'),
					T('¿Dónde _____ el baño? (estar)', 'está', 'Where something is located takes estar.'),
					I('Ser in action', '<b>Es médico.</b> (professions take no article)<br><b>Son las tres.</b> (time)<br><b>La mesa es de madera.</b> (what it is made of)<br><b>La fiesta es en mi casa.</b> An event "takes place" with ser, even though it is a location.', 'Es médico. Son las tres. La fiesta es en mi casa.'),
					C('La reunión _____ en la oficina.', 'es', ['está', 'están', 'son'], 'Events take place with ser. A building or a person "está" somewhere.'),
					I('Estar in action', '<b>Estoy cansada.</b> (a state)<br><b>Madrid está en España.</b> (location)<br><b>Estoy comiendo.</b> (estar + -ando / -iendo = happening right now)<br><b>¿Cómo estás?</b> asks how you are today. <b>¿Cómo eres?</b> asks what you are like.', 'Estoy cansada. Estoy comiendo. ¿Cómo estás?'),
					T('I am tired (you are a woman)', 'estoy cansada', 'A state, so estar.', ['yo estoy cansada']),
					T('Ella _____ profesora (ser)', 'es'),
					C('Someone asks "¿Cómo estás?" Best reply:', 'Bien, ¿y tú?', ['Soy de Lima', 'De nada', 'Hasta luego'], 'Soy de Lima answers "¿De dónde eres?"'),
					I('Hay', '<b>hay</b> (sounds like "eye") = there is, there are. It never changes.<br><b>Hay un bar aquí.</b> · <b>Hay dos bares.</b><br>hay + un, una, numbers. está + el, la, names:<br><b>Hay un banco</b> en la plaza. <b>El banco está</b> en la plaza.', 'Hay un bar aquí. El banco está en la plaza.'),
					T('_____ un banco cerca (there is)', 'hay'),
					L('Estamos en casa', 'We are at home.')
				]
			},
			{
				id: 'es-pres-1', title: 'Hablo, como, vivo', sub: 'The present and the irregular yo',
				steps: [
					I('Three families', '<b>hablar</b>: habl<b>o</b>, habl<b>as</b>, habl<b>a</b>, habl<b>amos</b>, habl<b>an</b><br><b>comer</b>: com<b>o</b>, com<b>es</b>, com<b>e</b>, com<b>emos</b>, com<b>en</b><br><b>vivir</b>: viv<b>o</b>, viv<b>es</b>, viv<b>e</b>, viv<b>imos</b>, viv<b>en</b><br>The ending already says who, so the pronoun is usually dropped: <b>Hablo español.</b>', 'hablo. hablas. habla. hablamos. hablan.'),
					T('Yo _____ en Lima (vivir)', 'vivo'),
					T('¿Tú _____ español? (hablar)', 'hablas'),
					I('Tú, usted, ustedes, vosotros', '<b>tú</b> is informal "you". <b>usted</b> is polite and takes the él / ella form: ¿Usted <b>habla</b> inglés?<br>Plural "you": Latin America says <b>ustedes</b> to everyone (ustedes hablan). Spain says <b>vosotros</b> to friends: <b>habláis, coméis, vivís</b>.', '¿Usted habla inglés? ¿Vosotros habláis inglés?'),
					T('¿Usted _____ aquí? (vivir)', 'vive', 'usted takes the same form as él and ella.'),
					I('The irregular yo', 'A group of everyday verbs is only odd in the yo form:<br>hacer: <b>hago</b> · poner: <b>pongo</b> · salir: <b>salgo</b> · traer: <b>traigo</b><br>conocer: <b>conozco</b> · saber: <b>sé</b> · dar: <b>doy</b> · ver: <b>veo</b><br>The rest is regular: haces, hace, hacemos, hacen.', 'hago. pongo. salgo. traigo. conozco. sé. doy. veo.'),
					T('Yo no _____ (saber)', 'sé', 'No sé = I do not know. With the accent: "se" is a different word.'),
					T('Yo _____ la cena (hacer)', 'hago'),
					T('Yo _____ a tu hermano (conocer)', 'conozco', 'Verbs in -cer and -cir after a vowel: yo ends in -zco.'),
					C('Yo _____ Madrid muy bien.', 'conozco', ['sé', 'sabo', 'conozo'], 'conocer for people and places you are familiar with. saber for facts and skills: Sé nadar.'),
					I('Ir, and the easy future', '<b>ir</b>: voy, vas, va, vamos, van<br><b>ir a + infinitive</b> = going to do. <b>Voy a comer.</b><br>Do not forget the <b>a</b>.<br><b>Vamos</b> also means "let\'s go".', 'voy. vas. va. vamos. van. Voy a comer.'),
					T('I am going to eat', 'voy a comer', null, ['yo voy a comer'])
				]
			},
			{
				id: 'es-pres-2', title: 'Quiero, puedo, pido', sub: 'Stem changers, tener and venir',
				steps: [
					I('The boot verbs: e to ie', 'In many verbs the stressed vowel splits. It happens in every form except nosotros (and vosotros).<br><b>querer</b>: qu<b>ie</b>ro, qu<b>ie</b>res, qu<b>ie</b>re, queremos, qu<b>ie</b>ren<br>Also pensar, empezar, entender, preferir, sentir, cerrar.', 'quiero. quieres. quiere. queremos. quieren.'),
					T('Yo _____ un café (querer)', 'quiero'),
					T('Nosotros _____ ir (querer)', 'queremos', 'No change in nosotros: the stress is on the ending.'),
					I('o to ue', '<b>poder</b>: p<b>ue</b>do, p<b>ue</b>des, p<b>ue</b>de, podemos, p<b>ue</b>den<br>Also dormir, volver, encontrar, costar, recordar, morir.<br><b>jugar</b> is the only u to ue: <b>juego</b>, juegas, juega, jugamos, juegan.', 'puedo. puedes. puede. podemos. pueden. juego.'),
					T('¿Tú _____ venir? (poder)', 'puedes'),
					T('¿Cuánto _____ esto? (costar)', 'cuesta', '¿Cuánto cuesta? = How much is it?'),
					I('e to i', 'Only -ir verbs do this.<br><b>pedir</b> (to ask for, to order): p<b>i</b>do, p<b>i</b>des, p<b>i</b>de, pedimos, p<b>i</b>den<br>Also servir, repetir, vestir, and seguir (<b>sigo</b>, sigues, sigue).', 'pido. pides. pide. pedimos. piden.'),
					T('Ella _____ una cerveza (pedir)', 'pide'),
					I('Tener and venir', 'Irregular yo plus a stem change:<br><b>tener</b>: tengo, tienes, tiene, tenemos, tienen<br><b>venir</b>: vengo, vienes, viene, venimos, vienen<br>Spanish "has" what English "is": <b>tengo hambre</b> (hungry), <b>sed</b> (thirsty), <b>sueño</b> (sleepy), <b>frío</b>, <b>calor</b>, <b>prisa</b>, <b>30 años</b>.<br><b>tener que</b> + infinitive = to have to.', 'tengo. tienes. tiene. tenemos. tienen. Tengo hambre.'),
					T('I am hungry (tener)', 'tengo hambre', null, ['yo tengo hambre']),
					C('"¿Cuántos años tienes?" Best answer:', 'Tengo treinta años', ['Soy treinta años', 'Estoy treinta años', 'Hago treinta años'], 'Age is something you have.'),
					L('No puedo, tengo que trabajar', 'I cannot, I have to work.')
				]
			},
			{
				id: 'es-gus-1', title: 'Me gusta, me levanto', sub: 'Backwards verbs and reflexives',
				steps: [
					I('Gustar runs backwards', '<b>Me gusta el café</b> literally says "coffee pleases me". The thing liked is the subject.<br>One thing or a verb: <b>gusta</b>. Several things: <b>gustan</b>.<br>Who likes it: <b>me, te, le, nos, les</b>.', 'Me gusta el café. Me gustan los gatos.'),
					T('Me _____ el café (gustar)', 'gusta'),
					T('Me _____ los gatos (gustar)', 'gustan', 'Plural thing, plural verb.'),
					I('A mí, a ti, a Ana', 'Add <b>a + person</b> to stress or clarify, and keep the small pronoun anyway.<br><b>A mí me gusta</b> · <b>a ti te gusta</b> · <b>a Ana le gusta</b><br>The thing liked needs its article: Me gusta <b>el</b> chocolate.', 'A mí me gusta. A Ana le gusta bailar.'),
					T('A ella _____ gusta bailar', 'le'),
					I('The same pattern', '<b>encantar</b> (to love): Me encanta esta canción.<br><b>doler</b> (to hurt): Me duele la cabeza.<br><b>interesar</b>, <b>molestar</b>, <b>faltar</b>, <b>parecer</b>: ¿Qué te parece?<br><b>Me da igual</b> = I do not mind either way.', 'Me encanta esta canción. Me duele la cabeza. ¿Qué te parece?'),
					T('My head hurts (doler, la cabeza)', 'me duele la cabeza', 'Not "mi cabeza": Spanish uses la with body parts.'),
					C('"¿Te gusta el flamenco?" You love it:', 'Sí, me encanta', ['Sí, yo encanto', 'Sí, lo encanto', 'Sí, soy encantar'], 'encantar works like gustar: me encanta.'),
					I('Reflexives', 'The action comes back to the subject. The pronoun goes before the verb.<br><b>levantarse</b>: me levanto, te levantas, se levanta, nos levantamos, se levantan<br>Daily routine is full of them: <b>despertarse</b> (ie), <b>ducharse</b>, <b>vestirse</b> (i), <b>acostarse</b> (ue), <b>llamarse</b>.', 'me levanto. te levantas. se levanta. nos levantamos. se levantan.'),
					T('Yo _____ a las siete (levantarse)', 'me levanto'),
					T('Ella _____ tarde (acostarse)', 'se acuesta', 'acostarse is o to ue: me acuesto, se acuesta.'),
					L('¿Cómo te llamas?', 'What is your name? Literally: what do you call yourself?')
				]
			}
		]
	},
	{
		title: 'El pasado',
		sub: 'Three past tenses and when each one fits',
		lessons: [
			{
				id: 'es-ind-1', title: 'Ayer: hablé, habló', sub: 'Pretérito indefinido',
				steps: [
					I('Finished actions: -ar', '<b>hablar</b>: habl<b>é</b>, habl<b>aste</b>, habl<b>ó</b>, habl<b>amos</b>, habl<b>aron</b><br>The accent is the whole difference: <b>hablo</b> = I speak, <b>habló</b> = he or she spoke.', 'hablé. hablaste. habló. hablamos. hablaron.'),
					T('Ayer yo _____ con ella (hablar)', 'hablé'),
					T('Ayer él _____ conmigo (hablar)', 'habló'),
					I('-er and -ir share endings', '<b>comer</b>: com<b>í</b>, com<b>iste</b>, com<b>ió</b>, com<b>imos</b>, com<b>ieron</b><br><b>vivir</b>: viví, viviste, vivió, vivimos, vivieron', 'comí. comiste. comió. comimos. comieron.'),
					T('Anoche yo _____ pizza (comer)', 'comí'),
					T('Ellos _____ en Chile dos años (vivir)', 'vivieron', 'A closed period of time, however long, takes the indefinido.'),
					I('Spelling protects the sound', 'Only in the yo form:<br>bus<b>car</b>: bus<b>qué</b> · lle<b>gar</b>: lle<b>gué</b> · empe<b>zar</b>: empe<b>cé</b><br>The others are normal: buscó, llegó, empezó.', 'busqué. llegué. empecé.'),
					T('I arrived (llegar)', 'llegué', null, ['yo llegué']),
					I('The irregular gang has no accents', 'ser and ir share one set: <b>fui, fuiste, fue, fuimos, fueron</b><br>hacer: <b>hice</b>, hiciste, <b>hizo</b> · tener: <b>tuve</b>, <b>tuvo</b> · estar: <b>estuve</b>, <b>estuvo</b><br>poder: <b>pude</b>, <b>pudo</b> · venir: <b>vine</b>, <b>vino</b> · decir: <b>dije</b>, <b>dijo</b>, <b>dijeron</b><br>yo ends in -e and él in -o, both unstressed.', 'fui. fue. hice. hizo. tuve. tuvo. dije. dijo.'),
					T('Ayer yo _____ al cine (ir)', 'fui'),
					T('Ella _____ la cena (hacer)', 'hizo', 'hizo with z, to keep the sound of hice.'),
					C('Ellos _____ la verdad. (decir)', 'dijeron', ['dijieron', 'decieron', 'dicieron'], 'After the j the i drops: dijeron, trajeron, condujeron.')
				]
			},
			{
				id: 'es-imp-1', title: 'Era, tenía, iba', sub: 'Imperfecto, and the big contrast',
				steps: [
					I('Used to, was doing', '<b>hablar</b>: habl<b>aba</b>, habl<b>abas</b>, habl<b>aba</b>, habl<b>ábamos</b>, habl<b>aban</b><br><b>comer, vivir</b>: com<b>ía</b>, com<b>ías</b>, com<b>ía</b>, com<b>íamos</b>, com<b>ían</b><br>yo and él are identical.', 'hablaba. hablábamos. comía. comíamos.'),
					T('De niño yo _____ en un pueblo (vivir)', 'vivía'),
					T('Antes ella _____ mucho (trabajar)', 'trabajaba'),
					I('Only three irregulars', 'ser: <b>era</b>, eras, era, éramos, eran<br>ir: <b>iba</b>, ibas, iba, íbamos, iban<br>ver: <b>veía</b>, veías, veía, veíamos, veían', 'era. iba. veía.'),
					T('Cuando yo _____ niño (ser)', 'era'),
					T('Nosotros _____ a la playa cada verano (ir)', 'íbamos', 'A repeated habit in the past.'),
					I('Event vs background', '<b>Indefinido</b>: what happened, once, finished. Signals: ayer, anoche, el año pasado, de repente.<br><b>Imperfecto</b>: the scene, habits, age, time, weather, what was going on. Signals: siempre, cada día, de niño, mientras.<br><b>Llovía cuando salí.</b> = It was raining when I went out.', 'Llovía cuando salí.'),
					C('Yo _____ cuando me llamaste.', 'dormía', ['dormí', 'duermo', 'duerma'], 'An ongoing background action, interrupted by an event: imperfecto.'),
					C('Ayer _____ al médico y me dio una receta.', 'fui', ['voy', 'iré', 'vaya'], 'One finished event: indefinido.'),
					I('Verbs that change meaning', '<b>sabía</b> = I knew · <b>supe</b> = I found out<br><b>conocía</b> = I knew (someone) · <b>conocí</b> = I met<br><b>quería</b> = I wanted · <b>no quise</b> = I refused<br><b>podía</b> = I was able · <b>pude</b> = I managed', 'sabía. supe. conocía. conocí.'),
					C('"Conocí a Marta en 2019" means', 'I met Marta in 2019', ['I already knew Marta in 2019', 'I wanted to meet Marta in 2019', 'I forgot Marta in 2019'], 'conocer in the indefinido = to meet for the first time.'),
					T('Eran las diez y _____ mucho (llover)', 'llovía', 'Time and weather set the scene: imperfecto.')
				]
			},
			{
				id: 'es-perf-1', title: 'He hecho', sub: 'Pretérito perfecto, and who uses it',
				steps: [
					I('Have done', '<b>haber</b> + participle: <b>he, has, ha, hemos, han</b><br>-ar gives <b>-ado</b>, -er and -ir give <b>-ido</b>: hablado, comido, vivido.<br>Nothing goes between the two parts: <b>No lo he visto.</b>', 'he hablado. has comido. ha vivido.'),
					T('Yo _____ comido (haber)', 'he'),
					T('¿Has _____ en México? (estar)', 'estado'),
					I('Irregular participles', 'hacer: <b>hecho</b> · decir: <b>dicho</b> · ver: <b>visto</b> · poner: <b>puesto</b><br>volver: <b>vuelto</b> · escribir: <b>escrito</b> · abrir: <b>abierto</b> · romper: <b>roto</b> · morir: <b>muerto</b>', 'hecho. dicho. visto. puesto. vuelto. escrito. abierto. roto.'),
					T('¿Qué has _____? (hacer)', 'hecho'),
					T('No he _____ la película (ver)', 'visto'),
					I('Spain vs Latin America', 'In Spain, anything inside a time period that is still running (hoy, esta semana, este año) takes the perfecto:<br><b>Hoy he desayunado tarde.</b><br>Most of Latin America uses the indefinido there: <b>Hoy desayuné tarde.</b><br>Everyone uses the perfecto for life experience: <b>¿Has estado en Perú?</b>', 'Hoy he desayunado tarde. Hoy desayuné tarde.'),
					C('Madrid says "Hoy he ido al gimnasio". Most Mexicans say', 'Hoy fui al gimnasio', ['Hoy soy ido al gimnasio', 'Hoy voy ido al gimnasio', 'Hoy había al gimnasio'], 'Same meaning. Latin America prefers the indefinido for finished actions, even today.'),
					I('Ya, todavía no, nunca', '<b>ya</b> = already · <b>todavía no</b> = not yet · <b>nunca</b> = never · <b>alguna vez</b> = ever<br><b>¿Has probado alguna vez el mole?</b><br><b>Todavía no he terminado.</b>', '¿Has probado alguna vez el mole? Todavía no he terminado.'),
					L('Nunca he estado en Argentina', 'I have never been to Argentina.'),
					I('Had done', 'The past before the past: imperfecto of haber + participle.<br><b>había, habías, había, habíamos, habían</b><br><b>Cuando llegué, ya se había ido.</b> = When I arrived, he had already left.', 'Cuando llegué, ya se había ido.'),
					T('Cuando llegué, ella ya _____ salido (haber)', 'había')
				]
			}
		]
	},
	{
		title: 'Futuro y matices',
		sub: 'Plans, pronouns, por and para, and the finer points',
		lessons: [
			{
				id: 'es-fut-1', title: 'Iré, iría', sub: 'Future and conditional',
				steps: [
					I('The future is the infinitive plus an ending', 'One set of endings for every verb: <b>-é, -ás, -á, -emos, -án</b><br><b>hablar</b>: hablaré, hablarás, hablará, hablaremos, hablarán<br>comeré, viviré, seré, estaré, iré. All regular.', 'hablaré. hablarás. hablará. hablaremos. hablarán.'),
					T('Mañana yo _____ contigo (hablar)', 'hablaré'),
					T('El año que viene ellos _____ en Sevilla (vivir)', 'vivirán'),
					I('Twelve bent stems', 'tener: <b>tendr-</b> · poner: <b>pondr-</b> · salir: <b>saldr-</b> · venir: <b>vendr-</b> · valer: <b>valdr-</b><br>poder: <b>podr-</b> · saber: <b>sabr-</b> · querer: <b>querr-</b> · haber: <b>habr-</b> · caber: <b>cabr-</b><br>hacer: <b>har-</b> · decir: <b>dir-</b><br>The endings stay the same: tendré, harás, dirá.', 'tendré. pondré. saldré. vendré. podré. sabré. querré. haré. diré.'),
					T('Mañana yo _____ tiempo (tener)', 'tendré'),
					T('Y tú, ¿qué _____ mañana? (hacer)', 'harás'),
					I('The future of guessing', 'Spanish uses the future to guess about right now.<br><b>¿Dónde estará Juan?</b> = I wonder where Juan is.<br><b>Estará en casa.</b> = He is probably at home.<br><b>Tendrá unos cuarenta años.</b> = She must be about forty.', '¿Dónde estará Juan? Estará en casa.'),
					C('Nobody has a watch. "Serán las ocho" means', 'It is probably eight', ['It was eight', 'It is never eight', 'Be here at eight'], 'Future for a guess about the present.'),
					I('Conditional: would', 'Same stems as the future, with <b>-ía, -ías, -ía, -íamos, -ían</b>.<br>hablaría, comería, <b>tendría</b>, <b>haría</b>, <b>podría</b><br>It also makes requests polite: <b>¿Podrías ayudarme?</b> · <b>Me gustaría un café.</b>', 'hablaría. tendría. haría. ¿Podrías ayudarme?'),
					T('Yo en tu lugar no _____ (ir)', 'iría', 'Yo en tu lugar = if I were you.'),
					T('¿_____ ayudarme? (tú, poder, polite)', 'podrías'),
					L('Me gustaría un café, por favor', 'I would like a coffee, please.')
				]
			},
			{
				id: 'es-pron-1', title: 'Lo, la, le, se lo', sub: 'Object pronouns',
				steps: [
					I('Direct objects', '<b>lo</b> (him, it) · <b>la</b> (her, it) · <b>los</b> · <b>las</b> · and me, te, nos<br>They go before the conjugated verb.<br>¿El libro? <b>Lo</b> tengo. · ¿A María? No <b>la</b> conozco.', 'Lo tengo. No la conozco.'),
					T('¿El libro? Ya _____ tengo (it)', 'lo'),
					T('¿Las llaves? No _____ encuentro (them)', 'las'),
					I('Indirect objects', '<b>le</b> = to him, to her, to you (usted) · <b>les</b> = to them<br><b>Le doy el libro.</b> = I give him or her the book.<br>Spanish repeats it even when the person is named: <b>Le</b> dije <b>a Juan</b> que sí.', 'Le doy el libro. Le dije a Juan que sí.'),
					T('_____ escribí un mensaje a mi madre', 'le', 'The doubling sounds redundant in English and natural in Spanish.'),
					I('Se lo', 'Two pronouns together: person first, thing second.<br><b>Me lo dijo.</b> · <b>Te la mando.</b><br>le or les before lo, la, los, las turns into <b>se</b>:<br>le + lo = <b>se lo</b>. <b>Se lo doy.</b> = I give it to him or her.', 'Me lo dijo. Te la mando. Se lo doy.'),
					T('I give it to her (it = el libro): _____ doy', 'se lo'),
					C('Which is right?', 'Se lo dije ayer', ['Le lo dije ayer', 'Lo se dije ayer', 'Dije se lo ayer'], 'le + lo becomes se lo, and both go before the verb.'),
					I('Before, or glued on the end', 'With an infinitive or a gerund you can choose:<br><b>Lo voy a hacer.</b> = <b>Voy a hacerlo.</b><br><b>Lo estoy haciendo.</b> = <b>Estoy haciéndolo.</b><br>Glued on, the word may need an accent to keep its stress.', 'Lo voy a hacer. Voy a hacerlo. Estoy haciéndolo.'),
					T('I am going to do it: Voy a _____ (hacer + lo)', 'hacerlo'),
					I('Leísmo', 'In much of Spain you will hear <b>le</b> for a man as a direct object: <b>Le vi ayer</b> (a Juan). The Real Academia accepts it for one male person.<br>Latin America says <b>Lo vi ayer</b>. For things it is always lo or la.', 'Le vi ayer. Lo vi ayer.'),
					L('Me lo dijo ayer', 'He or she told me (it) yesterday.')
				]
			},
			{
				id: 'es-por-1', title: 'Por vs para', sub: 'Cause and path, goal and destination',
				steps: [
					I('Para looks forward', 'Goal, destination, recipient, deadline.<br>Estudio <b>para</b> aprender. (purpose: para + infinitive)<br>Es <b>para</b> ti. (recipient)<br><b>Para</b> el lunes. (deadline)<br>Salgo <b>para</b> Madrid. (destination)<br><b>Para mí</b>, es fácil. (opinion)', 'Es para ti. Para el lunes. Para mí, es fácil.'),
					T('Este regalo es _____ ti', 'para'),
					T('Lo necesito _____ el lunes (deadline)', 'para'),
					I('Por looks back, or around', 'Cause, path, exchange, duration, means.<br>Llegué tarde <b>por</b> la lluvia. (because of)<br>Paseamos <b>por</b> el parque. (through, around)<br>Lo compré <b>por</b> diez euros. (in exchange for)<br>Hablamos <b>por</b> teléfono. (by means of)<br>Gracias <b>por</b> venir.', 'Por la lluvia. Por el parque. Por diez euros. Gracias por venir.'),
					T('Gracias _____ todo', 'por'),
					T('Pagué veinte euros _____ el libro', 'por', 'An exchange: money for a thing.'),
					C('Caminamos _____ el parque. (through it)', 'por', ['para', 'a', 'desde'], 'Movement through or around a place = por. "Para el parque" would be towards it.'),
					C('Estudio español _____ trabajar en Chile. (my goal)', 'para', ['por', 'de', 'a'], 'Purpose = para + infinitive.'),
					I('Fixed phrases', '<b>por favor</b> · <b>por fin</b> (at last) · <b>por supuesto</b> (of course) · <b>por cierto</b> (by the way)<br><b>por si acaso</b> (just in case) · <b>por lo menos</b> (at least)<br><b>para siempre</b> (forever) · <b>para nada</b> (not at all) · <b>para colmo</b> (to top it all)', 'por fin. por supuesto. por cierto. por si acaso. para nada.'),
					T('"at last": por _____', 'fin'),
					C('"Este pastel lo hice para ti" means', 'I made this cake to give to you', ['I made this cake because of you', 'I made this cake instead of you', 'You made this cake for me'], 'para = recipient. "Lo hice por ti" would be for your sake or because of you.'),
					L('Por cierto, ¿para qué es esto?', 'By the way, what is this for?')
				]
			},
			{
				id: 'es-peri-1', title: 'Acabo de, llevo, sigo', sub: 'Verb combos that replace whole tenses',
				steps: [
					I('Just did it', '<b>acabar de + infinitive</b> = to have just done.<br><b>Acabo de llegar.</b> = I have just arrived.<br><b>Acababa de salir</b> cuando llamaste. = I had just left when you called.', 'Acabo de llegar.'),
					T('I have just eaten: _____ de comer (acabar)', 'acabo'),
					I('The gerund', '-ar: <b>-ando</b> · -er, -ir: <b>-iendo</b>: hablando, comiendo, viviendo<br>Irregular: decir: <b>diciendo</b> · dormir: <b>durmiendo</b> · pedir: <b>pidiendo</b> · leer: <b>leyendo</b> · ir: <b>yendo</b>', 'hablando. comiendo. diciendo. durmiendo. leyendo.'),
					T('Estoy _____ un libro (leer)', 'leyendo'),
					I('Llevar + gerund', 'How long something has been going on.<br><b>Llevo dos años estudiando español.</b> = I have been studying Spanish for two years.<br>Without a verb too: <b>Llevo una hora aquí.</b><br>Same idea with hace: <b>Hace dos años que estudio español.</b>', 'Llevo dos años estudiando español.'),
					T('_____ tres años viviendo aquí (yo, llevar)', 'llevo'),
					I('Seguir + gerund', 'Still doing, keep doing.<br><b>Sigo trabajando allí.</b> = I still work there.<br><b>¿Sigues viviendo en Roma?</b><br>Never seguir + infinitive.', 'Sigo trabajando allí. ¿Sigues viviendo en Roma?'),
					T('¿_____ trabajando en el banco? (tú, seguir)', 'sigues'),
					I('Again, stop, start', '<b>volver a + infinitive</b> = to do again: <b>Volví a llamar.</b> No lo vuelvo a hacer.<br><b>dejar de + infinitive</b> = to stop: <b>Dejé de fumar.</b><br><b>ponerse a + infinitive</b> = to start suddenly: <b>Se puso a llorar.</b>', 'Volví a llamar. Dejé de fumar. Se puso a llorar.'),
					T('She called again: _____ a llamar (volver)', 'volvió'),
					C('"Dejé de fumar" means', 'I quit smoking', ['I let him smoke', 'I went out to smoke', 'I started smoking'], 'dejar de + infinitive = to stop doing.'),
					L('Llevo una hora esperando', 'I have been waiting for an hour.')
				]
			},
			{
				id: 'es-ser-2', title: 'Ser listo, estar listo', sub: 'Ser and estar, the deep end',
				steps: [
					I('Norm vs impression', 'ser says what something is like by nature. estar says how you find it now, or how it has changed.<br><b>Es guapo.</b> = He is handsome. · <b>Está guapo.</b> = He looks good today.<br><b>La paella es buena aquí.</b> (good quality) · <b>¡Está muy buena!</b> (this one tastes great)', 'Es guapo. Está guapo. ¡Está muy buena!'),
					C('You taste the soup and love it:', '¡Está muy buena!', ['¡Hay muy buena!', '¡Tiene muy buena!', '¡Son muy buena!'], 'How food tastes right now takes estar.'),
					I('Same adjective, two meanings', 'ser <b>listo</b> = clever · estar <b>listo</b> = ready<br>ser <b>aburrido</b> = boring · estar <b>aburrido</b> = bored<br>ser <b>rico</b> = rich · estar <b>rico</b> = tasty<br>ser <b>malo</b> = bad · estar <b>malo</b> = ill (Spain)<br>ser <b>verde</b> = green · estar <b>verde</b> = unripe<br>ser <b>orgulloso</b> = arrogant · estar <b>orgulloso</b> = proud<br>ser <b>seguro</b> = safe · estar <b>seguro</b> = sure', 'ser listo. estar listo. ser aburrido. estar aburrido.'),
					T('I am ready (you are a man)', 'estoy listo', 'soy listo would be "I am clever".', ['yo estoy listo']),
					C('"Mi profesor es aburrido" means', 'My teacher is boring', ['My teacher is bored', 'My teacher is tired', 'My teacher is annoyed'], 'ser aburrido = boring. está aburrido = he is bored.'),
					T('Este jamón _____ muy rico (it tastes great)', 'está'),
					C('In Spain, "Carlos está malo" means', 'Carlos is ill', ['Carlos is a bad person', 'Carlos is bad at it', 'Carlos is angry'], 'es malo = he is a bad person. está malo = he is unwell.'),
					I('Results take estar', 'A state that results from a change takes estar, however permanent.<br><b>Está muerto.</b> (dead) · <b>Está roto.</b> (broken) · <b>Está abierto.</b> (open) · <b>Está casada.</b> (married)<br>"Dead" with estar surprises everyone. It is the result of dying.', 'Está muerto. Está roto. Está abierto.'),
					T('El pez _____ muerto', 'está'),
					I('Action or result', '<b>ser + participle</b> = the action (passive): La puerta <b>fue abierta</b> por el guardia.<br><b>estar + participle</b> = the state afterwards: La puerta <b>está abierta</b>.', 'La puerta fue abierta por el guardia. La puerta está abierta.'),
					C('La tienda _____ abierta hasta las nueve.', 'está', ['es', 'hay', 'tiene'], 'A resulting state: estar + participle.'),
					L('No estoy segura, pero creo que sí', 'I am not sure, but I think so.')
				]
			}
		]
	},
	{
		title: 'Subjuntivo',
		sub: 'Wishes, doubts, what-ifs and orders',
		lessons: [
			{
				id: 'es-subj-1', title: 'Quiero que vengas', sub: 'Present subjunctive and its triggers',
				steps: [
					I('The form', 'Take the yo form of the present, drop the -o, use the opposite vowel.<br><b>hablar</b>: habl<b>e</b>, habl<b>es</b>, habl<b>e</b>, habl<b>emos</b>, habl<b>en</b><br><b>comer, vivir</b>: com<b>a</b>, com<b>as</b>, com<b>a</b>, com<b>amos</b>, com<b>an</b><br>Irregular yo forms carry over: tengo gives <b>tenga</b>, hago gives <b>haga</b>, digo gives <b>diga</b>, conozco gives <b>conozca</b>.', 'hable. hables. coma. comas. tenga. haga. diga.'),
					I('When', 'Two different subjects joined by <b>que</b>, after a wish, an emotion, a doubt or an order.<br><b>Quiero ir.</b> (I want to go: one subject, infinitive)<br><b>Quiero que vayas.</b> (I want you to go: two subjects, subjunctive)<br>Triggers: quiero que, espero que, me alegro de que, dudo que, es importante que, ojalá.', 'Quiero ir. Quiero que vayas.'),
					T('Quiero que tú _____ conmigo (venir)', 'vengas', 'vengo gives venga, vengas.'),
					T('Espero que ustedes _____ tiempo (tener)', 'tengan'),
					I('Six real irregulars', 'ser: <b>sea</b> · estar: <b>esté</b> · ir: <b>vaya</b><br>haber: <b>haya</b> · saber: <b>sepa</b> · dar: <b>dé</b>', 'sea. esté. vaya. haya. sepa. dé.'),
					T('Espero que _____ bien (tú, estar)', 'estés'),
					I('Ojalá', 'From Arabic, "may God will it". It means "I hope" or "if only", and it always takes the subjunctive, with or without que.<br><b>Ojalá llueva.</b> · <b>Ojalá que puedas venir.</b>', 'Ojalá llueva. Ojalá que puedas venir.'),
					T('Ojalá _____ sol mañana (hacer)', 'haga', 'hace sol = it is sunny. hago gives haga.'),
					C('Which is right?', 'No creo que sea verdad', ['No creo que ser verdad', 'No creo que será verdad', 'No creo que fue verdades'], 'creo que + indicative (Creo que es verdad). no creo que + subjunctive.'),
					T('Es importante que nosotros _____ (hablar)', 'hablemos'),
					C('Quiero _____ español. (I want to learn it myself)', 'aprender', ['que aprendo', 'aprendo', 'aprendiendo'], 'Same subject: plain infinitive, no que.'),
					L('Ojalá puedas venir', 'I hope you can come.')
				]
			},
			{
				id: 'es-subj-2', title: 'Cuando llegues', sub: 'Time, purpose and aunque',
				steps: [
					I('Cuando + future idea', 'When the action has not happened yet, <b>cuando</b> takes the subjunctive. Never the future tense.<br><b>Cuando llegues, llámame.</b> = When you arrive, call me.<br>A habit keeps the indicative: Cuando <b>llego</b> a casa, ceno.<br>Same for <b>en cuanto</b> (as soon as), <b>hasta que</b> (until), <b>después de que</b>.', 'Cuando llegues, llámame.'),
					T('Cuando _____ a casa, te llamo (yo, llegar)', 'llegue', 'llegar: llegue, with u to keep the hard g.'),
					C('Cuando _____ tiempo, iré a verte.', 'tenga', ['tendré', 'tengo', 'tener'], 'Future idea after cuando = present subjunctive.'),
					I('Para que', '<b>para que</b> = so that. Always subjunctive.<br><b>Te lo explico para que lo entiendas.</b><br>Same subject on both sides: just para + infinitive. Estudio <b>para aprender</b>.', 'Te lo explico para que lo entiendas.'),
					T('Te lo digo para que lo _____ (tú, saber)', 'sepas'),
					I('Aunque, two ways', '<b>aunque + indicative</b> = although (a fact): <b>Aunque llueve</b>, salgo. It is raining and I am going out.<br><b>aunque + subjunctive</b> = even if (open, or beside the point): <b>Aunque llueva</b>, saldré.', 'Aunque llueve, salgo. Aunque llueva, saldré.'),
					C('"Aunque llueva, iré" means', 'Even if it rains, I will go', ['Because it rains, I will go', 'Although it rained, I went', 'When it rains, I go'], 'Subjunctive after aunque: the rain is only a possibility.'),
					I('Always subjunctive', '<b>antes de que</b> (before) · <b>sin que</b> (without) · <b>a menos que</b> (unless)<br><b>con tal de que</b> (provided that) · <b>en caso de que</b> (in case)<br>Sal <b>antes de que sea</b> tarde.', 'Sal antes de que sea tarde.'),
					T('Llámame antes de que ellos _____ (salir)', 'salgan'),
					L('En cuanto puedas, avísame', 'As soon as you can, let me know.'),
					I('Someone who, whatever you', 'Unknown or not yet found: subjunctive.<br>Busco a alguien que <b>hable</b> ruso. (anyone who does)<br>Conozco a alguien que <b>habla</b> ruso. (a real person)<br>And the generous phrases: <b>como quieras</b>, <b>cuando quieras</b>, <b>lo que quieras</b>.', 'Busco a alguien que hable ruso. Como quieras.'),
					T('"As you wish": Como tú _____ (querer)', 'quieras')
				]
			},
			{
				id: 'es-subj-3', title: 'Si tuviera', sub: 'Imperfect subjunctive and if clauses',
				steps: [
					I('The form', 'Take the ellos form of the indefinido, drop <b>-ron</b>, add <b>-ra, -ras, -ra, -ramos, -ran</b>.<br>hablaron: <b>hablara</b> · tuvieron: <b>tuviera</b> · fueron: <b>fuera</b> · dijeron: <b>dijera</b><br>nosotros takes an accent: tuvi<b>é</b>ramos, habl<b>á</b>ramos.<br>There is a twin in -se (tuviese, fuese) with the same meaning, more common in Spain and in writing.', 'hablara. tuviera. fuera. dijera. tuviéramos.'),
					T('Si yo _____ tiempo, viajaría más (tener)', 'tuviera', null, ['tuviese']),
					T('Si yo _____ tú, no iría (ser)', 'fuera', '"Si yo fuera tú" = if I were you.', ['fuese']),
					I('The unreal if', 'Not true now, or unlikely: <b>si + imperfect subjunctive, conditional</b>.<br><b>Si tuviera dinero, viajaría.</b><br>A real possibility stays in the present: <b>Si tengo tiempo, voy.</b><br>After si, never the conditional and never the present subjunctive.', 'Si tuviera dinero, viajaría. Si tengo tiempo, voy.'),
					C('Which is right?', 'Si pudiera, te ayudaría', ['Si podría, te ayudaría', 'Si pueda, te ayudaría', 'Si pudiera, te ayude'], 'poder: pudieron, pudiera. Then the conditional.'),
					T('Si nosotros _____ más dinero, compraríamos una casa (tener)', 'tuviéramos', null, ['tuviésemos']),
					I('After a past trigger', 'When the wish or order is in the past or the conditional, the subjunctive moves back too.<br>Quiero que <b>vengas</b>. · Quería que <b>vinieras</b>.<br>Me pidió que lo <b>hiciera</b>.<br><b>como si</b> (as if) always takes it: Habla como si <b>fuera</b> el jefe.', 'Quería que vinieras. Habla como si fuera el jefe.'),
					T('Me pidió que lo _____ (yo, hacer)', 'hiciera', 'hicieron gives hiciera.', ['hiciese']),
					C('"Habla como si lo supiera todo" means', 'He talks as if he knew everything', ['He talks because he knows everything', 'He talked when he knew everything', 'He says he knows everything'], 'como si + imperfect subjunctive. saber: supieron, supiera.'),
					I('Regrets: the third if', 'For a past that cannot be changed:<br><b>si + hubiera + participle, habría + participle</b><br><b>Si hubiera sabido, habría venido.</b> = If I had known, I would have come.<br>In speech the second half is often <b>hubiera venido</b> as well.', 'Si hubiera sabido, habría venido.'),
					T('Si lo _____ sabido, habría venido (yo, haber)', 'hubiera', null, ['hubiese']),
					L('Si yo fuera tú, no lo haría', 'If I were you, I would not do it.')
				]
			},
			{
				id: 'es-mand-1', title: 'Dime, no me digas', sub: 'The imperative, with pronouns',
				steps: [
					I('Telling a friend: tú', 'The tú command looks like the él form of the present: <b>habla</b>, <b>come</b>, <b>escribe</b>.<br>Eight short irregulars: decir: <b>di</b> · hacer: <b>haz</b> · ir: <b>ve</b> · poner: <b>pon</b><br>salir: <b>sal</b> · ser: <b>sé</b> · tener: <b>ten</b> · venir: <b>ven</b>', 'di. haz. ve. pon. sal. sé. ten. ven.'),
					T('_____ la verdad (tú, decir)', 'di'),
					T('_____ aquí (tú, venir)', 'ven'),
					I('Negative: the subjunctive takes over', '<b>no</b> + tú form of the present subjunctive.<br>habla: <b>no hables</b> · come: <b>no comas</b> · di: <b>no digas</b> · ve: <b>no vayas</b> · haz: <b>no hagas</b>', 'no hables. no comas. no digas. no vayas.'),
					T('No _____ eso (tú, decir)', 'digas'),
					I('Usted, ustedes, nosotros', 'These always use the subjunctive, yes or no.<br><b>Pase</b>, por favor. · <b>Hablen</b> más despacio. · No <b>se preocupe</b>.<br>"Let\'s": <b>Hablemos</b>. · <b>Vamos</b> (the one exception, not "vayamos").', 'Pase, por favor. No se preocupe. Hablemos.'),
					T('_____, por favor (usted, pasar: "come in")', 'pase'),
					I('Where the pronouns go', 'Affirmative: glued to the end, with an accent to hold the stress.<br><b>dime</b> · <b>dámelo</b> · <b>siéntate</b> · <b>cuéntamelo</b><br>Negative: before the verb, as separate words.<br><b>no me digas</b> · <b>no me lo des</b> · <b>no te sientes</b>', 'dime. dámelo. siéntate. no me digas. no me lo des.'),
					T('Tell me (tú, decir + me)', 'dime'),
					T('Give it to me (tú, dar + me + lo)', 'dámelo', 'da + me + lo. The accent keeps the stress on da.'),
					C('The negative of "Dímelo" is', 'No me lo digas', ['No dímelo', 'No digas me lo', 'No lo me digas'], 'Pronouns jump in front, person before thing, and the verb goes subjunctive.'),
					L('Siéntate y cuéntamelo todo', 'Sit down and tell me everything.')
				]
			}
		]
	},
	{
		title: 'Sonar natural',
		sub: 'Connectors, fillers and how each country talks',
		lessons: [
			{
				id: 'es-con-1', title: 'Sin embargo, o sea, es que', sub: 'Connectors that hold your Spanish together',
				steps: [
					I('Contrast', '<b>pero</b> = but · <b>sin embargo</b> = however · <b>aunque</b> = although<br><b>en cambio</b> = whereas, on the other hand · <b>no obstante</b> = nevertheless (formal)<br>Me gusta el mar. Mi hermano, <b>en cambio</b>, prefiere la montaña.', 'sin embargo. en cambio. no obstante.'),
					T('"however": sin _____', 'embargo'),
					I('Consequence', '<b>por eso</b> = that is why · <b>así que</b> = so<br><b>por lo tanto</b> = therefore · <b>de modo que</b> = so that, with the result that<br>No tenía hambre, <b>así que</b> no cené.', 'por eso. así que. por lo tanto.'),
					T('"therefore": por lo _____', 'tanto'),
					I('O sea, es que', '<b>o sea</b> = I mean, in other words. The most used glue in spoken Spanish. In writing, <b>es decir</b>.<br><b>es que</b> = the thing is. It opens an excuse or an explanation:<br>¿Vienes? <b>Es que</b> no tengo tiempo.', 'o sea. es decir. Es que no tengo tiempo.'),
					C('You are late and want to explain yourself. Start with:', 'Es que...', ['Sin embargo...', 'Por lo tanto...', 'A pesar de que...'], 'es que introduces a reason or an excuse.'),
					T('"I mean, in other words" (two words, spoken)', 'o sea', null, ['es decir']),
					I('These need the subjunctive', '<b>con tal de que</b> = provided that: Te lo presto <b>con tal de que</b> me lo <b>devuelvas</b>.<br><b>a no ser que</b> = unless: Iré, a no ser que <b>llueva</b>.<br><b>por mucho que</b> = however much: Por mucho que <b>insistas</b>, no voy.<br><b>a pesar de que</b> = even though. With a known fact it takes the indicative: A pesar de que <b>estaba</b> cansado, salió.', 'Te lo presto con tal de que me lo devuelvas.'),
					T('Te lo presto con tal de que me lo _____ (tú, devolver)', 'devuelvas', 'devolver is o to ue: devuelvo, devuelvas.'),
					I('Adding and wrapping up', '<b>además</b> = besides · <b>encima</b> = on top of that (spoken, annoyed)<br><b>de hecho</b> = in fact · <b>por un lado... por otro</b> = on one hand... on the other<br><b>al fin y al cabo</b> = after all · <b>en resumen</b> = in short', 'además. de hecho. al fin y al cabo. en resumen.'),
					T('"in fact": de _____', 'hecho'),
					L('A pesar de todo, valió la pena', 'In spite of everything, it was worth it.')
				]
			},
			{
				id: 'es-conv-1', title: 'Pues, vale, qué va', sub: 'Fillers and reactions',
				steps: [
					I('Buying time', 'Natives judge fluency by these.<br><b>pues</b> = well... · <b>bueno</b> = well, OK · <b>a ver</b> = let me see<br><b>o sea</b> = I mean · <b>¿sabes?</b> = you know? · <b>¿no?</b> = right?', 'pues. bueno. a ver. o sea. ¿sabes?'),
					C('You need a second to think before you answer. Say:', 'Pues...', ['Qué va', 'Anda ya', 'De nada'], 'pues at the start of a sentence = "well...".'),
					I('Agreeing', '<b>vale</b> = OK (Spain, constantly) · <b>claro</b> = of course · <b>ya</b> = yeah, I know<br><b>eso</b> = exactly · <b>de acuerdo</b> = agreed<br>Latin America: <b>dale</b>, <b>listo</b>, <b>bueno</b>, and in Mexico <b>sale</b>.', 'vale. claro. ya. eso. de acuerdo. dale.'),
					T('"OK" in Spain (one word)', 'vale'),
					I('Not buying it', '<b>¡Qué va!</b> = not at all, no way<br><b>¡Anda ya!</b> = come off it (Spain)<br><b>¿En serio?</b> = seriously? · <b>¡No me digas!</b> = you don\'t say!', '¡Qué va! ¡Anda ya! ¿En serio? ¡No me digas!'),
					C('"¿Estás enfadado?" "¡Qué va!" The answer means', 'Not at all!', ['Very much!', 'Who is going?', 'What is happening?'], 'qué va flatly denies what was just said.'),
					C('A friend says he had lunch with the king. You do not believe a word:', '¡Anda ya!', ['¡De nada!', '¡Buen provecho!', '¡Vale, gracias!'], 'anda ya = come off it.'),
					I('En plan', 'In Spain, young people put <b>en plan</b> where English puts "like".<br>Estaba <b>en plan</b> tranquilo. · Me dijo <b>en plan</b>: "ni hablar".<br>Argentina does the same job with <b>tipo</b>. Fine with friends, out of place in an interview.', 'Estaba en plan tranquilo.'),
					T('Y me dijo en _____: "ni hablar" (like)', 'plan'),
					I('Quick reactions', '<b>¡Qué bien!</b> = great! · <b>¡Qué pena!</b> = what a shame · <b>¡Qué fuerte!</b> = wow, that is heavy (Spain)<br><b>¡Menos mal!</b> = thank goodness · <b>¡Ni idea!</b> = no idea · <b>¡Ojo!</b> = careful!<br><b>¡Venga!</b> = come on, or OK bye (Spain)', '¡Qué bien! ¡Qué pena! ¡Menos mal! ¡Ni idea! ¡Ojo!'),
					T('"Thank goodness!": ¡Menos _____!', 'mal'),
					L('Pues nada, ya veremos', 'Well, anyway, we will see.')
				]
			},
			{
				id: 'es-reg-1', title: 'Tío, güey, che', sub: 'Spain, Mexico and the Río de la Plata',
				steps: [
					I('Spain: vosotros', 'Spain has an informal plural "you" that Latin America does not use.<br><b>vosotros habláis, coméis, vivís</b> · <b>sois</b>, <b>estáis</b>, <b>tenéis</b>, <b>queréis</b><br>Its pronoun is <b>os</b> and its possessive <b>vuestro</b>: ¿Os gusta vuestra casa?<br>In Latin America all of this is <b>ustedes</b>.', 'habláis. coméis. vivís. sois. tenéis. ¿Os gusta vuestra casa?'),
					T('¿Vosotros _____ de aquí? (ser)', 'sois'),
					T('¿Qué _____ vosotros? (querer)', 'queréis'),
					I('Spain: street words', '<b>tío, tía</b> = dude, mate (literally uncle, aunt)<br><b>guay</b> = cool · <b>me mola</b> = I like it · <b>majo</b> = nice, friendly<br><b>currar</b> = to work · <b>flipar</b> = to be amazed: Estoy flipando.', 'tío. guay. me mola. majo. currar. flipar.'),
					C('"¡Qué guay, tío!" means', 'How cool, dude!', ['What an uncle!', 'How expensive, man!', 'What a mess, man!']),
					I('Mexico', '<b>güey</b> (sounds like "way") = dude · <b>órale</b> = OK, wow, let\'s go<br><b>ahorita</b> = right now, or in a while, or possibly never<br><b>chido</b> and <b>padre</b> = cool: ¡Qué padre!<br><b>¿mande?</b> = pardon? · <b>no manches</b> = no way', 'güey. órale. ahorita. ¡Qué padre! ¿Mande? No manches.'),
					C('In Mexico, "ahorita lo hago" promises', 'that it will get done at some point', ['that it was done yesterday', 'that someone else will do it', 'that it cannot be done'], 'ahorita is elastic. It can be this second or much later.'),
					T('Mexican for "How cool!": ¡Qué _____! (the word also means father)', 'padre'),
					I('Río de la Plata: vos and che', 'Argentina and Uruguay say <b>vos</b> instead of tú, with its own forms, stressed on the end:<br><b>vos hablás, comés, vivís</b> · <b>sos</b> · <b>tenés</b> · <b>querés</b> · <b>podés</b><br>Commands: <b>hablá</b>, <b>vení</b>, <b>decime</b>.<br><b>che</b> = hey, mate. And ll and y sound like "sh": <b>calle</b> = KAH-sheh, <b>yo</b> = "sho".', 'vos hablás. vos sos. vos tenés. Che, vení.'),
					T('Vos _____ razón (tener)', 'tenés'),
					T('¿De dónde _____ vos? (ser)', 'sos'),
					C('"Che, ¿venís con nosotros?" is typical of', 'Argentina and Uruguay', ['Mexico', 'Spain', 'Cuba'], 'che plus the vos form venís.')
				]
			}
		]
	},
	{
		title: 'Nivel nativo',
		sub: 'Idioms, register and words that turn heads',
		lessons: [
			{
				id: 'es-idi-1', title: 'Meter la pata', sub: 'Idioms people really use',
				steps: [
					I('Five you will hear this week', '<b>estar en las nubes</b> = to have your head in the clouds<br><b>ser pan comido</b> = to be a piece of cake (eaten bread)<br><b>meter la pata</b> = to put your foot in it<br><b>tomar el pelo</b> = to pull someone\'s leg (take their hair)<br><b>no tener pelos en la lengua</b> = to speak bluntly (no hairs on the tongue)', 'estar en las nubes. ser pan comido. meter la pata. tomar el pelo.'),
					C('"El examen fue pan comido" means', 'The exam was a piece of cake', ['The exam was after lunch', 'The exam was out of date', 'I failed the exam']),
					T('Perdón, metí la _____ (I messed up)', 'pata'),
					C('"¿Me estás tomando el pelo?" means', 'Are you pulling my leg?', ['Are you cutting my hair?', 'Are you following me?', 'Are you ignoring me?']),
					T('Estás en las _____ (daydreaming)', 'nubes'),
					I('Five more', '<b>costar un ojo de la cara</b> = to cost an arm and a leg<br><b>echar una mano</b> = to lend a hand<br><b>dar en el clavo</b> = to hit the nail on the head<br><b>quedarse en blanco</b> = to go blank<br><b>ponerse las pilas</b> = to get your act together (put your batteries in)', 'echar una mano. dar en el clavo. quedarse en blanco. ponerse las pilas.'),
					T('¿Me echas una _____? (lend me a hand)', 'mano'),
					C('"Ana no tiene pelos en la lengua" means', 'Ana says exactly what she thinks', ['Ana never speaks', 'Ana has a lisp', 'Ana lies a lot']),
					C('"Me costó un ojo de la cara" means', 'It cost me a fortune', ['It hurt my eye', 'It was a bargain', 'I saw it with my own eyes']),
					I('Refranes', 'Proverbs are alive in Spanish. People say the first half and let you finish.<br><b>Más vale tarde que nunca.</b> = Better late than never.<br><b>A quien madruga, Dios le ayuda.</b> = The early bird catches the worm.<br><b>No hay mal que por bien no venga.</b> = Every cloud has a silver lining.', 'Más vale tarde que nunca. A quien madruga, Dios le ayuda.'),
					T('Más vale tarde que _____', 'nunca'),
					L('Ponte las pilas, que llegamos tarde', 'Get a move on, we are going to be late.')
				]
			},
			{
				id: 'es-c2-1', title: 'Palabras que impresionan', sub: 'Precise words and formal register',
				steps: [
					I('Words with no English twin', '<b>sobremesa</b> = the long chat at the table after a meal<br><b>madrugar</b> = to get up very early · <b>trasnochar</b> = to stay up very late<br><b>estrenar</b> = to use or wear for the first time<br><b>vergüenza ajena</b> = embarrassment you feel for someone else<br><b>friolero</b> = someone who always feels cold', 'sobremesa. madrugar. trasnochar. estrenar. vergüenza ajena. friolero.'),
					T('to get up very early (one verb)', 'madrugar'),
					C('"Hoy estreno zapatos" means', 'I am wearing my shoes for the first time today', ['I am buying shoes today', 'I am cleaning my shoes today', 'I lost my shoes today']),
					I('Precise verbs', '<b>matizar</b> = to qualify, add nuance · <b>plantear</b> = to raise (a question, a problem)<br><b>abordar</b> = to tackle · <b>aportar</b> = to contribute<br><b>conllevar</b> = to entail · <b>desentrañar</b> = to unravel, get to the bottom of', 'matizar. plantear. abordar. aportar. conllevar. desentrañar.'),
					T('Quisiera _____ una cosa (add a nuance)', 'matizar'),
					I('Adjectives with flavor', '<b>imprescindible</b> = indispensable · <b>entrañable</b> = endearing, dear to the heart<br><b>rocambolesco</b> = bizarre, far-fetched · <b>escueto</b> = terse, to the point<br><b>inverosímil</b> = implausible · <b>acogedor</b> = cosy · <b>efímero</b> = short-lived', 'imprescindible. entrañable. rocambolesco. escueto. inverosímil. acogedor.'),
					C('"Una historia rocambolesca" is', 'a bizarre, far-fetched story', ['a romantic story', 'a boring story', 'a very short story']),
					T('indispensable (one word, starts with im-)', 'imprescindible'),
					I('Formal register', '<b>no obstante</b> = nevertheless · <b>asimismo</b> = likewise · <b>dado que</b> = given that<br><b>cabe destacar que</b> = it is worth noting that · <b>en cuanto a</b> = as for<br><b>a raíz de</b> = as a result of · <b>de antemano</b> = in advance<br>A formal email: <b>Estimada señora García:</b> · <b>Le escribo para...</b> · <b>Quedo a la espera de su respuesta.</b> · <b>Un cordial saludo.</b>', 'no obstante. asimismo. cabe destacar que. Quedo a la espera de su respuesta.'),
					T('Le agradezco de _____ su ayuda (in advance)', 'antemano'),
					C('A formal email ends with', 'Quedo a la espera de su respuesta. Un cordial saludo.', ['Venga, nos vemos, tío.', 'Órale, ahí me avisas.', 'Bueno, chao, besitos.']),
					L('Cabe destacar que no es imprescindible', 'It is worth noting that it is not indispensable.')
				]
			}
		]
	}
];

// Placement test: one band per CEFR level, easiest first. Production-heavy, because recognising an answer overstates what you can say.
const PLACEMENT = [
	{ band: 'A1', steps: [
		C('"Buenos días, ¿qué tal?" means', 'Good morning, how are you?', ['Good night, sleep well', 'Good day, see you later', 'Good luck with everything']),
		T('Yo _____ estudiante (ser)', 'soy'),
		C('¿Tú _____ café?', 'quieres', ['quiero', 'quieren', 'queremos']),
		T('Nosotros _____ español (hablar)', 'hablamos')
	] },
	{ band: 'A2', steps: [
		T('Ayer yo _____ al mercado (ir)', 'fui'),
		T('Ayer ella _____ la cena (hacer)', 'hizo'),
		C('De niño, yo _____ en la calle todos los días', 'jugaba', ['jugué', 'juego', 'jugaría']),
		T('Me _____ los perros (gustar)', 'gustan')
	] },
	{ band: 'B1', steps: [
		T('Espero que tú _____ bien (estar)', 'estés'),
		T('Mañana yo _____ tiempo (tener)', 'tendré'),
		C('¿El libro? _____ di a María ayer.', 'Se lo', ['Le lo', 'Lo le', 'Se la']),
		T('¿Qué has _____ hoy? (hacer)', 'hecho')
	] },
	{ band: 'B2', steps: [
		T('Si yo _____ dinero, viajaría más (tener)', 'tuviera', undefined, ['tuviese']),
		T('Cuando _____ a casa, llámame (tú, llegar)', 'llegues'),
		C('"Llevo dos años viviendo aquí" means', 'I have been living here for two years', ['I lived here two years ago', 'I will live here for two years', 'I moved here twice']),
		C('Aunque _____ mañana, iremos a la playa. (even if)', 'llueva', ['lloverá', 'llovería', 'llover'])
	] },
	{ band: 'C1', steps: [
		T('Si lo _____ sabido, no habría venido (yo, haber)', 'hubiera', undefined, ['hubiese']),
		T('Por mucho que _____, no lo entiendo (yo, estudiar)', 'estudie'),
		C('"No tiene pelos en la lengua" means', 'She says exactly what she thinks', ['She never speaks', 'She has a lisp', 'She lies a lot']),
		C('"Cabe destacar que" means', 'it is worth noting that', ['it fits inside', 'it is forbidden to say that', 'it is unlikely that'])
	] }
];

// Starter word bank: [word, English, how to say it, example, example in English]. The field is called pt in every pack.
const SEED = [
	['sobremesa', 'the long chat at the table after a meal', 'soh-breh-MEH-sah', 'La sobremesa duró tres horas.', 'The after-lunch chat lasted three hours.'],
	['madrugar', 'to get up very early', 'mah-droo-GAR', 'No me gusta madrugar.', "I don't like getting up early."],
	['trasnochar', 'to stay up very late', 'trahs-noh-CHAR', 'Ayer me tocó trasnochar.', 'I had to stay up late yesterday.'],
	['estrenar', 'to use or wear for the first time', 'es-treh-NAR', 'Voy a estrenar mi vestido.', 'I am going to wear my dress for the first time.'],
	['desvelado', 'wide awake, unable to sleep', 'des-beh-LAH-doh', 'Estoy desvelado desde las tres.', 'I have been wide awake since three.'],
	['ojalá', 'hopefully, if only', 'oh-hah-LAH', 'Ojalá no llueva mañana.', "I hope it doesn't rain tomorrow."],
	['o sea', 'I mean, in other words', 'oh SEH-ah', 'No vino, o sea, no le interesa.', "He didn't come, I mean, he's not interested."],
	['friolero', 'someone who always feels cold', 'free-oh-LEH-roh', 'Soy muy friolero.', 'I feel the cold a lot.'],
	['vergüenza ajena', 'embarrassment on behalf of someone else', 'behr-GWEN-sah ah-HEH-nah', 'Su discurso me dio vergüenza ajena.', 'His speech made me cringe for him.'],
	['empalagoso', 'sickly sweet, cloying', 'em-pah-lah-GOH-soh', 'Este postre es demasiado empalagoso.', 'This dessert is too sickly sweet.'],
	['tutear', 'to address someone as tú', 'too-teh-AR', 'Me puedes tutear.', 'You can call me tú.'],
	['merendar', 'to have an afternoon snack', 'meh-ren-DAR', '¿Quieres merendar algo?', 'Do you want an afternoon snack?'],
	['antojo', 'a craving', 'ahn-TOH-hoh', 'Tengo antojo de chocolate.', 'I have a craving for chocolate.'],
	['pereza', "laziness, can't be bothered", 'peh-REH-sah', 'Me da pereza salir.', "I can't be bothered to go out."],
	['agobiado', 'overwhelmed, stressed out', 'ah-goh-BYAH-doh', 'Estoy agobiado con tanto trabajo.', 'I am overwhelmed with so much work.'],
	['chapuza', 'a botched job', 'chah-POO-sah', 'Esta reparación es una chapuza.', 'This repair is a botched job.'],
	['enchufe', 'a plug; connections that get you a job', 'en-CHOO-feh', 'Consiguió el trabajo por enchufe.', 'He got the job through connections.'],
	['quedar', 'to arrange to meet', 'keh-DAR', '¿Podemos quedar mañana?', 'Can we meet up tomorrow?'],
	['apetecer', 'to feel like, to fancy (Spain)', 'ah-peh-teh-SEHR', 'No me apetece salir.', "I don't feel like going out."],
	['aprovechar', 'to make the most of', 'ah-proh-beh-CHAR', 'Hay que aprovechar el buen tiempo.', 'We have to make the most of the good weather.'],
	['cotilla', 'a gossip, a nosy person (Spain)', 'koh-TEE-yah', 'No seas cotilla.', "Don't be nosy."],
	['echar de menos', 'to miss someone or something', 'eh-CHAR deh MEH-nohs', 'Te voy a echar de menos.', 'I am going to miss you.'],
	['dar igual', 'to make no difference', 'dar ee-GWAHL', 'Me da igual.', "I don't mind either way."],
	['menos mal', 'thank goodness', 'MEH-nohs MAHL', 'Menos mal que viniste.', 'Thank goodness you came.'],
	['qué va', 'no way, not at all', 'keh BAH', '¿Cansado yo? ¡Qué va!', 'Me, tired? Not at all!'],
	['por si acaso', 'just in case', 'por see ah-KAH-soh', 'Lleva paraguas, por si acaso.', 'Take an umbrella, just in case.'],
	['de hecho', 'in fact', 'deh EH-choh', 'De hecho, ya lo sabía.', 'In fact, I already knew.'],
	['sin embargo', 'however', 'seen em-BAR-goh', 'Es caro; sin embargo, vale la pena.', "It's expensive; however, it's worth it."],
	['al fin y al cabo', 'after all', 'ahl FEEN ee ahl KAH-boh', 'Al fin y al cabo, es tu decisión.', "After all, it's your decision."],
	['meter la pata', 'to put your foot in it', 'meh-TEHR lah PAH-tah', 'No quiero meter la pata otra vez.', "I don't want to put my foot in it again."],
	['tomar el pelo', "to pull someone's leg", 'toh-MAR el PEH-loh', '¿Me estás tomando el pelo?', 'Are you pulling my leg?'],
	['pan comido', 'a piece of cake', 'PAHN koh-MEE-doh', 'El examen fue pan comido.', 'The exam was a piece of cake.'],
	['estar en las nubes', 'to have your head in the clouds', 'es-TAR en lahs NOO-behs', 'Hoy estás en las nubes.', 'Your head is in the clouds today.'],
	['echar una mano', 'to lend a hand', 'eh-CHAR OO-nah MAH-noh', '¿Me puedes echar una mano?', 'Can you lend me a hand?'],
	['ponerse las pilas', 'to get your act together', 'poh-NEHR-seh lahs PEE-lahs', 'Tienes que ponerte las pilas.', 'You need to get your act together.'],
	['imprescindible', 'indispensable', 'eem-pres-seen-DEE-bleh', 'Tu ayuda es imprescindible.', 'Your help is indispensable.'],
	['entrañable', 'endearing, dear to the heart', 'en-trah-NYAH-bleh', 'Es una persona entrañable.', 'She is a person you grow very fond of.'],
	['acogedor', 'cosy, welcoming', 'ah-koh-heh-DOR', 'Tu piso es muy acogedor.', 'Your flat is very cosy.'],
	['matizar', 'to qualify, add nuance', 'mah-tee-SAR', 'Me gustaría matizar esa idea.', 'I would like to qualify that idea.'],
	['rocambolesco', 'bizarre, far-fetched', 'roh-kahm-boh-LES-koh', 'Fue un viaje rocambolesco.', 'It was a bizarre trip.'],
	['vale', 'OK (Spain)', 'BAH-leh', 'Vale, nos vemos a las ocho.', 'OK, see you at eight.'],
	['guay', 'cool (Spain)', 'GWY (rhymes with "why")', '¡Qué guay tu chaqueta!', 'Your jacket is so cool!'],
	['ahorita', 'right now, or in a while (Mexico)', 'ah-oh-REE-tah', 'Ahorita vengo.', 'I will be right back.'],
	['che', 'hey, mate (Argentina, Uruguay)', 'cheh', 'Che, ¿venís al asado?', 'Hey, are you coming to the barbecue?']
].map(([pt, en, say, ex, exEn]) => ({ pt, en, say, ex, exEn }));

// ---------- verb drill ----------
// A small Spanish conjugator. Persons: 0 yo, 1 tú, 2 él/ella/usted, 3 nosotros, 4 ellos/ustedes.
// No vosotros here: it is taught in the regional lesson. Add rows to IRR for more irregular verbs.
const PRON = ['yo', 'tú', 'él', 'nosotros', 'ellos'];

const TENSES = {
	pres: { name: 'Presente', cue: 'Ahora' },
	ind: { name: 'Pretérito indefinido', cue: 'Ayer' },
	imp: { name: 'Pretérito imperfecto', cue: 'Antes' },
	perf: { name: 'Pretérito perfecto', cue: 'Esta semana' },
	fut: { name: 'Futuro', cue: 'Mañana' },
	cond: { name: 'Condicional', cue: 'En ese caso' },
	sp: { name: 'Subjuntivo presente', cue: 'Ojalá que' },
	si: { name: 'Subjuntivo imperfecto', cue: 'Si' }
};

const END = {
	ar: { pres: ['o', 'as', 'a', 'amos', 'an'], ind: ['é', 'aste', 'ó', 'amos', 'aron'], imp: ['aba', 'abas', 'aba', 'ábamos', 'aban'], sp: ['e', 'es', 'e', 'emos', 'en'] },
	er: { pres: ['o', 'es', 'e', 'emos', 'en'], ind: ['í', 'iste', 'ió', 'imos', 'ieron'], imp: ['ía', 'ías', 'ía', 'íamos', 'ían'], sp: ['a', 'as', 'a', 'amos', 'an'] },
	ir: { pres: ['o', 'es', 'e', 'imos', 'en'], ind: ['í', 'iste', 'ió', 'imos', 'ieron'], imp: ['ía', 'ías', 'ía', 'íamos', 'ían'], sp: ['a', 'as', 'a', 'amos', 'an'] }
};

// strong pretérito: tuve, tuviste, tuvo, tuvimos, tuvieron. After j the i drops: dijeron.
const strong = (s, j) => [s + 'e', s + 'iste', s + 'o', s + 'imos', s + (j ? 'eron' : 'ieron')];

// Only what cannot be derived.
// sc: stem change [from, to] · yo: irregular yo of the present · pres, ind, imp: full forms
// fs: future and conditional stem · sp: subjunctive stem (string) or full forms · pp: participle
const IRR = {
	ser: { pres: ['soy', 'eres', 'es', 'somos', 'son'], ind: ['fui', 'fuiste', 'fue', 'fuimos', 'fueron'], imp: ['era', 'eras', 'era', 'éramos', 'eran'], sp: 'se' },
	ir: { pres: ['voy', 'vas', 'va', 'vamos', 'van'], ind: ['fui', 'fuiste', 'fue', 'fuimos', 'fueron'], imp: ['iba', 'ibas', 'iba', 'íbamos', 'iban'], sp: 'vay' },
	estar: { pres: ['estoy', 'estás', 'está', 'estamos', 'están'], ind: strong('estuv'), sp: ['esté', 'estés', 'esté', 'estemos', 'estén'] },
	tener: { yo: 'tengo', sc: ['e', 'ie'], ind: strong('tuv'), fs: 'tendr' },
	hacer: { yo: 'hago', ind: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicieron'], fs: 'har', pp: 'hecho' },
	poder: { sc: ['o', 'ue'], ind: strong('pud'), fs: 'podr' },
	decir: { yo: 'digo', sc: ['e', 'i'], ind: strong('dij', true), fs: 'dir', pp: 'dicho' },
	querer: { sc: ['e', 'ie'], ind: strong('quis'), fs: 'querr' },
	saber: { yo: 'sé', ind: strong('sup'), fs: 'sabr', sp: 'sep' },
	venir: { yo: 'vengo', sc: ['e', 'ie'], ind: strong('vin'), fs: 'vendr' },
	ver: { yo: 'veo', ind: ['vi', 'viste', 'vio', 'vimos', 'vieron'], imp: ['veía', 'veías', 'veía', 'veíamos', 'veían'], pp: 'visto' },
	dar: { yo: 'doy', ind: ['di', 'diste', 'dio', 'dimos', 'dieron'], sp: ['dé', 'des', 'dé', 'demos', 'den'] },
	poner: { yo: 'pongo', ind: strong('pus'), fs: 'pondr', pp: 'puesto' },
	salir: { yo: 'salgo', fs: 'saldr' },
	traer: { yo: 'traigo', ind: strong('traj', true), pp: 'traído' },
	oír: { pres: ['oigo', 'oyes', 'oye', 'oímos', 'oyen'], ind: ['oí', 'oíste', 'oyó', 'oímos', 'oyeron'], pp: 'oído' },
	leer: { ind: ['leí', 'leíste', 'leyó', 'leímos', 'leyeron'], pp: 'leído' },
	conocer: { yo: 'conozco' },
	conducir: { yo: 'conduzco', ind: strong('conduj', true) },
	seguir: { yo: 'sigo', sc: ['e', 'i'] },
	pedir: { sc: ['e', 'i'] },
	dormir: { sc: ['o', 'ue'] },
	sentir: { sc: ['e', 'ie'] },
	pensar: { sc: ['e', 'ie'] },
	empezar: { sc: ['e', 'ie'] },
	entender: { sc: ['e', 'ie'] },
	volver: { sc: ['o', 'ue'], pp: 'vuelto' },
	encontrar: { sc: ['o', 'ue'] },
	jugar: { sc: ['u', 'ue'] },
	escribir: { pp: 'escrito' },
	abrir: { pp: 'abierto' }
};

const VERBS = {
	ser: 'to be (what you are)', estar: 'to be (how, where)', ir: 'to go', tener: 'to have', hacer: 'to do, make',
	poder: 'can, to be able', decir: 'to say, tell', querer: 'to want, love', saber: 'to know (facts)', venir: 'to come',
	ver: 'to see', dar: 'to give', poner: 'to put', salir: 'to go out, leave', traer: 'to bring', oír: 'to hear',
	leer: 'to read', conocer: 'to know (people, places)', conducir: 'to drive', seguir: 'to follow, carry on',
	pedir: 'to ask for, order', dormir: 'to sleep', sentir: 'to feel', pensar: 'to think', empezar: 'to start',
	entender: 'to understand', volver: 'to come back', encontrar: 'to find', jugar: 'to play',
	hablar: 'to speak', llegar: 'to arrive', buscar: 'to look for', tomar: 'to take, drink', quedar: 'to stay, meet up',
	comer: 'to eat', beber: 'to drink', vivir: 'to live', escribir: 'to write', abrir: 'to open'
};

// replace the last "from" in the stem: quer -> quier, encontr -> encuentr, ped -> pid
const swap = (stem, from, to) => {
	const k = stem.lastIndexOf(from);
	return k < 0 ? stem : stem.slice(0, k) + to + stem.slice(k + 1);
};
// keep the sound before e: busc -> busqu, lleg -> llegu, empez -> empec
const soft = (s) => s.replace(/c$/, 'qu').replace(/g$/, 'gu').replace(/z$/, 'c');

function conj(verb, tense, p) {
	const o = IRR[verb] || {};
	const type = verb.endsWith('ír') ? 'ir' : verb.slice(-2);
	const stem = verb.slice(0, -2);
	const E = END[type];
	const changed = o.sc ? swap(stem, o.sc[0], o.sc[1]) : stem;
	// -ir stem changers keep a smaller change off the stress: pidió, durmieron, sintamos
	const weak = o.sc && type === 'ir' ? swap(stem, o.sc[0], o.sc[0] === 'o' ? 'u' : 'i') : stem;
	const pres = o.pres || E.pres.map((e, k) => (k === 0 && o.yo ? o.yo : (k === 3 ? stem : changed) + e));
	const ind = o.ind || E.ind.map((e, k) => (k === 0 && type === 'ar' ? soft(stem) : k === 2 || k === 4 ? weak : stem) + e);

	if (tense === 'pres') return pres[p];
	if (tense === 'ind') return ind[p];
	if (tense === 'imp') return (o.imp || E.imp.map((e) => stem + e))[p];
	if (tense === 'perf') return ['he', 'has', 'ha', 'hemos', 'han'][p] + ' ' + (o.pp || stem + (type === 'ar' ? 'ado' : 'ido'));
	if (tense === 'fut' || tense === 'cond') {
		const end = tense === 'fut' ? ['é', 'ás', 'á', 'emos', 'án'] : ['ía', 'ías', 'ía', 'íamos', 'ían'];
		return (o.fs || verb.replace('í', 'i')) + end[p];
	}
	if (tense === 'sp') {
		if (Array.isArray(o.sp)) return o.sp[p];
		if (o.sp) return o.sp + E.sp[p];
		// -ar: same stem as the present, respelled. Others: from the yo form (tengo -> tenga, pido -> pida)
		if (type === 'ar') return soft(p === 3 ? stem : changed) + E.sp[p];
		if (o.yo || o.pres) return pres[0].slice(0, -1) + E.sp[p];
		return (p === 3 ? weak : changed) + E.sp[p];
	}
	if (tense === 'si') {
		// from "ellos" indefinido: tuvieron -> tuvie + ra
		const b = ind[4].slice(0, -3);
		if (p !== 3) return b + ['ra', 'ras', 'ra', '', 'ran'][p];
		return b.slice(0, -1) + { a: 'á', e: 'é' }[b.slice(-1)] + 'ramos';
	}
	throw new Error('unknown tense ' + tense);
}

const table = (verb, tense) =>
	`<b>${verb}</b> (${VERBS[verb]}) · ${TENSES[tense].name}<br>` +
	PRON.map((pr, p) => `${pr} <b>${conj(verb, tense, p)}</b>`).join(' · ');

function conjQ(verb, tense, p) {
	const answer = conj(verb, tense, p);
	return {
		key: `conj:${verb}:${tense}:${p}`,
		kind: 'type',
		label: TENSES[tense].name,
		prompt: `${TENSES[tense].cue} ${PRON[p]} _____`,
		sub: `${verb} · ${VERBS[verb]}`,
		answer,
		// the -se twin of the imperfect subjunctive is just as correct: tuviera, tuviese
		accept: tense === 'si' ? [answer.replace(/ra(s|mos|n)?$/, 'se$1')] : undefined,
		speak: `${PRON[p]} ${answer}`,
		explain: table(verb, tense),
		html: true
	};
}

const ALL = Object.keys(TENSES);

export default {
	code: 'es',
	units: UNITS,
	seed: SEED,
	placement: PLACEMENT,
	keys: 'áéíóúüñ¿¡',
	articles: /^(el|la|los|las|un|una|unos|unas) /,
	levels: [[0, 'Guiri'], [150, 'Turista'], [500, 'Estudiante'], [1200, 'Vecino del barrio'], [2500, 'Casi de aquí'], [5000, 'Casi nativo']],
	// [id, title, what you can do (with the matching DELE level), lessons, drill groups in the checkpoint test]
	stages: [
		['A1.1', 'Primeras palabras', 'Pronounce what you read and name things with the right article (DELE A1)', ['es-son-1', 'es-gen-1'], ['pres']],
		['A1.2', 'Ser, estar y el presente', 'Say who you are, where you are and what you do (DELE A1)', ['es-son-2', 'es-ser-1', 'es-pres-1'], ['pres']],
		['A2.1', 'Rutinas y ayer', 'Talk about likes, routines and what you did yesterday (DELE A2)', ['es-pres-2', 'es-gus-1', 'es-ind-1'], ['pres', 'ind']],
		['A2.2', 'Contar historias', 'Tell a story with background and events (DELE A2)', ['es-imp-1', 'es-perf-1'], ['ind', 'imp', 'perf']],
		['B1.1', 'Planes y pronombres', 'Make plans, guess, and stop repeating nouns (DELE B1)', ['es-fut-1', 'es-pron-1'], ['ind', 'imp', 'fut', 'cond']],
		['B1.2', 'Deseos', 'Express wishes and choose por or para without thinking (DELE B1)', ['es-por-1', 'es-peri-1', 'es-subj-1'], ['perf', 'fut', 'cond', 'sp']],
		['B2.1', 'Subjuntivo en serio', 'Handle time clauses, purpose, orders and ser vs estar nuance (DELE B2)', ['es-ser-2', 'es-subj-2', 'es-mand-1'], ['sp', 'cond', 'ind']],
		['B2.2', 'Si tuviera', 'Talk about unreal situations and link ideas (DELE B2)', ['es-subj-3', 'es-con-1'], ['sp', 'si', 'cond']],
		['B2.3', 'Todos los tiempos', 'Switch between every tense in a real conversation (DELE B2)', ['es-conv-1'], ALL],
		['C1.1', 'De país en país', 'Follow Spain, Mexico and Argentina, and catch idioms (DELE C1)', ['es-reg-1', 'es-idi-1'], ALL],
		['C1.2', 'Registro', 'Pick the precise word and write formally (DELE C1)', ['es-c2-1'], ALL],
		['C1.3', 'Casi', 'Argue, joke and tell stories at speed (DELE C1)', [], ALL],
		['C2.1', 'Dominio', 'Surprise natives with your word choice (DELE C2)', [], ALL],
		['C2.2', 'Casi nativo', 'Hold your own anywhere, on anything (DELE C2)', [], ALL]
	],
	// writing tasks for the B and C checkpoint tests: [task, English hint]
	writing: {
		B: [
			['Cuenta qué hiciste el fin de semana pasado.', 'Say what you did last weekend. 2 or 3 sentences, in the indefinido.'],
			['¿Cómo era tu vida cuando eras niño o niña?', 'What was your life like as a child? 2 or 3 sentences, in the imperfecto.'],
			['¿Qué harías si te tocara la lotería?', 'What would you do if you won the lottery? 2 or 3 sentences, with the conditional.'],
			['¿Qué esperas que pase este año?', 'What do you hope happens this year? Use "espero que" or "ojalá".'],
			['Dale un consejo a un amigo que va a visitar Madrid.', 'Give advice to a friend visiting Madrid. 2 or 3 sentences.']
		],
		C: [
			['Defiende o critica: "Trabajar desde casa es mejor que ir a la oficina."', 'Argue for or against. 3 or 4 sentences, with connectors.'],
			['Cuenta una vez que metiste la pata y qué habrías hecho de otra manera.', 'Tell about a time you put your foot in it and what you would have done differently.'],
			['Si hubieras nacido en un país hispanohablante, ¿cómo sería tu vida hoy?', 'If you had been born in a Spanish-speaking country, what would your life be like? 3 or 4 sentences.'],
			['Escribe un correo formal para reclamar por un pedido que no ha llegado.', 'Write a formal email complaining about an order that has not arrived. Use usted.'],
			['Describe a alguien a quien admiras y explica por qué.', 'Describe someone you admire and why. 3 or 4 sentences, no "bueno" or "interesante".']
		]
	},
	chat: {
		who: 'Lucía, de Madrid. She fixes your Spanish as you go.',
		hint: 'Say hola. Try: "Hola Lucía, ¿qué tal?"',
		placeholder: 'Escribe en español...',
		scenes: ['Charla libre', 'En el bar de tapas', 'En el mercado', 'Conociendo a la familia', 'Entrevista de trabajo']
	},
	drill: {
		start: ['ind'],
		groups: TENSES,
		// yo and él back to back: fui/fue, hice/hizo, hablé/habló is where the mistakes are
		pair: { on: 'yo vs él', off: 'All persons', keys: (group) => [0, 2].map((p) => `conj:${group}:${p}`) },
		pool(tenses = ALL, basic = false) {
			const out = [];
			for (const v of Object.keys(VERBS))
				for (const t of tenses)
					for (const p of basic ? [0, 1, 2] : [0, 1, 2, 3, 4]) out.push({ key: `conj:${v}:${t}:${p}`, group: `${v}:${t}`, wt: p < 3 ? 2 : 1 });
			return out;
		},
		make(key) {
			const [a, b, c, d] = key.split(':');
			return a === 'conj' && VERBS[b] && TENSES[c] && PRON[+d] ? conjQ(b, c, +d) : null;
		}
	},
	ui: {
		check: 'Comprobar', next: 'Continuar', start: 'Empezar', right: '¡Eso es!', answer: 'Respuesta correcta:', again: 'Otra vez', learn: 'Aprende',
		hear: 'Escuchar', rec: 'Grabar', stop: 'Parar y comprobar', recording: 'Grabando...', skipped: 'Saltada',
		polished: '¡Bien! Versión pulida:', fixed: 'Versión corregida:', placeholder: 'En español...', write: 'Escribe aquí...',
		perfect: '¡Perfecto!', good: '¡Muy bien!', almost: 'Casi',
		hello: ['Buenos días', 'Buenas tardes', 'Buenas noches'], days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], today: 'Hoy',
		quiz: 'Quiz del día', quizA: 'preguntas', quizB: 'difíciles', done: 'Hecho hoy', extra: 'Extra', nextLesson: 'Siguiente lección',
		drill: 'Verbos', drillSub: 'Yo vs él, tiempo a tiempo', review: 'Repasar', songs: 'Canciones y enlaces', speak: 'Hablar',
		learnTitle: 'Aprender', add: 'Añadir', bank: 'Banco', allDone: 'Todo al día', chat: 'Charla', welcome: 'Bienvenido',
		won: 'conseguido!', need: (n) => `Necesitas ${n}. ¡Inténtalo otra vez!`, typeLabel: 'Type it in Spanish', sayLabel: 'Say it in Spanish',
		near: 'Right, but check the accents or article.', custom: 'Lección a medida', yours: 'Tus lecciones', roadmap: 'Ruta', linkText: 'Enlace o texto',
		drillEyebrow: 'Práctica de verbos', drillQ: 'Which tenses?',
		drillBlurb: 'Ten quick questions. Each one gives you a time cue (Ayer, Mañana, Ojalá que, Si) so the tense becomes a reflex, and missed ones come back at the end.'
	}
};
