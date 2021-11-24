export enum FileTypes {
  "Img" = "img",
  "Text" = "text",
  "Allowed" = "allowd",
}

export type StoreFile = {
  id: string;
  type: FileTypes;
  file: File;
};
