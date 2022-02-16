const SentenceTypeClassifier = require("sentence-type-classifier");

class TextService {

  public isSentenceInterrogative(sentence: string): boolean {

    // classify with simple package - https://www.npmjs.com/package/sentence-type-classifier (based on https://github.com/dariusk/pos-js)
    const classifier = new SentenceTypeClassifier();
    const type = classifier.classify(sentence);
    if(type == 'interrogative') {
      return true;
    } else {
      return false;
    }
    // look on https://www.npmjs.com/package/corenlp for more complex solution

  }

  public wordsByFrequency(sentence: string, direction: string = 'desc'): string[] {

    // sanitize and lowercase input
    const casedSentence = sentence.toLowerCase();
    const alphaOnlySentence = casedSentence.replace(/[^a-zA-Z\s]+/g, '');
    const words = alphaOnlySentence.split(' ');

    // set all initial frequencies to zero
    const wordsByfrequency = {};
    words.map(value => wordsByfrequency[value] = 0 );

    // create new array with words and their frequencies
    const uniquesWords = words.filter(value => ++wordsByfrequency[value] == 1 );

    // sort words by according to direction
    if(direction == 'desc') {
      return uniquesWords.sort((a, b) => wordsByfrequency[b] - wordsByfrequency[a] );
    } else {
      return uniquesWords.sort((a, b) => wordsByfrequency[a] - wordsByfrequency[b] );
    }

  }
}

export default TextService;


