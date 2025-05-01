import { useState, useEffect } from 'react'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useAuth } from '@/auth'
import { StoreDataTypes as HcfDataProps } from '@/services/types'
import { apiGetHCFDetailsForPatient } from '@/services/StageService'
import useSubdomainNavigation from './useSubdomainNavigation'

const useHCFApi = () => {
    const [hcfName, setHCFName] = useState('')
    const [hcfData, setHcfData] = useState<HcfDataProps>({} as HcfDataProps)
    const [loadingStatus, setLoadingStatus] = useState(false)

    const {
        hcfData: hcfDataStore,
        setHcfData: setHcfDataStore,
        setNotFound,
    } = useAuthStore()

    const { user } = useAuth()
    const { isSubdomain, subdomain } = useSubdomainNavigation()

    // Set HCF name based on subdomain
    useEffect(() => {
        if (isSubdomain && subdomain) {
            setHCFName(subdomain)
        }
    }, [isSubdomain, subdomain])

    // Fetch HCF data
    useEffect(() => {
        const fetchHcfData = async () => {
            if (!hcfDataStore?._id && hcfName) {
                setLoadingStatus(true)
                try {
                    const nameToUse =
                        isSubdomain && !window.location.hostname.includes('gogetwell')
                            ? subdomain
                            : user?.userName || hcfName

                    const response: { success: boolean; data?: HcfDataProps } = await apiGetHCFDetailsForPatient({ name: nameToUse })

                    if (response && response.success && response.data) {
                        setHcfData(response.data as HcfDataProps)
                        setHcfDataStore(response.data as HcfDataProps)
                        setNotFound(false)
                    } else {
                        console.warn(`API call failed or empty: subdomain=${subdomain}`)
                        if (subdomain !== 'auth') {
                            setNotFound(true)
                        } else {
                            setNotFound(false)
                        }
                    }
                } catch (error) {
                    console.error('Error fetching HCF data:', error)
                    if (subdomain !== 'auth') {
                        setNotFound(true)
                    } else {
                        setNotFound(false)
                    }
                } finally {
                    setLoadingStatus(false)
                }
            } else if (hcfDataStore?._id) {
                // If store has data, use it directly
                // Cast the partial data to full type with "as" to satisfy TypeScript
                setHcfData(hcfDataStore as HcfDataProps)
            }
        }

        if (hcfName) {
            fetchHcfData()
        }
    }, [hcfName])

    return { hcfName, hcfData, loadingStatus }
}

export default useHCFApi
