import path from 'path';
import fs from 'fs';
var CMD = fs.realpathSync(process.cwd());
var jsconfigPath = path.resolve(CMD, 'tsconfig.json');
var jsconfigInclude;

if (fs.existsSync(jsconfigPath)) {
  var jsconfig = JSON.parse(fs.readFileSync(jsconfigPath, 'utf8'));
  jsconfigInclude = jsconfig.include ? jsconfig.include[0] : null;
}

var resolveImportPath = function resolveImportPath(_ref) {
  var filename = _ref.filename,
      relativePath = _ref.relativePath;

  if (relativePath.startsWith('.')) {
    return path.join(filename, '..', relativePath);
  }

  var resolvedPath = path.resolve(CMD, jsconfigInclude || process.env.NODE_PATH || '.', relativePath);

  if (fs.existsSync(resolvedPath)) {
    return resolvedPath;
  } // Note: Try to resolve from node_modules if the file does not exist. PR#39


  return path.resolve(CMD, 'node_modules', relativePath);
};

export default resolveImportPath;