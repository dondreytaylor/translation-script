// Uses Google's translate API to carry out translation
var translate = require('google-translate-api');

// JSON file reader for pulling in configuration
var jsonfile = require('jsonfile')

// Reads configuration file and then proceed with setting up
// translation
jsonfile.readFile('config.json', function(err, config) {

    // Check for errors from reading the config file
    if (err) console.log(err);
    else {

        // Will contain translated text after script runs.
        var translatedText = [];

        // List of sentences, words, phrase, etc to be translated.
        var textToTranslate = config.textToTranslate || [];

        // Translates text read in from config file given
        // an index within textToTranslate
        var performTranslation = function(index) {

            // Corresponds to the index in textToTranslate
            index = index >= 0 ? index : 0;

            // Send translation job to Google
            translate(textToTranslate[index], {from: config.fromLanguage, to: config.toLanguage})
              .then(function(res) {

                  // Add translated text
                  translatedText.push(res.text || "");

                  // Show what entry we just translated
                  console.log("Translated entry: ",(index+1), "of", textToTranslate.length);

                  // Check to see if this is last translated word
                  if (translatedText.length != textToTranslate.length) {
                        setTimeout(function() {
                            performTranslation(++index);
                        }, config.delayBetweenTranslations);
                  }
                  else {

                      // Show that the translations have finished
                      console.log("Translations have completed");

                      // Save the translated text to a JSON file
                      jsonfile.writeFileSync(config.outputFile, {translations:translatedText});
                  }
              });
        };

        // Start translating text
        performTranslation();
    }
});
