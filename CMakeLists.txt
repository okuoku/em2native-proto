if(YFRM_USE_METAL)
    # Configure SDL
    set(VIDEO_OPENGLES OFF CACHE BOOL "" FORCE)
    set(VIDEO_VULKAN OFF CACHE BOOL "" FORCE)
    set(HAVE_HIDAPI OFF CACHE BOOL "" FORCE)
    set(HIDAPI OFF CACHE BOOL "" FORCE)
endif()

if(APPLE AND YFRM_CWGL_USE_GLES)
    add_definitions(-DGLES_SILENCE_DEPRECATION)
endif()

cmake_minimum_required(VERSION 3.1)
project(em2capp C CXX)

if(MSVC)
    add_compile_options(/MP)
endif()

if(EM2C_APPNAME)
    set(appname ${EM2C_APPNAME})
else()
    set(appname app8)
endif()

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

if(WIN32)
    set(YFRM_PKG_RSRC_ROOT ${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_CFG_INTDIR}/${appname})
elseif(YFRM_RSRC_LOCATION_RAWFS)
    set(YFRM_PKG_RSRC_ROOT ${CMAKE_CURRENT_BINARY_DIR}/${appname})
endif()

set(rsrcs)
set(asset_dests)
macro(add_asset pth src)
    get_filename_component(_pthdir "${pth}" DIRECTORY)
    if(WINDOWS_STORE)
        list(APPEND rsrcs "${src}")
        set_source_files_properties(
            "${src}"
            PROPERTIES
            VS_DEPLOYMENT_CONTENT 1
            VS_DEPLOYMENT_LOCATION "${_pthdir}")
    elseif(APPLE)
        # Copy into bundle
        list(APPEND rsrcs "${src}")
        set_source_files_properties(
            "${src}"
            PROPERTIES
            MACOSX_PACKAGE_LOCATION "Resources/${_pthdir}")
    elseif(YFRM_PKG_RSRC_ROOT)
        # Copy resources to project root
        set(_out "${YFRM_PKG_RSRC_ROOT}/${pth}")
        add_custom_command(OUTPUT "${_out}"
            COMMAND ${CMAKE_COMMAND} -E copy_if_different
            "${src}" "${_out}"
            DEPENDS "${src}"
            COMMENT "Deploy ${src} => ${pth}")
        list(APPEND asset_dests "${_out}")
    endif()
endmacro()

foreach(e ${${appname}_FILES})
    add_asset("${appname}/appfs/${e}" "${${appname}_FILESBASE}/${e}")
endforeach()

add_asset("promise-polyfill.min.js" "${CMAKE_CURRENT_LIST_DIR}/runtime/promise-polyfill.min.js")
add_asset("bootstrap.js" "${CMAKE_CURRENT_LIST_DIR}/launcher/duk/bootstrap.js")
add_asset("index.js" "${CMAKE_CURRENT_LIST_DIR}/jsprebuild/output-duk/index.js")
get_filename_component(jsname "${${appname}_JS}" NAME)
add_asset("${appname}/${jsname}" "${${appname}_JS}")
get_filename_component(wasmname "${${appname}_WASM}" NAME)
add_asset("${appname}/${wasmname}" "${${appname}_WASM}")

if(asset_dests)
    add_custom_target(deploy_assets DEPENDS ${asset_dests})
endif()

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
elseif(YFRM_PKG_RSRC_ROOT)
    if(NOT ANDROID)
        add_definitions(-DSET_PKGNAME=\"${appname}\")
    endif()
endif()

if(YFRM_CWGL_USE_PVRVFRAME)
    link_directories(
        "C:/Imagination Technologies/PowerVR_Graphics/PowerVR_Tools/PVRVFrame/Library/Windows_x86_64"
        )
    set(YFRM_CWGL_USE_PLATFORMGLES ON)
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

set(need_cxx OFF)
if(YFRM_CWGL_USE_VULKAN)
    set(need_cxx ON)
endif()

if(need_cxx)
    list(APPEND mainsrc
        dummy.cpp)
endif()

if(WINDOWS_STORE)
    add_executable(em2app WIN32 ${mainsrc})
elseif(WIN32)
    add_executable(em2app ${mainsrc})
    # add_executable(em2app WIN32 ${mainsrc})
    add_dependencies(em2app deploy_assets)
elseif(ANDROID)
    add_library(em2app SHARED ${mainsrc})
    add_dependencies(em2app deploy_assets)
elseif(APPLE)
    add_executable(em2app MACOSX_BUNDLE ${mainsrc})
    set_target_properties(em2app
        PROPERTIES
        MACOSX_BUNDLE_BUNDLE_NAME em2app
        MACOSX_BUNDLE_BUNDLE_VERSION 1.0
        MACOSX_BUNDLE_SHORT_VERSION_STRING 1.0
        MACOSX_BUNDLE_LONG_VERSION_STRING 1.0
        MACOSX_BUNDLE_GUI_IDENTIFIER org.cltn.em2app
        #XCODE_ATTRIBUTE_CODE_SIGNING_ALLOWED "NO"
        # iPad iPhone and appletv
        XCODE_ATTRIBUTE_TARGETED_DEVICE_FAMILY "1,2,3"
        )
else()
    add_executable(em2app WIN32 ${mainsrc})
endif()

if(YFRM_CWGL_USE_ANGLE)
    set(gles_impl angle_static)
endif()

if(YFRM_CWGL_EXPERIMENTAL_TRACKER)
    if(YFRM_CWGL_USE_MOLTENVK)
        # Use MoltenVk external vulkan implementation
        if(NOT WITH_MOLTENVK)
            message(FATAL_ERROR "Need WITH_MOLTENVK variable")
        endif()

        set(gles_impl # FIXME: Move this below, inside if(APPLE)
            # SHXM
            SPIRV-Tools
            glslang
            my-glslang-default-resource-limits
            spirv-cross-c
            SPIRV
            SPIRV-Tools
            SPIRV-Tools-opt
            # MoltenVK also have these..
            # FIXME: Detect platform
            "-L ${WITH_MOLTENVK}/MoltenVK.xcframework/macos-arm64_x86_64"
            MoltenVK)

    elseif(YFRM_CWGL_USE_VULKAN)
        set(gles_impl
            # SHXM
            SPIRV-Tools
            glslang
            my-glslang-default-resource-limits
            spirv-cross-c
            SPIRV
            SPIRV-Tools
            SPIRV-Tools-opt
            )
    elseif(YFRM_CWGL_USE_PLATFORMGLES)
        set(gles_impl
            libEGL
            libGLESv2
            )
    endif()
endif()

set(fs_impl)

if(WIN32 OR WINDOWS_STORE)
    if(WINDOWS_STORE)
        set(winrt_add
            -nodefaultlib:vccorlib$<$<CONFIG:Debug>:d>
            -nodefaultlib:msvcrt$<$<CONFIG:Debug>:d>
            vccorlib$<$<CONFIG:Debug>:d>.lib
            msvcrt$<$<CONFIG:Debug>:d>.lib
            )
    else()
        set(winrt_add)
    endif()
    set(platform_deps
        ${winrt_add}
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
elseif(APPLE) # FIXME: Change this to APPLE
    # FIXME: Pass these from yuniframe
    set(platform_deps
        "-framework QuartzCore" # for CALayer
        "-framework IOSurface"
        "-framework Metal"
        "-framework CoreVideo"
        "-framework CoreAudio"
        "-framework AudioToolbox"
        "-framework AVFoundation"
        "-framework CoreGraphics"
        "-framework Foundation"
        "-framework GameController"
        "-framework CoreHaptics"
        m
        iconv
        )
    if(YFRM_CWGL_USE_METAL)
        list(APPEND platform_deps
            # FIXME: Move Metal framework here (need SDL config change?)
            spirv-cross-msl
            SPIRV-Tools
            glslang
            my-glslang-default-resource-limits
            SPIRV
            )
    endif()
    if(YFRM_CWGL_USE_GLES)
        list(APPEND platform_deps
            "-framework OpenGLES"
            )
    endif()
    if("${CMAKE_SYSTEM_NAME}" STREQUAL iOS)
        list(APPEND platform_deps
            "-framework CoreMotion"
            "-framework UIKit"
            "-framework CoreBluetooth"
            )
    elseif("${CMAKE_SYSTEM_NAME}" STREQUAL tvOS)
        list(APPEND platform_deps
            "-framework UIKit"
            "-framework CoreBluetooth"
            )
    else()
        # Apple desktop
        list(APPEND platform_deps
            "-framework CoreMotion"
            "-framework Carbon"
            "-framework ForceFeedback"
            "-framework IOKit"
            "-framework AppKit"
            )
    endif()
elseif(ANDROID)
    set(platform_deps
        # FIXME: These are PLATFORMGLES
        EGL
        GLESv2
        # SDL
        dl log android hidapi
        GLESv1_CM # FIXME: Can we disable it?
        )
elseif(UNIX)
    if("${CMAKE_SYSTEM_NAME}" STREQUAL "Linux")
        set(platform_deps
            m
            dl
            pthread

            # gcc
            stdc++fs
            stdc++
            )
    endif()
    if(NOT YFRM_CWGL_USE_ANGLE)
        list(APPEND platform_deps
            EGL
            GLESv2
            )
    endif()
else()
    message(FATAL_ERROR "Could not determine platform")
endif()

if(${CMAKE_GENERATOR} STREQUAL Xcode OR WIN32 OR WINDOWS_STORE)
    target_link_libraries(em2app
        yfrm
        )
else()
    target_link_libraries(em2app
        $<TARGET_OBJECTS:yfrm>
        )
endif()

target_link_libraries(em2app
    ${gles_impl}
    ${fs_impl}
    ${appcode}
    $<TARGET_FILE:SDL2-static> # Hack: Omit link flags
    ${platform_deps}
    )
add_dependencies(em2app SDL2-static)
if(need_cxx)
    set_target_properties(em2app
        PROPERTIES
        LINKER_LANGUAGE CXX)
endif()
