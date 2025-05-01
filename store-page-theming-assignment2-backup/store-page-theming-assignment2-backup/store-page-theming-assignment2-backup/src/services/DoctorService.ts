import endpointConfig from '@/configs/endpoint.config'
import ApiService from './ApiService'
import { GetApiResponseTypes } from './types'

export async function apiGetDoctors(params: {
    page: number
    limit: number
    search: ''
}) {
    return ApiService.fetchDataWithAxios<GetApiResponseTypes>({
        url: `${endpointConfig.doctors}?limit=${params.limit || 51}&page=${params.page}&query=${params.search || ''}&specializations=${params.speciality || ''}`,
        method: 'get',
    })
}

export async function apiGetDoctorsId(id) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.doctors}/${id}`,
        method: 'get',
    })
}

export async function apiGetHCFUnlinkedDoctors(params) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/doctors/unlinked/${params.id}?limit=${params.limit || 50}&page=${params.page}&query=${params.search || ''}&specializations=${params?.speciality || ''}`,
        method: 'get',
    })
}

export async function apiGetHCFLinkedDoctors(params) {
    return ApiService.fetchDataWithAxiosV2<any>({
        url: `/doctors/linked/${params.id}?limit=${params.limit || 50}&page=${params.page}&query=${params.search || ''}&specializations=${params?.speciality || ''}`,
        method: 'get',
    })
}

export async function apiAddDoctorsToShop(data) {
    return ApiService.fetchDataWithAxiosV2<any>({
        url: `/stores/doctors`,
        method: 'patch',
        data,
    })
}
