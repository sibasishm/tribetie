import { useContext, useState, createContext } from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import type { TResponse } from "~/lib/types";

export type AssessmentContextType = {
  responses: TResponse[];
  actions: {
    addResponse: (by: TResponse) => void;
  };
};

const AssessmentContext = createContext<StoreApi<AssessmentContextType> | null>(
  null,
);

export const useAssessmentStore = (
  selector: (state: AssessmentContextType) => AssessmentContextType,
) => {
  const store = useContext(AssessmentContext);
  if (!store) {
    throw new Error(
      "useAssessmentContext must be used within a AssessmentProvider",
    );
  }
  return useStore(store, selector);
};

export const AssessmentProvider = ({
  children,
  prefilledResponses,
}: {
  children: React.ReactNode;
  prefilledResponses?: TResponse[];
}) => {
  const [store] = useState(() =>
    createStore<AssessmentContextType>((set) => ({
      responses: prefilledResponses ?? [],
      actions: {
        addResponse: (by: TResponse) =>
          set((state) => ({
            responses: [...state.responses, by],
          })),
      },
    })),
  );

  return (
    <AssessmentContext.Provider value={store}>
      {children}
    </AssessmentContext.Provider>
  );
};
