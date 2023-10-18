# Tic-Tac-Toe

![Tic-Tac-Toe](https://github.com/SonDo580/tic-tac-toe/blob/main/client/public/demo.gif)

A real-time 2-player Tic-Tac-Toe game built with ReactJS, NodeJS, and Socket.io. The game is played on a 16x16 game board.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [How to Play](#how-to-play)

## Demo

Link website: https://sondm-tictactoe.netlify.app

## Features

- Real-time 2-player gameplay.
- A 16x16 game board for added complexity.
- Handle cells highlighting.
- Create/join/leave room and rematch handling.
- Responsive design for great user experience on various devices.
- Socket.io integration for real-time updates and multiplayer functionality.

## Technologies Used

- ReactJS
- NodeJS
- Socket.io

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SonDo580/tic-tac-toe.git
   ```

2. Install server dependencies:

   ```bash
   cd server
   yarn
   ```

3. Install client dependencies:

   ```bash
   cd client
   yarn
   ```

## Usage

1. Start the server in development mode:

   ```bash
   cd server
   yarn dev
   ```

2. Start the client in development mode:

   ```bash
   cd client
   yarn dev
   ```

3. Access the game in your web browser at `http://localhost:5173` by default.

## Game Rules

- The game is played by 2 players taking turns to place their marks (X or O) on a 16x16 grid.
- The objective is to achieve a line of 5 of your marks horizontally, vertically, or diagonally.
- The first player to do so wins the game. If the board is full and there's no winner, the result is tie.

## How to Play

1. Create a new room, get the room ID and send it to your friend. Or join an existing room using room ID.

2. Play the game according to `Game Rules`.

3. When the game is finished, you will be asked to play again.

4. You can also request a rematch or leave the room at any time.
