// Polish pack: course, starter words, placement test, drills, roadmap.
// Stage targets follow the Polish state certificate standards (Państwowa Komisja do spraw
// Poświadczania Znajomości Języka Polskiego jako Obcego), levels A1 to C2.
import { I, C, T, L, tableDrill } from './kit.js';

// The answer check strips accents but cannot turn ł into l, so every answer with ł
// also accepts a copy with plain l. Typed with no Polish letters at all it still passes, with a warning.
const unl = (s) => s.replace(/ł/g, 'l').replace(/Ł/g, 'L');
const alt = (answer, accept = []) => [...accept, ...[answer, ...accept].filter((a) => /[łŁ]/.test(a)).map(unl)];
// typed answer in Polish
const P = (prompt, pl, explain, accept) => T(prompt, pl, explain, alt(pl, accept));
// listening
const H = (pl, en, accept) => L(pl, en, alt(pl, accept));

const UNITS = [
	{
		title: 'Sounds',
		sub: 'Reading Polish out loud without fear',
		lessons: [
			{
				id: 'pl-sounds-1', title: 'Sz, cz, rz and the stress', sub: 'The hissing letters and where the beat falls',
				steps: [
					I('Spelled as it sounds', 'Polish looks scary but is regular: each letter or letter pair has one sound.<br><b>sz</b> = sh: <b>szafa</b> (SHA-fa) wardrobe<br><b>cz</b> = ch: <b>czas</b> (chas) time<br><b>rz</b> and <b>ż</b> = the s in "measure": <b>rzeka</b> (ZHE-ka) river, <b>żaba</b> (ZHA-ba) frog', 'szafa. czas. rzeka. żaba.'),
					C('"cz" in "czas" sounds like', 'ch in "church"', ['ts in "cats"', 'k in "kit"', 's in "sea"']),
					I('W, c, j, ch', '<b>w</b> = v: <b>woda</b> (VO-da) water<br><b>c</b> = ts: <b>co</b> (tso) what<br><b>j</b> = y: <b>ja</b> (ya) I<br><b>ch</b> and <b>h</b> = a breathy h: <b>chleb</b> (hlep) bread', 'woda. co. ja. chleb.'),
					C('"co" (what) is pronounced', 'tso', ['ko', 'so', 'cho']),
					I('Stress: second to last', 'Almost every Polish word is stressed on the <b>second-to-last syllable</b>.<br><b>KA</b>-wa (coffee) · her-<b>BA</b>-ta (tea) · u-ni-wer-<b>SY</b>-tet · dzię-<b>KU</b>-ję (thank you)<br>When a word grows, the stress moves along: te-<b>LE</b>-fon, te-le-<b>FO</b>-ny.', 'kawa. herbata. uniwersytet. dziękuję. telefon. telefony.'),
					C('Where is the stress in "herbata" (tea)?', 'her-BA-ta', ['HER-ba-ta', 'her-ba-TA', 'no syllable is stressed']),
					P('thank you', 'dziękuję', 'dziękuję = jen-KOO-yeh.'),
					I('Quiet endings, and ó = u', 'At the end of a word, b d g w z ż are said as p t k f s sz.<br><b>chleb</b> = hlep · <b>ogród</b> = OG-root (garden) · <b>nóż</b> = noosh (knife)<br>And <b>ó</b> is exactly the same sound as <b>u</b>: both are "oo".', 'chleb. ogród. nóż.'),
					C('"ó" in "ogród" sounds like', 'oo, the same as Polish u', ['o as in "go"', 'a as in "father"', 'e as in "bed"']),
					H('Dzień dobry', 'jen DOB-ri = good morning, good day'),
					P('yes', 'tak', 'tak = yes, nie = no.'),
					C('"przepraszam" (sorry, excuse me) is pronounced', 'psheh-PRA-sham', ['prez-PRA-zam', 'per-ze-pra-SAM', 'pra-ZAM'], 'After p, t, k and ch the rz sounds like sz.')
				]
			},
			{
				id: 'pl-sounds-2', title: 'Soft sounds, nasal vowels and ł', sub: 'ś ź ć, ą ę, and the l with a stroke',
				steps: [
					I('Hard and soft', 'Polish has two sets of hissing sounds.<br>Hard, tongue pulled back: <b>sz, ż, cz</b><br>Soft, tongue flat as if smiling: <b>ś, ź, ć</b><br><b>środa</b> (SHRO-da) Wednesday · <b>źle</b> (zhleh) badly · <b>pić</b> (peech) to drink<br>English ears hear them as the same sh, zh, ch. Poles do not.', 'środa. źle. pić.'),
					I('si, zi, ci, dzi', 'Before a vowel the soft sounds are written with an i instead of an accent.<br><b>siedem</b> (SHEH-dem) seven · <b>zima</b> (ZHEE-ma) winter<br><b>ciocia</b> (CHO-cha) aunt · <b>dziecko</b> (JETS-ko) child<br><b>ń</b> and <b>ni</b> = ny as in "canyon": <b>koń</b> (horse), <b>nie</b> (nyeh) no', 'siedem. zima. ciocia. dziecko. koń. nie.'),
					C('"cześć" (hi) is pronounced', 'cheshch', ['tsesk', 'chez', 'sesh']),
					P('hi (the informal hello)', 'cześć', 'cześć = cheshch. A hard cz, then soft ś and ć.'),
					I('Ł is a w', '<b>ł</b> = English w: <b>ładny</b> (WAD-ni) pretty, <b>mały</b> (MA-wi) small, <b>Łódź</b> (wooch), the city.<br>Plain <b>l</b> is a normal l: <b>lato</b> (summer).<br>And <b>y</b> is a short i as in "bit": <b>ty</b> (you), <b>my</b> (we).', 'ładny. mały. Łódź. lato. ty. my.'),
					C('The city "Łódź" is pronounced', 'wooch', ['lodz', 'loads', 'woj']),
					I('Nasal vowels ą and ę', '<b>ą</b> = a nasal o, like French "on": <b>są</b> (they are)<br><b>ę</b> = a nasal e: <b>mięso</b> (MYEN-so) meat<br>Before b and p they sound like om, em: <b>ząb</b> (zomp) tooth.<br>Before d, t, c, cz like on, en: <b>piątek</b> (PYON-tek) Friday, <b>ręce</b> (REN-tseh) hands.<br>At the very end of a word, ę is nearly a plain e: <b>dziękuję</b>.', 'są. mięso. ząb. piątek. ręce.'),
					C('"ząb" (tooth) is pronounced', 'zomp', ['zab', 'zeb', 'zang']),
					C('"ń" in "koń" (horse) sounds like', 'ny, as in "canyon"', ['a plain n', 'ng as in "sing"', 'it is silent']),
					H('Dziękuję bardzo', 'jen-KOO-yeh BAR-dzo = thank you very much'),
					P('please, here you go, you are welcome (one word)', 'proszę', 'proszę = PRO-sheh. One word, three jobs.'),
					H('Cześć, jak się masz', 'cheshch, yak sheh mash = Hi, how are you?')
				]
			}
		]
	},
	{
		title: 'First steps',
		sub: 'Gender, to be, to have and the present tense',
		lessons: [
			{
				id: 'pl-base-1', title: 'Gender and być', sub: 'No articles, three genders, and "to be"',
				steps: [
					I('No articles, three genders', 'Polish has no "a" or "the". But every noun has a gender, and the ending usually gives it away.<br><b>Masculine</b>: ends in a consonant: dom (house), brat (brother)<br><b>Feminine</b>: ends in -a: kawa (coffee), siostra (sister)<br><b>Neuter</b>: ends in -o, -e, -ę: okno (window), morze (sea), imię (name)', 'dom. brat. kawa. siostra. okno. morze. imię.'),
					C('"okno" (window) is', 'neuter', ['masculine', 'feminine', 'plural']),
					I('Adjectives follow the gender', 'now<b>y</b> dom (a new house)<br>now<b>a</b> książka (a new book)<br>now<b>e</b> okno (a new window)<br>After k and g the masculine ending is -i: wysok<b>i</b> (tall), drog<b>i</b> (expensive).', 'nowy dom. nowa książka. nowe okno.'),
					P('a new book (nowy, książka)', 'nowa książka', 'Feminine noun in -a, so the adjective ends in -a too.'),
					C('good beer (piwo)', 'dobre piwo', ['dobry piwo', 'dobra piwo', 'dobrzy piwo'], 'piwo ends in -o: neuter, so dobre.'),
					I('Być: to be', 'ja <b>jestem</b> · ty <b>jesteś</b> · on, ona, ono <b>jest</b><br>my <b>jesteśmy</b> · wy <b>jesteście</b> · oni, one <b>są</b><br>The pronoun is usually dropped: <b>Jestem z Anglii.</b> I am from England.', 'jestem. jesteś. jest. jesteśmy. jesteście. są.'),
					P('I am (być)', 'jestem'),
					P('we are (być)', 'jesteśmy'),
					I('To jest, czy, nie', '<b>To jest</b> dom. This is a house.<br><b>To nie jest</b> hotel. This is not a hotel.<br><b>Czy</b> to jest kawa? Is this coffee? (czy turns a statement into a yes or no question)<br><b>Co to jest?</b> What is this? <b>Kto to jest?</b> Who is this?', 'To jest dom. To nie jest hotel. Czy to jest kawa? Co to jest? Kto to jest?'),
					P('What is this?', 'Co to jest'),
					C('Oni ___ w domu (They are at home)', 'są', ['jest', 'jesteś', 'jesteście']),
					H('Jestem z Anglii', 'I am from England.')
				]
			},
			{
				id: 'pl-base-2', title: 'Mieć and being polite', sub: 'To have, your name, your age, pan and pani',
				steps: [
					I('Mieć: to have', 'ja <b>mam</b> · ty <b>masz</b> · on, ona <b>ma</b><br>my <b>mamy</b> · wy <b>macie</b> · oni, one <b>mają</b><br><b>Mam czas.</b> I have time. <b>Masz czas?</b> Do you have time?', 'mam. masz. ma. mamy. macie. mają.'),
					P('I have (mieć)', 'mam'),
					P('you have (mieć, ty)', 'masz'),
					I('Name and age use mieć', '<b>Jak masz na imię?</b> What is your name? (literally: how do you have for a name)<br><b>Mam na imię Anna.</b> My name is Anna.<br><b>Ile masz lat?</b> How old are you?<br><b>Mam trzydzieści lat.</b> I am thirty. In Polish you "have" years.', 'Jak masz na imię? Mam na imię Anna. Ile masz lat? Mam trzydzieści lat.'),
					P('My name is Anna (with mieć)', 'Mam na imię Anna'),
					C('"Ile masz lat?" asks for your', 'age', ['name', 'address', 'phone number']),
					I('Pan and pani', 'With strangers, older people and in shops, do not use ty. Use <b>pan</b> (sir) or <b>pani</b> (madam) with the <b>third person</b> verb.<br><b>Czy pan ma czas?</b> Do you have time, sir?<br><b>Skąd pani jest?</b> Where are you from, madam?<br>To a group: <b>państwo</b> with the oni form: Czy państwo mają bilety?', 'Czy pan ma czas? Skąd pani jest? Czy państwo mają bilety?'),
					C('To a woman behind the counter: "Do you have bread?"', 'Czy pani ma chleb?', ['Czy ty masz chleb?', 'Czy pani masz chleb?', 'Czy pani mają chleb?'], 'pani + third person singular: ma.'),
					P('they have (mieć)', 'mają'),
					I('Greetings by register', '<b>Dzień dobry</b> good day (formal, from morning until evening)<br><b>Dobry wieczór</b> good evening<br><b>Do widzenia</b> goodbye (formal)<br><b>Cześć</b> hi and bye (informal) · <b>Na razie</b> see you · <b>Pa</b> bye', 'Dzień dobry. Dobry wieczór. Do widzenia. Cześć. Na razie. Pa.'),
					P('goodbye (formal, two words)', 'do widzenia', 'do vee-DZEH-nya. Literally: until seeing.'),
					H('Jak masz na imię', 'What is your name?')
				]
			},
			{
				id: 'pl-pres-1', title: 'Present tense: three families', sub: 'One tense, three sets of endings',
				steps: [
					I('Family 1: -m, -sz', 'Polish has one present tense: <b>czytam</b> = I read, I am reading.<br>czytać (to read): czyt<b>am</b>, czyt<b>asz</b>, czyt<b>a</b>, czyt<b>amy</b>, czyt<b>acie</b>, czyt<b>ają</b><br>Same pattern: znać (to know someone), mieszkać (to live), czekać (to wait), mieć.', 'czytam. czytasz. czyta. czytamy. czytacie. czytają.'),
					P('I read (czytać)', 'czytam'),
					P('they know (znać, same family as czytać)', 'znają'),
					I('Family 2: -ę, -isz or -ysz', 'mówić (to speak): mówi<b>ę</b>, mów<b>isz</b>, mów<b>i</b>, mów<b>imy</b>, mów<b>icie</b>, mówi<b>ą</b><br>robić (to do): robię, robisz, robi, robimy, robicie, robią<br>After sz, cz, rz, ż the i becomes y: słyszeć (to hear): słyszę, słysz<b>ysz</b>, słyszy', 'mówię. mówisz. mówi. mówimy. mówicie. mówią.'),
					P('you speak (mówić, ty)', 'mówisz'),
					P('we do (robić)', 'robimy'),
					I('Family 3: -ę, -esz', 'pisać (to write): pisz<b>ę</b>, pisz<b>esz</b>, pisz<b>e</b>, pisz<b>emy</b>, pisz<b>ecie</b>, pisz<b>ą</b><br>Verbs in -ować swap it for -uj-: pracować (to work): prac<b>uję</b>, prac<b>ujesz</b>, prac<b>uje</b>, pracujemy, pracujecie, pracują<br>Tip: learn the ja and ty forms of each verb. Everything else follows from ty.', 'piszę. piszesz. pisze. pracuję. pracujesz. pracuje.'),
					P('I work (pracować)', 'pracuję'),
					C('she writes (pisać)', 'pisze', ['pisa', 'pisi', 'piszą']),
					I('Useful irregulars', 'chcieć (to want): <b>chcę</b>, chcesz, chce<br>móc (can): <b>mogę</b>, możesz, może ... oni mogą<br>wiedzieć (to know a fact): <b>wiem</b>, wiesz, wie ... oni wiedzą<br>jeść (to eat): <b>jem</b>, jesz, je ... oni jedzą<br><b>Nie</b> before the verb makes it negative: <b>Nie wiem.</b> I do not know.', 'chcę. mogę. wiem. jem. Nie wiem.'),
					P('I do not know (wiedzieć)', 'Nie wiem'),
					H('Mówisz po polsku', 'Do you speak Polish? "po polsku" = in Polish.')
				]
			}
		]
	},
	{
		title: 'The first cases',
		sub: 'Accusative, genitive and locative, one at a time',
		lessons: [
			{
				id: 'pl-acc-1', title: 'Accusative: the object', sub: 'What you have, like, eat and drink',
				steps: [
					I('What a case is', 'In English, word order shows who does what. In Polish the <b>ending</b> shows it, so the order is free.<br>There are seven cases. The dictionary form is the <b>nominative</b> (mianownik), the subject: <b>Kawa</b> jest dobra.<br>The <b>accusative</b> (biernik) marks the direct object: Piję <b>kawę</b>.', 'Kawa jest dobra. Piję kawę.'),
					I('Accusative endings', 'Feminine: -a becomes <b>-ę</b>: kawa: kaw<b>ę</b>, woda: wod<b>ę</b><br>Neuter: no change: Piję piwo.<br>Masculine things: no change: Mam dom.<br>Masculine people and animals: add <b>-a</b>: Mam brat<b>a</b>. Mam ps<b>a</b> (pies: psa).', 'Piję kawę. Piję wodę. Piję piwo. Mam dom. Mam brata. Mam psa.'),
					P('I am drinking coffee (pić: piję, kawa)', 'Piję kawę'),
					P('I have a brother (brat)', 'Mam brata', 'A living masculine noun takes -a in the accusative.'),
					C('Lubię ___ (I like tea, herbata)', 'herbatę', ['herbata', 'herbaty', 'herbacie']),
					C('Mam ___ (I have a house, dom)', 'dom', ['doma', 'domę', 'domem'], 'Masculine things do not change in the accusative.'),
					I('Adjectives in the accusative', 'Feminine: -a becomes <b>-ą</b>: czarn<b>ą</b> kaw<b>ę</b><br>Masculine living: <b>-ego</b>: Mam starsz<b>ego</b> brat<b>a</b>. (I have an older brother.)<br>Masculine things and neuter: no change: nowy dom, zimne piwo', 'czarną kawę. Mam starszego brata. nowy dom. zimne piwo.'),
					P('A black coffee, please (poproszę, czarna kawa)', 'Poproszę czarną kawę', 'Adjective in -ą, noun in -ę.'),
					C('Mam ___ brata (I have an older brother, starszy)', 'starszego', ['starszy', 'starszą', 'starsze']),
					I('Accusative after prepositions', '<b>na</b> + accusative = to (an event, an open place), for: Idę <b>na kawę</b>. Idę <b>na pocztę</b>.<br><b>przez</b> = through, across: <b>przez park</b><br><b>w</b> + a day of the week: <b>w środę</b> (on Wednesday), <b>w sobotę</b><br><b>za</b> after dziękuję: Dziękuję <b>za pomoc</b>.', 'Idę na kawę. przez park. w środę. w sobotę. Dziękuję za pomoc.'),
					P('on Saturday (sobota)', 'w sobotę'),
					H('Poproszę wodę', 'Water, please. Poproszę + accusative is how you order anything.')
				]
			},
			{
				id: 'pl-gen-1', title: 'Genitive: of, none, some', sub: 'Negation, possession, quantities and five prepositions',
				steps: [
					I('Genitive endings', 'The genitive (dopełniacz) is the busiest case after the nominative.<br>Feminine: -a becomes <b>-y</b>, or <b>-i</b> after k and g: kawa: kaw<b>y</b>, książka: książk<b>i</b><br>Neuter: -o becomes <b>-a</b>: piwo: piw<b>a</b>, mleko: mlek<b>a</b><br>Masculine people and animals: <b>-a</b>: brat: brat<b>a</b><br>Masculine things: <b>-u</b> or <b>-a</b>, learned word by word: dom: dom<b>u</b>, cukier: cukr<b>u</b>, chleb: chleb<b>a</b>', 'kawy. książki. piwa. mleka. brata. domu. cukru. chleba.'),
					I('Use 1: after nie', 'A direct object after <b>nie</b> switches from accusative to genitive. Always.<br>Mam czas. Nie mam czas<b>u</b>.<br>Piję kawę. Nie piję kaw<b>y</b>.<br>"There is no" is <b>nie ma</b> + genitive: Nie ma problem<b>u</b>.', 'Nie mam czasu. Nie piję kawy. Nie ma problemu.'),
					P('I do not have time (czas)', 'Nie mam czasu'),
					P('I do not drink coffee (pić: piję, kawa)', 'Nie piję kawy'),
					C('Nie ma ___ (There is no water, woda)', 'wody', ['woda', 'wodę', 'wodą']),
					I('Use 2: possession', 'The owner goes in the genitive, after the thing owned.<br>samochód <b>brata</b> = my brother\'s car<br>dom <b>Anny</b> = Anna\'s house<br>numer <b>telefonu</b> = phone number', 'samochód brata. dom Anny. numer telefonu.'),
					P('Anna\'s brother (brat, Anna)', 'brat Anny', 'Owner second, in the genitive.'),
					I('Use 3: quantities', 'After words of quantity: <b>dużo</b> (a lot), <b>mało</b> (little), <b>trochę</b> (a bit), <b>kilo</b>, <b>butelka</b> (bottle), <b>kawałek</b> (piece).<br>dużo <b>czasu</b> · trochę <b>mleka</b> · butelka <b>wody</b> · kawałek <b>chleba</b>', 'dużo czasu. trochę mleka. butelka wody. kawałek chleba.'),
					C('trochę ___ (a bit of sugar, cukier)', 'cukru', ['cukier', 'cukrem', 'cukrze']),
					I('Use 4: prepositions', '<b>do</b> to, into: Idę do <b>domu</b>. Jadę do <b>Warszawy</b>.<br><b>z</b> from, out of: Jestem z <b>Polski</b>.<br><b>od</b> from (a person, a time): prezent od <b>brata</b><br><b>bez</b> without: kawa bez <b>cukru</b><br><b>dla</b> for: To jest dla <b>mamy</b>.<br><b>u</b> at someone\'s place: u <b>babci</b> (at grandma\'s)', 'Idę do domu. Jadę do Warszawy. Jestem z Polski. kawa bez cukru. dla mamy. u babci.'),
					P('coffee without milk (kawa, mleko)', 'kawa bez mleka'),
					P('I am going to Warsaw (jechać: jadę, Warszawa)', 'Jadę do Warszawy')
				]
			},
			{
				id: 'pl-loc-1', title: 'Locative: where and about what', sub: 'In Warsaw, at home, about work',
				steps: [
					I('Only after prepositions', 'The locative (miejscownik) never stands alone. It follows <b>w</b> (in), <b>na</b> (on, at), <b>o</b> (about), <b>po</b> (after), <b>przy</b> (by).<br>Its main ending is <b>-e</b>, which softens the consonant before it:<br>Warszawa: w Warszaw<b>ie</b> · Kraków: w Krakow<b>ie</b> · sklep: w sklep<b>ie</b> · okno: w okn<b>ie</b>', 'w Warszawie. w Krakowie. w sklepie. w oknie.'),
					I('Consonant swaps', 'Before the locative -e some consonants change:<br>t becomes <b>ci</b>: uniwersytet: na uniwersyte<b>ci</b>e<br>d becomes <b>dzi</b>: woda: w wo<b>dzi</b>e<br>r becomes <b>rz</b>: teatr: w teat<b>rz</b>e, biuro: w biu<b>rz</b>e<br>ł becomes <b>l</b>: stół: na sto<b>l</b>e, szkoła: w szko<b>l</b>e<br>st becomes <b>ści</b>: miasto: w mie<b>ści</b>e', 'na uniwersytecie. w wodzie. w teatrze. w biurze. na stole. w szkole. w mieście.'),
					P('in Warsaw (Warszawa)', 'w Warszawie'),
					P('at school (szkoła)', 'w szkole', 'ł becomes l before the locative -e.'),
					C('w ___ (in the office, biuro)', 'biurze', ['biuro', 'biura', 'biurem'], 'r becomes rz.'),
					I('The -u group', 'Masculine and neuter nouns ending in k, g, ch, or in a soft or hissing consonant (l, j, sz, cz, rz, ż, c, ń...), take <b>-u</b> instead.<br>park: w park<b>u</b> · hotel: w hotel<b>u</b> · pokój: w pokoj<b>u</b> · mieszkanie: w mieszkani<b>u</b><br>Irregular and essential: dom: <b>w domu</b> (at home)', 'w parku. w hotelu. w pokoju. w mieszkaniu. w domu.'),
					P('at home (dom)', 'w domu'),
					C('w ___ (in the park)', 'parku', ['parkie', 'parka', 'parkiem']),
					I('Feminine k, g and soft stems', 'Feminine -ka becomes <b>-ce</b>, -ga becomes <b>-dze</b>:<br>Polska: w Pols<b>ce</b> · Ameryka: w Amery<b>ce</b> · droga: na dro<b>dze</b> (on the road)<br>Feminine soft and hissing stems take <b>-i</b> or <b>-y</b>: Anglia: w Angli<b>i</b>, kuchnia: w kuchn<b>i</b>, praca: w prac<b>y</b>, ulica: na ulic<b>y</b>', 'w Polsce. w Ameryce. na drodze. w Anglii. w kuchni. w pracy. na ulicy.'),
					P('in Poland (Polska)', 'w Polsce'),
					I('W or na, o and po', '<b>w</b> for enclosed places: w kinie, w pracy, w sklepie<br><b>na</b> for surfaces, events and some set places: na stole, na koncercie, na poczcie, na uniwersytecie, na lotnisku<br><b>o</b> = about: Mówimy <b>o pracy</b>. Myślę <b>o tobie</b>.<br><b>po</b> = after: <b>po pracy</b>, <b>po obiedzie</b>', 'w kinie. na koncercie. na lotnisku. Mówimy o pracy. Myślę o tobie. po pracy. po obiedzie.'),
					P('after work (praca)', 'po pracy')
				]
			}
		]
	},
	{
		title: 'The other cases',
		sub: 'Instrumental, dative, vocative and the full map',
		lessons: [
			{
				id: 'pl-ins-1', title: 'Instrumental: with and by', sub: 'Company, professions, transport',
				steps: [
					I('The easiest endings', 'Instrumental (narzędnik):<br>Masculine and neuter: <b>-em</b>: brat: brat<b>em</b>, piwo: piw<b>em</b> (after k and g: -iem: sok: sok<b>iem</b>, mleko: mlek<b>iem</b>)<br>Feminine: -a becomes <b>-ą</b>: kawa: kaw<b>ą</b>, siostra: siostr<b>ą</b><br>Adjectives: <b>-ym</b> or <b>-im</b>, and <b>-ą</b>: z dobr<b>ym</b> bratem, z now<b>ą</b> sąsiadką', 'bratem. piwem. sokiem. mlekiem. kawą. siostrą.'),
					I('Use 1: z = together with', '<b>z</b> + instrumental = with. (z + genitive was "from". Same word, different case.)<br>kawa <b>z mlekiem</b> coffee with milk<br>herbata <b>z cytryną</b> tea with lemon<br>Idę do kina <b>z bratem</b>.', 'kawa z mlekiem. herbata z cytryną. Idę do kina z bratem.'),
					P('coffee with milk (kawa, mleko)', 'kawa z mlekiem'),
					P('tea with lemon (herbata, cytryna)', 'herbata z cytryną'),
					I('Use 2: what you are', 'After <b>być</b> (to be) and <b>zostać</b> (to become), a noun goes in the instrumental.<br>Jestem student<b>em</b>. Jestem studentk<b>ą</b>.<br>On jest dobr<b>ym</b> lekarz<b>em</b>.<br>After <b>to</b> the noun stays nominative: To jest student. An adjective on its own stays nominative too: Jestem zmęczony.', 'Jestem studentem. Jestem studentką. On jest dobrym lekarzem. To jest student.'),
					P('I am a student (a woman speaking: studentka)', 'Jestem studentką'),
					C('On jest ___ (He is a teacher, nauczyciel)', 'nauczycielem', ['nauczyciel', 'nauczyciela', 'nauczycielu']),
					I('Use 3: by means of', 'The tool or the transport, with no preposition at all:<br>Jadę <b>autobusem</b>. I go by bus. · <b>pociągiem</b> by train · <b>samochodem</b> by car<br>Piszę <b>długopisem</b>. I write with a pen.<br>Some verbs demand it: <b>Interesuję się muzyką.</b> I am interested in music.', 'Jadę autobusem. pociągiem. samochodem. Piszę długopisem. Interesuję się muzyką.'),
					P('I am going by train (jechać: jadę, pociąg)', 'Jadę pociągiem'),
					I('Position prepositions', 'Where something is, with the instrumental:<br><b>pod</b> under: pod stoł<b>em</b><br><b>nad</b> above, by the water: nad morz<b>em</b><br><b>przed</b> in front of, before: przed dom<b>em</b>, przed prac<b>ą</b><br><b>za</b> behind: za dom<b>em</b> · <b>między</b> between', 'pod stołem. nad morzem. przed domem. przed pracą. za domem.'),
					C('przed ___ (before work, praca)', 'pracą', ['praca', 'pracy', 'pracę']),
					H('Jadę autobusem', 'I am going by bus.')
				]
			},
			{
				id: 'pl-dat-1', title: 'Dative: to whom', sub: 'Giving, helping, and feelings that happen to you',
				steps: [
					I('The receiver', 'The dative (celownik) marks the person you give to, tell or help. You will mostly meet it in pronouns:<br>ja: <b>mi</b> · ty: <b>ci</b> · on: <b>mu</b> · ona: <b>jej</b><br>my: <b>nam</b> · wy: <b>wam</b> · oni, one: <b>im</b><br><b>Daj mi</b> to. Give me that. <b>Powiem ci</b> coś. I will tell you something.', 'Daj mi to. Powiem ci coś.'),
					P('Give me (daj)', 'Daj mi'),
					C('Pomogę ___ (I will help you, ty)', 'ci', ['cię', 'ty', 'tobą'], 'pomagać, pomóc take the dative.'),
					I('Noun endings', 'Masculine: <b>-owi</b>: student: student<b>owi</b>, Adam: Adam<b>owi</b>, syn: syn<b>owi</b><br>A few short common words take <b>-u</b>: brat: brat<b>u</b>, ojciec: ojc<b>u</b>, pan: pan<b>u</b>, pies: ps<b>u</b><br>Feminine: the same form as the locative: mama: mam<b>ie</b>, Anna: Ann<b>ie</b>, siostra: siost<b>rze</b>, koleżanka: koleżan<b>ce</b><br>Neuter: <b>-u</b>: dziecko: dzieck<b>u</b>', 'studentowi. Adamowi. bratu. ojcu. panu. mamie. Annie. siostrze. dziecku.'),
					P('I am giving mum a present: Daję ___ prezent (mama)', 'mamie'),
					C('Pomagam ___ (I help my brother, brat)', 'bratu', ['brata', 'bratem', 'bracie']),
					I('Verbs that want the dative', '<b>dawać, dać</b> to give · <b>mówić, powiedzieć</b> to tell · <b>pomagać, pomóc</b> to help<br><b>dziękować</b> to thank: Dziękuję <b>ci</b>. Dziękuję <b>panu</b>.<br><b>ufać</b> to trust · <b>wierzyć</b> to believe<br>And the preposition <b>dzięki</b> (thanks to): dzięki <b>tobie</b>', 'Dziękuję ci. Dziękuję panu. dzięki tobie.'),
					I('Feelings happen to you', 'Polish often says "to me it is..." where English says "I am...".<br><b>Zimno mi.</b> I am cold. <b>Gorąco mi.</b> I am hot.<br><b>Miło mi.</b> Nice to meet you. <b>Przykro mi.</b> I am sorry to hear that.<br><b>Podoba mi się</b> to miasto. I like this city (it pleases me).<br><b>Smakuje mi.</b> It tastes good. <b>Chce mi się spać.</b> I feel sleepy.', 'Zimno mi. Gorąco mi. Miło mi. Przykro mi. Podoba mi się to miasto. Smakuje mi. Chce mi się spać.'),
					P('I am cold (two words, starting with zimno)', 'Zimno mi', 'Literally: cold to me.', ['Jest mi zimno']),
					P('Nice to meet you (two words, starting with miło)', 'Miło mi', 'MEE-wo mee.', ['Bardzo mi miło']),
					C('"Przykro mi" means', 'I am sorry to hear that', ['I am bored', 'I am cold', 'I am in a hurry']),
					H('Podoba mi się Warszawa', 'I like Warsaw. Literally: Warsaw pleases me.')
				]
			},
			{
				id: 'pl-voc-1', title: 'Vocative and the case map', sub: 'Calling people, and all seven cases on one page',
				steps: [
					I('Calling someone', 'The vocative (wołacz) is the form for addressing a person directly.<br>Feminine -a becomes <b>-o</b>: mama: <b>mamo!</b> Anna: <b>Anno!</b><br>Pet names in -sia, -nia, -cia take <b>-u</b>: Kasia: <b>Kasiu!</b> Ania: <b>Aniu!</b> babcia: <b>babciu!</b><br>Masculine mostly matches the locative: pan: <b>panie!</b> Piotr: <b>Piotrze!</b> Marek: <b>Marku!</b> And tata: <b>tato!</b>', 'Mamo! Anno! Kasiu! Aniu! Babciu! Panie! Piotrze! Marku! Tato!'),
					P('Mum! (calling her: mama)', 'mamo'),
					P('Kasia! (calling her)', 'Kasiu'),
					I('Where you really need it', 'With first names, everyday speech often just uses the nominative (Kasia, chodź!). But polite formulas need the vocative:<br><b>Panie doktorze!</b> Doctor! <b>Panie profesorze!</b> Professor!<br><b>Szanowny Panie</b>, <b>Szanowna Pani</b> = Dear Sir, Dear Madam, in letters<br><b>Kochanie!</b> Darling!<br>The everyday <b>proszę pana</b>, <b>proszę pani</b> (excuse me, sir, madam) is a fixed phrase in the genitive.', 'Panie doktorze! Szanowny Panie. Szanowna Pani. Kochanie! Proszę pana. Proszę pani.'),
					C('A formal letter to a man starts', 'Szanowny Panie', ['Szanowny Pan', 'Drogi Panu', 'Cześć Panie']),
					C('Calling your grandmother (babcia)', 'Babciu!', ['Babcio!', 'Babcię!', 'Babcią!']),
					I('Seven cases, one map', '<b>Nominative</b> (kto? co?) the subject: <b>Kawa</b> jest dobra.<br><b>Genitive</b> (kogo? czego?) of, none, some: Nie ma <b>kawy</b>.<br><b>Dative</b> (komu? czemu?) to whom: Dziękuję <b>mamie</b>.<br><b>Accusative</b> (kogo? co?) the object: Piję <b>kawę</b>.<br><b>Instrumental</b> (kim? czym?) with, by: z <b>kawą</b><br><b>Locative</b> (o kim? o czym?) place, about: o <b>kawie</b><br><b>Vocative</b> calling: <b>Mamo!</b>', 'Kawa jest dobra. Nie ma kawy. Dziękuję mamie. Piję kawę. z kawą. o kawie. Mamo!'),
					C('Nie ma ___ (There is no coffee). Which case and form?', 'genitive: kawy', ['accusative: kawę', 'nominative: kawa', 'instrumental: kawą']),
					C('Rozmawiamy o ___ (We are talking about the film). Which case and form?', 'locative: filmie', ['accusative: film', 'genitive: filmu', 'instrumental: filmem']),
					P('I am going to the cinema with my sister (iść: idę, do + kino, z + siostra)', 'Idę do kina z siostrą', 'do + genitive, z + instrumental.', ['Idę z siostrą do kina']),
					P('Excuse me, sir (the fixed phrase with proszę)', 'Proszę pana'),
					H('Dzień dobry, panie doktorze', 'Good morning, doctor. The title is in the vocative.')
				]
			}
		]
	},
	{
		title: 'Aspect and time',
		sub: 'The heart of Polish: finished or in progress',
		lessons: [
			{
				id: 'pl-asp-1', title: 'Every verb comes in two', sub: 'Imperfective and perfective pairs',
				steps: [
					I('Process or result', 'This is the heart of Polish. Almost every English verb is a <b>pair</b> in Polish.<br><b>Imperfective</b> (niedokonany): the process, a habit, something ongoing or repeated. <b>robić</b> = to be doing, to do regularly<br><b>Perfective</b> (dokonany): one complete action with a result. <b>zrobić</b> = to get done<br>Robiłem obiad. I was making lunch. (maybe never finished)<br>Zrobiłem obiad. I made lunch. (it is ready)', 'robić. zrobić. Robiłem obiad. Zrobiłem obiad.'),
					C('"Wczoraj czytałem książkę" (imperfective) tells you', 'I spent time reading, with no word on finishing', ['I finished the whole book', 'I will read the book', 'I never read books']),
					I('Prefix pairs', 'Most often a <b>prefix</b> makes the perfective:<br>robić: <b>z</b>robić (do) · pisać: <b>na</b>pisać (write) · czytać: <b>prze</b>czytać (read)<br>jeść: <b>z</b>jeść (eat) · pić: <b>wy</b>pić (drink) · płacić: <b>za</b>płacić (pay) · uczyć się: <b>na</b>uczyć się (learn)<br>There is no single prefix. Learn each verb as a pair.', 'robić, zrobić. pisać, napisać. czytać, przeczytać. jeść, zjeść. pić, wypić. płacić, zapłacić.'),
					P('the perfective partner of pisać (to write)', 'napisać'),
					P('the perfective partner of czytać (to read)', 'przeczytać'),
					I('Stem changes and odd couples', 'Some pairs differ inside the word (the longer one is usually imperfective):<br>kupować: <b>kupić</b> (buy) · dawać: <b>dać</b> (give) · zapraszać: <b>zaprosić</b> (invite)<br>otwierać: <b>otworzyć</b> (open) · zamykać: <b>zamknąć</b> (close) · zaczynać: <b>zacząć</b> (begin)<br>And a few are two different verbs:<br>brać: <b>wziąć</b> (take) · mówić: <b>powiedzieć</b> (say) · widzieć: <b>zobaczyć</b> (see) · oglądać: <b>obejrzeć</b> (watch)', 'kupować, kupić. dawać, dać. otwierać, otworzyć. zamykać, zamknąć. brać, wziąć. mówić, powiedzieć. widzieć, zobaczyć.'),
					P('the perfective partner of kupować (to buy)', 'kupić'),
					C('The perfective partner of brać (to take) is', 'wziąć', ['dać', 'kupić', 'zobaczyć']),
					I('Signal words', 'Imperfective goes with: <b>często</b> (often), <b>zawsze</b> (always), <b>codziennie</b> (every day), <b>długo</b> (for a long time), <b>cały dzień</b> (all day), <b>zwykle</b> (usually)<br>Perfective goes with: <b>nagle</b> (suddenly), <b>w końcu</b> (finally), <b>już</b> (already), <b>od razu</b> (at once)<br>Perfective verbs have <b>no present tense</b>: a complete action cannot be happening right now.', 'często. zawsze. codziennie. długo. nagle. w końcu. już. od razu.'),
					C('Codziennie ___ kawę (Every day I drank coffee; a man speaking)', 'piłem', ['wypiłem', 'wypiję', 'wypić'], 'A habit: imperfective.'),
					C('W końcu ___ ten list (I finally wrote that letter; a man speaking)', 'napisałem', ['pisałem', 'piszę', 'pisać'], 'A result at last: perfective.'),
					P('to do, to get done (the perfective partner of robić)', 'zrobić')
				]
			},
			{
				id: 'pl-past-1', title: 'The past shows your gender', sub: 'One past tense, with -łem and -łam',
				steps: [
					I('Building the past', 'Drop <b>-ć</b>, add <b>-ł</b> plus an ending for gender and person. Example: robić.<br>ja: robi<b>łem</b> (a man), robi<b>łam</b> (a woman)<br>ty: robi<b>łeś</b>, robi<b>łaś</b><br>on robi<b>ł</b> · ona robi<b>ła</b> · ono robi<b>ło</b>', 'robiłem. robiłam. robiłeś. robiłaś. robił. robiła. robiło.'),
					P('I was doing (robić, a man speaking)', 'robiłem'),
					P('I was doing (robić, a woman speaking)', 'robiłam'),
					I('Plural: -li or -ły', 'Groups with at least one man take <b>-li</b>. All other groups (women, children, animals, things) take <b>-ły</b>.<br>my: robi<b>liśmy</b>, robi<b>łyśmy</b><br>wy: robi<b>liście</b>, robi<b>łyście</b><br>oni robi<b>li</b> · one robi<b>ły</b><br>The stress stays where it is in robili: ro-BI-liśmy.', 'robiliśmy. robiłyśmy. robiliście. robiłyście. robili. robiły.'),
					C('Anna i Marek ___ w domu (were at home, być)', 'byli', ['były', 'był', 'była'], 'One man in the group is enough for -li.'),
					P('they were (być, a group of women)', 'były'),
					I('Być and mieć in the past', 'być: <b>byłem</b>, <b>byłam</b>, byłeś, byłaś, był, była, było, byliśmy, byli, były<br>mieć: <b>miałem</b>, <b>miałam</b>, miał, miała, but <b>mieli</b> (men) and miały<br>Verbs in -eć have a before ł and go back to e before -li: chcieć: chciał, chcieli · widzieć: widział, widzieli', 'byłem. byłam. był. była. byli. miałem. miałam. mieli. chciał. chcieli.'),
					P('I was (być, a woman speaking)', 'byłam'),
					C('Oni ___ czas (They had time, mieć)', 'mieli', ['miali', 'miały', 'miał']),
					I('Iść, jeść and móc', 'iść (to go on foot) is irregular: <b>szedłem</b>, <b>szłam</b>, on <b>szedł</b>, ona <b>szła</b>, oni <b>szli</b>, one <b>szły</b><br>Its perfective pójść: <b>poszedłem</b>, <b>poszłam</b>, poszedł, poszła, poszli<br>jeść: jadłem, jadłam, jadł, jadła, <b>jedli</b>, jadły<br>móc: mogłem, mogłam, <b>mógł</b>, mogła, mogli', 'szedłem. szłam. szedł. szła. szli. poszedłem. poszłam. jadłem. jedli. mógł. mogła.'),
					P('she went (pójść)', 'poszła'),
					C('Wczoraj ___ nowy telefon (Yesterday I bought a new phone; a man speaking)', 'kupiłem', ['kupiłam', 'kupię', 'kupuję'])
				]
			},
			{
				id: 'pl-fut-1', title: 'Two futures', sub: 'Zrobię or będę robić',
				steps: [
					I('Perfective: the present form is the future', 'The aspect decides how you build the future.<br>A perfective verb conjugated like a present tense can only mean the future.<br>zrobić: <b>zrobię</b>, zrobisz, zrobi = I will do it (and finish)<br>napisać: <b>napiszę</b> · kupić: <b>kupię</b> · przeczytać: <b>przeczytam</b>', 'zrobię. zrobisz. zrobi. napiszę. kupię. przeczytam.'),
					P('I will do it (zrobić)', 'zrobię'),
					P('I will buy (kupić)', 'kupię'),
					I('Imperfective: będę + verb', 'For a process or a repeated action in the future, use the future of być:<br><b>będę</b>, <b>będziesz</b>, <b>będzie</b>, <b>będziemy</b>, <b>będziecie</b>, <b>będą</b><br>plus the infinitive: <b>Będę pracować.</b> I will be working.<br>or plus the past form, same meaning: <b>Będę pracował</b> (a man), <b>Będę pracowała</b> (a woman).<br>On its own it is the future of "to be": <b>Będę w domu.</b>', 'będę. będziesz. będzie. będziemy. będziecie. będą. Będę pracować. Będę w domu.'),
					P('I will be working (pracować, with the infinitive)', 'Będę pracować'),
					C('Jutro cały dzień ___ (Tomorrow I will be studying all day)', 'będę się uczyć', ['nauczę się', 'uczyłem się', 'będę się nauczyć'], 'cały dzień = a process: imperfective future.'),
					I('Never mix them', 'będę + perfective is always wrong. Never say "będę zrobić". Say <b>zrobię</b>.<br>Compare:<br><b>Będę czytać</b> tę książkę. I will be reading this book. (process)<br><b>Przeczytam</b> tę książkę. I will read it through. (result)', 'Będę czytać tę książkę. Przeczytam tę książkę.'),
					C('"I will read this article by tomorrow" (and finish it)', 'Przeczytam ten artykuł do jutra', ['Będę przeczytać ten artykuł do jutra', 'Czytałem ten artykuł do jutra', 'Będę czytam ten artykuł do jutra']),
					I('Irregular perfective futures', 'dać: <b>dam</b>, dasz, da ... dadzą<br>wziąć: <b>wezmę</b>, weźmiesz, weźmie<br>powiedzieć: <b>powiem</b>, powiesz, powie<br>pójść: <b>pójdę</b>, pójdziesz · pojechać: <b>pojadę</b>, pojedziesz<br>zobaczyć: <b>zobaczę</b>. Zobaczymy! We will see!', 'dam. wezmę. powiem. pójdę. pojadę. Zobaczymy!'),
					P('I will tell you (powiedzieć, ty)', 'Powiem ci'),
					P('We will see! (zobaczyć)', 'Zobaczymy'),
					H('Jutro będzie padać', 'It will rain tomorrow. padać = to rain, imperfective.')
				]
			}
		]
	},
	{
		title: 'Moving and counting',
		sub: 'Verbs of motion and numbers with the right noun form',
		lessons: [
			{
				id: 'pl-mot-1', title: 'Iść, jechać and their twins', sub: 'On foot or on wheels, once or regularly',
				steps: [
					I('On foot or on wheels', 'Polish has no single "to go". You must choose:<br><b>iść</b> = to go on foot: idę, idziesz, idzie, idziemy, idziecie, idą<br><b>jechać</b> = to go by vehicle: jadę, jedziesz, jedzie, jedziemy, jedziecie, jadą<br>Idę do sklepu. I am walking to the shop.<br>Jadę do Krakowa. I am travelling to Kraków.', 'idę. idziesz. idzie. jadę. jedziesz. jedzie. Idę do sklepu. Jadę do Krakowa.'),
					C('From Warsaw: "I am going to Berlin"', 'Jadę do Berlina', ['Idę do Berlina', 'Jadę do Berlin', 'Idę do Berlin'], 'Too far to walk, so jechać. And do takes the genitive.'),
					P('I am going (on foot, right now: iść)', 'idę'),
					I('Once or regularly', 'Each has a twin for repeated or habitual trips:<br>iść: <b>chodzić</b> (chodzę, chodzisz, chodzi)<br>jechać: <b>jeździć</b> (jeżdżę, jeździsz, jeździ)<br>Teraz <b>idę</b> do pracy. I am going to work now.<br>Codziennie <b>chodzę</b> do pracy. I go to work every day.<br>Często <b>jeżdżę</b> do Gdańska. I often go to Gdańsk.', 'chodzę. chodzisz. chodzi. jeżdżę. jeździsz. jeździ. Codziennie chodzę do pracy. Często jeżdżę do Gdańska.'),
					P('Często ___ do pracy samochodem (I often go to work by car: jeździć)', 'jeżdżę', 'jeżdżę = YEZH-jeh. Habit plus vehicle.'),
					C('Dzieci ___ do szkoły (Children go to school, as a general fact)', 'chodzą', ['idę', 'chodzi', 'jadę'], 'A habit: chodzić. Dzieci is plural: chodzą.'),
					I('One trip: pójść and pojechać', 'The perfective partners mean one complete trip, or setting off.<br><b>pójść</b>: pójdę (I will go), poszedłem, poszłam (I went)<br><b>pojechać</b>: pojadę, pojechałem, pojechałam<br>Jutro <b>pójdę</b> do lekarza. Tomorrow I will go to the doctor.<br>W lipcu <b>pojedziemy</b> nad morze. In July we will go to the seaside.', 'pójdę. poszedłem. poszłam. pojadę. pojechałem. Jutro pójdę do lekarza. W lipcu pojedziemy nad morze.'),
					P('I will go (by vehicle, one trip: pojechać)', 'pojadę'),
					I('Prefixes steer the verb', '<b>przy-</b> arrive: przyjść, przyjechać<br><b>wy-</b> go out, leave: wyjść, wyjechać<br><b>w-</b> go in: wejść · <b>prze-</b> cross: przejść · <b>do-</b> reach: dojść, dojechać<br>And <b>wrócić</b> = to come back.<br>O której <b>przyjdziesz</b>? What time will you come?', 'przyjść. przyjechać. wyjść. wyjechać. wejść. przejść. wrócić. O której przyjdziesz?'),
					C('"wyjść" means', 'to go out, to leave on foot', ['to arrive on foot', 'to go in', 'to come back']),
					I('Where to: do or na', '<b>do</b> + genitive for buildings, cities, countries, people: do kina, do Polski, do lekarza<br><b>na</b> + accusative for events, open spaces and some set places: na koncert, na spacer, na pocztę, na lotnisko<br><b>nad</b> + accusative to water: nad morze, nad jezioro · <b>w góry</b> to the mountains', 'do kina. do Polski. do lekarza. na koncert. na spacer. na pocztę. nad morze. w góry.'),
					P('Idę ___ (I am going to a concert: two words)', 'na koncert')
				]
			},
			{
				id: 'pl-num-1', title: 'Numbers and the 5+ rule', sub: 'Why it is dwa piwa but pięć piw',
				steps: [
					I('One to ten', '1 <b>jeden</b> · 2 <b>dwa</b> · 3 <b>trzy</b> · 4 <b>cztery</b> · 5 <b>pięć</b><br>6 <b>sześć</b> · 7 <b>siedem</b> · 8 <b>osiem</b> · 9 <b>dziewięć</b> · 10 <b>dziesięć</b><br>One and two have gender: <b>jeden</b> dom, <b>jedna</b> kawa, <b>jedno</b> piwo · <b>dwa</b> domy, <b>dwie</b> kawy, <b>dwa</b> piwa', 'jeden, dwa, trzy, cztery, pięć, sześć, siedem, osiem, dziewięć, dziesięć'),
					H('Ile to kosztuje', 'EE-leh to kosh-TOO-yeh = How much does it cost?'),
					C('two coffees', 'dwie kawy', ['dwa kawy', 'dwie kaw', 'dwa kawa'], 'Feminine: dwie.'),
					I('2, 3, 4 and then 5+', 'After <b>2, 3, 4</b> the noun is in the nominative plural: dwa piw<b>a</b>, trzy kaw<b>y</b>, cztery bilet<b>y</b><br>After <b>5 and up</b> the noun is in the <b>genitive plural</b>, and the verb is singular:<br>pięć <b>piw</b> · sześć <b>kaw</b> · dziesięć <b>biletów</b><br><b>Jest</b> pięć piw. There are five beers. (not "są")', 'dwa piwa. trzy kawy. cztery bilety. pięć piw. sześć kaw. dziesięć biletów.'),
					I('Genitive plural endings', 'Masculine: <b>-ów</b>: bilet: bilet<b>ów</b>, dom: dom<b>ów</b>, student: student<b>ów</b> (soft stems take -i or -y: dzień: dn<b>i</b>, lekarz: lekarz<b>y</b>)<br>Feminine and neuter: the ending <b>drops off</b>: kawa: kaw, minuta: minut, piwo: piw, słowo: słów<br>If that leaves an awkward cluster, an e slips in: książka: książ<b>e</b>k, okno: ok<b>ie</b>n', 'biletów. domów. studentów. dni. lekarzy. kaw. minut. piw. słów. książek. okien.'),
					P('five beers (pięć, piwo)', 'pięć piw'),
					P('ten tickets (dziesięć, bilet)', 'dziesięć biletów'),
					C('sześć ___ (six books, książka)', 'książek', ['książki', 'książka', 'książków']),
					I('Teens, tens, and the pattern returns', '11 jedenaście · 12 dwanaście · 15 piętnaście · 20 dwadzieścia · 30 trzydzieści · 50 pięćdziesiąt · 100 sto<br>12, 13 and 14 take the genitive plural like 5+. But bigger numbers <b>ending</b> in 2, 3, 4 go back to the nominative plural:<br>22 <b>bilety</b>, 34 <b>bilety</b>, but 25 <b>biletów</b> and 12 <b>biletów</b>', 'jedenaście. dwanaście. piętnaście. dwadzieścia. trzydzieści. pięćdziesiąt. sto.'),
					I('Years, złoty, hours', 'rok (year): 1 <b>rok</b> · 2, 3, 4 <b>lata</b> · 5+ <b>lat</b>: Mam trzydzieści lat.<br>złoty: 1 <b>złoty</b> · 2, 3, 4 <b>złote</b> · 5+ <b>złotych</b><br>godzina (hour): 1 godzina · 2 godzin<b>y</b> · 5 <b>godzin</b><br>The genitive plural also follows <b>ile</b> (how many), <b>dużo</b> and <b>kilka</b> (a few): kilka minut.', 'rok. dwa lata. pięć lat. dwa złote. pięć złotych. dwie godziny. pięć godzin.'),
					P('I am twenty years old (mieć: mam, dwadzieścia)', 'Mam dwadzieścia lat'),
					C('dwadzieścia dwa ___ (22 złoty)', 'złote', ['złotych', 'złoty', 'złotego'], 'Ends in 2: back to the nominative plural.')
				]
			}
		]
	},
	{
		title: 'Moods and glue',
		sub: 'Would, do it, się and the words that join sentences',
		lessons: [
			{
				id: 'pl-cond-1', title: 'By: would', sub: 'Polite requests, gdyby and żeby',
				steps: [
					I('Past form + by', 'Take the past form (the one in -ł) and add <b>by</b> plus the personal ending.<br>chcieć: chciał<b>bym</b> (a man), chciała<b>bym</b> (a woman) = I would like<br>ty: chciał<b>byś</b>, chciała<b>byś</b><br>on chciał<b>by</b> · ona chciała<b>by</b><br>my chcieli<b>byśmy</b> · wy chcieli<b>byście</b> · oni chcieli<b>by</b>, one chciały<b>by</b>', 'chciałbym. chciałabym. chciałbyś. chciałby. chciałaby. chcielibyśmy.'),
					P('I would like (chcieć, a man speaking)', 'chciałbym'),
					P('I would like (chcieć, a woman speaking)', 'chciałabym'),
					I('Polite requests', 'The conditional is how you sound polite.<br><b>Chciałbym</b> zarezerwować stolik. I would like to book a table.<br><b>Czy mógłby pan</b> mi pomóc? Could you help me, sir? (to a woman: <b>mogłaby pani</b>)<br><b>Mógłbyś</b> zamknąć okno? Could you close the window? (to a female friend: mogłabyś)', 'Chciałbym zarezerwować stolik. Czy mógłby pan mi pomóc? Mógłbyś zamknąć okno?'),
					C('To a man, formally: "Could you help me?"', 'Czy mógłby pan mi pomóc?', ['Czy mogłaby pan mi pomóc?', 'Czy możesz pan mi pomóc?', 'Czy mógłbyś pan mi pomóc?'], 'pan + third person masculine: mógłby.'),
					I('By can move', 'The <b>by</b> part is detachable. It likes to sit after the first word of the clause.<br>Chętnie <b>bym</b> poszedł. = Chętnie poszedł<b>bym</b>. I would gladly go.<br>Co <b>byś</b> zrobił? What would you do?', 'Chętnie bym poszedł. Co byś zrobił?'),
					I('If: gdyby', '<b>Gdybym</b> miał czas, <b>pojechałbym</b> do Polski. If I had time, I would go to Poland.<br>The endings attach to gdyby: gdyby<b>m</b>, gdyby<b>ś</b>, gdyby, gdyby<b>śmy</b>, gdyby<b>ście</b>, gdyby.<br>For real, likely conditions use <b>jeśli</b> + a normal tense: <b>Jeśli będę miał czas, pojadę.</b> If I have time, I will go.', 'Gdybym miał czas, pojechałbym do Polski. Jeśli będę miał czas, pojadę.'),
					C('___ miała pieniądze, kupiłabym dom (If I had money, I would buy a house)', 'Gdybym', ['Jeśli', 'Kiedy', 'Gdybyś']),
					P('What would you do? (zrobić, to a man, with by right after co)', 'Co byś zrobił', 'by + ś moves next to co.', ['Co zrobiłbyś']),
					I('Żeby: so that, to', '<b>żeby</b> = in order to, so that.<br>Same person: żeby + infinitive: Uczę się, <b>żeby mówić</b> po polsku.<br>Different person: żeby + ending + past form: Chcę, <b>żebyś przyszedł</b>. I want you to come.<br>English "I want you to..." is always <b>chcę, żebyś...</b> in Polish.', 'Uczę się, żeby mówić po polsku. Chcę, żebyś przyszedł.'),
					C('"I want you to know" (to a woman)', 'Chcę, żebyś wiedziała', ['Chcę ty wiedzieć', 'Chcę, żebyś wiesz', 'Chcę, że wiesz']),
					H('Chciałbym kawę', 'I would like a coffee (a man speaking).')
				]
			},
			{
				id: 'pl-imp-1', title: 'Imperative: do it', sub: 'Orders, invitations and niech',
				steps: [
					I('Orders to ty', 'Start from the <b>on, ona</b> form of the present.<br>Family -m, -sz: add <b>-j</b>: czyta: <b>czytaj!</b> · słucha: <b>słuchaj!</b> · czeka: <b>czekaj!</b><br>Other families: drop the final vowel: pisze: <b>pisz!</b> · mówi: <b>mów!</b> · idzie: <b>idź!</b> · pracuje: <b>pracuj!</b><br>o often turns into ó: robi: <b>rób!</b> · stoi: <b>stój!</b>', 'czytaj! słuchaj! czekaj! pisz! mów! idź! pracuj! rób! stój!'),
					P('Read! (czytać, to a friend)', 'czytaj'),
					P('Wait! (czekać, to a friend)', 'czekaj'),
					C('Do it! (zrobić, to a friend)', 'Zrób!', ['Zrobi!', 'Zrobij!', 'Zrobaj!'], 'zrobi: drop the i, and o becomes ó.'),
					I('We and you all', 'Add <b>-my</b> for "let us" and <b>-cie</b> for "you all".<br>czekaj: czekaj<b>my</b>, czekaj<b>cie</b><br>chodź (come): <b>chodźmy!</b> let us go · <b>chodźcie!</b><br>Irregular and common: być: <b>bądź!</b> · jeść: <b>jedz!</b> · wziąć: <b>weź!</b> · dać: <b>daj!</b> · powiedzieć: <b>powiedz!</b>', 'czekajmy. czekajcie. chodźmy! chodźcie! bądź! jedz! weź! daj! powiedz!'),
					P('Let us go! (from chodź)', 'chodźmy'),
					P('Tell me! (powiedzieć, mi)', 'Powiedz mi'),
					I('Formal: niech', 'To pan and pani: <b>niech</b> + third person. Or the softer proszę + infinitive.<br><b>Niech pan usiądzie.</b> Have a seat, sir.<br><b>Niech pani poczeka.</b> Please wait, madam.<br><b>Proszę usiąść.</b> Please sit down. <b>Proszę wejść.</b> Come in.', 'Niech pan usiądzie. Niech pani poczeka. Proszę usiąść. Proszę wejść.'),
					C('To an older woman: "Please wait"', 'Niech pani poczeka', ['Poczekaj pani', 'Niech pani poczekaj', 'Czekasz pani']),
					I('Aspect in commands', 'A positive command for one action is usually <b>perfective</b>: <b>Zamknij</b> okno. <b>Kup</b> chleb. <b>Zadzwoń</b> do mnie.<br>A negative command is normally <b>imperfective</b>: <b>Nie zamykaj</b> okna. <b>Nie kupuj</b> chleba. <b>Nie dzwoń.</b><br>Notice the genitive after nie: okno becomes okna.', 'Zamknij okno. Kup chleb. Zadzwoń do mnie. Nie zamykaj okna. Nie kupuj chleba.'),
					P('Nie ___ tego! (Do not buy that! kupować, to a friend)', 'kupuj', 'Negative command: imperfective. kupuje minus e = kupuj.'),
					H('Daj mi spokój', 'Leave me alone. Literally: give me peace.')
				]
			},
			{
				id: 'pl-refl-1', title: 'Się', sub: 'Myself, each other, and verbs that just have it',
				steps: [
					I('One word for all persons', '<b>się</b> = myself, yourself, himself, ourselves. It never changes.<br>myć <b>się</b> (to wash oneself): myję się, myjesz się, myje się<br>nazywać się (to be called): <b>Nazywam się</b> Anna Kowalska.<br>uczyć się (to learn): <b>Uczę się</b> polskiego. (what you learn goes in the genitive)', 'myję się. Nazywam się Anna Kowalska. Uczę się polskiego.'),
					P('I am learning Polish (uczyć się: uczę się, polski)', 'Uczę się polskiego'),
					I('Verbs that just have się', 'Many verbs take się with no "self" meaning at all:<br><b>bać się</b> to be afraid (boję się) · <b>śmiać się</b> to laugh (śmieję się) · <b>spieszyć się</b> to be in a hurry<br><b>cieszyć się</b> to be glad · <b>martwić się</b> to worry · <b>spóźnić się</b> to be late<br><b>podobać się</b> to please · <b>wydawać się</b> to seem · <b>dziać się</b> to happen: Co się dzieje?', 'Boję się. Śmieję się. Spieszę się. Cieszę się. Co się dzieje?'),
					P('I am afraid (bać się)', 'Boję się'),
					C('"Co się dzieje?" means', 'What is going on?', ['What are you doing?', 'Who is that?', 'Where is it?']),
					I('Where się goes', 'Się is weak. It never opens a sentence and likes to sit right after the first stressed word, often before the verb.<br><b>Jak się masz?</b> How are you?<br><b>Bardzo się cieszę.</b> I am very glad.<br>Starting with the verb is fine: <b>Cieszę się.</b>', 'Jak się masz? Bardzo się cieszę. Cieszę się.'),
					C('Which is correct?', 'Jak się nazywasz?', ['Się jak nazywasz?', 'Jak nazywasz?', 'Się nazywasz jak?']),
					I('Each other, and "one does"', 'Reciprocal: <b>Znamy się.</b> We know each other. <b>Widzimy się jutro.</b> See you tomorrow. <b>Kochają się.</b> They love each other.<br>Impersonal: third person + się = people in general.<br><b>Jak to się mówi po polsku?</b> How do you say that in Polish?<br><b>Tu się nie pali.</b> No smoking here.', 'Znamy się. Widzimy się jutro. Jak to się mówi po polsku? Tu się nie pali.'),
					P('We know each other (znać: znamy)', 'Znamy się'),
					P('How do you say that in Polish? (Jak to ... po polsku)', 'Jak to się mówi po polsku'),
					C('"Spieszę się" means', 'I am in a hurry', ['I am sleeping', 'I am singing', 'I am bored']),
					H('Bardzo się cieszę', 'I am very glad.')
				]
			},
			{
				id: 'pl-con-1', title: 'Connectors', sub: 'I, a, ale, bo, że, chociaż, który',
				steps: [
					I('The basic glue', '<b>i</b> = and · <b>a</b> = and, whereas (a contrast) · <b>ale</b> = but · <b>albo</b>, <b>lub</b> = or<br>Ja piję kawę, <b>a</b> ty herbatę. I drink coffee and you drink tea.<br><b>bo</b> = because (spoken) · <b>ponieważ</b> = because (written)<br><b>więc</b>, <b>dlatego</b> = so, that is why', 'Ja piję kawę, a ty herbatę. bo. ponieważ. więc. dlatego.'),
					C('Jestem zmęczony, ___ idę spać (I am tired, so I am going to bed)', 'więc', ['bo', 'ale', 'chociaż']),
					P('because (the short spoken word)', 'bo'),
					I('Że and czy', '<b>że</b> = that. It is never dropped, and a comma always comes before it.<br>Myślę, <b>że</b> masz rację. I think (that) you are right.<br>Wiem, <b>że</b> to trudne. I know it is hard.<br><b>czy</b> = whether: Nie wiem, <b>czy</b> przyjdzie. I do not know whether he will come.', 'Myślę, że masz rację. Wiem, że to trudne. Nie wiem, czy przyjdzie.'),
					H('Myślę, że masz rację', 'I think you are right. mieć rację = to be right.'),
					C('Nie wiem, ___ on jest w domu (I do not know whether he is at home)', 'czy', ['że', 'bo', 'więc']),
					I('Although, however', '<b>chociaż</b>, <b>choć</b> = although: Chociaż pada, idę na spacer.<br><b>mimo że</b> = even though · <b>jednak</b> = however, after all<br><b>natomiast</b> = whereas, on the other hand · <b>zamiast</b> + genitive = instead of', 'Chociaż pada, idę na spacer. mimo że. jednak. natomiast. zamiast.'),
					C('___ jest zimno, idziemy na spacer (Although it is cold)', 'Chociaż', ['Dlatego', 'Więc', 'Albo']),
					I('Time and sequence', '<b>kiedy</b>, <b>gdy</b> = when · <b>zanim</b> = before · <b>dopóki</b> = as long as · <b>jak tylko</b> = as soon as<br><b>najpierw</b> first · <b>potem</b> then · <b>w końcu</b> finally<br><b>Zanim</b> wyjdziesz, zamknij okno. Before you leave, close the window.', 'kiedy. zanim. dopóki. jak tylko. najpierw. potem. w końcu. Zanim wyjdziesz, zamknij okno.'),
					P('although (the longer form, starts with cho)', 'chociaż'),
					I('Który: which, who, that', '<b>który</b> agrees in gender with the noun it points back to: który, która, które.<br>To jest film, <b>który</b> lubię. That is the film (that) I like.<br>To jest kobieta, <b>która</b> tu pracuje.<br>Its case comes from its own clause: To jest książka, <b>którą</b> czytam. (accusative, because I read it)<br>Like że, it is never dropped.', 'To jest film, który lubię. To jest kobieta, która tu pracuje. To jest książka, którą czytam.'),
					C('To jest kawa, ___ lubię (This is the coffee that I like)', 'którą', ['który', 'które', 'kto'], 'kawa is feminine, and it is the object of lubię: accusative którą.')
				]
			}
		]
	},
	{
		title: 'Sounding real',
		sub: 'Fillers, regional speech, idioms and the formal register',
		lessons: [
			{
				id: 'pl-conv-1', title: 'No, wiesz, w sumie', sub: 'What people actually say between sentences',
				steps: [
					I('No does not mean no', 'The most confusing word in spoken Polish: <b>no</b> means "yeah", "well", "go on".<br><b>No tak.</b> Well, yes. <b>No dobra.</b> OK then. <b>No nie!</b> Oh no! No way!<br><b>No właśnie.</b> Exactly. <b>No to pa.</b> Right, bye then.<br>On the phone you will hear: no... no... no. They are agreeing.', 'No tak. No dobra. No nie! No właśnie. No to pa.'),
					C('Your Polish friend keeps saying "no" while you talk. They mean', 'yeah, go on', ['no, stop', 'I disagree', 'I did not hear you']),
					P('Exactly! (two words, the first is no)', 'No właśnie', 'no VWASH-nyeh.'),
					I('Buying time', '<b>wiesz</b> = you know · <b>znaczy</b>, <b>to znaczy</b> = I mean<br><b>w sumie</b> = actually, all in all · <b>jakby</b> = like, kind of<br><b>generalnie</b> = basically · <b>po prostu</b> = simply, just<br><b>W sumie</b> to nie wiem. Actually, I do not know.', 'wiesz. to znaczy. w sumie. jakby. generalnie. po prostu. W sumie to nie wiem.'),
					P('actually, all in all (two words)', 'w sumie'),
					C('In "To jest, jakby, trudne" the word jakby works as', 'like, kind of', ['because', 'never', 'tomorrow']),
					I('Reacting', '<b>Serio?</b> Seriously? · <b>Naprawdę?</b> Really? · <b>Żartujesz!</b> You are kidding!<br><b>Dokładnie.</b> Exactly. · <b>Jasne.</b> Sure, of course. · <b>Pewnie.</b> Sure.<br><b>Nie ma sprawy.</b> No problem. · <b>Spoko.</b> Chill, no worries.<br><b>Szkoda.</b> Pity. · <b>Trudno.</b> Oh well.', 'Serio? Naprawdę? Żartujesz! Dokładnie. Jasne. Pewnie. Nie ma sprawy. Spoko. Szkoda. Trudno.'),
					P('Seriously? (one word)', 'Serio'),
					P('No problem (three words, starting with nie ma)', 'Nie ma sprawy', undefined, ['Nie ma problemu']),
					C('"Trudno" as a one-word reply means', 'Oh well, nothing to be done', ['Congratulations', 'Try harder', 'I do not believe you']),
					I('Softeners and tags', '<b>chyba</b> = I guess, probably: Chyba tak. I think so.<br><b>może</b> = maybe · <b>raczej</b> = rather: Raczej nie. Probably not.<br><b>co nie?</b>, <b>nie?</b>, <b>prawda?</b> = right? isn\'t it?<br><b>Dobra</b> = OK (casual for dobrze) · <b>Na razie!</b> See you!', 'Chyba tak. może. Raczej nie. Co nie? Prawda? Dobra. Na razie!'),
					H('Chyba tak', 'HI-ba tak = I think so. chyba = I guess.')
				]
			},
			{
				id: 'pl-reg-1', title: 'Na pole or na dwór', sub: 'Warsaw, Kraków, Poznań and youth slang',
				steps: [
					I('Warsaw against Kraków', 'Polish is very uniform, but a few words start friendly wars.<br>Going outside: Warsaw says <b>na dwór</b> (to the courtyard), Kraków says <b>na pole</b> (to the field).<br>Being outside: <b>na dworze</b> against <b>na polu</b>.<br>Krakowians go "na pole" even in the city centre, which Varsovians find hilarious.', 'na dwór. na pole. na dworze. na polu.'),
					C('In Kraków, "I am going outside" is', 'Idę na pole', ['Idę na dworzec', 'Idę do pola', 'Idę w polu'], 'na dworzec would be "to the station".'),
					P('outside, to the outdoors (the Warsaw way, two words)', 'na dwór'),
					I('More regional words', 'Blueberries: <b>jagody</b> in Warsaw, <b>borówki</b> in Kraków.<br>Potatoes: <b>ziemniaki</b> everywhere, <b>pyry</b> in Poznań, <b>kartofle</b> in Silesia.<br>Slippers: <b>kapcie</b> in most places, <b>laczki</b> in Poznań and Silesia.<br>Kraków adds <b>-że</b> to commands: <b>chodźże!</b> <b>weźże!</b> Poznań tags sentences with <b>tej</b>.', 'jagody. borówki. ziemniaki. pyry. kartofle. kapcie. laczki. chodźże! weźże!'),
					C('"Pyry" is the Poznań word for', 'potatoes', ['slippers', 'blueberries', 'trams']),
					I('Colloquial everyday', 'Words everyone uses but textbooks leave for later:<br><b>fajny</b> = cool, nice · <b>spoko</b> = chill, fine<br><b>kasa</b> = money, cash · <b>robota</b> = work, a job · <b>facet</b> = guy<br><b>impreza</b> = party · <b>kumpel</b> = buddy<br><b>siema</b> = hi (very casual) · <b>nara</b> = bye (from na razie)', 'fajny. spoko. kasa. robota. facet. impreza. kumpel. siema. nara.'),
					P('cool, nice (masculine adjective, starts with f)', 'fajny'),
					P('hi (very casual, starts with s)', 'siema'),
					I('Youth slang', '<b>ogarniać</b> = to handle, to get it: Nie ogarniam. I cannot keep up.<br><b>masakra</b> = a nightmare, crazy · <b>sztos</b> = something excellent<br><b>beka</b> = a laugh: Ale beka! · <b>lipa</b> = rubbish, a letdown<br><b>mega</b> = very: mega fajny · <b>na luzie</b> = relaxed, no stress<br>Slang ages fast. Understand it first, use it with care.', 'Nie ogarniam. masakra. sztos. Ale beka! lipa. mega fajny. na luzie.'),
					C('"Nie ogarniam" means', 'I cannot cope, I do not get it', ['I am not coming', 'I am not hungry', 'I do not agree']),
					C('"Ale masakra!" is a reaction to something', 'extreme, usually awful', ['boring', 'cheap', 'very polite']),
					H('Siema, co tam', 'Hi, what is up? "Co tam?" = what is new with you.')
				]
			},
			{
				id: 'pl-idi-1', title: 'Not my circus', sub: 'Idioms and sayings that get a smile',
				steps: [
					I('Three to start', '<b>Nie mój cyrk, nie moje małpy.</b> Not my circus, not my monkeys = not my problem.<br><b>bułka z masłem</b> = a roll with butter = a piece of cake<br><b>mieć muchy w nosie</b> = to have flies in your nose = to be grumpy for no reason', 'Nie mój cyrk, nie moje małpy. bułka z masłem. mieć muchy w nosie.'),
					C('"To bułka z masłem" means', 'It is very easy', ['It is breakfast time', 'It is too expensive', 'It is a mess']),
					P('a piece of cake (literally: a roll with butter)', 'bułka z masłem'),
					C('Someone "ma muchy w nosie". They are', 'in a bad mood', ['very rich', 'very hungry', 'lying']),
					I('Animals and food', '<b>kupić kota w worku</b> = to buy a cat in a sack = a pig in a poke<br><b>Co ma piernik do wiatraka?</b> = what has gingerbread got to do with a windmill? = how is that relevant?<br><b>gdzie pieprz rośnie</b> = where pepper grows = as far away as possible<br><b>robić z igły widły</b> = to make a pitchfork out of a needle = a mountain out of a molehill', 'kupić kota w worku. Co ma piernik do wiatraka? gdzie pieprz rośnie. robić z igły widły.'),
					C('"Co ma piernik do wiatraka?" is said when something is', 'irrelevant', ['delicious', 'too expensive', 'broken']),
					P('not my circus, not my monkeys', 'nie mój cyrk, nie moje małpy'),
					I('Body and weather', '<b>trzymać kciuki</b> = to hold your thumbs = to keep your fingers crossed: Trzymam kciuki!<br><b>mieć coś z głowy</b> = to have something off your head = done and dusted<br><b>mieć dwie lewe ręce</b> = to have two left hands = to be clumsy<br><b>leje jak z cebra</b> = it is pouring as if from a bucket', 'Trzymam kciuki! mieć coś z głowy. mieć dwie lewe ręce. Leje jak z cebra.'),
					P('I am keeping my fingers crossed (trzymać: trzymam, kciuki)', 'Trzymam kciuki'),
					C('"Robisz z igły widły" means you are', 'making a big deal out of nothing', ['working very hard', 'sewing badly', 'telling the truth']),
					I('Sayings', '<b>Co kraj, to obyczaj.</b> Every country has its own customs.<br><b>Lepszy wróbel w garści niż gołąb na dachu.</b> A sparrow in the hand beats a pigeon on the roof.<br><b>Nie chwal dnia przed zachodem słońca.</b> Do not praise the day before sunset.<br><b>Gość w dom, Bóg w dom.</b> A guest in the house is God in the house.', 'Co kraj, to obyczaj. Lepszy wróbel w garści niż gołąb na dachu. Nie chwal dnia przed zachodem słońca. Gość w dom, Bóg w dom.'),
					H('To nie mój cyrk', 'That is not my circus: not my problem.')
				]
			},
			{
				id: 'pl-c2-1', title: 'The formal gear', sub: 'Official Polish and words that impress natives',
				steps: [
					I('Official Polish', 'Formal Polish avoids ty and plain verbs.<br><b>Szanowni Państwo</b> = Dear Sir or Madam, ladies and gentlemen<br><b>uprzejmie proszę o</b> + accusative = I kindly ask for<br><b>w związku z</b> + instrumental = in connection with<br><b>zwracam się z prośbą o</b> + accusative = I am writing to request<br><b>Z poważaniem</b> = Yours faithfully', 'Szanowni Państwo. Uprzejmie proszę o pomoc. w związku z. Zwracam się z prośbą. Z poważaniem.'),
					C('A formal letter ends with', 'Z poważaniem', ['Na razie', 'Siema', 'No to pa']),
					P('Yours faithfully (formal letter ending, two words)', 'Z poważaniem'),
					I('Formal twins of everyday words', 'bo: <b>ponieważ</b>, <b>gdyż</b> (because)<br>ale: <b>jednak</b>, <b>lecz</b> (but, however)<br>też: <b>również</b> (also)<br>teraz: <b>obecnie</b> (currently)<br>bardzo: <b>niezwykle</b> (remarkably)<br>mieć: <b>posiadać</b> (to possess) · zrobić: <b>dokonać</b> (to carry out)', 'ponieważ. gdyż. jednak. lecz. również. obecnie. niezwykle. posiadać. dokonać.'),
					C('The formal word for "też" (also) is', 'również', ['ponieważ', 'obecnie', 'niezwykle']),
					P('because (formal, written, starts with p)', 'ponieważ'),
					I('Words that impress', '<b>bynajmniej</b> = by no means, not at all. Many natives misuse it for "at least", which is <b>przynajmniej</b>.<br><b>poniekąd</b> = in a way, to some extent<br><b>aczkolwiek</b> = albeit, although<br><b>notabene</b> = by the way, incidentally<br><b>tudzież</b> = as well as (bookish)', 'bynajmniej. przynajmniej. poniekąd. aczkolwiek. notabene. tudzież.'),
					C('"Bynajmniej" means', 'by no means', ['at least', 'by the way', 'as soon as possible']),
					P('in a way, to some extent (one word, starts with po)', 'poniekąd'),
					I('Hedging like an editorial', '<b>w pewnym sensie</b> = in a sense<br><b>nie ulega wątpliwości, że</b> = there is no doubt that<br><b>warto podkreślić, że</b> = it is worth stressing that<br><b>z jednej strony... z drugiej strony</b> = on the one hand... on the other<br><b>reasumując</b> = to sum up · <b>innymi słowy</b> = in other words', 'w pewnym sensie. Nie ulega wątpliwości, że. Warto podkreślić, że. z jednej strony, z drugiej strony. reasumując. innymi słowy.'),
					C('"Nie ulega wątpliwości, że..." means', 'There is no doubt that...', ['It is hard to say whether...', 'Nobody believes that...', 'It is worth asking whether...']),
					H('Z jednej strony tak, z drugiej nie', 'On the one hand yes, on the other no.')
				]
			}
		]
	}
];

// Placement test: one band per CEFR level, easiest first. Stops at the first band not passed.
const PLACEMENT = [
	{ band: 'A1', steps: [
		C('"Dzień dobry" means', 'good morning, good day', ['good night', 'thank you', 'goodbye']),
		P('I am (być)', 'jestem'),
		C('To jest ___ książka (This is a new book)', 'nowa', ['nowy', 'nowe', 'nowi']),
		P('I have (mieć)', 'mam')
	] },
	{ band: 'A2', steps: [
		P('Piję ___ (I am drinking coffee: kawa)', 'kawę'),
		P('Nie mam ___ (I do not have time: czas)', 'czasu'),
		C('Mieszkam w ___ (I live in Warsaw)', 'Warszawie', ['Warszawa', 'Warszawę', 'Warszawy']),
		P('you speak (mówić, ty)', 'mówisz')
	] },
	{ band: 'B1', steps: [
		P('I was (być, a woman speaking)', 'byłam'),
		C('Jutro ___ ten list (Tomorrow I will write that letter and finish it)', 'napiszę', ['będę napisać', 'pisałem', 'napisałem']),
		P('five beers (pięć, piwo)', 'pięć piw'),
		C('Jestem ___ (I am a student; a man speaking)', 'studentem', ['studenta', 'studentowi', 'studencie'])
	] },
	{ band: 'B2', steps: [
		P('I would like (chcieć, a woman speaking)', 'chciałabym'),
		C('___ miał czas, pojechałbym do Polski (If I had time, I would go to Poland)', 'Gdybym', ['Jeśli', 'Kiedy', 'Żeby']),
		P('Codziennie ___ do pracy autobusem (Every day I go to work by bus: jeździć)', 'jeżdżę'),
		P('Nie ___ tego! (Do not buy that! kupować, to a friend)', 'kupuj')
	] },
	{ band: 'C1', steps: [
		C('"Nie mój cyrk, nie moje małpy" means', 'It is not my problem', ['I do not like animals', 'It is chaos here', 'I am not joking']),
		C('"Bynajmniej" means', 'by no means', ['at least', 'by the way', 'as usual']),
		P('Chcę, ___ wiedziała (I want you to know; to a woman, one word)', 'żebyś'),
		C('The formal, written word for "bo" (because) is', 'ponieważ', ['również', 'obecnie', 'poniekąd'])
	] }
];

// Starter word bank: [word, meaning, pronunciation for English speakers, example, example in English]
const SEED = [
	['cześć', 'hi; bye', 'CHESHCH', 'Cześć, co słychać?', 'Hi, how are things?'],
	['proszę', "please; here you go; you're welcome", 'PRO-sheh', 'Proszę, to dla ciebie.', 'Here you go, this is for you.'],
	['przepraszam', 'sorry; excuse me', 'psheh-PRA-sham', 'Przepraszam, gdzie jest dworzec?', 'Excuse me, where is the station?'],
	['dziękuję', 'thank you', 'jen-KOO-yeh', 'Dziękuję za pomoc.', 'Thank you for your help.'],
	['smacznego', 'enjoy your meal', 'smach-NEH-go', 'Smacznego! Zupa jest gorąca.', 'Enjoy! The soup is hot.'],
	['na zdrowie', 'cheers; bless you', 'na ZDRO-vyeh', 'Na zdrowie! Za nas.', 'Cheers! To us.'],
	['no', 'yeah, well (it does not mean "no")', 'NO', 'No dobra, idziemy.', 'OK then, we are going.'],
	['właśnie', 'exactly; just now', 'VWASH-nyeh', 'No właśnie, o to chodzi.', 'Exactly, that is the point.'],
	['chyba', 'I guess, probably', 'HI-ba', 'Chyba masz rację.', 'I guess you are right.'],
	['w sumie', 'actually, all in all', 'f SOO-myeh', 'W sumie to dobry pomysł.', 'Actually, that is a good idea.'],
	['serio', 'seriously', 'SER-yo', 'Serio? Nie wierzę.', 'Seriously? I do not believe it.'],
	['spoko', 'chill, no worries', 'SPO-ko', 'Spoko, mamy czas.', 'No worries, we have time.'],
	['fajny', 'cool, nice', 'FIGH-ni', 'To bardzo fajny film.', 'That is a really cool film.'],
	['może', 'maybe', 'MO-zheh', 'Może jutro pójdziemy do kina.', 'Maybe we will go to the cinema tomorrow.'],
	['już', 'already; right away', 'YOOSH', 'Już idę!', 'I am coming right now!'],
	['jeszcze', 'still; more, another', 'YESH-cheh', 'Jeszcze jedno piwo, proszę.', 'One more beer, please.'],
	['trochę', 'a bit', 'TRO-heh', 'Mówię trochę po polsku.', 'I speak a bit of Polish.'],
	['zaraz', 'in a moment', 'ZA-ras', 'Zaraz wracam.', 'I will be right back.'],
	['jakoś', 'somehow', 'YA-kosh', 'Jakoś to będzie.', 'It will work out somehow.'],
	['załatwić', 'to sort out, to get done by whatever means', 'za-WAT-veech', 'Muszę załatwić jedną sprawę.', 'I have to sort one thing out.'],
	['kombinować', 'to scheme, to find a clever workaround', 'kom-bee-NO-vach', 'Nie ma biletów, trzeba kombinować.', 'No tickets left, we need to get creative.'],
	['ogarnąć', 'to get a grip on, to handle', 'o-GAR-nonch', 'Muszę ogarnąć mieszkanie przed imprezą.', 'I have to get the flat in order before the party.'],
	['impreza', 'party', 'eem-PREH-za', 'W sobotę jest impreza u Kasi.', "There is a party at Kasia's on Saturday."],
	['kasa', 'cash, money (colloquial)', 'KA-sa', 'Nie mam teraz kasy.', 'I have no cash right now.'],
	['kac', 'hangover', 'KATS', 'Kac po weselu to klasyka.', 'A hangover after a wedding is a classic.'],
	['majówka', 'the long May weekend', 'ma-YOOF-ka', 'Na majówkę jedziemy w góry.', 'For the May weekend we are going to the mountains.'],
	['żal', 'regret, sorrow, pity', 'ZHAL', 'Żal mi tego psa.', 'I feel sorry for that dog.'],
	['tęsknić', 'to miss, to long for', 'TENSK-neech', 'Tęsknię za tobą.', 'I miss you.'],
	['przytulny', 'cosy', 'pshi-TOOL-ni', 'Masz bardzo przytulny pokój.', 'You have a very cosy room.'],
	['pyszny', 'delicious', 'PISH-ni', 'Ten sernik jest pyszny.', 'This cheesecake is delicious.'],
	['szkoda', 'pity, shame', 'SHKO-da', 'Szkoda, że nie możesz przyjść.', 'Pity you cannot come.'],
	['trudno', 'oh well; difficult', 'TROOD-no', 'Trudno, spróbujemy jutro.', 'Oh well, we will try tomorrow.'],
	['nie ma sprawy', 'no problem', 'nyeh ma SPRA-vi', 'Nie ma sprawy, pomogę ci.', 'No problem, I will help you.'],
	['dokładnie', 'exactly', 'do-KWAD-nyeh', 'Dokładnie tak myślę.', 'That is exactly what I think.'],
	['kochanie', 'darling', 'ko-HA-nyeh', 'Kochanie, gdzie są klucze?', 'Darling, where are the keys?'],
	['bułka z masłem', 'a piece of cake', 'BOOW-ka z MAS-wem', 'Ten egzamin to bułka z masłem.', 'This exam is a piece of cake.'],
	['trzymać kciuki', 'to keep your fingers crossed', 'TSHI-mach KCHOO-kee', 'Trzymam kciuki za ciebie!', 'I am keeping my fingers crossed for you!'],
	['nie mój cyrk, nie moje małpy', 'not my problem', 'nyeh mooy TSIRK, nyeh MO-yeh MAW-pi', 'To nie mój cyrk, nie moje małpy.', 'Not my circus, not my monkeys.'],
	['bynajmniej', 'by no means', 'bi-NIGH-mnyay', 'Nie jestem bynajmniej zmęczony.', 'I am by no means tired.'],
	['poniekąd', 'in a way, to some extent', 'po-NYEH-kont', 'Poniekąd masz rację.', 'In a way you are right.']
].map(([pt, en, say, ex, exEn]) => ({ pt, en, say, ex, exEn }));

// ---------- drills ----------
// Case drill: every singular form written out by hand.
// [nominative, English, genitive, dative, accusative, instrumental, locative, vocative]
const NOUNS = [
	['kawa', 'coffee', 'kawy', 'kawie', 'kawę', 'kawą', 'kawie', 'kawo'],
	['książka', 'book', 'książki', 'książce', 'książkę', 'książką', 'książce', 'książko'],
	['siostra', 'sister', 'siostry', 'siostrze', 'siostrę', 'siostrą', 'siostrze', 'siostro'],
	['praca', 'work', 'pracy', 'pracy', 'pracę', 'pracą', 'pracy', 'praco'],
	['mama', 'mum', 'mamy', 'mamie', 'mamę', 'mamą', 'mamie', 'mamo'],
	['brat', 'brother', 'brata', 'bratu', 'brata', 'bratem', 'bracie', 'bracie'],
	['dom', 'house', 'domu', 'domowi', 'dom', 'domem', 'domu', 'domu'],
	['student', 'student', 'studenta', 'studentowi', 'studenta', 'studentem', 'studencie', 'studencie'],
	['pies', 'dog', 'psa', 'psu', 'psa', 'psem', 'psie', 'psie'],
	['sklep', 'shop', 'sklepu', 'sklepowi', 'sklep', 'sklepem', 'sklepie', 'sklepie'],
	['lekarz', 'doctor', 'lekarza', 'lekarzowi', 'lekarza', 'lekarzem', 'lekarzu', 'lekarzu'],
	['miasto', 'city', 'miasta', 'miastu', 'miasto', 'miastem', 'mieście', 'miasto'],
	['okno', 'window', 'okna', 'oknu', 'okno', 'oknem', 'oknie', 'okno'],
	['morze', 'sea', 'morza', 'morzu', 'morze', 'morzem', 'morzu', 'morze']
];
// one cue sentence per case, chosen so it works with every noun above
const CASES = {
	acc: { name: 'Accusative', col: 4, cue: 'Widzę ___', en: 'I see the' },
	gen: { name: 'Genitive', col: 2, cue: 'Nie ma ___', en: 'There is no' },
	loc: { name: 'Locative', col: 6, cue: 'Mówimy o ___', en: 'We are talking about the' },
	ins: { name: 'Instrumental', col: 5, cue: 'Interesuję się ___', en: 'I am interested in the' },
	dat: { name: 'Dative', col: 3, cue: 'Przyglądam się ___', en: 'I am taking a close look at the' }
};
const caseItems = ({ name, col, cue, en }) =>
	NOUNS.map((n) => ({
		prompt: `${cue} (${n[0]})`,
		sub: `${name.toLowerCase()}: ${en} ${n[1]}`,
		answer: n[col],
		speak: cue.replace('___', n[col]),
		explain: `${n[0]}: gen. ${n[2]}, dat. ${n[3]}, acc. ${n[4]}, ins. ${n[5]}, loc. ${n[6]}, voc. ${n[7]}`
	}));

// typed drill item; answers with ł also accept plain l
const D = (prompt, answer, sub, accept, explain) => ({ prompt, answer, sub, explain, accept: alt(answer, accept), speak: prompt.includes('___') ? prompt.replace(/_+/, answer).replace(/\s*\(.*\)$/, '') : answer });
// multiple choice: fill the blank
const F = (prompt, answer, options, sub, explain) => ({ prompt, answer, options, sub, explain, speak: prompt.replace(/_+/, answer).replace(/\s*\(.*?\)/, '') });
// aspect pair: show the imperfective, type the perfective
const A = (imp, perf, en, accept) => D(`${imp}: perfective partner?`, perf, en, accept, `${imp} (process, habit), ${perf} (one finished action)`);

const DRILLS = {
	pres: { name: 'Present tense', items: [
		D('ja ___ (czytać)', 'czytam', 'I read'),
		D('ty ___ (mówić)', 'mówisz', 'you speak'),
		D('ona ___ (pisać)', 'pisze', 'she writes'),
		D('ja ___ (pisać)', 'piszę', 'I write'),
		D('my ___ (pracować)', 'pracujemy', 'we work'),
		D('ja ___ (pracować)', 'pracuję', 'I work'),
		D('oni ___ (mieć)', 'mają', 'they have'),
		D('wy ___ (mieć)', 'macie', 'you all have'),
		D('ty ___ (jeść)', 'jesz', 'you eat'),
		D('oni ___ (jeść)', 'jedzą', 'they eat'),
		D('ja ___ (móc)', 'mogę', 'I can'),
		D('ty ___ (móc)', 'możesz', 'you can'),
		D('oni ___ (wiedzieć)', 'wiedzą', 'they know'),
		D('ja ___ (chcieć)', 'chcę', 'I want'),
		D('wy ___ (robić)', 'robicie', 'you all do'),
		D('oni ___ (mówić)', 'mówią', 'they speak'),
		D('oni ___ (być)', 'są', 'they are'),
		D('my ___ (być)', 'jesteśmy', 'we are'),
		D('ty ___ (być)', 'jesteś', 'you are'),
		D('ja ___ (lubić)', 'lubię', 'I like'),
		D('oni ___ (mieszkać)', 'mieszkają', 'they live'),
		D('on ___ (znać)', 'zna', 'he knows (a person)')
	] },
	acc: { name: CASES.acc.name, items: caseItems(CASES.acc) },
	gen: { name: CASES.gen.name, items: caseItems(CASES.gen) },
	loc: { name: CASES.loc.name, items: caseItems(CASES.loc) },
	ins: { name: CASES.ins.name, items: caseItems(CASES.ins) },
	dat: { name: CASES.dat.name, items: caseItems(CASES.dat) },
	prep: { name: 'Prepositions', items: [
		F('Idę do ___ (kino)', 'kina', ['kino', 'kinie', 'kinem'], 'I am going to the cinema', 'do + genitive'),
		F('Jadę do ___ (Warszawa)', 'Warszawy', ['Warszawie', 'Warszawę', 'Warszawą'], 'I am going to Warsaw', 'do + genitive'),
		F('Mieszkam w ___ (Kraków)', 'Krakowie', ['Kraków', 'Krakowa', 'Krakowem'], 'I live in Kraków', 'w + locative'),
		F('Mieszkam w ___ (Polska)', 'Polsce', ['Polska', 'Polski', 'Polskę'], 'I live in Poland', 'w + locative'),
		F('Jestem z ___ (Polska)', 'Polski', ['Polska', 'Polsce', 'Polskę'], 'I am from Poland', 'z (from) + genitive'),
		F('Piję kawę z ___ (mleko)', 'mlekiem', ['mleko', 'mleku', 'mlekę'], 'I drink coffee with milk', 'z (with) + instrumental'),
		F('Piję herbatę bez ___ (cukier)', 'cukru', ['cukier', 'cukrem', 'cukrze'], 'I drink tea without sugar', 'bez + genitive'),
		F('Idę na ___ (koncert)', 'koncert', ['koncercie', 'koncertu', 'koncertem'], 'I am going to a concert', 'na + accusative for where you are heading'),
		F('Jestem na ___ (koncert)', 'koncercie', ['koncert', 'koncertu', 'koncertem'], 'I am at a concert', 'na + locative for where you are'),
		F('To prezent dla ___ (mama)', 'mamy', ['mamie', 'mamę', 'mamą'], 'It is a present for mum', 'dla + genitive'),
		F('Rozmawiamy o ___ (film)', 'filmie', ['film', 'filmu', 'filmem'], 'We are talking about the film', 'o + locative'),
		F('Idę na spacer po ___ (obiad)', 'obiedzie', ['obiad', 'obiadu', 'obiadem'], 'I am going for a walk after lunch', 'po (after) + locative'),
		F('Samochód stoi przed ___ (dom)', 'domem', ['domu', 'domowi', 'domy'], 'The car is parked in front of the house', 'przed + instrumental'),
		F('Jestem u ___ (babcia)', 'babci', ['babcia', 'babcię', 'babcią'], "I am at grandma's", 'u + genitive'),
		F('Dziękuję za ___ (kawa)', 'kawę', ['kawa', 'kawy', 'kawie'], 'Thank you for the coffee', 'za + accusative'),
		F('Idę przez ___ (park)', 'park', ['parku', 'parkiem', 'parka'], 'I am walking through the park', 'przez + accusative'),
		F('Idę do ___ (lekarz)', 'lekarza', ['lekarz', 'lekarzu', 'lekarzem'], 'I am going to the doctor', 'do + genitive'),
		F('Idę do kina z ___ (brat)', 'bratem', ['brata', 'bratu', 'brat'], 'I am going to the cinema with my brother', 'z (with) + instrumental'),
		F('Kot śpi pod ___ (stół)', 'stołem', ['stołu', 'stole', 'stoły'], 'The cat is sleeping under the table', 'pod + instrumental for position'),
		F('Czekam na ___ (siostra)', 'siostrę', ['siostra', 'siostry', 'siostrze'], 'I am waiting for my sister', 'czekać na + accusative'),
		F('Myślę o ___ (ty)', 'tobie', ['ty', 'ciebie', 'tobą'], 'I am thinking about you', 'o + locative')
	] },
	aspect: { name: 'Aspect pairs', items: [
		A('robić', 'zrobić', 'to do'),
		A('pisać', 'napisać', 'to write'),
		A('czytać', 'przeczytać', 'to read'),
		A('jeść', 'zjeść', 'to eat'),
		A('pić', 'wypić', 'to drink'),
		A('kupować', 'kupić', 'to buy'),
		A('dawać', 'dać', 'to give'),
		A('brać', 'wziąć', 'to take'),
		A('mówić', 'powiedzieć', 'to say'),
		A('widzieć', 'zobaczyć', 'to see'),
		A('oglądać', 'obejrzeć', 'to watch'),
		A('płacić', 'zapłacić', 'to pay'),
		A('otwierać', 'otworzyć', 'to open'),
		A('zamykać', 'zamknąć', 'to close'),
		A('zaczynać', 'zacząć', 'to begin'),
		A('kończyć', 'skończyć', 'to finish', ['zakończyć']),
		A('uczyć się', 'nauczyć się', 'to learn'),
		A('pytać', 'zapytać', 'to ask', ['spytać']),
		A('gotować', 'ugotować', 'to cook'),
		A('dzwonić', 'zadzwonić', 'to phone'),
		A('wracać', 'wrócić', 'to come back'),
		A('pomagać', 'pomóc', 'to help'),
		A('zapraszać', 'zaprosić', 'to invite')
	] },
	past: { name: 'Past tense', items: [
		D('ja ___ (być, a man)', 'byłem', 'I was'),
		D('ja ___ (być, a woman)', 'byłam', 'I was'),
		D('on ___ (mieć)', 'miał', 'he had'),
		D('oni ___ (mieć)', 'mieli', 'they had (men or mixed)'),
		D('ona ___ (pójść)', 'poszła', 'she went'),
		D('on ___ (pójść)', 'poszedł', 'he went'),
		D('my ___ (robić, women only)', 'robiłyśmy', 'we were doing'),
		D('my ___ (zrobić, men or mixed)', 'zrobiliśmy', 'we did, we got it done'),
		D('ona ___ (chcieć)', 'chciała', 'she wanted'),
		D('oni ___ (chcieć)', 'chcieli', 'they wanted (men or mixed)'),
		D('ja ___ (jeść, a man)', 'jadłem', 'I was eating'),
		D('oni ___ (jeść)', 'jedli', 'they were eating (men or mixed)'),
		D('ja ___ (móc, a woman)', 'mogłam', 'I could'),
		D('on ___ (móc)', 'mógł', 'he could'),
		D('ty ___ (kupić, a woman)', 'kupiłaś', 'you bought'),
		D('one ___ (widzieć)', 'widziały', 'they saw (women)'),
		D('oni ___ (iść)', 'szli', 'they were walking (men or mixed)'),
		D('on ___ (powiedzieć)', 'powiedział', 'he said'),
		D('ja ___ (napisać, a woman)', 'napisałam', 'I wrote'),
		D('ty ___ (czytać, a man)', 'czytałeś', 'you were reading')
	] },
	num: { name: 'Numbers and nouns', items: [
		D('pięć ___ (piwo)', 'piw', 'five beers', [], '5 and up: genitive plural.'),
		D('dwa ___ (piwo)', 'piwa', 'two beers', [], '2, 3, 4: nominative plural.'),
		D('trzy ___ (kawa)', 'kawy', 'three coffees', [], '2, 3, 4: nominative plural.'),
		D('sześć ___ (kawa)', 'kaw', 'six coffees', [], '5 and up: genitive plural.'),
		D('dziesięć ___ (bilet)', 'biletów', 'ten tickets', [], '5 and up: genitive plural in -ów.'),
		D('cztery ___ (bilet)', 'bilety', 'four tickets', [], '2, 3, 4: nominative plural.'),
		D('siedem ___ (książka)', 'książek', 'seven books', [], 'Genitive plural with an extra e.'),
		D('trzy ___ (książka)', 'książki', 'three books', [], '2, 3, 4: nominative plural.'),
		D('pięć ___ (rok)', 'lat', 'five years', [], 'rok: 2 lata, 5 lat.'),
		D('dwa ___ (rok)', 'lata', 'two years', [], 'rok: 2 lata, 5 lat.'),
		D('dwadzieścia dwa ___ (rok)', 'lata', 'twenty-two years', [], 'Ends in 2: back to lata.'),
		D('dwanaście ___ (rok)', 'lat', 'twelve years', [], '12, 13, 14 behave like 5 and up.'),
		D('pięć ___ (złoty)', 'złotych', 'five złoty', [], '2 złote, 5 złotych.'),
		D('trzy ___ (złoty)', 'złote', 'three złoty', [], '2 złote, 5 złotych.'),
		D('osiem ___ (godzina)', 'godzin', 'eight hours', [], '5 and up: genitive plural.'),
		D('cztery ___ (godzina)', 'godziny', 'four hours', [], '2, 3, 4: nominative plural.'),
		D('pięć ___ (dzień)', 'dni', 'five days', [], 'dzień: genitive plural dni.'),
		D('sześć ___ (dom)', 'domów', 'six houses', [], '5 and up: genitive plural in -ów.'),
		D('dziewięć ___ (minuta)', 'minut', 'nine minutes', [], '5 and up: genitive plural.'),
		D('pięć ___ (student)', 'studentów', 'five students', [], '5 and up: genitive plural in -ów.'),
		D('kilka ___ (słowo)', 'słów', 'a few words', [], 'kilka works like 5 and up.'),
		D('dwie ___ (minuta)', 'minuty', 'two minutes', [], '2, 3, 4: nominative plural.')
	] }
};

const ALL = Object.keys(DRILLS);

export default {
	code: 'pl',
	units: UNITS,
	seed: SEED,
	placement: PLACEMENT,
	keys: 'ąćęłńóśźż',
	levels: [[0, 'Turysta'], [150, 'Początkujący'], [500, 'Bywalec'], [1200, 'Gaduła'], [2500, 'Swój człowiek'], [5000, 'Prawie rodowity']],
	// [id, title, what you can do (with the matching state certificate level), lessons, drill groups in the checkpoint test]
	stages: [
		['A1.1', 'Pierwsze słowa', 'Read Polish aloud and say who you are (certificate A1)', ['pl-sounds-1', 'pl-sounds-2', 'pl-base-1'], ['pres']],
		['A1.2', 'Mam, jestem, robię', 'Introduce yourself and talk about now (certificate A1)', ['pl-base-2', 'pl-pres-1'], ['pres']],
		['A2.1', 'Biernik i dopełniacz', 'Order, say what you have and what you lack (certificate A2)', ['pl-acc-1', 'pl-gen-1'], ['pres', 'acc', 'gen']],
		['A2.2', 'Gdzie i z kim', 'Say where you are, who with and how you travel (certificate A2)', ['pl-loc-1', 'pl-ins-1'], ['loc', 'ins', 'prep']],
		['B1.1', 'Siedem przypadków', 'Use all seven cases and choose the right aspect (certificate B1)', ['pl-dat-1', 'pl-voc-1', 'pl-asp-1'], ['dat', 'aspect', 'prep']],
		['B1.2', 'Wczoraj i jutro', 'Tell what happened and what will happen (certificate B1)', ['pl-past-1', 'pl-fut-1'], ['aspect', 'past']],
		['B2.1', 'W drodze', 'Get around and count anything (certificate B2)', ['pl-mot-1', 'pl-num-1'], ['num', 'past', 'prep']],
		['B2.2', 'Chciałbym', 'Ask politely, speculate and give instructions (certificate B2)', ['pl-cond-1', 'pl-imp-1'], ['aspect', 'past', 'num']],
		['B2.3', 'Wszystko naraz', 'Build long sentences with every structure (certificate B2)', ['pl-refl-1', 'pl-con-1'], ALL],
		['C1.1', 'Prawdziwa rozmowa', 'Follow fast talk, fillers and regional words (certificate C1)', ['pl-conv-1', 'pl-reg-1'], ALL],
		['C1.2', 'Idiomy', 'Catch and use idioms and sayings (certificate C1)', ['pl-idi-1'], ALL],
		['C1.3', 'Styl oficjalny', 'Write formal letters and read the press (certificate C1)', ['pl-c2-1'], ALL],
		['C2.1', 'Biegłość', 'Surprise natives with your word choice (certificate C2)', [], ALL],
		['C2.2', 'Prawie rodowity', 'Hold your own anywhere, on anything (certificate C2)', [], ALL]
	],
	// writing tasks for the B and C checkpoint tests: [task, English hint]
	writing: {
		B: [
			['Opowiedz, co robiłeś lub robiłaś w ostatni weekend.', 'Say what you did last weekend. 2 or 3 sentences, past tense with the right gender.'],
			['Opisz swoje mieszkanie albo dom.', 'Describe your flat or house. 2 or 3 sentences, with w and na plus the locative.'],
			['Co zrobisz jutro, a co będziesz robić przez cały tydzień?', 'What will you get done tomorrow, and what will you be doing all week? Use both futures.'],
			['Co byś zrobił lub zrobiła, gdybyś wygrał lub wygrała milion złotych?', 'What would you do if you won a million złoty? Use gdyby and by.'],
			['Napisz wiadomość do kolegi: zaproś go na imprezę w sobotę.', 'Write a message inviting a friend to a party on Saturday. 2 or 3 sentences.']
		],
		C: [
			['Praca zdalna jest lepsza niż praca w biurze. Zgadzasz się? Uzasadnij.', 'Argue for or against remote work. 3 or 4 sentences, with jednak, ponieważ, natomiast.'],
			['Napisz oficjalny e-mail do urzędu z prośbą o przedłużenie terminu.', 'Write a formal email asking an office for a deadline extension. Open with Szanowni Państwo, close with Z poważaniem.'],
			['Opowiedz o sytuacji, w której musiałeś lub musiałaś coś załatwić za granicą.', 'Tell about a time you had to sort something out abroad. Watch your aspect choices.'],
			['Wyjaśnij przysłowie "Co kraj, to obyczaj" i podaj przykład z własnego życia.', 'Explain the proverb and give an example from your own life. 3 or 4 sentences.'],
			['Czy media społecznościowe zbliżają ludzi, czy ich od siebie oddalają?', 'Do social media bring people together or push them apart? Use z jednej strony, z drugiej strony.']
		]
	},
	chat: {
		who: 'Kasia, from Warsaw. She fixes your Polish as you go.',
		hint: 'Say hi. Try: "Cześć Kasia, co słychać?"',
		placeholder: 'Napisz po polsku...',
		scenes: ['Free chat', 'Ordering in a cafe', 'At the bakery', 'Asking the way', 'Meeting the family', 'Job interview']
	},
	drill: tableDrill(DRILLS, { start: ['acc'] }),
	ui: {
		check: 'Sprawdź', next: 'Dalej', start: 'Zaczynamy', right: 'Dobrze!', answer: 'Poprawna odpowiedź:', again: 'Jeszcze raz', learn: 'Nauka',
		hear: 'Posłuchaj', rec: 'Nagraj', stop: 'Stop i sprawdź', recording: 'Nagrywanie...', skipped: 'Pominięte',
		polished: 'Dobrze! Lepsza wersja:', fixed: 'Poprawiona wersja:', placeholder: 'Po polsku...', write: 'Pisz tutaj...',
		perfect: 'Idealnie!', good: 'Brawo!', almost: 'Prawie',
		hello: ['Dzień dobry', 'Dzień dobry', 'Dobry wieczór'], days: ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'], today: 'Dzisiaj',
		quiz: 'Quiz dnia', done: 'Zrobione', extra: 'Ekstra', nextLesson: 'Następna lekcja',
		drill: 'Ćwiczenia', drillSub: 'Przypadki, aspekt, czasowniki', review: 'Powtórka', songs: 'Piosenki i linki', speak: 'Mów',
		learnTitle: 'Nauka', add: 'Dodaj', bank: 'Słówka', allDone: 'Wszystko zrobione', chat: 'Czat', welcome: 'Witaj',
		need: (n) => `Potrzebujesz ${n}. Spróbuj jeszcze raz!`, typeLabel: 'Type it in Polish', sayLabel: 'Say it in Polish',
		near: 'Right, but check the Polish letters.', custom: 'Lekcja na zamówienie', yours: 'Twoje lekcje', roadmap: 'Plan nauki', linkText: 'Link lub tekst',
		drillEyebrow: 'Ćwiczenia', drillQ: 'What do you want to drill?',
		drillBlurb: 'Ten quick questions on cases, aspect, verb forms and numbers. Each one names the verb or noun to use. Missed ones come back at the end.'
	}
};
