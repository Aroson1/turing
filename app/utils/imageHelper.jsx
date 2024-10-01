
/**
 * Converts a file to base64 string.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} A promise that resolves with the base64 string representation of the file.
 */
export const getBase64 = (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
})