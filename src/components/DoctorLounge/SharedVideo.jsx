import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SharedVideo = () => {
    const {id} = useParams();
    
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventInspect = (event) => {
      if ((event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
          (event.ctrlKey && event.keyCode === 73)) { // Ctrl+I
        event.preventDefault();
      }
    };

    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('keydown', preventInspect);

    return () => {
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('keydown', preventInspect);
    };
  }, []);
  return (
   <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100%'}}>
   <video style={{height:'70vh',width:'80vw',}} src={decodeURIComponent(id)} controls autoplay controlsList="nodownload"/>
   </div>
  )
}

export default SharedVideo