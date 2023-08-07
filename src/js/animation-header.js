window.addEventListener("DOMContentLoaded", () => {
	const list = document.querySelectorAll(".navigation-link");

	list.forEach((link) => {
		let letters = link.textContent.split("");
		link.textContent = "";
		letters.forEach((letter, i) => {
			i += 1;
			let span = document.createElement("span");
			let delay = i / 15;

			let letterOut = document.createElement("span");
			letterOut.textContent = letter;
			letterOut.style.transitionDelay = `${delay}s`;
			letterOut.classList.add("out");
			span.append(letterOut);

			let letterIn = document.createElement("span");
			letterIn.textContent = letter;
			letterIn.style.transitionDelay = `${delay}s`;
			letterIn.classList.add("in");
			span.append(letterIn);

			link.append(span);
		});
	});
});
