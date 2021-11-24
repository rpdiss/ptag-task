import { StoreFile } from "@/model/store-file";
export type ImgFile = Pick<StoreFile, "file" | "type"> & {
  dimensions: {
    height: number;
    width: number;
  };
};
