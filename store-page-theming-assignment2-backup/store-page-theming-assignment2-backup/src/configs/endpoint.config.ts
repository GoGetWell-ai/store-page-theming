/**
 * API endpoint configuration
 * Contains all the API endpoints used in the application
 */
const endpointConfig = {
    signIn: '/login',
    signInHcf: '/stores/auth/login',
    signUpHcf: '/hcfs/signup',
    signInPatient: '/patients/login',
    signUpPatient: '/patients/signup',
    signInAdmin: '/admins/login',
    signOut: '/sign-out',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    searchHospital: '/hospitals/search',
    updateHCFWorkingHospital: '/hcfs/hospital',
    getPatients: '/patients',
    verifyEmail: '/verify-email',
    resendEmail: '/resend-verification',
    getHCFS: '/hcfs',
    getStores: '/stores',
    createConversation: '/conversations',
    sendMessage: '/messages',
    hospitals: '/hospitals',
    doctors: '/doctors',
    appointments: '/appointments',
    getConversation: (patientId: string) => {
        return `/conversations/${patientId}`
    },
    getAllMessages: (conversationId: string) => {
        return `/messages/${conversationId}`
    },
    addFCMToken: '/notifications/token',
    notifications: '/notifications',
    documents: '/documents',
    getSupportConversations: (userId: string) => {
        return `/supports/conversations/${userId}`
    },
    checkMail: '/check-email',
    traffic: '/traffics',
    getHcfProfile: (id: string) => {
        return `/hcfs/${id}`
    },
    getStoreProfile: (id: string) => {
        return `/stores/${id}`
    },
    contact: '/contacts',
    seo: '/seo',
    storeSignIn: '/stores/auth/login',
    storeSignUp: '/stores/auth/signup',
}

/**
 * Authentication API endpoints
 * Defines endpoints related to user authentication and management
 */
export const AUTH_URL = {
    // ... existing code ...
}

/**
 * Notification API endpoints
 * Defines endpoints for notification-related operations
 */
export const NOTIFICATION_URL = {
    // ... existing code ...
}

export default endpointConfig
