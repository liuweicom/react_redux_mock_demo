import {get} from'../get';

export function getAdData(){
    const result= get('/api/homead');
    return result;
}

export function getListData(city, page){
    console.log(city,page,encodeURIComponent(city));
    const result=get('/api/homelist/'+page+'/'+city);
    console.log(result,'result');
    return result;
}