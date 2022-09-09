//NASA API APOD
document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('#random').addEventListener('click', getRandom)

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
          document.querySelector('#title').innerText = ''
          document.querySelector('.expl').innerText = ''
        }else{
        document.querySelector('#title').innerText = data.title
        document.querySelector('.expl').innerText = data.explanation
        }
        if(data.copyright){
          document.querySelector('span').innerText = `\u00A9 ${data.copyright}`
        }else if(!data.copyright){
          document.querySelector('span').innerText = ''
        }
        if(data.media_type === "image"){
          document.querySelector('iframe').style.display = 'none'
          document.querySelector('#hdimg').className = 'show'
          document.querySelector('#hdimg').href = data.hdurl
          document.querySelector('img').src = data.url
          document.querySelector('img').alt = data.title
        }else if(data.media_type === 'video'){
          document.querySelector('#hdimg').className = 'hide'
          document.querySelector('img').src = ''
          document.querySelector('iframe').style.display = 'block'
          document.querySelector('iframe').src = data.url
          document.querySelector('img').alt = ''
        }else{
          alert('Invalid date - Please enter a date between 06-16-1995 and today')
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
        document.querySelector('#title').innerText = `${data[0].date} - ${data[0].title}`
        document.querySelector('.expl').innerText = data[0].explanation
        if(data[0].copyright){
          document.querySelector('span').innerText = `\u00A9 ${data[0].copyright}`
        }else if(!data[0].copyright){
          document.querySelector('span').innerText = ''
        }
        if(data[0].media_type === "image"){
          document.querySelector('iframe').style.display = 'none'
          document.querySelector('#hdimg').className = 'show'
          document.querySelector('#hdimg').href = data[0].hdurl
          document.querySelector('img').src = data[0].url
          document.querySelector('img').alt = data[0].title
        }else if(data[0].media_type === 'video'){
          document.querySelector('#hdimg').className = 'hide'
          document.querySelector('img').src = ''
          document.querySelector('img').alt = ''
          document.querySelector('iframe').style.display = 'block'
          document.querySelector('iframe').src = data[0].url
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


