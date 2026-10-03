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

var slide_index = 0;
var curr_step = 1;
var vid_watched = false; // for case where playing video multiple time on full screen

const TUNA = 6;
const GUTTING = 5;
const ICEPACK = 7;
var visited = [];

//0
var slides = [
  {header:"Fish Delivery!", 
    text:"Hello Elizabete! Ready for some fresh fish?", 
    reply:["Click here!"], 
    next:[1],
    img:"photo/wrapper.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  }];

//1
slides.push (
  {header:"Step ", 
    text:"If you haven't yet, open the box.", 
    reply:["OK! I opened it!"], 
    next:[2], 
    img:"photo/box_closed1.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//2
slides.push (
  {header:"Step ", 
    text:"Voila!! A fresh fishes from Korea! What you gonna do next?", 
    reply:["Gut the fish", "Open canned tuna"],  
    next:[3, 6],
    img:"photo/box_opened.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//3
slides.push (
  {header:"Step ", 
    text:"Take out your sharpest knife...", 
    reply:["Ready!"], 
    next:[4],
    img:"photo/fish_and_knife.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//4
slides.push (
  {header:"Warning", 
    text:"The following content contain disturbing material for vegan.", 
    reply:["I'm not vegan"],
    next:[5], 
    img:"",
    color:"#cf4420",
    video:"https://github.com/delivery-from-bug/delivery-from-bug.github.io/raw/main/video/cut_open_fish.mp4",
    played:false,
    video_button:0 // 0 for buttonA and 1 for buttonB
  });

//5
slides.push (
  {header:"Step ", 
    text:"Store the fish guts (blue thingy) and Korean Hoe for the next call!", 
    reply:["Safely stored;)", "Nope"],
    next:[6,6], 
    img:"photo/take_out_fish1.jpeg",
    color:"rgba(0, 0, 0, 0.5)", /* Black opacity layer */
    video:"https://github.com/delivery-from-bug/delivery-from-bug.github.io/raw/main/video/tear.mp4",
    played:false,
    video_button:1 // 0 for buttonA and 1 for buttonB
  });


//6
slides.push (
  {header:"Step ", 
    text:"Open canned Tuna.", 
    reply:["Done!"],
    next:[3], 
    img:"photo/canned_tuna.jpg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//7
slides.push (
  {header:"Step ", 
    text:"Dispose the Ice Pack. Cut it open and empty the chemical inside.", 
    reply:["Finished!"],
    next:[8], 
    img:"photo/ice_pack.jpeg",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });

//8
slides.push (
  {header:"Well, that's it!", 
    text:"From your friend, Bug", 
    reply:[],
    next:[], 
    img:"photo/the_end.gif",
    color:"rgba(0, 0, 0, 0.5)" /* Black opacity layer */
  });



function loadNextSlide (option) {
  // check if you visited all the slides (tuna and gutting)
  if (slide_index == TUNA || slide_index == GUTTING) {
    visited.push (slide_index);
    if (visited.includes(TUNA) && visited.includes(GUTTING)) {
      slides[slide_index].next[0] = ICEPACK;
    }
  }
  // set up video slide if it contain video
  if (Object.hasOwn(slides[slide_index], "video")
      && !slides[slide_index].played) {
    slides[slide_index].played = true;
    if (slides[slide_index].video_button == option) {
      vid_watched = false;
      vid_source.src = slides[slide_index].video;
      my_video.load();
      vid_slide.classList.toggle('end-state');
    }
  }
  else 
  {
    if (slides[slide_index].header == "Step ") {
      curr_step++;
    }
    // slide index for next slide
    slide_index = slides[slide_index].next[option];
    // set up next slide 
    loadSlide (next_header, next_text, next_buttonA, next_buttonB, next_slide);

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
    
    loadSlide (my_header, my_text, my_buttonA, my_buttonB, my_slide);
  }
});

my_video.addEventListener("ended", (event) => {
  let on_screen = vid_slide.classList.toggle('end-state');
  // in case user played video in even number (in full screen) which would
  // toggle back to on-screen.
  if (on_screen) {
    vid_slide.classList.toggle('end-state');
  }
  // also to prevent skipping slide when user play video more than once.
  if (!vid_watched) {
    loadNextSlide (0);
    vid_watched = true;
  }
});

function loadSlide (header, text, buttonA, buttonB, slide) {
  // copy next slide to current slide
  let new_header = slides[slide_index].header;
  if (new_header == "Step ") {
    new_header += curr_step;
  }
  header.textContent = new_header;
  text.textContent = slides[slide_index].text;

  if (slides[slide_index].next.length >= 1) {
    buttonA.style.display = "";
    buttonA.textContent = slides[slide_index].reply[0];
    if (slides[slide_index].next.length >= 2) {
      buttonB.style.display = "";
      buttonB.textContent = slides[slide_index].reply[1];
    } else {
      buttonB.style.display = "none";
    }
  } else {
    buttonA.style.display = "none";
  }
  slide.style.backgroundImage = "url('" + slides[slide_index].img + "')";
  slide.style.backgroundColor = slides[slide_index].color;
}

window.addEventListener('load', (event) => {
  // init first slide
  loadSlide (my_header, my_text, my_buttonA, my_buttonB, my_slide);
  // for just in case if first slide is off screen initially
  my_slide.style.transitionDuration = "1ms";
  my_slide.classList.toggle('end-state', true);
  /*
  my_slide.style.transform = "";
  view_point = my_slide.getBoundingClientRect();
  console.log ("before");
  console.log (my_slide.offsetTop);
  console.log (view_point.top);
  if (view_point.top < 0) {
    my_slide.style.top = my_slide.offsetTop - view_point.top + "px";
    console.log ("after");
    console.log (my_slide.offsetTop);
    console.log (view_point.top);
  }
  */
});


/*
// console log directly showing on device
(function () {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;height:150px;background:black;color:lime;overflow:auto;z-index:99999;font-size:12px;';
  document.body.appendChild(el);
  console.log = (msg) => { el.innerHTML += msg + '<br>'; };
})();
*/

