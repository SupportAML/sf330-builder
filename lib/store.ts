import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { SF330Doc, Identity } from "./types";
import { DEMO_DOC_ID } from "./demo";

function emptyDoc(name: string): SF330Doc {
  return {
    id: nanoid(),
    name,
    updatedAt: Date.now(),
    sectionA: {
      title: "",
      contractNumber: "",
      solicitationNumber: "",
      date: "",
    },
    sectionB: {
      name: "",
      title: "",
      firm: "",
      address: "",
      phone: "",
      fax: "",
      email: "",
    },
    sectionC: { firms: [] },
    sectionD: { imageDataUrl: null, textDescription: "", activeTab: "text" },
    sectionE: { personnel: [] },
    sectionF: { projects: [] },
    sectionG: { matrix: {} },
    sectionH: { additionalInfo: "" },
  };
}

type StoreState = {
  docs: SF330Doc[];
  identity: Identity | null;
  demoDismissed: boolean;
  createDoc: (name: string) => string;
  updateDoc: (id: string, partial: Partial<SF330Doc>) => void;
  deleteDoc: (id: string) => void;
  duplicateDoc: (id: string) => string | null;
  setIdentity: (identity: Identity) => void;
  getDoc: (id: string) => SF330Doc | undefined;
  injectDemo: (demo: SF330Doc) => void;
  dismissDemo: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      docs: [],
      identity: null,
      demoDismissed: false,

      createDoc: (name: string) => {
        const doc = emptyDoc(name);
        set((state) => ({ docs: [...state.docs, doc] }));
        return doc.id;
      },

      updateDoc: (id: string, partial: Partial<SF330Doc>) => {
        set((state) => ({
          docs: state.docs.map((doc) =>
            doc.id === id ? { ...doc, ...partial, updatedAt: Date.now() } : doc
          ),
        }));
      },

      deleteDoc: (id: string) => {
        // If deleting the demo, also dismiss it
        if (id === DEMO_DOC_ID) {
          set((state) => ({
            docs: state.docs.filter((doc) => doc.id !== id),
            demoDismissed: true,
          }));
        } else {
          set((state) => ({ docs: state.docs.filter((doc) => doc.id !== id) }));
        }
      },

      duplicateDoc: (id: string) => {
        const doc = get().docs.find((d) => d.id === id);
        if (!doc) return null;
        const newDoc: SF330Doc = {
          ...JSON.parse(JSON.stringify(doc)),
          id: nanoid(),
          name: `${doc.name} (Copy)`,
          updatedAt: Date.now(),
        };
        set((state) => ({ docs: [...state.docs, newDoc] }));
        return newDoc.id;
      },

      setIdentity: (identity: Identity) => {
        set({ identity });
      },

      getDoc: (id: string) => {
        return get().docs.find((d) => d.id === id);
      },

      injectDemo: (demo: SF330Doc) => {
        const state = get();
        const alreadyExists = state.docs.some((d) => d.id === DEMO_DOC_ID);
        if (!alreadyExists && !state.demoDismissed) {
          set((s) => ({ docs: [demo, ...s.docs] }));
        }
      },

      dismissDemo: () => {
        set((state) => ({
          demoDismissed: true,
          docs: state.docs.filter((d) => d.id !== DEMO_DOC_ID),
        }));
      },
    }),
    {
      name: "sf330-docs-v1",
    }
  )
);

export function isDemo(id: string) {
  return id === DEMO_DOC_ID;
}
