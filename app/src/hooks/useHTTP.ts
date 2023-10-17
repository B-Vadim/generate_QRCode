import { useCallback, useState } from "react"

export const useHTTP = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const request = useCallback(async (url: string, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      try {
         if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
         };

         const res = await fetch(url, {method, body, headers});
         const data = await res.json();

         if (!res.ok) {
            throw new Error(data?.message || 'request is not success');
         }

         setIsLoading(false);
         return data;
      } catch (e) {
         setIsLoading(false);
         setError(e?.message || 'error request')
      }
   }, []);

   const clearError = useCallback(() => setError(null), []);

   return {
      request,
      isLoading,
      error,
      clearError
   };
}