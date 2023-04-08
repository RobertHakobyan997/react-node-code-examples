const { resolve } = require('path');
const { readFileSync } = require('fs');
const { isEmpty, isObject, isEqual, merge, transform } = require('lodash');

const packageJson = readFileSync(resolve(process.cwd(), 'package.json')).toString();
const packageAwsJson = readFileSync(resolve(process.cwd(), 'package-aws.json')).toString();

const { dependencies, devDependencies } = JSON.parse(packageJson);
const { dependencies: awsDependencies, devDependencies: awsDevDependencies } = JSON.parse(packageAwsJson);

function difference(object, base) {
  function changes(object, base) {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key]))
          ? changes(value, base[key])
          : value;
      }
    });
  }

  return changes(object, base);
}

function filterNgpdPackages(diff) {
  for (const key in diff) {
    if (key.startsWith('ngpd')) delete diff[key];
  }
  return diff;
}

const diff = filterNgpdPackages(difference(merge(dependencies, devDependencies), merge(awsDependencies, awsDevDependencies)));

if (!isEmpty(diff)) {
  console.log(diff);
  throw new Error('Wrong version of packages');
}
