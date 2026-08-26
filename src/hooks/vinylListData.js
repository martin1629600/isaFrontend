import {useCallback, useState} from "react";
import { Axios } from "../core/httpClient";



const useListData = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const getData = useCallback(async (url) => {
        setLoading(true);

        let result = await Axios.get(url);

        setData(result.data);
        setLoading(false);
    }, [url]);
    return {getData, loading, data};
}

export default useListData;