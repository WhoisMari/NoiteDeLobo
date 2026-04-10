import { Player } from "../../../utils";

export interface PlayerRowProps {
  player: Player;
  index: number;
  maxPoints: number;
  onDeleteClick: (id: number) => void;
}
