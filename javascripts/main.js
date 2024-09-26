function toggleNota3() {
  const nota3Input = document.getElementById('nota_input3');
  const checkbox = document.getElementById('autoSizingCheck2');
  nota3Input.disabled = !checkbox.checked;
}

function calcular(event) {
  event.preventDefault();
  const nota1 = parseFloat(document.getElementById('nota_input1').value.replace(',', '.'));
  const nota2 = parseFloat(document.getElementById('nota_input2').value.replace(',', '.'));
  const nota3Input = document.getElementById('nota_input3');
  const resultadoDiv = document.getElementById('resultado');
  let resultado = '';
  let alertClass = '';
  let icon = '';

  const peso1 = 4;
  const peso2 = 5;
  const peso3 = 6;
  const divisor = peso1 + peso2 + peso3;

  if (document.getElementById('autoSizingCheck2').checked) {
    const nota3 = parseFloat(nota3Input.value.replace(',', '.'));
    const media = (nota1 * peso1 + nota2 * peso2 + nota3 * peso3) / divisor;

    if (media >= 7) {
      resultado = 'Você passou direto!';
      alertClass = 'alert-success';
      icon = 'bi-check-circle';
    } else if (media <= 4) {
      resultado = 'Você está reprovado.';
      alertClass = 'alert-danger';
      icon = 'bi-x-circle';
    } else {
      const notaRecuperacao = 12 - media;
      resultado = `Você está na recuperação e precisa tirar ${notaRecuperacao.toFixed(2)} na recuperação para passar.`;
      alertClass = 'alert-warning';
      icon = 'bi-exclamation-triangle';
    }
  } else {
    const mediaParcial = (nota1 * peso1 + nota2 * peso2) / (peso1 + peso2);
    const notaNecessaria = ((7 * divisor) - (nota1 * peso1 + nota2 * peso2)) / peso3;

    if (mediaParcial <= 4) {
      resultado = 'Você já está reprovado.';
      alertClass = 'alert-danger';
      icon = 'bi-x-circle';
    } else if (notaNecessaria > 10) {
      resultado = 'Você já está na recuperação, pois precisa de mais de 10 na 3° prova.';
      alertClass = 'alert-warning';
      icon = 'bi-exclamation-triangle';
    } else {
      resultado = `Você precisa tirar ${notaNecessaria.toFixed(2)} na 3° prova para não ir para a recuperação.`;
      alertClass = 'alert-primary';
      icon = 'bi bi-info-circle';
    }
  }

  resultadoDiv.innerHTML = `<div class="alert ${alertClass} custom-alert" role="alert"><i class="bi ${icon} me-2"></i>${resultado}</div>`;
}