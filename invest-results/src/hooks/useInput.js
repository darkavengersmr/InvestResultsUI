import { useState } from "react";

const useInput = (initial, validateType) => {

  // validateType: positiveNumber, notNullText, password

  const validateTypes = {
    positiveNumber: {
      re: /^\d*[1-9]\d*$/,
      errorText: "Введите число больше 0",
    },
    notNullText: {
      re: /^([a-zA-Z0-9_-]){3,128}$/,
      errorText: "Как минимум 3 символа",
    },   
    password: {
      re: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
      errorText: "Слишком слабый пароль, введите 8 симоволов с использованием цифр и букв разного регистра",
    },
    email: {
      re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorText: "Не соответствует формату email",
    },
  }

  const [value, setValue] = useState(initial);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const validateInput = e => {

    var error = false;

    for (let thisType in validateTypes) {            
      if (validateType === thisType && 
          !String(e.target.value).match(validateTypes[thisType].re)
        ) {
        setError(true);
        setHelperText(validateTypes[thisType].errorText);  
        error = true;        
      }
    }

    if (!error) {
      setError(false);
      setHelperText("");      
    }    
  }

  let result = {
    value,
    error,    
    onChange: e => { 
      setValue(e.target.value);
      validateInput(e);
    },
    onBlur: validateInput
  }

  if (validateType === 'required' && !value) {
    result['error'] = true;
  } else if (validateType === 'required' && value) {
    result['error'] = false;
  } else if (validateType !== '') {
    result['helperText'] = helperText;
  }

  return result;
};

export default useInput