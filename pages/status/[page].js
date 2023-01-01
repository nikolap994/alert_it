import React from 'react'
import Image from 'next/image';

function StatusPage(props) {
  return (
    <div className="mt-10 max-w-7xl mx-auto px-4 md:px-6 h-screen">
      <div className = "flex flex-row">
        <div>
          <Image 
            src = {"data:image/gif;base64," + props.image}
            width = {400}
            height = {400}
          />
        </div>
        <div className = "pl-8 text-stone-50 space-y-6">
          <h1>Site Name: {props.name}</h1>
          <h1>Site url : {props.url}</h1>
          <h1>Last check time: {props.lastCheck}</h1>
          <h1>Status: {props.upCheckStatus.toString()}</h1>
          <h1>Accepted Status code: {props.acceptedStatusCodes}</h1>
          <h1>Port: {props.port}</h1> 
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    const monitorId = context.query.page;
    if(typeof monitorId == "undefined")
    { 
        return { 
            redirect : {destination: "/404"}
        }
    }else{ 
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
        try{ 
          const response = await fetch( process.env.SITE_URI + "/api/monitors?id=" + monitorId, requestOptions);
          const monitors = await response.json();
          console.log(monitors);
          if(!monitors.data[0])
          { 
            return{ 
              redirect: {destination : "/404"}
            }
          }else{
            return {
                props: {
                  name: monitors.data[0].name,
                  url: monitors.data[0].url,
                  heartbeat: monitors.data[0].heartbeat,
                  acceptedStatusCodes: monitors.data[0].acceptedStatusCodes,
                  monitorType: monitors.data[0].monitorType,
                  port: monitors.data[0].port,
                  image: monitors.data[0].image, 
                  lastCheck : monitors.data[0].lastCheck,
                  upCheckStatus : monitors.data[0].upCheckStatus
                },
              }
          }
        }catch(err)
        { 
          console.log(err);
        }
    }    
    return {props: {}}
}
export default StatusPage; 