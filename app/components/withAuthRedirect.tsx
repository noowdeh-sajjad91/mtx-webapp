// components/withAuthRedirect.tsx
'use client'
import { useEffect, ComponentType } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/Store/store'
// import { getToken } from '@/lib/auth'

export function withAuthRedirect<T extends object>(
    WrappedComponent: ComponentType<T>
) {
    return function ComponentWithAuthRedirect(props: T) {
        const router = useRouter()

        useEffect(() => {
            const token = store.getState().reducer.user.currentUser.token;
            if (token) {
                router.push('/home')
            }
        }, [router])

        return <WrappedComponent {...(props as T)} />
    }
}