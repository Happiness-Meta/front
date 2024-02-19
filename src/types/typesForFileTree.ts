export interface LeafType {
  id: string;
  name: string;
  type: string;
  content?: string;
  parentId?: string;
  filePath: string;
  children?: LeafType[];
}
