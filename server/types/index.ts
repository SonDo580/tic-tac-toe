import { UUID } from "crypto";
import { MARK } from "../constants";

type Cell = MARK | "";

type Board = Cell[][];

type Player = {
  playerId: string;
  playerName: string;
  mark: MARK;
};

type Room = {
  roomId: UUID;
  players: Player[];
  board: Board;
  turn: MARK;
  highlightCells: string[];
  endGame: boolean;
  moveCount: number;
  winnerId?: string;
};

export type { Board, Player, Room };
