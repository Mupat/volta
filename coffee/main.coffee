$ ->
  options = new Options ->
    window.options = options
    app = new App()
    mail = new Mail()
    clock = new Clock()
    body = new Body()

    app.render()
    mail.render()
    clock.render()

  $("#default_home").click ->
    chrome.tabs.update url: "chrome-internal://newtab/"
    false


  $("#file-input").on "change", (e) ->
    thefiles = e.target.files;
    console.log 'files', thefiles
    $.each thefiles, (i, item) ->
      thefile = item;
      console.log thefile.webkitRelativePath
      reader = new FileReader()
      reader.onload = ->
        # var dv = new jDataView(this.result);
        console.log "FILES: ", thefile.name
    
      reader.readAsArrayBuffer thefile
     
  initFS = (fs) ->
    console.log 'file system init', fs
    fs.root.getDirectory '/', {}, (dirEntry) ->
      console.log 'dirEntry', dirEntry
      dirReader = dirEntry.createReader()
      dirReader.readEntries (entries) ->
        console.log 'entries', entries
      , errorHandler  
    , errorHandler
     
  errorHandler = (error) ->
    console.log 'An error occured', error

  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem
  window.requestFileSystem window.TEMPORARY, 5*1024*1024, initFS, errorHandler
  