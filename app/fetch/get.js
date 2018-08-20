import 'whatwg-fetch'
import 'es6-promise'

 export function get(url){
     var allUrl="http://localhost:3000"+url;
     console.log(allUrl,'allurl----------');
    var result = fetch(allUrl, {
        credentials: true,
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    });
     return result;
 }