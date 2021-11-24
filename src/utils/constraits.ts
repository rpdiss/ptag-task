export const START_END_WHITE_SPACE_REGEXP = new RegExp(/(^\s*)|(\s*$)/, "gi");
export const CONTINUOUS_SPACES_REGEXP = new RegExp(/[ ]{2,}/, "gi");
export const NEWLINE_AS_START_SPACE = new RegExp(/\n /);

export const FILE_EXTENSIONS_WHITELIST = [
  "dcm",
  "jpg",
  "png",
  "xlsx",
  "xlsx",
  "xls",
  "cfb",
  "csv",
  "txt",
];

export const MIME_TYPES_WHITELIST = [
  "application/x-cfb",
  "image/jpeg",
  "image/png",
  "application/dicom",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/plain",
];
