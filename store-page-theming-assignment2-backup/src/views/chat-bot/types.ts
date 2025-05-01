export type Conversation = {
    id: string
    sender: {
        id: string
        name: string
        avatarImageUrl?: string
    }
    content?: string
    timestamp?: Date
    type: 'regular' | 'reply' | 'deleted' | 'divider'
    attachments?: Array<{
        type: 'image' | 'video' | 'audio' | 'misc'
        source: File
        mediaUrl: string
    }>
    isMyMessage?: boolean
    fresh?: boolean
}

export type ConversationResponse = {
    _id: string
    patientId: string
    createdAt: string
    updatedAt: string
}

export type ConversationAPIResponse = {
    success: boolean
    data: {
        _id: string
        patientId: string
        createdAt: string
        updatedAt: string
    }
}

export type SendMessageBody = {
    by: SenderType
    type: MessageType
    content: MessageContent
    conversationId: string
    chatHistory?: any
}

export type MessageType = 'text' | 'document' | 'image' | 'voice'
export type SenderType = 'ai' | 'human'

// Media content type
export type MediaContentResponse = {
    url: string
    filename: string
    extractedText?: string
}

// Message content can be either string (for text) or MediaContent (for other types)
export type MessageContent = string | MediaContentResponse

// Main Message type
export type MessageResponse = {
    _id: string
    conversationId: string
    type: MessageType
    by: SenderType
    content: MessageContent
    createdAt: string
}

export type AllMessageResponse = {
    success: boolean
    data: {
        messages: MessageResponse[]
        conversation: ConversationResponse
    }
}

export type MessageSendResponse = {
    success: boolean
    data: {
        message: MessageResponse
        conversation: ConversationResponse
    }
}

export type PostAiChatResponse = {
    id: string
    choices: {
        finish_reason:
            | 'stop'
            | 'length'
            | 'tool_calls'
            | 'content_filter'
            | 'function_call'
        index: number
        logprobs: {
            content: Array<{
                token: string
                bytes: Array<number> | null
                top_logprobs: Array<{
                    token: string
                    bytes: Array<number> | null
                    logprob: number
                }>
            }>
        } | null
        message: {
            content: string | null
            role: string
        }
    }[]
    created: number
    model: string
}

export type LLMResponse = {
    message: string
    answer: string // AI response
}

export type LLMChatHistory = { ai: string; human: string }
export type LLMRequest = {
    question: string
    chat_history: LLMChatHistory[]
}

export type AllConversationResponse = {
    sauces: boolean
    data: (ConversationResponse & {
        message?: MessageResponse
    })[]
}
// Function to transform backend response to expected frontend format

export type ChatHistory = {
    id: string
    title: string
    lastConversation: string
    createdTime: number
    updatedTime: number
    enable: boolean
}

export type ChatHistories = ChatHistory[]

export type GetChatHistoryResponse = ChatHistories
