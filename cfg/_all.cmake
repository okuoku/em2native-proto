cmake_minimum_required(VERSION 3.1)

include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/configs.cmake)

if(WIN32)
    set(host WIN32)
elseif(APPLE)
    set(host APPLE)
else()
    set(host UNIX)
endif()

if(CONFIG)
    # Special case for android
    if(CONFIG MATCHES "android-*")
        run(COMMAND
            ${CMAKE_COMMAND} -P ${CMAKE_CURRENT_LIST_DIR}/sdl-android.cmake)
        return()
    endif()
    set(runconfigs ${CONFIG})
else()
    set(runconfigs ${configs})
endif()

foreach(cfg ${runconfigs})
    if(hosttype-${cfg} STREQUAL host)
        message(STATUS "Config: ${cfg}")
        configure(${cfg}
            ${srcdir-${cfg}}
            ${cmakeopts-${cfg}})
    endif()
endforeach()

foreach(cfg ${runconfigs})
    set(multiconfig)
    if(host STREQUAL "WIN32")
        set(opt -j8 -- /p:CL_MPcount=8)
        set(multiconfig Debug RelWithDebInfo)
    elseif(host STREQUAL "APPLE")
        set(opt -- CODE_SIGNING_ALLOWED=NO)
        set(multiconfig Debug RelWithDebInfo)
    else()
        set(opt)
        set(multiconfig DEFAULT)
    endif()
    if(hosttype-${cfg} STREQUAL host)
        foreach(c ${multiconfig})
            if(c STREQUAL "DEFAULT")
                set(cfgopt)
            else()
                set(cfgopt --config ${c})
            endif()
            message(STATUS "Build: ${cfg}/${c}")
            execute_process(COMMAND
                ${CMAKE_COMMAND}
                --build .
                ${cfgopt}
                ${opt}
                WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/${cfg}
                RESULT_VARIABLE rr)
            if(rr)
                message(FATAL_ERROR "build error(cfg: ${cfg}/${c})")
            endif()
        endforeach()
    endif()
endforeach()


