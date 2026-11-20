// HSK 5 lessons for the Mandarin course.
import { I, C, T, L } from './kit.js';
const Z = (prompt, zh, py, explain) => T(prompt, zh, `${zh} = ${py}${explain ? '. ' + explain : ''}`, [py]);
const H = (zh, py, en) => L(zh, `${py} = ${en}`, [py]);
export const UNITS5 = [
	{
		title: 'HSK 5: Fine control',
		sub: 'Can and cannot, making things happen, adverbs with attitude',
		lessons: [
			{
				id: 'zh-h5-1', title: 'Can, cannot, cannot afford', sub: 'V得了, V不起, V不下去 and friends',
				steps: [
					I('了 that is not le', 'You know 听<b>得</b>懂 and 听<b>不</b>懂: 得 or 不 between a verb and its result means can or cannot. HSK 5 adds a set of fixed endings.<br><b>V得了 / V不了</b> = able or unable to do it, or to finish it. Here 了 is read <b>liǎo</b>.<br>我明天去<b>不了</b>。I cannot make it tomorrow.<br>这么多菜，我们吃<b>不了</b>。We cannot finish this much food.', '我明天去不了。这么多菜，我们吃不了。'),
					C('In 我去不了, 了 is pronounced', 'liǎo', ['le', 'liào', 'lē'], 'As a potential ending, 了 is liǎo.'),
					Z('I cannot make it (cannot go)', '我去不了', 'wǒ qù bu liǎo'),
					I('不起: cannot afford', '<b>买不起</b> cannot afford to buy · <b>吃不起</b> cannot afford to eat there<br>这儿的房子我<b>买不起</b>。I cannot afford a home here.<br><b>看不起</b> = to look down on. And 对不起 is the same pattern: "cannot face you".<br>Time works like money: <b>来不及</b> = not enough time, <b>来得及</b> = still in time.', '这儿的房子我买不起。别看不起他。现在去还来得及。'),
					C('这家饭店太贵了，我们___', '吃不起', ['吃不了', '吃不下', '吃不到'], 'Money is the problem, so 不起.'),
					C('现在去还来得及 means', 'If we go now we can still make it', ['It is too late to go now', 'He has come and gone', 'We came here in time']),
					I('下去, 动, 着', '<b>V不下去</b> = cannot go on: 这本书太无聊，我看<b>不下去</b>了。<br><b>V不动</b> = no strength left to move: 我走<b>不动</b>了。这个箱子我搬<b>不动</b>。<br><b>V不着</b> (zháo) = the action misses its goal: 睡<b>不着</b> cannot fall asleep · 找<b>不着</b> cannot find', '这本书太无聊，我看不下去了。我走不动了。我昨晚睡不着。'),
					C('我走不动了 means', 'I am too tired to walk any further', ['I am not allowed to walk', 'I did not move', 'I walk without moving']),
					Z('I cannot fall asleep', '我睡不着', 'wǒ shuì bu zháo', '着 is zháo here, not zhe'),
					I('Four to memorise whole', '<b>舍不得</b> shěbude = cannot bear to (part with, spend, throw away): 我<b>舍不得</b>扔。<br><b>受不了</b> shòu bu liǎo = cannot stand: 太热了，我<b>受不了</b>。<br><b>怪不得</b> guàibude = no wonder: <b>怪不得</b>他没来，原来他病了。<br><b>忍不住</b> rěn bu zhù = cannot help: 我<b>忍不住</b>笑了。', '我舍不得扔。太热了，我受不了。怪不得他没来，原来他病了。我忍不住笑了。'),
					C('怪不得你这么累，原来你昨晚没睡 means', 'No wonder you are so tired: you did not sleep last night', ['Do not blame yourself for being tired', 'It is strange that you are tired', 'You cannot be tired, you slept']),
					C('It is a gift from your grandmother and you cannot bear to throw it out. You say', '我舍不得扔', ['我扔不动', '我扔不起', '我来不及扔']),
					H('太热了，我受不了', 'tài rè le, wǒ shòu bu liǎo', 'It is too hot, I cannot stand it'),
					Z('I could not help laughing', '我忍不住笑了', 'wǒ rěn bu zhù xiào le')
				]
			},
			{
				id: 'zh-h5-2', title: 'Making things happen', sub: '让, 叫, 使, 令 and the fancier 把 and 被',
				steps: [
					I('Four ways to say "make"', '<b>让</b> ràng and <b>叫</b> jiào are spoken: let, tell, make someone do something.<br>妈妈<b>让</b>我早点回家。Mom told me to come home early.<br><b>使</b> shǐ and <b>令</b> lìng are written, and they cause a feeling or a state, not an errand.<br>这个消息<b>使</b>大家很高兴。The news made everyone happy.<br>这个结果<b>令</b>人失望。The result is disappointing.', '妈妈让我早点回家。这个消息使大家很高兴。这个结果令人失望。'),
					C('这个结果令人失望 means', 'The result is disappointing', ['The result ordered people to leave', 'People lost the result', 'The result made people hopeful']),
					C('医生___我多喝水', '让', ['使', '令', '被'], '让 for telling someone to do something. 使 and 令 cause feelings and states.'),
					Z('Sorry to have kept you waiting', '让你久等了', 'ràng nǐ jiǔ děng le'),
					I('把 A 当作 B', '把 can also turn one thing into another, in fact or only in your head.<br><b>把</b> A <b>当作</b> B = treat A as B: 我<b>把</b>他<b>当作</b>朋友。<br><b>把</b> A <b>翻译成</b> B = translate A into B: 请<b>把</b>这句话<b>翻译成</b>英文。<br><b>把</b> A <b>叫做</b> B = call A B: 北京人<b>把</b>小街<b>叫做</b>胡同。', '我把他当作朋友。请把这句话翻译成英文。北京人把小街叫做胡同。'),
					C('请___这句话翻译成英文', '把', ['被', '让', '对']),
					Z('I treat him as a friend', '我把他当作朋友', 'wǒ bǎ tā dàngzuò péngyou', '当 is fourth tone in 当作'),
					I('被 has relatives', 'In speech 被 often gives way to <b>让</b> or <b>叫</b>, and then the doer must be named.<br>我的手机<b>让</b>人偷了。My phone got stolen.<br>蛋糕<b>叫</b>弟弟吃完了。The cake got finished off by my little brother.<br>In writing, <b>被</b>…<b>所</b> + verb adds weight: 我<b>被</b>他的话<b>所</b>感动。I was moved by his words.', '我的手机让人偷了。蛋糕叫弟弟吃完了。我被他的话所感动。'),
					C('我的手机让人偷了 means', 'My phone was stolen', ['I let someone borrow my phone', 'I asked someone to steal my phone', 'Someone gave me a phone'], 'Here 让 marks the doer, just like 被.'),
					C('Which is the formal, written passive?', '被…所…', ['让…给…', '叫…了', '把…给…']),
					I('Not only bad news', '被 grew up on bad luck: 被偷 stolen, 被骗 cheated, 被批评 criticised. Modern Chinese also uses it for good news.<br>他<b>被</b>选为班长。He was elected class monitor.<br>她<b>被</b>评为优秀员工。She was named an outstanding employee.<br>Still, skip 被 when nobody would ask "by whom?": 信写好了, not 信被写好了.', '他被选为班长。她被评为优秀员工。信写好了。'),
					C('他被选为班长 means', 'He was elected class monitor', ['He chose the class monitor', 'He was scolded by the class monitor', 'He refused to be class monitor']),
					C('The most natural way to say "The letter is written"', '信写好了', ['信被写好了', '信把写好了', '信让写好了']),
					H('这个消息使大家很高兴', 'zhège xiāoxi shǐ dàjiā hěn gāoxìng', 'This news made everyone happy')
				]
			},
			{
				id: 'zh-h5-3', title: 'Adverbs with attitude', sub: '竟然, 毕竟, 难免, 反而: small words, big opinions',
				steps: [
					I('Surprise and exaggeration', '<b>竟然</b> jìngrán and <b>居然</b> jūrán = to my surprise, actually. They go after the subject, before the verb. 居然 is a touch stronger and more spoken.<br>他<b>竟然</b>忘了我的生日。He actually forgot my birthday.<br>这么难的考试，她<b>居然</b>通过了。<br><b>简直</b> jiǎnzhí = simply, practically (you are exaggerating): 我<b>简直</b>不敢相信。', '他竟然忘了我的生日。这么难的考试，她居然通过了。我简直不敢相信。'),
					C('他竟然忘了我的生日: the speaker is', 'surprised', ['relieved', 'guessing', 'giving a reason']),
					Z('I simply cannot believe it', '我简直不敢相信', 'wǒ jiǎnzhí bù gǎn xiāngxìn'),
					I('毕竟 and 究竟', 'They look alike and do different jobs.<br><b>毕竟</b> bìjìng = after all. It gives the fact that settles the matter: 别生气，他<b>毕竟</b>是个孩子。<br><b>究竟</b> jiūjìng = exactly, on earth. It presses a question, like a formal 到底: 你<b>究竟</b>想说什么？<br>究竟 needs a real choice or question word, so never use it with 吗.', '别生气，他毕竟是个孩子。你究竟想说什么？'),
					C('别生气，他___是个孩子', '毕竟', ['究竟', '竟然', '简直']),
					C('你究竟去不去？The speaker', 'wants a clear answer, now', ['is surprised you went', 'is sure you will go', 'is politely inviting you']),
					I('Probably, not necessarily, bound to', '<b>恐怕</b> kǒngpà = I am afraid that, probably (bad news, said gently): <b>恐怕</b>来不及了。<br><b>未必</b> wèibì = not necessarily: 贵的<b>未必</b>好。<br><b>难免</b> nánmiǎn = hard to avoid, bound to: 第一次做，<b>难免</b>出错。', '恐怕来不及了。贵的未必好。第一次做，难免出错。'),
					C('贵的未必好 means', 'Expensive things are not necessarily good', ['Expensive things are never good', 'Expensive things must be good', 'Cheap things are better']),
					Z('I am afraid there is not enough time', '恐怕来不及了', 'kǒngpà láibují le'),
					I('Backfires, bad timing and narrow escapes', '<b>反而</b> fǎn\'ér = instead, on the contrary (the opposite of what you expected): 吃了药，病<b>反而</b>更重了。<br><b>偏偏</b> piānpiān = of all things, just when you did not want it: 我没带伞，<b>偏偏</b>下雨了。<br><b>幸亏</b> xìngkuī = luckily (trouble avoided): <b>幸亏</b>你提醒我，不然我就忘了。', '吃了药，病反而更重了。我没带伞，偏偏下雨了。幸亏你提醒我，不然我就忘了。'),
					C('吃了药，病___更重了', '反而', ['幸亏', '毕竟', '未必'], 'Medicine should help. It did the opposite.'),
					C('我没带伞，偏偏下雨了: 偏偏 adds', 'annoyance at bad timing', ['relief', 'doubt', 'politeness']),
					Z('luckily', '幸亏', 'xìngkuī'),
					H('第一次做，难免出错', 'dì yī cì zuò, nánmiǎn chūcuò', 'Mistakes are hard to avoid the first time')
				]
			}
		]
	},
	{
		title: 'HSK 5: Arguing and writing',
		sub: 'Heavier connectors, written frames and near-synonyms',
		lessons: [
			{
				id: 'zh-h5-4', title: 'Even if, no matter, rather than', sub: '既然, 即使, 无论, 与其…不如, 宁可, 否则, 何况',
				steps: [
					I('既然…就 and 即使…也', '<b>既然</b> jìrán…<b>就</b> = since, now that (a fact both sides accept, then a conclusion).<br><b>既然</b>你来了，<b>就</b>多住几天吧。Since you are here, stay a few more days.<br><b>即使</b> jíshǐ…<b>也</b> = even if (it may never happen).<br><b>即使</b>下雨，我<b>也</b>要去。Even if it rains, I am going.<br>Spoken twins of 即使: 就算…也, 哪怕…也. Compare 虽然, which states a real fact.', '既然你来了，就多住几天吧。即使下雨，我也要去。'),
					C('___你不想去，就别去了', '既然', ['即使', '无论', '与其'], 'An accepted fact, then a conclusion with 就.'),
					Z('even if', '即使', 'jíshǐ'),
					I('无论 and 不管', '<b>无论</b> wúlùn (written) and <b>不管</b> bùguǎn (spoken) = no matter. What follows must be an open question: a question word, A 还是 B, or verb 不 verb. Then comes <b>都</b> or <b>也</b>.<br><b>不管</b>多忙，他<b>都</b>每天锻炼。No matter how busy, he exercises every day.<br><b>无论</b>你去不去，我<b>都</b>去。<br>So not 无论很忙: there is nothing open about 很忙.', '不管多忙，他都每天锻炼。无论你去不去，我都去。'),
					C('Which is correct?', '不管天气怎么样，我都去', ['不管天气很好，我都去', '不管天气不好，我就去', '不管天气怎么样，我才去'], 'An open question after 不管, then 都.'),
					Z('no matter (spoken)', '不管', 'bùguǎn'),
					I('Choosing the lesser evil', '<b>与其</b> yǔqí A，<b>不如</b> bùrú B = rather than A, better B. You pick B.<br><b>与其</b>在家等，<b>不如</b>出去找。Better to go out and look than to wait at home.<br><b>宁可</b> nìngkě A，<b>也不</b> B = would rather A than B. You pick A, even though A hurts.<br>我<b>宁可</b>走路，<b>也不</b>坐他的车。', '与其在家等，不如出去找。我宁可走路，也不坐他的车。'),
					C('与其在家等，不如出去找: the speaker prefers', 'going out to look', ['waiting at home', 'doing both', 'doing neither']),
					C('我宁可走路，也不坐他的车 means', 'I would rather walk than ride in his car', ['I walk because he has no car', 'I would rather ride in his car than walk', 'I can neither walk nor ride']),
					I('否则 and 何况', '<b>否则</b> fǒuzé = otherwise (written; in speech 不然 or 要不然).<br>快走吧，<b>否则</b>要迟到了。Hurry, otherwise we will be late.<br><b>何况</b> hékuàng = let alone, all the more so. It ends an argument with a rhetorical question.<br>大人都搬不动，<b>何况</b>孩子呢？Even adults cannot lift it, let alone a child.', '快走吧，否则要迟到了。大人都搬不动，何况孩子呢？'),
					C('快走吧，___要迟到了', '否则', ['何况', '既然', '于是']),
					C('这个字连老师都不认识，何况我呢？means', 'Even the teacher does not know this character, so of course I do not', ['The teacher knows it but I do not', 'I know it better than the teacher', 'Why did the teacher not teach me this character?']),
					Z('otherwise (written)', '否则', 'fǒuzé'),
					H('无论你去不去，我都去', 'wúlùn nǐ qù bu qù, wǒ dōu qù', 'Whether you go or not, I am going')
				]
			},
			{
				id: 'zh-h5-5', title: 'The written frame', sub: '于是, 从而, 至于, 以…为, 由, 对…来说, 根据, 凭, 趁',
				steps: [
					I('于是, 从而, 至于', '<b>于是</b> yúshì = and so, thereupon. The next event in a story: 雨停了，<b>于是</b>我们出发了。<br><b>从而</b> cóng\'ér = thereby. A method, then its result, in writing: 公司改进了技术，<b>从而</b>提高了质量。<br><b>至于</b> zhìyú = as for. It switches topic: 我明天去。<b>至于</b>他去不去，我不知道。', '雨停了，于是我们出发了。公司改进了技术，从而提高了质量。至于他去不去，我不知道。'),
					C('公司降低了价格，___吸引了更多顾客', '从而', ['至于', '否则', '何况'], 'Method, then its result: thereby.'),
					C('至于价格，我们明天再谈 means', 'As for the price, let us discuss it tomorrow', ['Because of the price, we talk tomorrow', 'The price will arrive tomorrow', 'The price is so high we must talk']),
					I('以…为… and 由', '<b>以</b> A <b>为</b> B = take A as B. 为 is wéi here.<br>这家公司<b>以</b>顾客<b>为</b>中心。This company puts the customer at the centre.<br>北方人<b>以</b>面食<b>为主</b>。Northerners mainly eat wheat foods.<br><b>由</b> yóu marks who is in charge, or what something is made of.<br>这件事<b>由</b>我负责。I am in charge of this.<br>水<b>由</b>氢和氧<b>组成</b>。Water is made up of hydrogen and oxygen.', '这家公司以顾客为中心。北方人以面食为主。这件事由我负责。水由氢和氧组成。'),
					C('北方人以面食为主 means', 'Northerners mainly eat wheat-based food', ['Northerners own the noodle shops', 'Northerners never eat rice', 'Northerners use noodles as money']),
					C('这件事___我负责', '由', ['以', '凭', '趁'], '由 introduces the person responsible.'),
					I('Whose point of view', '<b>对</b>…<b>来说</b> = for X, as far as X is concerned (how it lands on X).<br><b>对</b>我<b>来说</b>，汉字最难。For me, characters are the hardest part.<br><b>在</b>…<b>看来</b> = in X\'s opinion (what X thinks).<br><b>在</b>我<b>看来</b>，这个办法不错。In my view, this approach is pretty good.', '对我来说，汉字最难。在我看来，这个办法不错。'),
					C('在我看来，这个办法不错 means', 'In my opinion, this approach is pretty good', ['When I look at it, the approach disappears', 'This approach suits my eyes', 'I came to see this approach']),
					Z('For me, Chinese characters are the hardest', '对我来说，汉字最难', 'duì wǒ lái shuō, hànzì zuì nán'),
					I('根据, 凭, 趁', '<b>根据</b> gēnjù = according to, based on (information, rules): <b>根据</b>天气预报，明天有雨。<br><b>凭</b> píng = on the strength of (a ticket, ability, a feeling): <b>凭</b>票入场。他<b>凭</b>自己的努力考上了大学。<br><b>趁</b> chèn = while the chance lasts: <b>趁</b>热吃吧。Eat it while it is hot.', '根据天气预报，明天有雨。凭票入场。他凭自己的努力考上了大学。趁热吃吧。'),
					C('凭票入场 on a sign means', 'Admission by ticket', ['Tickets sold out', 'Keep your ticket safe', 'Free admission']),
					C('___年轻，多出去看看', '趁', ['凭', '由', '以'], 'While you are still young: a chance that will not last.'),
					Z('Eat it while it is hot', '趁热吃吧', 'chèn rè chī ba'),
					H('根据天气预报，明天有雨', 'gēnjù tiānqì yùbào, míngtiān yǒu yǔ', 'According to the forecast, it will rain tomorrow')
				]
			},
			{
				id: 'zh-h5-6', title: 'Almost the same word', sub: 'The near-synonym pairs HSK 5 loves to test',
				steps: [
					I('刚 and 刚才, 突然 and 忽然', '<b>刚才</b> gāngcái is a time word: a moment ago. It can sit before the subject: <b>刚才</b>你去哪儿了？<br><b>刚</b> gāng is an adverb: only just. "Just" is relative, so a year can count: 我<b>刚</b>来中国一年。<br><b>突然</b> tūrán and <b>忽然</b> hūrán both mean suddenly before a verb. Only 突然 is also an adjective: 这件事很<b>突然</b>。', '刚才你去哪儿了？我刚来中国一年。这件事很突然。'),
					C('我___来中国一年，中文还不太好', '刚', ['刚才', '忽然', '突然'], '刚才 means a moment ago, which cannot be a year.'),
					C('这个消息太___了', '突然', ['忽然', '刚才', '居然'], '忽然 is only an adverb. After 太 or 很 you need 突然.'),
					Z('Where did you go just now?', '刚才你去哪儿了', 'gāngcái nǐ qù nǎr le'),
					I('以为 and 认为', '<b>认为</b> rènwéi = to think, to hold an opinion: 我<b>认为</b>你是对的。I think you are right.<br><b>以为</b> yǐwéi = to have thought, wrongly: 我<b>以为</b>今天是星期五。I thought today was Friday. (It is not.)<br>Swap them and you insult someone: 我以为你是对的 = I thought you were right, but no.', '我认为你是对的。我以为今天是星期五。'),
					C('我以为你不来了 implies', 'but you came', ['and you did not come', 'you will never come', 'I hope you come']),
					I('经验 and 经历, 表示 and 表达', '<b>经历</b> jīnglì = something you lived through (also a verb): 一次难忘的<b>经历</b>。<br><b>经验</b> jīngyàn = experience as know-how: 他有十年的教学<b>经验</b>。<br><b>表达</b> biǎodá = to put thoughts or feelings into words: 我不知道怎么<b>表达</b>。<br><b>表示</b> biǎoshì = to show or state a stance: 他<b>表示</b>同意。向你<b>表示</b>感谢。', '一次难忘的经历。他有十年的教学经验。我不知道怎么表达。他表示同意。'),
					C('我们想找一位有___的老师', '经验', ['经历', '经过', '经常'], 'Know-how, not a life story.'),
					C('我心里很感动，可是不知道怎么___', '表达', ['表示', '表演', '表现'], 'Putting a feeling into words is 表达.'),
					Z('an unforgettable experience', '难忘的经历', 'nánwàng de jīnglì'),
					I('适合 and 合适, 保持 and 维持', '<b>适合</b> shìhé is a verb and takes an object: 这个颜色很<b>适合</b>你。<br><b>合适</b> héshì is an adjective and takes none: 这件衣服很<b>合适</b>。<br><b>保持</b> bǎochí = keep a good state going: <b>保持</b>安静, <b>保持</b>联系。<br><b>维持</b> wéichí = hold something up so it does not collapse: <b>维持</b>秩序, <b>维持</b>生活。', '这个颜色很适合你。这件衣服很合适。保持联系。维持秩序。'),
					C('这份工作很___你', '适合', ['合适', '适应', '符合'], 'An object follows, so you need the verb 适合.'),
					C('Saying goodbye to a friend: "Stay in touch!"', '保持联系', ['维持联系', '保存联系', '坚持联系']),
					H('这件衣服很合适', 'zhè jiàn yīfu hěn héshì', 'This piece of clothing fits well')
				]
			}
		]
	}
];
