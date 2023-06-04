export enum MessageType {
  None,
  Blue,
  Yellow,
  Red,
}

export interface Message {
  type: MessageType;
  msg: string;
}
