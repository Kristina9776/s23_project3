const searchForm = document.getElementById("top-search");
searchForm.onsubmit = (ev) => {
    // console.log("submitted top-search with", ev);
    ev.preventDefault();
    const formData = new FormData(ev.target);
    // console.log('form data', formData);
    const queryText = formData.get("query");
    translate(queryText).then(data => {
        const resultsUL = document.getElementById("transResult");
        let button = document.createElement("button");
        button.innerText = data[0][0][0];
        resultsUL.appendChild(button);
        button.onclick = (e) => {
            //const token = getToken();
            searchForSong(data[0][0][0])
            .then(response => response.json())
            .then(track => track.tracks.items) // get the list of songs
            .then(songs => {
                console.log(songs);
                songs.forEach((song) => {
                    console.log(song.name);
                });
            });
        }

    })
};

// const translatePromise = translate(queryText);
// translatePromise.then((transWord) =>{
//     const translatedResult = document.getElementById("rhyme-results");
//     translatedResult.appendChild(transWord);

// })


function translate(word) {
    var sourceLang = 'en';
    var targetLang = 'es';
    let data

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(word);
    console.log(url);
    const translatePromise = fetch(url).then((resp) => resp.json())//.then((json) => data=json);
    // return data;
    return translatePromise

};

function getToken () {
    return fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('e59ac2382d5a4b4982c25560396ff044' + ':' + '179e3eceddeb438d92f371bb4387aac1')
      }, // don't know why btoa is needed, but it doesn't work without it
      body: 'grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => data.access_token);
  };
  
  function searchForSong(songTitle) {
    return getToken() // get the access token
        .then (token => {
            // use the access token and search for songs with titles that match the songTitle
            return fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songTitle)}&type=track`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
        })
  };
  




