import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { BASEAPI_EXTENSION } from '../../enums';

export const useGlMapppingActions = () => {
    const fetchWrapper = useFetchWrapper();

    const getItemCodes = useCallback(async (statementCode: string) => {
        statementCode;
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/fetchItemCodes?statementCode=${statementCode}`
            );
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    const getItemDescription = useCallback(
        async (statementCode: string, itemCode: string) => {
            try {
                const response = await fetchWrapper.get(
                    `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/getItemDesc?statementCode=${statementCode}&itemCode=${itemCode}`
                );
                return response;
            } catch (error) {
                return error;
            }
        },
        []
    );

    const getStatementCodes = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/fetchStatementCodes`
            );
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
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/createGlMappingData`,
                glData
            );
          
            return response;
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
            return response;
        } catch (error) {
            return error;
        }
    }, []);

    const deleteGlData = useCallback(async (statementCode: string) => {
        try {
            const response = await fetchWrapper.delete(
                `${BASEAPI_EXTENSION.BASEAPI}efassGlMapping/deleteByStatementCode?statementCode=${statementCode}`
            );
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
