const generateFormData = (obj: any) => {
  
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value === undefined || value === null) {
        return;
      }
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    });

    return formData;
  };
export default  generateFormData;