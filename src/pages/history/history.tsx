import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ItemDisplay from "../item-img";
import { useInfiniteQuery} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../App";
import "../pages.css"
import { Loading } from "../../components/loading";
import { IsLoading } from "../../components/isloading";

const API_KEY = "H7sliSSEic30w5csJ82RfWPxEseul03fIquAtOKMWAw";
const API_URL = "https://api.unsplash.com/search/photos";

export const History = () => {
  
  const {ref, inView} = useInView();
 
  const {searchedWord} = useContext<any>(AppContext)
  const [keyWord, setKeyWord] = useState("");
  
  
  
  const fetchData = async({pageParam}: {pageParam: number}) => {
    if (keyWord === "") {
      return await axios.get(`${API_URL}?query=popular&page=${pageParam}&per_page=10&client_id=${API_KEY}`);
    } else {
      return await axios.get(`${API_URL}?query=${keyWord}&page=${pageParam}&per_page=10&client_id=${API_KEY}`);
    }
  } 
  


  
  
  const {
    
    data,
    isLoading,
    error, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } = useInfiniteQuery({
      queryKey: ["search", keyWord],
      queryFn: fetchData,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages, allPages) => (allPages + 1)
    })

 
    
    useEffect(() => {
      if(inView && hasNextPage) {
        fetchNextPage()
      }
    },[inView])
    
    const handleButtonClick = (word: string) => {
      setKeyWord(word);
    };
    
   
  
  
  return (

    <div className="home">

        <div className="keyword flex justify-center gap-6  py-3 pb-4 flex-wrap">
          {searchedWord.map((word: string, indx: number) => (
            <>
            <button className="lg:text-xl relative " key={indx} onClick={() => handleButtonClick(word)} >
              {word} 
              <span style={{
                content: "''",
                display: keyWord === word ? "block" : "",
                position: keyWord === word ? "absolute" : "relative",
                top: "20px",
                width: "100%",
                height: "4px",
                backgroundColor: "#00ffff",
                
              }} ></span>
             </button>
            
            </>
          ))}
        </div>

          {isLoading ? <Loading /> :
            <>
              <ul className="px-2 lg:px-4">
                    {data?.pages.map((page: any) => (
                      
                      page.data.results.map((photo: any) => (
                        <ItemDisplay key={photo.id} data={photo} />
                      )) 
                    ))}
                    
              </ul> 
            </>  
          }
        <div className="flex justify-center py-6 pt-10">
          <p >{isFetching && isFetchingNextPage && hasNextPage ? <IsLoading /> : ""}</p>
          <span className="invisible" ref={ref}>this is ref</span>        
        </div>

      </div>
      
    )
      
  
};
