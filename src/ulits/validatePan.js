const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };


  const validateAadhar = (aadhar) => {
    const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
    return aadharRegex.test(aadhar);
  };

  const validateAccountNumber = (accountNumber) => {
    const accountNumberRegex = /^[0-9]{9,18}$/;
    return accountNumberRegex.test(accountNumber);
  };
  
  const validateIFSC = (ifsc) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  };


  export  {validatePAN, validateAadhar,validateAccountNumber,validateIFSC}