import { useState } from "react";
import "./pages.css"


const ItemImg = (props: any) => {

 
  const {urls,  likes, alt_description, description } = props.data
  console.log(props.data);
  


  const[popUp, setPopUp] = useState(true)


  return (

    <li className="" >
      {popUp 
      ? 
      <img alt={alt_description} onClick={() => setPopUp(!popUp)} className="cursor-pointer hover:opacity-80 " src={urls.regular} /> 
      : 

      <div className="flex justify-center items-center w-full  h-screen fixed top-0 left-0  " style={{backdropFilter: "brightness(0.1)"}}>
        <img  alt={alt_description} className="cursor-pointer max-h-screen" src={urls.regular} />
          <span style={{rotate: "90deg", fontFamily: "cursive"}} className="cursor-pointer absolute top-4 right-5 text-xl font-bold md:text-3xl lg:top-6 lg:right-9 xl:text-4xl" onClick={() => setPopUp(!popUp)}>X</span>
          <div className="lg:top-6 lg:left-7  absolute top-4 left-5 md:text-xl xl:text-2xl"> <span style={{color: "#00ffff"}}>{likes}</span>  Likes</div>
      </div>
      }
      

    </li>
  )
}

export default ItemImg