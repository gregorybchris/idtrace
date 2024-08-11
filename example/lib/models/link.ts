import { Item } from "./item";
import { User } from "./user";
import { Vid } from "./vid";

export type Link = {
  user: User;
  item: Item;
  vid: Vid;
};
