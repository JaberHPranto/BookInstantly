import { createContext, useContext, useMemo, useReducer } from "react"

const INITIAL_STATE = {
  destination: undefined,
  date: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload
    case "RESET_SEARCH":
      return INITIAL_STATE

    default:
      return state
  }
}

export function SearchContextProvider({ children }) {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

  const value = useMemo(
    () => ({ destination: state.destination, date: state.date, options: state.options, dispatch }),
    [state.destination, state.date, state.options, dispatch],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export const useSearchContext = () => {
  return useContext(SearchContext)
}
