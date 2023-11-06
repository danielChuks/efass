import { useCallback } from "react";
import { useFetchWrapper } from "../../hooks/useFetchWrapper";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BASEAPI_EXTENSION } from "../../enums";
import { reportHistoryAtom } from "../../state/reportHistory";
export const useReportHistoryActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setReportData = useSetRecoilState(reportHistoryAtom);

  const handlereportHistory = useCallback(async () => {
    try {
      const response = await fetchWrapper.get(
        `${BASEAPI_EXTENSION.BASEAPI}activities`
        );
        if (response) {
            setReportData(response);
        } else {
        return [];
        // console.log(response);
        // setReportData([])
      }
    } catch (error) {
      // setReportData([]);
      console.log(error);
      return error;
    }
  }, []);

  return { handlereportHistory };
};
