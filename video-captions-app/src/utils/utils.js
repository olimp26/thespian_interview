export function parseSRT(data) {
  const lines = data.split("\n");
  const entries = [];
  let i = 0;

  while (i < lines.length) {
    let indexLine = lines[i++].trim();
    if (!indexLine) continue;

    const index = parseInt(indexLine);
    if (isNaN(index)) continue;

    const timeLine = lines[i++].trim();
    const [start, end] = timeLine.split(" --> ").map(parseTime);

    let textLines = [];
    while (i < lines.length && lines[i].trim()) {
      textLines.push(lines[i++]);
    }

    i++;

    entries.push({
      index,
      start,
      end,
      text: textLines.join("\n").trim(),
    });
  }

  return entries;
}

function parseTime(timeStr) {
  const [hh, mm, ssMs] = timeStr.split(":");
  const [ss, ms] = ssMs.split(",");
  return (
    parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss) + parseInt(ms) / 1000
  );
}

export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};
