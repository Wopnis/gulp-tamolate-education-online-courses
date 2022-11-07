export default class ShowInfo {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers);
	}

	init() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const sibling = btn.closest('.module__info-show').nextElementSibling;
				const icon = btn.querySelector('svg');
				const plus = icon.querySelector('[data-show="true"]');
				sibling.classList.toggle('msg');
				sibling.style.marginTop = '20px';
				plus.classList.toggle('d-none');
			});
		});
	}
}
