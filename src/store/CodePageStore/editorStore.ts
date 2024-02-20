import { create } from "zustand";
import { LeafType } from "../../types/typesForFileTree";

interface aboutEditor {
  tabs: LeafType[];
  content: string;
  filePath: string;
  addTab: (newTab: LeafType) => void;
  deleteTab: (tabToDelete: LeafType) => void;
  // selectTab: (tabToSelect: Tab) => void;
  showContent: (nodeData: LeafType) => void;
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
  content: "",
  filePath: "",
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
      const newTabSpace = state.tabs.filter((tab) => tab.id !== tabToDelete.id);
      return { tabs: newTabSpace };
    }),
  // selectTab: (tabToSelect) => set((state) => {}),
  showContent: (nodeData) =>
    set({ content: nodeData.content, filePath: nodeData.filePath }),
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
