/**
 * A class to convert between seconds and a string in the format "H:M:S"
 * @example
 * const SecCon = require("sec-con");
 * const secCon = new SecCon(10);
 * console.log(secCon.format('S')); // 10
 */
class SecCon {
  #sec = 0;
  #validFormat = ["H:M:S",
    "H:M", "M:S", "H", "M", "S"];

  /**
   * Create a new instance of SecCon by passing a number or a string
   * @param {number|string} input The number of seconds or a string in the format "H:M:S"
   * @returns {SecCon} The new instance of SecCon
   * @example
   * const secCon = new SecCon(10);
   * console.log(secCon.format('S')); // 10
   * @example
   * const secCon
   * secCon = new SecCon("01:00:00");
   * console.log(secCon.format('S')); // 3600
   */
  constructor(input, format = "H:M:S") {
    if (typeof input === "number") {
      this.#sec = Math.floor(input);
    } else if (typeof input === "string") {
      if (!this.#validFormat.includes(format))
        throw new Error("Invalid format");
      this.#validateString(input, format);
      this.#sec = this.#parseString(input, format);
    } else {
      throw new Error("Invalid argument");
    }
  }

  /**
   * Validate the string to be in the format "H:M:S"
   * @param {string} str The string to validate
   * @param {string} format The format to validate ["H:M:S", "H:M", "M:S", "H", "M", "S"];
   * @throws {Error} If the string is not in the format "H:M:S"
   * @example
   * const secCon = new SecCon();
   * secCon.#validateString("01:00:00"); // undefined
   * secCon.#validateString("01:00"); // Error: Invalid string format
   */
  #validateString(string, format) {
    switch (format) {
      case "H:M:S":
        if (!/^\d+:\d{2}:\d{2}$/.test(string))
          throw new Error("Invalid string format");
        const [, minutes, seconds] = string.split(":");
        if (parseInt(minutes) > 59 || parseInt(seconds) > 59)
          throw new Error("Invalid string format");
        break;
      case "H:M":
      case "M:S":
        if (!/^\d+:\d{2}$/.test(string))
          throw new Error("Invalid string format");
        const [, last] = string.split(":");
        if (parseInt(last) > 59) throw new Error("Invalid string format");
        break;
      case "H":
      case "M":
      case "S":
        if (!/^\d+$/.test(string)) throw new Error("Invalid string format");
    }
  }

  /**
   * Parse the string in the format "H:M:S" to seconds
   * @param {string} str The string to parse
   * @param {string} format The format to validate ["H:M:S", "H:M", "M:S", "H", "M", "S"];
   * @returns {number} The number of seconds
   * @example
   * const secCon = new SecCon();
   * secCon.#parseString("01:00:00"); // 3600
   */
  #parseString(string, format) {
    let hours, minutes, seconds;
    switch (format) {
      case "H:M:S":
        [hours, minutes, seconds] = string.split(":");
        return (
          this.#parseString(hours, "H") +
          this.#parseString(minutes, "M") +
          this.#parseString(seconds, "S")
        );
      case "H:M":
        [hours, minutes] = string.split(":");
        return this.#parseString(hours, "H") + this.#parseString(minutes, "M");
      case "M:S":
        [minutes, seconds] = string.split(":");
        return (
          this.#parseString(minutes, "M") + this.#parseString(seconds, "S")
        );
      case "H":
        return parseInt(string) * 3600;
      case "M":
        return parseInt(string) * 60;
      case "S":
        return parseInt(string);
    }
  }

  /**
   * Convert the number of seconds to a string in specific format
   * @param {string} format The format to convert to
   * @param {string} format The format to validate ["H:M:S", "H:M", "M:S", "H", "M", "S"];
   * @returns {string} The string in the specified format
   * @throws {Error} If the format is invalid
   * @example
   * const secCon = new SecCon(10);
   * console.log(secCon.format()); // 10
   * console.log(secCon.format('S')); // 10
   * console.log(secCon.format('M:S')); // 00:10
   * console.log(secCon.format('H:M:S')); // 00:00:10
   */
  format(format = "S", padding = 0) {
    let H, M, S;
    switch (format) {
      case "H:M:S":
        H = this.format("H").padStart(padding, "0");
        M = String(Math.floor((this.#sec % 3600) / 60)).padStart(2, "0");
        S = String(this.#sec % 60).padStart(2, "0");
        return `${H}:${M}:${S}`;
      case "H:M":
        H = this.format("H").padStart(padding, "0");
        M = String(Math.floor((this.#sec % 3600) / 60)).padStart(2, "0");
        return `${H}:${M}`;
      case "M:S":
        M = this.format("M").padStart(padding, "0");
        S = String(this.#sec % 60).padStart(2, "0");
        return `${M}:${S}`;
      case "H":
        return String(Math.floor(this.#sec / 3600));
      case "M":
        return String(Math.floor(this.#sec / 60));
      case "S":
        return String(this.#sec);
      default:
        throw new Error("Invalid format");
    }
  }
}

module.exports = SecCon;
