document.addEventListener("DOMContentLoaded", function () {

/* =====================================
DYNAMIC PROGRAM DATA
===================================== */

const programs = [

{
name: "Skills Development",
description: "Training in digital literacy, coding, entrepreneurship and communication."
},

{
name: "Mentorship Program",
description: "Guidance and support from experienced mentors."
},

{
name: "Career Guidance",
description: "Career planning, CV writing and interview preparation."
},

{
name: "Community Workshops",
description: "Leadership, teamwork and personal development workshops."
},

{
name: "Entrepreneurship Training",
description: "Youth learn business planning, budgeting and innovation skills."
},

{
name: "Leadership Academy",
description: "Leadership workshops that prepare youth for community leadership roles."
},

{
name: "Job Readiness Programme",
description: "Participants receive interview preparation and CV development training."
}

];


/* =====================================
LOAD PROGRAMS
===================================== */

const programContainer = document.getElementById("programContainer");

if(programContainer){

function displayPrograms(data){

programContainer.innerHTML = "";

data.forEach(program => {

const card = document.createElement("div");

card.className = "program-card"

card.innerHTML = `

<h3>${program.name}</h3>

<p>${program.description}</p>

`;

programContainer.appendChild(card);

});

}

displayPrograms(programs);

/* =====================================
SEARCH FUNCTION
===================================== */

const searchInput = document.getElementById("searchInput");
const sortPrograms = document.getElementById("sortPrograms");

function updatePrograms(){

    let updatedPrograms = [...programs];

    // Search
    if(searchInput && searchInput.value !== ""){

        const term = searchInput.value.toLowerCase();

        updatedPrograms = updatedPrograms.filter(program =>
            program.name.toLowerCase().includes(term) ||
            program.description.toLowerCase().includes(term)
        );
    }

    // Sort
    if(sortPrograms){

        if(sortPrograms.value === "az"){
            updatedPrograms.sort((a,b)=>
                a.name.localeCompare(b.name)
            );
        }

        if(sortPrograms.value === "za"){
            updatedPrograms.sort((a,b)=>
                b.name.localeCompare(a.name)
            );
        }
    }

    displayPrograms(updatedPrograms);
}

if(searchInput){
    searchInput.addEventListener("keyup", updatePrograms);
}

if(sortPrograms){
    sortPrograms.addEventListener("change", updatePrograms);
}

/* =====================================
JQUERY ACCORDION
===================================== */

$(document).ready(function(){

    $(".accordion").click(function(){

        $(this).toggleClass("active");

        $(this).next(".panel").slideToggle();

        $(".panel").not($(this).next()).slideUp();

    });

});


/* =====================================
TABS
===================================== */

const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach(button => {

button.addEventListener("click", function(){

const tab = this.dataset.tab;

document.querySelectorAll(".tab-content").forEach(content=>{

content.style.display="none";

});

document.getElementById(tab).style.display="block";

});

});

/* =====================================
LIGHTBOX GALLERY
===================================== */

const galleryImages = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

if(galleryImages.length){

galleryImages.forEach(img=>{

img.addEventListener("click", ()=>{

lightbox.style.display="flex";

lightboxImg.src = img.src;

});

});

}

if(lightbox){

lightbox.addEventListener("click", ()=>{

lightbox.style.display="none";

});

}

/* =====================================
CONTACT FORM VALIDATION
===================================== */

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", function(e){

e.preventDefault();

const name =
document.getElementById("contactName").value.trim();

const email =
document.getElementById("contactEmail").value.trim();

const message =
document.getElementById("contactMessage").value.trim();

if(name.length < 3){

alert("Name must contain at least 3 characters.");

return;

}

const emailPattern =
/^[^\s@]+@[^\s@]+.[^\s@]+$/;

if(!emailPattern.test(email)){

alert("Enter a valid email address.");

return;

}

if(message.length < 20){

alert("Message must contain at least 20 characters.");

return;

}

fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
        name:name,
        email:email,
        message:message
    }),
    headers:{
        "Content-Type":"application/json" } })
        .then(response => response.json())
        .then(data => {
            showModal("Message sent successfully via AJAX!");
            contactForm.reset(); })
            .catch(error => {
                alert("Error sending message."); });

});

}

/* =====================================
ENQUIRY FORM VALIDATION
=======================================*/

const enquiryForm = document.getElementById("enquiryForm");

if(enquiryForm){

enquiryForm.addEventListener("submit", function(e){

e.preventDefault();

const name =
document.getElementById("enquiryName").value.trim();

const phone =
document.getElementById("enquiryPhone").value.trim();

const choice =
document.querySelector('input[name="interest"]:checked');

if(name.length < 3){

alert("Please enter your full name.");

return;

}

const phonePattern =
/^[0-9]{10}$/;

if(!phonePattern.test(phone)){

alert("Phone number must contain 10 digits.");

return;

}

if(!choice){

alert("Please select an interest option.");

return;

}

if(choice.value === "volunteer"){

showModal(
"Thank you for your interest. Volunteer positions are currently available and our team will contact you within 48 hours."
);

}

if(choice.value === "sponsor"){

showModal(
"Thank you for your sponsorship enquiry. Sponsorship packages start from R5,000 and detailed information will be sent to your email."
);

}

});

}

/* =====================================
SUCCESS MODAL
===================================== */

function showModal(message){

const modal =
document.getElementById("successModal");

const modalText =
document.getElementById("modalMessage");

if(modal){

modalText.textContent = message;

modal.style.display="flex";

}

}

const closeModal =
document.getElementById("closeModal");

if(closeModal){

closeModal.addEventListener("click", ()=>{

document.getElementById("successModal").style.display="none";

});

}

const mapContainer = document.getElementById("map");

if (mapContainer) {

    const map = L.map("map").setView([-28.4793, 24.6727], 5);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    L.marker([-25.7479, 28.2293])
        .addTo(map)
        .bindPopup("Pretoria Branch");

    L.marker([-29.8587, 31.0218])
        .addTo(map)
        .bindPopup("Durban Branch");
}

/* =====================================
SCROLL ANIMATION
===================================== */

const animatedItems = document.querySelectorAll("main h2, .program-card");

window.addEventListener("scroll", function(){

    animatedItems.forEach(item => {

        const itemTop = item.getBoundingClientRect().top;

        if(itemTop < window.innerHeight - 100){

            item.classList.add("show");

        }

    });
});
}});
