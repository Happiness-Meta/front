import { create } from "zustand";
import { nodeType } from "../../types/typesForFileTree";
// import { nodeType } from "../../types/typesForFileTree";

interface aboutEditor {
  tabs: nodeType[];
  filePath: string;
  nodeContent: [id: string, content: string | undefined];
  language: string;
  addTab: (newTab: nodeType) => void;
  deleteTab: (tabToDelete: nodeType) => void;
  deleteAllTabs: () => void;
  showContent: (nodeData: nodeType) => void;
  rightSpace: boolean;
  toggleRightSpace: () => void;
  terminal: boolean;
  toggleTerminal: () => void;
  inviteSpace: boolean;
  toggleInviteSpace: () => void;
  inviteKey: boolean;
  toggleInviteKey: () => void;
}

const editorStore = create<aboutEditor>((set) => ({
  tabs: [],
  nodeContent: ["", ""],
  filePath: "",
  language: "",
  addTab: (newTab) =>
    set((state) => {
      const alreadyExists = state.tabs.some((tab) => tab.id === newTab.id);
      if (alreadyExists) {
        return { tabs: [...state.tabs] };
      }
      return { tabs: [...state.tabs, newTab] };
    }),
  deleteTab: (tabToDelete) =>
    set((state) => {
      console.log(state.tabs);
      const newTabSpace = state.tabs.filter((tab) => tab.id !== tabToDelete.id);
      return { tabs: newTabSpace };
    }),
  deleteAllTabs: () => set({ tabs: [] }),
  showContent: (nodeData) =>
    set({
      nodeContent: [nodeData.id, nodeData.content],
      filePath: nodeData.key,
      language: nodeData.name,
    }),
  rightSpace: true,
  toggleRightSpace: () => set((state) => ({ rightSpace: !state.rightSpace })),
  terminal: false,
  toggleTerminal: () => set((state) => ({ terminal: !state.terminal })),
  inviteSpace: false,
  toggleInviteSpace: () =>
    set((state) => ({ inviteSpace: !state.inviteSpace })),
  inviteKey: false,
  toggleInviteKey: () => set((state) => ({ inviteKey: !state.inviteKey })),
}));

export default editorStore;
