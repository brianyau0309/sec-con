const SecCon = require("./sec-con");

test("Valid input to construct SecCon", () => {
  expect(new SecCon(10)).toBeInstanceOf(SecCon);
  expect(new SecCon("00:00:10")).toBeInstanceOf(SecCon);
  expect(new SecCon("20:30", "HH:MM")).toBeInstanceOf(SecCon);
  expect(new SecCon("00:10", "MM:SS")).toBeInstanceOf(SecCon);
  expect(new SecCon("90", "HH")).toBeInstanceOf(SecCon);
  expect(new SecCon("20", "MM")).toBeInstanceOf(SecCon);
  expect(new SecCon("1234567890", "SS")).toBeInstanceOf(SecCon);
});

test("Invalid input to construct SecCon class", () => {
  expect(() => new SecCon()).toThrow();
  expect(() => new SecCon(null)).toThrow();
  expect(() => new SecCon("")).toThrow();
  expect(() => new SecCon("1234567890")).toThrow();
  expect(() => new SecCon("01:90:00")).toThrow();
  expect(() => new SecCon("01:00:90")).toThrow();
  expect(() => new SecCon("ABC", "SS")).toThrow();
  expect(() => new SecCon("01:00:90", "MM:SS")).toThrow();
  expect(() => new SecCon("00:90", "MM:SS")).toThrow();
  expect(() => new SecCon("00:90", "HH:SS")).toThrow();
  expect(() => new SecCon("01:00:90", "XX")).toThrow();
});

test("String input validation", () => {
  expect(() => new SecCon("01:00:00")).not.toThrow();
  expect(() => new SecCon("01:00")).toThrow();
});

test("Float number input", () => {
  expect(new SecCon(3600.5).format("SS")).toBe("3600");
  expect(new SecCon(10.1).format("SS")).toBe("10");
});

test("Formatting string", () => {
  expect(new SecCon(10).format("SS")).toBe("10");
  expect(new SecCon("00:00:10").format("SS")).toBe("10");
  expect(new SecCon("00:01:00").format("MM")).toBe("1");
  expect(new SecCon("01:00:00").format("HH")).toBe("1");
  expect(new SecCon("01:01:01").format("SS")).toBe("3661");
  expect(new SecCon("00:20:01").format("MM:SS")).toBe("20:01");
  expect(new SecCon("01:01:01").format("MM:SS")).toBe("61:01");
  expect(new SecCon("01:01:01").format("HH:MM")).toBe("1:01");
  expect(new SecCon("01:01:01").format("HH:MM:SS")).toBe("1:01:01");
  expect(new SecCon("00:02:01").format("MM:SS", 2)).toBe("02:01");
  expect(new SecCon("01:01:01").format("HH:MM", 2)).toBe("01:01");
  expect(new SecCon("01:01:01").format("HH:MM:SS", 2)).toBe("01:01:01");
});

test("Formatting string with invalid format", () => {
  expect(() => new SecCon(10).format("XX")).toThrow();
  expect(() => new SecCon("00:00:10").format("XX")).toThrow();
});
