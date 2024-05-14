import { useEffect, useContext } from 'react';
import {LoadingContext} from "../LoadingProvider";

const useLoadingEffect = (isLoading) => {
    const { setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);
};

export default useLoadingEffect;