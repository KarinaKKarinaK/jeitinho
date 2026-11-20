// HSK 6 lessons for the Mandarin course.
import { I, C, T, L } from './kit.js';
const Z = (prompt, zh, py, explain) => T(prompt, zh, `${zh} = ${py}${explain ? '. ' + explain : ''}`, [py]);
const H = (zh, py, en) => L(zh, `${py} = ${en}`, [py]);
export const UNITS6 = [
	{
		title: 'Writing like a newspaper',
		sub: 'Classical particles, formal connectors and report language',
		lessons: [
			{
				id: 'zh-h6-1', title: '之, 其, 而, 于, 所', sub: 'Classical particles that never retired',
				steps: [
					I('之 and 其', 'Two thousand years old and still in every editorial.<br><b>之</b> zhī = 的 in formal phrases: 成功<b>之</b>路 the road to success, 三分<b>之</b>一 one third.<br>It can also be the object "it": 取而代<b>之</b> to take its place.<br><b>其</b> qí = his, her, its, their: 每个城市都有<b>其</b>特点。Every city has its own character.<br><b>其中</b> = among them.', '成功之路。三分之一。每个城市都有其特点。'),
					C('其 in 每个城市都有其特点 means', 'its (own)', ['other', 'that is why', 'in fact']),
					Z('one third', '三分之一', 'sān fēn zhī yī', 'Fractions: whole, then 分之, then the part.'),
					I('而 and 则', '<b>而</b> ér links two descriptions, as "and" or "yet": 简单<b>而</b>有效 simple and effective, 价格低<b>而</b>质量高.<br>不是不想，<b>而是</b>不能。It is not that I do not want to, it is that I cannot.<br><b>则</b> zé sets up a contrast, "whereas": 南方多雨，北方<b>则</b>干燥。The south is rainy, whereas the north is dry.<br><b>否则</b> fǒuzé = otherwise.', '简单而有效。不是不想，而是不能。南方多雨，北方则干燥。'),
					C('价格低而质量高 means', 'low in price yet high in quality', ['the price is lower than the quality', 'low price, so low quality', 'neither cheap nor good']),
					C('城市人口增加，农村人口___减少', '则', ['之', '其', '于'], '则 marks the contrasting half: whereas.'),
					I('于 and 以', '<b>于</b> yú covers in, at, to, from and than.<br>他生<b>于</b>1990年。He was born in 1990.<br>有利<b>于</b>健康 good for health · 高<b>于</b>平均水平 higher than average<br><b>以</b> yǐ = with, by means of: <b>以</b>每小时三百公里的速度 at 300 km an hour.<br>Before a verb it means "in order to": <b>以</b>满足市场需求 to meet market demand.', '他生于1990年。有利于健康。高于平均水平。'),
					C('今年的产量高于去年 means', "This year's output is higher than last year's", ["This year's output is as high as last year's", 'Output was high last year', 'Output started rising last year'], 'Adjective + 于 = more ... than.'),
					Z('good for health', '有利于健康', 'yǒulì yú jiànkāng'),
					I('所 + verb, 为…所, 者', '<b>所</b> suǒ + verb = "that which is ...": 我<b>所</b>知道的 what I know, <b>所</b>见<b>所</b>闻 what one sees and hears.<br><b>为</b> A <b>所</b> + verb is a written passive: 这位作家<b>为</b>大家<b>所</b>熟知。This writer is well known to everyone.<br><b>者</b> zhě = the one who: 消费<b>者</b> consumer, 前<b>者</b> the former, 后<b>者</b> the latter.', '我所知道的。所见所闻。这位作家为大家所熟知。消费者。'),
					C('他的作品为年轻人所喜爱 means', 'His works are loved by young people', ['He loves the works of young people', 'He writes for the sake of young people', 'Young people work for him'], '为 marks the doer, 所 marks the verb.'),
					C('"茶和咖啡，我更喜欢后者." The speaker prefers', 'coffee', ['tea', 'both equally', 'neither'], '后者 = the latter.'),
					Z('consumer', '消费者', 'xiāofèizhě'),
					H('所见所闻', 'suǒ jiàn suǒ wén', 'what one sees and hears')
				]
			},
			{
				id: 'zh-h6-2', title: 'Connectors with a tie on', sub: '固然, 倘若, 一旦, 以免, 从而, 鉴于',
				steps: [
					I('Conceding a point', '<b>固然</b> gùrán = admittedly. You grant the point, then turn with 但 or 可是.<br>钱<b>固然</b>重要，<b>但</b>健康更重要。Money matters, granted, but health matters more.<br><b>尽管</b>…<b>仍然</b>… = despite ... still: <b>尽管</b>困难很多，他们<b>仍然</b>没有放弃。', '钱固然重要，但健康更重要。尽管困难很多，他们仍然没有放弃。'),
					C('钱___重要，但健康更重要', '固然', ['倘若', '以免', '从而']),
					Z('admittedly (granting a point)', '固然', 'gùrán'),
					I('Formal "if"', '<b>倘若</b> tǎngruò and <b>假如</b> jiǎrú are 如果 in a suit.<br><b>倘若</b>明天下雨，比赛将推迟。Should it rain tomorrow, the match will be postponed.<br><b>一旦</b> yídàn = once, the moment that. What follows is the consequence.<br><b>一旦</b>发现问题，请立即报告。', '倘若明天下雨，比赛将推迟。一旦发现问题，请立即报告。'),
					C('一旦发现问题，请立即报告 means', 'Once a problem is found, report it at once', ['Report one problem every day', 'If there is no problem, do not report', 'Problems were found and reported at dawn']),
					Z('once, the moment that', '一旦', 'yídàn'),
					I('Purpose and result', '<b>以便</b> yǐbiàn = so that (you can): 请留下电话，<b>以便</b>联系。<br><b>以免</b> yǐmiǎn = so as not to: 早点出发，<b>以免</b>迟到。<br><b>以致</b> yǐzhì = with the result that, and the result is bad: 他没有仔细检查，<b>以致</b>出了错。', '请留下电话，以便联系。早点出发，以免迟到。他没有仔细检查，以致出了错。'),
					C('请带上雨伞，___淋雨', '以免', ['以便', '以致', '固然'], '以免 = to avoid something unwanted.'),
					C('以致 introduces', 'an unwanted result', ['a purpose', 'a condition', 'a concession']),
					I('Chains of logic', '<b>从而</b> cóng\'ér = thereby: 公司改进了技术，<b>从而</b>降低了成本。<br><b>进而</b> jìn\'ér = and then go a step further: 先了解问题，<b>进而</b>解决问题。<br><b>鉴于</b> jiànyú = in view of: <b>鉴于</b>天气原因，航班取消。<br><b>况且</b> kuàngqiě moreover · <b>反之</b> fǎnzhī conversely · <b>总之</b> zǒngzhī in short', '公司改进了技术，从而降低了成本。鉴于天气原因，航班取消。总之。'),
					C('鉴于天气原因，航班取消 means', 'In view of the weather, the flight is cancelled', ['The flight is cancelled unless the weather changes', 'The weather was checked and the flight left', 'The flight caused the weather delay']),
					C('公司改进了技术，___降低了成本', '从而', ['反之', '倘若', '以免']),
					Z('in short, to sum up', '总之', 'zǒngzhī'),
					H('早点出发，以免迟到', 'zǎodiǎn chūfā, yǐmiǎn chídào', 'Leave early so as not to be late')
				]
			},
			{
				id: 'zh-h6-3', title: 'How to read a report', sub: 'Formal passives, empty verbs and statistics',
				steps: [
					I('Passives without 被', 'News prefers <b>受</b> and <b>遭</b>.<br><b>受</b> shòu (or 受到) = to receive, good or bad: 很<b>受</b>欢迎 very popular, <b>受到</b>批评 to be criticised, <b>受</b>影响 to be affected.<br><b>遭</b> zāo (or 遭到, 遭受) is only for bad news: <b>遭到</b>拒绝 to be rejected, <b>遭受</b>损失 to suffer losses.', '很受欢迎。受到批评。遭到拒绝。遭受损失。'),
					C('他的建议遭到拒绝 means', 'His proposal was rejected', ['He rejected the proposal', 'His proposal was welcomed', 'He refused to make a proposal']),
					C('这部电影很___欢迎', '受', ['遭', '以', '于'], '遭 is only for misfortunes. Nobody 遭 a welcome.'),
					I('Verbs that mean nothing', 'Reports add an empty verb before a two-syllable action. It adds weight, not meaning.<br><b>进行</b> jìnxíng: <b>进行</b>调查 to carry out an investigation = 调查<br><b>加以</b> jiāyǐ: 对问题<b>加以</b>分析 to analyse the problem<br><b>予以</b> yǔyǐ = to give, grant: <b>予以</b>批准 to grant approval, <b>予以</b>支持 to give support', '进行调查。对问题加以分析。予以批准。予以支持。'),
					C('对这个问题加以分析 means simply', 'analyse this problem', ['add this problem to the analysis', 'this problem is too hard to analyse', 'the analysis made the problem worse']),
					Z('to carry out an investigation', '进行调查', 'jìnxíng diàochá'),
					I('Numbers and trends', '<b>上升</b> shàngshēng to rise · <b>下降</b> xiàjiàng to fall · <b>增长</b> zēngzhǎng to grow<br><b>占</b> zhàn = to account for: <b>占</b>总数的百分之三十<br><b>达</b> dá = to reach: 人数<b>达</b>两万<br><b>约</b> yuē = about: <b>约</b>五百人<br><b>同比</b> tóngbǐ = compared with the same period last year: 销量<b>同比</b>增长百分之五。', '失业率下降。占总数的百分之三十。人数达两万。销量同比增长百分之五。'),
					C('销量同比增长百分之五 means', 'Sales grew 5% on the same period last year', ['Sales grew 5% on last month', 'Sales reached 5% of the total', 'Sales fell by 5%']),
					Z('to account for thirty percent', '占百分之三十', 'zhàn bǎi fēn zhī sānshí'),
					C('失业率下降 means', 'The unemployment rate fell', ['The unemployment rate rose', 'Unemployment stayed the same', 'Unemployment hit a record']),
					I('One-character adverbs', 'Reports save ink.<br><b>均</b> jūn = 都: 各地气温<b>均</b>有所上升。<br><b>亦</b> yì = 也 · <b>皆</b> jiē = 都: 人人<b>皆</b>知 everybody knows<br><b>颇</b> pō = rather, quite: <b>颇</b>受欢迎<br><b>甚</b> shèn = very: 相差<b>甚</b>远 far apart<br><b>仍</b> réng = 还 still<br><b>有所</b> + verb = somewhat: <b>有所</b>改善 improved somewhat', '各地气温均有所上升。人人皆知。颇受欢迎。相差甚远。'),
					C('颇受欢迎 means', 'quite popular', ['not popular at all', 'no longer popular', 'popular only with some']),
					C('均 in 各地气温均有所上升 is the formal form of', '都', ['很', '还', '也']),
					H('销量同比增长', 'xiāoliàng tóngbǐ zēngzhǎng', 'Sales grew year on year')
				]
			}
		]
	},
	{
		title: 'Precision and punch',
		sub: 'Near-synonyms, rhetorical questions and idioms that argue',
		lessons: [
			{
				id: 'zh-h6-4', title: 'Twins that are not identical', sub: 'Near-synonyms examiners love',
				steps: [
					I('Same sound, different job', '<b>必须</b> bìxū = must. It goes before a verb: 你<b>必须</b>来。<br><b>必需</b> bìxū = needed, essential. It describes things: 生活<b>必需</b>品 daily necessities.<br><b>爆发</b> bàofā = to erupt, to explode: 火山<b>爆发</b>, 战争<b>爆发</b>, <b>爆发</b>出掌声.<br><b>暴发</b> bàofā = to break out suddenly, for floods and disease: 山洪<b>暴发</b>. Also <b>暴发</b>户, someone who got rich overnight.', '你必须来。生活必需品。火山爆发。山洪暴发。'),
					C('水是生活___品', '必需', ['必须', '必然', '必定'], '必需 describes a thing you need. 必须 needs a verb after it.'),
					C('火山___了', '爆发', ['暴发', '发挥', '发扬'], 'Volcanoes, wars and applause take 爆, the one with the fire radical.'),
					I('采取 or 采用, 处理 or 处置', '<b>采取</b> cǎiqǔ = to take a measure, an attitude, action: <b>采取</b>措施.<br><b>采用</b> cǎiyòng = to adopt and use a method, a technology, a design: <b>采用</b>新技术.<br><b>处理</b> chǔlǐ = to handle, the everyday word: <b>处理</b>问题, <b>处理</b>垃圾.<br><b>处置</b> chǔzhì = to deal with firmly, more official: <b>处置</b>突发事件 to handle an emergency.', '采取措施。采用新技术。处理问题。处置突发事件。'),
					C('政府___了紧急措施', '采取', ['采用', '采访', '采购'], 'Measures are taken: 采取措施.'),
					Z('to take measures', '采取措施', 'cǎiqǔ cuòshī'),
					I('充分 or 充足, 改进 or 改善', '<b>充分</b> chōngfèn = full, ample, for abstract things: <b>充分</b>的理由, <b>充分</b>利用, 准备<b>充分</b>.<br><b>充足</b> chōngzú = plentiful, for things you can count or measure: 阳光<b>充足</b>, 资金<b>充足</b>, 睡眠<b>充足</b>.<br><b>改进</b> gǎijìn = to improve by making more advanced: <b>改进</b>方法, <b>改进</b>技术.<br><b>改善</b> gǎishàn = to make better: <b>改善</b>生活条件, <b>改善</b>关系.', '充分的理由。阳光充足。改进技术。改善生活条件。'),
					C('这个房间阳光___', '充足', ['充分', '充实', '充满'], 'Sunlight, money and sleep are 充足.'),
					C('两国关系得到了___', '改善', ['改进', '改正', '改革'], 'Relations and conditions get 改善. Methods and technology get 改进.'),
					Z('to make full use of', '充分利用', 'chōngfèn lìyòng'),
					I('发挥 or 发扬, 严格 or 严厉', '<b>发挥</b> fāhuī = to bring into play: <b>发挥</b>作用, <b>发挥</b>优势.<br><b>发扬</b> fāyáng = to carry forward a tradition or a spirit: <b>发扬</b>优良传统.<br><b>严格</b> yángé = strict about rules and standards: <b>严格</b>要求, <b>严格</b>遵守规定.<br><b>严厉</b> yánlì = stern, harsh, for a tone or a punishment: <b>严厉</b>批评.', '发挥作用。发扬优良传统。严格遵守规定。严厉批评。'),
					C('每个人都应该___自己的优势', '发挥', ['发扬', '发表', '发现'], 'Strengths and abilities are put to use: 发挥.'),
					C('老师___地批评了他', '严厉', ['严格', '严重', '严密'], '严厉 is about harshness. 严格 is about sticking to a standard.'),
					H('采用新技术', 'cǎiyòng xīn jìshù', 'to adopt new technology')
				]
			},
			{
				id: 'zh-h6-5', title: 'Questions that are not questions', sub: '难道, 何必, 何尝, 非…不可, 未免, 无非, 莫过于',
				steps: [
					I('难道 and 岂', '<b>难道</b>…<b>吗</b>？ is a question that expects no answer. It means the opposite of what it asks.<br><b>难道</b>你不知道<b>吗</b>？Surely you know?<br><b>岂</b> qǐ is the written version: 这样<b>岂不是</b>更好？Would that not be better?<br><b>岂有此理</b>！Outrageous! (How can there be such a reason?)', '难道你不知道吗？这样岂不是更好？岂有此理！'),
					C('难道你不知道吗？ The speaker believes', 'you surely do know', ['you really do not know', 'nobody can know', 'it is hard to say']),
					Z('Outrageous!', '岂有此理', 'qǐ yǒu cǐ lǐ'),
					I('何必 and 何尝', '<b>何必</b> hébì = why bother, there is no need: 都是朋友，<b>何必</b>这么客气？<br>On its own: <b>何必</b>呢？Why bother?<br><b>何尝</b> hécháng usually comes with 不 and means "of course I do": 我<b>何尝</b>不想去？How could I not want to go?', '都是朋友，何必这么客气？何必呢？我何尝不想去？'),
					C('我何尝不想休息 means', 'Of course I want to rest', ['I never want to rest', 'I have not tried resting', 'Why should I rest?'], '何尝不 = how could it not be so.'),
					C('一点小事，___生气？', '何必', ['何尝', '无非', '莫过于'], 'Why bother getting angry over something so small?'),
					I('No way out', '<b>不得不</b> bùdébù = to have no choice but to: 我<b>不得不</b>承认他是对的。<br><b>非</b>…<b>不可</b> fēi…bùkě = it absolutely must: 这件事<b>非</b>你去<b>不可</b>。It has to be you who goes.<br>Also "is bound to": 这样下去，<b>非</b>出事<b>不可</b>。Carry on like this and something is bound to go wrong.', '我不得不承认他是对的。这件事非你去不可。这样下去，非出事不可。'),
					C('这件事非你去不可 means', 'It has to be you who goes', ['You must not go', 'It is not possible for you to go', 'You may go if you like'], 'Two negatives, 非 and 不可, make one strong must.'),
					Z('I have to admit', '我不得不承认', 'wǒ bùdébù chéngrèn'),
					I('Sizing things up', '<b>未免</b> wèimiǎn = rather too, a polite complaint: 这<b>未免</b>太贵了。That is a bit much, price-wise.<br><b>无非</b> wúfēi = nothing but, simply: 他这么说，<b>无非</b>是想让你放心。<br><b>莫过于</b> mòguòyú = nothing beats: 最幸福的事<b>莫过于</b>和家人在一起。', '这未免太贵了。他这么说，无非是想让你放心。最幸福的事莫过于和家人在一起。'),
					C('这个要求未免太高了 means', 'This demand is rather too high', ['This demand is not high at all', 'This demand cannot be avoided', 'This demand is not yet high enough']),
					C('他迟到的原因___是堵车', '无非', ['何必', '未免', '难道'], '无非是 = it is simply, nothing more than.'),
					C('最大的幸福莫过于健康 means', 'No happiness is greater than health', ['Happiness does not last longer than health', 'Health is not the greatest happiness', 'Do not be too happy about your health']),
					H('何必呢', 'hébì ne', 'Why bother?')
				]
			},
			{
				id: 'zh-h6-6', title: 'Chengyu for grown-ups', sub: 'Set phrases that carry an argument',
				steps: [
					I('Making your case', '<b>众所周知</b> zhòng suǒ zhōu zhī = as everyone knows. It opens a sentence: <b>众所周知</b>，吸烟有害健康。<br><b>不言而喻</b> bù yán ér yù = self-evident, it goes without saying.<br><b>归根到底</b> guī gēn dào dǐ = in the final analysis.<br><b>实事求是</b> shí shì qiú shì = to seek truth from facts, to be realistic.', '众所周知，吸烟有害健康。不言而喻。归根到底。实事求是。'),
					C('这个道理不言而喻 means', 'This point is self-evident', ['This point cannot be put into words', 'Nobody dares to say this', 'This point is hard to explain']),
					Z('as everyone knows', '众所周知', 'zhòng suǒ zhōu zhī'),
					I('Feelings', '<b>迫不及待</b> pò bù jí dài = too eager to wait: 孩子们<b>迫不及待</b>地打开了礼物。<br><b>无动于衷</b> wú dòng yú zhōng = completely unmoved: 他对别人的批评<b>无动于衷</b>。<br><b>恍然大悟</b> huǎngrán dà wù = to suddenly see the light.', '孩子们迫不及待地打开了礼物。他对别人的批评无动于衷。恍然大悟。'),
					C('他对大家的批评无动于衷 means', "He is unmoved by everyone's criticism", ['He was deeply hurt by the criticism', 'He criticised everyone without reason', 'He moved away because of the criticism']),
					C('一下课，孩子们就___地跑了出去', '迫不及待', ['无动于衷', '不言而喻', '归根到底']),
					I('Passing judgment', '<b>得不偿失</b> dé bù cháng shī = the loss outweighs the gain.<br><b>恰到好处</b> qià dào hǎochù = just right: 这道菜的咸淡<b>恰到好处</b>。<br><b>层出不穷</b> céng chū bù qióng = to keep emerging, one after another: 新问题<b>层出不穷</b>。<br><b>急于求成</b> jí yú qiú chéng = impatient for results.', '得不偿失。这道菜的咸淡恰到好处。新问题层出不穷。急于求成。'),
					C('为了省十块钱花了两个小时，真是', '得不偿失', ['恰到好处', '层出不穷', '迫不及待'], 'Two hours to save ten yuan: the loss outweighs the gain.'),
					Z('just right', '恰到好处', 'qià dào hǎochù'),
					C('新产品层出不穷 means', 'New products keep appearing one after another', ['New products are running out', 'New products are poor quality', 'New products come in layers']),
					I('Sayings everyone knows', '<b>说曹操，曹操到</b> Shuō Cáo Cāo, Cáo Cāo dào = speak of the devil.<br><b>车到山前必有路</b> chē dào shān qián bì yǒu lù = a way will turn up (when the cart reaches the mountain, there is a road).<br><b>三个臭皮匠，顶个诸葛亮</b> = three cobblers equal one Zhuge Liang: many heads beat one genius.', '说曹操，曹操到。车到山前必有路。三个臭皮匠，顶个诸葛亮。'),
					C('You mention a friend and he walks in. You say', '说曹操，曹操到', ['车到山前必有路', '岂有此理', '得不偿失']),
					C('车到山前必有路 tells you', 'not to worry, a way will turn up', ['to check the map before driving', 'that mountain roads are dangerous', 'to turn back when it gets hard']),
					H('实事求是', 'shí shì qiú shì', 'to seek truth from facts')
				]
			}
		]
	}
];
