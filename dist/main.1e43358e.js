// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY"
  },
  IMAGE: {
    START: "start.png",
    TITLE: "title_bg800.jpg"
  },
  AUDIO: {
    TITLE: "tbd.mp3"
  },
  SPRITE: {
    SLIME: "slime.png"
  },
  TEXT: {
    INPUT: "inputs.html"
  }
};
exports.CST = CST;
},{}],"src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoadScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);

  function LoadScene() {
    _classCallCheck(this, LoadScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadScene).call(this, {
      key: _CST.CST.SCENES.LOAD
    }));
  }

  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "loadImages",
    value: function loadImages() {
      this.load.setPath("./assets/image");

      for (var prop in _CST.CST.IMAGE) {
        this.load.image(_CST.CST.IMAGE[prop], _CST.CST.IMAGE[prop]);
      }
    }
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      this.load.setPath("./assets/audio");

      for (var prop in _CST.CST.AUDIO) {
        this.load.audio(_CST.CST.AUDIO[prop], _CST.CST.AUDIO[prop]);
      }
    }
  }, {
    key: "loadSprites",
    value: function loadSprites(frameConfig) {
      this.load.setPath("./assets/sprite");

      for (var prop in _CST.CST.SPRITE) {
        this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], frameConfig);
      }
    }
  }, {
    key: "loadHTML",
    value: function loadHTML() {
      this.load.setPath("./assets/text");

      for (var prop in _CST.CST.TEXT) {
        this.load.html(_CST.CST.TEXT[prop], _CST.CST.TEXT[prop]);
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;

      // load image, spritesheet, sound
      // this.loadAudio();
      //this.load.spritesheet("slime", "./assets/sprite/slime.png", {frameHeight: 16, frameWidth: 16});
      //load atlases
      this.load.atlas("slime", "./assets/sprite/slime.png", "./assets/sprite/slime.json");
      this.loadSprites({
        frameHeight: 16,
        frameWidth: 16
      });
      this.loadImages();
      this.loadHTML(); // this.load.image("title_bg", "./assets/title_bg800.jpg");
      // this.load.image("play_button", "./assets/start.png")
      //this.load.audio("title_music", "./assets/some-song.mp3")
      // create loading bar

      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff //white

        }
      });
      /* 
      Loader Events:
          complete - when done loading everything
          progress - loader number progress in decimal
      */
      //simulate large load

      /*
      for (let i = 0; i < 100; i++) {
          this.load.spritesheet("grass_tile" + i, "./assets/grass_tile.png", {
              frameHeight: 32,
              frameWidth: 32
          });
      }
      */

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
        console.log(percent);
      });
      this.load.on("complete", function () {//this.scene.start(CST.SCENES.MENU, "Hello from Load Scene")
      });
      this.load.on("load", function (file) {
        console.log(file.src);
      });
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.start(_CST.CST.SCENES.MENU);
    }
  }]);

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js"}],"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: _CST.CST.SCENES.MENU
    }));
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {//this.load.html('infoform', './assets/text/inputs.html');
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      this.add.image(0, 0, _CST.CST.IMAGE.TITLE).setOrigin(0).setDepth;
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 20, _CST.CST.IMAGE.START).setDepth(1).setScale(0.10);
      playButton.alpha = 0.9;
      var text = this.add.text(10, 10, 'Evolution Simulator', {
        color: 'black',
        fontFamily: 'Arial',
        fontSize: '32px '
      }); // Input elements

      var element = this.add.dom(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100).createFromCache(_CST.CST.TEXT.INPUT).setDepth(2);
      element.addListener('click');
      this.slimeCount = "";
      this.mutationRate = "";
      this.treeCount = "";
      element.on('click', function (event) {
        if (event.target.name === 'submitButton') {
          console.log(this === element);
          console.log(this.constructor.name);
          console.log(event.target.constructor.name);
          this.slimeCount = element.getChildByName('slimeCount').value;
          this.mutationRate = element.getChildByName('mutationRate').value;
          this.treeCount = element.getChildByName('treeCount').value;
          console.log(this.slimeCount);

          if (this.slimeCount.value !== '' && this.mutationRate.value !== '' && this.treeCount.value !== '') {
            element.removeListener('click');
            console.log(this.slimeCount);
            console.log("clickety click!");
            console.log(this === element);
            console.log(this.constructor.name);
            this.scene.start(_CST.CST.SCENES.PLAY, {
              slimeCount: this.slimeCount,
              mutationRate: this.mutationRate,
              treeCount: this.treeCount
            });
          }
        }
      }, this); // // create audio
      // this.sound.pauseOnBlur = false;
      // this.sound.play("title_music", {
      //     loop: true
      // })

      /*
          PointerEvents:
              pointerover - hovering
              pointerout - not hovering
              pointerup - click and release
              pointerdown - just  click
        */

      playButton.setInteractive();
      playButton.on("pointerover", function () {
        playButton.setScale(0.12);
        playButton.clearAlpha();
      });
      playButton.on("pointerout", function () {
        playButton.setScale(0.10);
        playButton.alpha = 0.9; //this.scene.start();
      });
      playButton.on("pointerup", function (event) {
        console.log(_this.constructor.name);

        _this.scene.start(_CST.CST.SCENES.PLAY, {
          slimeCount: _this.slimeCount,
          mutationRate: _this.mutationRate,
          treeCount: _this.treeCount
        });

        playButton.setScale(0.10);
        playButton.clearAlpha();
      });
    } // update () {
    //     console.log(this.slimeCount.value)
    // }

  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.js"}],"src/Sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sprite =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(Sprite, _Phaser$Physics$Arcad);

  /**
   * 
   */
  function Sprite(scene, x, y, texture, frame) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sprite).call(this, scene, x, y, texture, frame));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setScale(1);

    _this.setOrigin(0, 0);

    scene.physics.world.enableBody(_assertThisInitialized(_this));
    _this.timeArray = [];
    _this.timedAgeArray = [];
    _this.generation = 1;
    _this.vision = 0;
    _this.maxHP = 150;
    _this.hp = 100;
    _this.speed = 0;
    _this.age = 0;
    _this.name = "";
    return _this;
  }

  _createClass(Sprite, [{
    key: "senescense",
    value: function senescense(time) {
      // Organism aging; modifies life
      if (time % 30 === 0 && this.timedAgeArray.includes(time) === false) {
        this.timedAgeArray.push(time);
        this.age += 1; //console.log(this.name + " is now age: " + this.age)

        this.hp -= this.age; //this.maxHP -=5
        // Lose 5 max health per "year" after age 5

        if (this.age > 5) {
          this.maxHP -= 10;
        }
      }
    }
  }, {
    key: "reproduce",
    value: function reproduce(nameCounter, key) {
      // Modifies life; creates new instance of organism
      if (this.age >= 2 && this.hp > 100) {
        //let offspring = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        var offspring = organisms.create(this.x, this.y, key);
        this.hp = this.hp / 2;
        offspring.hp = this.hp / 2;
        offspring.name = "Org" + nameCounter;
        return offspring;
      } else {
        return null;
      }
    }
  }, {
    key: "consume",
    value: function consume(food) {// Restores health; chance increased by speed
      // 80% base chance, each point of speed + 2%; 20% max
    }
  }, {
    key: "metabolise",
    value: function metabolise(rate, time) {
      // Daily process which lowers health
      // Increased by speed
      if (time % 2 === 0 && this.timeArray.includes(time) === false) {
        this.timeArray.push(time);
        this.hp = this.hp - rate; //console.log(this.hp + " HP Remaining for: " + this.name)
      }
    }
  }]);

  return Sprite;
}(Phaser.Physics.Arcade.Sprite);

exports.Sprite = Sprite;
},{}],"src/scenes/PlayScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;

var _CST = require("../CST");

var _Sprite = require("../Sprite");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PlayScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);

  function PlayScene() {
    _classCallCheck(this, PlayScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlayScene).call(this, {
      key: _CST.CST.SCENES.PLAY
    }));
  }

  _createClass(PlayScene, [{
    key: "init",
    value: function init(data) {
      console.log('init', data);
      this.slimeCount = data.slimeCount;
      this.mutationRate = data.mutationRate;
      this.treeCount = data.treeCount;
    }
  }, {
    key: "preload",
    value: function preload() {
      // Create animations
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('slime', {
          prefix: 'slime-0',
          start: 5,
          end: 8,
          suffix: '.png'
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: 'north',
        frames: this.anims.generateFrameNames('slime', {
          prefix: 'slime-0',
          start: 1,
          end: 4,
          suffix: '.png'
        }),
        frameRate: 15,
        repeat: -1
      });
      this.anims.create({
        key: 'south',
        frames: this.anims.generateFrameNames('slime', {
          prefix: 'slime-0',
          start: 5,
          end: 8,
          suffix: '.png'
        }),
        frameRate: 15,
        repeat: -1
      });
      this.anims.create({
        key: 'west',
        frames: this.anims.generateFrameNames('slime', {
          prefix: 'slime-',
          start: 9,
          end: 12,
          suffix: '.png'
        }),
        frameRate: 15,
        repeat: -1
      }); // Load map tiles

      this.load.image('tileset', './assets/maps/overworld_tileset_grass.png');
      this.load.tilemapTiledJSON('map', './assets/maps/evo-tileset.json');
      this.load.image('tree', './assets/image/overworld-92.png'); // Ouput files loaded to console

      this.load.on("load", function (file) {
        console.log(file.src);
      });
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //const map = this.make.tilemap({ key: 'map'});
      var map = this.add.tilemap('map'); //const tileset = map.addTilesetImage('evo-default', 'tileset');

      var tileset = map.addTilesetImage('evo-default', 'tileset'); // Layers

      var baseLayer = map.createStaticLayer("Base", tileset, 0, 0).setDepth(-1); //this.treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);
      //let waterLayer = map.createStaticLayer("Water", tileset, 0, 0);
      //const structureLayer = map.createStaticLayer("Structures", tileset, 0, 0).setDepth(0);

      this.trees = this.physics.add.group(); // Add trees group to the window object to make accessible in console

      window.trees = this.trees; // Create n number of trees at random locations troughout hte grid;

      for (var i = 0; i < this.treeCount; i++) {
        // Default 120
        var x = Phaser.Math.RND.between(0, 800);
        var y = Phaser.Math.RND.between(0, 600);
        this.trees.create(x, y, 'tree');
      } // Set tree hitbox size


      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.trees.getChildren()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tree = _step.value;
          tree.setSize(10, 10);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.gameTime = 0;
      this.nameCounter = 0; //let slime = this.physics.add.sprite(100, 330,'slime', 'slime-05.png');
      //let slime = new Sprite(this, 100, 100, CST.SPRITE.SLIME)
      //this.physics.add.existing() //manual add
      //window.slime = slime; // Add slime to window object to access from console.
      //slime.setInteractive().setAlpha(0.5)
      //this.input.on("gameobjectdown", this.onObjectClicked);

      this.organisms = this.physics.add.group({
        classType: _Sprite.Sprite
      });

      for (var _i = 0; _i < this.slimeCount; _i++) {
        var _x = Phaser.Math.RND.between(100, 500);

        var _y = Phaser.Math.RND.between(100, 300);

        this.organisms.create(_x, _y, 'slime');
        this.organisms.getChildren()[_i].name = "Org" + this.nameCounter;
        this.organisms.getChildren()[_i].speed = Phaser.Math.Between(0, 20);
        this.organisms.getChildren()[_i].vision = Phaser.Math.Between(0, 50);
        this.nameCounter++;
      }

      ;
      window.organisms = this.organisms; // Takes an array of objects and passes each of them to the given callback.

      Phaser.Actions.Call(this.organisms.getChildren(), function (organism) {
        // make item interactive
        organism.setInteractive();
        organism.setBounce(0.5, 0.5);
        organism.setCollideWorldBounds(true);
      }, this); //this.body.onWorldBounds = true;
      // this.physics.arcade.collide(this.organisms), (organism) => {
      //     organism.destroy();
      // }
      //slime.setCollideWorldBounds(true);
      // Text objects

      var timerText = this.add.text(16, 16, 'Timer: ' + 0, {
        fontSize: '12px',
        fill: '#fff'
      });
      var timer = this.time.addEvent({
        delay: 1000,
        callback: function callback() {
          _this.gameTime++;
          timerText.setText('Timer: ' + _this.gameTime);
        },
        callbackScope: this,
        repeat: -1
      });
      this.orgLabel = this.add.text(16, 42, 'THE LIVING', {
        fontSize: '13px',
        fill: '#000'
      }).setDepth(10);
      this.orgLabel.setAlpha(0.75);
      this.orgText = this.add.text(16, 55, '', {
        fontSize: '12px',
        fill: '#fff'
      }).setDepth(10);
      this.orgText.setAlpha(0.75);
      this.updateLabel = this.add.text(400, 42, 'UPDATES', {
        fontSize: '13px',
        fill: '#000'
      }).setDepth(10);
      this.updateLabel.setAlpha(0.75);
      this.updateText = this.add.text(400, 55, '', {
        fontSize: '12px',
        fill: '#fff'
      }).setDepth(10);
      this.updateText.setAlpha(0.75); // Respawn trees

      var treeTimer = this.time.addEvent({
        delay: 30000,
        callback: this.regrowTrees,
        callbackScope: this,
        repeat: -1
      }); // Map Collisions
      //this.physics.add.collider(slime, this.treeLayer);
      //this.physics.add.collider(slime, waterLayer);
      //this.physics.add.collider(this.organisms, this.treeLayer);

      this.physics.add.overlap(this.organisms, this.trees, this.collectTree, null, this); //this.physics.add.collider(this.organisms, waterLayer);

      this.physics.add.collider(this.organisms, this.organisms, function () {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _this.organisms.getChildren()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var org = _step2.value;

            _this.randomMovement(org);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }); // this.physics.add.collider(this.organisms, this.organisms, ()=> {
      //     for (let org of this.organisms.getChildren()) {
      //         this.randomMovement(org);
      //     }
      // });

      this.updateOutput = [];
      this.timedUpdate = this.time.addEvent({
        delay: 3000,
        callback: function callback() {
          _this.updateOutput.shift();
        },
        callbackScope: this,
        loop: true
      }); // Specify property
      //this.treeLayer.setCollisionByProperty({collide:true});
      //waterLayer.setCollisionByProperty({collide:true});
      // Map events 
      //by index
      // this.treeLayer.setTileIndexCallback([96], (Sprite) => {
      //     //console.log(Sprite.x, Sprite.y)
      //     Sprite.hp += 10
      // }, this)
      //treeLayer.removeTileAt(tile.x, tile.y)
      //this.treeLayer.renderDebug(this.add.graphics)

      /*
      gameobject events:
         animationstart
         animationrepeat
         animationupdate
         animationcomplete
      */
      //    slime.on("animationupdate", () => {
      //        console.log("ahhhhh")
      //    });
      //    slime.on("animationupdate", () => {
      //     console.log("LEVELUP")
      // });
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      //delta 16.666 @ 60fps -- delta is fps in milliseconds
      // this.physics.world.collide(slime, slime, (slime) => {
      //     slime.destroy();
      // })
      this.seconds = new Date().getUTCSeconds();
      this.slimeOutput = [];
      this.timerText; // this.movementAnim(slime);
      // this.randomMovement(slime);

      var organisms = this.organisms.getChildren(); // apply collision to group
      //this.physics.world.collide(organisms)
      // apply collision to group & slime
      // this.physics.world.collide(organisms, slime, (organisms, slime)=>{
      //     organisms.destroy()
      //     slime.destroy()
      // })
      //console.log(slime.hp)

      var numOrganisms = organisms.length;

      for (var i = 0; i < numOrganisms; i++) {
        if (organisms[i].hp <= 50) {
          organisms[i].setScale(0.5);
        } else if (organisms[i].hp > 50 && organisms[i].hp <= 75) {
          organisms[i].setScale(0.75);
        } else if (organisms[i].hp > 75 && organisms[i].hp <= 100) {
          organisms[i].setScale(1.0);
        } else if (organisms[i].hp > 100 && organisms[i].hp <= 125) {
          organisms[i].setScale(1.25);
        } else if (organisms[i].hp > 125 && organisms[i].hp <= 150) {
          organisms[i].setScale(1.50);
        } // if (slime.active === true) {
        //     //this.physics.accelerateToObject(organisms[i], slime)
        // }
        //console.log(organisms[i].hp)
        // movement


        this.movementAnim(organisms[i]);
        organisms[i].metabolise(2, this.gameTime);
        organisms[i].senescense(this.gameTime);
        this.cloneSprite(organisms[i]); // if (weeBabe != null) {
        //     weeBabe.setInteractive();
        // }

        if (organisms[i].body.velocity.x === 0 && organisms[i].body.velocity.y === 0) {
          this.randomMovement(organisms[i]);
        } else {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.trees.getChildren()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var tree = _step3.value;

              if (this.distanceToObject(organisms[i], tree) <= organisms[i].vision && tree.visible) {
                //organisms[i].setVelocity(0, 0)
                //console.log(this.distanceToObject(organisms[i], tree))
                //console.log(organisms[i].vision)
                this.physics.accelerateToObject(organisms[i], tree, 60, 30 + organisms[i].speed, 30 + organisms[i].speed);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } // Death loop


      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.organisms.getChildren()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var org = _step4.value;

          if (org.hp <= 0) {
            //console.log(org.name + " is dead :( at age " + org.age + "| Vision: " + org.vision + "| Speed: " + org.speed)
            this.updateOutput.push(org.name + " died at age " + org.age);
            org.destroy();
            numOrganisms = organisms.length;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      ; // Update Organism list

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.organisms.getChildren()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _org = _step5.value;
          this.slimeOutput.push(_org.name + ' Age: ' + _org.age + ' Gen: ' + _org.generation + ' HP: ' + Math.round(_org.hp) + ' Vision: ' + _org.vision + ' Speed: ' + _org.speed);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.orgText.setText(this.slimeOutput);
      this.updateText.setText(this.updateOutput);

      if (this.updateOutput.length > 8) {
        this.updateOutput.shift();
      }

      this.colorSlimes();
    }
  }, {
    key: "onObjectClicked",
    value: function onObjectClicked(pointer, gameObject) {
      gameObject.setScale(1.5);
    }
  }, {
    key: "movementAnim",
    value: function movementAnim(obj) {
      if (obj.active === true) {
        if (obj.body.velocity.y > 0) {
          obj.anims.play('south', true);
        } else if (obj.body.velocity.y < 0) {
          obj.anims.play('north', true);
        } else if (obj.body.velocity.x < 0) {
          obj.anims.play('west', true);
          obj.flipX = false;
        } else if (obj.body.velocity.x > 0) {
          obj.anims.play('west', true);
          obj.flipX = true;
        } else {
          obj.anims.play('idle', true);
        }
      }
    }
  }, {
    key: "randomMovement",
    value: function randomMovement(obj) {
      if (obj.active === true) {
        var d = Phaser.Math.Between(0, 500);

        if (d < 100 && d > 95) {
          obj.setVelocityY(35 + obj.speed);
        } else if (d < 95 && d > 90) {
          obj.setVelocityY(-35) - obj.speed;
        } else if (d < 90 && d > 85) {
          obj.setVelocityX(35 + obj.speed);
        } else if (d < 85 && d > 80) {
          obj.setVelocityX(-35 - obj.speed);
        } else if (d < 80 && d > 75) {
          obj.setVelocity(0, 0);
        }
      }
    }
  }, {
    key: "collectTree",
    value: function collectTree(sprite, tree) {
      tree.disableBody(true, true);
      sprite.hp += 10;

      if (sprite.hp > 150) {
        sprite.hp = 150;
      }
    }
  }, {
    key: "regrowTrees",
    value: function regrowTrees() {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.trees.getChildren()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var tree = _step6.value;
          tree.enableBody(false, tree.x, tree.y, true, true); //console.log("**Spring has sprung**")
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }, {
    key: "distanceToObject",
    value: function distanceToObject(obj1, obj2) {
      var distanceX = Math.abs(obj1.x - obj2.x);
      var distanceY = Math.abs(obj1.y - obj2.y);
      return distanceX + distanceY;
    }
  }, {
    key: "colorSlimes",
    value: function colorSlimes() {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.organisms.getChildren()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var org = _step7.value;

          if (org.speed > 9 && org.speed < 20) {
            org.setTint(0xff0000, 0xffe600, 0xffe600, 0xffe600);
          } else if (org.speed > 19) {
            org.setTint(0xf75482);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  }, {
    key: "cloneSprite",
    value: function cloneSprite(org) {
      if (org.age >= 2 && org.hp > 100) {
        var offspring = this.organisms.create(org.x, org.y, 'slime');
        org.hp = org.hp / 2;
        offspring.hp = org.hp / 2;
        offspring.name = "Org" + this.nameCounter;
        offspring.age = 0;
        offspring.vision = org.vision;
        offspring.generation = org.generation + 1;
        this.updateOutput.push(offspring.name + " was born");
        var mutate = Math.random();

        if (mutate < this.mutationRate * 0.01) {
          // 20% chance of mutation
          if (mutate < 0.10) {
            offspring.vision -= 3; //console.log("**Vision Mutation -3 for " + offspring.name);

            this.updateOutput.push(offspring.name + ' vision mutation -3');
          } else if (mutate > 0.10 && mutate < 0.21) {
            offspring.vision += 3; //console.log("**Vision Mutation +3 for " + offspring.name);

            this.updateOutput.push(offspring.name + ' vision mutation +3');
          }
        }

        ;
        offspring.speed = org.speed;
        mutate = Math.random();

        if (mutate < this.mutationRate * 0.01) {
          // Chance of mutation
          if (mutate < 0.10) {
            offspring.speed -= 3; //console.log("**Speed Mutation -3 for " + offspring.name);

            this.updateOutput.push(offspring.name + ' speed mutation -3');
          } else if (mutate > 0.10 && mutate < 0.21) {
            offspring.speed += 3; //console.log("**Speed Mutation +3 for " + offspring.name);

            this.updateOutput.push(offspring.name + ' speed mutation +3');
          }
        }

        ;
        this.nameCounter++;
        offspring.setInteractive();
        offspring.setCollideWorldBounds(true);
      }
    }
  }]);

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"../CST":"src/CST.js","../Sprite":"src/Sprite.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");

var _MenuScene = require("./scenes/MenuScene");

var _PlayScene = require("./scenes/PlayScene");

/** @types {import("../typings/phaser")} */
var game = new Phaser.Game({
  parent: 'phaser-tag',
  width: 800,
  height: 600,
  dom: {
    createContainer: true
  },
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _PlayScene.PlayScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
});
/*
//import Life from './life.js';
const gameState = {}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ababab',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 100,
            debug: true
        }
    },

    scene: {
        preload,
        create,
        update
    }


};
const game = new Phaser.Game(config);

let slime = "";
let timer = 0;
const healthbar = 100;

function preload () {
    // preload images, sounds & other assets
    //this.load.json('map', 'assets/grass.json')
    this.load.image('tileset', 'assets/TilesetGrass/overworld_tileset_grass.png');
    this.load.tilemapTiledJSON('map', 'assets/TilesetGrass/evo-tileset.json');
    //this.load.spritesheet('tiles', 'assets/grass.png', {frameWidth: 64, frameHeight: 64})
    this.load.multiatlas('slime', 'assets/slime.json', 'assets')
    this.load.spritesheet('slime_back', 'assets/slime1_back.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('slime_front', 'assets/slime1_front.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('slime_side', 'assets/slime1_side.png', {frameWidth: 16, frameHeight: 16})
    this.load.spritesheet('slime_explode', 'assets/slime_explode.png', {frameWidth: 16, frameHeight: 16})
};
function create () {


    // Layers


    // Add organism to scene (full spritesheet) -- .setBounce(10).setFriction(0)
    this.slime = this.physics.add.sprite(400, 330,'slime', 'slime-05.png');
    // label(this.slime)

    // Create animations
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('slime', {prefix: 'slime-0', start: 5, end: 8, suffix: '.png'}),
        frameRate:5,
        repeat: -1
    })
    this.anims.create({
        key: 'north',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-0', start: 1, end: 4, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    this.anims.create({
        key: 'south',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-0', start: 5, end: 8, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    this.anims.create({
        key: 'west',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-', start: 9, end: 12, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })

    //Group of organisms
    this.organisms = this.physics.add.group({
        key: 'slime',
        repeat: 4,
        setXY: {
            x: 400,
            y: 300,
            stepX: 80,
            stepY: 20
        }
    });

    //scale organism
    // Phaser.Actions.ScaleXY(this.organisms.getChildren(), -0.10,-0.10);

    // Takes an array of objects and passes each of them to the given callback.
    Phaser.Actions.Call(this.organisms.getChildren(), function(organism) {
        organism.speed = Math.random() * 2 + 1;
        // make item interactive
        organism.setInteractive();

    }, this);

    let locations = this.add.text(16, 16, 'location: 0, 0', { fontSize: '10px', fill: '#000' })
    this.orgLocations = this.add.group({
        //
    })

    this.slime.speed = 2;
    this.physics.world.bounds.width = map.widthInPixels-10;
    this.physics.world.bounds.height = map.heightInPixels-10;
    this.slime.setCollideWorldBounds(true);


    


    // Collision debugging (remove in production)
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // treeLayer.renderDebug(debugGraphics, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });
    
    
    
};
function update () {

    // Slime movement
    this.slime.setVelocityX(-64)
    movementAnim(this.slime)

        // Organism movement
        let organisms = this.organisms.getChildren();
        let numOrganisms = organisms.length;
    
        for (let i = 0; i < numOrganisms; i++) {

            // movement
            movementAnim(organisms[i]);
  
            if (timer < 10) {
                if (i === 0 || i === 1) {
                    organisms[i].setVelocityY(64);  
                } else if (i === 2 || i === 3) {
                    organisms[i].setVelocityX(64)
                } else if (i === 5) {
                    organisms[i].setVelocity(0,0)
                }
            }


                if (organisms[i].y >= 599) {
                    organisms[i].setVelocityY(-64)
                    //organisms[i].anims.play('north', true);
                } else if (organisms[i].y <= 1) {
                    organisms[i].setVelocityY(64);
                    //organisms[i].anims.play('south', true);
                } else if (organisms[i].x >= 799) {
                    organisms[i].setVelocityX(-64);
                    //organisms[i].anims.play('west', true)
                } else if (organisms[i].x <= 1) {
                    organisms[i].setVelocityX(64);
                    //organisms[i].anims.play('west', true)
                    //organisms[i].flipX = true;
                } else {
                    randomMovement(organisms[i])
                }
                
    // if (organisms[i].x >= this.organismMaxX && organisms[i].speed > 0) {
            //     organisms[i].speed *= -0.25;
            // } else if (organisms[i].x <= this.organismMinX && organisms[i].speed < 0) {
            //     organisms[i].speed *= -0.25;
            // }
            timer++
        };

    //this.slime.y -= this.slime.speed
    //this.slime.anims.play('north', true);

}; 






// function label(obj) {
//     const style = { font: "10px Arial", fill: "#ffffff"};
//     obj.label_score = this.add.text(20, 20, "0", style);
//     obj.hello_sprite.addChild(this.label_score)
// }

//locations = this.add.text(16, 16, 'location: 0, 0', { fontSize: '10px', fill: '#000' })

*/
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/PlayScene":"src/scenes/PlayScene.js"}],"../../.npm-packages/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59891" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.npm-packages/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map