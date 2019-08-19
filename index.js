'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
const imgView = document.getElementById('img-view')
const viewType = document.querySelector('.view-type')

var imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1563284170/clot-des-orangers/clots-des-orangets-00.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1562147842/clot-des-orangers/clots-des-orangets-01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1562184780/clot-des-orangers/clots-des-orangets-02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1562173702/clot-des-orangers/clots-des-orangets-03.jpg',
]

const imgsArr = imgs.map(url => {
const imgLoaded = new Image()
imgLoaded.src = url
return imgLoaded
})
console.log(imgsArr)

let num = 0

const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI ,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  )
  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const check = () => {
  num <= 1 ?( () => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    viewType.classList.add('hide')
  })()
    :( () => {
      canvas.classList.remove('hide')
      viewType.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
  // scene.render()
  num === 0 ? imgView.src = imgsArr[0] : null
  num === 1 ? imgView.src = imgsArr[1] : null
}

check()

const next = () => {
  num < imgsArr.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgsArr.length - 1
    : num--
  scene = createScene()
  check()
}

engine.runRenderLoop(function () {
  scene.render()
})

if(num!==0){
window.addEventListener('resize', function () {
  engine.resize()  
})
}
