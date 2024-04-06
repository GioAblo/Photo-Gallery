import "../App.css"

export const Loading = () => {
  return (
    <div style={{top: "30vh", left: "42%"}} className="absolute flex justify-center flex-col items-center">
        <div className="spinner"></div>
        <div>Loading...</div>
    </div>
  )
}
