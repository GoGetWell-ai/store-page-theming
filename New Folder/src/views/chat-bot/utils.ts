import {
    AllConversationResponse,
    ChatHistory,
    Conversation,
    ConversationAPIResponse,
    ConversationResponse,
    LLMChatHistory,
    LLMResponse,
    MediaContentResponse,
    MessageContent,
    MessageResponse,
    MessageType,
    PostAiChatResponse,
    SenderType,
} from './types'

export const getStringPosition = (
    string: string,
    subString: string,
    index: number,
): number => {
    return string.split(subString, index).join(' ').length
}

export const getCurrentNodeOverflow = (
    arr: number[],
    pos: number,
): [number, number] => {
    let acc = 0
    let index = 0
    for (let i = 0; i < arr.length; i++) {
        if (acc + arr[i] > pos) {
            break
        }

        index++

        acc += arr[i]
    }

    return [index, pos - acc]
}

// Type guards
const isMediaContent = (
    content: MessageContent,
): content is MediaContentResponse => {
    return typeof content !== 'string' && 'url' in content
}

// Helper function to generate a dummy avatar URL based on name
const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
}

const formatDate = (date: Date): string => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

// Convert MessageResponse to Conversation type
export const messageToConversation = (
    message: MessageResponse,
    userId?: string,
): Conversation => {
    const isAiSender = message.by === 'ai'
    const senderName = isAiSender ? 'AI Assistant' : 'You'

    let attachments: Conversation['attachments'] = []
    let content = ''

    if (isMediaContent(message.content)) {
        attachments = [
            {
                type: message.type as 'image' | 'audio' | 'video' | 'misc',
                mediaUrl: message.content.url,
                source: new File([], message.content.filename), // Note: This is a placeholder File object
            },
        ]
        content = message.content.extractedText || ''
    } else {
        content = message.content
    }
    return {
        id: message._id,
        sender: {
            id: isAiSender ? 'ai' : userId || 'user',
            name: senderName,
            avatarImageUrl: isAiSender ? '/img/thumbs/ai.png' : '/img/thumbs/thumb-1.png',
        },
        content,
        timestamp: new Date(message.createdAt),
        type: 'regular',
        attachments,
        isMyMessage: message.by === 'human',
        fresh: false,
    }
}

export const transformMessages = (messages: MessageResponse[]) => {
    return messages.map((message) => messageToConversation(message))
}

// Convert AI response to Conversation type
export const aiResponseToConversation = (
    response: PostAiChatResponse,
): Conversation => {
    const message = response.choices[0]?.message

    return {
        id: response.id,
        sender: {
            id: 'ai',
            name: 'AI Assistant',
            avatarImageUrl: '/img/thumbs/ai.png',
        },
        content: message?.content || '',
        timestamp: new Date(response.created),
        type: 'regular',
        isMyMessage: false,
        fresh: true,
    }
}

export const adaptLLMResponse = (
    backendResponse: LLMResponse,
): PostAiChatResponse => {
    return {
        id: `response-${Date.now()}`, // Generate a unique ID since backend doesn't provide one
        choices: [
            {
                finish_reason: 'stop', // Default to 'stop' as the finish reason
                index: 0,
                logprobs: null, // Backend doesn't provide logprobs
                message: {
                    content: backendResponse.answer,
                    role: 'assistant',
                },
            },
        ],
        created: Date.now(),
        model: 'default-model',
    }
}

// Convert ConversationResponse to ChatHistory
export const conversationResponseToChatHistory = (
    response: AllConversationResponse,
): ChatHistory[] => {
    return response.data
        .filter((item) => item.message) // Only keep items with messages
        .map((item) => {
            const messages = [item.message!] // We can safely use ! here because of the filter
            const conversations = messages.map((msg) =>
                messageToConversation(msg),
            )
            const lastMessage = messages[messages.length - 1]

            return {
                id: item._id,
                title: `Conversation ${formatDate(new Date(item.createdAt))}`,
                conversation: conversations,
                lastConversation: lastMessage?.content.toString() || '',
                createdTime: new Date(item.createdAt).getTime(),
                updatedTime: new Date(item.updatedAt).getTime(),
                enable: true,
            }
        })
        .sort((a, b) => b.updatedTime - a.updatedTime)
}

// Function to create a new message
export const createNewMessage = (
    content: string,
    conversationId: string,
    type: MessageType = 'text',
    by: SenderType = 'human',
): MessageResponse => {
    return {
        _id: `temp-${Date.now()}`, // Temporary ID until server assigns one
        conversationId,
        type,
        by,
        content,
        createdAt: new Date().toISOString(),
    }
}

// Function to format conversations for display
export const formatConversations = (
    messages: MessageResponse[],
    userId?: string,
): Conversation[] => {
    return messages.map((msg) => messageToConversation(msg, userId))
}

export const generateLLMChatHistory = (messages: MessageResponse[]): LLMChatHistory[] => {
	const sortedMessages = messages
			.filter(msg => msg.type === 'text')
			.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

	const chatHistory: LLMChatHistory[] = [];
	let currentHumanMessages: string[] = [];

	for (let i = 0; i < sortedMessages.length; i++) {
			const msg = sortedMessages[i];
			
			if (msg.by === 'human') {
					const text = msg.type !== 'text' ? msg.content.extractedText : msg.content;
					currentHumanMessages.push(text as string);
			} else if (msg.by === 'ai' && currentHumanMessages.length > 0) {
					chatHistory.push({
							human: currentHumanMessages.join('\n'),
							ai: msg.content as string
					});
					currentHumanMessages = [];
			}
	}

	return chatHistory;
}