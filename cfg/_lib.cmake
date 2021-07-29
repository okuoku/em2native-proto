function(run)
    execute_process(${ARGN}
        RESULT_VARIABLE rr)
    if(rr)
        message(FATAL_ERROR "fail.")
    endif()
endfunction()

function(configure buildname srcdir)
    set(builddir
        ${CMAKE_CURRENT_BINARY_DIR}/${buildname})
    if(EXISTS ${builddir})
        if(CLEAN)
            file(REMOVE_RECURSE ${builddir})
            file(MAKE_DIRECTORY ${builddir})
        endif()
    else()
        file(MAKE_DIRECTORY ${builddir})
    endif()
    execute_process(
        COMMAND
        ${CMAKE_COMMAND}
        ${ARGN}
        ${srcdir}
        WORKING_DIRECTORY ${builddir}
        RESULT_VARIABLE rr)
    if(rr)
        message(FATAL_ERROR "fail(configure): ${buildname}")
    endif()
endfunction()

set(srcpath-em2c ${CMAKE_CURRENT_LIST_DIR}/..)
set(srcpath-yfrm ${CMAKE_CURRENT_LIST_DIR}/../nodejs)
if(WIN32)
    set(WASM2C
        ${CMAKE_CURRENT_LIST_DIR}/app/prepare/wabt-static/wasm2c.exe)
else()
    # FIXME:
    set(WASM2C wasm2c)
endif()
set(EM2C_OPTS 
    -DEM2C_APPNAME=app1
    -DWITH_WASM2C=${WASM2C})

set(configs)
macro(config envtype hosttype configname)
    set(_myname "${envtype}-${configname}")
    set(cmakeopts-${_myname} ${ARGN})
    set(srcdir-${_myname} ${srcpath-${envtype}})
    set(hosttype-${_myname} ${hosttype})
    list(APPEND configs ${_myname})
endmacro()
