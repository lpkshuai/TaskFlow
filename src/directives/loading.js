export const loadingDirective = {
  mounted(el, binding) {
    el._loadingOverlay = null
    updateLoading(el, binding.value)
  },
  updated(el, binding) {
    updateLoading(el, binding.value)
  },
  unmounted(el) {
    removeOverlay(el)
  },
}

function updateLoading(el, isLoading) {
  if (isLoading) {
    if (el._loadingOverlay) return
    el.style.position = el.style.position || 'relative'
    const overlay = document.createElement('div')
    overlay.className = 'v-loading-overlay'
    overlay.innerHTML = '<div class="v-loading-spinner"></div>'
    el._loadingOverlay = overlay
    el.appendChild(overlay)
  } else {
    removeOverlay(el)
  }
}

function removeOverlay(el) {
  if (el._loadingOverlay) {
    el._loadingOverlay.remove()
    el._loadingOverlay = null
  }
}
