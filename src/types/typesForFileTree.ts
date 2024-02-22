export interface nodeType {
  id: string;
  name: string;
  type: string;
  content?: string;
  parentId: string;
  key: string;
  children?: nodeType[];
}
