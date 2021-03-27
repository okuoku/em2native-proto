cmake_minimum_required(VERSION 3.1)
project(em2capp C CXX)

include(./duk-srcs.cmake)
include(./app7-files.cmake)

add_subdirectory(yfrm)

set(rsrcs)
foreach(e ${app7_FILES})
    set(fn ${app7_FILESBASE}/${e})
    list(APPEND rsrcs ${fn})
    set_source_files_properties(
        ${fn}
        PROPERTIES
        VS_DEPLOYMENT_CONTENT 1
        VS_DEPLOYMENT_LOCATION ${e})
endforeach()

list(APPEND rsrcs
    ${CMAKE_CURRENT_LIST_DIR}/runtime/promise-polyfill.min.js)
set_source_files_properties(
    ${CMAKE_CURRENT_LIST_DIR}/runtime/promise-polyfill.min.js
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION promise-polyfill.min.js)
list(APPEND rsrcs
    ${CMAKE_CURRENT_LIST_DIR}/launcher/duk/bootstrap.js)
set_source_files_properties(
    ${CMAKE_CURRENT_LIST_DIR}/launcher/duk/bootstrap.js
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION bootstrap.js)

include_directories(
    launcher/duk/print
    interp/duktape-src
    )

# Duktape
if(WIN32)
    add_definitions(
        -DDUK_USE_GET_MONOTONIC_TIME_WINDOWS_QPC=1
        )
else()
    add_definitions(
        -DDUK_USE_GET_MONOTONIC_TIME_CLOCK_GETTIME=1
        )
endif()


add_executable(em2app WIN32
    launcher/duk/yuniduk.c
    launcher/duk/print/duk_print_alert.c
    ${duk-srcs}
    nccc/nccc/javascript/duk-nccc/duk-nccc.c
    nccc/nccc/common/ncccutils.c
    ${rsrcs}
    )

target_link_libraries(em2app
    yfrm
    angle_static
    SDL2-static
    ${app7_APPCODE}

    # SDL2 (Yuniframe)
    user32
    gdi32
    winmm
    imm32
    ole32
    oleaut32
    version
    uuid
    advapi32
    setupapi
    shell32
    dinput8

    # angle (Yuniframe)
    dxgi
    dxguid

    # dx11 (Yuniframe)
    d3d11
    )