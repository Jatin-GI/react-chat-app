import { create } from "zustand";
import { createauthSlice } from "./slice/auth-slice";
import { createChatSlice } from "./slice/chat-slice";

export const useAppStore = create()((...a)=>(
    {
        ...createauthSlice(...a),
        ...createChatSlice(...a),
    }
))