export const isTypeValid = (file, rule) => {
  if (file.type === '') {
    /*
     * This text/csv mime type is not supported by windows browsers.
     * At Windows Chrome/Firefox/IE11 mime type looks empty, and then upload is blocked
     * To prevent this issue, there must be some additional checks if file type is empty.
     *
     * Reference:
     * https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms775147(v=vs.85)?redirectedfrom=MSDN
     * https://cs.chromium.org/chromium/src/net/base/mime_util.cc?q=mime&sq=package:chromium&g=0&l=1
     * https://transferwise.slack.com/archives/CJNBX9CP6/p1580208301003500
     */
    const { navigator } = window;
    if (navigator && navigator.platform && navigator.platform.includes('Win')) {
      return true;
    }
  }

  if (rule === '*' || file.type === rule) {
    return true;
  }
  const splittedRule = rule.split('/');

  return splittedRule[1] === '*' && file.type.indexOf(splittedRule[0]) === 0;
};
