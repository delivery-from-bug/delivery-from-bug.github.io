// 1. Select the element
const my_header = document.getElementById("my_header");
const my_text = document.getElementById("my_text");
const my_buttonA = document.getElementById("my_buttonA");
const my_buttonB = document.getElementById("my_buttonB");
const my_slide = document.getElementById("my_slide");

const next_header = document.getElementById("next_header");
const next_text = document.getElementById("next_text");
const next_buttonA = document.getElementById("next_buttonA");
const next_buttonB = document.getElementById("next_buttonB");
const next_slide = document.getElementById("next_slide");

let slide_index = 0;

//0
let slides = [
  {header:"Fish Delivery!", 
    text:"Hello Elizabete! Ready for some fresh fish?", 
    reply:["","Click here!"], 
    next:[0,1],
    img:"photo/wrapper.jpeg"
  }];

//1
slides.push (
  {header:"Step 1", 
    text:"If you haven't yet, open the box.", 
    reply:["NO!","OK! I opened it!"], 
    next:[0,2], 
    img:"photo/box_closed1.jpeg"
  });

//2
slides.push (
  {header:"Step 2", 
    text:"Voila!! A fresh fishes from Korea! What you gonna do next?", 
    reply:["Gut the fish", "Open canned tuna"],  
    next:[3,3],
    img:"photo/box_opened.jpeg"
  });

//3
slides.push (
  {header:"Step 3", 
    text:"Take out your sharpest knife...", 
    reply:["NO!!", "YES!!"], 
    next:[2,4],
    img:"photo/fish_and_knife.jpeg" 
  });

//4
slides.push (
  {header:"Warning", 
    text:"The following content contain disturbing material for vegan.", 
    reply:["I'm vegan","OK!"],
    next:[4,4],
    img:""
  });

function loadNextSlide (option) {
  slide_index = slides[slide_index].next[option];
  next_slide.style.transitionDuration = "1s";
  next_header.textContent = slides[slide_index].header;
  next_text.textContent = slides[slide_index].text;
  next_buttonA.textContent = slides[slide_index].reply[0];
  next_buttonB.textContent = slides[slide_index].reply[1];
  next_slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
  next_slide.classList.toggle('end-state');
}

// Button click 
my_buttonA.addEventListener("click", () => {
  loadNextSlide (0);
});

my_buttonB.addEventListener("click", () => {
  loadNextSlide (1);
});

// Listen for the transition to finish
next_slide.addEventListener("transitionend", function(event) {
   // Ensure it is specifically the transform property that finished
  if (event.propertyName === "transform") {
    // reset next slide position to out of screen
    next_slide.style.transitionDuration = "0s";
    next_slide.classList.toggle('end-state');

    // copy next slide to current slide
    my_header.textContent = slides[slide_index].header;
    my_text.textContent = slides[slide_index].text;
    my_buttonA.textContent = slides[slide_index].reply[0];
    my_buttonB.textContent = slides[slide_index].reply[1];
    my_slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
  }
});
