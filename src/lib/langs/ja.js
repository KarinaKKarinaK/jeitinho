// Japanese pack: course, starter words, placement test, drills, roadmap.
// Stage targets follow the JLPT levels (N5 to N1) and the JF Standard can-do approach, mapped onto CEFR.
// Every typed answer also accepts the hiragana reading and Hepburn romaji, so no Japanese keyboard is needed.
import { I, C, T, L, tableDrill } from './kit.js';
import { withMore } from './kit.js';
import { MORE, SEED_POS } from './words/ja.js';

// accepted spellings: the reading in kana, romaji, plus common variants (私 typed as わたし, the particle を typed as wo)
const alt = (ja, kana, romaji, more = []) => {
	const out = [kana, romaji, ...more];
	if (ja.includes('私')) out.push(ja.replace(/私/g, 'わたし'));
	if (romaji.includes(' o ')) out.push(romaji.replace(/ o /g, ' wo '));
	return [...new Set(out)].filter((a) => a !== ja);
};
const gloss = (ja, kana, romaji) => (ja === kana ? `${ja} (${romaji})` : `${ja} = ${kana} (${romaji})`);
// typed answer: Japanese writing, or kana, or romaji
const J = (prompt, ja, kana, romaji, explain, more) => T(prompt, ja, gloss(ja, kana, romaji) + (explain ? '. ' + explain : ''), alt(ja, kana, romaji, more));
// listening: same three ways to answer
const H = (ja, kana, romaji, en, more) => L(ja, `${gloss(ja, kana, romaji)} = ${en}`, alt(ja, kana, romaji, more));

const UNITS = [
	{
		title: 'Kana and sound',
		sub: 'Hiragana, katakana and the rhythm of Japanese',
		lessons: [
			{
				id: 'ja-kana-1', title: 'Hiragana', sub: 'One symbol, one beat',
				steps: [
					I('Three scripts, one language', 'Japanese mixes three scripts in one sentence.<br><b>Hiragana</b> ひらがな: grammar and native words<br><b>Katakana</b> カタカナ: foreign words and names<br><b>Kanji</b> 漢字: characters from Chinese that carry meaning<br>In this app you can answer in Japanese writing, in hiragana, or in romaji (Latin letters), so no special keyboard is needed.'),
					I('Five vowels', 'あ a · い i · う u · え e · お o<br>Always the same sound: a as in "father", i as in "ski", u as in "flu" with relaxed lips, e as in "pet", o as in "more".', 'あ。い。う。え。お。'),
					C('Which is "e"?', 'え', ['あ', 'お', 'う']),
					I('Each kana is one beat', 'The rest are consonant + vowel:<br>か ka · き ki · く ku · け ke · こ ko<br>さ sa · し <b>shi</b> · す su · せ se · そ so<br>た ta · ち <b>chi</b> · つ <b>tsu</b> · て te · と to<br>Three surprises: し shi, ち chi, つ tsu. Later you will also meet ふ <b>fu</b>.', 'かきくけこ。さしすせそ。たちつてと。'),
					C('つ is read', 'tsu', ['su', 'chi', 'shi']),
					I('Look-alike traps', 'さ sa / き ki / ち chi<br>ぬ nu / め me (ぬ ends in a loop)<br>ね ne / れ re / わ wa (ね ends in a loop)<br>は ha / ほ ho (ほ has an extra line on top)<br>る ru / ろ ro (る ends in a loop)'),
					C('Which one is "nu"?', 'ぬ', ['め', 'ね', 'あ']),
					C('Which one is "ro"?', 'ろ', ['る', 'そ', 'ら']),
					J('sushi (in hiragana)', 'すし', 'すし', 'sushi'),
					H('ねこ', 'ねこ', 'neko', 'cat', ['猫']),
					I('ん, the only lone consonant', 'ん n is a full beat on its own.<br>ほん hon (book) is two beats: ho-n.<br>にほん Nihon (Japan) is three: ni-ho-n.', 'ほん。にほん。'),
					J('Japan (in hiragana)', 'にほん', 'にほん', 'nihon', '', ['日本'])
				]
			},
			{
				id: 'ja-kana-2', title: 'Dots, small kana, long vowels', sub: 'Tiny marks that change the word',
				steps: [
					I('Two dots change the sound', 'The dakuten ゛ voices the consonant:<br>か ka becomes が ga · さ sa becomes ざ za · た ta becomes だ da · は ha becomes ば ba<br>Watch out: じ is ji, ず is zu.<br>A small circle ゜ makes p: は ha becomes ぱ pa.', 'か、が。さ、ざ。た、だ。は、ば、ぱ。'),
					C('ぱ is read', 'pa', ['ba', 'ha', 'ma']),
					C('Which is "ji"?', 'じ', ['し', 'ち', 'ず']),
					I('Small っ doubles the next consonant', 'A small っ is a silent beat: hold the next consonant.<br>きて kite (come) vs きって kitte (stamp)<br>がっこう gakkou (school) · ちょっと chotto (a little)<br>In romaji, double the consonant.', 'きて。きって。がっこう。ちょっと。'),
					J('a little (in hiragana)', 'ちょっと', 'ちょっと', 'chotto'),
					I('Small ゃ ゅ ょ', 'An i-row kana plus a small ゃ ゅ ょ fuses into one beat.<br>き + ゃ = きゃ kya · し + ゅ = しゅ shu · ち + ょ = ちょ cho · り + ょ = りょ ryo<br>びよういん biyouin (hair salon) vs びょういん byouin (hospital): size matters.', 'きゃ。しゅ。ちょ。りょ。びよういん。びょういん。'),
					C('びょういん (small ょ) means', 'hospital', ['hair salon', 'school', 'bank']),
					I('Long vowels', 'A long vowel lasts two beats and can change the word.<br>おばさん obasan (aunt) vs おば<b>あ</b>さん obaasan (grandmother)<br>Long o is usually written お-sound + <b>う</b>: とうきょう Toukyou. Long e is usually え-sound + <b>い</b>: せんせい sensei.<br>Type romaji the way the kana is written: ou, ei, uu.', 'おばさん。おばあさん。とうきょう。せんせい。'),
					C('おばあさん means', 'grandmother', ['aunt', 'older sister', 'mother']),
					J('thank you', 'ありがとう', 'ありがとう', 'arigatou', '', ['arigato']),
					H('がっこう', 'がっこう', 'gakkou', 'school', ['学校', 'gakko']),
					J('teacher (in hiragana)', 'せんせい', 'せんせい', 'sensei', '', ['先生'])
				]
			},
			{
				id: 'ja-kana-3', title: 'Katakana, beats and pitch', sub: 'Loanwords and the metronome rhythm',
				steps: [
					I('Katakana: same sounds, sharper shapes', 'Katakana writes foreign words, foreign names and sound effects.<br>ア a · イ i · ウ u · エ e · オ o<br>コーヒー koohii (coffee) · テレビ terebi (TV) · アメリカ Amerika<br>The bar <b>ー</b> makes the vowel before it long.', 'コーヒー。テレビ。アメリカ。'),
					C('コーヒー is', 'coffee', ['cola', 'copy', 'curry']),
					I('Katakana look-alikes', 'シ shi / ツ tsu: the small strokes of シ lie sideways, those of ツ point down<br>ソ so / ン n: same idea, ソ is written from the top, ン from the side<br>ク ku / タ ta / ケ ke<br>ウ u / ワ wa'),
					C('Which is "tsu"?', 'ツ', ['シ', 'ソ', 'ン']),
					C('Which is "n"?', 'ン', ['ソ', 'ツ', 'ノ']),
					I('Foreign words get reshaped', 'Every consonant needs a vowel, so English words stretch.<br>ホテル hoteru (hotel) · タクシー takushii (taxi) · ビール biiru (beer) · パン pan (bread, from Portuguese)<br>Careful: ビル biru is a building, ビール biiru is beer.', 'ホテル。タクシー。ビール。ビル。パン。'),
					C('ビール means', 'beer', ['building', 'bill', 'ball']),
					J('hotel (in katakana)', 'ホテル', 'ほてる', 'hoteru'),
					I('Mora timing', 'Japanese rhythm is counted in beats (mora), each the same length, like a metronome.<br>とうきょう = to-u-kyo-u, 4 beats (not 2 syllables)<br>にっぽん = ni-p-po-n, 4 beats<br>Small っ, ん and the second half of a long vowel each take a full beat.', 'とうきょう。にっぽん。'),
					C('How many beats in がっこう?', '4', ['2', '3', '5'], 'ga-k-ko-u.'),
					I('Pitch, not stress', 'English makes one syllable louder. Japanese keeps the volume even and moves the pitch up or down.<br>箸 chopsticks: <b>HA</b>-shi, high then low<br>橋 bridge: ha-<b>SHI</b>, low then high<br>That is the Tokyo pattern. Context usually saves you, so aim for flat and even first.', '箸。橋。'),
					J('TV (in katakana)', 'テレビ', 'てれび', 'terebi')
				]
			}
		]
	},
	{
		title: 'First sentences',
		sub: 'です, the core particles and pointing at things',
		lessons: [
			{
				id: 'ja-base-1', title: 'A は B です', sub: 'Am, is, are, questions and no',
				steps: [
					I('A は B です', '<b>私は学生です。</b> Watashi wa gakusei desu. I am a student.<br><b>は</b> marks the topic ("as for me"). As a particle it is written は but said <b>wa</b>.<br><b>です</b> desu is a polite "am, is, are". The final u is barely heard: "dess".<br>No articles, no plurals, and the verb comes last.', '私は学生です。'),
					J('I am a student (I = 私 watashi, student = 学生 gakusei)', '私は学生です', 'わたしはがくせいです', 'watashi wa gakusei desu'),
					I('Questions with か', 'Add <b>か</b> ka at the end. Nothing else changes.<br>学生です<b>か</b>。Are you a student?<br>はい、そうです。Yes, that is right.<br>いいえ、ちがいます。No, that is not right.', '学生ですか。はい、そうです。いいえ、ちがいます。'),
					J('Are you a teacher? (teacher = 先生 sensei)', '先生ですか', 'せんせいですか', 'sensei desu ka'),
					I('Not: じゃありません', 'The negative of です is <b>じゃありません</b> ja arimasen (more formal: ではありません).<br>学生<b>じゃありません</b>。I am not a student.<br>Casual speech: 学生<b>じゃない</b>。', '学生じゃありません。学生じゃない。'),
					C('"I am not a teacher" is', '先生じゃありません', ['先生ですか', '先生もです', '先生のです']),
					I('の links nouns', 'A <b>の</b> B = B of A, A\'s B.<br>私<b>の</b>本 watashi no hon = my book<br>日本語<b>の</b>先生 = a teacher of Japanese<br>東京<b>の</b>大学 = a university in Tokyo', '私の本。日本語の先生。東京の大学。'),
					J('my book (book = 本 hon)', '私の本', 'わたしのほん', 'watashi no hon'),
					I('も = also', '<b>も</b> mo replaces は to say "too".<br>私は学生です。田中さん<b>も</b>学生です。I am a student. Tanaka is a student too.<br><b>さん</b> goes after other people\'s names, never your own.', '私は学生です。田中さんも学生です。'),
					C('私は日本人です。田中さん___日本人です。(Tanaka too)', 'も', ['の', 'か', 'を']),
					C('Your name is Maria. How do you introduce yourself?', 'マリアです', ['マリアさんです', 'マリアもか', 'マリアのです'], 'Never add さん to your own name.'),
					H('はじめまして', 'はじめまして', 'hajimemashite', 'Nice to meet you (first meeting)', ['初めまして'])
				]
			},
			{
				id: 'ja-base-2', title: 'これ, それ, あれ and existing', sub: 'Pointing words, あります and います',
				steps: [
					I('こ そ あ ど', 'こ = near me, そ = near you, あ = far from both, ど = question.<br><b>これ</b> this · <b>それ</b> that (by you) · <b>あれ</b> that over there · <b>どれ</b> which one<br><b>ここ</b> here · <b>そこ</b> there · <b>あそこ</b> over there · <b>どこ</b> where', 'これ。それ。あれ。どれ。ここ。そこ。あそこ。どこ。'),
					C('The thing is in your listener\'s hand. You call it', 'それ', ['これ', 'あれ', 'どれ']),
					I('この + noun', 'これ stands alone. Before a noun use <b>この, その, あの, どの</b>.<br><b>これ</b>は本です。This is a book.<br><b>この</b>本は私のです。This book is mine.', 'これは本です。この本は私のです。'),
					C('___本はいくらですか。(How much is this book?)', 'この', ['これ', 'ここ', 'どれ']),
					J('What is this? (what = 何 nan)', 'これは何ですか', 'これはなんですか', 'kore wa nan desu ka', '', ['これはなんですか']),
					I('あります and います', 'Two verbs for "there is" and "to have":<br><b>あります</b> arimasu for things and plants<br><b>います</b> imasu for people and animals<br>What exists takes <b>が</b>, the place takes <b>に</b>.<br>つくえの上<b>に</b>本<b>が</b>あります。There is a book on the desk.<br>公園<b>に</b>犬<b>が</b>います。There is a dog in the park.', 'つくえの上に本があります。公園に犬がいます。'),
					C('ねこが___。(There is a cat.)', 'います', ['あります', 'です', 'ですか'], 'Animals and people take います.'),
					J('There is a book (book = 本 hon)', '本があります', 'ほんがあります', 'hon ga arimasu'),
					I('Negatives', 'あります becomes <b>ありません</b>. います becomes <b>いません</b>.<br>時間が<b>ありません</b>。I have no time.<br>だれも<b>いません</b>。Nobody is here.', '時間がありません。だれもいません。'),
					J('Where is the toilet? (toilet = トイレ toire)', 'トイレはどこですか', 'といれはどこですか', 'toire wa doko desu ka'),
					C('あそこ means', 'over there, away from both of us', ['here, by me', 'there, by you', 'where']),
					H('時間がありません', 'じかんがありません', 'jikan ga arimasen', 'I have no time')
				]
			},
			{
				id: 'ja-base-3', title: 'を, に, で, へ, と', sub: 'Small words that say who does what where',
				steps: [
					I('Particles mark the job of each word', 'A small word after each noun says what it does in the sentence.<br><b>を</b> (said o) marks the thing acted on: パン<b>を</b>食べます。I eat bread.<br>The verb always comes last. <b>ます</b> masu is the polite ending for present and future.', 'パンを食べます。'),
					J('I drink water (water = 水 mizu, drink = 飲みます nomimasu)', '水を飲みます', 'みずをのみます', 'mizu o nomimasu'),
					I('に and へ: destination and time', '<b>に</b> ni marks where you arrive, and exact times.<br>学校<b>に</b>行きます。I go to school.<br>七時<b>に</b>起きます。I get up at seven.<br><b>へ</b> (said e) also marks direction: 日本<b>へ</b>行きます。', '学校に行きます。七時に起きます。日本へ行きます。'),
					C('七時___起きます。(I get up at seven.)', 'に', ['を', 'が', 'の']),
					I('で: where it happens, and by what means', '<b>で</b> de marks the place of an action, and the tool or transport.<br>図書館<b>で</b>勉強します。I study at the library.<br>電車<b>で</b>行きます。I go by train.<br>はし<b>で</b>食べます。I eat with chopsticks.', '図書館で勉強します。電車で行きます。はしで食べます。'),
					C('バス___行きます。(I go by bus.)', 'で', ['を', 'の', 'か']),
					C('レストラン___食べます。(I eat at a restaurant.)', 'で', ['に', 'へ', 'の'], 'An action happens で a place. に is for arriving and existing.'),
					I('と: and, with', '<b>と</b> to joins nouns and marks a companion.<br>パン<b>と</b>たまご bread and eggs<br>友だち<b>と</b>映画を見ます。I watch a film with a friend.', 'パンとたまご。友だちと映画を見ます。'),
					J('I go to Japan (go = 行きます ikimasu)', '日本に行きます', 'にほんにいきます', 'nihon ni ikimasu', 'へ works too: 日本へ行きます', ['日本へ行きます', 'にほんへいきます', 'nihon e ikimasu', 'nihon he ikimasu']),
					C('友だち___行きます。(I go with a friend.)', 'と', ['を', 'へ', 'の']),
					I('Past and negative of ます', '食べ<b>ます</b> eat, will eat<br>食べ<b>ません</b> do not eat<br>食べ<b>ました</b> ate<br>食べ<b>ませんでした</b> did not eat<br>The same four endings work for every verb.', '食べます。食べません。食べました。食べませんでした。'),
					H('昨日、映画を見ました', 'きのうえいがをみました', 'kinou eiga o mimashita', 'I watched a film yesterday', ['kino eiga o mimashita'])
				]
			}
		]
	},
	{
		title: 'Describing and counting',
		sub: 'Adjectives, counters and how kanji work',
		lessons: [
			{
				id: 'ja-adj-1', title: 'い and な adjectives', sub: 'Adjectives that have a past tense',
				steps: [
					I('Two kinds of adjectives', '<b>い adjectives</b> end in い: 高い takai (expensive, tall), おいしい oishii (tasty), 寒い samui (cold)<br><b>な adjectives</b> need な before a noun: 静か<b>な</b>町 a quiet town, 元気<b>な</b>人 a lively person<br>Before です both just sit there: 高いです。静かです。', '高い。おいしい。寒い。静かな町。元気な人。'),
					C('"a quiet room" (room = 部屋) is', '静かな部屋', ['静かい部屋', '静かの部屋', '静か部屋']),
					I('い adjectives conjugate', 'Drop the い and add:<br>高<b>い</b> is expensive<br>高<b>くない</b> is not expensive<br>高<b>かった</b> was expensive<br>高<b>くなかった</b> was not expensive<br>Add です to be polite: 高くないです。Never 高いでした.', '高い。高くない。高かった。高くなかった。'),
					J('It was tasty (polite)', 'おいしかったです', 'おいしかったです', 'oishikatta desu', '', ['美味しかったです']),
					C('"It was not cold" is', '寒くなかったです', ['寒いじゃなかったです', '寒くないでした', '寒いでした']),
					I('な adjectives behave like nouns', '静か<b>です</b> is quiet<br>静か<b>じゃありません</b> is not quiet (casual: じゃない)<br>静か<b>でした</b> was quiet<br>静か<b>じゃありませんでした</b> was not quiet (casual: じゃなかった)', '静かです。静かじゃありません。静かでした。静かじゃなかった。'),
					J('It was quiet (polite)', '静かでした', 'しずかでした', 'shizuka deshita'),
					I('The odd one: いい', 'いい (good) conjugates from its older form <b>よい</b>.<br>いい · <b>よくない</b> · <b>よかった</b> · <b>よくなかった</b><br>よかった！also means "Thank goodness!"', 'いい。よくない。よかった。よくなかった。'),
					C('The past of いい is', 'よかった', ['いかった', 'いいでした', 'いくなかった']),
					I('Traps: きれい and きらい', 'きれい (pretty, clean), きらい (disliked) and 有名 yuumei (famous) end in い but are <b>な</b> adjectives.<br>きれい<b>な</b>花 a pretty flower<br>きれい<b>じゃない</b> not pretty (never きれくない)', 'きれいな花。きれいじゃない。'),
					C('"not pretty" is', 'きれいじゃない', ['きれくない', 'きれいくない', 'きれかった']),
					J('not expensive (plain)', '高くない', 'たかくない', 'takakunai')
				]
			},
			{
				id: 'ja-count-1', title: 'Numbers and counters', sub: 'つ, 人, 本, 枚, 匹, 個',
				steps: [
					I('Numbers', '一 ichi · 二 ni · 三 san · 四 yon (or shi) · 五 go<br>六 roku · 七 nana (or shichi) · 八 hachi · 九 kyuu · 十 juu<br>十一 juuichi = 11 · 二十 nijuu = 20 · 百 hyaku = 100 · 千 sen = 1,000 · 一万 ichiman = 10,000', '一、二、三、四、五、六、七、八、九、十'),
					C('二十五 is', '25', ['52', '205', '7']),
					I('The つ counter', 'For general things up to ten, use the native numbers:<br>一つ hitotsu · 二つ futatsu · 三つ mittsu · 四つ yottsu · 五つ itsutsu<br>六つ muttsu · 七つ nanatsu · 八つ yattsu · 九つ kokonotsu · 十 too<br>The number goes after the particle: りんごを<b>二つ</b>ください。Two apples, please.', '一つ、二つ、三つ、四つ、五つ、六つ、七つ、八つ、九つ、十。りんごを二つください。'),
					J('three things (つ counter)', '三つ', 'みっつ', 'mittsu'),
					I('People: 人', '一人 <b>hitori</b> and 二人 <b>futari</b> are irregular. From three on it is number + nin:<br>三人 sannin · 四人 <b>yonin</b> · 五人 gonin<br>何人ですか。How many people?', '一人、二人、三人、四人、五人。何人ですか。'),
					J('two people', '二人', 'ふたり', 'futari'),
					I('Counters by shape', '<b>本</b> hon: long thin things (pens, bottles, umbrellas)<br><b>枚</b> mai: flat things (paper, tickets, shirts)<br><b>匹</b> hiki: small animals<br><b>個</b> ko: small compact things<br>切符を二<b>枚</b> two tickets · りんごを三<b>個</b> three apples', '切符を二枚。りんごを三個。'),
					C('Which counter is for umbrellas?', '本', ['枚', '匹', '個'], '本 counts long thin things.'),
					I('Sound changes', '本 and 匹 change after some numbers:<br>一本 <b>ippon</b> · 二本 nihon · 三本 <b>sanbon</b> · 六本 <b>roppon</b><br>一匹 <b>ippiki</b> · 二匹 nihiki · 三匹 <b>sanbiki</b> · 六匹 <b>roppiki</b><br>一個 <b>ikko</b> · 六個 <b>rokko</b>', '一本、二本、三本、六本。一匹、二匹、三匹、六匹。一個、六個。'),
					C('三本 is read', 'さんぼん', ['さんほん', 'さんぽん', 'みほん']),
					J('one long thin thing (counter 本)', '一本', 'いっぽん', 'ippon'),
					C('ねこが二___います。(There are two cats.)', '匹', ['本', '枚', '人'])
				]
			},
			{
				id: 'ja-kanji-1', title: 'How kanji work', sub: 'Radicals, two kinds of reading, compounds',
				steps: [
					I('Why kanji', 'Japanese has no spaces. Kanji show where words start and what they mean, and hiragana carries the grammar.<br><b>私</b>は<b>日本語</b>を<b>勉強</b>します。I study Japanese.<br>About 2,000 kanji are in everyday use. JLPT N5 needs roughly 100.', '私は日本語を勉強します。'),
					I('Pictures and combinations', '山 mountain · 川 river · 木 tree · 日 sun, day · 月 moon, month · 人 person · 口 mouth<br>木 + 木 = <b>林</b> woods · three 木 = <b>森</b> forest<br>日 + 月 = <b>明</b> bright<br>人 + 木 = <b>休</b> rest (a person leaning on a tree)', '山。川。木。林。森。明るい。休む。'),
					C('休 (person + tree) means', 'rest', ['forest', 'carpenter', 'fruit']),
					I('Radicals hint at meaning', '<b>氵</b> water: 海 sea, 泳ぐ swim, 酒 alcohol<br><b>言</b> speech: 話す speak, 語 language, 読む read<br><b>亻</b> person: 休む rest, 作る make, 体 body<br><b>心</b> heart: 思う think, 悲しい sad<br><b>飠</b> food: 飲む drink, 飯 meal', '海。泳ぐ。話す。読む。思う。飲む。'),
					C('Which kanji most likely has to do with water?', '池', ['話', '村', '悲'], '氵 is the water radical. 池 ike = pond.'),
					I('Two kinds of reading', '<b>Kun reading</b>: the native Japanese word, usual when a kanji stands alone or has hiragana attached. 山 = <b>yama</b>, 食べる = <b>ta</b>beru<br><b>On reading</b>: the old Chinese sound, usual in compounds. 富士山 = Fuji<b>san</b>, 食事 = <b>shoku</b>ji (meal)', '山。富士山。食べる。食事。'),
					C('In 富士山, the kanji 山 is read', 'san', ['yama', 'kawa', 'hi'], 'In compounds the on reading is usual.'),
					I('One kanji, many readings', '日 alone: <b>hi</b> (day, sun)<br>日本: <b>ni</b>hon · 日曜日: <b>nichi</b>you<b>bi</b> (Sunday) · 今日: <b>kyou</b> (today, a special reading)<br>Do not memorise lists of readings. Learn words, and the readings come with them.', '日。日本。日曜日。今日。'),
					C('今日 (today) is read', 'きょう', ['いまひ', 'こんび', 'きょにち']),
					I('Compounds are logical', '電 electric + 車 vehicle = <b>電車</b> densha, train<br>電 + 話 speech = <b>電話</b> denwa, telephone<br>手 hand + 紙 paper = <b>手紙</b> tegami, letter<br>大 big + 学 study = <b>大学</b> daigaku, university', '電車。電話。手紙。大学。'),
					C('電話 (electric + speech) is', 'telephone', ['radio', 'train', 'email']),
					J('train', '電車', 'でんしゃ', 'densha')
				]
			}
		]
	},
	{
		title: 'Verbs',
		sub: 'Three groups, the ます form, the て form and plain speech',
		lessons: [
			{
				id: 'ja-verb-1', title: 'Verb groups and ます', sub: 'Ichidan, godan and two rebels',
				steps: [
					I('The dictionary form', 'Every verb in the dictionary ends in a u sound: 食べ<b>る</b> taberu, 飲<b>む</b> nomu, 行<b>く</b> iku, 話<b>す</b> hanasu.<br>Friends use this plain form as it is. The polite <b>ます</b> form is built from it, and how depends on the verb group.'),
					I('Group 2 (ichidan): drop る', 'Verbs ending in -iru or -eru mostly just drop る.<br>食べ<b>る</b> becomes 食べ<b>ます</b> eat<br>見<b>る</b> becomes 見<b>ます</b> see<br>起き<b>る</b> becomes 起き<b>ます</b> get up<br>寝<b>る</b> becomes 寝<b>ます</b> sleep', '食べる、食べます。見る、見ます。起きる、起きます。寝る、寝ます。'),
					J('ます form of 見る (to see)', '見ます', 'みます', 'mimasu'),
					I('Group 1 (godan): u becomes i', 'The last kana moves from the u row to the i row, then ます.<br>飲<b>む</b> 飲<b>み</b>ます · 行<b>く</b> 行<b>き</b>ます · 話<b>す</b> 話<b>し</b>ます<br>買<b>う</b> 買<b>い</b>ます · 待<b>つ</b> 待<b>ち</b>ます · 泳<b>ぐ</b> 泳<b>ぎ</b>ます<br>遊<b>ぶ</b> 遊<b>び</b>ます · 死<b>ぬ</b> 死<b>に</b>ます · 作<b>る</b> 作<b>り</b>ます', '飲む、飲みます。行く、行きます。話す、話します。買う、買います。待つ、待ちます。'),
					J('ます form of 飲む (to drink)', '飲みます', 'のみます', 'nomimasu'),
					C('ます form of 待つ (to wait)', '待ちます', ['待つます', '待います', '待します']),
					I('Group 1 verbs in disguise', 'Some verbs end in -iru or -eru but belong to Group 1. Learn these now:<br>帰る kaeru, 帰<b>り</b>ます return<br>入る hairu, 入<b>り</b>ます enter<br>走る hashiru, 走<b>り</b>ます run<br>知る shiru, 知<b>り</b>ます know<br>切る kiru, 切<b>り</b>ます cut (but 着る kiru, to wear, is Group 2: 着ます)', '帰ります。入ります。走ります。切ります。着ます。'),
					C('ます form of 帰る (to return)', '帰ります', ['帰ます', '帰えます', '帰きます']),
					I('Only two irregular verbs', '<b>する</b> suru becomes <b>します</b> do<br><b>来る</b> kuru becomes <b>来ます</b> kimasu come<br>する turns nouns into verbs: 勉強する study, 電話する phone, 旅行する travel.', 'する、します。来る、来ます。勉強します。'),
					J('ます form of 来る (to come)', '来ます', 'きます', 'kimasu'),
					J('I study Japanese (Japanese = 日本語 nihongo, study = 勉強する benkyou suru)', '日本語を勉強します', 'にほんごをべんきょうします', 'nihongo o benkyou shimasu', '', ['nihongo o benkyo shimasu', 'nihongo wo benkyo shimasu']),
					H('毎日、七時に起きます', 'まいにちしちじにおきます', 'mainichi shichiji ni okimasu', 'I get up at seven every day', ['まいにちななじにおきます', 'mainichi nanaji ni okimasu', '毎日7時に起きます'])
				]
			},
			{
				id: 'ja-te-1', title: 'The て form', sub: 'Requests, ongoing actions, and then',
				steps: [
					I('The て form', 'The て form links a verb to what comes next. It has no tense of its own.<br>Group 2: drop る, add て. 食べる 食べ<b>て</b> · 見る 見<b>て</b><br>Irregular: する <b>して</b> · 来る <b>来て</b> kite', '食べて。見て。して。来て。'),
					I('Group 1: five patterns', 'う, つ, る become <b>って</b>: 買う 買って · 待つ 待って · 帰る 帰って<br>む, ぶ, ぬ become <b>んで</b>: 飲む 飲んで · 遊ぶ 遊んで · 死ぬ 死んで<br>く becomes <b>いて</b>: 書く 書いて<br>ぐ becomes <b>いで</b>: 泳ぐ 泳いで<br>す becomes <b>して</b>: 話す 話して<br>One exception: 行く becomes <b>行って</b>.', '買って。待って。帰って。飲んで。遊んで。書いて。泳いで。話して。行って。'),
					J('て form of 飲む (to drink)', '飲んで', 'のんで', 'nonde'),
					C('て form of 書く (to write)', '書いて', ['書って', '書んで', '書して']),
					C('て form of 行く (to go)', '行って', ['行いて', '行んで', '行して'], 'The one exception among く verbs.'),
					I('Requests: てください', 'て form + <b>ください</b> = please do.<br>ちょっと待っ<b>てください</b>。Please wait a moment.<br>Among friends the て form alone is the request: 待って！', 'ちょっと待ってください。待って！'),
					J('Please wait (wait = 待つ matsu)', '待ってください', 'まってください', 'matte kudasai', '', ['待って下さい']),
					I('ている: in progress, or a lasting state', 'て form + <b>います</b> (plain: いる).<br>今、食べ<b>ています</b>。I am eating now.<br>東京に住ん<b>でいます</b>。I live in Tokyo.<br>結婚し<b>ています</b>。I am married (a state, not "am marrying").<br>知っ<b>ています</b>。I know.', '今、食べています。東京に住んでいます。結婚しています。知っています。'),
					C('結婚しています means', 'I am married', ['I am getting married right now', 'I will marry', 'I was married once']),
					I('Sequence: and then', 'Chain actions with て. Only the last verb shows the tense.<br>朝起き<b>て</b>、コーヒーを飲ん<b>で</b>、会社に行き<b>ました</b>。I got up, drank coffee and went to work.<br>て<b>から</b> = after doing: 食べ<b>てから</b>行きます。I will go after eating.', '朝起きて、コーヒーを飲んで、会社に行きました。食べてから行きます。'),
					J('I live in Tokyo (Tokyo = 東京, live = 住む sumu)', '東京に住んでいます', 'とうきょうにすんでいます', 'toukyou ni sunde imasu', '', ['tokyo ni sunde imasu']),
					H('何をしていますか', 'なにをしていますか', 'nani o shite imasu ka', 'What are you doing?')
				]
			},
			{
				id: 'ja-plain-1', title: 'Plain form, た and ない', sub: 'How friends talk, and what long sentences need',
				steps: [
					I('Polite and plain', 'ます and です are the polite style. With friends and family, and inside longer sentences, Japanese uses the <b>plain form</b>.<br>行きます = <b>行く</b> · 行きません = <b>行かない</b><br>行きました = <b>行った</b> · 行きませんでした = <b>行かなかった</b><br>学生です = 学生<b>だ</b>', '行く。行かない。行った。行かなかった。学生だ。'),
					I('The た form: plain past', 'Take the て form and change て to <b>た</b>, で to <b>だ</b>. No new rules.<br>食べて 食べ<b>た</b> · 飲んで 飲ん<b>だ</b> · 書いて 書い<b>た</b><br>行って 行っ<b>た</b> · して し<b>た</b> · 来て 来<b>た</b> kita', '食べた。飲んだ。書いた。行った。した。来た。'),
					J('plain past of 飲む (drank)', '飲んだ', 'のんだ', 'nonda'),
					C('Plain past of 買う (to buy)', '買った', ['買いた', '買んだ', '買した']),
					I('The ない form: plain negative', 'Group 2: drop る, add ない. 食べる 食べ<b>ない</b><br>Group 1: u row becomes a row, then ない. 飲む 飲<b>ま</b>ない · 行く 行<b>か</b>ない · 話す 話<b>さ</b>ない<br>Verbs in う use <b>わ</b>: 買う 買<b>わ</b>ない<br>Irregular: する <b>しない</b> · 来る <b>来ない</b> konai · ある <b>ない</b>', '食べない。飲まない。行かない。話さない。買わない。しない。来ない。'),
					J('plain negative of 行く (do not go)', '行かない', 'いかない', 'ikanai'),
					C('Plain negative of 買う (to buy)', '買わない', ['買あない', '買いない', '買うない']),
					C('来ない, the plain negative of 来る, is read', 'こない', ['きない', 'くない', 'くらない']),
					I('Please do not, and must', 'ない form + <b>でください</b> = please do not.<br>ここで写真を撮ら<b>ないでください</b>。Please do not take photos here.<br>Change ない to <b>なければなりません</b> = must: 行か<b>なければなりません</b>。I have to go. (spoken: 行かなきゃ)', 'ここで写真を撮らないでください。行かなければなりません。行かなきゃ。'),
					J('I did not eat (plain)', '食べなかった', 'たべなかった', 'tabenakatta'),
					I('Plain form inside sentences', 'Even in polite speech, the plain form goes before these:<br>行く<b>と思います</b>。I think I will go.<br>行った<b>ことがあります</b>。I have been there before.<br>行く<b>つもりです</b>。I intend to go.<br>昨日買った<b>本</b> = the book I bought yesterday. The clause goes before the noun, with no word for "that".', '行くと思います。行ったことがあります。行くつもりです。昨日買った本。'),
					J('I have been to Japan before (use ことがあります)', '日本に行ったことがあります', 'にほんにいったことがあります', 'nihon ni itta koto ga arimasu', '', ['日本へ行ったことがあります', 'にほんへいったことがあります', 'nihon e itta koto ga arimasu', '日本に行ったことがある', 'にほんにいったことがある', 'nihon ni itta koto ga aru'])
				]
			}
		]
	},
	{
		title: 'Doing more with verbs',
		sub: 'Giving, being able, proposing and saying if',
		lessons: [
			{
				id: 'ja-give-1', title: 'あげる, くれる, もらう', sub: 'Giving and receiving, and who owes whom',
				steps: [
					I('Three verbs, two directions', '<b>あげる</b> ageru: to give outward, to someone else.<br><b>くれる</b> kureru: someone gives <b>to me</b> or to my side.<br><b>もらう</b> morau: to receive.<br>Japanese always tracks whether a gift moves toward the speaker or away.'),
					I('あげる: giving away', 'Giver <b>は</b> receiver <b>に</b> thing <b>を</b> あげます。<br>私は友だち<b>に</b>本<b>を</b>あげました。I gave my friend a book.<br>Never use あげる when the receiver is you.', '私は友だちに本をあげました。'),
					I('くれる: giving to me', '友だち<b>が</b>本を<b>くれました</b>。My friend gave me a book.<br>"To me" is built into the verb, so 私に is usually dropped.', '友だちが本をくれました。'),
					C('"My mother gave me a watch."', '母が時計をくれました', ['母が私に時計をあげました', '私は母に時計をくれました', '母は私に時計をもらいました']),
					I('もらう: receiving', 'Receiver <b>は</b> giver <b>に</b> (or から) thing <b>を</b> もらいます。<br>私は友だち<b>に</b>本を<b>もらいました</b>。I got a book from my friend.<br>The same event as くれました, seen from the receiver.', '私は友だちに本をもらいました。'),
					J('I gave my friend a book (friend = 友だち tomodachi, book = 本 hon)', '友だちに本をあげました', 'ともだちにほんをあげました', 'tomodachi ni hon o agemashita', '', ['友達に本をあげました', '私は友だちに本をあげました', '私は友達に本をあげました', 'わたしは友だちに本をあげました', 'わたしはともだちにほんをあげました', 'watashi wa tomodachi ni hon o agemashita', 'watashi wa tomodachi ni hon wo agemashita']),
					C('私は田中さん___チョコレートをもらいました。(I got chocolate from Tanaka.)', 'に', ['を', 'が', 'で']),
					I('Favours: てあげる, てくれる, てもらう', 'Attach them to a て form to say an action was a favour.<br>友だちが手伝っ<b>てくれました</b>。My friend (kindly) helped me.<br>友だちに手伝っ<b>てもらいました</b>。I had my friend help me.<br>妹に本を読ん<b>であげました</b>。I read a book to my little sister.<br>Leaving them out sounds cold, as if you did not notice the kindness.', '友だちが手伝ってくれました。友だちに手伝ってもらいました。妹に本を読んであげました。'),
					C('先生が教えて___。(The teacher kindly taught me.)', 'くれました', ['あげました', 'もらいました', 'ありました'], 'Someone does something for me: てくれる.'),
					I('Asking with くれる and もらう', '手伝っ<b>てくれませんか</b>。Would you help me?<br>手伝っ<b>てもらえますか</b>。Could I get you to help?<br>More polite: 手伝っ<b>ていただけますか</b>。', '手伝ってくれませんか。手伝ってもらえますか。手伝っていただけますか。'),
					J('My friend gave me a book', '友だちが本をくれました', 'ともだちがほんをくれました', 'tomodachi ga hon o kuremashita', '', ['友達が本をくれました']),
					H('手伝ってくれてありがとう', 'てつだってくれてありがとう', 'tetsudatte kurete arigatou', 'Thanks for helping me', ['tetsudatte kurete arigato'])
				]
			},
			{
				id: 'ja-pot-1', title: 'Can do, and let us', sub: 'The potential and the volitional',
				steps: [
					I('Potential: can do', 'Group 2: る becomes <b>られる</b>. 食べる 食べ<b>られる</b> can eat<br>Group 1: u row becomes e row + る. 飲む 飲<b>める</b> · 行く 行<b>ける</b> · 話す 話<b>せる</b> · 買う 買<b>える</b><br>Irregular: する <b>できる</b> · 来る <b>来られる</b> korareru', '食べられる。飲める。行ける。話せる。買える。できる。来られる。'),
					J('can drink (potential of 飲む)', '飲める', 'のめる', 'nomeru'),
					C('Potential of 話す (to speak)', '話せる', ['話られる', '話しれる', '話すれる']),
					I('The object usually takes が', '日本語<b>が</b>話せます。I can speak Japanese.<br>漢字<b>が</b>読めません。I cannot read kanji.<br>を is also heard, but が is the textbook choice.<br>In casual speech Group 2 often drops ら: 食べ<b>れる</b>, 見<b>れる</b>. Common, but avoid it in writing.', '日本語が話せます。漢字が読めません。食べれる。見れる。'),
					J('I can speak Japanese (polite)', '日本語が話せます', 'にほんごがはなせます', 'nihongo ga hanasemasu', '', ['日本語を話せます', 'にほんごをはなせます', 'nihongo o hanasemasu', 'nihongo wo hanasemasu']),
					I('Volitional: let us, I shall', 'Polite: ます becomes <b>ましょう</b>. 行き<b>ましょう</b>。Let us go.<br>Plain, Group 2: る becomes <b>よう</b>. 食べる 食べ<b>よう</b><br>Plain, Group 1: u row becomes o row + う. 行く 行<b>こう</b> · 飲む 飲<b>もう</b> · 話す 話<b>そう</b><br>Irregular: する <b>しよう</b> · 来る <b>来よう</b> koyou', '行きましょう。食べよう。行こう。飲もう。話そう。しよう。来よう。'),
					J('Let us go (plain volitional of 行く)', '行こう', 'いこう', 'ikou', '', ['iko']),
					C('Plain volitional of 食べる', '食べよう', ['食べろう', '食べおう', '食べこう']),
					I('ようと思う: I am thinking of', 'Volitional + <b>と思います</b> = I think I will.<br>来年、日本に行<b>こうと思います</b>。I am thinking of going to Japan next year.<br>ましょう<b>か</b> offers help: 手伝いましょうか。Shall I help?', '来年、日本に行こうと思います。手伝いましょうか。'),
					C('手伝いましょうか means', 'Shall I help you?', ['Did you help?', 'Please help me', 'I cannot help']),
					C('Potential of する (to do)', 'できる', ['すれる', 'しられる', 'しれる']),
					H('漢字が読めますか', 'かんじがよめますか', 'kanji ga yomemasu ka', 'Can you read kanji?')
				]
			},
			{
				id: 'ja-cond-1', title: 'Four ways to say if', sub: 'たら, ば, と and なら',
				steps: [
					I('Four conditionals', 'The safe all-rounder is <b>たら</b>.<br><b>たら</b>: if, or when (once that has happened)<br><b>ば</b>: if (the condition is the point)<br><b>と</b>: whenever, automatically<br><b>なら</b>: if that is the case, if you mean'),
					I('たら: plain past + ら', '雨が降っ<b>たら</b>、行きません。If it rains, I will not go.<br>駅に着い<b>たら</b>、電話してください。When you get to the station, call me.<br>Adjectives and nouns too: 安かっ<b>たら</b>買います。暇だっ<b>たら</b>来て。', '雨が降ったら、行きません。駅に着いたら、電話してください。安かったら買います。'),
					J('if it rains (rain falls = 雨が降る ame ga furu)', '雨が降ったら', 'あめがふったら', 'ame ga futtara'),
					I('ば: the e row', 'Group 1: u row becomes e row + ば. 行く 行<b>けば</b> · 飲む 飲<b>めば</b> · 買う 買<b>えば</b><br>Group 2: る becomes <b>れば</b>. 食べる 食べ<b>れば</b><br>する <b>すれば</b> · 来る <b>来れば</b> kureba<br>い adjectives: 安い 安<b>ければ</b>. ない becomes な<b>ければ</b>.<br>どうすれ<b>ば</b>いいですか。What should I do?', '行けば。飲めば。食べれば。すれば。来れば。安ければ。どうすればいいですか。'),
					C('ば form of 行く', '行けば', ['行かば', '行くば', '行きば']),
					J('ば form of 食べる', '食べれば', 'たべれば', 'tabereba'),
					I('と: automatic results', 'Plain present + <b>と</b>: whenever A, B always follows. Nature, machines, directions, habits.<br>春になる<b>と</b>、桜が咲きます。When spring comes, the cherry trees bloom.<br>このボタンを押す<b>と</b>、ドアが開きます。Press this button and the door opens.<br>The second half cannot be a request, an invitation or a wish.', '春になると、桜が咲きます。このボタンを押すと、ドアが開きます。'),
					C('右に曲がる___、銀行があります。(Turn right and there is a bank.)', 'と', ['たら', 'ば', 'て'], 'Only と attaches to the dictionary form here. The others would be 曲がったら and 曲がれば.'),
					I('なら: if that is the case', 'なら picks up what was just said or assumed, and adds advice or an opinion.<br>日本に行く<b>なら</b>、京都がいいですよ。If you are going to Japan, Kyoto is good.<br>すし<b>なら</b>、あの店です。If it is sushi you want, that restaurant.', '日本に行くなら、京都がいいですよ。すしなら、あの店です。'),
					C('A friend says they will buy a camera. You advise: カメラを買う___、秋葉原がいいよ。', 'なら', ['と', 'ば', 'たら'], 'なら takes up the other person\'s plan and gives advice.'),
					I('Even if, and regret', 'て form + <b>も</b> = even if: 雨が降っ<b>ても</b>行きます。I will go even if it rains.<br>ば + <b>よかった</b> = I wish I had: 行け<b>ばよかった</b>。I should have gone.', '雨が降っても行きます。行けばよかった。'),
					C('行けばよかった means', 'I wish I had gone', ['I am glad I went', 'I was able to go', 'Shall we go?'])
				]
			}
		]
	},
	{
		title: 'Nuance',
		sub: 'Passive, causative, は against が, and honorific speech',
		lessons: [
			{
				id: 'ja-pass-1', title: 'Passive and causative', sub: 'Done to me, made to do',
				steps: [
					I('Passive: れる and られる', 'Group 1: u row becomes a row + <b>れる</b>. 書く 書<b>かれる</b> · 読む 読<b>まれる</b> · 言う 言<b>われる</b> · 叱る 叱<b>られる</b><br>Group 2: る becomes <b>られる</b>. 食べる 食べ<b>られる</b> · 見る 見<b>られる</b> (same shape as the potential)<br>する <b>される</b> · 来る <b>来られる</b> korareru', '書かれる。読まれる。言われる。叱られる。食べられる。される。来られる。'),
					I('The doer takes に', '私は先生<b>に</b>ほめ<b>られました</b>。I was praised by the teacher.<br>この本は世界中で読<b>まれています</b>。This book is read all over the world.', '私は先生にほめられました。この本は世界中で読まれています。'),
					J('passive of 言う (to be told)', '言われる', 'いわれる', 'iwareru'),
					C('私は母___叱られました。(I was scolded by my mother.)', 'に', ['を', 'へ', 'で']),
					I('The suffering passive', 'Japanese uses the passive to show that something bothered you, even with verbs that take no object.<br>雨に降<b>られました</b>。I got rained on.<br>電車で足を踏<b>まれました</b>。Someone stepped on my foot on the train.<br>財布を盗<b>まれました</b>。I had my wallet stolen.', '雨に降られました。電車で足を踏まれました。財布を盗まれました。'),
					C('雨に降られました implies', 'the rain was a nuisance to me', ['I enjoyed the rain', 'it will rain soon', 'I made it rain']),
					I('Causative: make or let', 'Group 1: u row becomes a row + <b>せる</b>. 行く 行<b>かせる</b> · 読む 読<b>ませる</b> · 待つ 待<b>たせる</b><br>Group 2: る becomes <b>させる</b>. 食べる 食べ<b>させる</b><br>する <b>させる</b> · 来る <b>来させる</b> kosaseru<br>母は子ども<b>に</b>野菜を食べ<b>させます</b>。The mother makes the child eat vegetables.', '行かせる。読ませる。待たせる。食べさせる。させる。来させる。母は子どもに野菜を食べさせます。'),
					J('causative of 待つ (to make someone wait)', '待たせる', 'またせる', 'mataseru'),
					I('Causative for permission', 'させてください = please let me.<br>私に行か<b>せてください</b>。Please let me go.<br>お待た<b>せしました</b>。Sorry to have kept you waiting. (heard in every shop)<br>Very polite: 休ま<b>せていただきます</b>。I will take the day off, with your permission.', '私に行かせてください。お待たせしました。休ませていただきます。'),
					C('お待たせしました is said when', 'you have kept someone waiting', ['you are tired of waiting', 'you ask someone to wait', 'you refuse to wait']),
					I('Causative passive: made to do', 'Being forced = causative + passive.<br>食べ<b>させられる</b> to be made to eat<br>Group 1 usually shortens せられる to <b>される</b>: 飲<b>まされる</b> · 待<b>たされる</b> · 行<b>かされる</b><br>一時間も待<b>たされました</b>。I was made to wait a whole hour.', '食べさせられる。飲まされる。待たされる。一時間も待たされました。'),
					C('待たされました means', 'I was made to wait', ['I made them wait', 'I was able to wait', 'I waited gladly'])
				]
			},
			{
				id: 'ja-waga-1', title: 'は and が in depth', sub: 'Topic, subject, contrast',
				steps: [
					I('Topic and subject', '<b>は</b> sets the topic: what we are talking about. The news comes after it.<br><b>が</b> points at the subject: the answer to "who?" or "what?". The news is the word before it.<br>田中さん<b>は</b>来ました。As for Tanaka, he came.<br>田中さん<b>が</b>来ました。It is Tanaka who came.', '田中さんは来ました。田中さんが来ました。'),
					I('Question words take が', 'A question word as subject never takes は, and the answer keeps が.<br>だれ<b>が</b>来ましたか。Who came?<br>田中さん<b>が</b>来ました。Tanaka did.', 'だれが来ましたか。田中さんが来ました。'),
					C('だれ___ケーキを食べましたか。(Who ate the cake?)', 'が', ['は', 'を', 'で']),
					I('New and known', 'A first mention takes が, later mentions take は. A little like "a" and "the".<br>昔々、おじいさん<b>が</b>いました。おじいさん<b>は</b>山へ行きました。<br>Once upon a time there was an old man. The old man went to the mountain.', '昔々、おじいさんがいました。おじいさんは山へ行きました。'),
					I('The elephant sentence', '象<b>は</b>鼻<b>が</b>長い。As for elephants, the nose is long.<br>Big topic with は, then the part or detail with が.<br>私<b>は</b>頭<b>が</b>痛いです。I have a headache.<br>東京<b>は</b>人<b>が</b>多いです。Tokyo has a lot of people.', '象は鼻が長い。私は頭が痛いです。東京は人が多いです。'),
					J('I have a headache (head = 頭 atama, painful = 痛い itai)', '私は頭が痛いです', 'わたしはあたまがいたいです', 'watashi wa atama ga itai desu', '', ['頭が痛いです', 'あたまがいたいです', 'atama ga itai desu']),
					I('Likes, skills and wants take が', '好き, 嫌い, 上手, 下手, 分かる, 欲しい and potential verbs mark their object with が.<br>私は音楽<b>が</b>好きです。I like music.<br>日本語<b>が</b>分かります。I understand Japanese.<br>新しい靴<b>が</b>欲しい。I want new shoes.', '私は音楽が好きです。日本語が分かります。新しい靴が欲しい。'),
					J('I like sushi (like = 好き suki)', 'すしが好きです', 'すしがすきです', 'sushi ga suki desu', '', ['寿司が好きです', '私はすしが好きです', '私は寿司が好きです', 'わたしはすしが好きです', 'わたしはすしがすきです', 'watashi wa sushi ga suki desu']),
					I('は for contrast', 'は can single one thing out against the rest.<br>肉<b>は</b>食べますが、魚<b>は</b>食べません。Meat I eat, but fish I do not.<br>So ビール<b>は</b>飲みません hints: beer I do not drink (other things I might).', '肉は食べますが、魚は食べません。ビールは飲みません。'),
					C('ビールは飲みません can hint that', 'I may drink other things', ['beer does not drink', 'I drank beer before', 'nobody drinks beer']),
					I('Inside clauses, が', 'In a clause that describes a noun or sits inside a bigger sentence, the subject takes が, not は.<br>母<b>が</b>作ったケーキ the cake my mother made<br>私<b>が</b>子どもの時、ここに住んでいました。When I was a child, I lived here.', '母が作ったケーキ。私が子どもの時、ここに住んでいました。'),
					C('これは母___作ったケーキです。(This is the cake my mother made.)', 'が', ['を', 'へ', 'か'])
				]
			},
			{
				id: 'ja-keigo-1', title: 'Keigo', sub: 'Raising others, lowering yourself',
				steps: [
					I('Three layers of politeness', '<b>丁寧語</b> teineigo: です and ます. Polite toward the listener.<br><b>尊敬語</b> sonkeigo: raises the other person\'s actions.<br><b>謙譲語</b> kenjougo: lowers your own actions.<br>Rule of thumb: sonkeigo for what the customer or boss does, kenjougo for what you or your side does. Never sonkeigo for yourself.'),
					I('Special respectful verbs', '行く, 来る, いる become <b>いらっしゃる</b> (ます form: いらっしゃ<b>い</b>ます)<br>言う becomes <b>おっしゃる</b> (おっしゃいます)<br>食べる, 飲む become <b>召し上がる</b> meshiagaru<br>見る becomes <b>ご覧になる</b> goran ni naru<br>する becomes <b>なさる</b> (なさいます) · くれる becomes <b>くださる</b> (くださいます)', 'いらっしゃいます。おっしゃいます。召し上がります。ご覧になります。なさいます。くださいます。'),
					C('The respectful form of 言う is', 'おっしゃる', ['申す', '伺う', 'いただく']),
					I('Special humble verbs', '行く, 来る become <b>参る</b> mairu · いる becomes <b>おる</b><br>言う becomes <b>申す</b> mousu · 食べる, 飲む, もらう become <b>いただく</b><br>見る becomes <b>拝見する</b> haiken suru · する becomes <b>いたす</b><br>聞く, 訪ねる become <b>伺う</b> ukagau<br>田中と<b>申します</b>。My name is Tanaka.', '参ります。おります。申します。いただきます。拝見します。いたします。伺います。田中と申します。'),
					J('My name is Tanaka (humble, with 申す; Tanaka = 田中)', '田中と申します', 'たなかともうします', 'tanaka to moushimasu', '', ['tanaka to mooshimasu', 'tanaka to moshimasu']),
					C('You tell a client that your own boss is in the office. "He is here" is', 'おります', ['いらっしゃいます', 'おっしゃいます', '召し上がります'], 'To outsiders your own company is your side, so even your boss gets humble forms.'),
					I('The regular respectful pattern', '<b>お</b> + ます stem + <b>になる</b><br>待つ <b>お</b>待ち<b>になる</b> · 帰る <b>お</b>帰り<b>になる</b> · 読む <b>お</b>読み<b>になる</b><br>Requests: <b>お</b>待ち<b>ください</b>。Please wait.<br>The passive form also works as light respect: 行かれますか。', 'お待ちになります。お帰りになります。お読みになります。お待ちください。'),
					J('respectful form of 帰る (the お...になる pattern, with ます)', 'お帰りになります', 'おかえりになります', 'okaeri ni narimasu'),
					I('The regular humble pattern', '<b>お</b> + ます stem + <b>する</b> (or いたす)<br>持つ: <b>お</b>持ち<b>します</b>。I will carry it for you.<br>待つ: <b>お</b>待ち<b>しております</b>。We look forward to seeing you.<br>する nouns take ご: <b>ご</b>案内<b>します</b>。I will show you the way.', 'お持ちします。お待ちしております。ご案内します。'),
					C('A hotel porter offers to carry your bag. He says', 'お持ちします', ['お持ちになります', '持ってください', '召し上がります']),
					I('Set phrases you hear daily', '<b>いらっしゃいませ</b> Welcome (in shops)<br><b>少々お待ちください</b> One moment, please<br><b>かしこまりました</b> Certainly (a humble "understood")<br><b>恐れ入りますが</b> Excuse me, but<br><b>よろしいでしょうか</b> Would that be all right?', 'いらっしゃいませ。少々お待ちください。かしこまりました。恐れ入りますが。よろしいでしょうか。'),
					H('少々お待ちください', 'しょうしょうおまちください', 'shoushou omachi kudasai', 'One moment, please', ['shosho omachi kudasai', '少々お待ち下さい'])
				]
			}
		]
	},
	{
		title: 'Sounding real',
		sub: 'Fillers, Kansai and casual speech, idioms and the written register',
		lessons: [
			{
				id: 'ja-conv-1', title: 'Fillers and reactions', sub: 'What people actually say between sentences',
				steps: [
					I('Buying time', '<b>えっと</b> etto = um<br><b>あの</b> ano = um, excuse me (to get attention)<br><b>なんか</b> nanka = like, kind of<br><b>まあ</b> maa = well<br><b>そうですね</b> sou desu ne = let me see (thinking), or "that is true"', 'えっと。あの。なんか。まあ。そうですね。'),
					C('You stop a stranger to ask the way. You start with', 'あの、すみません', ['やばい', 'なるほど', 'マジで']),
					I('Aizuchi: show you are listening', 'Silence while someone talks feels cold. Japanese listeners keep reacting.<br><b>はい / うん / ええ</b> yes, go on (not agreement!)<br><b>なるほど</b> naruhodo = I see, that makes sense<br><b>そうですか</b> = is that so (falling tone)<br><b>へえ</b> hee = oh wow<br><b>たしかに</b> tashika ni = true, good point', 'はい。うん。ええ。なるほど。そうですか。へえ。たしかに。'),
					J('I see, that makes sense', 'なるほど', 'なるほど', 'naruhodo'),
					C('While you tell a story, a Japanese listener keeps saying はい. It means', 'I am listening, go on', ['I agree with everything', 'please stop', 'I have a question']),
					I('Strong reactions', '<b>やばい</b> yabai = originally "risky, awful", now also "amazing". Tone decides.<br><b>マジで？</b> maji de = seriously?<br><b>うそ！</b> uso = no way! (literally "lie")<br><b>すごい</b> sugoi = wow, amazing<br><b>びっくりした</b> bikkuri shita = that startled me<br>Casual only: not for your boss.', 'やばい。マジで？うそ！すごい。びっくりした。'),
					C('このラーメン、やばい！most likely means', 'This ramen is amazing', ['This ramen is dangerous', 'This ramen is cheap', 'This ramen is cold']),
					J('Seriously? (casual: マジ + で)', 'マジで', 'まじで', 'maji de'),
					I('ね and よ', '<b>ね</b> ne seeks agreement: いい天気です<b>ね</b>。Nice weather, isn\'t it?<br><b>よ</b> yo tells the listener something new: おいしいです<b>よ</b>。It is tasty, you know.<br><b>よね</b> double-checks: 明日です<b>よね</b>？It is tomorrow, right?', 'いい天気ですね。おいしいですよ。明日ですよね？'),
					C('いい天気です___。(Nice weather, isn\'t it?)', 'ね', ['を', 'に', 'で']),
					I('Soft refusals', 'A flat いいえ is rare. People trail off instead.<br><b>ちょっと…</b> = it is a bit... (meaning no)<br><b>大丈夫です</b> daijoubu desu = I am fine (often "no, thank you")<br><b>また今度</b> mata kondo = some other time', 'ちょっと。大丈夫です。また今度。'),
					C('"土曜日、映画に行きませんか。" "土曜日はちょっと…" The reply means', 'Saturday does not work for me', ['Saturday is a short day', 'Yes, for a little while', 'Wait a moment'])
				]
			},
			{
				id: 'ja-kansai-1', title: 'Kansai and casual speech', sub: 'おおきに, あかん, and the contractions everyone uses',
				steps: [
					I('Not everyone speaks Tokyo', 'Standard Japanese (標準語 hyoujungo) is based on Tokyo speech. The best-known dialect is <b>関西弁</b> Kansai-ben, from Osaka, Kyoto and Kobe. You hear it constantly in TV comedy.', '標準語。関西弁。'),
					I('Kansai essentials', '<b>おおきに</b> ookini = ありがとう thank you<br><b>あかん</b> akan = だめ no good, must not<br><b>めっちゃ</b> meccha = とても very (now used by young people everywhere)<br><b>ほんま</b> honma = 本当 really<br><b>なんでやねん</b> nande ya nen = why on earth! (the classic comedy comeback)', 'おおきに。あかん。めっちゃ。ほんま。なんでやねん。'),
					C('あかん in standard Japanese is', 'だめ', ['ありがとう', 'とても', '本当']),
					J('thank you (Kansai)', 'おおきに', 'おおきに', 'ookini', '', ['okini']),
					I('Kansai grammar', 'Negative <b>〜へん</b> instead of ない: 分から<b>へん</b> = 分からない · 食べ<b>へん</b> = 食べない<br><b>や</b> instead of だ: そう<b>や</b> = そうだ · 好き<b>や</b>ねん = 好きなんだ<br><b>ちゃう</b> = 違う (that is wrong): ちゃうちゃう！No, no!', '分からへん。食べへん。そうや。好きやねん。ちゃうちゃう。'),
					C('分からへん means', 'I do not understand', ['I understand', 'Let us understand', 'I understood']),
					C('めっちゃおいしい means', 'really tasty', ['not tasty', 'slightly tasty', 'tasty, I suppose']),
					I('Casual contractions (used everywhere)', 'ている becomes <b>てる</b>: 食べ<b>てる</b> · 何し<b>てる</b>の？<br>てしまう becomes <b>ちゃう</b>, でしまう becomes <b>じゃう</b>: 忘れ<b>ちゃった</b> I went and forgot · 飲ん<b>じゃった</b><br>ておく becomes <b>とく</b>: 買っ<b>とく</b><br>では becomes <b>じゃ</b> · なければ becomes <b>なきゃ</b> · という becomes <b>って</b>', '食べてる。何してるの？忘れちゃった。飲んじゃった。買っとく。行かなきゃ。'),
					C('忘れちゃった is the casual form of', '忘れてしまった', ['忘れていた', '忘れなかった', '忘れておいた']),
					J('casual form of 食べている', '食べてる', 'たべてる', 'tabeteru'),
					I('Two meanings of ちゃう', 'Do not mix them up.<br>Standard casual: verb + <b>ちゃう</b> = てしまう, to end up doing. 食べちゃう。<br>Kansai: <b>ちゃう</b> on its own = 違う, wrong or different. それ、ちゃうで。That is not it.', '食べちゃう。それ、ちゃうで。'),
					H('何してるの', 'なにしてるの', 'nani shiteru no', 'What are you up to?')
				]
			},
			{
				id: 'ja-idi-1', title: 'Idioms and yojijukugo', sub: 'Four kanji, one whole idea',
				steps: [
					I('Yojijukugo: four-kanji idioms', '四字熟語 yojijukugo pack a whole idea into four kanji.<br><b>一石二鳥</b> isseki nichou = two birds with one stone<br><b>十人十色</b> juunin toiro = ten people, ten colours: to each their own<br><b>一期一会</b> ichigo ichie = one lifetime, one meeting: treasure each encounter, it will never repeat', '一石二鳥。十人十色。一期一会。'),
					C('十人十色 means', 'everyone has their own tastes', ['ten people make a crowd', 'a colourful party', 'all people are the same']),
					J('two birds with one stone', '一石二鳥', 'いっせきにちょう', 'isseki nichou', '', ['isseki nicho']),
					I('一期一会', 'From the tea ceremony: host and guest should treat each gathering as once in a lifetime. People quote it about travel, chance meetings and farewells.<br>Read it <b>ichigo ichie</b>, not "ikki ikkai".', '一期一会。'),
					C('一期一会 comes from', 'the tea ceremony', ['sumo', 'baseball', 'the stock market']),
					I('More worth knowing', '<b>自業自得</b> jigou jitoku = you reap what you sow<br><b>三日坊主</b> mikka bouzu = "three-day monk": someone who gives up fast<br><b>七転八起</b> shichiten hakki = fall seven times, get up eight<br><b>以心伝心</b> ishin denshin = understanding each other without words', '自業自得。三日坊主。七転八起。以心伝心。'),
					C('You quit the gym after three days. You are a', '三日坊主', ['一石二鳥', '十人十色', '以心伝心']),
					I('Idioms with animals and body parts', '<b>猫の手も借りたい</b> neko no te mo karitai = so busy I would borrow even a cat\'s paw<br><b>猿も木から落ちる</b> saru mo ki kara ochiru = even monkeys fall from trees: experts slip up too<br><b>顔が広い</b> kao ga hiroi = "wide face": to know lots of people<br><b>耳が痛い</b> mimi ga itai = "my ears hurt": the criticism hits home', '猫の手も借りたい。猿も木から落ちる。顔が広い。耳が痛い。'),
					C('猫の手も借りたい means', 'I am extremely busy', ['I want a pet', 'I need to borrow money', 'my cat is helpful']),
					C('彼は顔が広い means', 'he knows a lot of people', ['he has a big face', 'he is arrogant', 'he is embarrassed']),
					J('even monkeys fall from trees', '猿も木から落ちる', 'さるもきからおちる', 'saru mo ki kara ochiru'),
					H('一期一会', 'いちごいちえ', 'ichigo ichie', 'one lifetime, one meeting')
				]
			},
			{
				id: 'ja-c2-1', title: 'The written register', sub: 'Words that make natives ask where you studied',
				steps: [
					I('Speech and writing split', 'Essays, news and reports use the <b>である</b> style instead of です or だ.<br>日本は島国<b>である</b>。Japan is an island nation.<br>Verbs link with the stem instead of the て form: 本を読<b>み</b>、考える (for 読んで).', '日本は島国である。本を読み、考える。'),
					C('In an essay, 重要だ (it is important) would most likely be written', '重要である', ['重要だよ', '重要っす', '重要じゃん']),
					I('Formal connectors', 'でも becomes <b>しかし</b> however<br>だから becomes <b>したがって</b> or <b>そのため</b> therefore<br>それに becomes <b>さらに</b> moreover<br>つまり becomes <b>すなわち</b> that is to say<br>について becomes <b>に関して</b> ni kanshite concerning', 'しかし。したがって。そのため。さらに。すなわち。に関して。'),
					J('therefore (formal, written)', 'したがって', 'したがって', 'shitagatte', '', ['従って']),
					C('The written equivalent of でも is', 'しかし', ['だって', 'ていうか', 'なんか']),
					I('Kango swaps', 'Writing prefers Chinese-origin words (漢語 kango) over native verbs.<br>買う becomes <b>購入する</b> kounyuu suru · 使う becomes <b>使用する</b> shiyou suru<br>始める becomes <b>開始する</b> kaishi suru · 調べる becomes <b>調査する</b> chousa suru<br>決める becomes <b>決定する</b> kettei suru', '購入する。使用する。開始する。調査する。決定する。'),
					C('購入する means', 'to purchase', ['to enter', 'to sell', 'to borrow']),
					I('Words that impress', '<b>懸念</b> kenen = concern, misgiving<br><b>把握する</b> haaku suru = to have a firm grasp of<br><b>曖昧</b> aimai = vague, ambiguous<br><b>忖度</b> sontaku = guessing what a superior wants without being told<br><b>臨機応変</b> rinki ouhen = adapting to each situation as it comes', '懸念。把握する。曖昧。忖度。臨機応変。'),
					C('状況を把握する means', 'to get a clear grasp of the situation', ['to make the situation worse', 'to hide the situation', 'to explain the situation']),
					J('vague, ambiguous', '曖昧', 'あいまい', 'aimai'),
					I('Hedging like an editorial', '<b>と言わざるを得ない</b> = one cannot but say<br><b>に過ぎない</b> ni suginai = is no more than<br><b>と思われる</b> = it would seem (the passive softens the claim)<br><b>にほかならない</b> = is nothing other than<br><b>べきである</b> = ought to', '問題だと言わざるを得ない。それは噂に過ぎない。'),
					C('それは噂に過ぎない means', 'that is nothing more than a rumour', ['that rumour went too far', 'the rumour has died down', 'that is more than a rumour'])
				]
			}
		]
	}
];

// Placement test: one band per CEFR level, easiest first. Stops at the first band not passed.
const PLACEMENT = [
	{ band: 'A1', steps: [
		C('ありがとう means', 'thank you', ['hello', 'sorry', 'goodbye']),
		J('I am a student (student = 学生)', '私は学生です', 'わたしはがくせいです', 'watashi wa gakusei desu', '', ['学生です', 'がくせいです', 'gakusei desu']),
		C('これ___本です。(This is a book.)', 'は', ['を', 'に', 'で']),
		C('Which katakana is "tsu"?', 'ツ', ['シ', 'ソ', 'ン'])
	] },
	{ band: 'A2', steps: [
		C('レストラン___食べます。(I eat at a restaurant.)', 'で', ['に', 'へ', 'の']),
		C('"It was not expensive" is', '高くなかったです', ['高いじゃなかったです', '高くないでした', '高いでした']),
		J('て form of 飲む (to drink)', '飲んで', 'のんで', 'nonde'),
		C('ねこが二___います。(There are two cats.)', '匹', ['本', '枚', '人'])
	] },
	{ band: 'B1', steps: [
		C('Plain negative of 買う (to buy)', '買わない', ['買あない', '買いない', '買うない']),
		J('I can speak Japanese (polite)', '日本語が話せます', 'にほんごがはなせます', 'nihongo ga hanasemasu', '', ['日本語を話せます', 'にほんごをはなせます', 'nihongo o hanasemasu', 'nihongo wo hanasemasu']),
		C('"My friend gave me a book."', '友だちが本をくれました', ['友だちが私に本をあげました', '私は友だちに本をくれました', '友だちは私に本をもらいました']),
		C('雨が降っ___、行きません。(If it rains, I will not go.)', 'たら', ['ば', 'なら', 'と'])
	] },
	{ band: 'B2', steps: [
		C('私は先生にほめ___。(I was praised by the teacher.)', 'られました', ['させました', 'ました', 'てあげました']),
		C('お待たせしました means', 'Sorry to have kept you waiting', ['I am tired of waiting', 'Please wait here', 'I cannot wait']),
		C('だれ___来ましたか。(Who came?)', 'が', ['は', 'を', 'で']),
		C('一時間も待たされました means', 'I was made to wait a whole hour', ['I made them wait an hour', 'I was able to wait an hour', 'I gladly waited an hour'])
	] },
	{ band: 'C1', steps: [
		C('The humble form of 言う is', '申す', ['おっしゃる', '召し上がる', 'いらっしゃる']),
		C('一期一会 means', 'treasure each encounter, for it will never repeat', ['first come, first served', 'once a year', 'one step at a time']),
		C('それは噂に過ぎない means', 'that is nothing more than a rumour', ['that rumour went too far', 'the rumour has died down', 'that is more than a rumour']),
		C('忘れちゃった is the casual form of', '忘れてしまった', ['忘れていた', '忘れなかった', '忘れておいた'])
	] }
];

// Starter word bank: [word, meaning, kana, romaji, example, example in English]
const SEED = [
	['こんにちは', 'hello', 'こんにちは', 'konnichiwa', 'こんにちは、ユキです。', 'Hello, I am Yuki.'],
	['ありがとう', 'thank you', 'ありがとう', 'arigatou', '手伝ってくれてありがとう。', 'Thanks for helping me.'],
	['すみません', 'excuse me; sorry', 'すみません', 'sumimasen', 'すみません、駅はどこですか。', 'Excuse me, where is the station?'],
	['お願いします', 'please (I ask this of you)', 'おねがいします', 'onegaishimasu', 'コーヒーをお願いします。', 'A coffee, please.'],
	['大丈夫', 'fine, all right; no thanks', 'だいじょうぶ', 'daijoubu', '大丈夫ですか。', 'Are you all right?'],
	['よろしく', 'nice to meet you; I am counting on you', 'よろしく', 'yoroshiku', 'これからよろしくお願いします。', 'I look forward to working with you.'],
	['お疲れ様', 'thanks for your hard work', 'おつかれさま', 'otsukaresama', '今日もお疲れ様でした。', 'Thanks for your hard work today, too.'],
	['いただきます', 'said before eating: I humbly receive', 'いただきます', 'itadakimasu', 'では、いただきます。', 'Well then, let us eat.'],
	['ごちそうさま', 'thanks for the meal', 'ごちそうさま', 'gochisousama', 'ごちそうさまでした。おいしかったです。', 'Thank you for the meal. It was delicious.'],
	['お邪魔します', 'said when entering a home: sorry to intrude', 'おじゃまします', 'ojamashimasu', 'お邪魔します。素敵な部屋ですね。', 'Sorry to intrude. What a lovely room.'],
	['友達', 'friend', 'ともだち', 'tomodachi', '友達と映画を見ました。', 'I watched a film with a friend.'],
	['好き', 'liked; to like', 'すき', 'suki', '日本の音楽が好きです。', 'I like Japanese music.'],
	['分かる', 'to understand', 'わかる', 'wakaru', '言いたいことは分かる。', 'I get what you want to say.'],
	['美味しい', 'tasty', 'おいしい', 'oishii', 'このラーメンは美味しい。', 'This ramen is tasty.'],
	['可愛い', 'cute', 'かわいい', 'kawaii', 'この犬、可愛いね。', 'This dog is cute, right?'],
	['すごい', 'amazing, wow', 'すごい', 'sugoi', 'すごい！本当に？', 'Wow! Really?'],
	['やばい', 'awful; amazing (slang)', 'やばい', 'yabai', 'このケーキ、やばい。', 'This cake is insanely good.'],
	['懐かしい', 'nostalgic, that takes me back', 'なつかしい', 'natsukashii', 'この歌、懐かしい！', 'This song takes me back!'],
	['もったいない', 'what a waste', 'もったいない', 'mottainai', '捨てるのはもったいない。', 'It would be a waste to throw it away.'],
	['微妙', 'iffy, not great', 'びみょう', 'bimyou', '味はちょっと微妙だった。', 'The taste was a bit iffy.'],
	['面倒くさい', 'a pain, a hassle', 'めんどうくさい', 'mendoukusai', '料理は面倒くさい。', 'Cooking is a hassle.'],
	['仕方がない', 'it cannot be helped', 'しかたがない', 'shikata ga nai', '雨だから仕方がない。', 'It is raining, so it cannot be helped.'],
	['頑張って', 'good luck, do your best', 'がんばって', 'ganbatte', '試験、頑張って！', 'Good luck with the exam!'],
	['本当', 'true, really', 'ほんとう', 'hontou', 'それは本当ですか。', 'Is that true?'],
	['多分', 'probably', 'たぶん', 'tabun', '多分、明日は雨です。', 'It will probably rain tomorrow.'],
	['全然', 'not at all', 'ぜんぜん', 'zenzen', '全然分かりません。', 'I do not understand at all.'],
	['一緒に', 'together', 'いっしょに', 'issho ni', '一緒に行きましょう。', 'Let us go together.'],
	['ちょっと', 'a little; a soft no', 'ちょっと', 'chotto', 'ちょっと待ってください。', 'Please wait a moment.'],
	['やっぱり', 'as I thought, after all', 'やっぱり', 'yappari', 'やっぱりすしが一番だ。', 'Sushi is the best after all.'],
	['なるほど', 'I see, that makes sense', 'なるほど', 'naruhodo', 'なるほど、そういうことか。', 'I see, so that is what it means.'],
	['さすが', 'just what I would expect of you (praise)', 'さすが', 'sasuga', 'さすが田中さん！', 'That is Tanaka for you!'],
	['一応', 'just in case; more or less', 'いちおう', 'ichiou', '一応、確認します。', 'I will check, just in case.'],
	['適当', 'suitable; (casual) sloppy, random', 'てきとう', 'tekitou', '適当に選んだ。', 'I picked at random.'],
	['空気を読む', 'to read the room', 'くうきをよむ', 'kuuki o yomu', '彼は空気を読むのが上手だ。', 'He is good at reading the room.'],
	['木漏れ日', 'sunlight filtering through the trees', 'こもれび', 'komorebi', '木漏れ日がきれいだ。', 'The sunlight through the trees is beautiful.'],
	['積ん読', 'buying books and letting them pile up unread', 'つんどく', 'tsundoku', '積ん読が増えている。', 'My pile of unread books is growing.'],
	['一石二鳥', 'to kill two birds with one stone', 'いっせきにちょう', 'isseki nichou', '歩いて通勤すれば一石二鳥だ。', 'Walking to work kills two birds with one stone.'],
	['十人十色', 'to each their own', 'じゅうにんといろ', 'juunin toiro', '好みは十人十色だ。', 'Tastes differ from person to person.'],
	['一期一会', 'a once-in-a-lifetime encounter', 'いちごいちえ', 'ichigo ichie', '旅は一期一会だ。', 'Every encounter on a journey happens only once.'],
	['猫の手も借りたい', 'to be swamped (would borrow even a cat\'s paw)', 'ねこのてもかりたい', 'neko no te mo karitai', '忙しくて猫の手も借りたい。', 'I am so busy I would take help from a cat.']
].map(([pt, en, kana, romaji, ex, exEn]) => ({ pt, en, say: `${kana} · ${romaji}`, ex, exEn }));

// ---------- drills ----------
// fill the blank: prompt with ___, the answer, three wrong options, an English gloss
const F = (prompt, answer, options, sub, explain) => ({ prompt, answer, options, sub, explain, speak: prompt.replace(/_+/, answer) });
// pick the right reading or the right form: prompt, a hint, the answer, three wrong options
const N = (prompt, sub, answer, options, speak = prompt) => ({ prompt, sub, answer, options, speak });
// type a verb form: every row is written out by hand, with its kana and romaji
const V = (label) => ([from, en, answer, kana, romaji]) => ({ prompt: `${from}: ${label}`, sub: en, answer, accept: alt(answer, kana, romaji), explain: gloss(answer, kana, romaji) });

const DRILLS = {
	kana: { name: 'Kana reading', items: [
		N('ねこ', 'cat', 'neko', ['meko', 'reko', 'nuko']),
		N('きって', 'stamp', 'kitte', ['kite', 'kiite', 'kitsute']),
		N('びょういん', 'hospital', 'byouin', ['biyouin', 'byouen', 'hyouin']),
		N('おばあさん', 'grandmother', 'obaasan', ['obasan', 'ojiisan', 'ohaasan']),
		N('がっこう', 'school', 'gakkou', ['gakou', 'kakkou', 'gatsukou']),
		N('ちょっと', 'a little', 'chotto', ['chiyotto', 'choto', 'chotsuto']),
		N('じゅう', 'ten', 'juu', ['jiyuu', 'shuu', 'chuu']),
		N('ぎんこう', 'bank', 'ginkou', ['kinkou', 'ginkyou', 'gingou']),
		N('りょこう', 'trip', 'ryokou', ['riyokou', 'ryoukou', 'ryokuu']),
		N('さんぽ', 'a walk', 'sanpo', ['sanbo', 'sanho', 'kinpo']),
		N('ほん', 'book', 'hon', ['han', 'mon', 'hoso']),
		N('わたし', 'I', 'watashi', ['netashi', 'retashi', 'watasa']),
		N('ざっし', 'magazine', 'zasshi', ['zashi', 'sasshi', 'zatsushi']),
		N('テレビ', 'TV', 'terebi', ['terepi', 'tenebi', 'terehi']),
		N('ワイン', 'wine', 'wain', ['uin', 'waiso', 'kuin']),
		N('パソコン', 'PC', 'pasokon', ['pashikon', 'patsukon', 'pasokoso']),
		N('シーツ', 'bed sheet', 'shiitsu', ['tsuushi', 'shiishi', 'tsuutsu']),
		N('シャツ', 'shirt', 'shatsu', ['shashi', 'tsuyashi', 'shiyatsu'])
	] },
	particles: { name: 'Particles', items: [
		F('私___学生です。', 'は', ['を', 'に', 'で'], 'I am a student.'),
		F('これは私___本です。', 'の', ['を', 'が', 'に'], 'This is my book.'),
		F('パン___食べます。', 'を', ['に', 'へ', 'の'], 'I eat bread.'),
		F('七時___起きます。', 'に', ['を', 'が', 'の'], 'I get up at seven.'),
		F('図書館___勉強します。', 'で', ['を', 'が', 'と'], 'I study at the library.', 'で marks where an action takes place.'),
		F('電車___行きます。', 'で', ['を', 'の', 'か'], 'I go by train.', 'で marks the means.'),
		F('友だち___映画を見ます。', 'と', ['を', 'へ', 'に'], 'I watch a film with a friend.'),
		F('私は学生です。田中さん___学生です。', 'も', ['を', 'に', 'で'], 'I am a student. Tanaka is a student too.'),
		F('つくえの上___本があります。', 'に', ['を', 'と', 'へ'], 'There is a book on the desk.', 'に marks where something exists.'),
		F('公園に犬___います。', 'が', ['を', 'に', 'で'], 'There is a dog in the park.'),
		F('学生です___。', 'か', ['を', 'に', 'で'], 'Are you a student?'),
		F('だれ___来ましたか。', 'が', ['は', 'を', 'で'], 'Who came?', 'A question word as subject never takes は.'),
		F('すし___好きです。', 'が', ['へ', 'に', 'で'], 'I like sushi.', '好き marks what you like with が.'),
		F('日本語___分かります。', 'が', ['へ', 'に', 'と'], 'I understand Japanese.'),
		F('友だち___本をあげました。', 'に', ['を', 'で', 'か'], 'I gave a book to a friend.'),
		F('先生___ほめられました。', 'に', ['を', 'で', 'へ'], 'I was praised by the teacher.', 'In a passive sentence the doer takes に.'),
		F('東京___大阪まで新幹線で行きます。', 'から', ['まで', 'を', 'の'], 'I go from Tokyo to Osaka by bullet train.'),
		F('これは母___作ったケーキです。', 'が', ['を', 'へ', 'か'], 'This is the cake my mother made.'),
		F('日本___行きたいです。', 'に', ['を', 'が', 'で'], 'I want to go to Japan.'),
		F('はし___食べます。', 'で', ['が', 'へ', 'に'], 'I eat with chopsticks.')
	] },
	te: { name: 'て form', items: [
		['食べる', 'to eat', '食べて', 'たべて', 'tabete'],
		['見る', 'to see', '見て', 'みて', 'mite'],
		['起きる', 'to get up', '起きて', 'おきて', 'okite'],
		['飲む', 'to drink', '飲んで', 'のんで', 'nonde'],
		['読む', 'to read', '読んで', 'よんで', 'yonde'],
		['遊ぶ', 'to play', '遊んで', 'あそんで', 'asonde'],
		['死ぬ', 'to die', '死んで', 'しんで', 'shinde'],
		['書く', 'to write', '書いて', 'かいて', 'kaite'],
		['聞く', 'to listen, to ask', '聞いて', 'きいて', 'kiite'],
		['泳ぐ', 'to swim', '泳いで', 'およいで', 'oyoide'],
		['話す', 'to speak', '話して', 'はなして', 'hanashite'],
		['買う', 'to buy', '買って', 'かって', 'katte'],
		['待つ', 'to wait', '待って', 'まって', 'matte'],
		['帰る', 'to return', '帰って', 'かえって', 'kaette'],
		['作る', 'to make', '作って', 'つくって', 'tsukutte'],
		['行く', 'to go', '行って', 'いって', 'itte'],
		['する', 'to do', 'して', 'して', 'shite'],
		['来る', 'to come', '来て', 'きて', 'kite']
	].map(V('て form')) },
	forms: { name: 'ない, た and plain forms', items: [
		...[
			['食べる', 'to eat', '食べない', 'たべない', 'tabenai'],
			['飲む', 'to drink', '飲まない', 'のまない', 'nomanai'],
			['行く', 'to go', '行かない', 'いかない', 'ikanai'],
			['買う', 'to buy', '買わない', 'かわない', 'kawanai'],
			['話す', 'to speak', '話さない', 'はなさない', 'hanasanai'],
			['待つ', 'to wait', '待たない', 'またない', 'matanai'],
			['する', 'to do', 'しない', 'しない', 'shinai'],
			['来る', 'to come', '来ない', 'こない', 'konai']
		].map(V('ない form')),
		...[
			['食べる', 'to eat', '食べた', 'たべた', 'tabeta'],
			['飲む', 'to drink', '飲んだ', 'のんだ', 'nonda'],
			['書く', 'to write', '書いた', 'かいた', 'kaita'],
			['行く', 'to go', '行った', 'いった', 'itta'],
			['買う', 'to buy', '買った', 'かった', 'katta'],
			['話す', 'to speak', '話した', 'はなした', 'hanashita'],
			['泳ぐ', 'to swim', '泳いだ', 'およいだ', 'oyoida'],
			['来る', 'to come', '来た', 'きた', 'kita']
		].map(V('た form')),
		...[
			['行きます', 'go', '行く', 'いく', 'iku'],
			['見ました', 'saw', '見た', 'みた', 'mita'],
			['分かりません', 'do not understand', '分からない', 'わからない', 'wakaranai'],
			['しました', 'did', 'した', 'した', 'shita'],
			['学生です', 'is a student', '学生だ', 'がくせいだ', 'gakusei da'],
			['高かったです', 'was expensive', '高かった', 'たかかった', 'takakatta'],
			['静かでした', 'was quiet', '静かだった', 'しずかだった', 'shizuka datta'],
			['食べませんでした', 'did not eat', '食べなかった', 'たべなかった', 'tabenakatta']
		].map(V('plain form'))
	] },
	counters: { name: 'Counters', items: [
		F('切符を二___ください。', '枚', ['本', '匹', '個'], 'Two tickets, please.', '枚 counts flat things.'),
		F('ビールを三___ください。', '本', ['枚', '匹', '人'], 'Three bottles of beer, please.', '本 counts long thin things.'),
		F('犬が一___います。', '匹', ['本', '枚', '個'], 'There is one dog.'),
		F('りんごを五___買いました。', '個', ['匹', '人', '枚'], 'I bought five apples.'),
		F('学生が四___います。', '人', ['匹', '本', '枚'], 'There are four students.'),
		F('かさが一___あります。', '本', ['枚', '匹', '人'], 'There is one umbrella.'),
		F('シャツを二___買いました。', '枚', ['本', '匹', '人'], 'I bought two shirts.'),
		N('一人', 'one person: how is it read?', 'ひとり', ['いちにん', 'いちじん', 'ひとつ']),
		N('二人', 'two people: how is it read?', 'ふたり', ['ににん', 'ふたつ', 'にじん']),
		N('四人', 'four people: how is it read?', 'よにん', ['よんにん', 'しにん', 'よつにん']),
		N('一本', 'one long thing: how is it read?', 'いっぽん', ['いちほん', 'いちぼん', 'いっほん']),
		N('三本', 'three long things: how is it read?', 'さんぼん', ['さんほん', 'さんぽん', 'みほん']),
		N('六本', 'six long things: how is it read?', 'ろっぽん', ['ろくほん', 'ろくぼん', 'むほん']),
		N('一匹', 'one small animal: how is it read?', 'いっぴき', ['いちひき', 'いちびき', 'いっひき']),
		N('三匹', 'three small animals: how is it read?', 'さんびき', ['さんひき', 'さんぴき', 'みひき']),
		N('一つ', 'one thing: how is it read?', 'ひとつ', ['いちつ', 'いつつ', 'ひとり']),
		N('三つ', 'three things: how is it read?', 'みっつ', ['さんつ', 'むっつ', 'みつつ']),
		N('五つ', 'five things: how is it read?', 'いつつ', ['ごつ', 'ひとつ', 'いっつ']),
		N('八つ', 'eight things: how is it read?', 'やっつ', ['はちつ', 'よっつ', 'やつつ']),
		N('一個', 'one small object: how is it read?', 'いっこ', ['いちこ', 'ひとこ', 'いちご'])
	] },
	voice: { name: 'Potential, passive, causative', items: [
		...[
			['食べる', 'can eat', '食べられる', 'たべられる', 'taberareru'],
			['飲む', 'can drink', '飲める', 'のめる', 'nomeru'],
			['行く', 'can go', '行ける', 'いける', 'ikeru'],
			['話す', 'can speak', '話せる', 'はなせる', 'hanaseru'],
			['書く', 'can write', '書ける', 'かける', 'kakeru'],
			['買う', 'can buy', '買える', 'かえる', 'kaeru'],
			['読む', 'can read', '読める', 'よめる', 'yomeru'],
			['する', 'can do', 'できる', 'できる', 'dekiru'],
			['来る', 'can come', '来られる', 'こられる', 'korareru']
		].map(V('potential (can)')),
		...[
			['言う', 'to be told', '言われる', 'いわれる', 'iwareru'],
			['読む', 'to be read', '読まれる', 'よまれる', 'yomareru'],
			['書く', 'to be written', '書かれる', 'かかれる', 'kakareru'],
			['叱る', 'to be scolded', '叱られる', 'しかられる', 'shikarareru'],
			['見る', 'to be seen', '見られる', 'みられる', 'mirareru'],
			['踏む', 'to be stepped on', '踏まれる', 'ふまれる', 'fumareru'],
			['盗む', 'to be stolen', '盗まれる', 'ぬすまれる', 'nusumareru'],
			['する', 'to be done', 'される', 'される', 'sareru']
		].map(V('passive')),
		...[
			['食べる', 'to make eat', '食べさせる', 'たべさせる', 'tabesaseru'],
			['行く', 'to make go', '行かせる', 'いかせる', 'ikaseru'],
			['待つ', 'to make wait', '待たせる', 'またせる', 'mataseru'],
			['読む', 'to make read', '読ませる', 'よませる', 'yomaseru'],
			['飲む', 'to make drink', '飲ませる', 'のませる', 'nomaseru'],
			['する', 'to make do', 'させる', 'させる', 'saseru'],
			['来る', 'to make come', '来させる', 'こさせる', 'kosaseru']
		].map(V('causative (make, let)'))
	] },
	keigo: { name: 'Keigo pairs', items: [
		N('言う', 'respectful form', 'おっしゃる', ['申す', '伺う', '拝見する']),
		N('言う', 'humble form', '申す', ['おっしゃる', 'なさる', '召し上がる']),
		N('行く', 'respectful form', 'いらっしゃる', ['参る', '伺う', 'いたす']),
		N('行く', 'humble form', '参る', ['いらっしゃる', 'おっしゃる', 'なさる']),
		N('食べる', 'respectful form', '召し上がる', ['いただく', '拝見する', '参る']),
		N('食べる', 'humble form', 'いただく', ['召し上がる', 'ご覧になる', 'なさる']),
		N('見る', 'respectful form', 'ご覧になる', ['拝見する', '伺う', '申す']),
		N('見る', 'humble form', '拝見する', ['ご覧になる', '召し上がる', 'いらっしゃる']),
		N('する', 'respectful form', 'なさる', ['いたす', '参る', '申す']),
		N('する', 'humble form', 'いたす', ['なさる', 'おっしゃる', 'いらっしゃる']),
		N('いる', 'humble form', 'おる', ['いらっしゃる', 'なさる', '召し上がる']),
		N('聞く', 'humble form', '伺う', ['おっしゃる', 'ご覧になる', 'なさる']),
		N('くれる', 'respectful form', 'くださる', ['いただく', '差し上げる', '参る']),
		N('あげる', 'humble form', '差し上げる', ['くださる', 'いただく', 'おっしゃる']),
		N('待つ', 'respectful form, regular pattern', 'お待ちになる', ['お待ちする', '待たせる', 'お待たせする']),
		N('持つ', 'humble form, regular pattern', 'お持ちする', ['お持ちになる', '持たせる', '持たれる'])
	] }
};

const ALL = Object.keys(DRILLS);

export default {
	code: 'ja',
	units: UNITS,
	seed: withMore(SEED, MORE, SEED_POS),
	placement: PLACEMENT,
	keys: '', // no accent key row: answers are typed in kana or plain romaji
	levels: [[0, 'Shoshinsha 初心者'], [150, 'Kankoukyaku 観光客'], [500, 'Ryuugakusei 留学生'], [1200, 'Nihontsuu 日本通'], [2500, 'Perapera ペラペラ'], [5000, 'Neitibu kyuu ネイティブ級']],
	// [id, title, what you can do (with the matching JLPT level), lessons, drill groups in the checkpoint test]
	stages: [
		['A1.1', 'Hiragana', 'Read hiragana and introduce yourself (JLPT N5)', ['ja-kana-1', 'ja-kana-2', 'ja-base-1'], ['kana']],
		['A1.2', 'Katakana', 'Read katakana and say what is where (JLPT N5)', ['ja-kana-3', 'ja-base-2'], ['kana', 'particles']],
		['A2.1', 'Daily life', 'Describe things, count them and say what you do (JLPT N5)', ['ja-base-3', 'ja-adj-1', 'ja-count-1'], ['particles', 'counters']],
		['A2.2', 'Verbs', 'Ask for things and say what is going on with the て form (JLPT N5 to N4)', ['ja-kanji-1', 'ja-verb-1', 'ja-te-1'], ['te', 'particles']],
		['B1.1', 'Plain speech', 'Talk casually and say who did what for whom (JLPT N4)', ['ja-plain-1', 'ja-give-1'], ['forms', 'te']],
		['B1.2', 'Real conversation', 'Say what you can do, suggest plans and react naturally (JLPT N4)', ['ja-pot-1', 'ja-conv-1'], ['voice', 'forms']],
		['B2.1', 'If and when', 'Use conditionals, the passive and the causative (JLPT N3)', ['ja-cond-1', 'ja-pass-1'], ['voice', 'particles']],
		['B2.2', 'Nuance', 'Choose は or が on purpose and handle basic keigo (JLPT N3)', ['ja-waga-1', 'ja-keigo-1'], ['keigo', 'voice']],
		['B2.3', 'Every structure', 'Follow casual and Kansai speech (JLPT N2)', ['ja-kansai-1'], ALL],
		['C1.1', 'Idioms', 'Catch idioms and four-kanji phrases (JLPT N2)', ['ja-idi-1'], ALL],
		['C1.2', 'Written Japanese', 'Read formal text and news (JLPT N1)', ['ja-c2-1'], ALL],
		['C1.3', 'Almost there', 'Argue, joke and tell stories at speed (JLPT N1)', [], ALL],
		['C2.1', 'Mastery', 'Surprise natives with your word choice (beyond JLPT N1)', [], ALL],
		['C2.2', 'Near native', 'Hold your own anywhere, on anything (beyond JLPT N1)', [], ALL]
	],
	// writing tasks for the B and C checkpoint tests: [task, English hint]
	writing: {
		B: [
			['先週の週末、何をしましたか。', 'What did you do last weekend? 2 or 3 sentences. Kana or romaji is fine.'],
			['あなたの町について教えてください。', 'Tell me about your town. Use い and な adjectives. Kana or romaji is fine.'],
			['日本に行ったら、何をしたいですか。', 'If you went to Japan, what would you want to do? Use たら. Kana or romaji is fine.'],
			['一番いい友達を紹介してください。', 'Introduce your best friend. 2 or 3 sentences. Kana or romaji is fine.'],
			['日本語の勉強は難しいですか。どうしてですか。', 'Is studying Japanese hard? Why? Use から to give a reason. Kana or romaji is fine.']
		],
		C: [
			['「家で働くほうが会社で働くよりいい」という意見に賛成ですか。理由を書いてください。', 'Agree or disagree: working from home beats the office. 3 or 4 sentences with connectors. Kana or romaji is fine.'],
			['困った経験と、それをどう解決したかを書いてください。', 'Describe a problem you ran into and how you solved it. Use the passive at least once. Kana or romaji is fine.'],
			['四字熟語を一つ使って、最近の生活を説明してください。', 'Describe your recent life with one four-kanji idiom and explain why. Kana or romaji is fine.'],
			['技術は私たちの生活をよくしたと思いますか。', 'Has technology made our lives better? 3 or 4 sentences in the である style if you can. Kana or romaji is fine.'],
			['もし日本で生まれていたら、あなたの人生はどう違っていたでしょうか。', 'If you had been born in Japan, how would your life differ? 3 or 4 sentences. Kana or romaji is fine.']
		]
	},
	chat: {
		who: 'Yuki, from Tokyo. She fixes your Japanese as you go.',
		hint: 'Say hi. Try: こんにちは、ユキさん！ (romaji works too: konnichiwa)',
		placeholder: '日本語で書いてください... (or romaji)',
		scenes: ['Free chat', 'Ordering at an izakaya', 'Asking the way at the station', 'Meeting someone new', 'Job interview']
	},
	drill: tableDrill(DRILLS),
	ui: {
		right: '正解！', perfect: '完璧！', good: 'いいね！', almost: '惜しい！', welcome: 'ようこそ',
		hello: ['おはよう', 'こんにちは', 'こんばんは'],
		placeholder: '日本語, kana or romaji...', write: '日本語で書いてください... (kana or romaji is fine)',
		typeLabel: 'Type it in Japanese (kanji, kana or romaji)', sayLabel: 'Say it in Japanese (kanji, kana or romaji)',
		near: 'Right, but check the spelling.',
		drill: 'Drills', drillSub: 'Kana, particles, verb forms',
		drillQ: 'What do you want to drill?',
		drillBlurb: 'Ten quick questions on the parts of Japanese that trip people up. Missed ones come back at the end.'
	}
};
