const steps = [
    {
        title: "Respirator Masks",
        image: "assets/respirator.png",
        bullets: [
            "1. Put one on to block out the smell. Trust me, you'll thank me later.",
            "2. Share the other one with your partner, so you both stay safe. 😌😌"
        ]
    },
    {
        title: "Hazard Tape",
        image: "assets/hazard_tape.png",
        description: "Lay this tape around your changing station. It's like putting up a \"danger zone\". You're in the middle of a very serious operation, and everyone needs to know it. 🚧⚠️"
    },
    {
        title: "Nitrile Gloves",
        image: "assets/nitrile_gloves.png",
        description: "Slip on these gloves from the package to keep your hands clean and your dignity intact."
    },
    {
        title: "True Calm",
        image: "assets/true_calm.png",
        description: "Now's the perfect time to pop a True Calm pill. Take a deep breath, and remember—you're bigger, smarter, and (hopefully) faster than the baby. You got this! 💊🧘‍♂️"
    },
    {
        title: "Diaper Removal",
        image: "assets/poop.jpg",
        bullets: [
            "<span class='sub-step-title'>1. Place the Baby</span>",
            "Gently lay the baby on the changing table. If they squirm around, don't worry, it's all part of the fun. Just hold them gently but firmly 👶",
            "<span class='sub-step-title'>2. Take Off the Dirty Diaper</span>",
            "Carefully unfasten the diaper and fold it up to trap the mess. Now, toss it in the trash (don't forget to use the hazard tape to mark it as a \"toxic zone\")💩🗑️",
            "<span class='sub-step-title'>3. Wipe the Baby</span>",
            "Use baby wipes to clean your little one's bottom. Be gentle, like you're handling a very tiny, wiggly burrito 🌯"
        ]
    },
    {
        title: "Put on New Diaper",
        image: "assets/diaper.png",
        bullets: [
            "<span class='sub-step-title'>1. Grab a New Diaper</span>",
            "Get the clean diaper from the kit. This is the easy part, right?",
            "<span class='sub-step-title'>2. Place the Diaper</span>",
            "Slide the new diaper under the baby, making sure it's centered just right.",
            "<span class='sub-step-title'>3. Fasten the Diaper</span>",
            "Pull the sides up and fasten it snugly, but not too tight. We want comfort, not a baby muffin top."

        ]
    },
    {
        title: "Party Time",
        subSteps: [
            {
                subtitle: "<span class='sub-step-title'>1. Spray Some Freshener</span>",
                image: "assets/room_spray.png",
                description: "If the room still smells a bit questionable, give the Chupa Chups air freshener a quick spray. It's like a magic potion that makes everything smell sweet again. 🔍"
            },
            {
                subtitle: "<span class='sub-step-title'>2. Celebrate with a Cocktail</span>",
                image: "assets/vodka.png",
                description: "Grab that bottle of vodka, mix up a cocktail, and sip to your victory. You've totally earned it! Cheers! 🥃🍸" + 
                "<span class='warning'>⚠️ DO NOT SHARE A COCKTAIL WITH YOUR BABY</span>"
            },
            {
                subtitle: "<span class='sub-step-title'>3. Put On This Epic Song!</span>",
                video: "https://www.youtube.com/embed/vCchBkv7P-g?si=UqAqYY4EfYDb90-F",
                description: "Before you pop that cocktail, set the mood right by blasting this epic track! Trust me, every diaper change deserves a soundtrack 🎶 Let the celebration begin! 💃🕺"
            }
        ]
    }
];

let currentStep = 0;
let currentPartyStep = 0;
const totalSteps = steps.length;

function startGuide() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('step-screen').style.display = 'block';
    updateStep();
}

function updateStep() {
    const step = steps[currentStep];
    const stepScreen = document.getElementById('step-screen');
    
    stepScreen.querySelector('.step-indicator').innerHTML = 
    `STEP <span class="current-step">${currentStep + 1}</span><span class="step-total"> / ${totalSteps}</span>`;
    
    // Update title
    stepScreen.querySelector('.step-title').textContent = step.title;
    
    // Update content
    const content = stepScreen.querySelector('.content');
    const imageContainer = content.querySelector('.image-container');
    const description = content.querySelector('.description');
    
    // Clear previous content
    imageContainer.innerHTML = '';
    description.innerHTML = '';
    
    if (currentStep === totalSteps - 1) {
        // Party Time steps
        stepScreen.querySelector('.step-title').textContent = `Party Time ${currentPartyStep + 1}/3`;
        const subStep = step.subSteps[currentPartyStep];
        if (subStep.image) {
            imageContainer.innerHTML = `<img src="${subStep.image}" alt="${subStep.subtitle}">`;
        }
        if (subStep.subtitle) {
            description.innerHTML = `<h3>${subStep.subtitle}</h3>`;
        }
        if (subStep.video) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            videoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="215" 
                    src="${subStep.video}"
                    title="YouTube video player"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; playsinline" 
                    allowfullscreen
                    playsinline
                    webkit-playsinline>
                </iframe>
            `;
            description.appendChild(videoContainer);
        }
        if (subStep.description) {
            const descText = document.createElement('p');
            descText.innerHTML = subStep.description;
            description.appendChild(descText);
        }
    } else {
        // Regular steps
        if (step.image) {
            imageContainer.innerHTML = `<img src="${step.image}" alt="${step.title}">`;
        }
        if (step.description) {
            description.innerHTML = `<p>${step.description}</p>`;
        }
        if (step.bullets) {
            description.innerHTML = `<ul>${step.bullets.map(bullet => `<li>${bullet}</li>`).join('')}</ul>`;
        }
    }
    
    // Update navigation
    const nextBtn = stepScreen.querySelector('.next-btn');
    if (currentStep === totalSteps - 1 && currentPartyStep === 2) {
        nextBtn.textContent = 'Change Diaper Again';
        nextBtn.classList.add('smaller-text');
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.classList.remove('smaller-text');
    }
}

function handleNext() {
    if (currentStep === totalSteps - 1) {
        if (currentPartyStep < 2) {
            currentPartyStep++;
            updateStep();
 setTimeout(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })});
        } else {
            // Reset to start
            currentStep = 0;
            currentPartyStep = 0;
            document.getElementById('step-screen').style.display = 'none';
            document.getElementById('intro-screen').style.display = 'block';
        }
    } else {
        currentStep++;
        updateStep();
 setTimeout(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })});
    }
}

function handleBack() {
    if (currentStep === 0) {
        // If we're on the first step, return to main page
        currentStep = 0;
        currentPartyStep = 0;
        document.getElementById('step-screen').style.display = 'none';
        document.getElementById('intro-screen').style.display = 'block';
    } else if (currentStep === totalSteps - 1 && currentPartyStep > 0) {
        currentPartyStep--;
        updateStep();
 setTimeout(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })});
    } else {
        currentStep--;
        currentPartyStep = 0;
        updateStep();
 setTimeout(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })});
    }
}

