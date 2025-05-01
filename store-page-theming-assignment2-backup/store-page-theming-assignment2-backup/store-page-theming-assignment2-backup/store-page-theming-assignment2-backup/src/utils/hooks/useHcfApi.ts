import { useState, useEffect } from 'react'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useAuth } from '@/auth'
import { ResponseProps as HcfDataProps } from '@/services/types'
import { apiGetHCFDetailsForPatient } from '@/services/StageService'
import useSubdomainNavigation from './useSubdomainNavigation'

const useHCFApi = () => {
    const [hcfName, setHCFName] = useState('')
    const [hcfData, setHcfData] = useState<HcfDataProps>({})
    const {
        hcfData: hcfDataStore,
        setHcfData: setHcfDataStore,
        setNotFound,
    } = useAuthStore()

    const [loadingStatus, setLoadingStatus] = useState(false)
    const { user } = useAuth()

    const { isSubdomain, subdomain } = useSubdomainNavigation()

    useEffect(() => {
        if (isSubdomain) {
            setHCFName(subdomain)
        }
    }, [isSubdomain, subdomain])

    useEffect(() => {
        const callHcfApi = async () => {
            if (!hcfDataStore?._id && hcfName) {
                // Avoid redundant API calls
                setHcfData({ username: hcfName })
                try {
                    setLoadingStatus(true)
                    const response = await apiGetHCFDetailsForPatient<{
                        name: string
                    }>({
                        name:
                            isSubdomain &&
                            !window.location.hostname.includes('gogetwell')
                                ? subdomain
                                : user?.name
                                  ? user.name
                                  : hcfName,
                    })

                    setLoadingStatus(false)
                    if (response?.success) {
                        setHcfData(response.data)
                    } else {
                        // Check if subdomain is 'auth' or 'admin' before setting not found
                        console.log(`subdomainsubdomain${subdomain}`)
                        if (subdomain !== 'auth') {
                            setNotFound(true)
                        } else {
                            setNotFound(false)
                        }
                    }
                } catch (err) {
                    setLoadingStatus(false)
                    // Check if subdomain is 'auth' or 'admin' before setting not found
                    console.log(`subdomainsubdomain${subdomain}`)
                    if (subdomain !== 'auth') {
                        setNotFound(true)
                    } else {
                        setNotFound(false)
                    }
                }
            } else {
                setHcfData(hcfDataStore)
            }
        }

        if (isSubdomain && subdomain) {
            callHcfApi()
        }
    }, [hcfName, hcfDataStore, subdomain])

    useEffect(() => {
        if (hcfName && hcfDataStore.storeName === 'default') {
            setHcfDataStore({ username: hcfName })
        }
    }, [hcfName])

    return { hcfName, hcfData, loadingStatus }
}

export default useHCFApi
