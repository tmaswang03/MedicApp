const imageUpload = document.getElementById('imageUpload')
const gridContainer = document.getElementById('gridContainer')
let labels

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/static/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/static/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/static/models')
]).then(start)

async function start() {
  let image, canvas, container
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  imageUpload.addEventListener('change', async () => {
    if(!container) {
      container = document.createElement('div')
      container.id = "container"
      container.style.position = 'relative'
      gridContainer.append(container)
    }
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  })
}

function loadLabeledImages() {
  const labels = ['Justin Bieber: Lyme Disease, Chronic Anxiety', 
  'Thomas Wang: Anaphylaxis, Diabetes', 
  'Ariana Grande: Cholinergic Urticaria',
  'Shawn Mendes: Asthma',
  ]
  const links  = ['https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg',
  'https://vantagetutoring.org/assets/tutorphotos/twang.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/dd/Ariana_Grande_Grammys_Red_Carpet_2020.png',
  'https://upload.wikimedia.org/wikipedia/commons/2/26/Shawn_Mendes_teaches_you_Canadian_slangs_02.jpg',
  ]
  return Promise.all(
    labels.map(async function(text, index){
      const descriptions = []
      const img = await faceapi.fetchImage(links[index])
      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
      descriptions.push(detections.descriptor)

      return new faceapi.LabeledFaceDescriptors(text, descriptions)
    })
  )
}




