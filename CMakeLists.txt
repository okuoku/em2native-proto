# For WindowsStore:
#   cmake -DCMAKE_SYSTEM_NAME=WindowsStore -DCMAKE_SYSTEM_VERSION=10.0

cmake_minimum_required(VERSION 3.1)
project(em2capp C CXX)

set(appname app1)

include(./duk-srcs.cmake)
include(./${appname}-files.cmake)

add_subdirectory(yfrm)

if(NOT ${appname}_APPCODE_PREBUILT)
    set(APP_WASM ${${appname}_WASM})
    add_subdirectory(app) # => appcode
    set(appcode appcode)
else()
    set(appcode ${${appname}_APPCODE})
endif()

set(rsrcs)
foreach(e ${${appname}_FILES})
    get_filename_component(dir ${e} DIRECTORY)
    message(STATUS "${e} => ${dir}")
    set(fn ${${appname}_FILESBASE}/${e})
    list(APPEND rsrcs ${fn})
    set_source_files_properties(
        ${fn}
        PROPERTIES
        VS_DEPLOYMENT_CONTENT 1
        VS_DEPLOYMENT_LOCATION "${appname}/appfs/${dir}")
endforeach()

list(APPEND rsrcs
    ${CMAKE_CURRENT_LIST_DIR}/runtime/promise-polyfill.min.js)
set_source_files_properties(
    ${CMAKE_CURRENT_LIST_DIR}/runtime/promise-polyfill.min.js
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION "")
list(APPEND rsrcs
    ${CMAKE_CURRENT_LIST_DIR}/launcher/duk/bootstrap.js)
set_source_files_properties(
    ${CMAKE_CURRENT_LIST_DIR}/launcher/duk/bootstrap.js
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION "")
list(APPEND rsrcs
    ${CMAKE_CURRENT_LIST_DIR}/runtime/output-duk/index.js)
set_source_files_properties(
    ${CMAKE_CURRENT_LIST_DIR}/runtime/output-duk/index.js
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION "")
list(APPEND rsrcs
    ${${appname}_JS}
    )
set_source_files_properties(
    ${${appname}_JS}
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION "${appname}")
list(APPEND rsrcs # FIXME: Unity opens wasm anyway
    ${${appname}_WASM}
    )
set_source_files_properties(
    ${${appname}_WASM}
    PROPERTIES
    VS_DEPLOYMENT_CONTENT 1
    VS_DEPLOYMENT_LOCATION "${appname}")

include_directories(
    launcher/duk/print
    interp/duktape-src
    yfrm/yuniframe/include
    )

# Duktape
if(WIN32)
    add_definitions(
        -DDUK_USE_GET_MONOTONIC_TIME_WINDOWS_QPC=1
        )
    # Debug @ launcher/duk/print/duk_print_alert.c
    add_definitions(-DUSE_WIN32_DEBUGLOGGER)
else()
    add_definitions(
        -DDUK_USE_GET_MONOTONIC_TIME_CLOCK_GETTIME=1
        )
endif()

# FIXME: Workaround for UWP
if(WINDOWS_STORE)
    add_definitions(-DSET_SDL_PKG_PATH_PREFIX)
endif()

# NCCC stub generation
include(./nccc/nccc/stubsupport/cmake/NcccStubMacros.cmake)
include(./yfrm/yuniframe/nccc/stub_yfrm.cmake)
include(./yfrm/yuniframe/nccc/stub_cwgl.cmake)
include_directories(
    nccc/nccc/stubsupport
    ${CMAKE_CURRENT_BINARY_DIR})

add_executable(em2app WIN32
    launcher/duk/yuniduk.c
    launcher/duk/fakedlfcn.c
    launcher/duk/print/duk_print_alert.c
    ${duk-srcs}
    # NCCC stubs
    launcher/nccc/colroot.c
    launcher/nccc/stublead.yfrm.c
    launcher/nccc/stublead.cwgl.c

    # NCCC runtime
    nccc/nccc/javascript/duk-nccc/duk-nccc.c
    nccc/nccc/common/ncccutils.c
    ${rsrcs}
    )

target_link_libraries(em2app
    yfrm
    angle_static
    SDL2-static
    ${appcode}

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
