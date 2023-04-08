const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { uniqBy, flatMap, groupBy } = require('lodash');

const packageLockJson = readFileSync(resolve(process.cwd(), 'package-lock.json')).toString();
const { dependencies, packages } = JSON.parse(packageLockJson);
const directDependencies = packages[''].dependencies;
const directDevDependencies = packages[''].devDependencies;

function getPackageVersion(f) {
  return f.version.startsWith('^')
    ? f.version.substring(0, f.version.indexOf('.'))
    : f.version;
}

const finalPackagesInGroups = groupBy(
  uniqBy(
    Object.keys(directDependencies).map(key => ({ package: key, version: directDependencies[key] }))
      .concat(Object.keys(directDevDependencies).map(key => ({ package: key, version: directDevDependencies[key] })))
      .concat(flatMap(Object.keys(dependencies).map(key => {
        const dependenciesRequires = dependencies[key].requires;
        const dependenciesRequiresKeys = dependencies[key].requires ? Object.keys(dependencies[key].requires) : [];
        return dependenciesRequiresKeys.map(k => ({
          package: k,
          version: dependenciesRequires[k]
        }));
      })).filter(o => !!o))
    , f => `${f.package}${getPackageVersion(f)}`)
    .sort((a, b) => {
      if (a.package < b.package) return -1;
      if (a.package > b.package) return 1;
      if (a.package === b.package) {
        if (a.version < b.version) return -1;
        if (a.version > b.version) return 1;
      }
      return 0;
    }),
  f => f.package);
const groupKeys = Object.keys(finalPackagesInGroups);
const finalPackages = groupKeys.map(k => ({ package: k, versions: finalPackagesInGroups[k].map(p => p.version) }));
const uniqued = finalPackages.map(f => ({
  ...f,
  versions: f.versions.map(v => {
    if (v.indexOf('^') > 0 && f.versions.includes(v.replace('^', '~'))
      || v.indexOf('~') > 0 && f.versions.includes(v.replace('~', '')))
      return undefined;
    return v;
  }).filter(o => !!o)
}));
writeFileSync(resolve(process.cwd(), 'all-dependencies.json'),
  `[\n${uniqued.map(f => `"${f.package}: ${f.versions.join(' AND ')}"`).join(',\n')}\n]`);
