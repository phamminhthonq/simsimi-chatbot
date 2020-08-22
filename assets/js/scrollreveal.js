const sr = ScrollReveal({
	duration: 1000,
	reset: true,
});

sr.reveal('#messagesParam', {
	distance: '25px',
	origin: 'bottom'
});

sr.reveal('#lanParam', {
	distance: '25px',
	origin: 'bottom',
	delay: 100,
	opacity: 0
});

sr.reveal('#submit', {
	distance: '50px',
	origin: 'left'
});
sr.reveal('.l1', {
	distance: '50px',
	origin: 'left'
});
sr.reveal('.l2', {
	distance: '50px',
	origin: 'left',
	delay: 500
});