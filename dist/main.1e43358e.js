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
      this.loadImages(); // this.load.image("title_bg", "./assets/title_bg800.jpg");
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
    key: "create",
    value: function create() {
      var _this = this;

      this.add.image(0, 0, _CST.CST.IMAGE.TITLE).setOrigin(0);
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 20, _CST.CST.IMAGE.START).setDepth(1).setScale(0.10);
      playButton.alpha = 0.9; // // create audio
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
      playButton.on("pointerup", function () {
        _this.scene.start(_CST.CST.SCENES.PLAY);

        playButton.setScale(0.10);
        playButton.clearAlpha();
      });
    }
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
    _this.hp = 100;
    _this.speed = 10;
    _this.age = 0;
    return _this;
  }

  _createClass(Sprite, [{
    key: "senescense",
    value: function senescense(loss) {
      // Organism aging; modifies life
      this.age += 1;
    }
  }, {
    key: "reproduce",
    value: function reproduce(mutationRate) {// Modifies life; creates new instance of organism
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
      if (time % 2 == 0 && this.timeArray.includes(time) === false) {
        this.timeArray.push(time);
        this.hp = this.hp - rate;
        console.log(this.hp + " HP Remaining");
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

      var waterLayer = map.createStaticLayer("Water", tileset, 0, 0); //const structureLayer = map.createStaticLayer("Structures", tileset, 0, 0).setDepth(0);

      this.trees = this.physics.add.group({
        key: 'tree',
        repeat: 12,
        setXY: {
          x: 100,
          y: 50 //setXY: {Phaser.Math.RandomXY(vec)}

        }
      });
      window.trees = this.trees;

      for (var i = 0; i < 50; i++) {
        var x = Phaser.Math.RND.between(0, 800);
        var y = Phaser.Math.RND.between(0, 600);
        this.trees.create(x, y, 'tree');
      }

      this.gameTime = 0; //let slime = this.physics.add.sprite(100, 330,'slime', 'slime-05.png');

      var slime = new _Sprite.Sprite(this, 100, 100, _CST.CST.SPRITE.SLIME); //this.physics.add.existing() //manual add

      window.slime = slime; // Add slime to window object to access from console.

      slime.setInteractive().setAlpha(0.5);
      this.input.on("gameobjectdown", this.onObjectClicked);
      this.organisms = this.physics.add.group({
        classType: _Sprite.Sprite,
        key: 'slime',
        repeat: 8,
        setXY: {
          x: 200,
          y: 300,
          stepX: 40,
          stepY: 0
        }
      });
      window.organisms = this.organisms; // this.organisms = this.physics.add.group()
      // this.organisms.add(slime)
      // Takes an array of objects and passes each of them to the given callback.

      Phaser.Actions.Call(this.organisms.getChildren(), function (organism) {
        // make item interactive
        organism.setInteractive();
        organism.setCollideWorldBounds(true);
      }, this); // this.physics.arcade.collide(this.organisms), (organism) => {
      //     organism.destroy();
      // }

      slime.setCollideWorldBounds(true);
      var timerText = this.add.text(16, 16, 'Timer: ' + 0, {
        fontSize: '10px',
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
      var orgText = this.add.text(16, 50, 'Slime List: ', {
        fontSize: '10px',
        fill: '#fff'
      }).setDepth(10); // Respawn trees

      var treeTimer = this.time.addEvent({
        delay: 30000,
        callback: this.regrowTrees,
        callbackScope: this,
        repeat: -1
      }); // Map Collisions

      this.physics.add.collider(slime, this.treeLayer);
      this.physics.add.collider(slime, waterLayer); //this.physics.add.collider(this.organisms, this.treeLayer);

      this.physics.add.overlap(this.organisms, this.trees, this.collectTree, null, this);
      this.physics.add.collider(this.organisms, waterLayer);
      this.physics.add.collider(this.organisms); // Specify property
      //this.treeLayer.setCollisionByProperty({collide:true});

      waterLayer.setCollisionByProperty({
        collide: true
      }); // Map events 
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
      this.timerText;
      this.movementAnim(slime);
      this.randomMovement(slime);
      var organisms = this.organisms.getChildren(); // apply collision to group

      this.physics.world.collide(organisms); // apply collision to group & slime

      this.physics.world.collide(organisms, slime, function (organisms, slime) {
        organisms.destroy();
        slime.destroy();
      }); //console.log(slime.hp)

      var numOrganisms = organisms.length;

      for (var i = 0; i < numOrganisms; i++) {
        // if (slime.active === true) {
        //     //this.physics.accelerateToObject(organisms[i], slime)
        // }
        //console.log(organisms[i].hp)
        // movement
        this.movementAnim(organisms[i]);
        organisms[i].metabolise(5, this.gameTime);
        this.randomMovement(organisms[i]);

        if (organisms[i].hp === 0) {
          organisms[i].destroy();
          numOrganisms = organisms.length;
        }
      }
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
          obj.setVelocityY(64); //obj.anims.play('north', true);
        } else if (d < 95 && d > 90) {
          obj.setVelocityY(-64); //obj.anims.play('south', true);
        } else if (d < 90 && d > 85) {
          obj.setVelocityX(64); //obj.anims.play('west', true);
          //obj.flipX = true;
        } else if (d < 85 && d > 80) {
          obj.setVelocityX(-64); //obj.anims.play('west', true);
          //obj.flipX = false; 
        } else if (d < 80 && d > 75) {
          obj.setVelocity(0, 0);
        }
      }
    }
  }, {
    key: "collectTree",
    value: function collectTree(sprite, tree) {
      //this.treeLayer.removeTileAt(tile.x, tile.y)
      tree.disableBody(true, true);
      sprite.hp += 10;
    }
  }, {
    key: "regrowTrees",
    value: function regrowTrees() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.trees.getChildren()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tree = _step.value;
          tree.enableBody(false, tree.x, tree.y, true, true);
          console.log("**Spring has sprung**");
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
    } // onEvent() {
    //     this.timerText.setText('Timer: ' + this.gameTime);
    //     console.log(this.gameTime)
    // }

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
  width: 800,
  height: 600,
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60033" + '/');

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