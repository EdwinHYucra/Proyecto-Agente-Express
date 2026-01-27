var questions = document.getElementsByClassName('caja-preguntas');
var currentOpen = null; // Esta variable mantendrá el control de la respuesta actualmente visible

for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', function() {
        var answer = this.querySelector('.caja-respuesta');
        if (currentOpen && currentOpen !== answer) {
            currentOpen.style.display = 'none'; // Oculta la respuesta anteriormente abierta
        }
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
            currentOpen = answer; // Actualiza la respuesta actualmente visible
        } else {
            answer.style.display = 'none';
            currentOpen = null; // Ninguna respuesta está visible
        }
    });
}
/*var questions = document.getElementsByClassName('caja-preguntas');

for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', function() {
        var answer = this.querySelector('.caja-respuesta');
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
}*/