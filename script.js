document.addEventListener('DOMContentLoaded', () => {

    const btnTema = document.getElementById('clique');
    const THEME_KEY = 'pietro_portfolio_theme';

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'white') {
        document.body.classList.add('white');
        if (btnTema) btnTema.textContent = 'Tema Escuro';
    } else {
        if (btnTema) btnTema.textContent = 'Tema Claro';
    }

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('white');
            const isWhite = document.body.classList.contains('white');
            btnTema.textContent = isWhite ? 'Tema Escuro' : 'Tema Claro';
            localStorage.setItem(THEME_KEY, isWhite ? 'white' : 'dark');
        });
    }

    const phoneInput = document.getElementById('input-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)$/, '($1');
            }
            e.target.value = value;
        })
    }

    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOkBtn = document.getElementById('modal-ok-btn');
    const contactForm = document.getElementById('contact-form');

    function openModal(title, text) {
        if (modal) {
            modalTitle.textContent = title;
            modalText.textContent = text;
            modal.classList.remove('hidden');
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('input-name').value;
            openModal('Mensagem Enviada!', `Obrigado pelo contato, ${name}! Sua mensagem foi enviada com sucesso e retornarei em breve.`);
            contactForm.reset();
        });
    }

    const projectBtns = document.querySelectorAll('.btn-ver-projeto');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            openModal(title, desc);
        });
    });

    const devSpan = document.querySelector('.dev');
    if (devSpan) {
        const textToType = '(Developer Front-End)';
        devSpan.textContent = '';
        let charIndex = 0;

        function typeEffect() {
            if (charIndex < textToType.length) {
                devSpan.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100);
            }
        }
        typeEffect();
    }

    const animatedSections = document.querySelectorAll('section, main');
    
    const observerOptions = {
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});
const texto = "Explorando as fronteiras entre a tecnologia e o design.";
const elementoTexto = document.getElementById("titulo-digitado");

let index = 0;
let estaApagando = false;

const velocidadeEscrever = 60;
const velocidadeApagar = 35;
const tempoPausaCheio = 1500;
const tempoPausaVazio = 500;

function efeitoDigitar() {
    if (estaApagando) {
        elementoTexto.textContent = texto.substring(0, index - 1);
        index--;
    } else {
        elementoTexto.textContent = texto.substring(0, index + 1);
        index++;
    }

    let proximaVelocidade = estaApagando ? velocidadeApagar : velocidadeEscrever;

    if (!estaApagando && index === texto.length) {
        proximaVelocidade = tempoPausaCheio; 
        estaApagando = true;
    } 

    else if (estaApagando && index === 0) {
        proximaVelocidade = tempoPausaVazio;
        estaApagando = false;
    }

    setTimeout(efeitoDigitar, proximaVelocidade);
}

window.addEventListener("DOMContentLoaded", efeitoDigitar);

const elementos = document.querySelectorAll(
    '.meta, .discurso, .apresentacao'
);

document.addEventListener('mousemove', (e) => {

    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    elementos.forEach((elemento, index) => {

        const intensidade = (index + 1) * 8;

        elemento.style.transform = `
            translate(
                ${mouseX * intensidade}px,
                ${mouseY * intensidade}px
            )
        `;
    });

});
const telefone = document.querySelector(".input-telefone");

telefone.addEventListener("input", function () {
    let valor = telefone.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    if (valor.length <= 2) {
        telefone.value = "(" + valor;
    } 
    else if (valor.length <= 7) {
        telefone.value = "(" + valor.substring(0, 2) + ")" + valor.substring(2);
    } 
    else {
        telefone.value = "(" + valor.substring(0, 2) + ")" +
                         valor.substring(2, 7) + "-" +
                         valor.substring(7);
    }
});

telefone.addEventListener("blur", function () {
    const numeros = telefone.value.replace(/\D/g, "");

    if (numeros.length !== 10 && numeros.length !== 11) {
        telefone.setCustomValidity(
            "Digite um telefone válido. Exemplo: (31)99999-9999"
        );
    } else {
        telefone.setCustomValidity("");
    }
});