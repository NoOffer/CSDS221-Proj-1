var adultNumSet = false;
var checkInSet = false;
var checkOutSet = false;

var adultNum;
var checkInDate;
var checkOutDate;

var timeOutId;

function setAdultNum(n){
    document.getElementById("adult-num").innerText = n;
    adultNum = n;
    adultNumSet = true;

    if (checkInSet & checkOutSet){
        setDayAndCost();
    }
}

function onChangeCheckInDate(){
    checkInDate = new Date(document.getElementById("date-picker-in").value);
    checkInSet = true;

    console.log(checkInDate);

    if (adultNumSet & checkOutDate){
        setDayAndCost();
    }
}

function onChangeCheckOutDate(){
    checkOutDate = new Date(document.getElementById("date-picker-out").value);
    checkOutSet = true;

    console.log((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);

    if (adultNumSet & checkInSet){
        setDayAndCost();
    }
}

function setDayAndCost(){
    let dayNum = (checkOutDate.getTime() - checkInDate.getTime()) / 86400000;
    let adultNum = 1;

    if (dayNum < 0){
        document.getElementById("day-display").innerText = 'Invalid Dates';
        document.getElementById("cost-display").innerText = 'Invalid Dates';
    }
    else{
        document.getElementById("day-display").innerText = dayNum;
        document.getElementById("cost-display").innerText = '$' + 150 * adultNum * dayNum;
    }
}

function reset(){
    let inps = document.querySelectorAll('input[type="text"]');
    for(let i = 0; i < inps.length; i++)
    {
        inps[i].value = "";
        inps[i].style.border = '0';
    }

    inps = document.querySelector('input[type="email"]');
    inps.value = "";
    inps.style.border = '0';

    document.getElementById("adult-num").innerText = "# of Adult(s)...";
    adultNumSet = false;

    inps = document.querySelectorAll('input[type="date"]');
    for(let i = 0; i < inps.length; i++)
    {
        inps[i].value = "";
    }
    checkInSet = false;
    checkOutSet = false;
    
    document.getElementById("day-display").innerText = 'Day';
    document.getElementById("cost-display").innerText = 'Cost';
    document.getElementById('cost-display').style.border = '0';

    inps = document.querySelector('textarea');
    inps.value = "";

    inps = document.querySelector('input[type="range"]');
    inps.value = 5;
    
    inps = document.querySelectorAll('input[type="radio"]');
    for(let i = 0; i < inps.length; i++)
    {
        inps[i].checked = false;
    }

    let toastBar = document.querySelector('div[class="alert"]');
    toastBar.innerText = 'Form Reset';
    toastBar.style.backgroundColor = '#ffaa00';
    toastBar.style.border = '1px solid #ffaa00';
    toastBar.style.opacity = '1';
    clearTimeout(timeOutId);
    timeOutId = setTimeout(function(){ toastBar.style.opacity = '0'; }, 1500);
}

function submit(){
    let completed = true;

    let inps = document.querySelectorAll('input[type="text"]');
    for(let i = 0; i < inps.length; i++)
    {
        if (inps[i].value == null || inps[i].value == ""){
            inps[i].style.border = '1px solid #ff3300';
            completed = false;
        }
    }

    inps = document.querySelector('input[type="email"]');
    if (inps.value == null || inps.value == ""){
        inps.style.border = '1px solid #ff3300';
        completed = false;
    }

    if (!completed){
        let toastBar = document.querySelector('div[class="alert"]');
        toastBar.innerText = 'Incomplete Field(s)';
        toastBar.style.backgroundColor = '#ff3300';
        toastBar.style.border = '1px solid #ff3300';
        toastBar.style.opacity = '1';
        clearTimeout(timeOutId);
        timeOutId = setTimeout(function(){ toastBar.style.opacity = '0'; }, 1500);

        return;
    }

    if (!(checkInSet && checkOutSet && adultNumSet)){
        document.getElementById('cost-display').style.border = '1px solid #ff3300';

        let toastBar = document.querySelector('div[class="alert"]');
        toastBar.innerText = 'Invalid Cost';
        toastBar.style.backgroundColor = '#ff3300';
        toastBar.style.border = '1px solid #ff3300';
        toastBar.style.opacity = '1';
        clearTimeout(timeOutId);
        timeOutId = setTimeout(function(){ toastBar.style.opacity = '0'; }, 1500);

        return;
    }

    let dayNum = (checkOutDate.getTime() - checkInDate.getTime()) / 86400000;
    if (dayNum <= 0){
        document.getElementById('cost-display').style.border = '1px solid #ff3300';

        let toastBar = document.querySelector('div[class="alert"]');
        toastBar.innerText = 'Negative Cost';
        toastBar.style.backgroundColor = '#ff3300';
        toastBar.style.border = '1px solid #ff3300';
        toastBar.style.opacity = '1';
        clearTimeout(timeOutId);
        timeOutId = setTimeout(function(){ toastBar.style.opacity = '0'; }, 1500);

        return;
    }

    inps = document.querySelectorAll('input[type="text"]');
    for(let i = 0; i < inps.length; i++)
    {
        inps[i].style.border = '0';
    }

    inps = document.querySelector('input[type="email"]');
    inps.style.border = '0';
    
    document.getElementById('cost-display').style.border = '0';
    
    let toastBar = document.querySelector('div[class="alert"]');
    toastBar.innerText = 'Form Submitted';
    toastBar.style.backgroundColor = '#22ff22';
    toastBar.style.border = '1px solid #22ff22';
    toastBar.style.opacity = '1';
    clearTimeout(timeOutId);
    timeOutId = setTimeout(function(){ toastBar.style.opacity = '0'; }, 1500);
}