# Translation Script
This is a quick and dirty translation script that sends text to Google's translation library.

## Dependencies
Node.js (+v7) and NPM

## Configuration
Update the config.json accordingly to reflect your translation task. Decreasing the delayBetweenTranslations may increase the possibility of getting your IP blacklisted by Google's servers.
```
{
    "fromLanguage": "en",
    "toLanguage": "es",
    "delayBetweenTranslations": 2000,
    "outputFile": "output.json",
    "textToTranslate": [
        "Hello, how are you doing?",
        "What is your name?"
     ]
}
```


## Install NPM Modules
Install node packages
```
npm install
```

## Run translation
```
node translate.js
```

## Output
Your output will be saved to your outputFile as follows
```
{
  translations: [
    "¿Hola, como estas?",
    "¿Cuál es su nombre?"
  ]
}
