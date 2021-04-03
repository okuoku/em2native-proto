# For WindowsStore:
#   cmake -DCMAKE_SYSTEM_NAME=WindowsStore -DCMAKE_SYSTEM_VERSION=10.0

# Tentative
if(APPLE)
    set(YFRM_CWGL_BACKEND PlatformGLES)
endif()

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
add_custom_target(deploy_assets)
set(asset_counter 0)
macro(add_asset pth src)
    get_filename_component(_pthdir "${pth}" DIRECTORY)
    if(WINDOWS_STORE)
        list(APPEND rsrcs "${src}")
        set_source_files_properties(
            "${src}"
            PROPERTIES
            VS_DEPLOYMENT_CONTENT 1
            VS_DEPLOYMENT_LOCATION "${_pthdir}")
    elseif(YFRM_PKG_RSRC_ROOT)
        set(_out "${YFRM_PKG_RSRC_ROOT}/${pth}")
        add_custom_command(OUTPUT "${_out}"
            COMMAND ${CMAKE_COMMAND} -E copy_if_different
            "${src}" "${_out}"
            DEPENDS "${src}"
            COMMENT "Deploy ${src} => ${pth}")
        add_custom_target(deploy_${asset_counter} DEPENDS "${_out}")
        add_dependencies(deploy_assets deploy_${asset_counter})
        math(EXPR asset_counter "${asset_counter}+1")
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

set(mainsrc
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

if(WIN32 OR WINDOWS_STORE)
    add_executable(em2app WIN32 ${mainsrc})
elseif(ANDROID)
    add_library(em2app SHARED ${mainsrc})
    add_dependencies(em2app deploy_assets)
else()
    add_executable(em2app WIN32 ${mainsrc})
endif()

if("${YFRM_CWGL_BACKEND}" STREQUAL PlatformGLES)
    set(gles_impl)
else()
    set(gles_impl angle_static)
endif()

set(fs_impl)

if(WIN32 OR WINDOWS_STORE)
    set(platform_deps
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
else()
    set(platform_deps)
endif()

target_link_libraries(em2app
    ${gles_impl}
    ${fs_impl}
    SDL2-static
    ${appcode}
    ${platform_deps}
    )
if(${CMAKE_GENERATOR} STREQUAL Xcode)
    target_link_libraries(em2app
        yfrm
        )
else()
    target_link_libraries(em2app
        $<TARGET_OBJECTS:yfrm>
        )
endif()

