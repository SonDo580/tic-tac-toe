import { MARK } from "@/constants";

type CellContent = MARK | "";

type Board = CellContent[][];

type Player = {
  playerId: string;
  playerName: string;
  mark: MARK;
};

type Room = {
  roomId?: string;
  players?: Player[];
  board?: Board;
  turn?: MARK;
  highlightCells?: string[];
  endGame?: boolean;
  moveCount?: number;
  winnerId?: string;
};

export type { Board, Player, Room, CellContent };
