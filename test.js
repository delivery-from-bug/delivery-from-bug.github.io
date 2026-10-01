// 1. Select the element
const my_header = document.getElementById("my_header");
const my_text = document.getElementById("my_text");
const my_button = document.getElementById("my_button");
const my_slide = document.getElementById("my_slide");

const next_header = document.getElementById("next_header");
const next_text = document.getElementById("next_text");
const next_button = document.getElementById("next_button");
const next_slide = document.getElementById("next_slide");

let slide_index = 0;

let slides = [
  {header:"Fish Delivery!", 
    text:"Hello Elizabete! Ready for some fresh fish?", 
    reply:["","Click here!"]
  }];

slides.push (
  {header:"Step 1", 
    text:"If you haven't yet, open the box.", 
    reply:["NO!","OK! I opened it!"], 
    img:"photo/box_closed1.jpeg"
  });

slides.push (
  {header:"Step 2", 
    text:"Voila!! A fresh fishes from Korea! What you gonna do next?", 
    reply:["Gut the fish", "Open canned tuna"], 
    img:"photo/box_opened.jpeg"
  });

slides.push (
  {header:"Step 3", 
    text:"Take out your sharpest knife...", 
    reply:["NO!!", "YES!!"], 
    img:"photo/fish_and_knife.jpeg" 
  });

slides.push (
  {header:"Warning", 
    text:"The following content contain disturbing material for vegan.", 
    reply:["I'm vegan","OK!"],
    img:""
  });


// 2. Change the text instantly or via an event (like a button click)
my_button.addEventListener("click", () => {
  slide_index++;
  next_slide.style.transitionDuration = "1s";
  next_header.textContent = slides[slide_index].header;
  next_text.textContent = slides[slide_index].text;
  next_button.textContent = slides[slide_index].reply[0];
  next_slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
  next_slide.classList.toggle('end-state');
});

next_slide.addEventListener("transitionend", function(event) {
  if (event.propertyName === "transform") {
    // reset next slide position to out of screen
    next_slide.style.transitionDuration = "0s";
    next_slide.classList.toggle('end-state');

    // copy next slide to current slide
    my_header.textContent = slides[slide_index].header;
    my_text.textContent = slides[slide_index].text;
    my_button.textContent = slides[slide_index].reply[0];
    my_slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
  }
});
