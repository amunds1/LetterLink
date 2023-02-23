/* 
  API used: https://ord.uib.no/ord_2_API.html
*/
export const BASE_URL = 'https://ord.uib.no/api/suggest?'

/* 
  mf:    ordbokskode
  dict:  liste med mf, f.eks: [bm,nn] eller [bm]
  q:     søkeord
  w:     lemmaord
  a:     artikkel_id
  wc:    ordklasse
  n:     max antall treff som returneres
*/
export const BASE_PARAMS = {
  // Dictionary code, 'bm' for bokmål, 'nn' for nynorsk, 'bm,nn' for both
  dict: 'bm',
  // Filter by word class (part of speech tags: https://universaldependencies.org/u/pos/index.html).
  wc: '',
  /* 
    Choose what types of suggestions you want to be included in the response. The parameter should be a concatenation of any of the following characters: 
    e (exact lemma), f (full-text search), i (inflected forms), s (similar - fuzzy search)

    Return exact lemma and include inflected forms
  */
  include: 'ei',
  // Number of results to return
  n: '2',
}
