import React from 'react'
import addNotification from 'react-push-notification';
// import { Button } from "@/components/ui/button"
// import {img} from "/Users/prajein/Documents/SIH/multi-modal-coal/admin/public/images/ship.png";

function Notification() {
    const clickToNotify = ()=>{
        addNotification({
          title:'Notification Test',
          message:'Works',
          duration:4000,
          // icon:img,
          native:true,
          onClick: ()=> console.log('Notification')
        })
    }
  return (
    
    <div>
        <button onClick={clickToNotify}>
          Click To Notify
        </button>
        
    </div>
  )
}

export default Notification