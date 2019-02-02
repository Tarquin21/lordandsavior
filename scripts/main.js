let blink_interval;
let notif = document.getElementById('notif');
let notif_timeout = setTimeout(function() {
  blink_interval = setInterval(function() {
    notif.style.opacity = "1";
    setTimeout(function() {
      notif.style.opacity = "0";
    }, 500)
  }, 1000);
}, 3000);

document.onmousedown = function(event) {
  if (notif_timeout)  clearTimeout(notif_timeout);
  if (blink_interval) clearInterval(blink_interval);
  
  if (document.getElementById('notif')) {
    document.body.removeChild(notif);
  }

  let obj = document.body.appendChild(document.createElement('div'));
  let _skew = 1;
  let _x = 1;
  let _y = 1;
  let _r = 0;

  obj.class = "ree";
  obj.style.position = "absolute";
  obj.style.top  = `${event.clientY - 100}px`;
  obj.style.left = `${event.clientX - 100}px`;
  obj.style.width = "200px";
  obj.style.height = "200px";

  let img = obj.appendChild(document.createElement('img'));

  img.src = "images/tomeo.png";

  obj.onmouseleave = function() {
    obj.onmousemove = function() {};
  };

  obj.onmouseover = function() {
    obj.onmousemove = function(event) {
      console.log(event.movementX, event.movementY);
      obj.style.top  = `${obj.offsetTop  + event.movementY}px`;
      obj.style.left = `${obj.offsetLeft + event.movementX}px`;
    };
  };

  obj.onmousedown = function(event) {
    document.onmousedown(event);
  };

  setInterval(function() {
    if (obj.offsetTop <= 0) _y = 1;
    if (obj.offsetTop + obj.offsetHeight >= window.innerHeight) _y = -1;
    if (obj.offsetLeft <= 0) _x = 1;
    if (obj.offsetLeft + obj.offsetWidth >= window.innerWidth) _x = -1;

    obj.style.top  = `${obj.offsetTop  + _y * _skew}px`;
    obj.style.left = `${obj.offsetLeft + _x * _skew}px`;

    obj.style.transform = `rotate(${_r}deg)`;
    _r += 1;
  }, 2);
};