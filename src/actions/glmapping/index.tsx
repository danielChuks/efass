import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
import { BASEAPI_EXTENSION } from '../../enums';
import { GL, CustomGL } from '@/interfaces';

export const useGlMapppingActions = () => {
    const fetchWrapper = useFetchWrapper();

    const getItemCodes = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/fetchItemCodes`
            );
            // console.log(response.status);
            // console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    const getItemDescription = useCallback(async (itemCode: string) => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/getItemDesc?itemCode=${itemCode}`
            );
            console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    const getStatementCodes = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/fetchStatementCodes`
            );
            console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    const getStatementDescription = useCallback(
        async (statementCode: string) => {
            try {
                const response = await fetchWrapper.get(
                    `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/getStatementDesc?statementCode=${statementCode}`
                );
                console.log(response);
                return response;
            } catch (error) {
                return error;
            }
        },
        []
    );

    const postGlData = useCallback(async (glData: any) => {
        try {
            const response = await fetchWrapper.post(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping`,
                glData
            );
            console.log(response);
            return response;

            // if (response.responseCode === 0) {
            //     return response;
            // } else {
            //     return response;
            // }
        } catch (error) {
            return error;
        }
    }, []);

    const updateGlData = useCallback(async (data: any) => {
        try {
            const response = await fetchWrapper.post(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/updateGlData`,
                data
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error updating memo data:', error);
            throw error;
        }
    }, []);

    const getAllGlData = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/getAllGlData`
            );
            console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    const deleteGlData = useCallback(async (itemCode: string) => {
        try {
            const response = await fetchWrapper.delete(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/deleteByItemCode?itemCode=${itemCode}`
            );
            console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    return {
        updateGlData,
        getItemCodes,
        deleteGlData,
        postGlData,
        getStatementDescription,
        getItemDescription,
        getStatementCodes,
        getAllGlData,
    };
};
