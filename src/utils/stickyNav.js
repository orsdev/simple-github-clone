
let tab = document.querySelector(".main--tab");
let main = document.querySelector(".main--content");
let tabSticky = document.querySelector(".main--tab-aside-sticky");

function sticky() {
  if (window.scrollY >= 80) {
    tab.classList.add("sticky");
    tabSticky.style.opacity = "1";
  }
  else {
   tab.classList.remove("sticky");
   tabSticky.style.opacity = "0";
  }
}

//stops scroll event from firing immediate during scroll
function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

//listen to scroll event
document.addEventListener('scroll' , debounce(sticky));