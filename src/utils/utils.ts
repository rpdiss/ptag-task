import { FileTypeResult, fromBuffer, MimeType } from "file-type";
import {
  CONTINUOUS_SPACES_REGEXP,
  FILE_EXTENSIONS_WHITELIST,
  MIME_TYPES_WHITELIST,
  NEWLINE_AS_START_SPACE,
  START_END_WHITE_SPACE_REGEXP,
} from "@/utils/constraits";
import { ImgFile } from "@/model/img-file";
import { TextFile } from "@/model/text-file";
import { FileTypes } from "@/model/store-file";

export function isValid(fileType: FileTypeResult): boolean {
  return (
    FILE_EXTENSIONS_WHITELIST.includes(fileType.ext) &&
    MIME_TYPES_WHITELIST.includes(fileType.mime)
  );
}

export async function readFileInfo(
  file: File
): Promise<FileTypeResult | undefined> {
  return new Promise(async (resolve, error) => {
    try {
      const readableStream = await file.arrayBuffer();
      resolve(await fromBuffer(readableStream));
    } catch (e) {
      error(new Error(e.message));
    }
  });
}

export async function textFileInfo(file: File): Promise<TextFile> {
  return new Promise(async (resolve, error) => {
    try {
      if (typeof file.text === "function") {
        let textContent = await file.text();
        const characters = textContent.length;
        textContent = textContent.replace(START_END_WHITE_SPACE_REGEXP, "");
        textContent = textContent.replace(CONTINUOUS_SPACES_REGEXP, " ");
        textContent = textContent.replace(NEWLINE_AS_START_SPACE, "\n");
        const words = textContent
          .split(" ")
          .filter((str: string) => str != "").length;
        const tmpText: TextFile = {
          type: FileTypes.Text,
          file,
          characters,
          words,
        };
        resolve(tmpText);
      }
    } catch (e) {
      error(new Error(e.message));
    }
  });
}

export async function imageFileInfo(
  file: File,
  mime: MimeType
): Promise<ImgFile> {
  return new Promise(async (resolve, error) => {
    try {
      const img = new Image();
      img.onload = () => {
        const height = img.height;
        const width = img.width;
        const tmpImg: ImgFile = {
          type: FileTypes.Img,
          file,
          dimensions: {
            height,
            width,
          },
        };
        resolve(tmpImg);
      };
      img.src = await createObjectURL(file, mime);
    } catch (e) {
      error(new Error(e.message));
    }
  });
}

export async function createObjectURL(file: File, mime: MimeType) {
  const imgBlob = new Blob([await file.arrayBuffer()], { type: mime });
  return URL.createObjectURL(imgBlob);
}
