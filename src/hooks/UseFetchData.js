import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

export default function UseFetchData({
  min,
  max,
  selectedoption,
  zetacode,

}) {
  const authHeader = useAuthHeader();

  const fetchData = async () => {
    let params = {
      zetacode: zetacode,
   
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

    const res = await axios.get(
      "https://dark-gold-sea-urchin-slip.cyclic.app/getdata",
      {
        headers: { Authorization: authHeader() },
        params: params,
      }
    );

    return res;
  };

  return useQuery({
    queryKey: ["TableData"],
    queryFn: fetchData,
  });
}
