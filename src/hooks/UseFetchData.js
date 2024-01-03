import {
    useQuery,
 
  } from '@tanstack/react-query'
import axios from "axios";
import {useAuthHeader} from 'react-auth-kit'




export default function UseFetchData() {
  const authHeader = useAuthHeader()
  console.log(authHeader())

  

    const fetchData = async () => {
        const res = await axios.get('https://gentle-puce-angler.cyclic.app/getdata',{ headers: {Authorization:authHeader()}});
       
        return res;
      };
    
  return useQuery({
    queryKey: ['TableData'],
    queryFn: fetchData,
  } );
}