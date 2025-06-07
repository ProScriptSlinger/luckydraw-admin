"use client";
import { useEffect, useState } from 'react';

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */
function useTelegramInitData() {
    const [data, setData] = useState<Record<string, any>>({});

    useEffect(() => {
        let isMounted = true; // To prevent state updates if the component is unmounted
        let intervalId: NodeJS.Timeout;

        const parseInitData = () => {
            if (
                typeof window !== 'undefined' &&
                window.Telegram &&
                window.Telegram.WebApp &&
                window.Telegram.WebApp.initData
            ) {
                const firstLayerInitData = Object.fromEntries(
                    new URLSearchParams(window.Telegram.WebApp.initData)
                );

                const initData: Record<string, any> = {};

                for (const key in firstLayerInitData) {
                    try {
                        initData[key] = JSON.parse(firstLayerInitData[key]);
                    } catch {
                        initData[key] = firstLayerInitData[key];
                    }
                }

                if (isMounted) {
                    setData(initData);
                }

                return true; // Indicate that initData was found and parsed
            }
            return false; // Indicate that initData is not yet available
        };

        // Initial attempt to parse initData
        if (!parseInitData()) {
            // If not available, set up polling every 100ms
            intervalId = setInterval(() => {
                if (parseInitData()) {
                    clearInterval(intervalId); // Clear the interval once data is found
                }
            }, 100);
        }

        // Cleanup function to clear the interval and prevent state updates if unmounted
        return () => {
            isMounted = false;
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return data;
}

export default useTelegramInitData;
