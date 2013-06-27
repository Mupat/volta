class File
  filesystem: window.requestFileSystem || window.webkitRequestFileSystem

  contructor: (options = window.options) ->
    window.requestFileSystem window.PERSISTENT, 5*1024*1024, @_init_file_system, @_error_handler

  _init_file_system: (fs) ->
    @fs = fs

  _error_handler: (error) ->
    message = 'An error occured:'
 
    switch error.code
      when FileError.NOT_FOUND_ERR then message = "#{message} File or directory not found" 
      when FileError.NOT_READABLE_ERR then message = "#{message} File or directory not readable"
      when FileError.PATH_EXISTS_ERR then message = "#{message} File or directory already exists"
      when FileError.TYPE_MISMATCH_ERR then message = "#{message} Invalid filetype"
      else message = "#{message} Unknown Error"

    console.log(message);
