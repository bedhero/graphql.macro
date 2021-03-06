"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var CMD = _fs.default.realpathSync(process.cwd());

var jsconfigPath = _path.default.resolve(CMD, 'tsconfig.json');

var jsconfigInclude;

if (_fs.default.existsSync(jsconfigPath)) {
  var jsconfig = JSON.parse(_fs.default.readFileSync(jsconfigPath, 'utf8'));
  jsconfigInclude = jsconfig.include ? jsconfig.include[0] : null;
}

var resolveImportPath = function resolveImportPath(_ref) {
  var filename = _ref.filename,
      relativePath = _ref.relativePath;

  if (relativePath.startsWith('.')) {
    return _path.default.join(filename, '..', relativePath);
  }

  var resolvedPath = _path.default.resolve(CMD, jsconfigInclude || process.env.NODE_PATH || '.', relativePath);

  if (_fs.default.existsSync(resolvedPath)) {
    return resolvedPath;
  } // Note: Try to resolve from node_modules if the file does not exist. PR#39


  return _path.default.resolve(CMD, 'node_modules', relativePath);
};

var _default = resolveImportPath;
exports.default = _default;
module.exports = exports.default;