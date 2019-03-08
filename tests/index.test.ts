import { isValidHash, getFile, putFile, handler } from "../src/index";
import { type } from "os";

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
    let mockHash = "724ffd1adae4029476bcb51a8c6";
    expect(isValidHash(mockHash)).toBe(false);
  });
});

// *** GetFILE FUNCTION ***

describe("getFile Function", () => {
  test("Tests getFile function return type", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net/bzz:/",
      url: "ae217e61821fb9418a4cd3bbeb5c91ed2dc84988d268dbd601c9fbeb45d7d2ce"
    };

    expect.assertions(1);
    expect(getFile(mockArgs)).toBeInstanceOf(Promise);
  });

  test("getFile error", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.n",
      url: "ae"
    };
    expect.assertions(1);
    return expect(getFile(mockArgs)).rejects.toThrow();
  });

  test("getFile Contents", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net/bzz:/",
      url: "ae217e61821fb9418a4cd3bbeb5c91ed2dc84988d268dbd601c9fbeb45d7d2ce"
    };
    return expect(getFile(mockArgs)).resolves.toBe("Hello world");
  });

  test("Tests getFile function rejection", () => {
    const mockArgs = {
      gateway: "https://swarm-gateways.net/bzz:/",
      url: "a"
    };
    return getFile(mockArgs).catch(err => {
      expect(err).toBe(404);
    });
  });
});

describe("Tests getFile backward Compatibility", () => {
  test("getFile cb resolve ", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net/bzz:/",
      url: "ae217e61821fb9418a4cd3bbeb5c91ed2dc84988d268dbd601c9fbeb45d7d2ce"
    };
    return getFile(mockArgs, (err, res) => {
      if (!err) {
        expect(res).toBe("Hello world");
      }
    });
  });
  test("getFile cb reject statuscode", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net/bzz:/",
      url: "ce"
    };
    return getFile(mockArgs, (err, res) => {
      if (err) {
        expect(err).toBe(404);
      }
    });
  });

  test("getFile cb reject", () => {
    const mockArgs = {
      gateway: "",
      url: ""
    };
    return getFile(mockArgs, (err, res) => {
      if (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});

// **** PUTFILE FUNCTION ****

describe("PutFile Function", () => {
  test("Tests putFile function resolves", () => {
    const mockArgs = {
      gateway: "https://swarm-gateways.net",
      content: "Hello world"
    };



    return putFile(mockArgs)
      .then(res => {
        expect(res).toBe(
          "ae217e61821fb9418a4cd3bbeb5c91ed2dc84988d268dbd601c9fbeb45d7d2ce"
        );
      })
      .catch(err => {
        expect(err).toBe(501);
      });
  });

  test("Tests putFile function return type", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      content: ""
    };
    expect.assertions(1);
    expect(putFile(mockArgs)).toBeInstanceOf(Promise);
  });

  test("Tests putFile function rejection", () => {
    const mockArgs = {
      gateway: "http://swarm-g/",
      content: "Hellow world"
    };
    return putFile(mockArgs).catch(err => {
      expect(typeof err).toBe("object");
    });
  });
});

describe("putFile function backwards compatibility", () => {
  test("putFile cb resolve", () => {
    const mockArgs = {
      gateway: "https://swarm-gateways.net",
      content: "Hello world"
    };

    return putFile(mockArgs, (err, result) => {
      if (!err) {
        expect(result).toBe(
          "ae217e61821fb9418a4cd3bbeb5c91ed2dc84988d268dbd601c9fbeb45d7d2ce"
        );
      }
    });
  });
  test("putFile cb reject statuscode", () => {
    const mockArgs = {
      gateway: "https://swarm-gateways.net/hjb",
      content: ""
    };

    return putFile(mockArgs, (err, result) => {
      if (err) {
        expect(err).toBe(405);
      }
    });
  });
  test("putFile cb resolve", () => {
    const mockArgs = {
      gateway: "",
      content: ""
    };

    return putFile(mockArgs, (err, result) => {
      if (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});

// HANDLER FUNCTION

describe("Handler Function", () => {
  test("Test Handler function return type http", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      mode: "http"
    };

    expect(handler(mockArgs)).toBeInstanceOf(Object);
  });

  test("Test Handler function return type https", () => {
    const mockArgs = {
      gateway: "",
      mode: "https"
    };

    expect(handler(mockArgs)).toBeInstanceOf(Object);
  });

  test("Test Handler function to have get and put", () => {
    const mockArgs = {
      gateway: "http://swarm-gateways.net",
      mode: "http"
    };

    expect(handler(mockArgs)).toHaveProperty("get");
    expect(handler(mockArgs)).toHaveProperty("put");
  });
});
