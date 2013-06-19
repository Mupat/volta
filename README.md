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
* grunt

**All of them need to be compiled, before new changes take effect!**

So the easiest way to compile them is to use ```grunt```. Just run 

```
grunt build
```

to compile coffeescript files, less files and handlebar files. How to use ```grunt```, is explained on there [site](http://gruntjs.com/getting-started).

During the development you can use

```
grunt watch
```

to compile each file type after saving.