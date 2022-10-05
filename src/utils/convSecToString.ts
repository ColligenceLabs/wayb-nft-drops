export function convSecToString(seconds: number): string {
  //days
  const days = Math.floor(seconds / (24 * 3600));
  seconds -= days * 24 * 3600;

  //hours
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;

  //minutes
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  //output
  return `${days > 9 ? days : '0' + days} days ${
    hours > 9 ? hours : '0' + hours
  }:${minutes > 9 ? minutes : '0' + minutes}:${
    seconds > 9 ? seconds.toFixed(0) : '0' + seconds.toFixed(0)
  }`;
}
