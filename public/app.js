const messages = {
  zh: {
    title: "世界杯赛程与实时赛果",
    loading: "正在获取最新数据",
    updated: "已更新",
    fetchFailed: "数据获取失败",
    fetchFailedDetail: "无法获取最新数据",
    scheduleTab: "赛程",
    resultsTab: "赛果与出线形势",
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

const continentOrder = ["africa", "asia", "europe", "northAmerica", "southAmerica", "oceania"];

const state = {
  data: null,
  view: "schedule",
  search: "",
  status: "all",
  group: "all",
  continent: "all",
  popularTeam: "all",
  lang: localStorage.getItem("worldcup-lang") || "zh"
};

const els = {
  refreshState: document.querySelector("#refreshState"),
  scheduleView: document.querySelector("#scheduleView"),
  resultsView: document.querySelector("#resultsView"),
  scheduleList: document.querySelector("#scheduleList"),
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
  emptyTemplate: document.querySelector("#emptyTemplate")
};

function t(key) {
  return messages[state.lang][key] ?? messages.zh[key] ?? key;
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

function groupLabel(value) {
  if (state.lang === "en") return value;
  return String(value).replace(/^Group ([A-L])$/, "$1组");
}

function translatePlaceholderName(name) {
  if (state.lang === "en") return name;

  let match = String(name).match(/^Group ([A-L]) Winner$/);
  if (match) return `${match[1]}组第一`;

  match = String(name).match(/^Group ([A-L]) 2nd Place$/);
  if (match) return `${match[1]}组第二`;

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
  if (match) return `${match[1]}组第三名`;

  return name;
}

function displayTeamName(team) {
  const source = team.shortName || team.name;
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
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
  els.scheduleView.classList.toggle("active", view === "schedule");
  els.resultsView.classList.toggle("active", view === "results");
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

loadData();
