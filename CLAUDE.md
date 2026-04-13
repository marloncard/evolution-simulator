# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Run dev server (bundle and serve):**
```
parcel index.html
```

**Run Python simulation (CLI mode):**
```
python controller.py
```

**Run Python tests:**
```
python -m pytest tests/
```

## Architecture

This is a dual-implementation evolution simulator: a web UI built with Phaser 3, and a standalone Python CLI version.

### Web Frontend (JavaScript/Phaser 3)

The game runs through three sequential Phaser scenes defined in `src/main.js`:
1. **LoadScene** — loads all assets (sprites, tilemaps, HTML fragments)
2. **MenuScene** — configuration form (population size, mutation rate, tree count)
3. **PlayScene** — the main simulation loop

**`src/Sprite.js`** defines the `Organism` class (extends `Phaser.Physics.Arcade.Sprite`). Core traits: `hp`, `age`, `speed`, `vision`, `generation`. Key methods: `senescense()` (aging/HP decay), `metabolise()`.

**`src/scenes/PlayScene.js`** drives the simulation each frame:
- Organisms seek food (trees) within their `vision` radius
- Organisms reproduce via `cloneSprite()` when age ≥ 2 and hp > 100; offspring mutate speed/vision by ±3
- Dead organisms are removed; trees respawn on a timer
- Every 30 seconds, stats (avg vision, avg speed, count, time) are appended to `window.dataPacket` (max 20 entries) for the ApexCharts graph

**`src/data.js`** initializes chart state. Charts and event logs are rendered in `dist/assets/text/` HTML fragments loaded into the DOM.

**`lib/phaser.js`** is the vendored Phaser 3 library (do not edit).

### Python Backend (CLI)

- **`controller.py`** — main loop (400 cycles); manages population (`ENV`), food (`FOOD`), and births counter
- **`models/organism.py`** — `Organism` class with `senescence()`, `reproduce()`, `consume()`, `metabolise()`
- **`models/environment.py`** — stub `Environment` class (incomplete)
- **`views.py`** — console output formatting
- **`styletext.py`** — terminal color helpers

The Python and JavaScript implementations are parallel but independent — changes to one do not affect the other.

### Evolutionary Mechanics

Organisms have two heritable traits: **speed** (0–20) and **vision** (0–50). Reproduction clones the parent and applies random mutations based on the configured mutation rate. Aging (`senescense`) progressively reduces max HP, creating mortality pressure. Food scarcity (limited trees) applies selection pressure favoring higher speed and vision.
