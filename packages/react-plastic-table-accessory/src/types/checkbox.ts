export type ChangeCallback = (e: React.SyntheticEvent, checked: boolean) => void;

export interface Props {
  id?: string;
  name?: string;

  value?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: ChangeCallback;
}
