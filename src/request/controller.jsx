import wwwRequest from './base'

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

    post(formData){
        return wwwRequest.post(this.resourcePath,formData);
    }

    postConf(formData,config){
        return wwwRequest.post(this.resourcePath,formData,config)
    }

    postJson(json){
        return wwwRequest.post(this.resourcePath,json,{
            headers:{'Content-Type':'application/json'}
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