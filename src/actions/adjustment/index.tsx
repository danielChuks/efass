import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useFetchWrapper } from "../../hooks/useFetchWrapper";
import { memoAdjustmentAtom } from "../../state/adjustment";
import { BASEAPI_EXTENSION } from "../../enums";

export const useAdjustmentAction = () => {
    const fetchWrapper = useFetchWrapper();
    const setMemoData = useSetRecoilState(memoAdjustmentAtom);

    const getMemoData = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}memo/all`
            );
            setMemoData(response);
        } catch (error) {
            console.error("Error fetching memo data:", error);
            throw error;
        }
    }, []);

    const updateMemoData = useCallback(async (id: any, data: any) => {
        if (!id || !data) {
            console.error("Invalid parameters for updateMemoData");
            return;
        }

        try {
            await fetchWrapper.put(
                `${BASEAPI_EXTENSION.BASEAPI}memo/${id}`,
                data
            );
        } catch (error) {
            console.error("Error updating memo data:", error);
            throw error;
        }
    }, []);

    return { getMemoData, updateMemoData };
};
