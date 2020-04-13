window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent (a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    
    info.addEventListener('click', function(event) {
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0); 
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //Timer


    let deadLine = '2020-04-09';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'seconds' : seconds,
            'minutes' : minutes,
            'hours' : hours
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById('id'),
            seconds = document.querySelector('.seconds'),
            minutes = document.querySelector('.minutes'),
            hours = document.querySelector('.hours'),
            timeInterval = setInterval(update, 1000);

        
        function update() {
            let t = getTimeRemaining(endTime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
        
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

    }

    setClock('timer', deadLine);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
    });


    let message = {
       loading: 'Загрузка...',
       sucess: "Спасибо! Мы скоро с вами свяжемся",
       failure: 'error'
    };

    let form = document.querySelector('.main-form'),
        input = form.querySelectorAll('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();

        JSON.stringify(request);
        request.open('POST', 'server.php');
        // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); -- отправка кода на сервер 
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (key, value){
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

    request.addEventListener('readystatechange', function() {
        if(request.readyState < 4){
            statusMessage.innerHTML = message.loading;
        } else if(request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.sucess;
        } else {
            statusMessage.innerHTML = message.failure;
        }

        for(let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
    });
});
