import { StoreFile } from "@/model/store-file";

export type TextFile = Pick<StoreFile, "file" | "type"> & {
  characters: number;
  words: number;
};
