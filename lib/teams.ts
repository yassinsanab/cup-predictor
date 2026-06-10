// Confirmed 2026 final draw (March 2026 playoff slots resolved).
// `code` = ISO 3166-1 alpha-2 for flag-icons (GB subdivisions for the home nations).

export type Team = {
  name: string;
  code: string; // flag-icons class suffix, e.g. "br" -> fi-br
};

export type Group = {
  id: string; // "A".."L"
  teams: Team[];
};

export const GROUPS: Group[] = [
  { id: "A", teams: [
    { name: "Mexico", code: "mx" },
    { name: "South Korea", code: "kr" },
    { name: "South Africa", code: "za" },
    { name: "Czechia", code: "cz" },
  ]},
  { id: "B", teams: [
    { name: "Canada", code: "ca" },
    { name: "Switzerland", code: "ch" },
    { name: "Qatar", code: "qa" },
    { name: "Bosnia & Herzegovina", code: "ba" },
  ]},
  { id: "C", teams: [
    { name: "Brazil", code: "br" },
    { name: "Morocco", code: "ma" },
    { name: "Scotland", code: "gb-sct" },
    { name: "Haiti", code: "ht" },
  ]},
  { id: "D", teams: [
    { name: "United States", code: "us" },
    { name: "Paraguay", code: "py" },
    { name: "Australia", code: "au" },
    { name: "Türkiye", code: "tr" },
  ]},
  { id: "E", teams: [
    { name: "Germany", code: "de" },
    { name: "Ecuador", code: "ec" },
    { name: "Côte d'Ivoire", code: "ci" },
    { name: "Curaçao", code: "cw" },
  ]},
  { id: "F", teams: [
    { name: "Netherlands", code: "nl" },
    { name: "Japan", code: "jp" },
    { name: "Tunisia", code: "tn" },
    { name: "Sweden", code: "se" },
  ]},
  { id: "G", teams: [
    { name: "Belgium", code: "be" },
    { name: "Iran", code: "ir" },
    { name: "Egypt", code: "eg" },
    { name: "New Zealand", code: "nz" },
  ]},
  { id: "H", teams: [
    { name: "Spain", code: "es" },
    { name: "Uruguay", code: "uy" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "Cape Verde", code: "cv" },
  ]},
  { id: "I", teams: [
    { name: "France", code: "fr" },
    { name: "Senegal", code: "sn" },
    { name: "Norway", code: "no" },
    { name: "Iraq", code: "iq" },
  ]},
  { id: "J", teams: [
    { name: "Argentina", code: "ar" },
    { name: "Austria", code: "at" },
    { name: "Algeria", code: "dz" },
    { name: "Jordan", code: "jo" },
  ]},
  { id: "K", teams: [
    { name: "Portugal", code: "pt" },
    { name: "Colombia", code: "co" },
    { name: "Uzbekistan", code: "uz" },
    { name: "DR Congo", code: "cd" },
  ]},
  { id: "L", teams: [
    { name: "England", code: "gb-eng" },
    { name: "Croatia", code: "hr" },
    { name: "Panama", code: "pa" },
    { name: "Ghana", code: "gh" },
  ]},
];

// Tournament format facts (single source for copy + logic).
export const FORMAT = {
  teams: 48,
  groups: 12,
  matches: 104,
  window: "June 11 – July 19, 2026",
  hosts: "USA · Canada · Mexico",
  advance: "Top 2 of each group + the 8 best third-place teams reach the Round of 32",
} as const;
