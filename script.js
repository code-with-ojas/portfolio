// Spotlight Effect for Bento Cards
const cards = document.querySelectorAll(".bento-card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// =================== CONTACT FORM LOGIC (Web3Forms) ===================
const contactForm = document.getElementById('contactForm');
const formButton = document.getElementById('formButton');
const formStatus = document.getElementById('formStatus');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const originalText = formButton.innerText;
        formButton.innerText = 'Sending...';
        formButton.disabled = true;
        formButton.classList.add('opacity-70', 'cursor-not-allowed');

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                formButton.innerText = 'Message Sent!';
                formButton.classList.remove('bg-white', 'text-black');
                formButton.classList.add('bg-green-600', 'text-white');
                
                formStatus.innerText = "Thanks! I'll get back to you soon.";
                formStatus.classList.remove('hidden');
                formStatus.classList.add('text-green-400');
                
                contactForm.reset();
                
                setTimeout(() => {
                    formButton.innerText = originalText;
                    formButton.classList.add('bg-white', 'text-black');
                    formButton.classList.remove('bg-green-600', 'text-white', 'opacity-70', 'cursor-not-allowed');
                    formButton.disabled = false;
                    formStatus.classList.add('hidden');
                }, 5000);
            } else {
                formStatus.innerText = json.message;
                formStatus.classList.remove('hidden');
                formStatus.classList.add('text-red-400');
            }
        })
        .catch(error => {
            console.log(error);
            formButton.innerText = 'Failed';
            formButton.classList.add('bg-red-600', 'text-white');
            setTimeout(() => {
                formButton.innerText = originalText;
                formButton.disabled = false;
                formButton.classList.remove('bg-red-600', 'text-white', 'opacity-70', 'cursor-not-allowed');
            }, 3000);
        });
    });
}