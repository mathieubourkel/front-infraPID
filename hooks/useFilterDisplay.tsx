import { ReactNode, useState  } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  filteredData: any[],
  renderNextButton: () => ReactNode
  renderBeforeButton: () => ReactNode
  reloadFilteredData: (newData:any[]) => void;
}

export const useFilterDisplay = (number:number, dataToFilter:any[]):Props =>{

  const [current, setCurrent] = useState<number>(number)
  const [filteredData, setFilteredData] = useState<any[]>(dataToFilter.slice(0, number))

  const renderNextButton = () => {
    if (current < dataToFilter.length && current + number != dataToFilter.length) {
    return (
      <button className="bg-transparent text-black" 
      onClick={() => handleNext(true)}>
        <FontAwesomeIcon icon={faChevronRight} />
        </button>
    )}
  }

  const reloadFilteredData = (newData:any[]) => {
    setFilteredData(newData.slice(0, number))
    setCurrent(number)
  }

  const renderBeforeButton = () => {
    if (current - number != 0 && current != 0) {
    return (
      <button className="bg-transparent text-black" 
      onClick={() => handleNext(false)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    ) }
  }

  const handleNext = (next: boolean) => {
    if (next) {
      setFilteredData(dataToFilter.slice(current, Math.min(current + number, dataToFilter.length)))
      setCurrent(current + number)
    } else {
      setFilteredData(dataToFilter.slice(Math.max(0, current - (number *2)), current - number ))
      setCurrent(current - number)
    }
  }
  return {filteredData, renderNextButton, renderBeforeButton, reloadFilteredData}
}
