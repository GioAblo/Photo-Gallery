import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ItemDisplay from "../item-img";
import { useInfiniteQuery} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../App";
import "../pages.css"
import { Loading } from "../../components/loading";
import { IsLoading } from "../../components/isloading";


const API_KEY = "H7sliSSEic30w5csJ82RfWPxEseul03fIquAtOKMWAw";
const API_URL = "https://api.unsplash.com/search/photos";

export const Home = () => {
  const [keyWord, setKeyWord] = useState("");
  const {ref, inView} = useInView();

  const {searchedWord, setSearchedWord} = useContext<any>(AppContext)
  
  
  const fetchData = async({pageParam}: {pageParam: number}) => {
    if (keyWord === "") {
      return await axios.get(`${API_URL}?query=popular&page=${pageParam}&per_page=20&client_id=${API_KEY}`);
    } else {
      return await axios.get(`${API_URL}?query=${keyWord}&page=${pageParam}&per_page=10&client_id=${API_KEY}`);
    }
  } 
  

  
  
  const {
    error,
    data,
    isLoading,
     fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } = useInfiniteQuery({
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
    
   
    
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      const newKeyword = e.target.elements.keyword.value;
      setKeyWord(e.target.elements.keyword.value);
      
      // Check if the new keyword already exists in the searchedWord array
      if (!searchedWord.includes(newKeyword)) {
        // If not, add it to the state
        setSearchedWord((prevKeyword: any) => [...prevKeyword, newKeyword]);
      }
      
      // Clear the input field after submission
      e.target.elements.keyword.value = "";
    };
    console.log(error);
    
    
  
  return (
    <div className="home relative">
        <form className="flex justify-center my-3 mt-5 lg:mb-5" onSubmit={handleSubmit}>
          {/* <input name="keyword" placeholder="Search..." /> */}
          <input name="keyword" placeholder="Search..." className="input md:w-1/2 lg:h-10 2xl:w-2/6 2xl:h-11"  type="text"></input>
          
          <button className="hidden" type="submit"></button>
        </form>  
      
        {isLoading ? <Loading  /> : 
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
