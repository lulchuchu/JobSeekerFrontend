import { useEffect, useState } from "react";
import axios from "axios";
const useApiRequest = (url, params) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                url,
                { params: params }
            );

            setData(result.data);
        };
        fetchData();
    }, [params]);
    return {data}
  };
  

  export default useApiRequest;