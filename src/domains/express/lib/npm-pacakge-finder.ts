import semver from "semver";

export async function findNpmPacakgeVersion(packageName: string) {
  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`);

    console.log(res.ok);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const versionList = Object.keys(data.versions).filter(
      (v) => semver.valid(v) && semver.prerelease(v) === null
    );

    const latest = versionList[versionList.length - 1];

    return latest;
  } catch {
    return null;
  }
  //   return data.versions;
}
