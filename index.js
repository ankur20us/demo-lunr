const lunr = require('lunr')
const documents = require('./documents')
const docsCache = {}

const idx = lunr(function () {
  this.ref('name')
  this.field('desc')

  documents.forEach(function (doc) {
    // Created the hashmap of { ref1: original doc, ref2: original doc...}
    docsCache[doc.name] = doc
    this.add(doc)
  }, this)
})
// This returns only the references and not the original docs.
const results = idx.search('miles')
console.log('after search', JSON.stringify(results, null, 2))

/**
 * We will get the original docs back with respect to references since we created the HashMap at line 10.
 * This problem is properly described here: https://github.com/olivernn/lunr.js/issues/88
 */
const resultsWithDescription = results.map(res => docsCache[res.ref])
console.log('>> with full object', JSON.stringify(resultsWithDescription, null, 2))
