'use client';

import { ReactNode, createContext, useContext, useCallback, useEffect } from 'react';
import { CroctProvider as BaseCroctProvider, useCroct } from '@croct/plug-react';
import { croctConfig } from '../../../../lib/croct/config';

interface CroctProviderProps {
    children: ReactNode;
    userId?: string;
}

interface CroctTrackingContextValue {
    trackGoal: (goalId: string, data?: Record<string, unknown>) => void;
    identify: (userId: string) => void;
}

const CroctTrackingContext = createContext<CroctTrackingContextValue | null>(null);

export function useCroctTracking() {
    const context = useContext(CroctTrackingContext);

    if (!context) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('[Croct] useCroctTracking used outside of CroctProvider');
        }
        return {
            trackGoal: () => {},
            identify: () => {},
        };
    }

    return context;
}

function CroctTrackingInnerProvider({ children, userId }: CroctProviderProps) {
    const croct = useCroct();

    const trackGoal = useCallback(
        (goalId: string, data?: Record<string, unknown>) => {
            if (croct) {
                croct.track('goalCompleted', {
                    goalId,
                    ...data,
                });

                if (croctConfig.debug) {
                    console.log('[Croct] Goal tracked:', goalId, data);
                }
            }
        },
        [croct],
    );

    const identify = useCallback(
        (userId: string) => {
            if (croct) {
                croct.identify(userId);

                if (croctConfig.debug) {
                    console.log('[Croct] User identified:', userId);
                }
            }
        },
        [croct],
    );

    useEffect(() => {
        if (userId) {
            identify(userId);
        }
    }, [userId, identify]);

    const value: CroctTrackingContextValue = {
        trackGoal,
        identify,
    };

    return <CroctTrackingContext.Provider value={value}>{children}</CroctTrackingContext.Provider>;
}

export function CroctProvider({ children, userId }: CroctProviderProps) {
    if (!croctConfig.appId) {
        return <>{children}</>;
    }

    return (
        <BaseCroctProvider appId={croctConfig.appId} debug={croctConfig.debug}>
            <CroctTrackingInnerProvider userId={userId}>{children}</CroctTrackingInnerProvider>
        </BaseCroctProvider>
    );
}
