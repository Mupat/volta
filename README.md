# Yantre
**Y**et **a**nother **n**ew **t**ab **r**eplacement **e**xtension for chrome browser

## Usage
1. download
2. enable development mode in chrome extension
3. load unpacked extension and choose the complete folder

## Development
Had some dependencies:

* coffee-script
* less
* handlebars

**All of them need to be compiled, before new changes take effect!**

So easiest way to do it, is using node and installing the required node_modules. You can just do ```npm install``` or install them globally. The following commands using globally installed modules.

**Implementation of grunt follows, so then its just ```grunt build``` and ```grunt watch```**

So for coffe-script:

```
coffee -o ../js/ -j main.js -c ../coffee/
```

So for handlebars:

```
handlebars ../template/*.handlebars -f ../js/template.js
```

So for less:

```
cd less && lessc main.less > ../css/main.css && cd ..
```

