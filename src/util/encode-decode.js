import base64 from 'base-64';
import utf8 from 'utf8';



const encodeData = (data) => base64.encode(utf8.encode(data))

const decodeData = (data) => utf8.decode(base64.decode(data));


module.exports = {
    encodeData,
    decodeData
};