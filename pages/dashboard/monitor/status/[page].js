import React from 'react'
import { async } from '../../user/index';

function StatusPage(props) {
  return (
    <h1>{props.url}</h1>
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
           return {
              props: {
                monitorId: monitorId,
                name: monitors.data[0].name,
                url: monitors.data[0].url,
                heartbeat: monitors.data[0].heartbeat,
                acceptedStatusCodes: monitors.data[0].acceptedStatusCodes,
                monitorType: monitors.data[0].monitorType,
                SITE_URI: process.env.SITE_URI,
                enabled: monitors.data[0].enabled,
                port: monitors.data[0].port,
              },
            }
        }catch(err)
        { 
          console.log(err);
        }
    }    
    return {props: {}}
}


export default StatusPage; 