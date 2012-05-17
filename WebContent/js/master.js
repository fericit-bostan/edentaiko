var tc = false;
try {
    tc = true;
} catch(f) { }

var objRequestError = 'XML HTTP Request: OK';

function getRequestObject() {
    var objRequest = null;
    if (window.ActiveXObject) {
        if (tc) {
            try {
                objRequest = new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch(e) {
                try {
                    objRequest = new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch(f) { } 
            }
        } else {
            objRequest = new ActiveXObject('Microsoft.XMLHTTP');
        }
    } else if (window.XMLHttpRequest) {
        objRequest = new XMLHttpRequest();
    }
    return objRequest;
}

function getFile(pUrl, pElementId, pImageSrc, pFunc) {
    if (arguments.length==3) {
        if (pImageSrc) {
            var el = document.createElement('img');
            // Add the Please Wait Image the correct way
            el.setAttribute('src', pImageSrc);
            el.setAttribute('alt', 'Please Wait');
            el.setAttribute('width', 16);
            el.setAttribute('height', 16);
            document.getElementById(pElementId).appendChild(el);
        }
    } 
    var objRequest = getRequestObject();

    if (typeof(objRequest)=='object') {
        if (objRequest.readyState>=0) {
            switch (pFunc) {
                case 'makeTable' :
                    objRequest.onreadystatechange = function() { makeTable(objRequest,pElementId); };
                    break;
                case 'raw' :
                    objRequest.onreadystatechange = function() { raw(objRequest,pElementId); };
                    break;
                case 'highlightI' :
                    objRequest.onreadystatechange = function() { highlightI(objRequest,pElementId); };
                    break; 
                default :
                    objRequest.onreadystatechange = function() { makeList(objRequest,pElementId); };
                    break;
            } 

            objRequest.open('GET', pUrl, true);
            objRequest.send(null);
        }else{
            objRequestError = 'XML HTTP Request Object Unavailable';
            document.getElementById(pElementId).innerHTML = objRequestError;
            return false;
        } 
    }else{
        objRequestError = 'XML HTTP Request Object Not Supported';
        document.getElementById(pElementId).innerHTML = objRequestError;
        return false;
    }
}


// functions to handle asynchronous calls

function makeList(pObjRequest,pElementId) {
    if (pObjRequest.readyState==4) { 
        if (pObjRequest.status==200) { 
            var tmpArr=pObjRequest.responseText.split('\n');
            var out='<select name="states" size="1">';
            var tmp;
            var val;
            var txt;
            for (var idx=0;idx<tmpArr.length;idx++) {
                tmp=tmpArr[idx].split(',');
                val = tmp[0].replace('"','');
                val = val.replace('"','');
                txt = tmp[1].replace('"','');
                txt = txt.replace('"','');
                out += '<option value="'+val+'">'+txt+'<\/option>';
            }
            out += '<\/select>';
            document.getElementById(pElementId).innerHTML=out;
        }
    }
}

function makeTable(pObjRequest,pElementId) {
    if (pObjRequest.readyState==4) { 
        if (pObjRequest.status==200) { 
            var tmpArr=pObjRequest.responseText.split('\n');
            var out='<table id="exampleTable" border="1" bordercolor="#000000" cellpadding="2" style="border-collapse:collapse;">';
            var tmp;
            var val;
            var txt;
            for (var idx=0;idx<tmpArr.length;idx++) {
                tmp=tmpArr[idx].split(',');
                val = tmp[0].replace('"','');
                val = val.replace('"','');
                txt = tmp[1].replace('"','');
                txt = txt.replace('"','');
                out += '<tr><td>'+val+'<\/td><td>'+txt+'<\/tr>';
            }
            out += '<\/table>';
            document.getElementById(pElementId).innerHTML=out;
        }
    }
}

function raw(pObjRequest,pElementId) {
    if (pObjRequest.readyState==4) { 
        if (pObjRequest.status==200) { 
            document.getElementById(pElementId).innerHTML=pObjRequest.responseText;
        }
    }
}

function highlightI(pObjRequest,pElementId) {
    if (pObjRequest.readyState==4) { 
        if (pObjRequest.status==200) { 
            var tmpArr=pObjRequest.responseText.split('I');
            var out=tmpArr[0];
            for (var idx=1;idx<tmpArr.length;idx++) {
                out += '<span style="color:#FF9900; font-weight:bold">I<\/span>'+tmpArr[idx];
            }
            document.getElementById(pElementId).innerHTML=out;
        }
    }
}

function setSubMenuDisplayType(pElementId, displayType) {
	document.getElementById(pElementId).style.display = displayType;
}

