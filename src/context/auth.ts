import { create } from 'zustand'

type State = {
    token: string;
    setToken : (newToken : string) => void
}

export const useTokenStore = create<State>((set) => ({
  token: '',
  setToken : (newToken : string) => {
    set(state => ({ token : newToken}))
  }

}))