// import './Loading.scss';
import React from 'react';

const Loading:React.FC<{height:string}> = (props):JSX.Element => {
    return (
        <div style={{height:props.height}} className='loading'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading