import React from "react";
import { useStore, type StoreApi } from "zustand";
import { createStore } from "zustand/vanilla";
import type { TResponse } from "~/lib/types";

const createZustandContext = <TInitial, TStore extends StoreApi<unknown>>(
  getStore: (initial: TInitial) => TStore,
) => {
  const Context = React.createContext(null as unknown as TStore);

  const Provider = (props: {
    children?: React.ReactNode;
    initialValue: TInitial;
  }) => {
    const [store] = React.useState(() => getStore(props.initialValue));

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  return {
    useContext: () => React.useContext(Context),
    Context,
    Provider,
  };
};

type State = {
  responses: TResponse[];
  addResponse: (response: TResponse) => void;
};

export const AssessmentContext = createZustandContext(
  (initialState: { response: TResponse[] }) => {
    return createStore<State>()((set) => ({
      responses: initialState.response,
      addResponse: (response) =>
        set((state) => ({
          responses: [...state.responses, response],
        })),
    }));
  },
);

export function useAssessmentStore<T>(selector: (state: State) => T) {
  const store = React.useContext(AssessmentContext.Context);
  if (!store) {
    throw new Error("Missing AssessmentStoreProvider");
  }
  return useStore(store, selector);
}

export const useAssessment = () => useAssessmentStore((state) => state);
