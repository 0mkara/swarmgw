import { isValidHash, getFile, putFile, handler } from "../src/index";

describe("isValidHash", () => {
  test("Tests isValidhash function", () => {
    let mockHash = "j2nkr";
    expect(isValidHash(mockHash)).toBe(false);
  });

  test("Tests isValidhash function", () => {
    let mockHash =
      "931cc5a6bd57724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6";
    expect(isValidHash(mockHash)).toBe(true);
  });

  test("Tests isValidhash function", () => {
    let mockHash = "724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6";
    expect(isValidHash(mockHash)).toBe(false);
  });
});

describe("getFile Function", () => {
  test("Tests getFile function", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      url: "931cc5a6bd57724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6"
    };
    expect.assertions(1);
    expect(getFile(mockArgs)).toBeInstanceOf(Promise);
  });
});

describe("PutFile Function", () => {
  test("Tests putFile function resolves", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      content:
        "931cc5a6bd57724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6"
    };
    expect(putFile(mockArgs)).resolves.toBeTruthy();
  });

  test("Tests putFile function return type", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      content: ""
    };
    expect.assertions(1);
    expect(putFile(mockArgs)).toBeInstanceOf(Promise);
  });

  test("Tests putFile function", () => {
    const mockArgs = {
      gateway: "http://swarm",
      content: ""
    };
    expect(putFile(mockArgs)).rejects.toThrowError();
  });
});

describe("Handler Function", () => {
  test("Test Handler function", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      mode: "http"
    };

    expect.assertions(1);
    expect(handler(mockArgs)).toBeInstanceOf(Object);
  });

  test("Test Handler function", () => {
    const mockArgs = {
      gateway: "",
      mode: "https"
    };

    expect.assertions(1);
    expect(handler(mockArgs)).toBeInstanceOf(Object);
  });
});
