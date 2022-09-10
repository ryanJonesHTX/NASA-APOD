//NASA API APOD

//ADD LISTENERS
document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('#random').addEventListener('click', getRandom)

//Variables for DOM elements
let title = document.querySelector('#title')
let explanation = document.querySelector('.expl')
let span = document.querySelector('span')
let iframe = document.querySelector('iframe')
let hdimg = document.querySelector('#hdimg')
let img = document.querySelector('img')
let currentDate = new Date().toLocaleDateString()

//Get New
function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://api.nasa.gov/planetary/apod?api_key=64Gml2vYgNCRfT5hxsnl1UvZXW6tnQsaROWxUkJt&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if(data.code === 404){
          title.innerText = ''
          explanation.innerText = ''
        }else{
          title.innerText = data.title
          explanation.innerText = data.explanation
        }
        if(data.copyright){
          span.innerText = `\u00A9 ${data.copyright}`
        }else if(!data.copyright){
          span.innerText = ''
        }
        if(data.media_type === "image"){
          iframe.className = 'hide'
          img.className = 'show'
          hdimg.className = 'show'
          hdimg.href = data.hdurl
          img.src = data.url
          img.alt = data.title
        }else if(data.media_type === 'video'){
          hdimg.className = 'hide'
          img.className = 'hide'
          iframe.className = 'show'
          iframe.src = data.url
        }else{
          alert(`Invalid date - Please enter a date between 6/16/1995 and ${currentDate}`)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
//Random 
function getRandom(){
  const urlRand = 'https://api.nasa.gov/planetary/apod?api_key=64Gml2vYgNCRfT5hxsnl1UvZXW6tnQsaROWxUkJt&count=1'

    fetch(urlRand)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data[0])
        title.innerText = `${data[0].date} - ${data[0].title}`
        explanation.innerText = data[0].explanation
        if(data[0].copyright){
          span.innerText = `\u00A9 ${data[0].copyright}`
        }else if(!data[0].copyright){
          span.innerText = ''
        }
        if(data[0].media_type === "image"){
          iframe.className = 'hide'
          img.className = 'show'
          hdimg.className = 'show'
          hdimg.href = data[0].hdurl
          img.src = data[0].url
          img.alt = data[0].title
        }else if(data[0].media_type === 'video'){
          hdimg.className = 'hide'
          img.className = 'hide'
          iframe.className= 'show'
          iframe.src = data[0].url
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


