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
        'key': 'viewAccepted',
        'isStrict': false
    },
    {
        'key': 'Started In',
        'isStrict': false
    },
	{
		'key':'Giving up',
		'isStrict':false
	},
	{
		'key':'discarded message from non-member',
		'isStrict':false
	},
	{
		'key':'DemonHealthChecker',
		'isStrict':false
	},
	{
		'key':'INFO  server.V2DataEventDemon',
		'isStrict':false
	},
	{
		'key':'Caught ConcurrencyException',
		'isStrict':false
	},
	{
		'key':'tried to enter Stateful bean with different tx context',
		'isStrict':false
	},
	{
		'key':'Shutting down the server',
		'isStrict':false
	},
	{
		'key':'shutdown initiated',
		'isStrict':false
	},
	{
		'key':'Shutdown complete',
		'isStrict':false
	},
	{
		'key':'Node inoperable: Unacceptable reference time deviation',
		'isStrict':false
	},
	{
		'key':'systemsupervision.ClusterStateAccess',
		'isStrict':true
	},
	{
		'key':'server.ClusterServerPropertyProvider',
		'isStrict':true
	},
	{
		'key':'checks.GlobalMasterCheck',
		'isStrict':true
	},
	{
		'key':'Member has no network access',
		'isStrict':true
	},
	{
		'key':'TransactionRolledbackLocalException',
		'isStrict':true
	},
	{
		'key':'SQLSyntaxErrorException',
		'isStrict':true
	},
	{
		'key':'NoObjectFoundException',
		'isStrict':true
	},
	{
		'key':'NoTxConnectionManager',
		'isStrict':true
	},
	{
		'key':'discarded message from non-member',
		'isStrict':true
	},
	{
		'key':'XAConnectionFactory',
		'isStrict':true
	},
	{
		'key':'org.jboss.ha.framework.server.DistributedReplicantManagerImpl',
		'isStrict':true
	},
	{
		'key':'Bound to JNDI name',
		'isStrict':true
	},
	{
		'key':'server.V2DataEventDemon - ManufacturingOrder',
		'isStrict':true
	},
	{
		'key':'server.V2DataEventDemon - Equipment',
		'isStrict':true
	},
	{
		'key':'server.V2DataEventDemon - Deviation',
		'isStrict':true
	},
	{
		'key':'server.V2DataEventDemon - ProductionUnit',
		'isStrict':true
	},
	{
		'key':'authws.PASXServiceImpl - PASXServiceImpl.userAuthentication',
		'isStrict':true
	},
	{
		'key':'authws.PASXServiceImpl - PASXServiceImpl.userAuthentication',
		'isStrict':true
	},
	{
		'key':'ldapacc.SearchObjectsAction',
		'isStrict':true
	},
	{
		'key':'lock held by in-doubt distributed transaction',
		'isStrict':true
	},
	{
		'key':'ORA-04021: timeout occurred while waiting to lock object',
		'isStrict':true
	}
	
], keywords = {
    ERROR: 'ERROR',
    VIEW: 'viewAccepted',
    STARTEDIN: 'Started In',
	TRANSACTIONFAILED: 'Giving up',
	DISCARDEDMSG: 'discarded message from non-member',
	DEMONHEALTH: 'DemonHealthChecker',
	V2DEMON: 'INFO  server.V2DataEventDemon',
	CONCURRENCY: 'Caught ConcurrencyException',
	CONTEXTLOSS: 'tried to enter Stateful bean with different tx context',
	SHUTDOWNSTART: 'Shutting down the server',
	SHUTDOWNINIT: 'shutdown initiated',
	SHUTDOWNCMT: 'Shutdown complete',
	TIMEDEVIATION: 'Node inoperable: Unacceptable reference time deviation',
	CLUSTERSTATE: 'systemsupervision.ClusterStateAccess',
	CLUSTERPROPERTY: 'server.ClusterServerPropertyProvider',
	GLOBALMASTERCHECK: 'checks.GlobalMasterCheck',
	NETWORKACCESS: 'Member has no network access',
	TRANSACTIONROLLEDBACK: 'TransactionRolledbackLocalException',
	SQLEXCEPTION: 'SQLSyntaxErrorException',
	NOBJECTFOUND: 'NoObjectFoundException',
	NOTXCONNMANAGER: 'NoTxConnectionManager',
	CLUSTERISSUES: 'discarded message from non-member',
	ORACLEISSUES: 'XAConnectionFactory',
	NODEMEMBERS: 'org.jboss.ha.framework.server.DistributedReplicantManagerImpl',
	QUEUE: 'Bound to JNDI name',
	MO_DEMON: 'server.V2DataEventDemon - ManufacturingOrder',
	EQM_DEMON: 'server.V2DataEventDemon - Equipment',
	DEV_DEMON: 'server.V2DataEventDemon - Deviation',
	PU_DEMON: 'server.V2DataEventDemon - ProductionUnit',
	USERAUTH: 'authws.PASXServiceImpl - PASXServiceImpl.userAuthentication',
	LDAP: 'ldapacc.SearchObjectsAction',
	INDOUBTTRANS: 'lock held by in-doubt distributed transaction',
	ORACLELOCK: 'ORA-04021: timeout occurred while waiting to lock object'
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
    let keyword = (keyMap.isStrict?keyMap.key:keyMap.key.toLowerCase());
    return (line.indexOf(keyword)>-1);
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