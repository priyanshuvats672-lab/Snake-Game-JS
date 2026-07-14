# 🐍 Snake Game

> A classic Snake Game built entirely with **Vanilla HTML, CSS, and JavaScript** — no frameworks, no dependencies. Just pure web fundamentals.

![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Tech](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JS-orange?style=flat-square)
![Status](https://img.shields.io/badge/status-complete-brightgreen?style=flat-square)

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [State Management](#-state-management-approach)
- [Design Decisions](#-design-decisions)
- [Challenges Faced](#-challenges-faced)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [License](#-license)
- [Author](#-author)

---

## 🎮 Project Overview

This is a browser-based implementation of the classic **Snake Game** — one of the most iconic arcade games of all time. The snake moves continuously across a grid, eating food to grow longer and accumulate points. The game ends when the snake collides with itself.

Built as a **practice project**, it demonstrates core JavaScript concepts like DOM manipulation, interval-based game loops, keyboard event handling, collision detection, and browser `localStorage` for persisting high scores.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎮 **Classic Snake Gameplay** | Move the snake to eat food and grow longer |
| 🏆 **High Score Tracking** | Persists across sessions using `localStorage` |
| ⏱️ **Live Timer** | Counts up in `MM:SS` format while you play |
| 🔄 **Wrap-Around Movement** | Snake wraps to the opposite edge instead of dying at walls |
| 🚫 **Reverse-Direction Guard** | Prevents the snake from instantly reversing into itself |
| 💥 **Self-Collision Detection** | Game ends when the head hits any part of the body |
| 🪟 **Modal System** | Welcome modal on load; Game Over modal on collision |
| ♻️ **Restart Without Reload** | Full state reset without refreshing the browser |
| 🎨 **Dark Theme UI** | Clean dark aesthetic with CSS custom properties |
| 📐 **Responsive Grid Board** | Board dynamically computed from actual rendered dimensions |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Structure** | HTML5 (Semantic: `<main>`, `<section>`) |
| **Styling** | Vanilla CSS3 with CSS Custom Properties (`--variables`) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Persistence** | Browser `localStorage` API |
| **Rendering** | DOM-based grid (CSS Grid + class toggling) |
| **Game Loop** | `setInterval` — 300 ms tick rate |
| **Build Tools** | None — zero dependencies |

---

## 🏗️ Architecture

The game follows a simple **MVC-inspired, single-module architecture** with no bundler or framework. All logic lives in `script.js` and operates on a flat DOM structure defined in `index.html`.

```
┌──────────────────────────────────────────────────────┐
│                      index.html                      │
│  ┌──────────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  Info Bar    │  │  Board   │  │  Modal System  │  │
│  │ Score/Timer  │  │ (Grid)   │  │ Start/GameOver │  │
│  └──────────────┘  └──────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                      script.js                       │
│                                                      │
│   State Variables ──► Game Loop (setInterval 300ms)  │
│         │                    │                       │
│         │              render()                      │
│         │            ┌───────┴────────┐              │
│         │         update()      draw snake/food      │
│         │       ┌────┴────┐                          │
│         │   move head  collision check               │
│         │   eat food?  ──► gameOver()                │
│         ▼                                            │
│   localStorage  ◄──── highscore persistence          │
└──────────────────────────────────────────────────────┘
```

### Core Flow

1. **Init** — Grid blocks are rendered into `.board` using CSS Grid. Each block is stored in a `blocks` lookup object keyed by `"row-col"`.
2. **Start** — `startGame()` is triggered by button click; starts `setInterval` for both the game loop and the timer.
3. **Tick** — Every 300 ms, `render()` is called → clears old visuals → calls `update()` → redraws snake and food.
4. **Update** — Computes the new head position, checks for self-collision, consumes food if overlapping, otherwise pops the tail.
5. **Game Over** — `gameOver()` clears intervals and shows the Game Over modal.
6. **Restart** — `restartGame()` resets all state variables and starts a fresh loop.

---

## 📁 Folder Structure

```
Snake Game/
├── index.html      # Main HTML structure (board, info bar, modals)
├── style.css       # All styles — dark theme, grid, modal, tokens
├── script.js       # All game logic — state, loop, input, collision
└── README.md       # Project documentation
```

> **No build step. No dependencies. Open `index.html` in any browser and play.**

---

## ⚙️ Setup Instructions

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No Node.js, npm, or server required

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/snake-game.git

# 2. Navigate into the project directory
cd snake-game

# 3. Open in browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or simply **drag and drop** `index.html` into your browser window.

> **Optional**: Use a live-reload dev server for development:
> ```bash
> npx -y live-server .
> ```

---

## 🔐 Environment Variables

This project uses **no environment variables** and requires **no configuration files**. The only persistent state is a single key in `localStorage`:

| Key | Type | Description |
|---|---|---|
| `highscore` | `string` (numeric) | Stores the player's all-time high score |

To reset it manually:
```javascript
// Run in browser DevTools console
localStorage.removeItem('highscore');
```

---

## 🕹️ Usage

| Action | Key / Interaction |
|---|---|
| Start the game | Click **"Start the Game"** button |
| Move Up | `↑` Arrow Key |
| Move Down | `↓` Arrow Key |
| Move Left | `←` Arrow Key |
| Move Right | `→` Arrow Key |
| Restart after Game Over | Click **"Restart Game"** button |

### Scoring

- Each food item eaten → **+10 points**
- The score is displayed live in the info bar
- If the current score exceeds the stored high score, `localStorage` is updated immediately

### Timer

- Starts when "Start the Game" is clicked
- Counts up in `MM:SS` format
- Resets to `00:00` on restart

---

## 📸 Screenshots

> _Add screenshots to a `screenshots/` folder and update the paths below._

| Start Screen | Gameplay | Game Over |
|:---:|:---:|:---:|
| ![Start Screen](./screenshots/start.png) | ![Gameplay](./screenshots/gameplay.png) | ![Game Over](./screenshots/gameover.png) |

---

## 🧠 State Management Approach

The game uses **plain JavaScript module-level variables** as its single source of truth — no frameworks, no reactive stores.

### State Variables (`script.js`)

| Variable | Type | Purpose |
|---|---|---|
| `snake` | `Array<{x, y}>` | Ordered list of segment positions (head at index 0) |
| `food` | `{x, y}` | Current food position on the grid |
| `direction` | `string` | The direction the snake is *currently* moving |
| `nextDirection` | `string` | The direction queued by keyboard input (applied next tick) |
| `score` | `number` | Current session score |
| `highscore` | `number` | All-time high score (sourced from `localStorage`) |
| `time` | `string` | Display string for the timer (`MM:SS`) |
| `totalSec` | `number` | Raw seconds elapsed since game start |
| `isGameOver` | `boolean` | Guards against rendering after game ends |
| `gameInterval` | `number \| null` | `setInterval` ID for the game loop |
| `timeInervalId` | `number \| null` | `setInterval` ID for the timer |
| `blocks` | `Object<string, HTMLElement>` | Fast DOM lookup map keyed by `"row-col"` |

### State Update Pattern

```
keydown event
     │
     ▼
nextDirection (buffered)
     │
     ▼ (on next 300ms tick)
direction ← nextDirection
     │
     ▼
update() mutates snake[]
     │
     ▼
render() reflects snake[] → DOM class toggling
```

The `direction` / `nextDirection` double-buffer pattern prevents the snake from reversing into itself when multiple keys are pressed rapidly within a single tick.

---

## 🎨 Design Decisions

### 1. DOM-Based Grid Rendering (No `<canvas>`)
The board is a CSS Grid of `<div>` elements. Snake and food are rendered by **toggling CSS classes** (`.fill`, `.food`) rather than painting pixels on a `<canvas>`. This approach is simpler and better demonstrates DOM manipulation skills, which is appropriate for a learning project.

### 2. `blocks` Lookup Object
Instead of querying the DOM every tick with `querySelector`, all grid cells are pre-indexed into a plain object:
```js
blocks["row-col"] = HTMLElement
```
This gives **O(1) cell access** per tick, keeping the render loop efficient.

### 3. Wrap-Around Walls
Rather than triggering Game Over on wall collision, the snake wraps to the opposite side. This keeps gameplay smooth and extends session length, making it a more forgiving and enjoyable experience.

### 4. `nextDirection` Buffering
Keyboard input writes to `nextDirection`, not `direction`. The current `direction` is only committed at the start of each tick. This prevents a common bug where pressing two keys between ticks causes the snake to reverse into itself.

### 5. CSS Custom Properties for Design Tokens
All colors, spacing, and border radii are defined as CSS variables on `:root`. This makes the design system maintainable and easy to theme.

### 6. Modal-Based Game Flow
A single `.modal` element with two child panels (`.start-game` and `.game-over`) handles both the welcome screen and the Game Over screen. Visibility is toggled via `display` style, avoiding unnecessary DOM creation.

---

## 🚧 Challenges Faced

### 1. Self-Collision When Eating Food
**Problem:** When the snake eats food, its tail doesn't move that tick (the snake grows). A naive collision check against the full body would incorrectly flag the tail position as an obstacle.

**Solution:** The body slice used for collision is adjusted based on whether food was eaten:
```js
const bodyToCheck = ateFood ? snake : snake.slice(0, -1);
```

### 2. Reverse-Direction 180° Bug
**Problem:** If the player presses the opposite direction key, the head would collide with the neck on the very next tick — instant, unavoidable Game Over.

**Solution:** The `isOpposite()` utility filters out illegal direction changes before they are queued into `nextDirection`.

### 3. Dynamic Grid Sizing
**Problem:** The grid dimensions must be computed from the *rendered* board size, not hardcoded, to be layout-agnostic.

**Solution:** `cols` and `rows` are computed from `board.clientWidth` and `board.clientHeight` after the element is in the DOM, divided by the fixed `blockWidth` / `blockHeight` (80px).

### 4. Stale Timer on Restart
**Problem:** `totalSec` was not reset between sessions, causing the timer to continue from where it left off instead of resetting to zero.

**Solution:** `totalSec` and `time` are both reset to `0` and `"00-00"` at the top of `restartGame()`.

---

## 🚀 Future Improvements

- [ ] **Mobile/Touch Controls** — On-screen arrow buttons for touchscreen devices
- [ ] **Difficulty Levels** — Adjustable tick rate (Easy: 400ms, Medium: 300ms, Hard: 150ms)
- [ ] **Sound Effects** — Web Audio API sounds for eating food and game over
- [ ] **Animated Food** — Pulsing/glowing CSS animation on the food cell
- [ ] **Leaderboard** — Store top 5 scores with timestamps in `localStorage`
- [ ] **Pause / Resume** — `P` key or button to pause the game mid-session
- [ ] **Wall Collision Mode** — Toggle between wrap-around and wall-death modes
- [ ] **Snake Head Direction Indicator** — Visually distinguish the head from the body
- [ ] **Canvas Migration** — Rewrite rendering layer with `<canvas>` for better performance at scale
- [ ] **Progressive Web App (PWA)** — Add a Service Worker and manifest for offline play

---

## 📚 Learning Outcomes

Building this project reinforced and demonstrated the following concepts:

| Concept | Applied In |
|---|---|
| **DOM Manipulation** | Dynamically creating grid blocks, toggling classes for game state |
| **`setInterval` Game Loops** | Driving the 300 ms game tick and 1 s timer concurrently |
| **Keyboard Event Handling** | `keydown` listener with `event.key` for directional input |
| **Array as a Queue/Stack** | `snake.unshift(head)` to prepend, `snake.pop()` to remove tail |
| **Collision Detection** | `Array.some()` to check head overlap with body segments |
| **`localStorage` API** | Reading/writing persistent high score across browser sessions |
| **CSS Grid Layout** | Creating a responsive game board with `auto-fill` columns and rows |
| **CSS Custom Properties** | Centralized design token system for colors, spacing, and radii |
| **Double-Buffer Input Pattern** | `direction` vs `nextDirection` to prevent illegal moves |
| **Modular State Design** | Organizing all mutable game state at module scope |

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Priyanshu Vats

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Priyanshu Vats**

- GitHub: [@priyanshuvats](https://github.com/priyanshuvats)
- Project Repository: [Snake-Game-JS](https://github.com/priyanshuvats672-lab/Snake-Game-JS)

---

<div align="center">

Made with ❤️ and Vanilla JavaScript

⭐ Star this repo if you found it useful!

</div>
