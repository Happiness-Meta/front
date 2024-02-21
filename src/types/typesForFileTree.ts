export interface nodeType {
  id: string;
  name: string;
  type: string;
  content?: string;
  parentId: string | undefined;
  filePath?: string;
  children?: nodeType[];
}

export interface backDataType {
  content?: string;
  id: string;
  key: string;
  name: string;
  uuid: string;
  children?: backDataType[];
}
