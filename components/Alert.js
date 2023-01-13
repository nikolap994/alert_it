import React from 'react'

function Alert(props) {
  
    const capital=(text)=>{
        const alert  = text.toLowerCase();
        return alert.charAt(0).toUpperCase()+alert.slice(1);
    }

  return (
      <div>
      {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        <strong>{capital(props.alert.type)} : </strong> {props.alert.msg}
     </div>}
     </div>
  )
}

export default Alert
