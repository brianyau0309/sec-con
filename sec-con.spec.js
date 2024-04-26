const SecCon = require("./sec-con");

test("Valid input to construct SecCon", () => {
  expect(new SecCon(10)).toBeInstanceOf(SecCon);
  expect(new SecCon("00:00:10")).toBeInstanceOf(SecCon);
  expect(new SecCon("20:30", "H:M")).toBeInstanceOf(SecCon);
  expect(new SecCon("00:10", "M:S")).toBeInstanceOf(SecCon);
  expect(new SecCon("90", "H")).toBeInstanceOf(SecCon);
  expect(new SecCon("20", "M")).toBeInstanceOf(SecCon);
  expect(new SecCon("1234567890", "S")).toBeInstanceOf(SecCon);
});

test("Invalid input to construct SecCon class", () => {
  expect(() => new SecCon()).toThrow();
  expect(() => new SecCon(null)).toThrow();
  expect(() => new SecCon("")).toThrow();
  expect(() => new SecCon("1234567890")).toThrow();
  expect(() => new SecCon("01:90:00")).toThrow();
  expect(() => new SecCon("01:00:90")).toThrow();
  expect(() => new SecCon("ABC", "S")).toThrow();
  expect(() => new SecCon("01:00:90", "M:S")).toThrow();
  expect(() => new SecCon("00:90", "M:S")).toThrow();
  expect(() => new SecCon("00:90", "H:S")).toThrow();
  expect(() => new SecCon("01:00:90", "XX")).toThrow();
});

test("String input validation", () => {
  expect(() => new SecCon("01:00:00")).not.toThrow();
  expect(() => new SecCon("01:00")).toThrow();
});

test("Float number input", () => {
  expect(new SecCon(3600.5).format("S")).toBe("3600");
  expect(new SecCon(10.1).format("S")).toBe("10");
});

test("Formatting string", () => {
  expect(new SecCon(10).format("S")).toBe("10");
  expect(new SecCon("00:00:10").format("S")).toBe("10");
  expect(new SecCon("00:01:00").format("M")).toBe("1");
  expect(new SecCon("01:00:00").format("H")).toBe("1");
  expect(new SecCon("01:01:01").format("S")).toBe("3661");
  expect(new SecCon("00:20:01").format("M:S")).toBe("20:01");
  expect(new SecCon("01:01:01").format("M:S")).toBe("61:01");
  expect(new SecCon("01:01:01").format("H:M")).toBe("1:01");
  expect(new SecCon("01:01:01").format("H:M:S")).toBe("1:01:01");
  expect(new SecCon("00:02:01").format("M:S", 2)).toBe("02:01");
  expect(new SecCon("01:01:01").format("H:M", 2)).toBe("01:01");
  expect(new SecCon("01:01:01").format("H:M:S", 2)).toBe("01:01:01");
});

test("Formatting string with invalid format", () => {
  expect(() => new SecCon(10).format("XX")).toThrow();
  expect(() => new SecCon("00:00:10").format("XX")).toThrow();
});
