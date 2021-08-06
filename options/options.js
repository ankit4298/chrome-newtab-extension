// Entry or Main function
(function(){

    let _lastVisited = false;
    let _visitedCount = false;
    let _quotes = false;
    let _timeSize = "9";
    let _displayName = "Super User";
    let _bgCarousel = false;

    _lastVisited = localStorage.getItem('setting_lastVisited')
    if(_lastVisited == null){
        localStorage.setItem('setting_lastVisited', true);
    }
    _lastVisited = _lastVisited == "true" ? true : false;
    
    _visitedCount = localStorage.getItem('setting_visitedCount')
    if(_visitedCount == null){
        localStorage.setItem('setting_visitedCount', true);
    }
    _visitedCount = _visitedCount == "true" ? true : false;

    _quotes = localStorage.getItem('setting_quotes')
    if(_quotes == null){
        localStorage.setItem('setting_quotes', true);
    }
    _quotes = _quotes == "true" ? true : false;
    
    _timeSize = localStorage.getItem('setting_timeSize');
    if(_timeSize == null){
        localStorage.setItem('setting_timeSize', "9");
    }
    _timeSize = localStorage.getItem('setting_timeSize');

    _displayName = localStorage.getItem("name");
    if(_displayName == "" && _displayName == null){
        localStorage.setItem('name', _displayName);
    }
    displayName = localStorage.getItem("name");

    _bgCarousel = localStorage.getItem('setting_bgCarousel')
    if(_bgCarousel == null){
        localStorage.setItem('setting_bgCarousel', _bgCarousel); // default false
    }
    _bgCarousel = _bgCarousel == "true" ? true : false;
    
    updateUserDisplay(_lastVisited, _visitedCount, _quotes, _timeSize, displayName, _bgCarousel);

})();

function SaveSettings(){
    try{

        const _lastVisited = document.getElementById("chktelemetry__lastVisited").checked;
        const _visitedCount = document.getElementById("chktelemetry__visitedCount").checked;
        const _quotes = document.getElementById("chkquotes").checked;
        const _timeSize = document.getElementById("timeSize").value;
        const _displayName = document.getElementById("txt__name").value;
        const _bgCarousel = document.getElementById("bg_carousel").checked;
        
        localStorage.setItem('setting_lastVisited', _lastVisited ? "true" : "false");
        localStorage.setItem('setting_visitedCount', _visitedCount ? "true" : "false");
        localStorage.setItem('setting_quotes', _quotes ? "true" : "false");
        localStorage.setItem('setting_timeSize', _timeSize);
        localStorage.setItem('name', _displayName);
        localStorage.setItem('setting_bgCarousel', _bgCarousel ? "true" : "false");
        
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
        localStorage.setItem('setting_bgCarousel', false);

        const _displayName = localStorage.getItem('name');

        updateUserDisplay(true, true, true, "9", _displayName, false);
        
        document.getElementById('status').innerHTML = "Settings restored successfully !!";
        
        setTimeout(()=>{
            document.getElementById('status').innerHTML = '';
        },1500);
    }
    catch(e){
        console.error(e);
    }
        
}

function updateUserDisplay(lastVisited, visitedCount, quotes, timeSize, displayName, bgCarousel){

    document.getElementById('chktelemetry__lastVisited').checked = lastVisited;
    document.getElementById('chktelemetry__visitedCount').checked =  visitedCount;
    document.getElementById('chkquotes').checked =  quotes;
    document.getElementById('timeSize').value = timeSize;
    document.getElementById('txt__name').value = displayName;
    document.getElementById('bg_carousel').checked = bgCarousel;

}
    
document.getElementById('save').addEventListener('click', SaveSettings);
document.getElementById('reset').addEventListener('click', ResetSettings);


// console.table(localStorage);
