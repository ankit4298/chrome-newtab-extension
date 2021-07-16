(function(){

    let _lastVisited = false;
    let _visitedCount = false;
    let _quotes = false;
    let _timeSize = "9";

    _lastVisited = localStorage.getItem('setting_lastVisited')
    if(localStorage.getItem('setting_lastVisited') == null){
        localStorage.setItem('setting_lastVisited', true);
    }
    _lastVisited = localStorage.getItem('setting_lastVisited') == "true" ? true : false;
    
    _visitedCount = localStorage.getItem('setting_visitedCount')
    if(localStorage.getItem('setting_visitedCount') == null){
        localStorage.setItem('setting_visitedCount', true);
    }
    _visitedCount = localStorage.getItem('setting_visitedCount') == "true" ? true : false;

    _quotes = localStorage.getItem('setting_quotes')
    if(localStorage.getItem('setting_quotes') == null){
        localStorage.setItem('setting_quotes', true);
    }
    _quotes = localStorage.getItem('setting_quotes') == "true" ? true : false;
    
    if(localStorage.getItem('setting_timeSize') == null){
        localStorage.setItem('setting_timeSize', "9");
    }
    _timeSize = localStorage.getItem('setting_timeSize');
    
    updateUserDisplay(_lastVisited, _visitedCount, _quotes, _timeSize);

})();

function SaveSettings(){
    try{

        const _lastVisited = document.getElementById("chktelemetry__lastVisited").checked;
        const _visitedCount = document.getElementById("chktelemetry__visitedCount").checked;
        const _quotes = document.getElementById("chkquotes").checked;
        const _timeSize = document.getElementById("timeSize").value;
        
        localStorage.setItem('setting_lastVisited', _lastVisited ? "true" : "false");
        localStorage.setItem('setting_visitedCount', _visitedCount ? "true" : "false");
        localStorage.setItem('setting_quotes', _quotes ? "true" : "false");
        localStorage.setItem('setting_timeSize', _timeSize);
        
        document.getElementById('status').innerHTML = "Settings updated successfully !!";
        
        setTimeout(()=>{
            document.getElementById('status').innerHTML = '';
        },1500);
    }
    catch(e){
        console.error(e);
    }
        
}

function ResetSettings(){
    try{

        localStorage.setItem('setting_lastVisited', true);
        localStorage.setItem('setting_visitedCount', true);
        localStorage.setItem('setting_quotes', true);
        localStorage.setItem('setting_timeSize', "9");

        updateUserDisplay(true, true, true, "9");
        
        document.getElementById('status').innerHTML = "Settings restored successfully !!";
        
        setTimeout(()=>{
            document.getElementById('status').innerHTML = '';
        },1500);
    }
    catch(e){
        console.error(e);
    }
        
}

function updateUserDisplay(lastVisited, visitedCount, quotes, timeSize){

    document.getElementById('chktelemetry__lastVisited').checked = lastVisited;
    document.getElementById('chktelemetry__visitedCount').checked =  visitedCount;
    document.getElementById('chkquotes').checked =  quotes;
    document.getElementById('timeSize').value = timeSize;

}
    
document.getElementById('save').addEventListener('click', SaveSettings);
document.getElementById('reset').addEventListener('click', ResetSettings);


// console.table(localStorage);
