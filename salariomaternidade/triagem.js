(function () {
  const form = document.getElementById('triagem');
  const link = document.getElementById('whatsapp-triagem');
  let pending = false;
  function continueToWhatsApp(event) {
    event.preventDefault();
    if (!form.reportValidity() || pending) {
      event.stopImmediatePropagation();
      return;
    }
    pending = true;
    const answers = new FormData(form);
    const message = [
      'Olá, vim pela página de salário-maternidade da Ferreira & Mota Advocacia.',
      'Gestação: ' + answers.get('gestacao'),
      'Situação de trabalho: ' + answers.get('trabalho'),
      'Interesse em contratar advogado: ' + answers.get('interesse'),
      'Gostaria de conversar com a equipe sobre o meu caso.'
    ].join('\n');
    // Keep answers out of the link href and analytics payload (including Click URL).
    const destination = link.href + '&text=' + encodeURIComponent(message);
    let navigated = false;
    function navigate() {
      if (navigated) return;
      navigated = true;
      window.location.assign(destination);
    }
    // Fallback also works when GTM is blocked or the container is not published.
    window.setTimeout(navigate, 1500);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_triagem',
      contact_channel: 'whatsapp',
      form_id: 'triagem',
      eventCallback: function () { window.setTimeout(navigate, 300); },
      eventTimeout: 1200
    });
  }
  link.addEventListener('click', continueToWhatsApp);
  form.addEventListener('submit', continueToWhatsApp);
  window.addEventListener('pageshow', function () { pending = false; });
})();
