// Mandarin Chinese pack: course, starter words, placement test, drills, roadmap.
// Stage targets follow the HSK levels (Chinese Proficiency Grading Standards) mapped onto CEFR.
// Simplified characters. Every typed answer also accepts pinyin, so no Chinese keyboard is needed.
import { toneOf, syllables } from '../tone.js';
import { I, C, T, L, tableDrill } from './kit.js';
import { withMore } from './kit.js';
import { MORE, SEED_POS } from './words/zh.js';
import { UNITS5 } from './zh-hsk5.js';
import { UNITS6 } from './zh-hsk6.js';
import { SYN } from './words/syn-zh.js';

// typed answer: characters, or pinyin (tone marks optional, flagged when missing)
const Z = (prompt, zh, py, explain) => T(prompt, zh, `${zh} = ${py}${explain ? '. ' + explain : ''}`, [py]);
const H = (zh, py, en) => L(zh, `${py} = ${en}`, [py]);

const UNITS = [
	{
		title: 'Sounds',
		sub: 'Tones and pinyin, explained in English',
		lessons: [
			{
				id: 'zh-sons-1', title: 'Four tones and a half', sub: 'The same syllable, five words',
				steps: [
					I('Mandarin is sung', 'Every syllable has a tone, and the tone changes the word.<br><b>mā</b> 妈 mother: high and flat, like holding a note<br><b>má</b> 麻 hemp: rising, like asking "what?"<br><b>mǎ</b> 马 horse: a low dip, like a doubtful "well..."<br><b>mà</b> 骂 to scold: a sharp fall, like "No!"', '妈。麻。马。骂。'),
					C('Which is "horse"?', 'mǎ', ['mā', 'má', 'mà'], 'Third tone: the low dip.'),
					I('The neutral tone', 'Some syllables are light and short, with no tone mark.<br><b>māma</b> 妈妈 mom · <b>xièxie</b> 谢谢 thanks · <b>ma</b> 吗 question particle', '妈妈。谢谢。'),
					I('Reading tone marks', 'The mark sits on the main vowel: ā á ǎ à.<br>In this app you can answer in characters or in pinyin. Pinyin without tone marks is accepted with a warning, so aim to add them.'),
					C('"xièxie" means', 'thank you', ['hello', 'sorry', 'goodbye']),
					H('你好', 'nǐ hǎo', 'hello'),
					I('Two third tones in a row', 'When two third tones meet, the first one rises.<br>你好 is written <b>nǐ hǎo</b> but said <b>ní hǎo</b>.<br>很好 hěn hǎo is said hén hǎo.', '你好。很好。'),
					C('How is 你好 actually pronounced?', 'ní hǎo', ['nǐ hǎo, with two dips', 'nì hǎo', 'nī hāo'], 'Third + third: the first becomes second.'),
					Z('thank you', '谢谢', 'xièxie'),
					C('Which tone is a sharp fall?', 'fourth: mà', ['first: mā', 'second: má', 'third: mǎ']),
					H('妈妈好', 'māma hǎo', 'Mom is well'),
					Z('hello', '你好', 'nǐ hǎo')
				]
			},
			{
				id: 'zh-sons-2', title: 'Pinyin traps', sub: 'Letters that do not sound like English',
				steps: [
					I('Letters that lie', 'Pinyin uses English letters with different sounds.<br><b>q</b> = "ch" said with a smile: 七 qī (seven)<br><b>x</b> = "sh" said with a smile: 谢 xiè<br><b>j</b> = "j" said with a smile: 鸡 jī (chicken)<br><b>c</b> = "ts": 菜 cài (dish) · <b>z</b> = "dz": 在 zài', '七。谢。鸡。菜。在。'),
					C('"cài" 菜 starts with the sound', 'ts', ['k', 's', 'ch']),
					I('Tongue curled back', '<b>zh, ch, sh, r</b> are said with the tongue tip curled up and back.<br>中 zhōng (middle) · 吃 chī (eat) · 是 shì (to be) · 人 rén (person)<br>After these, the letter i is just a buzz, not "ee".', '中。吃。是。人。'),
					C('The "i" in 是 shì sounds like', 'a buzz, not "ee"', ['"ee" as in see', '"eye"', 'nothing, it is silent']),
					I('ü, the hidden vowel', 'Say "ee" and round your lips: that is <b>ü</b>.<br>女 nǚ (woman) · 绿 lǜ (green)<br>After j, q, x and y the dots are dropped but the sound stays: 去 qù (go), 鱼 yú (fish).', '女。绿。去。鱼。'),
					C('去 qù (to go): the u is', 'ü, with rounded lips', ['"oo" as in too', '"uh"', '"you"']),
					I('不 and 一 change tone', '不 bù becomes <b>bú</b> before a fourth tone: 不是 bú shì, 不对 bú duì.<br>一 yī becomes <b>yí</b> before a fourth tone (一个 yí gè) and <b>yì</b> before the others (一起 yìqǐ).', '不是。不对。一个。一起。'),
					C('不是 is pronounced', 'bú shì', ['bù shì', 'bū shì', 'bǔ shì']),
					H('我是中国人', 'wǒ shì Zhōngguó rén', 'I am Chinese'),
					Z('to eat', '吃', 'chī'),
					Z('I go', '我去', 'wǒ qù'),
					C('"q" in 七 qī is closest to', 'ch', ['k', 'kw', 'g'])
				]
			}
		]
	},
	{
		title: 'First steps',
		sub: 'Sentences with no conjugation at all',
		lessons: [
			{
				id: 'zh-base-1', title: '我是, 你好吗', sub: 'Am, is, are, questions and no',
				steps: [
					I('No conjugation, ever', 'Verbs never change. 是 shì is "am, is, are" for everyone.<br><b>我</b> wǒ I · <b>你</b> nǐ you · <b>他 / 她</b> tā he / she<br>Add <b>们</b> men for plural: 我们 wǒmen we, 你们, 他们.', '我。你。他。我们。'),
					Z('I am a student (student = 学生 xuésheng)', '我是学生', 'wǒ shì xuésheng'),
					I('吗 makes a question', 'Put <b>吗</b> ma at the end of a statement. Word order does not change.<br>你是老师。You are a teacher.<br>你是老师<b>吗</b>？Are you a teacher?', '你是老师吗？'),
					Z('Are you a student?', '你是学生吗', 'nǐ shì xuésheng ma'),
					I('不 says no', 'Put <b>不</b> bù before the verb or adjective.<br>我<b>不</b>是老师。I am not a teacher.<br>There is no single word for "yes" or "no". Repeat the verb: 是。/ 不是。', '我不是老师。'),
					Z('I am not a teacher (teacher = 老师 lǎoshī)', '我不是老师', 'wǒ bú shì lǎoshī'),
					I('Adjectives skip 是', 'With adjectives use <b>很</b> hěn, not 是.<br>我<b>很</b>好。I am well. (not 我是好)<br>很 literally means "very", but here it is just glue.', '我很好。'),
					C('"She is busy" (忙 máng) is', '她很忙', ['她是忙', '她忙是', '她吗忙']),
					C('How do you answer "你是学生吗？" with yes?', '是', ['对吗', '好', '有']),
					H('你好吗', 'nǐ hǎo ma', 'How are you?'),
					Z('We are well', '我们很好', 'wǒmen hěn hǎo'),
					C('他们 means', 'they', ['we', 'you all', 'he'])
				]
			},
			{
				id: 'zh-base-2', title: '有, numbers and 个', sub: 'Having, counting and measure words',
				steps: [
					I('有 = to have, there is', '我<b>有</b>一个哥哥。I have an older brother.<br>Its negative is special: <b>没有</b> méiyǒu, never 不有.<br>这儿<b>没有</b>人。There is nobody here.', '我有一个哥哥。这儿没有人。'),
					Z('I do not have (it)', '我没有', 'wǒ méiyǒu'),
					I('Numbers', '一 yī 1 · 二 èr 2 · 三 sān 3 · 四 sì 4 · 五 wǔ 5<br>六 liù 6 · 七 qī 7 · 八 bā 8 · 九 jiǔ 9 · 十 shí 10<br>十一 = 11, 二十 = 20, 二十五 = 25. Pure logic.', '一二三四五六七八九十'),
					Z('the number 25', '二十五', 'èrshíwǔ'),
					C('三十八 is', '38', ['83', '318', '11']),
					I('Measure words', 'You cannot put a number straight on a noun. A measure word goes between.<br>一<b>个</b>人 one person · 三<b>个</b>朋友 three friends<br><b>个</b> gè is the default. Others are specific: 一<b>本</b>书 a book, 一<b>杯</b>水 a glass of water.', '一个人。三个朋友。一本书。一杯水。'),
					Z('three people', '三个人', 'sān gè rén'),
					I('Two is 两 before a measure word', 'Counting: 一, <b>二</b>, 三.<br>Quantity: <b>两</b>个人 liǎng gè rén, two people. Not 二个人.', '两个人。'),
					Z('two friends (friend = 朋友 péngyou)', '两个朋友', 'liǎng gè péngyou'),
					C('一___书 (a book)', '本', ['杯', '只', '张']),
					H('我有两个姐姐', 'wǒ yǒu liǎng gè jiějie', 'I have two older sisters'),
					C('The negative of 有 is', '没有', ['不有', '不是', '没是'])
				]
			},
			{
				id: 'zh-base-3', title: 'When, where, then what', sub: 'The word order that never bends',
				steps: [
					I('Fixed order', 'Mandarin word order is strict:<br><b>Who + When + Where + Does what</b><br>我 明天 在家 工作。I work at home tomorrow.<br>Time and place go BEFORE the verb, never at the end as in English.', '我明天在家工作。'),
					C('"I eat at school today" is', '我今天在学校吃饭', ['我吃饭在学校今天', '我在学校吃饭今天', '今天吃饭我在学校']),
					I('Time words', '今天 jīntiān today · 明天 míngtiān tomorrow · 昨天 zuótiān yesterday<br>现在 xiànzài now · 早上 zǎoshang morning · 晚上 wǎnshang evening<br>Clock: 三<b>点</b> sān diǎn 3 o\'clock · 三点<b>半</b> 3:30', '今天。明天。昨天。现在。三点半。'),
					Z('tomorrow', '明天', 'míngtiān'),
					Z('3:30', '三点半', 'sān diǎn bàn'),
					I('在 = at, in', '在 zài + place goes before the verb.<br>我<b>在</b>北京工作。I work in Beijing.<br>Alone, 在 is the verb "to be at": 你在哪儿？Where are you?', '我在北京工作。你在哪儿？'),
					Z('Where are you?', '你在哪儿', 'nǐ zài nǎr'),
					I('Question words stay in place', 'Do not move the question word to the front. Put it where the answer would be.<br>你<b>什么时候</b>去？When do you go? (You when go?)<br>你去<b>哪儿</b>？Where do you go?<br>他是<b>谁</b>？Who is he?', '你什么时候去？你去哪儿？他是谁？'),
					C('"Who is she?"', '她是谁', ['谁是她吗', '她谁是', '是谁她']),
					C('"What do you eat?" (什么 = what)', '你吃什么', ['什么你吃', '你什么吃', '吃什么你吗'], 'No 吗 when there is a question word.'),
					H('我明天去北京', 'wǒ míngtiān qù Běijīng', 'I go to Beijing tomorrow'),
					Z('I am at home (home = 家 jiā)', '我在家', 'wǒ zài jiā')
				]
			}
		]
	},
	{
		title: 'Characters',
		sub: 'How to read what looks impossible',
		lessons: [
			{
				id: 'zh-char-1', title: 'Characters are building blocks', sub: 'Meaning part plus sound part',
				steps: [
					I('Not pictures, parts', 'Most characters are two parts: one hints at <b>meaning</b> (the radical), one hints at <b>sound</b>.<br>妈 mā mother = <b>女</b> woman + <b>马</b> mǎ (sound)<br>吗 ma = <b>口</b> mouth + 马 (sound)<br>Learn about 100 parts and thousands of characters open up.', '妈。吗。马。'),
					C('妈 contains 女. That part tells you', 'the meaning is related to women', ['the sound is nǚ', 'the tone is third', 'nothing at all']),
					I('Radicals to know first', '<b>氵</b> water: 河 river, 海 sea, 汤 soup<br><b>口</b> mouth: 吃 eat, 喝 drink, 叫 call<br><b>亻</b> person: 你 you, 他 he, 们<br><b>心 / 忄</b> heart: 想 think, 忙 busy<br><b>木</b> wood: 林 forest, 桌 table', '河。海。吃。喝。你。想。林。'),
					C('喝 has 口. It probably means', 'to drink', ['river', 'tree', 'busy']),
					C('Which character is most likely a liquid?', '汤', ['想', '林', '他'], '氵 is the water radical. 汤 tāng = soup.'),
					I('Pictures do exist', 'A few are drawings: <b>人</b> person, <b>山</b> mountain, <b>口</b> mouth, <b>日</b> sun, <b>月</b> moon, <b>木</b> tree.<br>And combinations: 木 + 木 = <b>林</b> forest. 日 + 月 = <b>明</b> bright.', '人。山。日。月。明。'),
					C('明 (日 sun + 月 moon) means', 'bright', ['night', 'month', 'shadow']),
					C('好 = 女 woman + 子 child. It means', 'good', ['family', 'small', 'daughter']),
					I('Words are mostly two characters', '电 diàn electric + 话 huà speech = <b>电话</b> telephone<br>电 + 脑 nǎo brain = <b>电脑</b> computer<br>电 + 影 yǐng shadow = <b>电影</b> movie<br>Knowing characters lets you guess new words.', '电话。电脑。电影。'),
					C('电脑, literally "electric brain", is', 'computer', ['telephone', 'robot', 'light bulb']),
					Z('telephone', '电话', 'diànhuà'),
					C('火车 = fire + vehicle. It means', 'train', ['fire engine', 'rocket', 'stove'])
				]
			}
		]
	},
	{
		title: 'Time without tenses',
		sub: '了, 过, 在 and the helpers that replace tense',
		lessons: [
			{
				id: 'zh-le-1', title: '了: done and changed', sub: 'It is not the past tense',
				steps: [
					I('了 is not past tense', '<b>了</b> le after a verb says the action is complete. That can be in the past or the future.<br>我吃<b>了</b>。I ate. / I have eaten.<br>我吃<b>了</b>饭就去。Once I have eaten, I will go.', '我吃了。我吃了饭就去。'),
					Z('I bought (it) (buy = 买 mǎi)', '我买了', 'wǒ mǎi le'),
					I('了 at the end = things changed', 'At the end of a sentence, 了 marks a new situation.<br>下雨<b>了</b>。It is raining now (it was not before).<br>我饿<b>了</b>。I have become hungry.<br>他不来<b>了</b>。He is not coming anymore.', '下雨了。我饿了。他不来了。'),
					C('我饿了 means', 'I am hungry now', ['I was hungry', 'I am not hungry', 'I will be hungry']),
					I('No 了 with 没', 'To say something did not happen, use <b>没</b> méi and drop 了.<br>我吃了。I ate.<br>我<b>没</b>吃。I did not eat. (never 我没吃了)', '我没吃。'),
					Z('I did not go', '我没去', 'wǒ méi qù'),
					C('Which is correct for "He did not come"?', '他没来', ['他不来了', '他没来了', '他不来过']),
					I('No 了 for habits or states', 'Past habits and states take no 了.<br>我以前<b>住</b>在上海。I used to live in Shanghai.<br>昨天很冷。Yesterday was cold.', '我以前住在上海。昨天很冷。'),
					C('"Yesterday was cold" is', '昨天很冷', ['昨天很冷了', '昨天冷了很', '昨天是冷了']),
					Z('He is not coming anymore', '他不来了', 'tā bù lái le'),
					H('我吃了', 'wǒ chī le', 'I have eaten'),
					C('太好了！means', 'Great!', ['Too late!', 'It was good once', 'Not good anymore'], '太 + adjective + 了 = so, too.')
				]
			},
			{
				id: 'zh-guo-1', title: '过, 在 and 着', sub: 'Experience, in progress, and holding',
				steps: [
					I('过 = have ever done', '<b>过</b> guo after a verb: the experience exists.<br>我去<b>过</b>中国。I have been to China.<br>我没吃<b>过</b>。I have never eaten it. (过 stays with 没)', '我去过中国。我没吃过。'),
					Z('I have been to Beijing', '我去过北京', 'wǒ qùguo Běijīng'),
					C('我看过这个电影 means', 'I have seen this movie before', ['I am watching this movie', 'I will watch this movie', 'I want to watch this movie']),
					I('了 or 过', '他去<b>了</b>北京。He went to Beijing (and may still be there).<br>他去<b>过</b>北京。He has been to Beijing (and is back).', '他去了北京。他去过北京。'),
					C('"She has gone to Shanghai (and is still there)"', '她去了上海', ['她去过上海', '她在去上海', '她去着上海']),
					I('在 = right now', '<b>在</b> zài before a verb: in progress.<br>我<b>在</b>吃饭。I am eating.<br>Often <b>正在</b> zhèngzài for emphasis, with 呢 at the end: 我在看书呢。', '我在吃饭。我在看书呢。'),
					Z('I am eating (a meal)', '我在吃饭', 'wǒ zài chī fàn'),
					I('着 = a state that holds', '<b>着</b> zhe after a verb: the result stays in place.<br>门开<b>着</b>。The door is open.<br>她穿<b>着</b>红衣服。She is wearing red.<br>在 is the action, 着 is the resulting state.', '门开着。她穿着红衣服。'),
					C('门开着 means', 'The door is open', ['Someone is opening the door', 'The door opened', 'Open the door']),
					Z('I have never eaten (it)', '我没吃过', 'wǒ méi chīguo'),
					H('你去过中国吗', 'nǐ qùguo Zhōngguó ma', 'Have you been to China?')
				]
			},
			{
				id: 'zh-fut-1', title: '要, 会, 想, 能, 可以', sub: 'Will, want and three kinds of can',
				steps: [
					I('The future needs no tense', 'A time word is enough: 我明天去。<br>Or add a helper before the verb:<br><b>要</b> yào = going to, want to (firm)<br><b>会</b> huì = will (prediction)<br><b>想</b> xiǎng = would like to', '我明天去。我要去。会下雨。我想去。'),
					Z('I want to go (firm)', '我要去', 'wǒ yào qù'),
					C('明天会下雨 means', 'It will rain tomorrow', ['It wants to rain tomorrow', 'It may be allowed to rain', 'It rained']),
					I('Three kinds of "can"', '<b>会</b> huì = know how (a learned skill): 我会说中文。<br><b>能</b> néng = able to (circumstances): 我今天不能来。<br><b>可以</b> kěyǐ = allowed to: 这儿可以拍照吗？', '我会说中文。我今天不能来。这儿可以拍照吗？'),
					C('我___游泳 (I know how to swim)', '会', ['是', '在', '过']),
					C('"May I sit here?" uses', '可以', ['会', '想', '要是']),
					Z('I can speak Chinese (Chinese = 中文 Zhōngwén)', '我会说中文', 'wǒ huì shuō Zhōngwén'),
					I('Negatives', '不要 = do not! (a command): 不要走。<br>不想 = do not feel like<br>不会 = cannot (never learned), or will not<br>不用 búyòng = no need: 不用谢。', '不要走。不用谢。'),
					C('不用谢 means', 'No need to thank me', ['Do not thank me!', 'I cannot thank you', 'Thanks are not allowed']),
					Z('I cannot come today', '我今天不能来', 'wǒ jīntiān bù néng lái'),
					H('我想喝水', 'wǒ xiǎng hē shuǐ', 'I would like to drink water'),
					C('别走 means the same as', '不要走', ['不会走', '不能走了', '没走'], '别 bié = 不要.')
				]
			}
		]
	},
	{
		title: 'Building sentences',
		sub: 'Particles, comparisons and the famous 把',
		lessons: [
			{
				id: 'zh-de-1', title: '的, 得, 地', sub: 'Three particles with one sound',
				steps: [
					I('Three particles, one sound', 'All pronounced <b>de</b>.<br><b>的</b> links a description to a noun: 我<b>的</b>书 my book, 红<b>的</b>车 the red car<br><b>得</b> follows a verb to say how well: 说<b>得</b>很好<br><b>地</b> turns an adjective into an adverb: 慢慢<b>地</b>走', '我的书。说得很好。慢慢地走。'),
					Z('my friend', '我的朋友', 'wǒ de péngyou'),
					I('的 builds whole clauses', 'English puts "that" and "who" clauses after the noun. Chinese puts everything <b>before</b> it, joined by 的.<br>我昨天买<b>的</b>书 = the book that I bought yesterday<br>会说中文<b>的</b>人 = people who can speak Chinese', '我昨天买的书。会说中文的人。'),
					C('"the movie I watched" is', '我看的电影', ['电影我看的', '我的看电影', '看我电影的']),
					I('得: how it is done', 'Verb + 得 + result.<br>你说<b>得</b>很好。You speak very well.<br>With an object, repeat the verb: 你说中文说<b>得</b>很好。', '你说得很好。你说中文说得很好。'),
					Z('You speak very well', '你说得很好', 'nǐ shuō de hěn hǎo'),
					C('他跑___很快 (He runs fast)', '得', ['的', '地', '了']),
					C('我___手机 (my phone)', '的', ['得', '地', '个']),
					C('她高兴___笑了 (She smiled happily)', '地', ['的', '得', '着']),
					I('Dropping 的', 'For close relations, 的 is dropped: 我妈妈, 我朋友, 我们公司.<br>And 的 can stand alone: 这是我<b>的</b>。This is mine.', '我妈妈。这是我的。'),
					Z('This is mine', '这是我的', 'zhè shì wǒ de'),
					H('你做得很好', 'nǐ zuò de hěn hǎo', 'You did it well')
				]
			},
			{
				id: 'zh-comp-1', title: '比, 一样, 最', sub: 'More than, the same as, the most',
				steps: [
					I('A 比 B + adjective', '我<b>比</b>你高。I am taller than you.<br>Never add 很: 我比你很高 is wrong.<br>To say "much": 我比你高<b>得多</b>. "A bit": 高<b>一点儿</b>.', '我比你高。我比你高得多。'),
					Z('He is taller than me (tall = 高 gāo)', '他比我高', 'tā bǐ wǒ gāo'),
					C('Which is correct?', '今天比昨天冷', ['今天比昨天很冷', '今天冷比昨天', '今天比冷昨天']),
					I('Negative: 没有', 'A <b>没有</b> B + adjective = A is not as ... as B.<br>我<b>没有</b>你高。I am not as tall as you.', '我没有你高。'),
					Z('I am not as tall as you', '我没有你高', 'wǒ méiyǒu nǐ gāo'),
					I('Same and most', 'A <b>跟</b> B <b>一样</b> = the same: 我跟你一样。<br>A 跟 B 一样 + adjective: 他跟我一样高。<br><b>最</b> zuì = most: 最好 best, 最喜欢 like most.', '我跟你一样。他跟我一样高。最好。'),
					C('他跟我一样高 means', 'He is as tall as me', ['He is taller than me', 'He is tall, unlike me', 'He is standing with me']),
					Z('I like this one the most (like = 喜欢 xǐhuan, this one = 这个 zhège)', '我最喜欢这个', 'wǒ zuì xǐhuan zhège'),
					C('这个比那个贵___ (much more expensive)', '得多', ['很多的', '多了很', '太多的']),
					C('更 gèng in 这个更好 means', 'even more', ['not', 'the most', 'equally']),
					H('今天比昨天热', 'jīntiān bǐ zuótiān rè', 'Today is hotter than yesterday')
				]
			},
			{
				id: 'zh-res-1', title: 'Result and direction', sub: 'Verbs that carry their outcome',
				steps: [
					I('Verbs come with their result', 'Chinese states the action and its outcome as one unit.<br>听 listen + <b>懂</b> understand = <b>听懂</b> to understand by listening<br>看 + <b>完</b> finish = <b>看完</b> to finish reading<br>找 look for + <b>到</b> reach = <b>找到</b> to find', '听懂。看完。找到。'),
					C('我听懂了 means', 'I understood (what I heard)', ['I listened', 'I am listening carefully', 'I heard a noise']),
					Z('I finished reading (it)', '我看完了', 'wǒ kànwán le'),
					I('Not achieved: 没', '我<b>没</b>听懂。I did not understand.<br>我<b>没</b>找到。I did not find it.<br>The action happened, the result did not.', '我没听懂。我没找到。'),
					Z('I did not find (it)', '我没找到', 'wǒ méi zhǎodào'),
					I('Can and cannot: 得 or 不 in the middle', 'Insert <b>得</b> for "can", <b>不</b> for "cannot".<br>听<b>得</b>懂 can understand · 听<b>不</b>懂 cannot understand<br>看<b>不</b>见 cannot see · 买<b>不</b>起 cannot afford', '听得懂。听不懂。看不见。买不起。'),
					C('我听不懂 means', 'I cannot understand (what I hear)', ['I did not listen', 'I do not want to listen', 'I was not allowed to listen']),
					Z('I cannot understand (by listening)', '我听不懂', 'wǒ tīng bu dǒng'),
					I('Direction', '<b>来</b> lái = toward the speaker, <b>去</b> qù = away.<br>进<b>来</b> come in · 进<b>去</b> go in · 上<b>来</b> come up · 回<b>去</b> go back<br>拿<b>出来</b> take out · 站<b>起来</b> stand up', '进来。进去。回去。站起来。'),
					C('You are inside and invite someone in. You say', '进来', ['进去', '出去', '回去']),
					C('买不起 means', 'cannot afford', ['cannot buy today', 'did not buy', 'not worth buying']),
					H('你听得懂吗', 'nǐ tīng de dǒng ma', 'Can you understand?')
				]
			},
			{
				id: 'zh-ba-1', title: '把 and 被', sub: 'Doing things to things',
				steps: [
					I('把: do something to it', '<b>Subject + 把 + object + verb + result</b><br>我<b>把</b>书放在桌子上了。I put the book on the table.<br>Use it when a specific thing is moved or changed. The verb can never stand bare: it needs a result, 了, or a place.', '我把书放在桌子上了。'),
					C('"I finished the homework (作业)"', '我把作业做完了', ['我把作业做', '我做把作业完了', '把我作业做完']),
					Z('Close the door (door = 门 mén, close = 关上 guānshang)', '把门关上', 'bǎ mén guānshang'),
					I('Negatives go before 把', '我<b>没</b>把书带来。I did not bring the book.<br><b>别</b>把手机忘了。Do not forget your phone.', '我没把书带来。别把手机忘了。'),
					C('Where does 没 go?', '我没把钱带来', ['我把钱没带来', '我把没钱带来', '我把钱带没来']),
					I('被: it was done', '<b>Receiver + 被 + (doer) + verb + result</b><br>我的手机<b>被</b>偷了。My phone was stolen.<br>蛋糕<b>被</b>他吃完了。The cake was eaten up by him.<br>Traditionally for bad news, now used more widely.', '我的手机被偷了。蛋糕被他吃完了。'),
					C('我的自行车被偷了 means', 'My bike was stolen', ['I stole a bike', 'My bike is broken', 'I sold my bike']),
					Z('The cake was eaten by him (cake = 蛋糕 dàngāo)', '蛋糕被他吃了', 'dàngāo bèi tā chī le'),
					C('Which sentence needs 把?', '我___窗户打开了', ['我___是学生', '我___很忙', '我___去过北京']),
					C('In speech, 被 is often replaced by', '让 or 叫', ['把 or 给了', '得 or 地', '过 or 着']),
					H('请把门打开', 'qǐng bǎ mén dǎkāi', 'Please open the door')
				]
			}
		]
	},
	{
		title: 'Connecting ideas',
		sub: 'The pairs that hold long sentences together',
		lessons: [
			{
				id: 'zh-con-1', title: 'Pairs that travel together', sub: '因为…所以, 虽然…但是, 如果…就',
				steps: [
					I('Connectors come in pairs', 'Chinese likes to mark both halves.<br><b>因为</b>…<b>所以</b>… because ... so ...<br><b>虽然</b>…<b>但是</b>… although ... but ...<br><b>如果</b>…<b>就</b>… if ... then ...', '因为下雨，所以我没去。'),
					C('因为下雨，___我没去', '所以', ['但是', '就', '而且']),
					Z('but', '但是', 'dànshì'),
					I('如果…就', '<b>如果</b>你有时间，我们<b>就</b>去。If you have time, we will go.<br>就 goes after the subject, before the verb. Spoken short forms: <b>要是</b>…就… or just …<b>的话</b>.', '如果你有时间，我们就去。你去的话，我也去。'),
					C('如果下雨，___', '我就不去', ['就我不去', '我不去就', '我不就去']),
					Z('if', '如果', 'rúguǒ'),
					I('虽然…但是', '<b>虽然</b>很贵，<b>但是</b>很好吃。Although it is expensive, it is delicious.<br>English drops "but" after "although". Chinese keeps both.', '虽然很贵，但是很好吃。'),
					C('虽然他很忙，___他来了', '但是', ['所以', '就', '因为']),
					I('Sequence', '<b>先</b>…<b>然后</b>… first ... then ...<br><b>一</b>…<b>就</b>… as soon as: 我<b>一</b>到家<b>就</b>睡觉。<br><b>一边</b>…<b>一边</b>… while: 一边吃饭一边看电视。', '我一到家就睡觉。一边吃饭一边看电视。'),
					C('我一到家就睡觉 means', 'As soon as I get home I sleep', ['I sleep once at home', 'I get home at one and sleep', 'I only sleep at home']),
					Z('because', '因为', 'yīnwèi'),
					H('虽然很累，但是很开心', 'suīrán hěn lèi, dànshì hěn kāixīn', 'Tired but happy')
				]
			},
			{
				id: 'zh-con-2', title: '连…都, 越…越, 除了', sub: 'Even, the more the more, except',
				steps: [
					I('连…都: even', '<b>连</b>他<b>都</b>不知道。Even he does not know.<br><b>连</b>一块钱<b>都</b>没有。Not even one yuan.', '连他都不知道。'),
					C('连小孩子都会 means', 'Even small children can do it', ['Only children can do it', 'The children all gather', 'Children want to as well']),
					I('越…越: the more, the more', '<b>越</b>吃<b>越</b>胖。The more you eat, the fatter you get.<br><b>越来越</b> + adjective = more and more: 越来越冷。', '越吃越胖。越来越冷。'),
					Z('more and more', '越来越', 'yuè lái yuè'),
					C('中文越学越有意思 means', 'The more you study Chinese, the more interesting it gets', ['Chinese is too interesting to study', 'Study more Chinese', 'Chinese is more interesting than studying']),
					I('除了…以外', '<b>除了</b>他<b>以外</b>，大家<b>都</b>来了。Everyone came except him.<br><b>除了</b>中文<b>以外</b>，我<b>还</b>会说法语。Besides Chinese, I also speak French.<br>With 都 it means except. With 还 or 也 it means in addition.', '除了他以外，大家都来了。'),
					C('除了咖啡以外，我还喝茶 means', 'Besides coffee, I also drink tea', ['I drink tea, not coffee', 'Except for coffee I drink nothing', 'I only drink coffee']),
					I('不但…而且', '<b>不但</b>便宜，<b>而且</b>好吃。Not only cheap but also tasty.<br><b>只要</b>…<b>就</b>… as long as · <b>只有</b>…<b>才</b>… only if · <b>无论</b>…<b>都</b>… no matter', '不但便宜，而且好吃。只要你来，我就高兴。'),
					C('只要你来，我就高兴 means', 'As long as you come, I am happy', ['I am only happy when you leave', 'I want only you to come', 'You only come when I am happy']),
					C('不但便宜，___好吃', '而且', ['但是', '所以', '就是']),
					Z('not only', '不但', 'búdàn'),
					H('越来越好', 'yuè lái yuè hǎo', 'Better and better')
				]
			}
		]
	},
	{
		title: 'Sounding real',
		sub: 'Fillers, regional speech, idioms and the written register',
		lessons: [
			{
				id: 'zh-conv-1', title: 'Fillers and reactions', sub: 'What people actually say between sentences',
				steps: [
					I('Buying time', '<b>那个</b> nèige = um (literally "that")<br><b>就是</b> jiùshì = I mean, like<br><b>怎么说呢</b> = how shall I put it<br><b>然后</b> ránhòu = and then (the universal connector)', '那个。就是。怎么说呢。然后。'),
					C('Someone keeps saying "那个…那个…". They are', 'looking for words, like "um"', ['pointing at something', 'disagreeing', 'counting']),
					I('Reacting', '<b>真的假的？</b> Seriously?<br><b>对对对</b> right, right<br><b>是吗？</b> Oh really?<br><b>不会吧！</b> No way!<br><b>哎呀</b> āiyā = oh no, oh dear', '真的假的？对对对。是吗？不会吧！哎呀。'),
					C('不会吧！means', 'No way!', ['I cannot', 'It will not happen', 'Do not do that']),
					Z('Seriously? (real or fake?)', '真的假的', 'zhēn de jiǎ de'),
					I('Lukewarm answers', '<b>还行</b> hái xíng = it is OK<br><b>还可以</b> = not bad<br><b>差不多</b> chàbuduō = more or less<br><b>马马虎虎</b> = so-so<br><b>随便</b> suíbiàn = whatever, up to you', '还行。还可以。差不多。随便。'),
					C('"你想吃什么？" "随便。" The answer means', 'Anything is fine', ['I am not hungry', 'Something cheap', 'Fast food']),
					Z('more or less', '差不多', 'chàbuduō'),
					I('Softening', '<b>吧</b> ba suggests: 走<b>吧</b>。Let us go.<br><b>一下</b> yíxià makes a request light: 等<b>一下</b>。Wait a sec.<br><b>有点儿</b> + adjective = a bit (complaining): 有点儿贵。<br><b>麻烦你</b> = sorry to trouble you', '走吧。等一下。有点儿贵。麻烦你。'),
					Z('Wait a moment', '等一下', 'děng yíxià'),
					C('有点儿贵 means', 'It is a bit expensive', ['It has expensive things', 'It is not expensive at all', 'It is very cheap']),
					H('走吧', 'zǒu ba', 'Let us go')
				]
			},
			{
				id: 'zh-bj-1', title: 'North and south', sub: 'The Beijing r, southern accents and Taiwan',
				steps: [
					I('The Beijing r', 'Northerners add <b>儿</b> -r to many words.<br>一点<b>儿</b> yìdiǎnr · 这<b>儿</b> zhèr here · 哪<b>儿</b> nǎr where · 玩<b>儿</b> wánr to play<br>In the south and in Taiwan: 一点, 这里 zhèlǐ, 哪里 nǎlǐ.', '一点儿。这儿。哪儿。玩儿。这里。哪里。'),
					C('The southern equivalent of 哪儿 is', '哪里', ['那儿', '哪个', '这里']),
					I('Northern slang', '<b>啥</b> shá = 什么 what<br><b>咋</b> zǎ = 怎么 how<br><b>贼</b> zéi + adjective = super (Northeast): 贼好<br><b>甭</b> béng = 不用 no need', '啥。咋。贼好。'),
					C('你干啥呢？means', 'What are you doing?', ['Why are you dry?', 'Who are you?', 'Are you done?']),
					I('Southern accent', 'Many southern speakers merge <b>zh, ch, sh</b> into <b>z, c, s</b>.<br>是 shì sounds like sì, 吃 chī like cī.<br>So 四 (four) and 十 (ten) can sound alike. Context saves you.', '四。十。四十四。'),
					C('A speaker says "wǒ sì Zōngguó rén". They mean', '我是中国人', ['我四中国人', '我死中国人', '我思中国']),
					I('Mainland and Taiwan words', 'taxi: 出租车 / 计程车<br>bicycle: 自行车 / 脚踏车<br>pineapple: 菠萝 / 凤梨<br>software: 软件 / 软体<br>Taiwan also writes traditional characters: 学 = 學, 国 = 國.', '出租车。计程车。自行车。脚踏车。'),
					C('學 is the traditional form of', '学', ['字', '觉', '写']),
					Z('here (northern, with r)', '这儿', 'zhèr'),
					Z('where (southern)', '哪里', 'nǎlǐ'),
					C('As a reply to a compliment, 哪里哪里 means', 'Not at all, you flatter me', ['Where? Where?', 'Here and there', 'Of course']),
					H('你去哪儿', 'nǐ qù nǎr', 'Where are you going?')
				]
			},
			{
				id: 'zh-idi-1', title: 'Four-character idioms', sub: 'Chengyu that get a reaction',
				steps: [
					I('Chengyu', 'Four characters, often with a story behind them. Natives use them constantly, and a learner who drops one gets a reaction.<br><b>马马虎虎</b> mǎmǎhūhū = so-so, careless (horse horse tiger tiger)<br><b>入乡随俗</b> rù xiāng suí sú = when in Rome<br><b>一举两得</b> yì jǔ liǎng dé = two birds with one stone', '马马虎虎。入乡随俗。一举两得。'),
					C('入乡随俗 means', 'When in Rome, do as the Romans do', ['Go back to your village', 'Country people are simple', 'Follow the crowd blindly']),
					Z('so-so (horse horse tiger tiger)', '马马虎虎', 'mǎmǎhūhū'),
					I('Warnings', '<b>半途而废</b> bàn tú ér fèi = to give up halfway<br><b>画蛇添足</b> huà shé tiān zú = to ruin by overdoing (drawing legs on a snake)<br><b>对牛弹琴</b> duì niú tán qín = to waste words on the wrong audience (playing the lute to a cow)', '半途而废。画蛇添足。对牛弹琴。'),
					C('画蛇添足 means', 'to spoil something by adding what is not needed', ['to be very creative', 'to draw badly', 'to finish quickly']),
					C('"Explaining it to him is 对牛弹琴" means he', 'will not understand or care', ['loves music', 'is as strong as an ox', 'already knows it']),
					I('Praise', '<b>一见钟情</b> yí jiàn zhōng qíng = love at first sight<br><b>名不虚传</b> míng bù xū chuán = lives up to its reputation<br><b>津津有味</b> jīnjīn yǒu wèi = with great relish', '一见钟情。名不虚传。津津有味。'),
					C('The food is famous and you agree. You say', '名不虚传', ['半途而废', '马马虎虎', '对牛弹琴']),
					Z('love at first sight', '一见钟情', 'yí jiàn zhōng qíng'),
					I('Everyday sayings', '<b>不见不散</b> bú jiàn bú sàn = be there or be square<br><b>慢慢来</b> = take your time<br><b>加油</b> jiāyóu = go for it! (add oil)<br><b>辛苦了</b> xīnkǔ le = thanks for your hard work', '不见不散。慢慢来。加油。辛苦了。'),
					C('不见不散 is said when', 'fixing a meeting you both must keep', ['saying goodbye forever', 'you cannot see well', 'breaking up']),
					Z('Go for it! (add oil)', '加油', 'jiāyóu'),
					H('入乡随俗', 'rù xiāng suí sú', 'When in Rome')
				]
			},
			{
				id: 'zh-c2-1', title: 'The written register', sub: 'Words that make natives ask where you studied',
				steps: [
					I('Two vocabularies', 'Formal writing swaps everyday words for classical ones.<br>但是 becomes <b>然而</b> rán\'ér however<br>所以 becomes <b>因此</b> yīncǐ therefore<br>还没 becomes <b>尚未</b> shàngwèi not yet<br>和 becomes <b>与</b> or <b>及</b> and<br>要 becomes <b>将</b> jiāng will', '然而。因此。尚未。'),
					C('尚未 in speech would be', '还没', ['已经', '马上', '从来']),
					Z('therefore (formal)', '因此', 'yīncǐ'),
					I('Single-character formality', '<b>此</b> cǐ = 这 this · <b>何</b> hé = 什么 what · <b>无</b> wú = 没有<br><b>已</b> yǐ = 已经 already · <b>可</b> kě = 可以 · <b>应</b> yīng = 应该<br>On signs: 请<b>勿</b>吸烟 = please do not smoke (勿 wù = 别).', '此。何。无。请勿吸烟。'),
					C('请勿吸烟 means', 'Please do not smoke', ['Smoking area', 'Please smoke outside', 'No open fire']),
					C('无人 on a sign means', 'no one, unmanned', ['five people', 'free entry', 'lost and found']),
					I('Words that impress', '<b>不可思议</b> bùkě sīyì = unbelievable, beyond imagining<br><b>理所当然</b> lǐ suǒ dāngrán = it goes without saying<br><b>与众不同</b> yǔ zhòng bùtóng = out of the ordinary<br><b>莫名其妙</b> mòmíng qímiào = baffling, for no reason', '不可思议。理所当然。与众不同。莫名其妙。'),
					C('他莫名其妙地生气了 means', 'He got angry for no apparent reason', ['He was famously angry', 'He got wonderfully angry', 'He hid his anger']),
					Z('unbelievable', '不可思议', 'bùkě sīyì'),
					I('Hedging like an editorial', '<b>在某种程度上</b> = to a certain extent<br><b>总的来说</b> = on the whole<br><b>值得一提的是</b> = it is worth mentioning that<br><b>毋庸置疑</b> wúyōng zhìyí = beyond doubt', '在某种程度上。总的来说。值得一提的是。'),
					C('总的来说 means', 'on the whole', ['in total it costs', 'always saying', 'to say it again']),
					Z('however (formal)', '然而', "rán'ér"),
					H('理所当然', 'lǐ suǒ dāngrán', 'It goes without saying')
				]
			}
		]
	}
];

// Placement test: one band per CEFR level, easiest first. Stops at the first band not passed.
const PLACEMENT = [
	{ band: 'A1', steps: [
		C('你好 means', 'hello', ['thank you', 'goodbye', 'sorry']),
		Z('I am a student (student = 学生)', '我是学生', 'wǒ shì xuésheng'),
		C('他___老师 (He is not a teacher)', '不是', ['没是', '不有', '吗是']),
		C('三十五 is', '35', ['53', '315', '8'])
	] },
	{ band: 'A2', steps: [
		C('"I work in Beijing tomorrow" is', '我明天在北京工作', ['我工作在北京明天', '我在北京工作明天', '明天工作我在北京']),
		C('一___书 (a book)', '本', ['杯', '只', '张']),
		Z('I did not go', '我没去', 'wǒ méi qù'),
		C('我去过中国 means', 'I have been to China', ['I am going to China', 'I went to China and am still there', 'I want to go to China'])
	] },
	{ band: 'B1', steps: [
		C('他跑___很快 (He runs fast)', '得', ['的', '地', '了']),
		C('我___说中文 (I know how to speak Chinese)', '会', ['是', '在', '过']),
		C('Which is correct?', '今天比昨天冷', ['今天比昨天很冷', '今天冷比昨天', '今天比冷昨天']),
		Z('I cannot understand (by listening)', '我听不懂', 'wǒ tīng bu dǒng')
	] },
	{ band: 'B2', steps: [
		C('"I finished the homework" is', '我把作业做完了', ['我把作业做', '我做把作业完了', '把我作业做完']),
		C('我的手机___偷了 (My phone was stolen)', '被', ['把', '得', '着']),
		C('___下雨，我们___不去 (If it rains, we will not go)', '如果…就', ['虽然…所以', '因为…但是', '不但…才']),
		C('连他都不知道 means', 'Even he does not know', ['He knows everything', 'Only he does not know', 'He and I both do not know'])
	] },
	{ band: 'C1', steps: [
		C('画蛇添足 means', 'to spoil something by adding what is not needed', ['to be very creative', 'to finish quickly', 'to copy someone']),
		C('尚未 means', 'not yet', ['already', 'still', 'never again']),
		C('他莫名其妙地生气了 means', 'He got angry for no apparent reason', ['He was famously angry', 'He got wonderfully angry', 'He hid his anger']),
		C('除了他以外，大家都来了 means', 'Everyone came except him', ['He came with everyone', 'Only he came', 'Besides him, nobody came'])
	] }
];

// Starter word bank: [word, meaning, pinyin, example, example in English]
const SEED = [
	['你好', 'hello', 'nǐ hǎo', '你好，我是安娜。', 'Hello, I am Anna.'],
	['谢谢', 'thank you', 'xièxie', '谢谢你的帮助。', 'Thank you for your help.'],
	['不客气', "you're welcome", 'bú kèqi', '不客气，小事。', "You're welcome, it's nothing."],
	['对不起', 'sorry', 'duìbuqǐ', '对不起，我来晚了。', 'Sorry, I am late.'],
	['没关系', "it's fine, no problem", 'méi guānxi', '没关系，慢慢来。', "It's fine, take your time."],
	['不好意思', 'excuse me; I feel embarrassed', 'bù hǎoyìsi', '不好意思，请问一下。', 'Excuse me, may I ask something.'],
	['朋友', 'friend', 'péngyou', '他是我最好的朋友。', 'He is my best friend.'],
	['喜欢', 'to like', 'xǐhuan', '我喜欢喝茶。', 'I like drinking tea.'],
	['觉得', 'to think, to feel that', 'juéde', '我觉得很好。', 'I think it is good.'],
	['知道', 'to know (a fact)', 'zhīdào', '我不知道。', 'I do not know.'],
	['明白', 'to understand, to get it', 'míngbai', '你明白了吗？', 'Do you get it now?'],
	['可以', 'may, to be allowed', 'kěyǐ', '这儿可以坐吗？', 'May I sit here?'],
	['应该', 'should', 'yīnggāi', '你应该早点儿睡。', 'You should sleep earlier.'],
	['一起', 'together', 'yìqǐ', '我们一起去吧。', "Let's go together."],
	['已经', 'already', 'yǐjīng', '我已经吃了。', 'I have already eaten.'],
	['还是', 'or (in questions); still', 'háishi', '你喝茶还是咖啡？', 'Tea or coffee?'],
	['或者', 'or (in statements)', 'huòzhě', '今天或者明天都行。', 'Today or tomorrow, either works.'],
	['有意思', 'interesting, fun', 'yǒu yìsi', '这本书很有意思。', 'This book is very interesting.'],
	['麻烦', 'trouble; troublesome', 'máfan', '太麻烦了。', 'Too much hassle.'],
	['厉害', 'awesome, impressive', 'lìhai', '你太厉害了！', 'You are amazing!'],
	['马上', 'right away', 'mǎshàng', '我马上到。', 'I will be there right away.'],
	['其实', 'actually', 'qíshí', '其实我不太饿。', 'Actually I am not that hungry.'],
	['到底', 'in the end; on earth', 'dàodǐ', '你到底想说什么？', 'What on earth are you trying to say?'],
	['居然', 'unexpectedly, of all things', 'jūrán', '他居然忘了。', 'He forgot, of all things.'],
	['难怪', 'no wonder', 'nánguài', '难怪你这么累。', 'No wonder you are so tired.'],
	['差不多', 'more or less', 'chàbuduō', '我们差不多高。', 'We are about the same height.'],
	['随便', 'whatever, up to you', 'suíbiàn', '吃什么都行，随便。', 'Anything is fine, up to you.'],
	['没办法', 'nothing can be done', 'méi bànfǎ', '没办法，只能等。', 'Nothing to be done, we can only wait.'],
	['加油', 'go for it! keep it up', 'jiāyóu', '明天考试，加油！', 'Exam tomorrow, go for it!'],
	['辛苦了', 'thanks for your hard work', 'xīnkǔ le', '大家辛苦了。', 'Thank you all for your hard work.'],
	['靠谱', 'reliable, legit', 'kàopǔ', '这个人很靠谱。', 'This person is very reliable.'],
	['缘分', 'the fate that brings people together', 'yuánfèn', '我们很有缘分。', 'We were meant to meet.'],
	['撒娇', 'to act cute to get your way', 'sājiāo', '她又在撒娇。', 'She is acting cute again.'],
	['入乡随俗', 'when in Rome, do as the Romans do', 'rù xiāng suí sú', '入乡随俗，我也用筷子。', 'When in Rome: I use chopsticks too.'],
	['马马虎虎', 'so-so; careless', 'mǎmǎhūhū', '我的中文马马虎虎。', 'My Chinese is so-so.'],
	['一举两得', 'to kill two birds with one stone', 'yì jǔ liǎng dé', '走路上班一举两得。', 'Walking to work kills two birds with one stone.'],
	['莫名其妙', 'baffling, for no reason', 'mòmíng qímiào', '他莫名其妙地笑了。', 'He laughed for no reason.'],
	['不可思议', 'unbelievable', 'bùkě sīyì', '这个故事不可思议。', 'This story is unbelievable.']
].map(([pt, en, say, ex, exEn]) => ({ pt, en, say, ex, exEn }));

// ---------- drills ----------
// fill the blank: prompt with ___, the answer, three wrong options, an English gloss
const F = (prompt, answer, options, sub, explain) => ({ prompt, answer, options, sub, explain, speak: prompt.replace(/_+/, answer) });
// pick the right tones for a word
// audio: the learner can play the word before choosing, so the ear does the work
const N = (zh, en, answer, options) => ({ prompt: zh, sub: en, answer, options, speak: zh, audio: true });

const DRILLS = {
	tones: { name: 'Tones', items: [
		N('你好', 'hello', 'nǐ hǎo', ['ní hào', 'nī hǎo', 'nì hāo']),
		N('谢谢', 'thank you', 'xièxie', ['xiēxie', 'xiéxiè', 'xiěxie']),
		N('中国', 'China', 'Zhōngguó', ['Zhòngguǒ', 'Zhǒngguó', 'Zhōngguò']),
		N('朋友', 'friend', 'péngyou', ['pèngyou', 'pēngyǒu', 'pěngyòu']),
		N('老师', 'teacher', 'lǎoshī', ['láoshì', 'lāoshí', 'làoshǐ']),
		N('学生', 'student', 'xuésheng', ['xuěshēng', 'xuèshéng', 'xuēshěng']),
		N('明天', 'tomorrow', 'míngtiān', ['mǐngtiàn', 'mìngtián', 'mīngtiǎn']),
		N('喜欢', 'to like', 'xǐhuan', ['xīhuán', 'xíhuàn', 'xìhuǎn']),
		N('漂亮', 'pretty', 'piàoliang', ['piāoliáng', 'piáoliǎng', 'piǎoliāng']),
		N('再见', 'goodbye', 'zàijiàn', ['zāijiān', 'zǎijiàn', 'zàijiǎn']),
		N('对不起', 'sorry', 'duìbuqǐ', ['duíbùqì', 'duībuqí', 'duǐbùqī']),
		N('买', 'to buy', 'mǎi', ['mài', 'mái', 'māi'], ),
		N('卖', 'to sell', 'mài', ['mǎi', 'mái', 'māi']),
		N('汤', 'soup', 'tāng', ['táng', 'tǎng', 'tàng']),
		N('糖', 'sugar', 'táng', ['tāng', 'tǎng', 'tàng']),
		N('睡觉', 'to sleep', 'shuìjiào', ['shuǐjiǎo', 'shuījiāo', 'shuíjiáo'])
	] },
	measure: { name: 'Measure words', items: [
		F('一___书', '本', ['杯', '只', '张'], 'a book'),
		F('一___水', '杯', ['本', '条', '张'], 'a glass of water'),
		F('一___桌子', '张', ['本', '只', '双'], 'a table', '张 is for flat things: tables, tickets, paper.'),
		F('一___猫', '只', ['条', '张', '辆'], 'a cat', '只 is for most animals.'),
		F('一___鱼', '条', ['只', '本', '件'], 'a fish', '条 is for long thin things: fish, roads, trousers.'),
		F('一___衣服', '件', ['条', '张', '本'], 'a piece of clothing'),
		F('一___车', '辆', ['只', '张', '条'], 'a car'),
		F('一___老师', '位', ['只', '条', '本'], 'a teacher (polite)', '位 is the respectful measure word for people.'),
		F('一___鞋', '双', ['件', '只是', '张'], 'a pair of shoes'),
		F('一___啤酒', '瓶', ['本', '张', '件'], 'a bottle of beer'),
		F('一___公司', '家', ['只', '条', '位'], 'a company', '家 is for businesses and restaurants.'),
		F('五___钱', '块', ['本', '只', '位'], 'five yuan'),
		F('一___椅子', '把', ['条', '本', '只'], 'a chair', '把 is for things with a handle: chairs, umbrellas, knives.'),
		F('一___电脑', '台', ['只', '条', '本'], 'a computer', '台 is for machines.'),
		F('一___裤子', '条', ['件', '双', '张'], 'a pair of trousers'),
		F('一___票', '张', ['本', '条', '只'], 'a ticket')
	] },
	particles: { name: 'Particles', items: [
		F('我吃___。', '了', ['过了的', '着', '得'], 'I have eaten.'),
		F('我去___中国。', '过', ['着', '得', '地'], 'I have been to China (at some point).'),
		F('门开___。', '着', ['过', '得', '吗'], 'The door is open.'),
		F('这是我___书。', '的', ['得', '地', '了'], 'This is my book.'),
		F('你说___很好。', '得', ['的', '地', '着'], 'You speak very well.'),
		F('他慢慢___走。', '地', ['的', '得', '了'], 'He walks slowly.'),
		F('你是学生___？', '吗', ['呢', '吧', '了'], 'Are you a student?'),
		F('我很好，你___？', '呢', ['吗', '了', '的'], 'I am fine, and you?', '呢 bounces the question back.'),
		F('我们走___。', '吧', ['吗', '的', '过'], "Let's go.", '吧 makes a suggestion.'),
		F('我___吃饭。', '在', ['着', '过', '得'], 'I am eating (right now).'),
		F('我___去。', '没', ['不了', '别了', '没了'], 'I did not go.'),
		F('下雨___。', '了', ['过', '着', '的'], 'It has started raining.'),
		F('我___把书带来。', '没', ['不是', '别了', '得'], 'I did not bring the book.'),
		F('我的手机___偷了。', '被', ['把', '得', '着'], 'My phone was stolen.'),
		F('请___门关上。', '把', ['被', '得', '在'], 'Please close the door.'),
		F('他比我高___多。', '得', ['的', '地', '很'], 'He is much taller than me.')
	] },
	order: { name: 'Word order', items: [
		{ prompt: 'I work at home tomorrow.', answer: '我明天在家工作', options: ['我工作在家明天', '我在家工作明天', '明天工作我在家'] },
		{ prompt: 'Where are you going?', answer: '你去哪儿', options: ['哪儿你去', '你哪儿去吗', '去哪儿你'] },
		{ prompt: 'the book I bought yesterday', answer: '我昨天买的书', options: ['书我昨天买的', '我的昨天买书', '昨天书我买的'] },
		{ prompt: 'I eat with friends at a restaurant.', answer: '我跟朋友在饭馆吃饭', options: ['我吃饭跟朋友在饭馆', '我在饭馆吃饭跟朋友', '跟朋友我吃饭在饭馆'] },
		{ prompt: 'He speaks Chinese very well.', answer: '他说中文说得很好', options: ['他说得中文很好', '他很好说中文得', '他说中文得很好说'] },
		{ prompt: 'I studied Chinese for two years.', answer: '我学了两年中文', options: ['我两年学了中文', '我学了中文两年的', '两年我中文学了'] },
		{ prompt: 'I gave him a book.', answer: '我给了他一本书', options: ['我给了一本书他', '我一本书给了他', '我给他了一书本'] },
		{ prompt: 'Why did you not come?', answer: '你为什么没来', options: ['为什么你没来了', '你没来为什么吗', '你没为什么来'] },
		{ prompt: 'I am taller than my brother.', answer: '我比我弟弟高', options: ['我高比我弟弟', '我比高我弟弟', '我比我弟弟很高'] },
		{ prompt: 'I have not finished reading it yet.', answer: '我还没看完', options: ['我没还看完', '我还看没完', '我看完还没了'] }
	] },
	comp: { name: 'Complements', items: [
		F('我听___了。', '懂', ['完了', '到的', '见过'], 'I understood (what I heard).'),
		F('我看___了。', '完', ['懂得', '到过', '起'], 'I finished reading.'),
		F('我找___了。', '到', ['完', '懂', '起'], 'I found it.'),
		F('我听不___。', '懂', ['完了', '到了', '起了'], 'I cannot understand.'),
		F('太贵了，我买不___。', '起', ['懂', '见', '完'], 'Too expensive, I cannot afford it.'),
		F('太远了，我看不___。', '见', ['起', '懂', '完'], 'Too far, I cannot see it.'),
		F('请进___。', '来', ['去', '上', '下'], 'Please come in (speaker is inside).'),
		F('他回___了。', '去', ['来', '上', '起'], 'He went back (away from here).'),
		F('请站___。', '起来', ['出去', '下来', '进去'], 'Please stand up.'),
		F('我记___了。', '住', ['完', '见', '起'], 'I have memorised it.', '住 = to fix in place: 记住 remember, 站住 stop.'),
		F('我吃___了。', '饱', ['懂', '见', '到'], 'I am full.'),
		F('你说___了。', '对', ['完的', '起', '住'], 'You said it right.'),
		F('菜太多了，我们吃不___。', '完', ['起', '见', '懂'], 'Too much food, we cannot finish it.'),
		F('我想___了！', '起来', ['出去', '进来', '上去'], 'I remember now!', '想起来 = to recall.')
	] },
	connect: { name: 'Connectors', items: [
		F('因为下雨，___我没去。', '所以', ['但是', '而且', '就是'], 'Because it rained, I did not go.'),
		F('虽然很贵，___很好吃。', '但是', ['所以', '因为', '就'], 'Although expensive, it is delicious.'),
		F('如果你去，我___去。', '就', ['才', '都', '还'], 'If you go, I will go.'),
		F('不但便宜，___好吃。', '而且', ['但是', '所以', '因为'], 'Not only cheap but also tasty.'),
		F('___他都不知道。', '连', ['越', '除了', '只要'], 'Even he does not know.'),
		F('中文___学___有意思。', '越…越', ['连…都', '先…然后', '不但…而且'], 'The more you study Chinese, the more interesting it gets.'),
		F('___他以外，大家都来了。', '除了', ['连', '只要', '如果'], 'Everyone came except him.'),
		F('我一到家___睡觉。', '就', ['才', '还', '都'], 'As soon as I get home I sleep.'),
		F('只有努力，___能成功。', '才', ['就', '都', '也'], 'Only with effort can you succeed.', '只有…才 = only if. 只要…就 = as long as.'),
		F('只要你来，我___高兴。', '就', ['才', '却', '而'], 'As long as you come, I am happy.'),
		F('无论多忙，他___来。', '都', ['才', '就', '却'], 'No matter how busy, he comes.'),
		F('先吃饭，___看电影。', '然后', ['所以', '虽然', '因为'], 'First eat, then watch a movie.'),
		F('他很忙，___他还是来了。', '然而', ['因此', '而且', '于是'], 'He is busy; however, he still came.'),
		F('他病了，___没来上班。', '因此', ['然而', '虽然', '无论'], 'He was ill, therefore he did not come to work.')
	] }
};

const ALL = Object.keys(DRILLS);

// Tone pairs by ear: hear a two-syllable word, pick its two tones. Built from the starter words, so it
// grows with the list. Added after ALL on purpose: checkpoint tests must not depend on audio.
const WORDS = withMore(SEED, MORE, SEED_POS);
const TONE = ['neutral', '1st', '2nd', '3rd', '4th'];
const pairName = (a, b) => `${TONE[a]} + ${TONE[b]}`;
const EVERY = [1, 2, 3, 4].flatMap((a) => [0, 1, 2, 3, 4].map((b) => [a, b]));
DRILLS.pairs = {
	name: 'Tone pairs (listening)',
	wt: 0.06, // many items: keep them from crowding the other drills out of the daily quiz
	audio: true, // left out of the daily quiz when listening questions are switched off
	items: WORDS.filter((w) => [...w.pt].length === 2 && !/[一不]/.test(w.pt) && syllables(w.say).length === 2 && toneOf(syllables(w.say)[0])).map((w, n) => {
		const [x, y] = syllables(w.say).map(toneOf);
		const a = x === 3 && y === 3 ? 2 : x; // two third tones in a row: the first is said as a second tone
		const others = EVERY.filter(([p, q]) => p !== a || q !== y);
		const wrong = [0, 1, 2].map((i) => others[(n * 7 + i * 6 + i * i) % others.length]);
		return {
			prompt: 'Which two tones do you hear?', sub: 'Listen as often as you like.', speak: w.pt, audio: true, autoplay: true,
			answer: pairName(a, y), options: [...new Set(wrong.map(([p, q]) => pairName(p, q)))],
			explain: `${w.pt}  ${w.say}  = ${w.en}` + (a !== x ? '. Written with two third tones, but the first one is said as a second tone.' : '')
		};
	})
};

export default {
	code: 'zh',
	syn: SYN,
	units: [...UNITS, ...UNITS5, ...UNITS6],
	seed: withMore(SEED, MORE, SEED_POS),
	placement: PLACEMENT,
	keys: 'āáǎàēéěèīíǐìōóǒòūúǔùǚǜ', // pinyin tone marks
	levels: [[0, 'Lǎowài 老外'], [150, 'Yóukè 游客'], [500, 'Liúxuéshēng 留学生'], [1200, 'Zhōngguótōng 中国通'], [2500, 'Bàn ge Zhōngguórén'], [5000, 'Mǔyǔ shuǐpíng 母语水平']],
	// [id, title, what you can do (with the matching HSK level), lessons, drill groups in the checkpoint test]
	stages: [
		['A1.1', 'First sounds', 'Say hello with the right tones (HSK 1)', ['zh-sons-1', 'zh-base-1'], ['tones']],
		['A1.2', 'Counting', 'Read pinyin and count things (HSK 1)', ['zh-sons-2', 'zh-base-2'], ['tones', 'measure']],
		['A2.1', 'Word order', 'Say when and where things happen (HSK 2)', ['zh-base-3', 'zh-char-1'], ['measure', 'order']],
		['A2.2', 'Done and changed', 'Talk about what happened with 了 and 过 (HSK 2)', ['zh-le-1', 'zh-guo-1'], ['particles', 'order']],
		['B1.1', 'Can and will', 'Make plans and describe how things are done (HSK 3)', ['zh-fut-1', 'zh-de-1'], ['particles', 'measure']],
		['B1.2', 'Real conversation', 'Compare, react and keep a chat going (HSK 3)', ['zh-comp-1', 'zh-conv-1'], ['particles', 'order']],
		['B2.1', 'Results', 'Use complements, 把 and 被 (HSK 4)', ['zh-res-1', 'zh-ba-1'], ['comp', 'particles']],
		['B2.2', 'Long sentences', 'Link ideas with paired connectors (HSK 4)', ['zh-con-1'], ['connect', 'comp']],
		['B2.3', 'Every structure', 'Switch between structures mid-sentence (HSK 5)', ['zh-con-2', 'zh-bj-1', 'zh-h5-1', 'zh-h5-2', 'zh-h5-3'], ALL],
		['C1.1', 'Idioms', 'Catch chengyu and regional speech (HSK 5)', ['zh-idi-1', 'zh-h5-4', 'zh-h5-5', 'zh-h5-6'], ALL],
		['C1.2', 'Written Chinese', 'Read formal text and news (HSK 6)', ['zh-c2-1', 'zh-h6-1', 'zh-h6-2', 'zh-h6-3'], ALL],
		['C1.3', 'Almost there', 'Argue, joke and tell stories at speed (HSK 6)', ['zh-h6-4', 'zh-h6-5', 'zh-h6-6'], ALL],
		['C2.1', 'Mastery', 'Surprise natives with your word choice (HSK 7 to 9)', [], ALL],
		['C2.2', 'Near native', 'Hold your own anywhere, on anything (HSK 7 to 9)', [], ALL]
	],
	writing: {
		B: [
			['你上个周末做了什么？', 'What did you do last weekend? 2 or 3 sentences. Characters or pinyin.'],
			['你去过哪些地方？最喜欢哪儿？', 'Where have you been, and which place do you like most? Use 过.'],
			['如果你有很多钱，你会做什么？', 'If you had a lot of money, what would you do? Use 如果…就.'],
			['介绍一下你最好的朋友。', 'Introduce your best friend. 2 or 3 sentences.'],
			['你觉得学中文难吗？为什么？', 'Do you find Chinese hard? Why? Use 因为…所以.']
		],
		C: [
			['你同意"在家工作比在办公室好"吗？请说明理由。', 'Agree or disagree: working from home beats the office. 3 or 4 sentences, with connectors.'],
			['讲一件你遇到的麻烦事，以及你是怎么解决的。', 'Tell about a problem you ran into and how you solved it. Use 把 at least once.'],
			['用一个成语描述你最近的生活，并解释原因。', 'Describe your recent life with one chengyu and explain why.'],
			['科技让我们的生活更好了吗？', 'Has technology made life better? 3 or 4 sentences, with 虽然…但是 or 不但…而且.'],
			['如果你出生在中国，你的生活会有什么不同？', 'If you had been born in China, how would your life differ? 3 or 4 sentences.']
		]
	},
	chat: {
		who: 'Lin, from Beijing. She fixes your Chinese as you go.',
		hint: 'Say hi. Try: 你好，林！ (pinyin works too: ni hao)',
		placeholder: '用中文写... (or pinyin)',
		scenes: ['Free chat', 'Ordering at a restaurant', 'Asking the way', 'Meeting someone new', 'Job interview']
	},
	drill: tableDrill(DRILLS),
	ui: {
		right: '对了！', perfect: '太棒了！', good: '不错！', almost: '加油！', welcome: '欢迎',
		hello: ['早上好', '下午好', '晚上好'],
		placeholder: '汉字 or pinyin (ni3 hao3 works)...', write: '用中文写... (characters or pinyin)',
		typeLabel: 'Type it in Chinese (characters or pinyin)', sayLabel: 'Say it in Chinese (characters or pinyin)',
		near: 'Right, but check the tone marks.',
		drill: 'Drills', drillSub: 'Tones, measure words, particles',
		drillQ: 'What do you want to drill?',
		drillBlurb: 'Ten quick questions on the parts of Mandarin that trip people up. Missed ones come back at the end.'
	}
};
