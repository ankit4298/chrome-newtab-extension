(function(){

    
    let _lastVisited = false;
    let _visitedCount = false;
    let _quotes = false;
    let _timeSize = "9";

    _lastVisited = localStorage.getItem('setting_lastVisited')
    if(localStorage.getItem('setting_lastVisited') !=null){
        _lastVisited = localStorage.getItem('setting_lastVisited') == "true" ? true : false;
    }else{
        localStorage.setItem('setting_lastVisited', true);
        _lastVisited = true;
    }
    
    _visitedCount = localStorage.getItem('setting_visitedCount')
    if(localStorage.getItem('setting_visitedCount') !=null){
        _visitedCount = localStorage.getItem('setting_visitedCount') == "true" ? true : false;
    }else{
        localStorage.setItem('setting_visitedCount', true);
        _visitedCount = true;
    }

    _quotes = localStorage.getItem('setting_quotes')
    if(localStorage.getItem('setting_quotes') !=null){
        _quotes = localStorage.getItem('setting_quotes') == "true" ? true : false;
    }else{
        localStorage.setItem('setting_quotes', true);
        _quotes = true;
    }
    
    _timeSize = localStorage.getItem('setting_timeSize');

    document.getElementById('chktelemetry__lastVisited').checked = _lastVisited;
    document.getElementById('chktelemetry__visitedCount').checked =  _visitedCount;
    document.getElementById('chkquotes').checked =  _quotes;

})();

function SaveSettings(){
    const _lastVisited = document.getElementById("chktelemetry__lastVisited").checked;
    const _visitedCount = document.getElementById("chktelemetry__visitedCount").checked;
    const _quotes = document.getElementById("chkquotes").checked;

    localStorage.setItem('setting_lastVisited', _lastVisited ? "true" : "false");
    localStorage.setItem('setting_visitedCount', _visitedCount ? "true" : "false");
    localStorage.setItem('setting_quotes', _quotes ? "true" : "false");


    document.getElementById('status').innerHTML = "Settings updated successfully !!";
    
    setTimeout(()=>{
        document.getElementById('status').innerHTML = '';
    },1500);

}

document.getElementById('save').addEventListener('click', SaveSettings);


// console.table(localStorage);
