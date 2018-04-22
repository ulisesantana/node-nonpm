module.exports = Logger();

function Logger() {
  const CODES = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
  };

  const getFomattedString = (string, ...format) =>
    Object.values(CODES).filter(codeValue => format.includes(codeValue)).join('') + string + CODES.Reset;

  const getTimestamp = () =>
    new Date().toISOString();

  const colorize = (level, string, ...format) =>
    getTimestamp() + getFomattedString(` [${level.toUpperCase()}] ${string}`, ...format);

  const colorizeOnlyLevel = (level, string, ...format) =>
    getTimestamp() + getFomattedString(` [${level.toUpperCase()}] `, ...format) + string;

  const log = (level, string, ...format) => {
    let output;
    const textAndLevelColorized = ['error', 'warning'];
    string = typeof string === 'string' ? string : JSON.stringify(data, null, 2);

    if (textAndLevelColorized.includes(level.toLowerCase())) {
      output = colorize(level, string, ...format);
    } else {
      output = colorizeOnlyLevel(level, string, ...format);
    }
    console.log(output);
  };

  return {
    error(string) {
      log('error', string, CODES.FgRed);
    },
    warning(string) {
      log('warning', string, CODES.FgYellow);
    },
    info(string) {
      log('info', string, CODES.FgGreen);
    },
    verbose(string) {
      log('verbose', string, CODES.FgCyan);
    },
    debug(string) {
      log('debug', string, CODES.FgBlue);
    },
    silly(string) {
      log('silly', string, CODES.FgMagenta);
    },
  }

}