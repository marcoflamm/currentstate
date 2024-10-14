document.addEventListener("DOMContentLoaded", function() {
  const words = [
    "Go-to-Market?", 
    "New Business Sales?", 
    "Customer Renewals?", 
    "Expansion Sales?", 
    "Sales Culture?"
  ];

  gsap.to("#cursor", {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "power2.inOut"
  });

  let tlMaster = gsap.timeline({ repeat: -1 });

  words.forEach((word) => {
    let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
    tlText.to("#animated-text", { duration: 2, text: word });
    tlMaster.add(tlText);
  });
});
