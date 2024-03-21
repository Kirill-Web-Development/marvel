import { useState} from "react";

const useHttp = () => {
    const [loading, setIsLoading] = useState(false);

    const request = async (url, method = 'GET', body = null, headers='Content-Type: application/json') => {
        const HEADERS = method === 'POST' ? headers || {'Content-Type': 'application/json'} : null;

        try {

            setIsLoading(true)
            const response = await fetch(url, {method, body, HEADERS});
            if (!response.ok) {
                throw new Error(`Error while fetching ${url}, error status: ${response.status}`)
            }
            const data = await response.json();
            setIsLoading(false);
            return data ;

        } catch(e) {
            setIsLoading(false);
            console.error(e);
            return null;
        }

    }

    return [loading, request]
}


export {useHttp};