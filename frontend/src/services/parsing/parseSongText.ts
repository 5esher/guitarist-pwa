export type SongSegment = {
  type: "text" | "chord";
  value: string;
  position: number;
};

export type ParsedLine = {
  segments: SongSegment[];
  raw: string;
  lineStart: number;
};

export type ParsedSongText = {
  lines: ParsedLine[];
};

export const parseSongText = (text: string): ParsedSongText => {
  const lines = text.split(/\n/);
  let globalIndex = 0;

  const parsedLines = lines.map((line) => {
    const segments: SongSegment[] = [];
    let cursor = 0;
    const regex = /\[([^\]]+)\]/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      const [fullMatch, chord] = match;
      const start = match.index;
      if (start > cursor) {
        segments.push({
          type: "text",
          value: line.slice(cursor, start),
          position: globalIndex + cursor
        });
      }
      segments.push({
        type: "chord",
        value: chord,
        position: globalIndex + start
      });
      cursor = start + fullMatch.length;
    }

    if (cursor < line.length) {
      segments.push({
        type: "text",
        value: line.slice(cursor),
        position: globalIndex + cursor
      });
    }

    const parsedLine: ParsedLine = {
      segments,
      raw: line,
      lineStart: globalIndex
    };

    globalIndex += line.length + 1;
    return parsedLine;
  });

  return { lines: parsedLines };
};
