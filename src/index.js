import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import gsap from 'gsap'
import './style.css'

const rotateLeft = document.querySelector('.rotate-left')
const rotateRight = document.querySelector('.rotate-right')
const createNew = document.querySelector('.create')
const dominoWrap = document.querySelector('.domino')
const dominoScale = document.querySelector('#scale')
const dominoSelect = document.querySelectorAll('.domino-block-bar')

const dominoNew$ = fromEvent(createNew, 'click')
const rotateLeft$ = fromEvent(rotateLeft, 'click').pipe(debounceTime(300))
const rotateRight$ = fromEvent(rotateRight, 'click').pipe(debounceTime(300))
const dominoScale$ = fromEvent(dominoScale, 'input').pipe(
  map((e) => e.target.value)
)
const dominoSelect$ = fromEvent(dominoSelect, 'click').pipe(
  map((e) => e.target)
)

dominoNew$.subscribe(() => {
  dominoWrap.innerHTML =
    '<div id="domino"><div class="domino-block-bar" id="top"><div class="one">&#9679;</div></div><div class="domino-block-bar" id="bottom"><div class="one">&#9679;</div></div></div>'
})
rotateLeft$.subscribe((value) => {
  gsap.to('#domino', { duration: 0.5, rotation: '-=90' })
})
rotateRight$.subscribe((value) => {
  gsap.to('#domino', { duration: 0.5, rotation: '+=90' })
})
dominoScale$.subscribe((value) => {
  domino.style.transform = `scale(${value / 10},${value / 10})`
})
dominoSelect$.subscribe((value) => {
  const position = value
    .closest('.domino-block-bar')
    .getAttribute('data-position')
  const number = value.closest('.domino-block-bar').getAttribute('data-number')
  let block
  if (position === 'top') {
    block = document.querySelector('#top')
  } else {
    block = document.querySelector('#bottom')
  }
  const res = createDomino(+number)
  block.innerHTML = res

  function createDomino(num) {
    switch (num) {
      case 1:
        return `<div class="one">&#9679;</div>`
        break

      case 2:
        return `<div class="two-one">&#9679;</div>
                <div class="two-two">&#9679;</div>`
        break

      case 3:
        return `<div class="three-one">&#9679;</div>
                <div class="three-two">&#9679;</div>
                <div class="three-three">&#9679;</div>`
        break

      case 4:
        return `<div class="four-one">&#9679;</div>
                <div class="four-two">&#9679;</div>
                <div class="four-three">&#9679;</div>                         
                <div class="four-four">&#9679;</div>`
        break

      case 5:
        return `<div class="five-one">&#9679;</div>
                <div class="five-two">&#9679;</div>
                <div class="five-three">&#9679;</div>                         
                <div class="five-four">&#9679;</div>                         
                <div class="five-five">&#9679;</div>`
        break

      case 6:
        return `<div class="six-one">&#9679;</div>
                <div class="six-two">&#9679;</div>
                <div class="six-three">&#9679;</div>                         
                <div class="six-four">&#9679;</div>                         
                <div class="six-five">&#9679;</div>                         
                <div class="six-six">&#9679;</div>`
        break

      default:
        return `<div class="one">&#9679;</div>`
    }
  }
})
