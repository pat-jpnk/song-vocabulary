const removeDups = xs => {
 
  const collect = (r, x) => {
    if (!r.seen[x]) {
      r.result.push(x);
      r.seen[x] = true;
    }
    return r;
  };

  return xs.reduce(collect, { seen: {}, result: [] }).result;
};

const clean = function(arr){
  return arr.filter(function(elem){
    return elem.replace(/\s/g,'').length
  })
}



const buildTextFile = function(terms, phraeses){
  //...
}


const getPhrases = function(lyrics){
  lyrics = lyrics.trim();
  lyrics = lyrics.replace(/\t|\.|\,/gm,"");
  //lyrics = lyrics.replace(/\s/gm," ");
  lyrics = lyrics.replace(/[\u00A0\u1680\u180e\u2000-\u2009\u200a\u200b\u202f\u205f\u3000\u0020]/gm," ")
  phrases = lyrics.split(/\n/gm);
  phrases = clean(phrases)
  return removeDups(phrases);
}

const getTerms = function(lyrics){
  lyrics = lyrics.trim();
  lyrics = lyrics.replace(/\n|\r\n/gm," ");
  lyrics = lyrics.replace(/\?|\!|\.|\,/gm,"")
  lyrics = lyrics.replace(/\s+/gm," ");
  lyrics = lyrics.replace(/[\u00A0\u1680\u180e\u2000-\u2009\u200a\u200b\u202f\u205f\u3000\u0020]/gm," ")
  terms = lyrics.split(/(\s+)/gm);
  terms = clean(terms)
  return removeDups(terms)
}




