// 1. Select the element
const my_header = document.getElementById("my_header");
const my_text = document.getElementById("my_text");
const my_button = document.getElementById("my_button");
const my_slide = document.getElementById("my_slide");

const next_header = document.getElementById("next_header");
const next_text = document.getElementById("next_text");
const next_button = document.getElementById("next_button");
const next_slide = document.getElementById("next_slide");

// 2. Change the text instantly or via an event (like a button click)
my_button.addEventListener("click", () => {
    //my_header.textContent = "testing";
    //my_text.textContent = "hello world!";
    my_slide.classList.toggle('end-state');
});

next_button.addEventListener("click", () => {
    //my_header.textContent = "testing";
    //my_text.textContent = "hello world!";
    next_slide.classList.toggle('end-state');
});

