import { create } from "zustand";

interface LoadingState {
    isLoading: boolean;
    setIsLoading: (b: boolean) => void;
}

export const useLoadingSpinnerStore = create<LoadingState>((set)=>({
    isLoading: false,
    setIsLoading: (b: boolean) => set({isLoading: b}),
}))