export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "table"; headers: string[]; rows: (string | number)[][]; caption?: string }
  | { t: "bars"; items: { label: string; value: number; note?: string }[]; unit?: string; caption?: string }
  | { t: "stats"; items: { value: string; label: string }[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "world-cup-2026-format-explained",
    title: "World Cup 2026 format explained: 48 teams, 12 groups, and the new Round of 32",
    description:
      "The 2026 World Cup is the first with 48 teams. Here's how the new format works — 12 groups, a brand-new Round of 32, and how teams advance.",
    date: "2026-06-08",
    body: [
      { t: "p", text: "The 2026 World Cup, co-hosted by the United States, Canada and Mexico, is the biggest in history: 48 teams instead of 32, 104 matches instead of 64, and a tournament that runs from 11 June to 19 July 2026. If you learned the old format by heart, here's what actually changes." },
      { t: "h2", text: "12 groups of four" },
      { t: "p", text: "The 48 teams are split into 12 groups (A to L) of four. Every team plays the other three in its group once, so each side plays three group games. That part feels familiar — it's the qualification math after the group stage that's new." },
      { t: "h2", text: "Who advances: top two, plus the eight best third-placed teams" },
      { t: "p", text: "The top two from each group go through automatically — that's 24 teams. To get to a clean 32 for the knockouts, the eight best third-placed teams across all 12 groups also advance. That gives 32 teams and, for the first time, a Round of 32." },
      { t: "h2", text: "The knockout path" },
      { t: "p", text: "From the Round of 32 it's straight knockout football: Round of 32, Round of 16, quarter-finals, semi-finals, a third-place play-off, and the final at MetLife Stadium in New York/New Jersey. Win seven knockout games and you lift the trophy." },
      { t: "ul", items: [
        "48 teams, 12 groups of four",
        "Top 2 of each group advance (24 teams)",
        "Plus the 8 best third-placed teams (to 32)",
        "Round of 32 → 16 → quarter-finals → semis → final",
      ] },
      { t: "p", text: "Want to call it before a ball is kicked? Build your full bracket — group order, the eight third-placed qualifiers and every knockout tie — on our predictor." },
    ],
  },
  {
    slug: "best-third-placed-teams-explained",
    title: "How the 8 best third-placed teams qualify at World Cup 2026",
    description:
      "Finishing third in your group can still mean a place in the Round of 32. Here's how the eight best third-placed teams are decided and seeded.",
    date: "2026-06-08",
    body: [
      { t: "p", text: "With 12 groups but a 32-team knockout round, the World Cup 2026 needs eight more qualifiers beyond the 24 group winners and runners-up. Those slots go to the eight best third-placed teams — and the way they're ranked and slotted in is the trickiest part of the new format." },
      { t: "h2", text: "Ranking the third-placed teams" },
      { t: "p", text: "Each group produces one third-placed team — 12 in total. They're ranked against each other, primarily on points, then goal difference, goals scored, and further tiebreakers. The top eight advance; the bottom four are eliminated." },
      { t: "h2", text: "Why the bracket isn't fixed in advance" },
      { t: "p", text: "Here's the wrinkle: which Round-of-32 slot a third-placed team fills depends on which groups the qualifying third-placed teams come from. FIFA uses a published allocation table to assign them so that no team meets a group rival again too early. That's why two different sets of qualifying groups can send the same group winner to a completely different opponent." },
      { t: "h2", text: "What it means for your predictions" },
      { t: "p", text: "If you're filling in a bracket, you don't just pick who finishes third — you pick which eight third-placed teams are good enough to advance, and the official allocation handles the rest. Our predictor applies that exact allocation table, so your Round of 32 lines up the way the real draw would." },
    ],
  },
  {
    slug: "world-cup-2026-groups",
    title: "World Cup 2026 groups: all 48 teams and the full draw",
    description:
      "All 12 groups for the 2026 World Cup, from Group A to Group L — the complete 48-team draw in one place.",
    date: "2026-06-09",
    body: [
      { t: "p", text: "Here is the complete 2026 World Cup group-stage draw — all 12 groups of four, A through L. Co-hosts Mexico, Canada and the United States headline Groups A, B and D respectively." },
      { t: "ul", items: [
        "Group A: Mexico, South Korea, South Africa, Czechia",
        "Group B: Canada, Switzerland, Qatar, Bosnia & Herzegovina",
        "Group C: Brazil, Morocco, Scotland, Haiti",
        "Group D: USA, Paraguay, Australia, Türkiye",
        "Group E: Germany, Ecuador, Côte d'Ivoire, Curaçao",
        "Group F: Netherlands, Japan, Tunisia, Sweden",
      ] },
      { t: "ul", items: [
        "Group G: Belgium, Iran, Egypt, New Zealand",
        "Group H: Spain, Uruguay, Saudi Arabia, Cape Verde",
        "Group I: France, Senegal, Norway, Iraq",
        "Group J: Argentina, Austria, Algeria, Jordan",
        "Group K: Portugal, Colombia, Uzbekistan, DR Congo",
        "Group L: England, Croatia, Panama, Ghana",
      ] },
      { t: "h2", text: "What happens next" },
      { t: "p", text: "Each team plays three group games. The top two in every group advance, along with the eight best third-placed teams, into the Round of 32. Think you can call the order? Rank all 12 groups on our predictor and carry your picks through to the final." },
    ],
  },
  {
    slug: "how-to-fill-world-cup-2026-bracket",
    title: "How to fill out a World Cup 2026 bracket (and not get the Round of 32 wrong)",
    description:
      "A quick guide to filling in a 48-team World Cup 2026 bracket — group order, the eight third-placed qualifiers, and the knockout path to the final.",
    date: "2026-06-09",
    body: [
      { t: "p", text: "A 48-team bracket looks intimidating, but it breaks down into three simple steps. Here's how to fill one in without tripping over the new Round of 32." },
      { t: "h2", text: "Step 1: order every group" },
      { t: "p", text: "Start with the group stage. For each of the 12 groups, put the four teams in the order you think they'll finish. First and second place go straight through; third place might, and fourth is out." },
      { t: "h2", text: "Step 2: pick the eight best third-placed teams" },
      { t: "p", text: "You'll have 12 third-placed teams across the groups. Choose the eight you think are strong enough to sneak through. This is where most brackets go wrong — and where the official allocation decides who plays whom." },
      { t: "h2", text: "Step 3: play out the knockouts" },
      { t: "p", text: "From the Round of 32, pick a winner for every tie and follow it through the Round of 16, quarter-finals, semi-finals and final. Crown a champion, a runner-up and a third place — then share your bracket as an image and see if your friends agree." },
      { t: "p", text: "Our predictor does the fiddly bits for you: it applies FIFA's official third-place allocation table, auto-clears picks that no longer make sense when you change an earlier result, and exports a clean shareable image of your whole bracket." },
    ],
  },
  {
    slug: "world-cup-2026-host-cities-and-stadiums",
    title: "World Cup 2026 host cities and stadiums: all 16 venues",
    description:
      "The 2026 World Cup is spread across 16 cities in the United States, Canada and Mexico. Here's every host city and where the biggest matches are played.",
    date: "2026-06-07",
    body: [
      { t: "p", text: "The 2026 World Cup is the first staged across three countries, and the first with 16 host cities. Eleven are in the United States, two in Canada and three in Mexico, stretching from Vancouver in the north-west to Miami in the south-east." },
      { t: "h2", text: "United States (11)" },
      { t: "ul", items: ["Atlanta", "Boston (Foxborough)", "Dallas (Arlington)", "Houston", "Kansas City", "Los Angeles (Inglewood)", "Miami (Miami Gardens)", "New York / New Jersey (East Rutherford)", "Philadelphia", "San Francisco Bay Area (Santa Clara)", "Seattle"] },
      { t: "h2", text: "Canada (2)" },
      { t: "ul", items: ["Toronto", "Vancouver"] },
      { t: "h2", text: "Mexico (3)" },
      { t: "ul", items: ["Mexico City", "Guadalajara", "Monterrey"] },
      { t: "p", text: "The tournament opens in Mexico City and the final is played at MetLife Stadium in New York/New Jersey on 19 July 2026. Follow every fixture on the scores page, and call the whole thing on the predictor." },
    ],
  },
  {
    slug: "world-cup-2026-schedule-key-dates",
    title: "World Cup 2026 schedule: key dates from kickoff to the final",
    description:
      "When the 2026 World Cup starts, when the knockouts begin, and the date of the final — the key dates across all 104 matches.",
    date: "2026-06-07",
    body: [
      { t: "p", text: "The 2026 World Cup runs from 11 June to 19 July 2026 — at roughly 39 days and 104 matches, the longest and largest in the tournament's history." },
      { t: "h2", text: "Group stage" },
      { t: "p", text: "The group stage kicks off on 11 June with the host nations among the headline acts. Each of the 48 teams plays three group games over the opening two and a half weeks, with the final round of group matches kicking off simultaneously to keep things fair." },
      { t: "h2", text: "Knockouts" },
      { t: "p", text: "Then it's straight knockout football through these rounds:" },
      { t: "ul", items: ["Round of 32", "Round of 16", "Quarter-finals", "Semi-finals", "Third-place play-off", "Final — 19 July 2026, MetLife Stadium, New York/New Jersey"] },
      { t: "p", text: "Times for every match, in your local timezone, are on the scores page. Lock in your picks before kickoff on the predictor." },
    ],
  },
  {
    slug: "world-cup-2026-favourites",
    title: "World Cup 2026 favourites: the teams most tipped to win",
    description:
      "Who are the favourites for the 2026 World Cup? The contenders most commonly tipped — from holders Argentina to France, Brazil, Spain and England.",
    date: "2026-06-06",
    body: [
      { t: "p", text: "Picking a World Cup winner is a mug's game — but some teams start every tournament among the favourites. Here are the sides most commonly tipped for 2026, with the usual caveat that football rarely reads the script." },
      { t: "h2", text: "The usual contenders" },
      { t: "p", text: "Holders Argentina arrive as reigning champions. France, beaten finalists in 2022, have the depth to go all the way again. Brazil are perennial contenders, Spain and England carry strong squads, and Germany, Portugal and the Netherlands are never far away." },
      { t: "h2", text: "Home advantage" },
      { t: "p", text: "Co-hosts the United States, Mexico and Canada won't travel, will play in front of huge home crowds, and know the conditions. Home advantage has lifted host nations deep into tournaments before." },
      { t: "h2", text: "Room for surprises" },
      { t: "p", text: "With 48 teams and a new Round of 32, there are more games and more chances for an upset than ever. Think you can spot the dark horse? Build your bracket and back your call." },
    ],
  },
  {
    slug: "world-cup-2026-group-of-death",
    title: "World Cup 2026 Group of Death: which group is the toughest?",
    description:
      "Every World Cup has a 'Group of Death'. Here are the 2026 groups with the most punishing line-ups — and why they qualify.",
    date: "2026-06-06",
    body: [
      { t: "p", text: "The 'Group of Death' is the group where too many strong teams are drawn together and someone good is guaranteed to go home early. With only the top two assured of progress, the 2026 draw has a few contenders." },
      { t: "h2", text: "Group I — France, Senegal, Norway, Iraq" },
      { t: "p", text: "The standout candidate. France are among the favourites, Senegal are a powerhouse with real pedigree, and Norway bring Erling Haaland's goals. Two of those three miss out on automatic qualification." },
      { t: "h2", text: "Group L — England, Croatia, Panama, Ghana" },
      { t: "p", text: "England against the 2018 finalists Croatia is a heavyweight tie, with Ghana a dangerous third side." },
      { t: "h2", text: "Group G — Belgium, Iran, Egypt, New Zealand" },
      { t: "p", text: "Belgium and an Egypt side built around Mohamed Salah make this trickier than it first looks." },
      { t: "p", text: "Disagree on which is toughest? Rank every group your way on the predictor and see how the bracket falls out." },
    ],
  },
  {
    slug: "world-cup-2026-group-tiebreakers-explained",
    title: "How World Cup 2026 group standings and tiebreakers work",
    description:
      "Points, goal difference, head-to-head: the exact order of tiebreakers used to rank teams in the 2026 World Cup group stage.",
    date: "2026-06-05",
    body: [
      { t: "p", text: "Group games are worth three points for a win and one for a draw. The top two in each group advance automatically, and the eight best third-placed teams join them — so even the order of teams level on points matters." },
      { t: "h2", text: "The tiebreaker order" },
      { t: "p", text: "When two or more teams finish level on points, they're separated using these criteria, applied in order:" },
      { t: "ul", items: ["Goal difference across all group matches", "Goals scored across all group matches", "Points in the matches between the tied teams", "Goal difference in the matches between the tied teams", "Goals scored in the matches between the tied teams", "Fair-play points (fewer yellow and red cards)", "Drawing of lots"] },
      { t: "p", text: "That's why goal difference is so precious late in the group stage — and why ranking the third-placed teams comes down to the same fine margins. Put your own order in on the predictor." },
    ],
  },
  {
    slug: "what-is-new-world-cup-2026",
    title: "What's new at World Cup 2026 compared to 2022",
    description:
      "From 32 to 48 teams, a brand-new Round of 32, and three host nations — everything that's different about the 2026 World Cup.",
    date: "2026-06-05",
    body: [
      { t: "p", text: "If your mental model of the World Cup is still Qatar 2022, 2026 will need some recalibrating. This is the biggest format change in decades." },
      { t: "ul", items: ["48 teams instead of 32", "104 matches instead of 64", "12 groups of four instead of 8", "A brand-new Round of 32 knockout round", "Three host nations — the USA, Canada and Mexico — for the first time", "The longest World Cup ever, at around 39 days"] },
      { t: "h2", text: "Why it matters" },
      { t: "p", text: "More nations means more first-timers and more unpredictability, and the new Round of 32 means finishing third in your group can still be enough. It also means a longer, denser schedule for fans to follow." },
      { t: "p", text: "New to the format? The full explainer walks through how teams advance — then put it into practice on the predictor." },
    ],
  },
  {
    slug: "world-cup-winners-list",
    title: "Every World Cup winner since 1930: the full list",
    description:
      "A complete table of every FIFA World Cup winner, runner-up and host from 1930 to 2022 — sortable by year, champion or host.",
    date: "2026-06-10",
    body: [
      { t: "p", text: "Twenty-two World Cups have been played since 1930, and only eight nations have ever lifted the trophy. Here is the complete roll of champions, runners-up and hosts — tap any column header to sort it." },
      { t: "table", caption: "FIFA World Cup finals, 1930–2022",
        headers: ["Year", "Winner", "Runner-up", "Host"],
        rows: [
          [1930, "Uruguay", "Argentina", "Uruguay"],
          [1934, "Italy", "Czechoslovakia", "Italy"],
          [1938, "Italy", "Hungary", "France"],
          [1950, "Uruguay", "Brazil", "Brazil"],
          [1954, "West Germany", "Hungary", "Switzerland"],
          [1958, "Brazil", "Sweden", "Sweden"],
          [1962, "Brazil", "Czechoslovakia", "Chile"],
          [1966, "England", "West Germany", "England"],
          [1970, "Brazil", "Italy", "Mexico"],
          [1974, "West Germany", "Netherlands", "West Germany"],
          [1978, "Argentina", "Netherlands", "Argentina"],
          [1982, "Italy", "West Germany", "Spain"],
          [1986, "Argentina", "West Germany", "Mexico"],
          [1990, "West Germany", "Argentina", "Italy"],
          [1994, "Brazil", "Italy", "USA"],
          [1998, "France", "Brazil", "France"],
          [2002, "Brazil", "Germany", "Korea/Japan"],
          [2006, "Italy", "France", "Germany"],
          [2010, "Spain", "Netherlands", "South Africa"],
          [2014, "Germany", "Argentina", "Brazil"],
          [2018, "France", "Croatia", "Russia"],
          [2022, "Argentina", "France", "Qatar"],
        ] },
      { t: "p", text: "Will a 48-team field finally add a ninth name to this list? Make your call on the bracket predictor." },
    ],
  },
  {
    slug: "world-cup-most-titles-by-country",
    title: "Most World Cup titles by country",
    description:
      "Which countries have won the most World Cups? Brazil lead with five. The full breakdown of titles by nation, with the years they won.",
    date: "2026-06-10",
    body: [
      { t: "p", text: "Eight nations have shared all 22 World Cups between them. Brazil sit clear at the top with five stars on the shirt." },
      { t: "bars", unit: "", caption: "World Cup titles won (1930–2022)",
        items: [
          { label: "Brazil", value: 5 },
          { label: "Germany / West Germany", value: 4 },
          { label: "Italy", value: 4 },
          { label: "Argentina", value: 3 },
          { label: "France", value: 2 },
          { label: "Uruguay", value: 2 },
          { label: "England", value: 1 },
          { label: "Spain", value: 1 },
        ] },
      { t: "table", caption: "Titles and the years won",
        headers: ["Country", "Titles", "Years won"],
        rows: [
          ["Brazil", 5, "1958, 1962, 1970, 1994, 2002"],
          ["Germany", 4, "1954, 1974, 1990, 2014"],
          ["Italy", 4, "1934, 1938, 1982, 2006"],
          ["Argentina", 3, "1978, 1986, 2022"],
          ["France", 2, "1998, 2018"],
          ["Uruguay", 2, "1930, 1950"],
          ["England", 1, "1966"],
          ["Spain", 1, "2010"],
        ] },
    ],
  },
  {
    slug: "most-world-cup-appearances",
    title: "Teams with the most World Cup appearances",
    description:
      "Brazil are the only country to play at every World Cup. The nations with the most finals tournament appearances through 2022.",
    date: "2026-06-09",
    body: [
      { t: "p", text: "Brazil hold a record no one else can match: they have appeared at every single World Cup. Here are the most frequent participants through 2022 — sort by appearances to see the order." },
      { t: "table", caption: "World Cup finals appearances, through 2022",
        headers: ["Team", "Appearances"],
        rows: [
          ["Brazil", 22],
          ["Germany", 20],
          ["Italy", 18],
          ["Argentina", 18],
          ["Mexico", 17],
          ["Spain", 16],
          ["England", 16],
          ["France", 16],
          ["Uruguay", 14],
          ["Belgium", 14],
        ] },
      { t: "p", text: "With the field expanding to 48 teams in 2026, expect several nations to make their tournament debut and climb these counts in the years ahead." },
    ],
  },
  {
    slug: "world-cup-golden-boot-history",
    title: "World Cup Golden Boot winners: recent history",
    description:
      "Who won the World Cup Golden Boot at each recent tournament, and how many goals it took. From Schillaci in 1990 to Mbappé in 2022.",
    date: "2026-06-09",
    body: [
      { t: "p", text: "The Golden Boot goes to the tournament's top scorer. Tallies have hovered between five and eight goals for decades — here are the winners since 1990." },
      { t: "table", caption: "World Cup Golden Boot, 1990–2022",
        headers: ["Year", "Player", "Country", "Goals"],
        rows: [
          [2022, "Kylian Mbappé", "France", 8],
          [2018, "Harry Kane", "England", 6],
          [2014, "James Rodríguez", "Colombia", 6],
          [2010, "Thomas Müller", "Germany", 5],
          [2006, "Miroslav Klose", "Germany", 5],
          [2002, "Ronaldo", "Brazil", 8],
          [1998, "Davor Šuker", "Croatia", 6],
          [1994, "Oleg Salenko / Hristo Stoichkov", "Russia / Bulgaria", 6],
          [1990, "Salvatore Schillaci", "Italy", 6],
        ] },
      { t: "p", text: "It usually takes around six goals to win it — a useful benchmark if you are picking a top scorer for 2026." },
    ],
  },
  {
    slug: "biggest-world-cup-wins",
    title: "The biggest wins in World Cup history",
    description:
      "The most lopsided scorelines ever recorded at a World Cup, from Hungary's double-digit rout to Germany's famous 7-1 over Brazil.",
    date: "2026-06-08",
    body: [
      { t: "p", text: "World Cups usually reward tight margins, but a handful of matches turned into routs. These are among the biggest victories the tournament has seen." },
      { t: "table", caption: "Notable record scorelines",
        headers: ["Match", "Score", "Year"],
        rows: [
          ["Hungary – El Salvador", "10–1", 1982],
          ["Hungary – South Korea", "9–0", 1954],
          ["Yugoslavia – Zaire", "9–0", 1974],
          ["Sweden – Cuba", "8–0", 1938],
          ["Uruguay – Bolivia", "8–0", 1950],
          ["Germany – Saudi Arabia", "8–0", 2002],
          ["Portugal – North Korea", "7–0", 2010],
          ["Germany – Brazil", "7–1", 2014],
        ] },
      { t: "p", text: "The 2014 semi-final stands apart: a 7–1 against the host nation remains the most shocking of them all." },
    ],
  },
  {
    slug: "host-nation-world-cup-record",
    title: "How often does the host nation win the World Cup?",
    description:
      "Six host nations have won the World Cup on home soil. The full record, and what it might mean for the USA, Mexico and Canada in 2026.",
    date: "2026-06-08",
    body: [
      { t: "p", text: "Playing at home has historically been a real edge. Six of the 22 World Cups have been won by the host nation." },
      { t: "stats", items: [
        { value: "6", label: "Hosts won" },
        { value: "27%", label: "Of tournaments" },
        { value: "22", label: "World Cups" },
        { value: "3", label: "Hosts in 2026" },
      ] },
      { t: "table", caption: "Host nations that won at home",
        headers: ["Year", "Host & champion"],
        rows: [
          [1930, "Uruguay"],
          [1934, "Italy"],
          [1966, "England"],
          [1974, "West Germany"],
          [1978, "Argentina"],
          [1998, "France"],
        ] },
      { t: "p", text: "2026 has three hosts for the first time — the USA, Mexico and Canada. History says at least one of them should fancy a deep run." },
    ],
  },
  {
    slug: "world-cup-2026-confederation-breakdown",
    title: "World Cup 2026: where the 48 teams come from",
    description:
      "How the 48 World Cup 2026 places are split between confederations — Europe, Africa, Asia, South America and beyond.",
    date: "2026-06-07",
    body: [
      { t: "p", text: "The jump to 48 teams gave every confederation more places. Here is how the field breaks down by region." },
      { t: "bars", unit: " slots", caption: "Confederation places in the 48-team field",
        items: [
          { label: "UEFA (Europe)", value: 16, note: "33%" },
          { label: "CAF (Africa)", value: 9, note: "19%" },
          { label: "AFC (Asia)", value: 8, note: "17%" },
          { label: "CONMEBOL (S. America)", value: 6, note: "13%" },
          { label: "CONCACAF (N. America)", value: 6, note: "13%" },
          { label: "Inter-confederation play-off", value: 2, note: "4%" },
          { label: "OFC (Oceania)", value: 1, note: "2%" },
        ] },
      { t: "p", text: "Africa and Asia are the biggest winners from expansion, gaining places that should bring more first-time and returning nations to the tournament." },
    ],
  },
  {
    slug: "world-cup-2026-by-the-numbers",
    title: "World Cup 2026 by the numbers",
    description:
      "The headline figures for the 2026 World Cup: 48 teams, 104 matches, 16 cities, three host nations and more.",
    date: "2026-06-07",
    body: [
      { t: "p", text: "The biggest World Cup ever, in a single glance." },
      { t: "stats", items: [
        { value: "48", label: "Teams" },
        { value: "12", label: "Groups" },
        { value: "104", label: "Matches" },
        { value: "16", label: "Host cities" },
        { value: "3", label: "Host nations" },
        { value: "39", label: "Days" },
        { value: "32", label: "Reach knockouts" },
        { value: "1", label: "Champion" },
      ] },
      { t: "p", text: "It runs 11 June to 19 July 2026 across the USA, Canada and Mexico, with the final at MetLife Stadium in New York/New Jersey. Follow it on the scores page and call it on the predictor." },
    ],
  },
  {
    slug: "world-cup-format-history",
    title: "How the World Cup grew from 13 teams to 48",
    description:
      "The World Cup has expanded several times since 1930. A look at how the number of teams and matches changed on the way to 2026's 48-team format.",
    date: "2026-06-06",
    body: [
      { t: "p", text: "The 2026 expansion to 48 teams is the latest in a long line of growth spurts. Sort by teams or matches to see how the tournament ballooned." },
      { t: "table", caption: "Key expansions in World Cup format",
        headers: ["Year", "Teams", "Matches", "Format"],
        rows: [
          [1930, 13, 18, "Groups + knockout"],
          [1934, 16, 17, "Straight knockout"],
          [1982, 24, 52, "Two group stages"],
          [1998, 32, 64, "8 groups of 4"],
          [2026, 48, 104, "12 groups + Round of 32"],
        ] },
      { t: "p", text: "From 18 matches in 1930 to 104 in 2026 — almost six times as much football. The new Round of 32 is the structural change that makes the 48-team field work." },
    ],
  },
  {
    slug: "world-cup-2026-group-strength-ranking",
    title: "Ranking all 12 World Cup 2026 groups by strength",
    description:
      "Which 2026 World Cup group is the toughest? Our subjective, for-fun strength rating of all 12 groups from A to L.",
    date: "2026-06-05",
    body: [
      { t: "p", text: "Purely for fun, here is our subjective take on how tough each 2026 group looks on paper. It is an opinion, not a prediction — rank them yourself on the predictor and see if you agree." },
      { t: "bars", unit: "/100", caption: "Subjective group-strength rating (higher = tougher)",
        items: [
          { label: "Group I — France, Senegal, Norway, Iraq", value: 92 },
          { label: "Group L — England, Croatia, Panama, Ghana", value: 84 },
          { label: "Group E — Germany, Ecuador, Côte d'Ivoire, Curaçao", value: 80 },
          { label: "Group H — Spain, Uruguay, Saudi Arabia, Cape Verde", value: 79 },
          { label: "Group C — Brazil, Morocco, Scotland, Haiti", value: 77 },
          { label: "Group F — Netherlands, Japan, Tunisia, Sweden", value: 74 },
          { label: "Group K — Portugal, Colombia, Uzbekistan, DR Congo", value: 73 },
          { label: "Group G — Belgium, Iran, Egypt, New Zealand", value: 70 },
          { label: "Group J — Argentina, Austria, Algeria, Jordan", value: 66 },
          { label: "Group D — USA, Paraguay, Australia, Türkiye", value: 64 },
          { label: "Group A — Mexico, South Korea, South Africa, Czechia", value: 61 },
          { label: "Group B — Canada, Switzerland, Qatar, Bosnia & Herzegovina", value: 59 },
        ] },
      { t: "p", text: "Group I — France and Senegal alongside Erling Haaland's Norway — tops our list as the standout Group of Death." },
    ],
  },
  {
    slug: "world-cup-all-time-top-scorers",
    title: "World Cup all-time top scorers",
    description:
      "The leading goalscorers in World Cup history, from Miroslav Klose's record 16 down. A sortable table through the 2022 tournament.",
    date: "2026-06-11",
    body: [
      { t: "p", text: "Only one player has reached 16 World Cup goals. Here are the all-time leading scorers across every tournament through 2022 — tap a column to sort." },
      { t: "table", caption: "Most World Cup goals (through 2022)",
        headers: ["Player", "Country", "Goals"],
        rows: [
          ["Miroslav Klose", "Germany", 16],
          ["Ronaldo", "Brazil", 15],
          ["Gerd Müller", "West Germany", 14],
          ["Just Fontaine", "France", 13],
          ["Lionel Messi", "Argentina", 13],
          ["Pelé", "Brazil", 12],
          ["Kylian Mbappé", "France", 12],
          ["Sándor Kocsis", "Hungary", 11],
          ["Jürgen Klinsmann", "Germany", 11],
        ] },
      { t: "p", text: "Two of the top names — Messi and Mbappé — are still active, so 2026 could reshuffle this list at the very top." },
    ],
  },
  {
    slug: "confederations-world-cup-titles",
    title: "Which confederation has won the most World Cups?",
    description:
      "Every World Cup has been won by either Europe or South America. The title count by confederation, and what it means for 2026.",
    date: "2026-06-04",
    body: [
      { t: "p", text: "In 22 tournaments, the trophy has never left two continents. Europe and South America have shared every single World Cup between them." },
      { t: "bars", unit: " titles", caption: "World Cup titles by confederation (1930–2022)",
        items: [
          { label: "UEFA (Europe)", value: 12, note: "55%" },
          { label: "CONMEBOL (South America)", value: 10, note: "45%" },
          { label: "All other confederations", value: 0, note: "0%" },
        ] },
      { t: "p", text: "No team from Africa, Asia, North America or Oceania has reached a final. With expansion to 48 teams in 2026, plenty of fans are hoping that finally changes." },
    ],
  },
  {
    slug: "teams-never-won-world-cup",
    title: "The best teams never to win the World Cup",
    description:
      "Netherlands, Hungary, Croatia and more — the strongest sides to reach a final or go deep without ever lifting the trophy.",
    date: "2026-06-03",
    body: [
      { t: "p", text: "Some great footballing nations have come agonisingly close without ever winning it all. Here are the most notable, with their best finish." },
      { t: "table", caption: "Best result without a title",
        headers: ["Team", "Best result"],
        rows: [
          ["Netherlands", "Runner-up ×3"],
          ["Hungary", "Runner-up ×2"],
          ["Czechoslovakia", "Runner-up ×2"],
          ["Croatia", "Runner-up (2018)"],
          ["Sweden", "Runner-up (1958)"],
          ["Belgium", "Third (1986, 2018)"],
          ["Portugal", "Third (1966)"],
          ["Mexico", "Quarter-finals"],
        ] },
      { t: "p", text: "The Netherlands are the unwanted record-holders: three finals, three defeats. Could 2026 finally end one of these waits?" },
    ],
  },
  {
    slug: "world-cup-hosts-history",
    title: "Every World Cup host nation since 1930",
    description:
      "A complete list of World Cup hosts from Uruguay 1930 to the three-nation 2026 tournament in the USA, Canada and Mexico.",
    date: "2026-06-03",
    body: [
      { t: "p", text: "The World Cup has criss-crossed the globe since 1930. Here is every host — note 2026 is the first shared by three countries." },
      { t: "table", caption: "World Cup hosts, 1930–2026",
        headers: ["Year", "Host"],
        rows: [
          [1930, "Uruguay"], [1934, "Italy"], [1938, "France"], [1950, "Brazil"],
          [1954, "Switzerland"], [1958, "Sweden"], [1962, "Chile"], [1966, "England"],
          [1970, "Mexico"], [1974, "West Germany"], [1978, "Argentina"], [1982, "Spain"],
          [1986, "Mexico"], [1990, "Italy"], [1994, "USA"], [1998, "France"],
          [2002, "Korea/Japan"], [2006, "Germany"], [2010, "South Africa"], [2014, "Brazil"],
          [2018, "Russia"], [2022, "Qatar"], [2026, "USA / Canada / Mexico"],
        ] },
      { t: "p", text: "Mexico becomes the first nation to host (or co-host) three times. Follow all 104 matches on the scores page." },
    ],
  },
  {
    slug: "biggest-upsets-world-cup",
    title: "The biggest upsets in World Cup history",
    description:
      "Saudi Arabia over Argentina, South Korea over Germany, the USA over England — the most famous shocks the World Cup has produced.",
    date: "2026-06-02",
    body: [
      { t: "p", text: "The World Cup loves a giant-killing. These are some of the most famous upsets the tournament has ever seen." },
      { t: "table", caption: "Famous World Cup shocks",
        headers: ["Match", "Score", "Year"],
        rows: [
          ["Saudi Arabia – Argentina", "2–1", 2022],
          ["South Korea – Germany", "2–0", 2018],
          ["Senegal – France", "1–0", 2002],
          ["Cameroon – Argentina", "1–0", 1990],
          ["Algeria – West Germany", "2–1", 1982],
          ["North Korea – Italy", "1–0", 1966],
          ["USA – England", "1–0", 1950],
        ] },
      { t: "p", text: "Argentina recovered from their 2022 shock to win the whole thing — proof that one bad result need not define a tournament." },
    ],
  },
  {
    slug: "world-cup-2026-final",
    title: "World Cup 2026 final: date and venue",
    description:
      "When and where is the 2026 World Cup final? Everything known about the showpiece at MetLife Stadium on 19 July 2026.",
    date: "2026-06-11",
    body: [
      { t: "p", text: "The 2026 World Cup final will be played on Sunday 19 July 2026 at MetLife Stadium in East Rutherford, New Jersey, just outside New York City." },
      { t: "h2", text: "The venue" },
      { t: "p", text: "MetLife Stadium is one of the largest venues at the tournament, seating around 82,000. It usually hosts the NFL's Giants and Jets, and will stage the World Cup's biggest night." },
      { t: "h2", text: "The road there" },
      { t: "p", text: "To reach it, a team must win four knockout rounds after the group stage: the Round of 32, Round of 16, quarter-final and semi-final. Play it all out on the predictor and crown your champion." },
    ],
  },
  {
    slug: "world-cup-2026-opening-match",
    title: "World Cup 2026 opening match: when and where",
    description:
      "The 2026 World Cup kicks off on 11 June with co-hosts Mexico at the iconic Estadio Azteca in Mexico City.",
    date: "2026-06-11",
    body: [
      { t: "p", text: "The 2026 World Cup begins on Thursday 11 June 2026, and tradition holds: a host nation gets the opening game." },
      { t: "h2", text: "Mexico at the Azteca" },
      { t: "p", text: "Co-hosts Mexico open the tournament at the legendary Estadio Azteca in Mexico City — the only stadium to have staged two previous World Cup finals (1970 and 1986). It is a fitting place to start the biggest World Cup yet." },
      { t: "p", text: "From that first whistle, 104 matches run across 39 days to the final on 19 July. Check kickoff times on the scores page." },
    ],
  },
  {
    slug: "world-cup-2026-round-of-32-explained",
    title: "World Cup 2026 Round of 32: how it works",
    description:
      "The 2026 World Cup introduces a Round of 32. Here's exactly which 32 teams qualify and how the new knockout round is built.",
    date: "2026-06-10",
    body: [
      { t: "p", text: "For the first time, the World Cup knockouts begin with a Round of 32. Here is how those 32 places are filled from the 12 groups." },
      { t: "stats", items: [
        { value: "12", label: "Group winners" },
        { value: "12", label: "Runners-up" },
        { value: "8", label: "Best thirds" },
        { value: "32", label: "Into the knockouts" },
      ] },
      { t: "p", text: "Every group's top two go through automatically, and the eight best third-placed teams complete the bracket. FIFA's official allocation table then decides which third-placed team is paired with which group winner, so no group rivals meet again too soon." },
      { t: "p", text: "Our predictor applies that exact allocation for you — pick the eight third-placed teams and the Round of 32 lines up correctly." },
    ],
  },
  {
    slug: "how-many-matches-world-cup-2026",
    title: "How many matches are at the World Cup 2026?",
    description:
      "The 2026 World Cup features 104 matches in total. Here's how that breaks down, and how many games a team plays to win it.",
    date: "2026-06-10",
    body: [
      { t: "p", text: "The 48-team format means a lot more football: 104 matches in total, up from 64 at recent tournaments." },
      { t: "stats", items: [
        { value: "104", label: "Total matches" },
        { value: "3", label: "Min per team" },
        { value: "7", label: "Max per team" },
        { value: "8", label: "Knockout rounds*" },
      ] },
      { t: "p", text: "Every team plays three group games. A side that goes all the way plays seven in total: three groups plus the Round of 32, Round of 16, quarter-final, semi-final and final. (*Counting the third-place play-off, there are six knockout match days across the bracket.)" },
    ],
  },
  {
    slug: "world-cup-2026-knockout-dates",
    title: "World Cup 2026 knockout stage dates",
    description:
      "When each World Cup 2026 knockout round is played, from the Round of 32 in late June to the final on 19 July.",
    date: "2026-06-10",
    body: [
      { t: "p", text: "After the group stage wraps up on 27 June, the 2026 World Cup goes straight into knockout football. Here is when each round is scheduled." },
      { t: "table", caption: "2026 World Cup schedule by round",
        headers: ["Round", "Dates"],
        rows: [
          ["Group stage", "11–27 June"],
          ["Round of 32", "28 June – 3 July"],
          ["Round of 16", "4–7 July"],
          ["Quarter-finals", "9–11 July"],
          ["Semi-finals", "14–15 July"],
          ["Third-place play-off", "18 July"],
          ["Final", "19 July"],
        ] },
      { t: "p", text: "Exact kickoff times, in your local timezone, are on the scores page as each round is confirmed." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
