const getCharLength = (str)=>{
    let len = 0;
    for (let i=0;i<str.length;i++){
        if(str.charCodeAt(i)<27 || str.charCodeAt(i)>126){
            len += 2;
        }else {
            len++;
        }
    }
    return len;
};
export default getCharLength;