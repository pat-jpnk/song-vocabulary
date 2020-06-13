const extractLyrics = function(e){
  e.preventDefault()

  let lyrics = getLyrics()
  let phrases = getPhrases(lyrics)
  let terms = getTerms(lyrics)
  let textFileContent = buildTextFileContent(terms,phrases)

  setUniqueCounters(terms, phrases)
  setTextFileLink(textFileContent)

}

const clearLyrics = function(e){
  e.preventDefault()
  document.querySelector('#lyrics').value = ""
  document.querySelector('#phraseCount').innerHTML = "0"
  document.querySelector('#termCount').innerHTML = "0"
  document.querySelector("#text-file-link").href = ""
  document.querySelector('#download-button').disabled = true
  document.querySelector("#text-file-link").href = "#"
}

const setTextFileLink = function(textFileContent){
  document.querySelector('#download-button').disabled = false
  let link = document.querySelector("#text-file-link")
  link.href = "data:text/plan;charset=UTF-8,"+ encodeURIComponent(textFileContent)
}

const setUniqueCounters = function(terms,phrases){
  document.querySelector('#phraseCount').innerHTML = phrases.length.toString()
  document.querySelector('#termCount').innerHTML = terms.length.toString()
}

// Utility functions

const removeDuplicates = xs => {
  const collect = (r, x) => {
    if (!r.seen[x]) {
      r.result.push(x);
      r.seen[x] = true;
    }
    return r;
  };
  return xs.reduce(collect, { seen: {}, result: [] }).result;
};

const removeEmptyEntries = function(arr){
  return arr.filter(function(elem){
    return elem.replace(/\s/g,'').length
  })
}

const getPhrases = function(lyrics) {
  lyrics = lyrics.trim();
  lyrics = lyrics.replace(/\t|\.|\,|\>|\<|\«|\»/gm,"");
  lyrics = lyrics.replace(/[\u00A0\u1680\u180e\u2000-\u2009\u200a\u200b\u202f\u205f\u3000\u0020]/gm," ")
  phrases = lyrics.split(/\n/gm);
  phrases = removeEmptyEntries(phrases)
  return removeDuplicates(phrases);
}


const getTerms = function(lyrics) {
  lyrics = lyrics.trim();
  lyrics = lyrics.replace(/\n|\r\n/gm," ");
  lyrics = lyrics.replace(/\?|\!|\.|\,|\"|\>|\<|\«|\»/gm,"")         // added filter out " \" "
  lyrics = lyrics.replace(/[\u00A0\u1680\u180e\u2000-\u2009\u200a\u200b\u202f\u205f\u3000\u0020]/gm," ")
  let terms = lyrics.split(/(\s+)/gm);
  terms = removeEmptyEntries(terms)
  console.log(terms)
  return removeDuplicates(terms)
}

const getLyrics = function(){
  let lyrics = document.querySelector('#lyrics').value
  lyrics = lyrics.trim();
  lyrics = lyrics.replace(/\t|\.|\,/gm,"");
  return lyrics
}

const buildTextFileContent = function(terms, phrases){
  let textFileContent = ""
  let separator = "###############"

  textFileContent = textFileContent + separator + "\nTerms:\n" + separator + "\n\n"
  terms.forEach(function(elem){
    textFileContent = textFileContent + elem + "\n"
  })

  textFileContent = textFileContent + "\n\n" + separator + "\nPhrases:\n" + separator + "\n\n"
  phrases.forEach(function(elem){
    textFileContent = textFileContent + elem + "\n"
  })

  return textFileContent
}

// EventListeners

document.querySelector('#clear-button').addEventListener('click',clearLyrics)
document.querySelector('#extract-button').addEventListener('click',extractLyrics)


document.querySelector('#lyrics').addEventListener('input', function(){
    document.querySelector('#download-button').disabled = true
})


