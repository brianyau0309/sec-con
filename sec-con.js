/**
 * A class to convert between seconds and a string in the format "HH:MM:SS"
 * @example
 * const SecCon = require("sec-con");
 * const secCon = new SecCon(10);
 * console.log(secCon.format('SS')); // 10
 */
class SecCon {
  #sec = 0;
  #validFormat = ["HH:MM:SS", "HH:MM", "MM:SS", "HH", "MM", "SS"];

  /**
   * Create a new instance of SecCon by passing a number or a string
   * @param {number|string} input The number of seconds or a string in the format "HH:MM:SS"
   * @returns {SecCon} The new instance of SecCon
   * @example
   * const secCon = new SecCon(10);
   * console.log(secCon.format('SS')); // 10
   * @example
   * const secCon
   * secCon = new SecCon("01:00:00");
   * console.log(secCon.format('SS')); // 3600
   */
  constructor(input, format = "HH:MM:SS") {
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
   * Validate the string to be in the format "HH:MM:SS"
   * @param {string} str The string to validate
   * @param {string} format The format to validate ["HH:MM:SS", "HH:MM", "MM:SS", "HH", "MM", "SS"];
   * @throws {Error} If the string is not in the format "HH:MM:SS"
   * @example
   * const secCon = new SecCon();
   * secCon.#validateString("01:00:00"); // undefined
   * secCon.#validateString("01:00"); // Error: Invalid string format
   */
  #validateString(string, format) {
    switch (format) {
      case "HH:MM:SS":
        if (!/^\d+:\d{2}:\d{2}$/.test(string))
          throw new Error("Invalid string format");
        const [, minutes, seconds] = string.split(":");
        if (parseInt(minutes) > 59 || parseInt(seconds) > 59)
          throw new Error("Invalid string format");
        break;
      case "HH:MM":
      case "MM:SS":
        if (!/^\d+:\d{2}$/.test(string))
          throw new Error("Invalid string format");
        const [, last] = string.split(":");
        if (parseInt(last) > 59) throw new Error("Invalid string format");
        break;
      case "HH":
      case "MM":
      case "SS":
        if (!/^\d+$/.test(string)) throw new Error("Invalid string format");
    }
  }

  /**
   * Parse the string in the format "HH:MM:SS" to seconds
   * @param {string} str The string to parse
   * @param {string} format The format to validate ["HH:MM:SS", "HH:MM", "MM:SS", "HH", "MM", "SS"];
   * @returns {number} The number of seconds
   * @example
   * const secCon = new SecCon();
   * secCon.#parseString("01:00:00"); // 3600
   */
  #parseString(string, format) {
    let hours, minutes, seconds;
    switch (format) {
      case "HH:MM:SS":
        [hours, minutes, seconds] = string.split(":");
        return (
          this.#parseString(hours, "HH") +
          this.#parseString(minutes, "MM") +
          this.#parseString(seconds, "SS")
        );
      case "HH:MM":
        [hours, minutes] = string.split(":");
        return (
          this.#parseString(hours, "HH") + this.#parseString(minutes, "MM")
        );
      case "MM:SS":
        [minutes, seconds] = string.split(":");
        return (
          this.#parseString(minutes, "MM") + this.#parseString(seconds, "SS")
        );
      case "HH":
        return parseInt(string) * 3600;
      case "MM":
        return parseInt(string) * 60;
      case "SS":
        return parseInt(string);
    }
  }

  /**
   * Convert the number of seconds to a string in specific format
   * @param {string} format The format to convert to
   * @param {string} format The format to validate ["HH:MM:SS", "HH:MM", "MM:SS", "HH", "MM", "SS"];
   * @returns {string} The string in the specified format
   * @throws {Error} If the format is invalid
   * @example
   * const secCon = new SecCon(10);
   * console.log(secCon.format()); // 10
   * console.log(secCon.format('SS')); // 10
   * console.log(secCon.format('MM:SS')); // 00:10
   * console.log(secCon.format('HH:MM:SS')); // 00:00:10
   */
  format(format = "SS", padding = 0) {
    let HH, MM, SS;
    switch (format) {
      case "HH:MM:SS":
        HH = this.format("HH").padStart(padding, "0");
        MM = String(Math.floor((this.#sec % 3600) / 60)).padStart(2, "0");
        SS = String(this.#sec % 60).padStart(2, "0");
        return `${HH}:${MM}:${SS}`;
      case "HH:MM":
        HH = this.format("HH").padStart(padding, "0");
        MM = String(Math.floor((this.#sec % 3600) / 60)).padStart(2, "0");
        return `${HH}:${MM}`;
      case "MM:SS":
        MM = this.format("MM").padStart(padding, "0");
        SS = String(this.#sec % 60).padStart(2, "0");
        return `${MM}:${SS}`;
      case "HH":
        return String(Math.floor(this.#sec / 3600));
      case "MM":
        return String(Math.floor(this.#sec / 60));
      case "SS":
        return String(this.#sec);
      default:
        throw new Error("Invalid format");
    }
  }
}

module.exports = SecCon;
