/**
 * Type representing sorting criteria.
 */
export type SortType = {
    order: 'asc' | 'desc'
    key: string
}

/**
 * Type representing request parameters for fetching data.
 */
export type RequestTypeGet = {
    pageIndex: number
    pageSize: number
    query: string
    sort?: SortType
    purchasedProducts?: string
    purchaseChannel?: string[]
    type?: string
    status?: string
}

/**
 * Type representing an address structure.
 */
export type AddressType = {
    country?: string
    city?: string
    street?: string
    postalCode?: string
}

/**
 * Type representing business details.
 */
export type BusinessDetailsType = {
    specializations?: string[]
    serviceRegions?: string[]
}

/**
 * Type representing verification status.
 */
export type VerificationStatusType = {
    status?: string
    documents?: string[]
}

/**
 * Type representing store metrics.
 */
export type StoreMetricsType = {
    totalPatients?: number
    successRate?: number
    averageRating?: number
    responseTime?: number
}

/**
 * Type representing store subscription details.
 */
export type StoreSubscriptionType = {
    tier?: string
    startDate?: string
    features?: string[]
}

/**
 * Type representing store details.
 */
export type StoreType = {
    _id?: string
    name?: string
    storeName?: string
    phone?: string
    dob?: string
    address?: AddressType
    languages?: string[]
    businessDetails?: BusinessDetailsType
    verificationStatus?: VerificationStatusType
    metrics?: StoreMetricsType
    subscription?: StoreSubscriptionType
    hospitals?: string[]
    isAllDoctorsSelected?: boolean
    isAllHospitalsSelected?: boolean
    isDeleted?: boolean
    doctors?: string[]
    parent?: string | null
    type?: string
    fcmTokens?: string[]
    createdAt?: string
    updatedAt?: string
    __v?: number
}

/**
 * Type representing authentication details.
 */
export type AuthType = {
    _id?: string
    email?: string
    password?: string
    role?: string[]
    isVerified?: boolean
    provider?: string[]
    store?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
    resetPasswordExpiry?: string
    resetPasswordToken?: string
    verificationToken?: string
    verificationTokenExpiry?: string
    phoneNumber?: string
}

/**
 * Type representing medical information.
 */
export type MedicalInfoType = {
    bloodGroup?: string
    diseases?: string[]
    treatment?: string
    medicalReports?: {
        title?: string
        date?: string
        files?: string[]
        description?: string
        _id?: string
    }[]
}

/**
 * Type representing travel information.
 */
export type TravelInfoType = {
    passport?: {
        number?: string
        files?: string[]
    }
    visa?: {
        number?: string
        files?: string[]
    }
    arrival?: {
        date?: string
        airport?: string
        ticket?: string
    }
}

/**
 * Type representing accommodation details.
 */
export type AccommodationType = {
    hotel?: {
        name?: string
        address?: string
        status?: string
    }
    transport?: {
        cab?: string
        status?: string
        pickup?: string
    }
}

/**
 * Type representing insurance details.
 */
export type InsuranceType = {
    provider?: string
    documents?: string[]
}

/**
 * Type representing the response structure.
 */

interface TargetLocation {
    city: string
    state: string
    country: string
}

export type PatientResponseDataTypes = {
    _id?: string
    authId?: AuthType
    store?: StoreType
    firstName?: string
    lastName?: string
    gender?: string
    dob?: string
    phone?: string
    medicalInfo?: MedicalInfoType
    travelInfo?: TravelInfoType
    accommodation?: AccommodationType
    insurance?: InsuranceType
    address?: AddressType
    stage?: string
    remarks?: string
    isDeleted?: boolean
    treatmentPlans?: string[]
    fcmTokens?: string[]
    createdAt?: string
    updatedAt?: string
    __v?: number
    email?: string
    storeName?: string
    targetedTreatment?: TargetLocation
}

/**
 * Type representing the API response for fetching patient details.
 */
export type ApiGetPatientDetailsProps = {
    data: PatientResponseDataTypes
    success: boolean
}

/**
 * Type representing an Axios error response.
 */
type AxiosErrorResponse = {
    message: string
}

/**
 * Type representing a detailed Axios error response.
 */
export type AxiosErrorResponseTypes = {
    response?: {
        data: AxiosErrorResponse
        status?: number
        statusText?: string
        headers?: Record<string, string>
        config?: unknown
    }
    message?: string
    config?: unknown
    isAxiosError?: boolean
    toJSON?: () => object
}

/**
 * Type representing the API response structure for checking email existence.
 */
export interface CheckEmailApiResponseTypes {
    success: boolean
    data: AuthDataTypes[]
}

/**
 * Type representing store data.
 */
export interface AuthDataTypes {
    storeId: string
    parentId: string | null
    patientId: string
    role: string[]
    storeName: string
    name: string
    patientName: string
    email: string
}

interface Experience {
    surgeries: string
}

interface AssociatedHospital {
    _id: string
    name: string
}

export interface DoctorDataTypes {
    _id: string
    name: string
    designation: string
    profileUrl: string
    profileImage: string
    about: string[]
    hospitals: string[]
    awards: string[]
    experience: Experience
    consultations: string[]
    treatments: string[]
    associatedHospitals: AssociatedHospital[]
}

interface Pagination {
    count: number
    total: number
    totalPages: number
    currentPage: number
}

export interface GetApiResponseTypes {
    success: boolean
    pagination: Pagination
    data: DoctorDataTypes[]
}

export interface AppointmentDataTypes {
    _id: string
    patient: string
    appointmentDateTime: string
    doctorName: string
    hospitalName: string
    doctor: string | null
    specialty: string
    status: 'pending' | 'cancelled' | 'completed' // Add other possible statuses if needed
    conversation: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

interface PaginationDataTypes {
    currentPage: number
    totalPages: number
    totalAppointments: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
}

export interface AppointmentApiResponseDataTypes {
    success: boolean
    data: AppointmentDataTypes[]
    pagination?: PaginationDataTypes
}

type Address = {
    country: string
    city: string
    street: string
    postalCode: string
}

type BusinessDetails = {
    specializations: string[]
    serviceRegions: string[]
}

type VerificationStatus = {
    isVerified: string // Consider changing this to boolean if applicable
    status: string
    documents: string[] // Adjust type if documents have a specific structure
}

type Metrics = {
    totalPatients: number
    successRate: number
    averageRating: number
    responseTime: number
}

type Subscription = {
    tier: string
    startDate: string // ISO date string
    features: string[]
}

type Proficiency = {
    [language: string]: string // Example: { english: "fluent" }
}

type Auth = {
    _id: string
    email: string
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    __v: number
    lastLogin: string // ISO date string
    phoneNumber?: string
}

export type StoreDataTypes = {
    _id: string
    name: string
    storeName: string
    phone: string
    dob: string // ISO date string
    address: Address
    languages: string[]
    businessDetails: BusinessDetails
    verificationStatus: VerificationStatus
    metrics: Metrics
    subscription: Subscription
    hospitals: string[]
    isAllDoctorsSelected: boolean
    isAllHospitalsSelected: boolean
    isDeleted: boolean
    doctors: string[]
    parent: string | null
    type: string
    fcmTokens: string[]
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    __v: number
    proficiency: Proficiency
    auth: Auth
    gender?: string
}

export type NotificationDataTypes = {
    _id: string
    id?: string
    to: string
    toModelType: string // Example: "Patient", consider using an enum if there are fixed values
    title: string
    message: string
    isRead: boolean
    type: string // Example: "success", consider using an enum for predefined types
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    description?: string
    readed?: boolean
    __v: number
}

export type GetNotificationApiDataTypes = {
    success: boolean
    data: NotificationDataTypes[]
}

