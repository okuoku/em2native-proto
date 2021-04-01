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
macro(add_asset pth src)
    get_filename_component(_pthdir "${pth}" DIRECTORY)
    if(WINDOWS_STORE)
        list(APPEND rsrcs "${src}")
        set_source_files_properties(
            "${src}"
            PROPERTIES
            VS_DEPLOYMENT_CONTENT 1
            VS_DEPLOYMENT_LOCATION "${_pthdir}")
    elseif(YUNIBASE_PKG_RSRC_ROOT)

    endif()
endmacro()

foreach(e ${${appname}_FILES})
    add_asset("${appname}/appfs/${e}" "${${appname}_FILESBASE}/${e}")
endforeach()

add_asset("promise-polyfill.min.js" "${CMAKE_CURRENT_LIST_DIR}/runtime/promise-polyfill.min.js")
add_asset("bootstrap.js" "${CMAKE_CURRENT_LIST_DIR}/launcher/duk/bootstrap.js")
add_asset("index.js" "${CMAKE_CURRENT_LIST_DIR}/runtime/output-duk/index.js")
get_filename_component(jsname "${${appname}_JS}" NAME)
add_asset("${appname}/${jsname}" "${${appname}_JS}")
get_filename_component(wasmname "${${appname}_WASM}" NAME)
add_asset("${appname}/${wasmname}" "${${appname}_WASM}")

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
