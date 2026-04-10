export interface AddPlayerModalProps {
  name: string;
  onNameChange: (name: string) => void;
  onAdd: () => void;
  onClose: () => void;
}
