import { Round } from "../../../utils";

export interface RoundHistoryItemProps {
  round: Round;
  roundNumber: number;
  isLatest: boolean;
  onUndoClick: (id: number) => void;
}
