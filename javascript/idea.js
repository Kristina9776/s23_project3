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









