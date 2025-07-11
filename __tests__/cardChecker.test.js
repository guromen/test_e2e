import { isValidLuhn, getCardSystem } from "../src/cardChecker";

describe("isValidLuhn", () => {
  test("valid card numbers", () => {
    expect(isValidLuhn("4111111111111111")).toBe(true); // Visa
    expect(isValidLuhn("5500000000000004")).toBe(true); // MasterCard
    expect(isValidLuhn("340000000000009")).toBe(true); // Amex
    expect(isValidLuhn("6011000000000004")).toBe(true); // Discover
    expect(isValidLuhn("2202200197727769")).toBe(true); // Mir
    expect(isValidLuhn("3538308206016968")).toBe(true); // Jcb
    expect(isValidLuhn("36287984951435")).toBe(true); // Diners
  });
});

describe("getCardSystem", () => {
  test("Visa", () => {
    expect(getCardSystem("4")).toBe("visa");
  });

  test("Mir", () => {
    expect(getCardSystem("2")).toBe("mir");
  });
  test("MasterCard", () => {
    expect(getCardSystem("5")).toBe("mastercard");
  });

  test("Amex", () => {
    expect(getCardSystem("34")).toBe("amex");
    expect(getCardSystem("37")).toBe("amex");
  });

  test("Discover", () => {
    expect(getCardSystem("6011")).toBe("discover");
    expect(getCardSystem("6445")).toBe("discover");
    expect(getCardSystem("65")).toBe("discover");
  });

  test("JCB", () => {
    expect(getCardSystem("35")).toBe("jcb");
  });

  test("Diners Club", () => {
    expect(getCardSystem("30")).toBe("diners");
    expect(getCardSystem("36")).toBe("diners");
    expect(getCardSystem("38")).toBe("diners");
  });

  test("Unknown", () => {
    expect(getCardSystem("9")).toBe("unknown");
    expect(getCardSystem("123")).toBe("unknown");
    expect(getCardSystem("")).toBe("unknown");
  });
});
