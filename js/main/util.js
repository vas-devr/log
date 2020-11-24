/*!
 * Name: util.js
 * Author : Vasu
 * Description : All util functions and global variables are loaded here 
 */
/* global variables used in this project */
// Any restrictions on keywords could be assigned here
const keyList = [
    { 
        'key': 'ERROR',
        'isStrict': true
    },
    {
        'key': 'View Accepted',
        'isStrict': true
    },
    {
        'key': 'Started In',
        'isStrict': true
    }
], keywords = {
    ERROR: 'ERROR',
    VIEW: 'View Accepted',
    START: 'Started In'
};
/* end variables */

/* UTIL functions Start*/
//show loader for any process
function showLoader(){
    $('.spinnerContainer').addClass('loading');
}
// hide loader after the process
function hideLoader(){
    $('.spinnerContainer').removeClass('loading');
}
// enable tab by Id
function enableTab(tabId){
    $(tabId).removeClass('disabled');
}
// disable tab by Id
function disableTab(tabId){
    $(tabId).addClass('disabled');
}
// set/get the data to sessionStorage
function dataToSession(isSet){
    let results = {};
    if(isSet){
        resultMap.forEach(function(result){
            results[result.key] = result;
        });
        sessionStorage.setItem('results', JSON.stringify(results));
    } else {
        results = JSON.parse(sessionStorage.getItem('results'));
        resultMap = new Map();
        for(let key in results){
            resultMap.set(key, results[key]);
        }
    }
}
// make the tab active by Id
function tabActiveById(tabId){
    $('#logTab li .nav-link').each(function(index, item){
        if(item.id == tabId.replace('#','')){
            $(item).addClass('active');
        } else {
            $(item).removeClass('active');
        }
    });
    $('#logTabContent .tab-pane').each(function(index, item){
        if(item.attributes["aria-labelledby"].value == tabId.replace('#','')){
            $(item).addClass('active show');
        } else {
            $(item).removeClass('active show');
        }
    });
}
// create element by tag, class and id
function createElement(tagName, className, tagId, children,innerHtml){
    let ele = document.createElement(tagName);
    ele.className = className;
    ele.id = tagId;
    if(children.length > 0){
        children.forEach(function(child){
            ele.appendChild(child);
        });
    } else {
        ele.innerText = innerHtml;
    }
    return ele;
}
// check for keyword availability 
function iskeyAvailable(keyMap, line){
    line = (keyMap.isStrict?line:line.toLowerCase());
    keyMap.key = (keyMap.isStrict?keyMap.key:keyMap.key.toLowerCase());
    return (line.indexOf(keyMap.key)>-1);
}

// map the list to objects to keyword
function mapListToKey(key, lineNum, line){
    if(resultMap.has(key)){
        let currObj = resultMap.get(key);
        currObj.lineNumbers.push(lineNum);
        currObj.lines.push(line);
        currObj.lineCount++;
        currObj.lineObjList.push({
            'lineNumber': lineNum,
            'line' : line,
            'num'  : currObj.lineCount
        });
        resultMap.set(key, currObj);
    } else {
        let keyObj = {
            'key': key,
            'lineNumbers': [lineNum],
            'lines': [line],
            'lineCount': 1,
            'lineObjList': [{
                'lineNumber': lineNum,
                'line' : line,
                'num'  : 1
            }]
        }
        resultMap.set(key, keyObj);
    }
}
/* UTIL functions End*/