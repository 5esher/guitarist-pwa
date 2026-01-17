export type SeedChord = {
  name: string;
  fingering: {
    type: "svg";
    src: string;
    variants?: { type: "svg"; src: string }[];
  };
};

export type SeedSong = {
  title: string;
  author: string;
  originalKey: string;
  bpm: number;
  textWithChords: string;
};

export const seedChords: SeedChord[] = [
  { name: "C", fingering: { type: "svg", src: "/chords/C.svg", variants: [{ type: "svg", src: "/chords/C_variant.svg" }] } },
  { name: "Cm", fingering: { type: "svg", src: "/chords/Cm.svg" } },
  { name: "C7", fingering: { type: "svg", src: "/chords/C7.svg" } },
  { name: "Cmaj7", fingering: { type: "svg", src: "/chords/Cmaj7.svg" } },
  { name: "Csus2", fingering: { type: "svg", src: "/chords/Csus2.svg" } },
  { name: "Csus4", fingering: { type: "svg", src: "/chords/Csus4.svg" } },
  { name: "C#", fingering: { type: "svg", src: "/chords/Csharp.svg" } },
  { name: "C#m", fingering: { type: "svg", src: "/chords/Csharpm.svg" } },
  { name: "C#7", fingering: { type: "svg", src: "/chords/Csharp7.svg" } },
  { name: "C#maj7", fingering: { type: "svg", src: "/chords/Csharpmaj7.svg" } },
  { name: "C#sus2", fingering: { type: "svg", src: "/chords/Csharpsus2.svg" } },
  { name: "C#sus4", fingering: { type: "svg", src: "/chords/Csharpsus4.svg" } },
  { name: "Db", fingering: { type: "svg", src: "/chords/Dflat.svg" } },
  { name: "Dbm", fingering: { type: "svg", src: "/chords/Dflatm.svg" } },
  { name: "Db7", fingering: { type: "svg", src: "/chords/Dflat7.svg" } },
  { name: "Dbmaj7", fingering: { type: "svg", src: "/chords/Dflatmaj7.svg" } },
  { name: "Dbsus2", fingering: { type: "svg", src: "/chords/Dflatsus2.svg" } },
  { name: "Dbsus4", fingering: { type: "svg", src: "/chords/Dflatsus4.svg" } },
  { name: "D", fingering: { type: "svg", src: "/chords/D.svg" } },
  { name: "Dm", fingering: { type: "svg", src: "/chords/Dm.svg" } },
  { name: "D7", fingering: { type: "svg", src: "/chords/D7.svg" } },
  { name: "Dmaj7", fingering: { type: "svg", src: "/chords/Dmaj7.svg" } },
  { name: "Dsus2", fingering: { type: "svg", src: "/chords/Dsus2.svg" } },
  { name: "Dsus4", fingering: { type: "svg", src: "/chords/Dsus4.svg" } },
  { name: "D#", fingering: { type: "svg", src: "/chords/Dsharp.svg" } },
  { name: "D#m", fingering: { type: "svg", src: "/chords/Dsharpm.svg" } },
  { name: "D#7", fingering: { type: "svg", src: "/chords/Dsharp7.svg" } },
  { name: "D#maj7", fingering: { type: "svg", src: "/chords/Dsharpmaj7.svg" } },
  { name: "D#sus2", fingering: { type: "svg", src: "/chords/Dsharpsus2.svg" } },
  { name: "D#sus4", fingering: { type: "svg", src: "/chords/Dsharpsus4.svg" } },
  { name: "Eb", fingering: { type: "svg", src: "/chords/Eflat.svg" } },
  { name: "Ebm", fingering: { type: "svg", src: "/chords/Eflatm.svg" } },
  { name: "Eb7", fingering: { type: "svg", src: "/chords/Eflat7.svg" } },
  { name: "Ebmaj7", fingering: { type: "svg", src: "/chords/Eflatmaj7.svg" } },
  { name: "Ebsus2", fingering: { type: "svg", src: "/chords/Eflatsus2.svg" } },
  { name: "Ebsus4", fingering: { type: "svg", src: "/chords/Eflatsus4.svg" } },
  { name: "E", fingering: { type: "svg", src: "/chords/E.svg" } },
  { name: "Em", fingering: { type: "svg", src: "/chords/Em.svg" } },
  { name: "E7", fingering: { type: "svg", src: "/chords/E7.svg" } },
  { name: "Emaj7", fingering: { type: "svg", src: "/chords/Emaj7.svg" } },
  { name: "Esus2", fingering: { type: "svg", src: "/chords/Esus2.svg" } },
  { name: "Esus4", fingering: { type: "svg", src: "/chords/Esus4.svg" } },
  { name: "F", fingering: { type: "svg", src: "/chords/F.svg" } },
  { name: "Fm", fingering: { type: "svg", src: "/chords/Fm.svg" } },
  { name: "F7", fingering: { type: "svg", src: "/chords/F7.svg" } },
  { name: "Fmaj7", fingering: { type: "svg", src: "/chords/Fmaj7.svg" } },
  { name: "Fsus2", fingering: { type: "svg", src: "/chords/Fsus2.svg" } },
  { name: "Fsus4", fingering: { type: "svg", src: "/chords/Fsus4.svg" } },
  { name: "F#", fingering: { type: "svg", src: "/chords/Fsharp.svg" } },
  { name: "F#m", fingering: { type: "svg", src: "/chords/Fsharpm.svg" } },
  { name: "F#7", fingering: { type: "svg", src: "/chords/Fsharp7.svg" } },
  { name: "F#maj7", fingering: { type: "svg", src: "/chords/Fsharpmaj7.svg" } },
  { name: "F#sus2", fingering: { type: "svg", src: "/chords/Fsharpsus2.svg" } },
  { name: "F#sus4", fingering: { type: "svg", src: "/chords/Fsharpsus4.svg" } },
  { name: "Gb", fingering: { type: "svg", src: "/chords/Gflat.svg" } },
  { name: "Gbm", fingering: { type: "svg", src: "/chords/Gflatm.svg" } },
  { name: "Gb7", fingering: { type: "svg", src: "/chords/Gflat7.svg" } },
  { name: "Gbmaj7", fingering: { type: "svg", src: "/chords/Gflatmaj7.svg" } },
  { name: "Gbsus2", fingering: { type: "svg", src: "/chords/Gflatsus2.svg" } },
  { name: "Gbsus4", fingering: { type: "svg", src: "/chords/Gflatsus4.svg" } },
  { name: "G", fingering: { type: "svg", src: "/chords/G.svg" } },
  { name: "Gm", fingering: { type: "svg", src: "/chords/Gm.svg" } },
  { name: "G7", fingering: { type: "svg", src: "/chords/G7.svg" } },
  { name: "Gmaj7", fingering: { type: "svg", src: "/chords/Gmaj7.svg" } },
  { name: "Gsus2", fingering: { type: "svg", src: "/chords/Gsus2.svg" } },
  { name: "Gsus4", fingering: { type: "svg", src: "/chords/Gsus4.svg" } },
  { name: "G#", fingering: { type: "svg", src: "/chords/Gsharp.svg" } },
  { name: "G#m", fingering: { type: "svg", src: "/chords/Gsharpm.svg" } },
  { name: "G#7", fingering: { type: "svg", src: "/chords/Gsharp7.svg" } },
  { name: "G#maj7", fingering: { type: "svg", src: "/chords/Gsharpmaj7.svg" } },
  { name: "G#sus2", fingering: { type: "svg", src: "/chords/Gsharpsus2.svg" } },
  { name: "G#sus4", fingering: { type: "svg", src: "/chords/Gsharpsus4.svg" } },
  { name: "Ab", fingering: { type: "svg", src: "/chords/Aflat.svg" } },
  { name: "Abm", fingering: { type: "svg", src: "/chords/Aflatm.svg" } },
  { name: "Ab7", fingering: { type: "svg", src: "/chords/Aflat7.svg" } },
  { name: "Abmaj7", fingering: { type: "svg", src: "/chords/Aflatmaj7.svg" } },
  { name: "Absus2", fingering: { type: "svg", src: "/chords/Aflatsus2.svg" } },
  { name: "Absus4", fingering: { type: "svg", src: "/chords/Aflatsus4.svg" } },
  { name: "A", fingering: { type: "svg", src: "/chords/A.svg" } },
  { name: "Am", fingering: { type: "svg", src: "/chords/Am.svg" } },
  { name: "A7", fingering: { type: "svg", src: "/chords/A7.svg" } },
  { name: "Amaj7", fingering: { type: "svg", src: "/chords/Amaj7.svg" } },
  { name: "Asus2", fingering: { type: "svg", src: "/chords/Asus2.svg" } },
  { name: "Asus4", fingering: { type: "svg", src: "/chords/Asus4.svg" } },
  { name: "A#", fingering: { type: "svg", src: "/chords/Asharp.svg" } },
  { name: "A#m", fingering: { type: "svg", src: "/chords/Asharpm.svg" } },
  { name: "A#7", fingering: { type: "svg", src: "/chords/Asharp7.svg" } },
  { name: "A#maj7", fingering: { type: "svg", src: "/chords/Asharpmaj7.svg" } },
  { name: "A#sus2", fingering: { type: "svg", src: "/chords/Asharpsus2.svg" } },
  { name: "A#sus4", fingering: { type: "svg", src: "/chords/Asharpsus4.svg" } },
  { name: "Bb", fingering: { type: "svg", src: "/chords/Bflat.svg" } },
  { name: "Bbm", fingering: { type: "svg", src: "/chords/Bflatm.svg" } },
  { name: "Bb7", fingering: { type: "svg", src: "/chords/Bflat7.svg" } },
  { name: "Bbmaj7", fingering: { type: "svg", src: "/chords/Bflatmaj7.svg" } },
  { name: "Bbsus2", fingering: { type: "svg", src: "/chords/Bflatsus2.svg" } },
  { name: "Bbsus4", fingering: { type: "svg", src: "/chords/Bflatsus4.svg" } },
  { name: "B", fingering: { type: "svg", src: "/chords/B.svg" } },
  { name: "Bm", fingering: { type: "svg", src: "/chords/Bm.svg" } },
  { name: "B7", fingering: { type: "svg", src: "/chords/B7.svg" } },
  { name: "Bmaj7", fingering: { type: "svg", src: "/chords/Bmaj7.svg" } },
  { name: "Bsus2", fingering: { type: "svg", src: "/chords/Bsus2.svg" } },
  { name: "Bsus4", fingering: { type: "svg", src: "/chords/Bsus4.svg" } }
];

export const seedSongs: SeedSong[] = [
  {
    title: "Song 001",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 91,
    textWithChords: "[C]Line one with [Cm]chords\n[C7]Second line keeps the groove"
  },
  {
    title: "Song 002",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 92,
    textWithChords: "[Cm]Line one with [C7]chords\n[D]Second line keeps the groove"
  },
  {
    title: "Song 003",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 93,
    textWithChords: "[C7]Line one with [D]chords\n[Dm]Second line keeps the groove"
  },
  {
    title: "Song 004",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 94,
    textWithChords: "[D]Line one with [Dm]chords\n[D7]Second line keeps the groove"
  },
  {
    title: "Song 005",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 95,
    textWithChords: "[Dm]Line one with [D7]chords\n[E]Second line keeps the groove"
  },
  {
    title: "Song 006",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 96,
    textWithChords: "[D7]Line one with [E]chords\n[Em]Second line keeps the groove"
  },
  {
    title: "Song 007",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 97,
    textWithChords: "[E]Line one with [Em]chords\n[E7]Second line keeps the groove"
  },
  {
    title: "Song 008",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 98,
    textWithChords: "[Em]Line one with [E7]chords\n[F]Second line keeps the groove"
  },
  {
    title: "Song 009",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 99,
    textWithChords: "[E7]Line one with [F]chords\n[Fm]Second line keeps the groove"
  },
  {
    title: "Song 010",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 90,
    textWithChords: "[F]Line one with [Fm]chords\n[G]Second line keeps the groove"
  },
  {
    title: "Song 011",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 91,
    textWithChords: "[Fm]Line one with [G]chords\n[Gm]Second line keeps the groove"
  },
  {
    title: "Song 012",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 92,
    textWithChords: "[G]Line one with [Gm]chords\n[G7]Second line keeps the groove"
  },
  {
    title: "Song 013",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 93,
    textWithChords: "[Gm]Line one with [G7]chords\n[A]Second line keeps the groove"
  },
  {
    title: "Song 014",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 94,
    textWithChords: "[G7]Line one with [A]chords\n[Am]Second line keeps the groove"
  },
  {
    title: "Song 015",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 95,
    textWithChords: "[A]Line one with [Am]chords\n[A7]Second line keeps the groove"
  },
  {
    title: "Song 016",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 96,
    textWithChords: "[Am]Line one with [A7]chords\n[B]Second line keeps the groove"
  },
  {
    title: "Song 017",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 97,
    textWithChords: "[A7]Line one with [B]chords\n[Bm]Second line keeps the groove"
  },
  {
    title: "Song 018",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 98,
    textWithChords: "[B]Line one with [Bm]chords\n[B7]Second line keeps the groove"
  },
  {
    title: "Song 019",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 99,
    textWithChords: "[Bm]Line one with [B7]chords\n[C]Second line keeps the groove"
  },
  {
    title: "Song 020",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 90,
    textWithChords: "[B7]Line one with [C]chords\n[Cm]Second line keeps the groove"
  },
  {
    title: "Song 021",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 91,
    textWithChords: "[C]Line one with [Cm]chords\n[C7]Second line keeps the groove"
  },
  {
    title: "Song 022",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 92,
    textWithChords: "[Cm]Line one with [C7]chords\n[Cmaj7]Second line keeps the groove"
  },
  {
    title: "Song 023",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 93,
    textWithChords: "[C7]Line one with [Cmaj7]chords\n[Csus2]Second line keeps the groove"
  },
  {
    title: "Song 024",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 94,
    textWithChords: "[Cmaj7]Line one with [Csus2]chords\n[Csus4]Second line keeps the groove"
  },
  {
    title: "Song 025",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 95,
    textWithChords: "[Csus2]Line one with [Csus4]chords\n[C#]Second line keeps the groove"
  },
  {
    title: "Song 026",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 96,
    textWithChords: "[Csus4]Line one with [C#]chords\n[C#m]Second line keeps the groove"
  },
  {
    title: "Song 027",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 97,
    textWithChords: "[C#]Line one with [C#m]chords\n[C#7]Second line keeps the groove"
  },
  {
    title: "Song 028",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 98,
    textWithChords: "[C#m]Line one with [C#7]chords\n[C#maj7]Second line keeps the groove"
  },
  {
    title: "Song 029",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 99,
    textWithChords: "[C#7]Line one with [C#maj7]chords\n[C#sus2]Second line keeps the groove"
  },
  {
    title: "Song 030",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 90,
    textWithChords: "[C#maj7]Line one with [C#sus2]chords\n[C#sus4]Second line keeps the groove"
  },
  {
    title: "Song 031",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 91,
    textWithChords: "[C#sus2]Line one with [C#sus4]chords\n[Db]Second line keeps the groove"
  },
  {
    title: "Song 032",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 92,
    textWithChords: "[C#sus4]Line one with [Db]chords\n[Dbm]Second line keeps the groove"
  },
  {
    title: "Song 033",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 93,
    textWithChords: "[Db]Line one with [Dbm]chords\n[Db7]Second line keeps the groove"
  },
  {
    title: "Song 034",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 94,
    textWithChords: "[Dbm]Line one with [Db7]chords\n[Dbmaj7]Second line keeps the groove"
  },
  {
    title: "Song 035",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 95,
    textWithChords: "[Db7]Line one with [Dbmaj7]chords\n[Dbsus2]Second line keeps the groove"
  },
  {
    title: "Song 036",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 96,
    textWithChords: "[Dbmaj7]Line one with [Dbsus2]chords\n[Dbsus4]Second line keeps the groove"
  },
  {
    title: "Song 037",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 97,
    textWithChords: "[Dbsus2]Line one with [Dbsus4]chords\n[D]Second line keeps the groove"
  },
  {
    title: "Song 038",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 98,
    textWithChords: "[Dbsus4]Line one with [D]chords\n[Dm]Second line keeps the groove"
  },
  {
    title: "Song 039",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 99,
    textWithChords: "[D]Line one with [Dm]chords\n[D7]Second line keeps the groove"
  },
  {
    title: "Song 040",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 90,
    textWithChords: "[Dm]Line one with [D7]chords\n[Dmaj7]Second line keeps the groove"
  },
  {
    title: "Song 041",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 91,
    textWithChords: "[D7]Line one with [Dmaj7]chords\n[Dsus2]Second line keeps the groove"
  },
  {
    title: "Song 042",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 92,
    textWithChords: "[Dmaj7]Line one with [Dsus2]chords\n[Dsus4]Second line keeps the groove"
  },
  {
    title: "Song 043",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 93,
    textWithChords: "[Dsus2]Line one with [Dsus4]chords\n[D#]Second line keeps the groove"
  },
  {
    title: "Song 044",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 94,
    textWithChords: "[Dsus4]Line one with [D#]chords\n[D#m]Second line keeps the groove"
  },
  {
    title: "Song 045",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 95,
    textWithChords: "[D#]Line one with [D#m]chords\n[D#7]Second line keeps the groove"
  },
  {
    title: "Song 046",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 96,
    textWithChords: "[D#m]Line one with [D#7]chords\n[D#maj7]Second line keeps the groove"
  },
  {
    title: "Song 047",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 97,
    textWithChords: "[D#7]Line one with [D#maj7]chords\n[D#sus2]Second line keeps the groove"
  },
  {
    title: "Song 048",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 98,
    textWithChords: "[D#maj7]Line one with [D#sus2]chords\n[D#sus4]Second line keeps the groove"
  },
  {
    title: "Song 049",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 99,
    textWithChords: "[D#sus2]Line one with [D#sus4]chords\n[Eb]Second line keeps the groove"
  },
  {
    title: "Song 050",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 90,
    textWithChords: "[D#sus4]Line one with [Eb]chords\n[Ebm]Second line keeps the groove"
  },
  {
    title: "Song 051",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 91,
    textWithChords: "[Eb]Line one with [Ebm]chords\n[Eb7]Second line keeps the groove"
  },
  {
    title: "Song 052",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 92,
    textWithChords: "[Ebm]Line one with [Eb7]chords\n[Ebmaj7]Second line keeps the groove"
  },
  {
    title: "Song 053",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 93,
    textWithChords: "[Eb7]Line one with [Ebmaj7]chords\n[Ebsus2]Second line keeps the groove"
  },
  {
    title: "Song 054",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 94,
    textWithChords: "[Ebmaj7]Line one with [Ebsus2]chords\n[Ebsus4]Second line keeps the groove"
  },
  {
    title: "Song 055",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 95,
    textWithChords: "[Ebsus2]Line one with [Ebsus4]chords\n[E]Second line keeps the groove"
  },
  {
    title: "Song 056",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 96,
    textWithChords: "[Ebsus4]Line one with [E]chords\n[Em]Second line keeps the groove"
  },
  {
    title: "Song 057",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 97,
    textWithChords: "[E]Line one with [Em]chords\n[E7]Second line keeps the groove"
  },
  {
    title: "Song 058",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 98,
    textWithChords: "[Em]Line one with [E7]chords\n[Emaj7]Second line keeps the groove"
  },
  {
    title: "Song 059",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 99,
    textWithChords: "[E7]Line one with [Emaj7]chords\n[Esus2]Second line keeps the groove"
  },
  {
    title: "Song 060",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 90,
    textWithChords: "[Emaj7]Line one with [Esus2]chords\n[Esus4]Second line keeps the groove"
  },
  {
    title: "Song 061",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 91,
    textWithChords: "[Esus2]Line one with [Esus4]chords\n[F]Second line keeps the groove"
  },
  {
    title: "Song 062",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 92,
    textWithChords: "[Esus4]Line one with [F]chords\n[Fm]Second line keeps the groove"
  },
  {
    title: "Song 063",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 93,
    textWithChords: "[F]Line one with [Fm]chords\n[F7]Second line keeps the groove"
  },
  {
    title: "Song 064",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 94,
    textWithChords: "[Fm]Line one with [F7]chords\n[Fmaj7]Second line keeps the groove"
  },
  {
    title: "Song 065",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 95,
    textWithChords: "[F7]Line one with [Fmaj7]chords\n[Fsus2]Second line keeps the groove"
  },
  {
    title: "Song 066",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 96,
    textWithChords: "[Fmaj7]Line one with [Fsus2]chords\n[Fsus4]Second line keeps the groove"
  },
  {
    title: "Song 067",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 97,
    textWithChords: "[Fsus2]Line one with [Fsus4]chords\n[F#]Second line keeps the groove"
  },
  {
    title: "Song 068",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 98,
    textWithChords: "[Fsus4]Line one with [F#]chords\n[F#m]Second line keeps the groove"
  },
  {
    title: "Song 069",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 99,
    textWithChords: "[F#]Line one with [F#m]chords\n[F#7]Second line keeps the groove"
  },
  {
    title: "Song 070",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 90,
    textWithChords: "[F#m]Line one with [F#7]chords\n[F#maj7]Second line keeps the groove"
  },
  {
    title: "Song 071",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 91,
    textWithChords: "[F#7]Line one with [F#maj7]chords\n[F#sus2]Second line keeps the groove"
  },
  {
    title: "Song 072",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 92,
    textWithChords: "[F#maj7]Line one with [F#sus2]chords\n[F#sus4]Second line keeps the groove"
  },
  {
    title: "Song 073",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 93,
    textWithChords: "[F#sus2]Line one with [F#sus4]chords\n[Gb]Second line keeps the groove"
  },
  {
    title: "Song 074",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 94,
    textWithChords: "[F#sus4]Line one with [Gb]chords\n[Gbm]Second line keeps the groove"
  },
  {
    title: "Song 075",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 95,
    textWithChords: "[Gb]Line one with [Gbm]chords\n[Gb7]Second line keeps the groove"
  },
  {
    title: "Song 076",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 96,
    textWithChords: "[Gbm]Line one with [Gb7]chords\n[Gbmaj7]Second line keeps the groove"
  },
  {
    title: "Song 077",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 97,
    textWithChords: "[Gb7]Line one with [Gbmaj7]chords\n[Gbsus2]Second line keeps the groove"
  },
  {
    title: "Song 078",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 98,
    textWithChords: "[Gbmaj7]Line one with [Gbsus2]chords\n[Gbsus4]Second line keeps the groove"
  },
  {
    title: "Song 079",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 99,
    textWithChords: "[Gbsus2]Line one with [Gbsus4]chords\n[G]Second line keeps the groove"
  },
  {
    title: "Song 080",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 90,
    textWithChords: "[Gbsus4]Line one with [G]chords\n[Gm]Second line keeps the groove"
  },
  {
    title: "Song 081",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 91,
    textWithChords: "[G]Line one with [Gm]chords\n[G7]Second line keeps the groove"
  },
  {
    title: "Song 082",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 92,
    textWithChords: "[Gm]Line one with [G7]chords\n[Gmaj7]Second line keeps the groove"
  },
  {
    title: "Song 083",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 93,
    textWithChords: "[G7]Line one with [Gmaj7]chords\n[Gsus2]Second line keeps the groove"
  },
  {
    title: "Song 084",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 94,
    textWithChords: "[Gmaj7]Line one with [Gsus2]chords\n[Gsus4]Second line keeps the groove"
  },
  {
    title: "Song 085",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 95,
    textWithChords: "[Gsus2]Line one with [Gsus4]chords\n[G#]Second line keeps the groove"
  },
  {
    title: "Song 086",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 96,
    textWithChords: "[Gsus4]Line one with [G#]chords\n[G#m]Second line keeps the groove"
  },
  {
    title: "Song 087",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 97,
    textWithChords: "[G#]Line one with [G#m]chords\n[G#7]Second line keeps the groove"
  },
  {
    title: "Song 088",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 98,
    textWithChords: "[G#m]Line one with [G#7]chords\n[G#maj7]Second line keeps the groove"
  },
  {
    title: "Song 089",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 99,
    textWithChords: "[G#7]Line one with [G#maj7]chords\n[G#sus2]Second line keeps the groove"
  },
  {
    title: "Song 090",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 90,
    textWithChords: "[G#maj7]Line one with [G#sus2]chords\n[G#sus4]Second line keeps the groove"
  },
  {
    title: "Song 091",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 91,
    textWithChords: "[G#sus2]Line one with [G#sus4]chords\n[Ab]Second line keeps the groove"
  },
  {
    title: "Song 092",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 92,
    textWithChords: "[G#sus4]Line one with [Ab]chords\n[Abm]Second line keeps the groove"
  },
  {
    title: "Song 093",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 93,
    textWithChords: "[Ab]Line one with [Abm]chords\n[Ab7]Second line keeps the groove"
  },
  {
    title: "Song 094",
    author: "Guitarist Ensemble",
    originalKey: "E",
    bpm: 94,
    textWithChords: "[Abm]Line one with [Ab7]chords\n[Abmaj7]Second line keeps the groove"
  },
  {
    title: "Song 095",
    author: "Guitarist Ensemble",
    originalKey: "F",
    bpm: 95,
    textWithChords: "[Ab7]Line one with [Abmaj7]chords\n[Absus2]Second line keeps the groove"
  },
  {
    title: "Song 096",
    author: "Guitarist Ensemble",
    originalKey: "G",
    bpm: 96,
    textWithChords: "[Abmaj7]Line one with [Absus2]chords\n[Absus4]Second line keeps the groove"
  },
  {
    title: "Song 097",
    author: "Guitarist Ensemble",
    originalKey: "A",
    bpm: 97,
    textWithChords: "[Absus2]Line one with [Absus4]chords\n[A]Second line keeps the groove"
  },
  {
    title: "Song 098",
    author: "Guitarist Ensemble",
    originalKey: "B",
    bpm: 98,
    textWithChords: "[Absus4]Line one with [A]chords\n[Am]Second line keeps the groove"
  },
  {
    title: "Song 099",
    author: "Guitarist Ensemble",
    originalKey: "C",
    bpm: 99,
    textWithChords: "[A]Line one with [Am]chords\n[A7]Second line keeps the groove"
  },
  {
    title: "Song 100",
    author: "Guitarist Ensemble",
    originalKey: "D",
    bpm: 90,
    textWithChords: "[Am]Line one with [A7]chords\n[Amaj7]Second line keeps the groove"
  }
];
