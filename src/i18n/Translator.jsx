import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { ne } from './dictionary'

/* ---------------------------------------------------------------------------
   Site-wide Nepali translator.

   Rather than thread a t() call through every component, this swaps the
   rendered English copy for Nepali (from src/i18n/dictionary.js) directly in
   the DOM whenever the language is set to "ne", and restores the original
   English when set back to "en". A MutationObserver keeps newly-rendered or
   re-rendered content (route changes, dropdowns, count-ups, etc.) translated.

   To add/fix a translation, edit ONE file: src/i18n/dictionary.js.
   Any string not present in the dictionary simply stays in English.
--------------------------------------------------------------------------- */

// Normalise so dictionary keys match regardless of curly/straight quotes,
// non-breaking spaces, or JSX whitespace/newline collapsing.
const norm = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()

function translateText(node) {
  const raw = node.nodeValue
  if (!raw || !raw.trim()) return
  const val = ne[norm(raw)]
  if (val && node.nodeValue !== val) {
    if (node.__en === undefined) node.__en = raw
    node.nodeValue = val
  }
}

function revertText(node) {
  if (node.__en !== undefined) {
    node.nodeValue = node.__en
    delete node.__en
  }
}

function eachTextNode(root, fn) {
  if (root.nodeType === Node.TEXT_NODE) {
    fn(root)
    return
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  let n
  while ((n = walker.nextNode())) nodes.push(n)
  nodes.forEach(fn)
}

// Translate placeholder attributes (form inputs) too.
function translatePlaceholders(root, revert) {
  const scope =
    root.nodeType === Node.ELEMENT_NODE && root.querySelectorAll
      ? root
      : document.getElementById('root')
  if (!scope || !scope.querySelectorAll) return
  const els = scope.matches?.('[placeholder]')
    ? [scope, ...scope.querySelectorAll('[placeholder]')]
    : [...scope.querySelectorAll('[placeholder]')]
  els.forEach((el) => {
    if (revert) {
      if (el.__enPh !== undefined) {
        el.setAttribute('placeholder', el.__enPh)
        delete el.__enPh
      }
      return
    }
    const cur = el.getAttribute('placeholder')
    const val = ne[norm(cur || '')]
    if (val && cur !== val) {
      if (el.__enPh === undefined) el.__enPh = cur
      el.setAttribute('placeholder', val)
    }
  })
}

export default function Translator() {
  const { lang } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    if (lang !== 'ne') {
      eachTextNode(root, revertText)
      translatePlaceholders(root, true)
      return
    }

    // Initial pass for the current view.
    eachTextNode(root, translateText)
    translatePlaceholders(root, false)

    // Keep up with React re-renders / route changes / dynamic UI.
    const observer = new MutationObserver((mutations) => {
      observer.disconnect()
      for (const m of mutations) {
        if (m.type === 'characterData') {
          translateText(m.target)
        } else if (m.type === 'childList') {
          m.addedNodes.forEach((node) => {
            eachTextNode(node, translateText)
            translatePlaceholders(node, false)
          })
        }
      }
      observer.observe(root, {
        subtree: true,
        childList: true,
        characterData: true,
      })
    })
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [lang, location.pathname, location.hash])

  return null
}
