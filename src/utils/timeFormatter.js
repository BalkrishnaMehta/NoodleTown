export function timeFormatter([start, end]) {
  return formatTime(start) + " - " + formatTime(end);
}

function formatTime(time) {
  if (time > 12) {
    return `${time - 12}pm`;
  }
  return time + "am";
}
