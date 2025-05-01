import { create } from 'zustand'
import type {
    ChatHistories,
    ChatHistory,
    Conversation,
    LLMChatHistory,
} from '../types'

type RenameDialog = {
    id: string
    title: string
    open: boolean
}

export type GenerativeChatState = {
    selectedConversation: string
    selectedConversationRecord: string[]
    chatHistory: ChatHistories
    renameDialog: RenameDialog
    isTyping: boolean
    selectedConversationMessages: LLMChatHistory[]
    messageConversation: any
    file: File[]
    conversationsMessages: Conversation[]
    isLoading: boolean
    suggestedQuestions: string[]
    uploadedFileUrls: string[]
    medicalReportUploadedStatus: boolean
    pushedMessages: string
    fileUploadStatus: boolean
    unauthorizedFileStore: File | null
}

type GenerativeChatAction = {
    setSelectedConversation: (payload: string) => void
    setSelectedConversationRecord: (payload: string) => void
    setChatHistory: (payload: ChatHistories) => void
    setChatHistoryName: (payload: { id: string; title: string }) => void
    setRenameDialog: (payload: RenameDialog) => void
    setIsTyping: (payload: boolean) => void
    pushChatHistory: (payload: ChatHistory) => void
    pushConversation: (conversation: Conversation) => void
    pushConversations: (id: string, conversation: Conversation[]) => void
    disabledChatFresh: (id: string) => void
    setSelectedConversationMessages: (payload: LLMChatHistory[]) => void
    addSelectedConversationMessage: (payload: LLMChatHistory) => void
    setMessageConversation: (payload: any) => void
    setFile: (payload: any) => void
    setConversationMessages: (payload: Conversation[]) => void
    addConversationMessage: (payload: Conversation) => void
    setLoading: (payload: boolean) => void
    setSuggestedQuestions: (payload: string[]) => void
    setUploadedFileUrls: (payload: string[]) => void
    setMedicalReportsUploadedStatus: (payload: boolean) => void
    updateConversation: (payload: { id: string; message: string }) => void
    setPushedMessages: (payload: string) => void
    setFileUploadStatus: (payload: boolean) => void
    setUnauthorizedFileStore: (payload: File | null) => void
}

const initialState: GenerativeChatState = {
    selectedConversation: '',
    selectedConversationRecord: [],
    chatHistory: [],
    renameDialog: {
        id: '',
        title: '',
        open: false,
    },
    isTyping: false,
    selectedConversationMessages: [],
    messageConversation: [],
    file: null,
    conversationsMessages: [],
    suggestedQuestions: [],
    uploadedFileUrls: [],
    medicalReportUploadedStatus: false,
    pushedMessages: '',
    fileUploadStatus: false,
    unauthorizedFileStore: null,
}

export const usGenerativeChatStore = create<
    GenerativeChatState & GenerativeChatAction
>((set, get) => ({
    ...initialState,
    setSelectedConversation: (payload) =>
        set(() => ({ selectedConversation: payload })),
    setChatHistory: (payload) => set(() => ({ chatHistory: payload })),
    setChatHistoryName: (payload) =>
        set(() => {
            const chatHistory = get().chatHistory.map((chat) => {
                if (chat.id === payload.id) {
                    chat.title = payload.title
                }
                return chat
            })
            return { chatHistory }
        }),
    setRenameDialog: (payload) => set(() => ({ renameDialog: payload })),
    setSelectedConversationRecord: (payload) =>
        set(() => {
            let record = get().selectedConversationRecord

            if (record.includes(payload)) {
                record = record.filter((item) => item !== payload)
            } else {
                record.push(payload)
            }

            return { selectedConversationRecord: record }
        }),
    setMessageConversation: (payload: any) => {
        set(() => {
            return { messageConversation: payload }
        })
    },
    pushChatHistory: (payload) =>
        set((state) => ({ chatHistory: [payload, ...state.chatHistory] })),
    pushConversation: (conversation) =>
        set((state) => {
            const list = [...state.conversationsMessages]
            const index = list.findIndex((data) => data.id === conversation.id)
            if (index !== -1) {
                list[index].content += conversation.content || ''
            } else {
                list.push(conversation)
            }
            return { conversationsMessages: list }
        }),
    updateConversation: (payload) => {
        set((state) => {
            const list = [...state.conversationsMessages]
            const index = list.findIndex((data) => data.id === payload.id)
            list[index].content += payload.message
            return { conversationsMessages: list }
        })
    },
    pushConversations: (id, conversations) =>
        set((state) => {
            const list = [...state.conversationsMessages, ...conversations]
            return { conversationsMessages: list }
        }),
    setIsTyping: (payload) => set(() => ({ isTyping: payload })),
    disabledChatFresh: () =>
        set((state) => {
            const list = state.conversationsMessages.map((conversation) => {
                if (conversation.fresh) {
                    conversation.fresh = false
                }
                return conversation
            })
            return { conversationsMessages: list }
        }),
    setSelectedConversationMessages: (payload) =>
        set(() => ({ selectedConversationMessages: payload })),

    addSelectedConversationMessage: (payload) =>
        set((state) => ({
            selectedConversationMessages: [
                ...state.selectedConversationMessages,
                payload,
            ],
        })),
    setFile: (payload: File[]) => set(() => ({ file: payload })),
    setConversationMessages: (payload) =>
        set(() => {
            return { conversationsMessages: payload }
        }),
    addConversationMessage: (payload) =>
        set((state) => {
            const newConversations = [...state.conversationsMessages, payload]
            return { conversationsMessages: newConversations }
        }),
    setLoading: (payload) =>
        set(() => {
            return { isLoading: payload }
        }),
    setSuggestedQuestions: (payload) =>
        set(() => {
            return { suggestedQuestions: payload }
        }),
    setUploadedFileUrls: (payload) =>
        set(() => {
            return { uploadedFileUrls: payload }
        }),
    setMedicalReportsUploadedStatus: (payload) =>
        set(() => {
            return { medicalReportUploadedStatus: payload }
        }),
    setPushedMessages: (payload) =>
        set(() => {
            return { pushedMessages: payload }
        }),
    setFileUploadStatus: (payload) =>
        set(() => {
            return { fileUploadStatus: payload }
        }),
    setUnauthorizedFileStore: (payload) =>
        set(() => {
            return { unauthorizedFileStore: payload }
        }),
}))
