import endpointConfig from '@/configs/endpoint.config'
import ApiService from './ApiService'
import { RequestTypeGet, StoreDataTypes } from './types'

export async function apiGetScrumBoards() {
    return ApiService.fetchDataWithAxios<unknown>({
        url: `${endpointConfig.getPatients}?limit=500`,
        method: 'get',
    })
}

export async function apiGetHCFS(data: RequestTypeGet) {
    const status = data?.purchaseChannel?.length
        ? data?.purchaseChannel.map((data: string) => `${data},`)
        : ''
    return ApiService.fetchDataWithAxios<unknown>({
        url: `${endpointConfig.getHCFS}?page=${data.pageIndex}&limit=${data.pageSize}&sortType=desc&sortBy=createdAt&query=${data.query || ''}&status=${status || ''}`,
        method: 'get',
    })
}

export async function apiGetStores(data: RequestTypeGet) {
    const status = data?.purchaseChannel?.length
        ? data?.purchaseChannel.map((data: string) => `${data},`)
        : ''
    return ApiService.fetchDataWithAxiosV2<{
        success: boolean
        data: StoreDataTypes[]
    }>({
        url: `${endpointConfig.getStores}?page=${data.pageIndex}&limit=${data.pageSize}}&type=${data?.type || ''}&sortType=desc&sortBy=createdAt&query=${data.query || ''}&status=${status || ''}`,
        method: 'get',
    })
}

export async function apiUpdateStage(data: any) {
    return ApiService.fetchDataWithAxios<any>({
        url: `${endpointConfig.getPatients}/stage/${data.id}`,
        method: 'patch',
        data: { stage: data.stage },
    })
}

export async function apiUpdateShopStatus({
    data,
    id,
}: {
    data: any
    id: string
}) {
    return ApiService.fetchDataWithAxiosV2<any>({
        url: `/stores/${id}/status`,
        method: 'patch',
        data,
    })
}

export async function apiGetHCFDetails({ id }: { id: string }) {
    return ApiService.fetchDataWithAxios<unknown>({
        url: `${endpointConfig.getHCFS}/${id}`,
        method: 'get',
    })
}

export async function apiGetHCFDetailsForPatient({ name }: { name: string }) {
    return ApiService.fetchDataWithAxiosV2<unknown>({
        url: `/stores/store-name/${name}?subStore=false`,
        method: 'get',
    })
}

