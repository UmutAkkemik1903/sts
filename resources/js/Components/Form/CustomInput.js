import React from 'react';

const CustomInput = ({title ,type = "text", placeholder, value, handleChange,handleBlur}) => {
    return (
        <div className="form-group">
            <label htmlFor="inputEmail">{title}</label>
            <input
                autoComplete="off"
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    )
};
export default CustomInput;
