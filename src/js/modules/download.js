export default class Download {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers);
		this.path = 'assets/img/mainbg.jpg';
	}

	downloadItem() {
		const element = document.createElement('a');
		element.setAttribute('href', this.path);
		element.setAttribute('download', 'pdf');
		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();
		document.body.removeChild(element);
	}

	init() {
		console.log(this.btns);
		this.btns.forEach(btn => {
			btn.addEventListener('click', e => {
				e.stopPropagation();
				this.downloadItem();
			});
		});
	}
}
