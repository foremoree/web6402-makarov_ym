'use strict';

class UserFormData {
    constructor({ login, password, consent }) {
        this.login = login.trim();
        this.password = password;
        this.consent = consent;
        this.createdAt = new Date();
    }

    printToConsole() {
        console.group('Данные формы входа');
        console.log('%cВремя:%c %s', 'font-weight: bold', '', this.createdAt.toLocaleString('ru-RU'));
        console.table({
            'Логин': this.login,
            'Пароль': '*'.repeat(this.password.length),
            'Согласие на обработку': this.consent ? 'да' : 'нет',
        });
        console.groupEnd();
    }

    toPayload() {
        return {
            login: this.login,
            password: this.password,
            consent: this.consent,
            createdAt: this.createdAt.toISOString(),
        };
    }
}

const form = document.getElementById('login-form');
const message = form.querySelector('.login-form__message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    const formData = new FormData(form);

    const userData = new UserFormData({
        login: formData.get('login'),
        password: formData.get('password'),
        consent: formData.get('consent') === 'on',
    });

    userData.printToConsole();

    message.textContent = 'Отправляем...';
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData.toPayload()),
        });
        message.textContent = response.ok
            ? 'Готово, вы в клубе!'
            : `Сервер ответил ошибкой: ${response.status}`;
    } catch (error) {
        console.warn('Сервер недоступен:', error);
        message.textContent = 'Сервер пока спит';
    }
});