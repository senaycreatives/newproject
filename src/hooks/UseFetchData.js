import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function UseFetchData({ min, max,Floorno, selectedoption, zetacode ,page}) {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  
  const fetchData = async () => {
    let params = {
      zetacode: zetacode,
      floorNumber: Floorno,
      page:page
    };

    switch (selectedoption) {
      case "HotTemperature":
        params.minHotTemperature = min;
        params.maxHotTemperature = max;
        break;
      case "HotFlow":
        params.minHotflow = min;
        params.maxHotflow = max;
        break;
      case "ColdFlow":
        params.minColdFlow = min;
        params.maxColdFlow = max;
        break;
      case "ColdReturn":
        params.minColdReturn = min;
        params.maxColdReturn = max;
        break;
      case "HotFlushTemperature":
        params.minHotFlushTemperature = min;
        params.maxHotFlushTemperature = max;
        break;
      case "HotReturn":
        params.minHotReturn = min;
        params.maxHotReturn = max;
        break;
      case "ColdTemperature":
        params.minColdTemperature = min;
        params.maxColdTemperature = max;
        break;
      case "Date":
        params.startDate = min;
        params.endDate = max;
        break;
      default:
        break;
    }

    try {
      const res = await axios.get(
        "https://server.industrialclearance.co.uk/getdata",
        {
          headers: { Authorization: authHeader() },
          params: params,
        }
      );

      console.log(res);
      return res;
    } catch (error) {
      // Check if the error is due to an invalid token
      if (error.response && error.response.status === 401) {
      console.log('clear')
        localStorage.clear();
        navigate("/login");
      }
      throw error; // Re-throw the error after handling the invalid token
    }
  };

  return useQuery({
    queryKey: ["TableData"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
}
