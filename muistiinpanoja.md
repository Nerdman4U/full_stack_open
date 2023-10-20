# Muistiinpanoja =


## Hooks (useState, useEffect)

Reactin tilaa ei saa muuttaa suoraan (useState)

One of the arguments which setState accepts is an updater function: setState((prevState) => {}).

Hookeja siis kuuluu kutsua ainoastaan React-komponentin määrittelevän funktion rungosta.

setState suoritus tapahtuu asynkronisesti kuitenkin ennen renderöintiä.

Efekti suoritetaan heti komponentin renderöinnin jälkeen.

The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.


## Terms

Safe (pyynnöt eivät aiheuta sivuvaikutuksia: get,head) and Indempotent (1+ pyyntöä aiheuttaa saman vaikutuksen: put,delete). Post ei ole safe eikä indempotent. 

Middlewaret ovat funktioita, joiden avulla voidaan käsitellä request- ja response-olioita.


## Komponentit

Komponentteja ei kirjoiteta toisten sisään.


## React syntaksi 

Object spread: foo = { ...bar, yyy:123 }


## Debuggaus

Chrome: Kirjoita "debugger" Helpompi tosin lisätä breakpoint.


## Yleisiä Javascript muistiinpanoja

process.env <= ympäristömuuttujat

JavaScriptissa this:in arvo siis määräytyy siitä, miten metodia on kutsuttu. 

Viittaus olioon katoaa (muuttuu globaaliksi objektiksi) jos olion metodi on kopioitu referenssiksi ja kutsutaan tämän metodin kautta.

BIND 


JavaScriptissä ei ole muita tyyppejä kuin Boolean, Null, Undefined, Number, String, Symbol, BigInt ja Object.

An IIFE (Immediately Invoked Function Expression)

In essence, blocks are finally treated as scopes in ES6, but only if you declare variables with let or const. Blocks don't create scopes for var.

The Single Responsibility Principle states that every component, class or function should have a well-defined, single responsibility and only one reason to change. 

Kaksi modulijärjestelmää: CommonJS(Selaimen ulkopuoliset javascript kirjastot), Ecmascript(Standardi, v6). Calling require() always use the CommonJS module loader. Calling import() always use the ECMAScript module loader.



## Moduuleja, ohjelmia

- npm: Javascript package manager
- vite: Kehityspalvelin- moduuli reactiin, HMR - hot module replacement
- nodemon: HMR- ilman reactia (kehitys ilman reactia).
- json-server: Kevyt bakend kehityspalvelin
- axios: Selain-palvelin yhteys moduuli
- express: Backend webserver apukirjasto
- Visual Code: Tekstieditori
- Snippet: Visual code koodipohjia




## Linkkejä

https://egghead.io/courses/start-learning-react

https://egghead.io/courses/the-beginner-s-guide-to-reactjs

https://developer.chrome.com/docs/devtools/overview/

https://medium.com/@falsecrypt/solid-design-principles-for-javascript-single-responsibility-1-ca3b153ec28e

https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth

React, key: https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

Väitöskirja jossa määritetään REST rajapinta:
https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven




## Muuta

Versiointi: Major, Minor, Patch
