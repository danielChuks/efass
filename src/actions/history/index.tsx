import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
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
            return error;
        }
    }, []);

    const handleReportDelete = useCallback(async (id: any) => {
        try {
            const response = await fetchWrapper.delete(
                `${BASEAPI_EXTENSION.BASEAPI}activity/${id}`
            );
            return response;
        } catch (error) {
            console.error('Error deleting this report :', error);
            throw error;
        }
    }, []);

    return { handlereportHistory, handleReportDelete };
};
