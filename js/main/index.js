/*!
 * Name: index.js
 * Author : Vasu
 * Description : Used for log business logic 
 */
// Result Variables
const reader = new FileReader();
let resultMap = new Map();
 // init
 $(document).ready(function(){
    hideLoader();
    $('#uploadLogFile').on('change', handleUpload);
 });
 // Event trigger on file upload 
 const handleUpload = async (event) => {
    showLoader();
    const file = event.target.files[0];
    if (file) {
        $('#uploadFileName').val(file.name);
        resultMap = new Map();
        sessionStorage.setItem('results', resultMap);
        try {
            const fileContents = await readUploadedFileAsText(file);
            resultMap = await processFile(fileContents);
            hideLoader();
        } catch (e) {
            console.warn(e.message);
        }
    } else {
        hideLoader();
        // Error Handling 
    }
 }
// handle the event for file upload when file is being read
const readUploadedFileAsText = (inputFile) => {
    const fileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
        // Error Handling here
        fileReader.abort();
        hideLoader();
        reject(new DOMException("Problem parsing input file."));
      };
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsText(inputFile);
    });
};
// Process the file to find the data based on keywords
async function processFile(fileData){
    let splitLines = fileData.split('\n');
    splitLines.forEach(await function(item, index){
        getMapResultByLine(item, index);
        if(index == (splitLines.length-1)){
            postProcessFile();
        }
    });
}
//loop through keywords for mapping 
function getMapResultByLine(item, index) {
    return new Promise(resolve => {
        for(let j = 0; j < keyList.length; j++){
            if(iskeyAvailable(keyList[j], item)){
                mapListToKey(keyList[j].key, index+1, item);
            }
        }
    });
}
// Creating Results page for showing the errors
function postProcessFile(){
    $('#resultDisplay').html('');
    for(const key in keywords){
        let data = resultMap.get(keywords[key]);
        if(typeof data != 'undefined'){
            $('#resultDisplay').append(createCardByKey(data, key));
        }
    }
    enableTab('#result-tab');
    tabActiveById('#result-tab');
    dataToSession(true);
    hideLoader();
}
// create card for each key view
function createCardByKey(data, key) {
    let footerButton = createElement('button', 'btn btn-primary position-absolute', key + 'btn', [], 'View');
    let att = document.createAttribute("data-key"); 
    att.value = data.key;     
    let event = document.createEvent('Event');    
    event.initEvent('click', true, false);
    footerButton.addEventListener('click', function (e) {
        showLoader();
        showDataInTable(e.target.dataset.key);
    }, false);
    footerButton.dispatchEvent(event);                 
    footerButton.setAttributeNode(att);
    let header = createElement('span', 'text-lg text-left card-header-text', '', [], data.key)
    , cardBodyContent = createElement('span', 'text-left text-lg card-body-text', '', [], 'Lines Affected: ' + data.lineCount)
    , cardHeader = createElement('div', 'card-header', '', [header], '')
    , cardBody = createElement('div', 'card-body', '', [cardBodyContent], '')
    , cardFooter = createElement('div', 'card-footer cardFooter position-relative', '', [footerButton], '')
    , cardParent = createElement('div', 'card cardContainer', '',[cardHeader, cardBody, cardFooter], '')
    let parentDiv = createElement('div', 'col-12 col-sm-3', key + '-card-container', [cardParent], '');
    return parentDiv;
}

// Show the table data for the selected card button
function showDataInTable(key){
    dataToSession(false);
    let result = resultMap.get(key);
    $('.custom-table-body').html();
    result.lineObjList.forEach(function(line){
        $('.custom-table-body').append(createTableData(line));
    });
    enableTab('#error-tab');
    tabActiveById('#error-tab');
    $('#dataTableLog').DataTable();
    hideLoader();
}

//create table data for each row
function createTableData(line) {
    let tdNum = createElement('td', 'text-center', '', [], line.num)
    , tdLineNumber = createElement('td', 'text-center', '', [], line.lineNumber)
    , tdLine = createElement('td', 'text-left', '', [], line.line)
    , trContainer = createElement('tr', 'tr-row-line', '', [tdNum, tdLineNumber, tdLine], line.line);
    return trContainer;
}