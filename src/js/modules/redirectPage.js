export default class RedirectPage {
	constructor(trigger, target) {
		this.btn = document.querySelector(trigger);
		this.targetPage = target;
	}

	redirectPage() {
		try {
			this.btn.addEventListener('click', e => {
				e.preventDefault();
				window.location.href = this.targetPage;
			});
		} catch (error) {}
	}
}
