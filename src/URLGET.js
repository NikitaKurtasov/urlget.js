// --source. Not support old browsers
"use strict"
const urlGet = {
    urlGetProp: {},
    urlGetPropStatic: {},
    urlGetText: window.location.search,
    initGetProperties() {
        if(this.urlGetText) {
            let pattern = /\w*=\w*[-+\.~%\w]*/igu,
                matchResult = this.urlGetText.match(pattern),
                getStorage = {},
                getStorageStatic = {};
            for(let i = 0; i < matchResult.length; i++) {
                let valKey = matchResult[i].split('=');
                    getStorage[valKey[0]] = valKey[1];
                    getStorageStatic[valKey[0]] = valKey[1];
            }
            this.urlGetProp = getStorage;
            this.urlGetPropStatic = getStorageStatic;
            return this;
        } else {
            return this;
        }
    },
    addGetProperties(prop=0) {
        if(prop) {
            if(prop.constructor === Object) {
                let properties = (Object.keys(this.urlGetProp).length) ? this.urlGetProp : {};
                for(let key in prop) {
                    if(!properties[key]) {
                        properties[key] = prop[key];
                    }
                }
                this.urlGetProp = properties;
                return this;
            } else {
                console.error('The argument passed is not an object.');
            }
        } else {
            return this;
        }
    },
    removeGetProperties(prop=0) {
        if(prop) {
            if(Object.keys(this.urlGetProp).length) {
                let properties = this.urlGetProp;
                if(typeof(prop)==='string') {
                    if(prop in properties) {
                        delete properties[prop];
                    }
                    this.urlGetProp = properties;
                    return this;
                } else if((prop.constructor===Array)) {
                    for(let key of prop) {
                        if(key in properties) {
                            delete properties[key];
                        }
                    }
                    this.urlGetProp = properties;
                    return this;
                } else {
                    console.error('The argument passed is not a string or an array.');
                }
            } else {
                return this;
            }
        } else {
            return this;
        }
    },
    replaceGetValues(prop=0) {
        if(prop) {
            if(Object.keys(this.urlGetProp).length) {
                if(prop.constructor === Object) {
                    let properties = this.urlGetProp;
                    for(let keyProp in prop) {
                        for(let keyProperties in properties) {
                            if(keyProp==keyProperties) {
                                properties[keyProperties] = prop[keyProp];
                                break;
                            }
                        }
                    }
                    this.urlGetProp = properties;
                    return this;
                } else {
                    console.error('The argument passed is not an object.');
                }
            } else {
                return this;
            }
        } else {
            return this;
        }
    },
    createGetString(prop=0) {
        let newGetString = '?';
        if(prop) {  
            if(prop.constructor === Object) {
                let counter = 0,
                    propLength = Object.keys(prop).length;
                for(let key in prop) {
                    let str = `${key}=${prop[key]}`;
                    if(counter!=propLength-1) {
                        newGetString = newGetString + `${str}&`;
                    } else {
                        newGetString = newGetString + `${str}`;
                    }
                    counter = counter + 1;
                }
                return newGetString;
            } else {
                console.error('The argument passed is not an object.');
            }
        } else {
            let propLength = Object.keys(this.urlGetProp).length;
            if(propLength) {
                let counter = 0;
                for(let key in this.urlGetProp) {
                    let str = `${key}=${this.urlGetProp[key]}`;
                    if(counter!=propLength-1) {
                        newGetString = newGetString + `${str}&`;
                    } else {
                        newGetString = newGetString + `${str}`;
                    }
                    counter = counter + 1;
                }
            return newGetString;
            } else {
                return '';
            }
        }
    },
    searchGetProperties(prop=0, flag=0) {
        if(prop) {
            let obj = (flag==='in_static') ? this.urlGetPropStatic : this.urlGetProp,
                objLength = Object.keys(obj).length;
            if(objLength) {
                if(typeof(prop)==='string') {
                    let result = false;
                    if(prop in obj) {
                        result = true;
                    }
                    return result;
                } else if(prop.constructor===Array) {
                    let result = [];
                    for(let key of prop) {
                        if(key in obj) {
                            result.push(true);
                        } else {
                            result.push(false);
                        }
                    }
                    return result;
                } else {
                    console.error('The argument passed is not a string or an array.');
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    existsGet() {
        return !!this.urlGetText;
    }
}
urlGet.initGetProperties();