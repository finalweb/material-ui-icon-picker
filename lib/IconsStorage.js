// MODIFIED
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _promiseDefer = require('promise-defer');

var _promiseDefer2 = _interopRequireDefault(_promiseDefer);

var _faIconsJson = require('./faIcons.json');

var _faIconsJson2 = _interopRequireDefault(_faIconsJson);

var instance = null;

var IconsStorage = (function () {
	function IconsStorage() {
		_classCallCheck(this, IconsStorage);

		if (instance) {
			return instance;
		}
		instance = this;
	}

	_createClass(IconsStorage, [{
		key: 'getIcons',
		value: function getIcons() {
			if (this.icons) {
				return this.icons;
			}

			var data = _faIconsJson2['default'].array;
			var icons = data.map(function (nameAndCode) {
				var parts = nameAndCode.split(':');
				return {
					code: parts[0],
					name: parts[1]
				};
			});
			this.icons = icons;

			return icons;
		}
	}]);

	return IconsStorage;
})();

exports['default'] = IconsStorage;
module.exports = exports['default'];