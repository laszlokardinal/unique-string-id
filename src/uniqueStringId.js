const UINT_MAX = 4294967296;

if (typeof process !== "undefined" && process.release.name === "node") {
  const os = require("os");

  const interfaces = os.networkInterfaces();

  const mac =
    Object.keys(interfaces)
      .map(key => interfaces[key])
      .reduce((a, b) => a.concat(b))
      .map(({ mac }) => mac)
      .find(mac => mac && mac !== "00:00:00:00:00:00") || "00:00:00:00:00:00";

  mac.split(":").join("");
} else {
  if (window !== "undefined") {
    const fingerprint = [
      window.navigator.userAgent.toLowerCase(),
      window.navigator.platform.toLowerCase(),
      window.navigator.languages
        ? window.navigator.languages.join(",")
        : window.navigator.language,
      Math.max(window.innerWidth, window.innerHeight),
      Math.min(window.innerWidth, window.innerHeight),
      Math.max(window.availWidth, window.availHeight),
      Math.min(window.availWidth, window.availHeight),
      window.screen.colorDepth,
      window.devicePixelRatio
    ]
      .filter(value => value)
      .join(" ");


  } else {
  }
}

/*

  6   timestamp

  6+  hash(fingerprint) / hash(react native deviceinfo) / mac)+ which
   hash
   random

      hash of parameter

      random

  ---------------------

  24  sum
*/

module.exports = (
  {
    now = () => Date.now(),
    random = () => Math.random(),
    btoa = (window && window.btoa) ||
      (str => new Buffer(str).toString("base64"))
  } = {}
) => {
  return prefix => {
    const buffer = new ArrayBuffer(24);

    const dataView = new DataView(buffer);

    // const prefixString = Math.max(
    //   0,
    //   Math.min(Math.floor(+prefix || 0), PREFIX_MAX - 1)
    // ).toString(16);

    // const timestampString = Math.min(now(), TIMESTAMP_MAX).toString(16);

    // const randomString = Math.floor(random() * RANDOM_MAX).toString(16);

    // const timestamp = now();

    // buffer[5] = timestamp % UINT_MAX;

    // buffer[5] = random() * UINT_MAX;
    // buffer[6] = random() * UINT_MAX;

    const binaryString = Array.prototype.slice
      .call(buffer)
      .map(byte => String.fromCharCode(byte))
      .join("");

    const base64String = btoa(binaryString);

    const urlSafeBase64String = base64String.replace(/\//g, "-");

    return urlSafeBase64String;
  };
};
