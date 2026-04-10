import { Player } from "../../../utils";

export interface AddRoundModalProps {
  players: Player[];
  roundPoints: Record<number, number>;
  onUpdatePoints: (
    updater: (prev: Record<number, number>) => Record<number, number>,
  ) => void;
  onSave: () => void;
  onClose: () => void;
}
