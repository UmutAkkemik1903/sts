import React from 'react';
const SubHeaderComponent = (props) => {
    return (
        <div style={{ display:'flex'}}>
            <input placeholder={"ara"} onChange={props.filter} style={{ flex:1}} type="text"
                   className="ml-1 form-control searchInput" />
            <button id="createButton" style={{marginLeft:2}} className={props.action.class} onClick={props.action.uri}>
                {props.action.title}
            </button>

        </div>
    )
};
export default SubHeaderComponent;
