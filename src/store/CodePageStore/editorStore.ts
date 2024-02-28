import { nodeType } from "@/types/TypesForFileTree";
import { create } from "zustand";
interface aboutEditor {
  tabs: nodeType[];
  filePath: string;
  nodeContent: [id: string, content: string | undefined];
  language: string;
  terminalContent: string;
  setTerminalContent: (content: string) => void;
  clearTerminal: () => void;
  setContent: (content: string) => void;
  addTab: (newTab: nodeType) => void;
  deleteTab: (tabToDelete: nodeType) => void;
  deleteAllTabs: () => void;
  updateTabName: (renamedNode: nodeType, newName: string) => void;
  updateTabContent: (savedNode: nodeType, newContent: string) => void;
  showContent: (nodeData: nodeType) => void;
  rightSpace: boolean;
  toggleRightSpace: () => void;
  terminal: boolean;
  toggleTerminal: () => void;
  inviteSpace: boolean;
  toggleInviteSpace: () => void;
  inviteKey: boolean;
  toggleInviteKey: () => void;
  setRightSpace: () => void;
}

const editorStore = create<aboutEditor>((set) => ({
  tabs: [],
  nodeContent: ["", ""],
  filePath: "",
  language: "",
  terminalContent: "",
  setTerminalContent: (content) => set({ terminalContent: content }),
  clearTerminal: () => set({ terminalContent: "" }),
  setContent: (content: string) =>
    set((state) => ({ nodeContent: [state.nodeContent[0], content] })),
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
  deleteAllTabs: () => set({ tabs: [] }),
  updateTabName: (renamedNode, newName) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === renamedNode.id
          ? { ...tab, name: newName, content: renamedNode.content }
          : tab
      ),
    })),
  updateTabContent: (savedNode, newContent) =>
    set((state) => {
      return {
        tabs: state.tabs.map((tab) =>
          tab.id === savedNode.id ? { ...tab, content: newContent } : tab
        ),
      };
    }),

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
  setRightSpace: () => set({ rightSpace: true }),
}));

export default editorStore;
