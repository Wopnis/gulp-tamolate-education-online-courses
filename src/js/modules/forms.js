export default class Form {
  constructor(forms, url = 'assets/questions.php') {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Идет загрузка',
      success: 'Сообщение отправлено. Скоро мы с Вами свяжемся!',
      failure: 'Что-то пошло не так...',
    };
    this.path = url;
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      input.addEventListener('keypress', function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = '+7 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  async sendData(url, data) {
    let result = await fetch(url, {
      method: 'POST',
      body: data,
    });
    return await result.text();
  }

  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach((item) => {
      item.addEventListener('submit', (e) => {
        e.preventDefault();
        let messageStatus = document.createElement('div');
        messageStatus.style.cssText = `
            margin-top: 15px;
            font-size: 18px;
            color: red;
         `;
        item.parentNode.appendChild(messageStatus);
        messageStatus.textContent = this.message.loading;
        const formData = new FormData(item);
        this.sendData(this.path, formData)
          .then((res) => {
            console.log(res);
            messageStatus.textContent = this.message.success;
          })
          .catch(() => {
            messageStatus.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              messageStatus.remove();
            }, 6000);
          });
      });
    });
  }
}
