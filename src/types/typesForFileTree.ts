export interface nodeType {
  id: string;
  name: string;
  type: string;
  content?: string;
  parentId: string | undefined;
  key?: string;
  children?: nodeType[];
}
