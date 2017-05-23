function merge(obj1,obj2){
    for(let k in obj2){
        obj1[k] = obj2[k];
    }
}
function objToArr(obj){
    let arr = [];
    for(let k in obj){
        arr.push(obj[k])
    }
    return arr;
}


/**
 * const dataOpt = {
            struct:chartDataStruct,
            keys:(function(){
                return getInnerDays(args.startDate,args.endDate);
            })(),
            fill:0,
            keyName:"acctDay"
        }
 * @param aData
 * @param dataOpt
 */
exports.complementData = function(aData,dataOpt){
    const {struct,keys,fill,keyName} = dataOpt;
    //把根据keys生成一个struct的数组 然后把aData merge进去
    let oFilleds = {},oData = {};
    keys.map(v=>{
        let o = {}
        if(typeof fill === "object"){
            o = fill
        }else{
            for(let k in struct){
                o[k] = fill
            }
            o[keyName] = v;
        }
        oFilleds[v] = o;
    })
    aData.map(v=>{
        oData[v[keyName]] = v;
    })
    merge(oFilleds,oData);
    //解开oFilleds

    return objToArr(oFilleds);
}

exports.fixed = function(num,prec){
    var number = parseFloat(num);
    if(number && /\.\d{2,}/.test((""+number))){
        return parseFloat(number.toFixed(prec || 2));
    }
    return num;
}

function shallowObjParseType(obj,dims){
    let res = {}
    for(let a in obj){
        res[a] = obj[a];
        if(obj.hasOwnProperty(a) && a in dims){
            try{
                let opt = dims[a];
                let name = opt.alias || a;
                switch(opt.type){
                    case "int":
                        res[name] = Number.parseInt(obj[a])
                        break;
                    case "float":
                        res[name] = Number.parseFloat(obj[a])
                        break;
                    case "customer":
                        if(typeof opt.formatter === "function"){
                            res[name] = opt.formatter(obj[a]);
                        }
                        break;
                    default:
                        break;
                }
            }catch(e){
                console && console.log("数据格式转换失败",e)
            }
        }
    }
    return res;
}

/**
 * 用来处理和转化列数据 包括列名，列类型和数据format
 * @param arr
 * @param dims：{
 *  "month":{alias:"月份",type:"time",format:"yyyy-mm-dd"},
 *
 * }
 */
exports.transformCols = function(arr,dims){
    return arr instanceof Array && arr.map((v,k)=>{
            return shallowObjParseType(v,dims);
        })
}