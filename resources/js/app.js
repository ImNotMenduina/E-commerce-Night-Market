const form = document.getElementById('favorite')

form.addEventListener('submit', function (event) {
  event.preventDefault() // Impede o recarregamento da página

  const url = form.getAttribute('data-action')
  const formData = new FormData(form)

  fetch(url, {
    // Substitua pela URL do seu servidor
    method: 'post',
    body: formData,
  }).catch((e) => {
    console.error(e)
  })
})
