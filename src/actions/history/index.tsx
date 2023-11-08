import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BASEAPI_EXTENSION } from '../../enums';
import { reportHistoryAtom } from '../../state/reportHistory';
export const useReportHistoryActions = () => {
    const fetchWrapper = useFetchWrapper();
    const setReportHistory = useSetRecoilState(reportHistoryAtom);

    const handlereportHistory = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}activities`
            );
            if (response.length > 0) {
                setReportHistory(response);
            } else {
                setReportHistory([]);
                return [];
            }
        } catch (error) {
            setReportHistory([]);
            console.log(error);
            return error;
        }
    }, []);

    return { handlereportHistory };
};
