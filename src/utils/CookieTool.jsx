// const getCookieByName = (name)=>{
//     let cookies = document.cookie;
//     cookies = cookies.replace(/\s+/g,"");
//     let cookie_array = cookies.split(";");
//     for (let cookie of cookie_array){
//         let array = cookie.split("=");
//         console.log(array[0]);
//         if(array[0]===name){
//             return array[1];
//         }
//     }
//     return null;
// };

const getCookies = ()=>{
    let cookieStr = decodeURI(document.cookie);
    cookieStr = cookieStr.replace(/=/g,'":"');
    cookieStr = cookieStr.replace(/;\s+/g,'","');
    if(cookieStr===""){
        return null
    }
    return JSON.parse('{"' + cookieStr + '"}');
};
export default getCookies;