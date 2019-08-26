import wwwRequest from './base'
import qs from 'qs';

export default class Controller {
    constructor(resourcePath){
        this.resourcePath = resourcePath;
    }

    static create(path){
        return new Controller(path);
    }

    getAll(params){
        return wwwRequest.get(this.resourcePath,{params});
    }

    post(json){
        return wwwRequest.post(this.resourcePath,json);
    }

    postConf(formData,config){
        return wwwRequest.post(this.resourcePath,formData,config)
    }

    postForm(data){
        return wwwRequest.post(this.resourcePath,qs.stringify(data),{
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
    }

    put(formData){
        return wwwRequest.put(this.resourcePath,formData)
    }

    putJson(json){
        return wwwRequest.put(this.resourcePath,json,{
            headers:{'Content-Type':'application/json'}
        });
    }

    delete(params){
        return wwwRequest.delete(this.resourcePath,{data:params})
    }
}