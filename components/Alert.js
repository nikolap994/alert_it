import React from 'react'

function Alert(props) {

  const capital = (text) => {
    const alert = text.toLowerCase();
    return alert.charAt(0).toUpperCase() + alert.slice(1);
  }

  return (
    <div>
      {props.alert && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">{capital(props.alert.msg)} </strong>
      </div>}
    </div>

  )
}

export default Alert
