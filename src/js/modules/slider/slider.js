export default class Slider {
	constructor({
		container = null,
		btns = null,
		next = null,
		prev = null,
	} = {}) {
		this.container = document.querySelector(container);
		this.slides = this.container.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 1;
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
	}
}
