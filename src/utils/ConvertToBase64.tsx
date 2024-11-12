// export const ConvertToBase64 = (file: any | undefined) => {
//     return new Promise((resolve) => {
//       let baseURL: any;
  
//       // Make new FileReader
//       let reader = new FileReader();
  
//       // Convert the file to base64 text
//       reader.readAsDataURL(file);
  
//       // on reader load somthing...
//       reader.onload = () => {
//         // Make a fileInfo Object
//         // // baseURL = reader.result;
//         // // resolve(baseURL);
//         if (typeof reader.result === 'string') {
//           resolve(reader.result);
//         } else {
//           reject(new Error('Failed to convert file to base64'));
//         }
//       };
//     });
//   };
export const ConvertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
