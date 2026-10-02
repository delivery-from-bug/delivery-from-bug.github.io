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

const vid_slide = document.getElementById("vid_slide");
const my_video = document.getElementById("my_video");
const vid_source  = document.getElementById("vid_source");

let slide_index = 0;

//0
let slides = [
  {header:"Fish Delivery!", 
    text:"Hello Elizabete! Ready for some fresh fish?", 
    reply:["","Click here!"], 
    next:[0,1],
    img:"photo/wrapper.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  }];

//1
slides.push (
  {header:"Step 1", 
    text:"If you haven't yet, open the box.", 
    reply:["NO!","OK! I opened it!"], 
    next:[0,2], 
    img:"photo/box_closed1.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//2
slides.push (
  {header:"Step 2", 
    text:"Voila!! A fresh fishes from Korea! What you gonna do next?", 
    reply:["Gut the fish", "Open canned tuna"],  
    next:[3,3],
    img:"photo/box_opened.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//3
slides.push (
  {header:"Step 3", 
    text:"Take out your sharpest knife...", 
    reply:["NO!!", "YES!!"], 
    next:[2,4],
    img:"photo/fish_and_knife.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//4
slides.push (
  {header:"Warning", 
    text:"The following content contain disturbing material for vegan.", 
    reply:["I'm vegan","OK!"],
    next:[3,5], 
    img:"",
    color:"#cf4420",
    video:"https://github.com/delivery-from-bug/delivery-from-bug.github.io/raw/main/video/cut_open_fish.mp4",
    played:false
  });

//5
slides.push (
  {header:"Step 4", 
    text:"Save the fish guts and Korean Hoe. Need it for the next call!", 
    reply:["Heck No!!","Alright!"],
    next:[5,6], 
    img:"photo/take_out_fish1.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//6
slides.push (
  {header:"Step 5", 
    text:"Open the canned Tuna.", 
    reply:["Heck No!!","Done!"],
    next:[6,7], 
    img:"photo/canned_tuna.jpg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//7
slides.push (
  {header:"Step 6", 
    text:"Open the Ice Pack", 
    reply:["Heck No!!","Done!"],
    next:[7,7], 
    img:"photo/ice_pack.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

function loadNextSlide (option) {
  // set up next slide 
  if (Object.hasOwn(slides[slide_index], "video")
      && !slides[slide_index].played) {
    slides[slide_index].played = true;
    vid_source.src = slides[slide_index].video;
    my_video.load();
    vid_slide.classList.toggle('end-state');
  }
  else 
  {
    slide_index = slides[slide_index].next[option];
    next_header.textContent = slides[slide_index].header;
    next_text.textContent = slides[slide_index].text;
    next_buttonA.textContent = slides[slide_index].reply[0];
    next_buttonB.textContent = slides[slide_index].reply[1];
    next_slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
    next_slide.style.backgroundColor = slides[slide_index].color;

    // how fast slide will go out of screen
    my_slide.style.transitionDuration = "0.5s";
    // animate current slide out of screen
    my_slide.classList.toggle('end-state');
  }
}

// Button click 
my_buttonA.addEventListener("click", () => {
  loadNextSlide (0);
});

my_buttonB.addEventListener("click", () => {
  loadNextSlide (1);
});

// Listen for the transition to finish
my_slide.addEventListener("transitionend", function(event) {
   // Ensure it is specifically the transform property that finished
  if (event.propertyName === "transform") {

    // reset my slide position back to inside screen instantly
    my_slide.style.transitionDuration = "0s";
    my_slide.classList.toggle('end-state');

    // copy next slide to current slide
    my_header.textContent = slides[slide_index].header;
    my_text.textContent = slides[slide_index].text;
    my_buttonA.textContent = slides[slide_index].reply[0];
    my_buttonB.textContent = slides[slide_index].reply[1];
    my_slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
    my_slide.style.backgroundColor = slides[slide_index].color;
  }
});

my_video.addEventListener("ended", (event) => {
  vid_slide.classList.toggle('end-state');
  loadNextSlide (1);
});

