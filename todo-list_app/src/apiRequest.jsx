import React from "react";

const apiRequest = async (url = "", optionsObj = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Reload App");
    return response;
  } catch (err) {
    errMsg = err.message;
  }
};

export default apiRequest;
