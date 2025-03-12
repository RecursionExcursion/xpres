import { findNpmPacakgeVersion } from "../../src/domains/express/lib/npm-pacakge-finder";

describe("findNpmPacakgeVersion Test", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns result of actual package", async () => {
    expect(!!(await findNpmPacakgeVersion("express"))).toEqual(true);
  });

  test("Return null if bad package", async () => {
    expect(await findNpmPacakgeVersion("")).toBeNull();
  });

  test("returns latest stable version when package exists", async () => {
    const mockJsonResponse = {
      versions: {
        "1.0.0": {},
        "1.0.1": {},
        "1.2.0-beta": {}, // Pre-release (should be ignored)
        "1.1.0": {},
      },
    };

    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockJsonResponse),
    } as unknown as Response);

    const result = await findNpmPacakgeVersion("some-package");

    expect(result).toBe("1.1.0");
  });

  test("returns null when fetch fails", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: jest.fn(),
    } as unknown as Response);

    const result = await findNpmPacakgeVersion("nonexistent-package");

    expect(result).toBeNull();
  });
});
