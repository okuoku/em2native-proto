include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/configs.cmake)

if(WIN32)
    set(host WIN32)
elseif(APPLE)
    set(host APPLE)
else()
    set(host UNIX)
endif()

foreach(cfg ${configs})
    if(hosttype-${cfg} STREQUAL host)
        message(STATUS "Config: ${cfg}")
        configure(${cfg}
            ${srcdir-${cfg}}
            ${cmakeopts-${cfg}})
    endif()
endforeach()

foreach(cfg ${configs})
    if(host STREQUAL "WIN32")
        set(opt -j8 -- /p:CL_MPcount=8)
    elseif(${host} STREQUAL "APPLE")
        set(opt -- CODE_SIGNING_ALLOWED=NO)
    else()
        set(opt)
    endif()
    if(hosttype-${cfg} STREQUAL host)
        message(STATUS "Build: ${cfg}")
        execute_process(COMMAND
            ${CMAKE_COMMAND}
            --build .
            ${opt}
            WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/${cfg}
            RESULT_VARIABLE rr)
        if(rr)
            message(FATAL_ERROR "build error")
        endif()
    endif()
endforeach()


