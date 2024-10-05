const chromas = document.getElementsByClassName('chroma_wrapper')
for (const c of chromas) {
  c.addEventListener('click', (e) => {
    const chroma = JSON.parse(c.getAttribute('data-chroma'))
    console.log(chroma)
    //show weapon
    const banner = document.getElementById('banner')
    //show video
    const iframechroma = document.getElementById('weapon_video')
    banner.setAttribute('src', chroma.full_render)
    if (chroma.chroma_video != null) {
      iframechroma.removeAttribute('hidden')
      iframechroma.setAttribute('src', chroma.chroma_video)
    } else {
      iframechroma.setAttribute('hidden', true)
      iframechroma.setAttribute('src', '')
    }
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  const body = document.getElementById('skbody')
  const bundle = JSON.parse(body.getAttribute('data-bundle'))
  console.log(bundle)
  if (bundle.length) {
    body.classList.add(`bg-[url('${bundle[0].displayIcona}')]`)
  } else {
    body.classList.add('bg_default')
  }
})
