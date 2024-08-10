import { Item } from "./item";
import { User } from "./user";
import { Vid } from "./vid";

export type Message = {
  fromUser: User;
  toUser: User;
  item: Item;
  vid: Vid;
};
