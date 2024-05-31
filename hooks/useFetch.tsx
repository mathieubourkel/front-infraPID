import { useState, useEffect, ReactNode } from "react";
import { useApi } from "./useApi";
import { DataStatusEnum } from "../services/enums/data.status.enum";
import ErrorFetchingData from "../components/ErrorFetchingData";

type Props = {
  data: any
  updateData: (newData:object | []) =>void;
  status: DataStatusEnum
  handleErrorAndLoading: () => ReactNode
  handleReload: () => void;
}

export const useFetch = (url:string):Props =>{
  const api = useApi()
  const [data, setData] = useState<object | [] | null>(null);
  const [status, setStatus] = useState<DataStatusEnum>(DataStatusEnum.BUSY);
  const [reload, setReload] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await api.get(url)
        setData(data);
        setStatus(DataStatusEnum.FIRST_FETCH)
      } catch (error) {
        setStatus(DataStatusEnum.ERRORS)
      }
    };
    fetchData();
  }, [url, reload, api]);
  
  const updateData = (newData:object | []) => {
    setData(newData);
    setStatus(DataStatusEnum.MODIFIED)
  };

  const handleErrorAndLoading = () => {
   if (status === DataStatusEnum.BUSY) {
    return (
      <div className="flex justify-center mt-20">
        {/* <Spinner className="h-16 w-16 text-brick-300" /> */}
      </div>)
    } else if (status === DataStatusEnum.ERRORS) {
      return <ErrorFetchingData name={url} />
    }
  }

  const handleReload = () => setReload((bool) => !bool);

  return {data, updateData, status, handleErrorAndLoading, handleReload}
}
