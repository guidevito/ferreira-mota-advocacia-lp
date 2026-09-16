document.getElementById('triagem').addEventListener('submit', function (event) {
  event.preventDefault();
  if (!this.reportValidity()) return;
  const answers = new FormData(this);
  const message = [
    'Olá, vim pela página de salário-maternidade da Ferreira & Mota Advocacia.',
    'Gestação: ' + answers.get('gestacao'),
    'Situação de trabalho: ' + answers.get('trabalho'),
    'Interesse em contratar advogado: ' + answers.get('interesse'),
    'Gostaria de conversar com a equipe sobre o meu caso.'
  ].join('\n');
  window.location.assign('https://wa.me/5516992550625?text=' + encodeURIComponent(message));
});
