"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ora = _interopRequireDefault(require("ora"));

var _fs = _interopRequireDefault(require("fs"));

var _template = require("./template");

// import util from 'util'
var init = function init(projectName) {
  _inquirer["default"].prompt([{
    name: 'description',
    message: 'Enter the project description: '
  }, {
    name: 'author',
    message: 'Enter the project author: '
  }, {
    type: 'confirm',
    name: 'typescript',
    message: 'Add typescript ?',
    "default": true
  }]).then(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(answers) {
      var repo, loading;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("\n".concat(JSON.stringify(answers, null, '\t'), "\n"));
              repo = answers.typescript ? 'wangyajundev/fe-helper#develop' : 'wangyajundev/fe-helper#master';
              loading = (0, _ora["default"])("downloading template[https://github.com/".concat(repo, "]\n"));
              loading.start();
              loading.color = 'yellow';
              (0, _template.downloadTemplate)(projectName, repo).then(function () {
                loading.succeed();
                var pkg = "".concat(projectName, "/package.json");

                if (_fs["default"].existsSync(pkg)) {
                  var data = _fs["default"].readFileSync(pkg).toString();

                  var json = JSON.parse(data);
                  json.name = projectName;
                  json.author = answers.author;
                  json.description = answers.description;

                  _fs["default"].writeFileSync(pkg, JSON.stringify(json, null, '\t'), 'utf-8');

                  console.log(_logSymbols["default"].success, _chalk["default"].green('Completed !\n'));
                  console.log("    cd ".concat(projectName, "\n"));
                  console.log('    npm install\n');
                  console.log('    npm start\n');
                }
              }, function (err) {
                console.log(err);
                loading.fail();
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

module.exports = init;