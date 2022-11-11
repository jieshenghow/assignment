export type Props = {
  label: string;
  isMulti?: boolean;
  selection: {
    label: string;
    value: string
  }[];
  isRequired?: boolean;
  prefix?:any;
  imageCallback?: (image: any) => void;
}
