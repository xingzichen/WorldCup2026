const messages = {
  zh: {
    title: "世界杯赛程与实时赛果",
    loading: "正在获取最新数据",
    updated: "已更新",
    fetchFailed: "数据获取失败",
    fetchFailedDetail: "无法获取最新数据",
    scheduleTab: "赛程",
    resultsTab: "赛果与出线形势",
    bracketTab: "晋级图",
    scorersTab: "射手榜",
    assistsTab: "助攻榜",
    clutchTab: "关键先生榜",
    efficiencyTab: "效率榜",
    highRatingsTab: "高分榜",
    lowRatingsTab: "低分榜",
    oddsTab: "赔率",
    searchLabel: "搜索",
    searchPlaceholder: "球队、城市、球场",
    statusLabel: "状态",
    groupFilterLabel: "小组",
    continentFilterLabel: "大洲",
    popularFilterLabel: "热门球队",
    all: "全部",
    allGroups: "全部小组",
    allContinents: "全部大洲",
    allPopular: "全部热门",
    starFilterLabel: "热门巨星",
    allStars: "全部巨星",
    scheduled: "未开赛",
    live: "进行中",
    completed: "已完赛",
    fullTime: "已完赛",
    beijingTime: "北京时间",
    completedMatches: "已完赛",
    nextMatchLabel: "下一场",
    updatedLabel: "更新时间",
    completedResults: "已完赛结果",
    recentResults: "最近完赛",
    bracketTitle: "淘汰赛晋级图",
    bracketHint: "小组赛未结束时，格子显示晋级名额；鼠标悬停可查看按当前排名推演的球队。",
    projectedTeam: "当前对应球队",
    projectedTeams: "当前候选球队",
    noProjection: "暂无当前推演",
    sourceMatch: "来源比赛",
    thirdRankLabel: "第三名总榜",
    roundOf32: "32强赛",
    roundOf16: "16强赛",
    quarterfinals: "1/4决赛",
    semifinals: "半决赛",
    final: "决赛",
    thirdPlaceMatch: "三四名决赛",
    scorersTitle: "射手榜",
    scorersHint: "排序规则：进球数优先，其次助攻数，再比较较少出场时间；点球数用于辅助观察。",
    assistsTitle: "助攻榜",
    assistsHint: "排序规则：助攻数优先，其次进球数，再比较较少出场时间。",
    clutchTitle: "关键先生榜",
    clutchHint: "统计扳平、反超、制胜球及相关助攻贡献，仅统计中场和前锋。",
    efficiencyTitle: "球员效率榜",
    efficiencyHint: "按平均评分、每 90 分钟进球、助攻和射正综合排序，仅统计中场和前锋。",
    leaderboardSource: "统计来源",
    leaderboardSourceEspn: "ESPN 单场球员统计与关键事件",
    matchesCounted: "已统计比赛",
    player: "球员",
    goals: "进球",
    penaltyGoals: "点球进球",
    assists: "助攻",
    penalties: "点球",
    minutes: "出场时间",
    approxMinutes: "约 {minutes} 分钟",
    unknownMinutes: "暂无",
    appearances: "出场",
    highRatingsTitle: "高评分球员排名",
    lowRatingsTitle: "低评分球员排名",
    ratingsHint: "本站评分基于 ESPN 公开单场球员统计计算，仅统计中场和前锋，非媒体官方评分。",
    showRatingDetails: "具体数据",
    hideRatingDetails: "隐藏具体数据",
    siteRating: "本站评分",
    averageRating: "平均分",
    highMatchRating: "最高单场",
    lowMatchRating: "最低单场",
    validAppearances: "有效出场",
    playersCounted: "入榜球员",
    formulaTitle: "评分公式",
    formulaBase: "基础分",
    formulaRange: "分数范围",
    formulaEligibility: "入榜条件",
    formulaAggregation: "总榜算法",
    ratingDetails: "细项",
    majorScoringItems: "主要得分项",
    majorDeductionItems: "主要扣分项",
    noMajorScoringItems: "暂无主要得分项",
    noMajorDeductionItems: "暂无主要扣分项",
    latestRating: "最近评分",
    cards: "牌",
    clutchScore: "关键分",
    efficiencyScore: "效率分",
    winningGoals: "制胜球",
    goAheadGoals: "反超球",
    equalizers: "扳平球",
    goalsPer90: "每90分钟进球",
    assistsPer90: "每90分钟助攻",
    shotsOnTargetPer90: "每90分钟射正",
    shots: "射门",
    shotsOnTarget: "射正",
    playerDetails: "球员详情",
    ratingTrend: "评分趋势",
    matchBreakdown: "单场明细",
    noPlayerDetails: "暂无该球员的单场评分明细。",
    formulaUnavailable: "暂无评分公式。",
    oddsTitle: "每场赔率",
    oddsHint: "使用 The Odds API。北京时间 08:00-20:00 每 3 小时最多更新一次；20:00 后不更新，继续展示上次缓存。",
    oddsUnavailable: "暂无赔率",
    oddsNotConfigured: "未配置 The Odds API 赔率数据源",
    oddsCacheReady: "赔率缓存已更新",
    oddsCacheError: "赔率缓存请求失败",
    oddsCacheStale: "正在使用上次缓存",
    oddsCacheClosed: "当前不在赔率刷新时段",
    oddsCacheClosedEmpty: "当前不在赔率刷新时段，且暂无缓存",
    oddsCacheExpires: "缓存到期",
    oddsProvider: "赔率来源",
    currentOdds: "即时",
    homeWin: "主胜",
    drawResult: "平局",
    awayWin: "客胜",
    totalGoals: "大小球",
    spread: "让球",
    groupOutlook: "小组出线形势",
    qualificationHint: "每组前二进入 32 强，12 个小组第三名中成绩最好的 8 队也晋级。",
    thirdPlaceRace: "第三名竞争区",
    empty: "暂无符合条件的比赛。",
    tbd: "待定",
    allFinished: "全部结束",
    directZone: "直接出线区",
    thirdZone: "第三名竞争",
    chasing: "待追赶",
    thirdAdvancing: "暂列前八",
    thirdOutside: "暂未出线区",
    group: "组",
    rank: "名",
    team: "球队",
    played: "赛",
    wins: "胜",
    draws: "平",
    losses: "负",
    record: "胜平负",
    goalsFor: "进",
    goalsAgainst: "失",
    goalDifference: "净",
    points: "分",
    outlook: "形势",
    africa: "非洲",
    asia: "亚洲",
    europe: "欧洲",
    northAmerica: "北美洲",
    southAmerica: "南美洲",
    oceania: "大洋洲"
  },
  en: {
    title: "World Cup Schedule & Live Results",
    loading: "Fetching latest data",
    updated: "Updated",
    fetchFailed: "Data refresh failed",
    fetchFailedDetail: "Unable to fetch latest data",
    scheduleTab: "Schedule",
    resultsTab: "Results & Qualification",
    bracketTab: "Bracket",
    scorersTab: "Scorers",
    assistsTab: "Assists",
    clutchTab: "Clutch",
    efficiencyTab: "Efficiency",
    highRatingsTab: "High Ratings",
    lowRatingsTab: "Low Ratings",
    oddsTab: "Odds",
    searchLabel: "Search",
    searchPlaceholder: "Team, city, venue",
    statusLabel: "Status",
    groupFilterLabel: "Group",
    continentFilterLabel: "Continent",
    popularFilterLabel: "Popular Teams",
    all: "All",
    allGroups: "All groups",
    allContinents: "All continents",
    allPopular: "All popular",
    starFilterLabel: "Star Players",
    allStars: "All stars",
    scheduled: "Scheduled",
    live: "Live",
    completed: "Completed",
    fullTime: "Full time",
    beijingTime: "Beijing Time",
    completedMatches: "Completed",
    nextMatchLabel: "Next Match",
    updatedLabel: "Updated",
    completedResults: "Completed Results",
    recentResults: "Recent Results",
    bracketTitle: "Knockout Bracket",
    bracketHint: "Before group play is settled, slots show qualification placeholders. Hover a slot to see the current projected team.",
    projectedTeam: "Current projection",
    projectedTeams: "Current candidates",
    noProjection: "No current projection",
    sourceMatch: "Source match",
    thirdRankLabel: "Third-place table",
    roundOf32: "Round of 32",
    roundOf16: "Round of 16",
    quarterfinals: "Quarterfinals",
    semifinals: "Semifinals",
    final: "Final",
    thirdPlaceMatch: "Third-place match",
    scorersTitle: "Top Scorers",
    scorersHint: "Sorting: goals first, then assists, then fewer minutes played. Penalties are shown for context.",
    assistsTitle: "Assist Leaders",
    assistsHint: "Sorting: assists first, then goals, then fewer minutes played.",
    clutchTitle: "Clutch Leaders",
    clutchHint: "Tracks equalizers, go-ahead goals, winners, and related assists for midfielders and forwards.",
    efficiencyTitle: "Player Efficiency",
    efficiencyHint: "Ranks midfielders and forwards by average rating plus per-90 goals, assists, and shots on target.",
    leaderboardSource: "Source",
    leaderboardSourceEspn: "ESPN event summary roster stats and key events",
    matchesCounted: "Matches counted",
    player: "Player",
    goals: "Goals",
    penaltyGoals: "Penalty goals",
    assists: "Assists",
    penalties: "Pens",
    minutes: "Minutes",
    approxMinutes: "~{minutes} min",
    unknownMinutes: "N/A",
    appearances: "Apps",
    highRatingsTitle: "Highest-Rated Players",
    lowRatingsTitle: "Lowest-Rated Players",
    ratingsHint: "Site ratings are calculated from ESPN public match player stats for midfielders and forwards only, not official media ratings.",
    showRatingDetails: "Details",
    hideRatingDetails: "Hide details",
    siteRating: "Site rating",
    averageRating: "Avg rating",
    highMatchRating: "Best match",
    lowMatchRating: "Worst match",
    validAppearances: "Valid apps",
    playersCounted: "Players counted",
    formulaTitle: "Formula",
    formulaBase: "Base",
    formulaRange: "Range",
    formulaEligibility: "Eligibility",
    formulaAggregation: "Ranking formula",
    ratingDetails: "Details",
    majorScoringItems: "Main scoring items",
    majorDeductionItems: "Main deduction items",
    noMajorScoringItems: "No main scoring items",
    noMajorDeductionItems: "No main deduction items",
    latestRating: "Latest",
    cards: "Cards",
    clutchScore: "Clutch score",
    efficiencyScore: "Efficiency",
    winningGoals: "Winners",
    goAheadGoals: "Go-ahead",
    equalizers: "Equalizers",
    goalsPer90: "Goals/90",
    assistsPer90: "Assists/90",
    shotsOnTargetPer90: "SOT/90",
    shots: "Shots",
    shotsOnTarget: "Shots on target",
    playerDetails: "Player details",
    ratingTrend: "Rating trend",
    matchBreakdown: "Match log",
    noPlayerDetails: "No match rating detail for this player yet.",
    formulaUnavailable: "Formula unavailable.",
    oddsTitle: "Match Odds",
    oddsHint: "Uses The Odds API. From 08:00 to 20:00 Beijing time, the server refreshes at most once every 3 hours. After 20:00 it keeps the last cache.",
    oddsUnavailable: "Odds unavailable",
    oddsNotConfigured: "The Odds API is not configured",
    oddsCacheReady: "Odds cache updated",
    oddsCacheError: "Odds cache request failed",
    oddsCacheStale: "Using previous cache",
    oddsCacheClosed: "Outside odds refresh window",
    oddsCacheClosedEmpty: "Outside refresh window and no cache yet",
    oddsCacheExpires: "Cache expires",
    oddsProvider: "Provider",
    currentOdds: "Current",
    homeWin: "Home",
    drawResult: "Draw",
    awayWin: "Away",
    totalGoals: "Total",
    spread: "Spread",
    groupOutlook: "Group Qualification Outlook",
    qualificationHint: "The top two teams in each group advance to the Round of 32, along with the eight best third-place teams.",
    thirdPlaceRace: "Third-Place Race",
    empty: "No matches match the current filters.",
    tbd: "TBD",
    allFinished: "All finished",
    directZone: "Direct qualification",
    thirdZone: "Third-place race",
    chasing: "Chasing",
    thirdAdvancing: "Top eight now",
    thirdOutside: "Outside top eight",
    group: "Group",
    rank: "Rank",
    team: "Team",
    played: "P",
    wins: "W",
    draws: "D",
    losses: "L",
    record: "W-D-L",
    goalsFor: "GF",
    goalsAgainst: "GA",
    goalDifference: "GD",
    points: "Pts",
    outlook: "Outlook",
    africa: "Africa",
    asia: "Asia",
    europe: "Europe",
    northAmerica: "North America",
    southAmerica: "South America",
    oceania: "Oceania"
  }
};

const teamNamesZh = {
  Algeria: "阿尔及利亚",
  Argentina: "阿根廷",
  Australia: "澳大利亚",
  Austria: "奥地利",
  Belgium: "比利时",
  "Bosnia-Herzegovina": "波黑",
  "Bosnia-Herz": "波黑",
  Brazil: "巴西",
  Canada: "加拿大",
  "Cape Verde": "佛得角",
  Colombia: "哥伦比亚",
  "Congo DR": "刚果民主共和国",
  Croatia: "克罗地亚",
  Curaçao: "库拉索",
  Czechia: "捷克",
  Ecuador: "厄瓜多尔",
  Egypt: "埃及",
  England: "英格兰",
  France: "法国",
  Germany: "德国",
  Ghana: "加纳",
  Haiti: "海地",
  Iran: "伊朗",
  Iraq: "伊拉克",
  "Ivory Coast": "科特迪瓦",
  Japan: "日本",
  Jordan: "约旦",
  Mexico: "墨西哥",
  Morocco: "摩洛哥",
  Netherlands: "荷兰",
  "New Zealand": "新西兰",
  Norway: "挪威",
  Panama: "巴拿马",
  Paraguay: "巴拉圭",
  Portugal: "葡萄牙",
  Qatar: "卡塔尔",
  "Saudi Arabia": "沙特阿拉伯",
  Scotland: "苏格兰",
  Senegal: "塞内加尔",
  "South Africa": "南非",
  "South Korea": "韩国",
  Spain: "西班牙",
  Sweden: "瑞典",
  Switzerland: "瑞士",
  Tunisia: "突尼斯",
  Türkiye: "土耳其",
  "United States": "美国",
  USA: "美国",
  Uruguay: "乌拉圭",
  Uzbekistan: "乌兹别克斯坦"
};

const venueNamesZh = {
  "AT&T Stadium": "AT&T 体育场",
  "BC Place": "BC 体育馆",
  "BMO Field": "BMO 球场",
  "Estadio Akron": "阿克伦体育场",
  "Estadio BBVA": "BBVA 体育场",
  "Estadio Banorte": "班诺特体育场",
  "GEHA Field at Arrowhead Stadium": "箭头体育场",
  "Gillette Stadium": "吉列体育场",
  "Hard Rock Stadium": "硬石体育场",
  "Levi's Stadium": "李维斯体育场",
  "Lincoln Financial Field": "林肯金融球场",
  "Lumen Field": "流明球场",
  "Mercedes-Benz Stadium": "梅赛德斯-奔驰体育场",
  "MetLife Stadium": "大都会人寿体育场",
  "NRG Stadium": "NRG 体育场",
  "SoFi Stadium": "SoFi 体育场"
};

const placeNamesZh = {
  "Arlington, Texas": "得克萨斯州阿灵顿",
  "Atlanta, Georgia": "佐治亚州亚特兰大",
  "East Rutherford, New Jersey": "新泽西州东卢瑟福",
  "Foxborough, Massachusetts": "马萨诸塞州福克斯伯勒",
  Guadalajara: "瓜达拉哈拉",
  Guadalupe: "瓜达卢佩",
  "Houston, Texas": "得克萨斯州休斯敦",
  "Inglewood, California": "加利福尼亚州英格尔伍德",
  "Kansas City, Missouri": "密苏里州堪萨斯城",
  "Mexico City": "墨西哥城",
  "Miami Gardens, Florida": "佛罗里达州迈阿密花园",
  "Philadelphia, Pennsylvania": "宾夕法尼亚州费城",
  "Santa Clara, California": "加利福尼亚州圣克拉拉",
  "Seattle, Washington": "华盛顿州西雅图",
  Toronto: "多伦多",
  Vancouver: "温哥华",
  Canada: "加拿大",
  Mexico: "墨西哥",
  USA: "美国"
};

const continentByTeam = {
  Algeria: "africa",
  Argentina: "southAmerica",
  Australia: "asia",
  Austria: "europe",
  Belgium: "europe",
  "Bosnia-Herzegovina": "europe",
  "Bosnia-Herz": "europe",
  Brazil: "southAmerica",
  Canada: "northAmerica",
  "Cape Verde": "africa",
  Colombia: "southAmerica",
  "Congo DR": "africa",
  Croatia: "europe",
  Curaçao: "northAmerica",
  Czechia: "europe",
  Ecuador: "southAmerica",
  Egypt: "africa",
  England: "europe",
  France: "europe",
  Germany: "europe",
  Ghana: "africa",
  Haiti: "northAmerica",
  Iran: "asia",
  Iraq: "asia",
  "Ivory Coast": "africa",
  Japan: "asia",
  Jordan: "asia",
  Mexico: "northAmerica",
  Morocco: "africa",
  Netherlands: "europe",
  "New Zealand": "oceania",
  Norway: "europe",
  Panama: "northAmerica",
  Paraguay: "southAmerica",
  Portugal: "europe",
  Qatar: "asia",
  "Saudi Arabia": "asia",
  Scotland: "europe",
  Senegal: "africa",
  "South Africa": "africa",
  "South Korea": "asia",
  Spain: "europe",
  Sweden: "europe",
  Switzerland: "europe",
  Tunisia: "africa",
  Türkiye: "europe",
  "United States": "northAmerica",
  USA: "northAmerica",
  Uruguay: "southAmerica",
  Uzbekistan: "asia"
};

const popularTeams = [
  "Argentina",
  "Brazil",
  "England",
  "France",
  "Germany",
  "Mexico",
  "Portugal",
  "Spain",
  "United States",
  "Japan",
  "South Korea",
  "Morocco"
];

const starPlayers = [
  { key: "mbappe", labelZh: "姆巴佩", labelEn: "Mbappé", aliases: ["Kylian Mbappé", "Kylian Mbappe", "Mbappé", "Mbappe"] },
  { key: "messi", labelZh: "梅西", labelEn: "Messi", aliases: ["Lionel Messi", "L. Messi", "Messi"] },
  { key: "ronaldo", labelZh: "C罗", labelEn: "Ronaldo", aliases: ["Cristiano Ronaldo", "C. Ronaldo", "Ronaldo"] },
  { key: "yamal", labelZh: "亚马尔", labelEn: "Yamal", aliases: ["Lamine Yamal", "Yamal"] },
  { key: "haaland", labelZh: "哈兰德", labelEn: "Haaland", aliases: ["Erling Haaland", "E. Haaland", "Haaland"] },
  { key: "bellingham", labelZh: "贝林厄姆", labelEn: "Bellingham", aliases: ["Jude Bellingham", "J. Bellingham", "Bellingham"] },
  { key: "vinicius", labelZh: "维尼修斯", labelEn: "Vinícius", aliases: ["Vinícius Júnior", "Vinicius Junior", "Vinícius Jr.", "Vinicius Jr.", "Vini Jr."] },
  { key: "rodri", labelZh: "罗德里", labelEn: "Rodri", aliases: ["Rodri", "Rodrigo Hernández", "Rodrigo Hernandez"] },
  { key: "kane", labelZh: "凯恩", labelEn: "Kane", aliases: ["Harry Kane", "H. Kane", "Kane"] },
  { key: "saka", labelZh: "萨卡", labelEn: "Saka", aliases: ["Bukayo Saka", "B. Saka", "Saka"] },
  { key: "foden", labelZh: "福登", labelEn: "Foden", aliases: ["Phil Foden", "P. Foden", "Foden"] },
  { key: "musiala", labelZh: "穆西亚拉", labelEn: "Musiala", aliases: ["Jamal Musiala", "J. Musiala", "Musiala"] },
  { key: "wirtz", labelZh: "维尔茨", labelEn: "Wirtz", aliases: ["Florian Wirtz", "F. Wirtz", "Wirtz"] },
  { key: "pedri", labelZh: "佩德里", labelEn: "Pedri", aliases: ["Pedri"] },
  { key: "gavi", labelZh: "加维", labelEn: "Gavi", aliases: ["Gavi"] },
  { key: "nico-williams", labelZh: "尼科·威廉姆斯", labelEn: "Nico Williams", aliases: ["Nico Williams", "N. Williams"] },
  { key: "leao", labelZh: "莱奥", labelEn: "Leão", aliases: ["Rafael Leão", "Rafael Leao", "R. Leão", "R. Leao", "Leão", "Leao"] },
  { key: "bruno-fernandes", labelZh: "B费", labelEn: "Bruno Fernandes", aliases: ["Bruno Fernandes", "B. Fernandes"] },
  { key: "bernardo-silva", labelZh: "B席", labelEn: "Bernardo Silva", aliases: ["Bernardo Silva", "B. Silva"] },
  { key: "de-bruyne", labelZh: "德布劳内", labelEn: "De Bruyne", aliases: ["Kevin De Bruyne", "K. De Bruyne", "De Bruyne"] },
  { key: "lautaro", labelZh: "劳塔罗", labelEn: "Lautaro", aliases: ["Lautaro Martínez", "Lautaro Martinez", "L. Martínez", "L. Martinez"] },
  { key: "julian-alvarez", labelZh: "阿尔瓦雷斯", labelEn: "Julián Álvarez", aliases: ["Julián Álvarez", "Julian Alvarez", "J. Álvarez", "J. Alvarez"] },
  { key: "pulisic", labelZh: "普利西奇", labelEn: "Pulisic", aliases: ["Christian Pulisic", "C. Pulisic", "Pulisic"] },
  { key: "son", labelZh: "孙兴慜", labelEn: "Son", aliases: ["Son Heung-Min", "Son Heung Min", "Heung-Min Son", "H. Son", "Son"] },
  { key: "neymar", labelZh: "内马尔", labelEn: "Neymar", aliases: ["Neymar", "Neymar Jr", "Neymar Jr."] },
  { key: "modric", labelZh: "莫德里奇", labelEn: "Modrić", aliases: ["Luka Modrić", "Luka Modric", "L. Modrić", "L. Modric", "Modrić", "Modric"] },
  { key: "salah", labelZh: "萨拉赫", labelEn: "Salah", aliases: ["Mohamed Salah", "Mohammad Salah", "M. Salah", "Salah"] },
  { key: "hakimi", labelZh: "阿什拉夫", labelEn: "Hakimi", aliases: ["Achraf Hakimi", "A. Hakimi", "Hakimi"] },
  { key: "kubo", labelZh: "久保建英", labelEn: "Kubo", aliases: ["Takefusa Kubo", "T. Kubo", "Kubo"] }
];

const positionNameZh = {
  G: "门将",
  GK: "门将",
  D: "后卫",
  DF: "后卫",
  CD: "中后卫",
  CB: "中后卫",
  "CD-L": "左中后卫",
  "CD-R": "右中后卫",
  LB: "左后卫",
  RB: "右后卫",
  LWB: "左翼卫",
  RWB: "右翼卫",
  DM: "防守型中场",
  "DM-L": "左防守型中场",
  "DM-R": "右防守型中场",
  CM: "中前卫",
  "CM-L": "左中前卫",
  "CM-R": "右中前卫",
  AM: "前腰",
  "AM-L": "左前腰",
  "AM-R": "右前腰",
  LM: "左中场",
  RM: "右中场",
  LW: "左边锋",
  RW: "右边锋",
  LF: "左前锋",
  RF: "右前锋",
  "CF-L": "左中锋",
  "CF-R": "右中锋",
  CF: "中锋",
  ST: "前锋",
  F: "前锋"
};

const continentOrder = ["africa", "asia", "europe", "northAmerica", "southAmerica", "oceania"];

const state = {
  data: null,
  view: "schedule",
  search: "",
  status: "all",
  group: "all",
  continent: "all",
  popularTeam: "all",
  starPlayer: "all",
  ratingDetailsVisible: false,
  lang: localStorage.getItem("worldcup-lang") || "zh"
};

const els = {
  refreshState: document.querySelector("#refreshState"),
  scheduleView: document.querySelector("#scheduleView"),
  resultsView: document.querySelector("#resultsView"),
  bracketView: document.querySelector("#bracketView"),
  scorersView: document.querySelector("#scorersView"),
  assistsView: document.querySelector("#assistsView"),
  clutchView: document.querySelector("#clutchView"),
  efficiencyView: document.querySelector("#efficiencyView"),
  highRatingsView: document.querySelector("#highRatingsView"),
  lowRatingsView: document.querySelector("#lowRatingsView"),
  oddsView: document.querySelector("#oddsView"),
  scheduleList: document.querySelector("#scheduleList"),
  bracketBoard: document.querySelector("#bracketBoard"),
  oddsList: document.querySelector("#oddsList"),
  oddsCacheStatus: document.querySelector("#oddsCacheStatus"),
  scorersTable: document.querySelector("#scorersTable"),
  assistsTable: document.querySelector("#assistsTable"),
  clutchTable: document.querySelector("#clutchTable"),
  efficiencyTable: document.querySelector("#efficiencyTable"),
  highRatingsTable: document.querySelector("#highRatingsTable"),
  lowRatingsTable: document.querySelector("#lowRatingsTable"),
  scorersMeta: document.querySelector("#scorersMeta"),
  assistsMeta: document.querySelector("#assistsMeta"),
  clutchMeta: document.querySelector("#clutchMeta"),
  efficiencyMeta: document.querySelector("#efficiencyMeta"),
  highRatingsMeta: document.querySelector("#highRatingsMeta"),
  lowRatingsMeta: document.querySelector("#lowRatingsMeta"),
  scorersStarFilters: document.querySelector("#scorersStarFilters"),
  assistsStarFilters: document.querySelector("#assistsStarFilters"),
  clutchStarFilters: document.querySelector("#clutchStarFilters"),
  efficiencyStarFilters: document.querySelector("#efficiencyStarFilters"),
  highRatingsStarFilters: document.querySelector("#highRatingsStarFilters"),
  lowRatingsStarFilters: document.querySelector("#lowRatingsStarFilters"),
  clutchFormula: document.querySelector("#clutchFormula"),
  efficiencyFormula: document.querySelector("#efficiencyFormula"),
  highRatingsFormula: document.querySelector("#highRatingsFormula"),
  lowRatingsFormula: document.querySelector("#lowRatingsFormula"),
  ratingDetailToggles: document.querySelectorAll(".rating-detail-toggle"),
  recentResultsList: document.querySelector("#recentResultsList"),
  standingsGrid: document.querySelector("#standingsGrid"),
  thirdPlaceTable: document.querySelector("#thirdPlaceTable"),
  matchSearch: document.querySelector("#matchSearch"),
  statusFilter: document.querySelector("#statusFilter"),
  groupFilter: document.querySelector("#groupFilter"),
  continentFilter: document.querySelector("#continentFilter"),
  popularTeamFilters: document.querySelector("#popularTeamFilters"),
  completedCount: document.querySelector("#completedCount"),
  nextMatch: document.querySelector("#nextMatch"),
  updatedAt: document.querySelector("#updatedAt"),
  emptyTemplate: document.querySelector("#emptyTemplate"),
  playerModal: document.querySelector("#playerModal"),
  playerModalContent: document.querySelector("#playerModalContent")
};

function t(key) {
  return messages[state.lang][key] ?? messages.zh[key] ?? key;
}

function formatMessage(key, values = {}) {
  return Object.entries(values).reduce(
    (message, [name, value]) => message.replace(`{${name}}`, String(value)),
    t(key)
  );
}

function makeDateFormatter(options) {
  return new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-US", {
    timeZone: "Asia/Shanghai",
    ...options
  });
}

function dayText(date) {
  return makeDateFormatter({
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(date);
}

function timeText(date) {
  return makeDateFormatter({
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function updateText(date) {
  return makeDateFormatter({
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function starLabel(star) {
  return state.lang === "zh" ? star.labelZh : star.labelEn;
}

function selectedStar() {
  return starPlayers.find((star) => star.key === state.starPlayer) ?? null;
}

function playerMatchesSelectedStar(entry) {
  const star = selectedStar();
  if (!star) return true;
  const names = [entry.name, entry.shortName, ...(entry.aliases ?? [])].map(normalizeSearchText).filter(Boolean);
  const aliases = star.aliases.map(normalizeSearchText);
  return aliases.some((alias) => names.some((name) => name === alias || name.includes(alias) || alias.includes(name)));
}

function positionText(entry) {
  const code = entry.position ?? "";
  const zhName = positionNameZh[code] ?? "";
  if (!code) return "";
  if (state.lang === "en") return code;
  return zhName ? `${code} · ${zhName}` : code;
}

function playerNameButton(entry) {
  return `
    <button class="player-name-button" data-player-id="${escapeHtml(entry.id)}" type="button">
      ${escapeHtml(entry.name)}
    </button>
  `;
}

function groupLabel(value) {
  if (state.lang === "en") return value;
  return String(value).replace(/^Group ([A-L])$/, "$1组");
}

function translatePlaceholderName(name) {
  if (state.lang === "en") return name;

  let match = String(name).match(/^Group ([A-L]) Winner$/);
  if (match) return `${match[1]}组首名`;

  match = String(name).match(/^Group ([A-L]) 2nd Place$/);
  if (match) return `${match[1]}组第二位`;

  match = String(name).match(/^Round of 32 (\d+) Winner$/);
  if (match) return `32强赛第${match[1]}场胜者`;

  match = String(name).match(/^Round of 16 (\d+) Winner$/);
  if (match) return `16强赛第${match[1]}场胜者`;

  match = String(name).match(/^Quarterfinal (\d+) Winner$/);
  if (match) return `1/4决赛第${match[1]}场胜者`;

  match = String(name).match(/^Semifinal (\d+) Winner$/);
  if (match) return `半决赛第${match[1]}场胜者`;

  match = String(name).match(/^Semifinal (\d+) Loser$/);
  if (match) return `半决赛第${match[1]}场负者`;

  match = String(name).match(/^Third Place Group ([A-L/]+)$/);
  if (match) return `${match[1]}组第三位`;

  return name;
}

function isPlaceholderName(name) {
  return /^(Group [A-L] (Winner|2nd Place)|Third Place Group|Round of 32|Round of 16|Quarterfinal|Semifinal)/.test(
    String(name ?? "")
  );
}

function displayTeamName(team) {
  const source = isPlaceholderName(team.name) ? team.name : team.shortName || team.name;
  if (state.lang === "en") return source;
  return teamNamesZh[source] || teamNamesZh[team.name] || translatePlaceholderName(source);
}

function allTeamNames(team) {
  return [team.name, team.shortName, team.abbreviation, teamNamesZh[team.name], teamNamesZh[team.shortName]]
    .filter(Boolean)
    .join(" ");
}

function teamKey(team) {
  return team.name || team.shortName || team.abbreviation || "";
}

function buildTeamGroupIndex() {
  const index = new Map();
  for (const group of state.data?.standings?.groups ?? []) {
    for (const entry of group.entries) {
      [entry.team.name, entry.team.shortName, entry.team.abbreviation]
        .filter(Boolean)
        .forEach((value) => index.set(value, group.name));
    }
  }
  return index;
}

function placeholderGroups(name) {
  const groups = new Set();
  const text = String(name ?? "");
  for (const match of text.matchAll(/Group ([A-L])/g)) {
    groups.add(`Group ${match[1]}`);
  }
  return groups;
}

function groupsForTeam(team) {
  const groups = new Set();
  const index = buildTeamGroupIndex();
  [team.name, team.shortName, team.abbreviation].filter(Boolean).forEach((value) => {
    const group = index.get(value);
    if (group) groups.add(group);
    placeholderGroups(value).forEach((placeholderGroup) => groups.add(placeholderGroup));
  });
  return groups;
}

function matchHasGroup(match, group) {
  if (group === "all") return true;
  const groups = new Set([...groupsForTeam(match.home), ...groupsForTeam(match.away)]);
  return groups.has(group);
}

function continentForTeam(team) {
  return continentByTeam[team.name] || continentByTeam[team.shortName] || null;
}

function matchHasContinent(match, continent) {
  if (continent === "all") return true;
  return continentForTeam(match.home) === continent || continentForTeam(match.away) === continent;
}

function matchHasPopularTeam(match, teamName) {
  if (teamName === "all") return true;
  return [match.home.name, match.home.shortName, match.away.name, match.away.shortName].includes(teamName);
}

function displayVenueName(venue) {
  if (state.lang === "en") return venue.name;
  return venueNamesZh[venue.name] || venue.name;
}

function displayPlaceName(value) {
  if (state.lang === "en") return value;
  return placeNamesZh[value] || value;
}

function statusText(match) {
  if (match.status.state === "post") return t("fullTime");
  if (match.status.state === "in") return state.lang === "en" ? match.status.detail || t("live") : t("live");
  return t("scheduled");
}

function statusClass(match) {
  if (match.status.state === "post") return "done";
  if (match.status.state === "in") return "live";
  return "";
}

function matchScore(match) {
  if (match.status.state === "pre") return "vs";
  return `${match.home.score ?? 0} - ${match.away.score ?? 0}`;
}

function teamMarkup(team) {
  const name = displayTeamName(team);
  const logo = team.logo
    ? `<img src="${escapeHtml(team.logo)}" alt="${escapeHtml(name)}" loading="lazy" />`
    : "";
  return `
    ${logo}
    <div>
      <div class="team-name">${escapeHtml(name)}</div>
      <div class="team-abbr">${escapeHtml(team.abbreviation)}</div>
    </div>
  `;
}

function venueText(match) {
  const place = [displayPlaceName(match.venue.city), displayPlaceName(match.venue.country)]
    .filter(Boolean)
    .join(state.lang === "zh" ? "，" : ", ");
  return place ? `${escapeHtml(displayVenueName(match.venue))}<br>${escapeHtml(place)}` : escapeHtml(displayVenueName(match.venue));
}

function matchCard(match) {
  const date = new Date(match.date);
  return `
    <article class="match-card">
      <div class="match-time">
        <strong>${timeText(date)}</strong>
        <span>${escapeHtml(t("beijingTime"))}</span>
        <span class="badge ${statusClass(match)}">${escapeHtml(statusText(match))}</span>
      </div>
      <div class="teams">
        <div class="team">${teamMarkup(match.home)}</div>
        <div class="score">${escapeHtml(matchScore(match))}</div>
        <div class="team">${teamMarkup(match.away)}</div>
      </div>
      <div class="venue">${venueText(match)}</div>
    </article>
  `;
}

function recentResultCard(match) {
  const date = new Date(match.date);
  return `
    <article class="recent-result-card">
      <div class="recent-result-meta">
        <span>${escapeHtml(dayText(date))}</span>
        <strong>${escapeHtml(timeText(date))}</strong>
      </div>
      <div class="recent-result-main">
        <div class="recent-team">${teamMarkup(match.home)}</div>
        <div class="recent-score">${escapeHtml(matchScore(match))}</div>
        <div class="recent-team">${teamMarkup(match.away)}</div>
      </div>
      <div class="recent-venue">${venueText(match)}</div>
    </article>
  `;
}

function oddsValue(value) {
  return value || "—";
}

function priceSetMarkup(prices) {
  return `
    <div class="odds-price-set">
      <div>
        <span>${escapeHtml(t("homeWin"))}</span>
        <strong>${escapeHtml(oddsValue(prices?.home))}</strong>
      </div>
      <div>
        <span>${escapeHtml(t("drawResult"))}</span>
        <strong>${escapeHtml(oddsValue(prices?.draw))}</strong>
      </div>
      <div>
        <span>${escapeHtml(t("awayWin"))}</span>
        <strong>${escapeHtml(oddsValue(prices?.away))}</strong>
      </div>
    </div>
  `;
}

function oddsMarketMarkup(match, market) {
  const provider = market.provider || t("oddsProvider");
  const extra = [
    market.details,
    market.lastUpdate ? `${t("updatedLabel")} ${updateText(new Date(market.lastUpdate))}` : "",
    market.overUnder !== null ? `${t("totalGoals")} ${market.overUnder}` : "",
    market.spread !== null ? `${t("spread")} ${market.spread}` : ""
  ]
    .filter(Boolean)
    .join(" · ");

  return `
    <div class="odds-market">
      <div class="odds-provider">
        <strong>${escapeHtml(provider)}</strong>
        ${extra ? `<span>${escapeHtml(extra)}</span>` : ""}
      </div>
      <div class="odds-prices">
        ${priceSetMarkup(market.current ?? market)}
      </div>
    </div>
  `;
}

function oddsCard(match) {
  const date = new Date(match.date);
  const unavailableText = {
    not_configured: t("oddsNotConfigured"),
    outside_window_empty: t("oddsCacheClosedEmpty"),
    outside_window: t("oddsCacheClosed"),
    error: t("oddsCacheError"),
    stale_error: t("oddsCacheStale")
  }[match.oddsSource] ?? t("oddsUnavailable");
  const markets = match.odds?.length
    ? match.odds.map((market) => oddsMarketMarkup(match, market)).join("")
    : `<div class="odds-empty">${escapeHtml(unavailableText)}</div>`;

  return `
    <article class="odds-card">
      <div class="odds-match">
        <div class="match-time">
          <strong>${timeText(date)}</strong>
          <span>${escapeHtml(dayText(date))}</span>
        </div>
        <div class="teams">
          <div class="team">${teamMarkup(match.home)}</div>
          <div class="score">${escapeHtml(matchScore(match))}</div>
          <div class="team">${teamMarkup(match.away)}</div>
        </div>
        <div class="venue">${venueText(match)}</div>
      </div>
      <div class="odds-markets">${markets}</div>
    </article>
  `;
}

const stageLabelKeys = {
  "round-of-32": "roundOf32",
  "round-of-16": "roundOf16",
  quarterfinals: "quarterfinals",
  semifinals: "semifinals",
  final: "final",
  "3rd-place-match": "thirdPlaceMatch"
};

function knockoutMatchesByStage() {
  const byStage = new Map();
  for (const match of state.data.matches.filter((item) => item.stage !== "group-stage")) {
    if (!byStage.has(match.stage)) byStage.set(match.stage, []);
    byStage.get(match.stage).push(match);
  }

  for (const matches of byStage.values()) {
    matches.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return byStage;
}

function groupEntry(groupLetter, rank) {
  const group = state.data.standings.groups.find((item) => item.name === `Group ${groupLetter}`);
  return group?.entries?.[rank - 1] ?? null;
}

function thirdPlaceEntry(groupLetter) {
  return state.data.standings.thirdPlace.find((entry) => entry.group === `Group ${groupLetter}`);
}

function teamLine(entry, prefix = "") {
  if (!entry?.team?.name) return "";
  const groupText = entry.group ? `${groupLabel(entry.group)} ` : "";
  const rankText = entry.thirdRank
    ? `${t("thirdRankLabel")} ${entry.thirdRank}`
    : `${t("rank")} ${entry.rank}`;
  return `${prefix}${groupText}${displayTeamName(entry.team)} (${rankText}, ${entry.points}${t("points")})`;
}

function resolveSlotProjection(name, depth = 0) {
  const text = String(name ?? "");
  if (depth > 3) return [];

  let match = text.match(/^Group ([A-L]) Winner$/);
  if (match) {
    const entry = groupEntry(match[1], 1);
    return entry ? [teamLine(entry, `${t("projectedTeam")}: `)] : [];
  }

  match = text.match(/^Group ([A-L]) 2nd Place$/);
  if (match) {
    const entry = groupEntry(match[1], 2);
    return entry ? [teamLine(entry, `${t("projectedTeam")}: `)] : [];
  }

  match = text.match(/^Third Place Group ([A-L/]+)$/);
  if (match) {
    const groups = match[1].split("/");
    const lines = groups
      .map((group) => thirdPlaceEntry(group))
      .filter(Boolean)
      .sort((a, b) => a.thirdRank - b.thirdRank)
      .map((entry) => teamLine(entry));
    return lines.length ? [`${t("projectedTeams")}:`, ...lines] : [];
  }

  match = text.match(/^Round of 32 (\d+) Winner$/);
  if (match) return resolveSourceMatch("round-of-32", Number(match[1]), depth);

  match = text.match(/^Round of 16 (\d+) Winner$/);
  if (match) return resolveSourceMatch("round-of-16", Number(match[1]), depth);

  match = text.match(/^Quarterfinal (\d+) Winner$/);
  if (match) return resolveSourceMatch("quarterfinals", Number(match[1]), depth);

  match = text.match(/^Semifinal (\d+) Winner$/);
  if (match) return resolveSourceMatch("semifinals", Number(match[1]), depth);

  match = text.match(/^Semifinal (\d+) Loser$/);
  if (match) return resolveSourceMatch("semifinals", Number(match[1]), depth);

  return [];
}

function resolveSourceMatch(stage, number, depth) {
  const match = knockoutMatchesByStage().get(stage)?.[number - 1];
  if (!match) return [];
  const lines = [
    `${t("sourceMatch")}: ${t(stageLabelKeys[stage])} ${number}`,
    `${translatePlaceholderName(match.home.name)} vs ${translatePlaceholderName(match.away.name)}`
  ];
  const projected = [
    ...resolveSlotProjection(match.home.name, depth + 1),
    ...resolveSlotProjection(match.away.name, depth + 1)
  ];
  return [...lines, ...projected.slice(0, 8)];
}

function slotTooltip(name) {
  const lines = resolveSlotProjection(name);
  return lines.length ? lines : [t("noProjection")];
}

function bracketSlot(team) {
  const label = displayTeamName(team);
  const tooltipLines = slotTooltip(team.name);
  return `
    <div class="bracket-slot" tabindex="0">
      <span>${escapeHtml(label)}</span>
      <div class="bracket-tooltip">${tooltipLines.map((line) => `<div>${escapeHtml(line)}</div>`).join("")}</div>
    </div>
  `;
}

function positionBracketTooltip(slot) {
  const tooltip = slot?.querySelector(".bracket-tooltip");
  if (!tooltip) return;

  const previousDisplay = tooltip.style.display;
  const previousVisibility = tooltip.style.visibility;
  tooltip.style.display = "grid";
  tooltip.style.visibility = "hidden";

  const gap = 8;
  const edgeGap = 8;
  const slotRect = slot.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  let left = slotRect.left + 8;
  let top = slotRect.bottom + gap;

  if (left + tooltipRect.width > window.innerWidth - edgeGap) {
    left = window.innerWidth - tooltipRect.width - edgeGap;
  }

  if (top + tooltipRect.height > window.innerHeight - edgeGap) {
    top = slotRect.top - tooltipRect.height - gap;
  }

  left = Math.max(edgeGap, left);
  top = Math.max(edgeGap, top);

  tooltip.style.setProperty("--bracket-tooltip-left", `${Math.round(left)}px`);
  tooltip.style.setProperty("--bracket-tooltip-top", `${Math.round(top)}px`);
  tooltip.style.display = previousDisplay;
  tooltip.style.visibility = previousVisibility;
}

function setBracketTooltipActive(slot, active) {
  const match = slot?.closest(".bracket-tree-match, .bracket-side-match");
  if (!match) return;
  match.classList.toggle("is-tooltip-active", active);
}

function activeBracketSlot() {
  return document.querySelector(".bracket-slot.is-focused") ?? document.querySelector(".bracket-slot:hover");
}

const bracketTreeStages = ["round-of-32", "round-of-16", "quarterfinals", "semifinals", "final"];
const bracketTreeSizes = {
  columnWidth: 232,
  columnGap: 50,
  matchHeight: 76,
  rowGap: 26,
  labelHeight: 34,
  paddingBottom: 24
};

function compactDayText(date) {
  return makeDateFormatter({
    month: "short",
    day: "numeric"
  }).format(date);
}

function bracketPlaceText(match) {
  return displayPlaceName(match.venue.city || match.venue.name || "");
}

function bracketMatchKey(stage, number) {
  return `${stage}:${number}`;
}

function sourceRefForSlotName(name) {
  const text = String(name ?? "");
  let match = text.match(/^Round of 32 (\d+) Winner$/);
  if (match) return { stage: "round-of-32", number: Number(match[1]) };

  match = text.match(/^Round of 16 (\d+) Winner$/);
  if (match) return { stage: "round-of-16", number: Number(match[1]) };

  match = text.match(/^Quarterfinal (\d+) Winner$/);
  if (match) return { stage: "quarterfinals", number: Number(match[1]) };

  match = text.match(/^Semifinal (\d+) (Winner|Loser)$/);
  if (match) return { stage: "semifinals", number: Number(match[1]) };

  return null;
}

function sourceRefsForMatch(match) {
  return [sourceRefForSlotName(match.home.name), sourceRefForSlotName(match.away.name)].filter(Boolean);
}

function buildBracketTreeLayout(byStage) {
  const { columnWidth, columnGap, matchHeight, rowGap, labelHeight } = bracketTreeSizes;
  const rowStep = matchHeight + rowGap;
  const positions = new Map();
  const matchRecords = [];
  const connectorRecords = [];

  bracketTreeStages.forEach((stage, stageIndex) => {
    const matches = byStage.get(stage) ?? [];
    matches.forEach((match, index) => {
      const number = index + 1;
      const refs = sourceRefsForMatch(match)
        .map((ref) => ({ ref, position: positions.get(bracketMatchKey(ref.stage, ref.number)) }))
        .filter((item) => item.position);
      const sourceCenter = refs.length
        ? refs.reduce((sum, item) => sum + item.position.y + matchHeight / 2, 0) / refs.length
        : null;
      const position = {
        stage,
        number,
        match,
        x: stageIndex * (columnWidth + columnGap),
        y: sourceCenter === null ? labelHeight + index * rowStep * Math.max(1, 2 ** stageIndex) : sourceCenter - matchHeight / 2
      };

      positions.set(bracketMatchKey(stage, number), position);
      matchRecords.push(position);
      refs.forEach((item) => connectorRecords.push({ from: item.position, to: position }));
    });
  });

  return { positions, matchRecords, connectorRecords };
}

function bracketConnectorPath(from, to) {
  const { columnWidth, matchHeight } = bracketTreeSizes;
  const startX = from.x + columnWidth;
  const startY = from.y + matchHeight / 2;
  const endX = to.x;
  const endY = to.y + matchHeight / 2;
  const midX = startX + (endX - startX) / 2;
  return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
}

function bracketTreeMatch(record) {
  const date = new Date(record.match.date);
  const place = bracketPlaceText(record.match);
  return `
    <article class="bracket-tree-match" style="left: ${record.x}px; top: ${record.y}px;">
      <div class="bracket-tree-meta">
        <span>${escapeHtml(compactDayText(date))}</span>
        ${place ? `<strong>${escapeHtml(place)}</strong>` : ""}
      </div>
      <div class="bracket-tree-box">
        ${bracketSlot(record.match.home)}
        ${bracketSlot(record.match.away)}
      </div>
    </article>
  `;
}

function bracketSideMatch(match, mainLayout) {
  if (!match) return "";
  const { columnWidth, columnGap, matchHeight } = bracketTreeSizes;
  const finalPosition = mainLayout.positions.get(bracketMatchKey("final", 1));
  const record = {
    match,
    x: finalPosition ? finalPosition.x : (bracketTreeStages.length - 1) * (columnWidth + columnGap),
    y: finalPosition ? finalPosition.y + matchHeight + 54 : bracketTreeSizes.labelHeight
  };

  return `
    <section class="bracket-side-match" style="left: ${record.x}px; top: ${record.y}px;">
      <h3>${escapeHtml(t("thirdPlaceMatch"))}</h3>
      <div class="bracket-tree-meta">
        <span>${escapeHtml(compactDayText(new Date(match.date)))}</span>
        ${bracketPlaceText(match) ? `<strong>${escapeHtml(bracketPlaceText(match))}</strong>` : ""}
      </div>
      <div class="bracket-tree-box">
        ${bracketSlot(match.home)}
        ${bracketSlot(match.away)}
      </div>
    </section>
  `;
}

function bracketTreeLabels() {
  const { columnWidth, columnGap } = bracketTreeSizes;
  return bracketTreeStages
    .map((stage, index) => {
      const x = index * (columnWidth + columnGap);
      return `<div class="bracket-tree-label" style="left: ${x}px;">${escapeHtml(t(stageLabelKeys[stage]))}</div>`;
    })
    .join("");
}

function bracketConnectors(paths, width, height) {
  if (!paths.length) return "";
  return `
    <svg class="bracket-connectors" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${paths.map((path) => `<path d="${path}" />`).join("")}
    </svg>
  `;
}

function bracketTree(matchLayout, byStage) {
  const { columnWidth, columnGap, matchHeight, paddingBottom } = bracketTreeSizes;
  const thirdPlaceMatch = byStage.get("3rd-place-match")?.[0];
  const sideTop = thirdPlaceMatch
    ? (matchLayout.positions.get(bracketMatchKey("final", 1))?.y ?? 0) + matchHeight + 54
    : 0;
  const width = bracketTreeStages.length * columnWidth + (bracketTreeStages.length - 1) * columnGap;
  const height = Math.max(
    ...matchLayout.matchRecords.map((record) => record.y + matchHeight),
    thirdPlaceMatch ? sideTop + 118 : 0
  ) + paddingBottom;
  const paths = matchLayout.connectorRecords.map((connector) => bracketConnectorPath(connector.from, connector.to));

  return `
    <div class="bracket-tree" style="width: ${width}px; height: ${height}px;">
      ${bracketConnectors(paths, width, height)}
      ${bracketTreeLabels()}
      ${matchLayout.matchRecords.map((record) => bracketTreeMatch(record)).join("")}
      ${bracketSideMatch(thirdPlaceMatch, matchLayout)}
    </div>
  `;
}

function renderBracket() {
  const byStage = knockoutMatchesByStage();
  const layout = buildBracketTreeLayout(byStage);
  els.bracketBoard.innerHTML = layout.matchRecords.length ? bracketTree(layout, byStage) : `<div class="empty">${escapeHtml(t("empty"))}</div>`;
}

function emptyNode() {
  const node = els.emptyTemplate.content.firstElementChild.cloneNode(true);
  node.textContent = t("empty");
  return node;
}

function renderMatchList(container, matches, withDayHeadings = true) {
  container.innerHTML = "";
  if (!matches.length) {
    container.append(emptyNode());
    return;
  }

  let currentDay = "";
  for (const match of matches) {
    const day = dayText(new Date(match.date));
    if (withDayHeadings && day !== currentDay) {
      currentDay = day;
      const heading = document.createElement("h2");
      heading.className = "match-day";
      heading.textContent = day;
      container.append(heading);
    }

    container.insertAdjacentHTML("beforeend", matchCard(match));
  }
}

function filteredMatches() {
  const needle = state.search.trim().toLowerCase();
  return state.data.matches.filter((match) => {
    const statusOk = state.status === "all" || match.status.state === state.status;
    if (!statusOk) return false;

    if (!matchHasGroup(match, state.group)) return false;
    if (!matchHasContinent(match, state.continent)) return false;
    if (!matchHasPopularTeam(match, state.popularTeam)) return false;

    if (!needle) return true;
    const haystack = [
      allTeamNames(match.home),
      allTeamNames(match.away),
      match.venue.name,
      venueNamesZh[match.venue.name],
      match.venue.city,
      placeNamesZh[match.venue.city],
      match.venue.country,
      placeNamesZh[match.venue.country]
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

function renderSchedule() {
  renderMatchList(els.scheduleList, filteredMatches(), true);
}

function renderOdds() {
  els.oddsList.innerHTML = state.data.matches.map(oddsCard).join("");
  renderOddsCacheStatus();
}

function renderOddsCacheStatus() {
  const cache = state.data.oddsCache ?? {};
  const statusText = {
    ready: t("oddsCacheReady"),
    stale_error: t("oddsCacheStale"),
    error: t("oddsCacheError"),
    not_configured: t("oddsNotConfigured"),
    outside_window: t("oddsCacheClosed"),
    outside_window_empty: t("oddsCacheClosedEmpty")
  }[cache.status] ?? t("oddsUnavailable");

  const details = [];
  if (cache.fetchedAt) details.push(`${t("updatedLabel")} ${updateText(new Date(cache.fetchedAt))}`);
  if (cache.expiresAt) details.push(`${t("oddsCacheExpires")} ${updateText(new Date(cache.expiresAt))}`);
  if (cache.error) details.push(cache.error);

  els.oddsCacheStatus.innerHTML = `
    <span class="odds-cache-dot ${escapeHtml(cache.status ?? "unknown")}"></span>
    <strong>${escapeHtml(statusText)}</strong>
    ${details.length ? `<span>${escapeHtml(details.join(" · "))}</span>` : ""}
  `;
}

function renderRecentResults(matches) {
  els.recentResultsList.innerHTML = "";
  if (!matches.length) {
    els.recentResultsList.append(emptyNode());
    return;
  }

  els.recentResultsList.innerHTML = matches.map(recentResultCard).join("");
}

function optionMarkup(value, label, selectedValue) {
  return `<option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function renderFilterControls() {
  const groups = state.data?.standings?.groups ?? [];
  els.groupFilter.innerHTML = [
    optionMarkup("all", t("allGroups"), state.group),
    ...groups.map((group) => optionMarkup(group.name, groupLabel(group.name), state.group))
  ].join("");

  els.continentFilter.innerHTML = [
    optionMarkup("all", t("allContinents"), state.continent),
    ...continentOrder.map((continent) => optionMarkup(continent, t(continent), state.continent))
  ].join("");

  els.popularTeamFilters.innerHTML = [
    { value: "all", label: t("allPopular") },
    ...popularTeams.map((team) => ({
      value: team,
      label: displayTeamName({ name: team, shortName: team })
    }))
  ]
    .map(
      (item) => `
        <button class="filter-chip ${item.value === state.popularTeam ? "active" : ""}" data-popular-team="${escapeHtml(item.value)}" type="button">
          ${escapeHtml(item.label)}
        </button>
      `
    )
    .join("");
}

function tableRows(entries, mode = "group") {
  return entries
    .map((entry) => {
      const direct = mode === "group" && entry.rank <= 2;
      const third = mode === "group" && entry.rank === 3;
      const thirdRace = mode === "third";
      const status = thirdRace
        ? entry.currentlyAdvancing
          ? t("thirdAdvancing")
          : t("thirdOutside")
        : direct
          ? t("directZone")
          : third
            ? t("thirdZone")
            : t("chasing");
      const statusClassName = direct || entry.currentlyAdvancing ? "in" : third ? "bubble-third" : "";
      const rowClass = direct || entry.currentlyAdvancing ? "advancing" : "";
      return `
        <tr class="${rowClass}">
          <td class="rank-cell">${entry.rank ?? entry.thirdRank}</td>
          ${thirdRace ? `<td>${escapeHtml(groupLabel(entry.group))}</td>` : ""}
          <td>
            <div class="team-cell">
              ${entry.team.logo ? `<img src="${escapeHtml(entry.team.logo)}" alt="" loading="lazy" />` : ""}
              <span>${escapeHtml(displayTeamName(entry.team))}</span>
            </div>
          </td>
          <td>${entry.played}</td>
          <td>${entry.wins}</td>
          <td>${entry.draws}</td>
          <td>${entry.losses}</td>
          <td>${entry.goalsFor}</td>
          <td>${entry.goalsAgainst}</td>
          <td>${escapeHtml(entry.goalDifferenceDisplay)}</td>
          <td><strong>${entry.points}</strong></td>
          <td><span class="bubble ${statusClassName}">${escapeHtml(status)}</span></td>
        </tr>
      `;
    })
    .join("");
}

function groupTableRows(entries) {
  return entries
    .map((entry) => {
      const direct = entry.rank <= 2;
      const third = entry.rank === 3;
      const status = direct ? t("directZone") : third ? t("thirdZone") : t("chasing");
      const statusClassName = direct ? "in" : third ? "bubble-third" : "";
      const rowClass = direct ? "advancing" : "";
      return `
        <tr class="${rowClass}">
          <td class="rank-cell">${entry.rank}</td>
          <td>
            <div class="team-cell">
              ${entry.team.logo ? `<img src="${escapeHtml(entry.team.logo)}" alt="" loading="lazy" />` : ""}
              <span>${escapeHtml(displayTeamName(entry.team))}</span>
            </div>
          </td>
          <td>${entry.played}</td>
          <td>${entry.wins}-${entry.draws}-${entry.losses}</td>
          <td>${escapeHtml(entry.goalDifferenceDisplay)}</td>
          <td><strong>${entry.points}</strong></td>
          <td><span class="bubble ${statusClassName}">${escapeHtml(status)}</span></td>
        </tr>
      `;
    })
    .join("");
}

function tableHeader(includeGroup = false) {
  return `
    <thead>
      <tr>
        <th>${t("rank")}</th>
        ${includeGroup ? `<th>${t("group")}</th>` : ""}
        <th>${t("team")}</th>
        <th>${t("played")}</th>
        <th>${t("wins")}</th>
        <th>${t("draws")}</th>
        <th>${t("losses")}</th>
        <th>${t("goalsFor")}</th>
        <th>${t("goalsAgainst")}</th>
        <th>${t("goalDifference")}</th>
        <th>${t("points")}</th>
        <th>${t("outlook")}</th>
      </tr>
    </thead>
  `;
}

function groupTableHeader() {
  return `
    <thead>
      <tr>
        <th>${t("rank")}</th>
        <th>${t("team")}</th>
        <th>${t("played")}</th>
        <th>${t("record")}</th>
        <th>${t("goalDifference")}</th>
        <th>${t("points")}</th>
        <th>${t("outlook")}</th>
      </tr>
    </thead>
  `;
}

function renderGroupStandings() {
  els.standingsGrid.innerHTML = state.data.standings.groups
    .map(
      (group) => `
        <article class="group-card">
          <h3>${escapeHtml(groupLabel(group.name))}</h3>
          <div class="table-wrap">
            <table class="standings-table">
              ${groupTableHeader()}
              <tbody>${groupTableRows(group.entries)}</tbody>
            </table>
          </div>
        </article>
      `
    )
    .join("");
}

function renderThirdPlace() {
  els.thirdPlaceTable.innerHTML = `
    ${tableHeader(true)}
    <tbody>${tableRows(
      state.data.standings.thirdPlace.map((entry) => ({ ...entry, rank: entry.thirdRank })),
      "third"
    )}</tbody>
  `;
}

function leaderboardMetaMarkup(leaderboards = {}) {
  const details = [
    `${t("matchesCounted")} ${leaderboards.matchesCounted ?? 0}`,
    leaderboards.source ? `${t("leaderboardSource")} ${t("leaderboardSourceEspn")}` : ""
  ].filter(Boolean);
  return details.map((detail) => `<span>${escapeHtml(detail)}</span>`).join("");
}

function starFilterMarkup() {
  return `
    <div class="quick-filter-heading">${escapeHtml(t("starFilterLabel"))}</div>
    <div class="chip-row">
      <button class="filter-chip ${state.starPlayer === "all" ? "active" : ""}" data-star-player="all" type="button">
        ${escapeHtml(t("allStars"))}
      </button>
      ${starPlayers
        .map(
          (star) => `
            <button class="filter-chip ${state.starPlayer === star.key ? "active" : ""}" data-star-player="${escapeHtml(star.key)}" type="button">
              ${escapeHtml(starLabel(star))}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderStarFilters() {
  const markup = starFilterMarkup();
  [
    els.scorersStarFilters,
    els.assistsStarFilters,
    els.clutchStarFilters,
    els.efficiencyStarFilters,
    els.highRatingsStarFilters,
    els.lowRatingsStarFilters
  ].forEach((container) => {
    if (container) container.innerHTML = markup;
  });
}

function minutesText(entry) {
  if (!entry.minutes) return t("unknownMinutes");
  return formatMessage("approxMinutes", { minutes: entry.minutes });
}

function leaderboardHeader(mode) {
  return `
    <thead>
      <tr>
        <th>${t("rank")}</th>
        <th>${t("player")}</th>
        <th>${t("team")}</th>
        <th>${mode === "scorers" ? t("goals") : t("assists")}</th>
        <th>${mode === "scorers" ? t("assists") : t("goals")}</th>
        <th>${t("penalties")}</th>
        <th>${t("minutes")}</th>
        <th>${t("appearances")}</th>
      </tr>
    </thead>
  `;
}

function leaderboardRows(entries, mode) {
  if (!entries.length) {
    return `<tbody><tr><td colspan="8"><div class="empty-state compact">${escapeHtml(t("empty"))}</div></td></tr></tbody>`;
  }

  return `
    <tbody>
      ${entries
        .map(
          (entry) => `
            <tr>
              <td class="rank-cell">${entry.rank}</td>
              <td>
                <div class="player-cell">
                  <strong>${playerNameButton(entry)}</strong>
                  <span>${[positionText(entry), entry.jersey ? `#${entry.jersey}` : ""].filter(Boolean).join(" · ")}</span>
                </div>
              </td>
              <td>
                <div class="team-cell">
                  ${entry.team?.logo ? `<img src="${escapeHtml(entry.team.logo)}" alt="" loading="lazy" />` : ""}
                  <span>${escapeHtml(displayTeamName(entry.team ?? {}))}</span>
                </div>
              </td>
              <td><strong>${mode === "scorers" ? entry.goals : entry.assists}</strong></td>
              <td>${mode === "scorers" ? entry.assists : entry.goals}</td>
              <td>${entry.penaltyGoals}</td>
              <td>${escapeHtml(minutesText(entry))}</td>
              <td>${entry.appearances}</td>
            </tr>
          `
        )
        .join("")}
    </tbody>
  `;
}

function renderLeaderboards() {
  const leaderboards = state.data.playerLeaderboards ?? {};
  const scorers = (leaderboards.scorers ?? []).filter(playerMatchesSelectedStar);
  const assists = (leaderboards.assists ?? []).filter(playerMatchesSelectedStar);
  renderStarFilters();
  els.scorersMeta.innerHTML = leaderboardMetaMarkup(leaderboards);
  els.assistsMeta.innerHTML = leaderboardMetaMarkup(leaderboards);
  els.scorersTable.innerHTML = `
    ${leaderboardHeader("scorers")}
    ${leaderboardRows(scorers, "scorers")}
  `;
  els.assistsTable.innerHTML = `
    ${leaderboardHeader("assists")}
    ${leaderboardRows(assists, "assists")}
  `;
}

const ratingComponentLabels = {
  zh: {
    goals: "进球",
    penaltyGoals: "点球进球",
    assists: "助攻",
    shotsOnTarget: "射正",
    otherShots: "其他射门",
    foulsSuffered: "被犯规",
    saves: "扑救",
    goalsConceded: "失球",
    foulsCommitted: "犯规",
    yellowCards: "黄牌",
    redCards: "红牌",
    ownGoals: "乌龙"
  },
  en: {
    goals: "Goals",
    penaltyGoals: "Penalty goals",
    assists: "Assists",
    shotsOnTarget: "Shots on target",
    otherShots: "Other shots",
    foulsSuffered: "Fouls won",
    saves: "Saves",
    goalsConceded: "Goals conceded",
    foulsCommitted: "Fouls",
    yellowCards: "Yellow cards",
    redCards: "Red cards",
    ownGoals: "Own goals"
  }
};

function ratingComponentLabel(label) {
  return ratingComponentLabels[state.lang]?.[label] ?? ratingComponentLabels.zh[label] ?? label;
}

function ratingMetaMarkup(ratings = {}) {
  const details = [
    `${t("matchesCounted")} ${ratings.matchesCounted ?? 0}`,
    `${t("playersCounted")} ${ratings.playersCounted ?? 0}`,
    ratings.calculatedAt ? `${t("updatedLabel")} ${updateText(new Date(ratings.calculatedAt))}` : ""
  ].filter(Boolean);
  return details.map((detail) => `<span>${escapeHtml(detail)}</span>`).join("");
}

function ratingFormulaMarkup(formula) {
  if (!formula) return `<div class="empty-state compact">${escapeHtml(t("formulaUnavailable"))}</div>`;
  return `
    <details class="formula-details" open>
      <summary>${escapeHtml(t("formulaTitle"))}: ${escapeHtml(formula.name ?? t("siteRating"))}</summary>
      <div class="formula-grid">
        <div><strong>${escapeHtml(t("formulaBase"))}</strong><span>${escapeHtml(String(formula.base ?? 6))}</span></div>
        <div><strong>${escapeHtml(t("formulaRange"))}</strong><span>${escapeHtml(formula.range ?? "3.0-10.0")}</span></div>
        <div><strong>${escapeHtml(t("formulaEligibility"))}</strong><span>${escapeHtml(formula.eligibility?.description ?? "")}</span></div>
        <div><strong>${escapeHtml(t("formulaAggregation"))}</strong><span>${escapeHtml(formula.aggregation ?? "")}</span></div>
      </div>
      <ol class="formula-rules">
        ${(formula.rules ?? []).map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}
      </ol>
    </details>
  `;
}

function rankingRuleMarkup(text) {
  if (!text) return "";
  return `<div class="ranking-rule">${escapeHtml(text)}</div>`;
}

function singleMatchRatingText(matchRating) {
  if (!matchRating) return "—";
  return `${matchRating.rating.toFixed?.(1) ?? matchRating.rating} · ${compactDayText(new Date(matchRating.date))}`;
}

function ratingComponentsForMode(components = [], mode) {
  const filtered = components.filter((component) => (mode === "low" ? component.points < 0 : component.points > 0));
  return filtered.sort((a, b) => (mode === "low" ? a.points - b.points : b.points - a.points));
}

function ratingDetailsMarkup(entry, mode) {
  const matches = (entry.matches ?? []).slice(0, 4);
  if (!matches.length) return "";
  return `
    <div class="rating-details">
      ${matches
        .map((match) => {
          const components = ratingComponentsForMode(match.components ?? [], mode)
            .map(
              (component) =>
                `${ratingComponentLabel(component.label)} ${component.value} (${component.points > 0 ? "+" : ""}${component.points})`
            )
            .join(" · ");
          const stats = match.stats ?? {};
          const statLine = `${t("goals")} ${stats.goals ?? 0} · ${t("assists")} ${stats.assists ?? 0} · ${t("minutes")} ${match.minutes}`;
          const componentLine =
            components || (mode === "low" ? t("noMajorDeductionItems") : t("noMajorScoringItems"));
          const componentHeading = mode === "low" ? t("majorDeductionItems") : t("majorScoringItems");
          return `
            <div class="rating-detail-row">
              <strong>${escapeHtml(match.rating.toFixed?.(1) ?? match.rating)}</strong>
              <span>${escapeHtml(compactDayText(new Date(match.date)))} · ${escapeHtml(match.matchName)}</span>
              <small>${escapeHtml([statLine, `${componentHeading}: ${componentLine}`].filter(Boolean).join(" · "))}</small>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function ratingsHeader(mode) {
  const detailColumns = state.ratingDetailsVisible
    ? `
        <th>${t("goals")}</th>
        <th>${t("assists")}</th>
        <th>${t("cards")}</th>
        <th>${t("latestRating")}</th>
      `
    : "";
  return `
    <thead>
      <tr>
        <th>${t("rank")}</th>
        <th>${t("player")}</th>
        <th>${t("team")}</th>
        <th>${t("averageRating")}</th>
        <th>${t("minutes")}</th>
        <th>${t("validAppearances")}</th>
        <th>${mode === "high" ? t("highMatchRating") : t("lowMatchRating")}</th>
        ${detailColumns}
      </tr>
    </thead>
  `;
}

function ratingsRows(entries, mode) {
  const colSpan = state.ratingDetailsVisible ? 11 : 7;
  if (!entries.length) {
    return `<tbody><tr><td colspan="${colSpan}"><div class="empty-state compact">${escapeHtml(t("empty"))}</div></td></tr></tbody>`;
  }

  return `
    <tbody>
      ${entries
        .map((entry) => {
          const matchRating = mode === "high" ? entry.highMatchRating : entry.lowMatchRating;
          const detailColumns = state.ratingDetailsVisible
            ? `
                <td>${entry.goals}</td>
                <td>${entry.assists}</td>
                <td>${entry.yellowCards}/${entry.redCards}</td>
                <td>${escapeHtml(singleMatchRatingText(entry.latestMatchRating))}</td>
              `
            : "";
          const detailRow = state.ratingDetailsVisible
            ? `<tr class="rating-expanded-row"><td colspan="${colSpan}">${ratingDetailsMarkup(entry, mode)}</td></tr>`
            : "";
          return `
            <tr>
              <td class="rank-cell">${entry.rank}</td>
              <td>
                <div class="player-cell">
                  <strong>${playerNameButton(entry)}</strong>
                  <span>${[positionText(entry), entry.jersey ? `#${entry.jersey}` : ""].filter(Boolean).join(" · ")}</span>
                </div>
              </td>
              <td>
                <div class="team-cell">
                  ${entry.team?.logo ? `<img src="${escapeHtml(entry.team.logo)}" alt="" loading="lazy" />` : ""}
                  <span>${escapeHtml(displayTeamName(entry.team ?? {}))}</span>
                </div>
              </td>
              <td><strong>${Number(entry.averageRating).toFixed(2)}</strong></td>
              <td>${escapeHtml(formatMessage("approxMinutes", { minutes: entry.minutes }))}</td>
              <td>${entry.validAppearances}</td>
              <td>${escapeHtml(singleMatchRatingText(matchRating))}</td>
              ${detailColumns}
            </tr>
            ${detailRow}
          `;
        })
        .join("")}
    </tbody>
  `;
}

function clutchHeader() {
  return `
    <thead>
      <tr>
        <th>${t("rank")}</th>
        <th>${t("player")}</th>
        <th>${t("team")}</th>
        <th>${t("clutchScore")}</th>
        <th>${t("winningGoals")}</th>
        <th>${t("goAheadGoals")}</th>
        <th>${t("equalizers")}</th>
        <th>${t("goals")}</th>
        <th>${t("assists")}</th>
        <th>${t("averageRating")}</th>
      </tr>
    </thead>
  `;
}

function efficiencyHeader() {
  return `
    <thead>
      <tr>
        <th>${t("rank")}</th>
        <th>${t("player")}</th>
        <th>${t("team")}</th>
        <th>${t("efficiencyScore")}</th>
        <th>${t("averageRating")}</th>
        <th>${t("minutes")}</th>
        <th>${t("goalsPer90")}</th>
        <th>${t("assistsPer90")}</th>
        <th>${t("shotsOnTargetPer90")}</th>
        <th>${t("goals")}</th>
        <th>${t("assists")}</th>
      </tr>
    </thead>
  `;
}

function advancedPlayerCell(entry) {
  return `
    <td>
      <div class="player-cell">
        <strong>${playerNameButton(entry)}</strong>
        <span>${[positionText(entry), entry.jersey ? `#${entry.jersey}` : ""].filter(Boolean).join(" · ")}</span>
      </div>
    </td>
    <td>
      <div class="team-cell">
        ${entry.team?.logo ? `<img src="${escapeHtml(entry.team.logo)}" alt="" loading="lazy" />` : ""}
        <span>${escapeHtml(displayTeamName(entry.team ?? {}))}</span>
      </div>
    </td>
  `;
}

function clutchRows(entries) {
  if (!entries.length) {
    return `<tbody><tr><td colspan="10"><div class="empty-state compact">${escapeHtml(t("empty"))}</div></td></tr></tbody>`;
  }

  return `
    <tbody>
      ${entries
        .map(
          (entry) => `
            <tr>
              <td class="rank-cell">${entry.rank}</td>
              ${advancedPlayerCell(entry)}
              <td><strong>${Number(entry.clutchPoints ?? 0).toFixed(2)}</strong></td>
              <td>${entry.winningGoals ?? 0}</td>
              <td>${entry.goAheadGoals ?? 0}</td>
              <td>${entry.equalizers ?? 0}</td>
              <td>${entry.clutchGoals ?? 0}</td>
              <td>${entry.clutchAssists ?? 0}</td>
              <td>${Number(entry.averageRating ?? 0).toFixed(2)}</td>
            </tr>
          `
        )
        .join("")}
    </tbody>
  `;
}

function efficiencyRows(entries) {
  if (!entries.length) {
    return `<tbody><tr><td colspan="11"><div class="empty-state compact">${escapeHtml(t("empty"))}</div></td></tr></tbody>`;
  }

  return `
    <tbody>
      ${entries
        .map(
          (entry) => `
            <tr>
              <td class="rank-cell">${entry.rank}</td>
              ${advancedPlayerCell(entry)}
              <td><strong>${Number(entry.efficiencyScore ?? 0).toFixed(2)}</strong></td>
              <td>${Number(entry.averageRating ?? 0).toFixed(2)}</td>
              <td>${escapeHtml(formatMessage("approxMinutes", { minutes: entry.minutes ?? 0 }))}</td>
              <td>${Number(entry.goalsPer90 ?? 0).toFixed(2)}</td>
              <td>${Number(entry.assistsPer90 ?? 0).toFixed(2)}</td>
              <td>${Number(entry.shotsOnTargetPer90 ?? 0).toFixed(2)}</td>
              <td>${entry.goals ?? 0}</td>
              <td>${entry.assists ?? 0}</td>
            </tr>
          `
        )
        .join("")}
    </tbody>
  `;
}

function playerProfileIndex() {
  const ratings = state.data?.playerRatings ?? {};
  const leaderboards = state.data?.playerLeaderboards ?? {};
  const index = new Map();
  const add = (entry) => {
    if (!entry?.id) return;
    const existing = index.get(entry.id) ?? {};
    const entryMatches = Array.isArray(entry.matches) ? entry.matches : [];
    const existingMatches = Array.isArray(existing.matches) ? existing.matches : [];
    const hasRatingMatches = entryMatches.some((match) => match.rating !== undefined);
    index.set(entry.id, {
      ...existing,
      ...entry,
      matches: hasRatingMatches || !existingMatches.length ? entryMatches : existingMatches
    });
  };

  [
    ...(ratings.players ?? []),
    ...(ratings.high ?? []),
    ...(ratings.low ?? []),
    ...(ratings.clutch ?? []),
    ...(ratings.efficiency ?? []),
    ...(leaderboards.scorers ?? []),
    ...(leaderboards.assists ?? [])
  ].forEach(add);

  return index;
}

function formatSignedPoints(value) {
  const number = Number(value ?? 0);
  return `${number > 0 ? "+" : ""}${number.toFixed(2).replace(/\.00$/, "")}`;
}

function componentsText(components = []) {
  const sorted = [...components]
    .filter((component) => component.points)
    .sort((a, b) => Math.abs(b.points) - Math.abs(a.points))
    .slice(0, 6);
  if (!sorted.length) return "—";
  return sorted
    .map(
      (component) =>
        `${ratingComponentLabel(component.label)} ${component.value} (${formatSignedPoints(component.points)})`
    )
    .join(" · ");
}

function playerSummaryMetrics(profile) {
  const shots = profile.totalShots ?? profile.matches?.reduce((sum, match) => sum + (match.stats?.totalShots ?? 0), 0) ?? 0;
  const shotsOnTarget =
    profile.shotsOnTarget ?? profile.matches?.reduce((sum, match) => sum + (match.stats?.shotsOnTarget ?? 0), 0) ?? 0;
  return [
    [t("averageRating"), profile.averageRating ? Number(profile.averageRating).toFixed(2) : "—"],
    [t("minutes"), profile.minutes ? formatMessage("approxMinutes", { minutes: profile.minutes }) : t("unknownMinutes")],
    [t("goals"), profile.goals ?? 0],
    [t("assists"), profile.assists ?? 0],
    [t("shots"), `${shotsOnTarget}/${shots}`],
    [t("cards"), `${profile.yellowCards ?? 0}/${profile.redCards ?? 0}`],
    [t("clutchScore"), profile.clutchPoints ? Number(profile.clutchPoints).toFixed(2) : "—"],
    [t("efficiencyScore"), profile.efficiencyScore ? Number(profile.efficiencyScore).toFixed(2) : "—"]
  ];
}

function ratingTrendMarkup(matches = []) {
  const ratedMatches = [...matches].filter((match) => match.rating !== undefined).reverse();
  if (!ratedMatches.length) return `<div class="empty-state compact">${escapeHtml(t("noPlayerDetails"))}</div>`;

  return `
    <div class="rating-trend" aria-label="${escapeHtml(t("ratingTrend"))}">
      ${ratedMatches
        .map((match) => {
          const height = clamp(((Number(match.rating) - 3) / 7) * 100, 8, 100);
          return `
            <div class="rating-trend-item">
              <div class="rating-trend-bar" style="--rating-height:${height}%"><span></span></div>
              <strong>${Number(match.rating).toFixed(1)}</strong>
              <small>${escapeHtml(compactDayText(new Date(match.date)))}</small>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function playerMatchRows(matches = []) {
  const ratedMatches = matches.filter((match) => match.rating !== undefined);
  if (!ratedMatches.length) return `<div class="empty-state compact">${escapeHtml(t("noPlayerDetails"))}</div>`;

  return ratedMatches
    .map((match) => {
      const stats = match.stats ?? {};
      const clutch = match.clutch ?? {};
      const statLine = [
        `${t("goals")} ${stats.goals ?? 0}`,
        `${t("assists")} ${stats.assists ?? 0}`,
        `${t("shots")} ${stats.shotsOnTarget ?? 0}/${stats.totalShots ?? 0}`,
        `${t("cards")} ${stats.yellowCards ?? 0}/${stats.redCards ?? 0}`,
        `${t("minutes")} ${match.minutes ?? "—"}`,
        clutch.points ? `${t("clutchScore")} ${Number(clutch.points).toFixed(2)}` : ""
      ].filter(Boolean);

      return `
        <article class="player-match-card">
          <div>
            <strong>${escapeHtml(match.matchName ?? "")}</strong>
            <span>${escapeHtml(compactDayText(new Date(match.date)))}</span>
          </div>
          <div class="player-match-rating">${Number(match.rating).toFixed(1)}</div>
          <p>${escapeHtml(statLine.join(" · "))}</p>
          <small>${escapeHtml(componentsText(match.components ?? []))}</small>
        </article>
      `;
    })
    .join("");
}

function renderPlayerModal(profile) {
  const metrics = playerSummaryMetrics(profile);
  return `
    <header class="player-modal-header">
      <div>
        <p>${escapeHtml(t("playerDetails"))}</p>
        <h2 id="playerModalTitle">${escapeHtml(profile.name ?? "")}</h2>
        <span>${escapeHtml([displayTeamName(profile.team ?? {}), positionText(profile), profile.jersey ? `#${profile.jersey}` : ""].filter(Boolean).join(" · "))}</span>
      </div>
      ${profile.team?.logo ? `<img src="${escapeHtml(profile.team.logo)}" alt="" />` : ""}
    </header>
    <div class="player-modal-metrics">
      ${metrics
        .map(
          ([label, value]) => `
            <div>
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `
        )
        .join("")}
    </div>
    <section class="player-modal-section">
      <h3>${escapeHtml(t("ratingTrend"))}</h3>
      ${ratingTrendMarkup(profile.matches ?? [])}
    </section>
    <section class="player-modal-section">
      <h3>${escapeHtml(t("matchBreakdown"))}</h3>
      <div class="player-match-list">${playerMatchRows(profile.matches ?? [])}</div>
    </section>
  `;
}

function openPlayerModal(playerId) {
  const profile = playerProfileIndex().get(playerId);
  if (!profile) return;
  els.playerModalContent.innerHTML = renderPlayerModal(profile);
  els.playerModal.hidden = false;
  document.body.classList.add("modal-open");
  els.playerModal.querySelector(".player-modal-close")?.focus();
}

function closePlayerModal() {
  els.playerModal.hidden = true;
  els.playerModalContent.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function renderRatings() {
  const ratings = state.data.playerRatings ?? {};
  const high = (ratings.high ?? []).filter(playerMatchesSelectedStar);
  const low = (ratings.low ?? []).filter(playerMatchesSelectedStar);
  const clutch = (ratings.clutch ?? []).filter(playerMatchesSelectedStar);
  const efficiency = (ratings.efficiency ?? []).filter(playerMatchesSelectedStar);
  const formulaMarkup = ratingFormulaMarkup(ratings.formula);
  const metaMarkup = ratingMetaMarkup(ratings);
  renderStarFilters();
  els.highRatingsFormula.innerHTML = formulaMarkup;
  els.lowRatingsFormula.innerHTML = formulaMarkup;
  els.clutchFormula.innerHTML = rankingRuleMarkup(ratings.clutchFormula);
  els.efficiencyFormula.innerHTML = rankingRuleMarkup(ratings.efficiencyFormula);
  els.highRatingsMeta.innerHTML = metaMarkup;
  els.lowRatingsMeta.innerHTML = metaMarkup;
  els.clutchMeta.innerHTML = metaMarkup;
  els.efficiencyMeta.innerHTML = metaMarkup;
  els.clutchTable.innerHTML = `
    ${clutchHeader()}
    ${clutchRows(clutch)}
  `;
  els.efficiencyTable.innerHTML = `
    ${efficiencyHeader()}
    ${efficiencyRows(efficiency)}
  `;
  els.highRatingsTable.innerHTML = `
    ${ratingsHeader("high")}
    ${ratingsRows(high, "high")}
  `;
  els.lowRatingsTable.innerHTML = `
    ${ratingsHeader("low")}
    ${ratingsRows(low, "low")}
  `;
  els.ratingDetailToggles.forEach((toggle) => {
    toggle.checked = state.ratingDetailsVisible;
    const label = toggle.closest(".switch-control")?.querySelector("strong");
    if (label) label.textContent = state.ratingDetailsVisible ? t("hideRatingDetails") : t("showRatingDetails");
  });
}

function renderResults() {
  const completed = state.data.matches.filter((match) => match.status.completed);
  const recentCompleted = [...completed]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  const upcoming = state.data.matches.find((match) => match.status.state !== "post");

  els.completedCount.textContent = String(completed.length);
  els.nextMatch.textContent = upcoming
    ? `${displayTeamName(upcoming.home)} vs ${displayTeamName(upcoming.away)}`
    : t("allFinished");
  els.updatedAt.textContent = updateText(new Date(state.data.fetchedAt));

  renderRecentResults(recentCompleted);
  renderGroupStandings();
  renderThirdPlace();
}

function renderChrome() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = state.lang === "zh" ? "2026 世界杯赛程" : "2026 World Cup Schedule";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
  els.matchSearch.placeholder = t("searchPlaceholder");
  els.statusFilter.querySelectorAll("option").forEach((option) => {
    option.textContent = t(option.dataset.i18n);
  });
  renderFilterControls();
  if (!state.data) {
    els.refreshState.textContent = t("loading");
  }
}

function renderAll() {
  renderChrome();
  if (!state.data) return;
  els.refreshState.textContent = `${t("updated")} ${updateText(new Date(state.data.fetchedAt))}`;
  renderSchedule();
  renderResults();
  renderBracket();
  renderLeaderboards();
  renderRatings();
  renderOdds();
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
  els.scheduleView.classList.toggle("active", view === "schedule");
  els.resultsView.classList.toggle("active", view === "results");
  els.bracketView.classList.toggle("active", view === "bracket");
  els.scorersView.classList.toggle("active", view === "scorers");
  els.assistsView.classList.toggle("active", view === "assists");
  els.clutchView.classList.toggle("active", view === "clutch");
  els.efficiencyView.classList.toggle("active", view === "efficiency");
  els.highRatingsView.classList.toggle("active", view === "highRatings");
  els.lowRatingsView.classList.toggle("active", view === "lowRatings");
  els.oddsView.classList.toggle("active", view === "odds");
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("worldcup-lang", lang);
  renderAll();
}

async function loadData() {
  renderChrome();
  els.refreshState.textContent = t("loading");
  try {
    const response = await fetch(`/api/worldcup?ts=${Date.now()}`, { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || payload.error || "Request failed");
    state.data = payload;
    renderAll();
  } catch (error) {
    els.refreshState.textContent = t("fetchFailed");
    const message = `<div class="error">${escapeHtml(t("fetchFailedDetail"))}：${escapeHtml(error.message)}</div>`;
    els.scheduleList.innerHTML = message;
    els.recentResultsList.innerHTML = message;
    els.scorersTable.innerHTML = message;
    els.assistsTable.innerHTML = message;
    els.clutchTable.innerHTML = message;
    els.efficiencyTable.innerHTML = message;
    els.highRatingsTable.innerHTML = message;
    els.lowRatingsTable.innerHTML = message;
  }
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.view));
});

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

els.matchSearch.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderSchedule();
});

els.statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  renderSchedule();
});

els.groupFilter.addEventListener("change", (event) => {
  state.group = event.target.value;
  renderSchedule();
});

els.continentFilter.addEventListener("change", (event) => {
  state.continent = event.target.value;
  renderSchedule();
});

els.popularTeamFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-popular-team]");
  if (!button) return;
  state.popularTeam = button.dataset.popularTeam;
  renderFilterControls();
  renderSchedule();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-star-player]");
  if (!button) return;
  state.starPlayer = button.dataset.starPlayer;
  renderLeaderboards();
  renderRatings();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-player-id]");
  if (!button) return;
  openPlayerModal(button.dataset.playerId);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-player-modal-close]")) return;
  closePlayerModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.playerModal.hidden) closePlayerModal();
});

els.ratingDetailToggles.forEach((toggle) => {
  toggle.addEventListener("change", (event) => {
    state.ratingDetailsVisible = event.target.checked;
    renderRatings();
  });
});

document.addEventListener("focusin", (event) => {
  const slot = event.target.closest?.(".bracket-slot");
  if (slot) {
    slot.classList.add("is-focused");
    positionBracketTooltip(slot);
    setBracketTooltipActive(slot, true);
  }
});

document.addEventListener("focusout", (event) => {
  const slot = event.target.closest?.(".bracket-slot");
  if (slot) {
    slot.classList.remove("is-focused");
    setBracketTooltipActive(slot, false);
  }
});

document.addEventListener("pointerover", (event) => {
  const slot = event.target.closest?.(".bracket-slot");
  if (!slot) return;
  positionBracketTooltip(slot);
  setBracketTooltipActive(slot, true);
});

document.addEventListener("pointerout", (event) => {
  const slot = event.target.closest?.(".bracket-slot");
  if (!slot || slot.contains(event.relatedTarget) || slot.classList.contains("is-focused")) return;
  setBracketTooltipActive(slot, false);
});

document.addEventListener("click", (event) => {
  document.querySelectorAll(".bracket-slot.is-focused").forEach((slot) => {
    slot.classList.remove("is-focused");
    setBracketTooltipActive(slot, false);
  });
  const slot = event.target.closest?.(".bracket-slot");
  if (slot) {
    slot.classList.add("is-focused");
    positionBracketTooltip(slot);
    setBracketTooltipActive(slot, true);
  }
});

window.addEventListener(
  "scroll",
  () => {
    const slot = activeBracketSlot();
    if (slot) positionBracketTooltip(slot);
  },
  true
);

window.addEventListener("resize", () => {
  const slot = activeBracketSlot();
  if (slot) positionBracketTooltip(slot);
});

loadData();
