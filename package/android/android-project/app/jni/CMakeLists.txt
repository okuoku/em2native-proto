cmake_minimum_required(VERSION 3.6)

project(em2c)

# armeabi-v7a requires cpufeatures library
# include(AndroidNdkModules)
# android_ndk_import_module_cpufeatures()

set(YFRM_CWGL_USE_ANGLE OFF)
set(YFRM_CWGL_USE_PLATFORMGLES ON)
set(YFRM_CWGL_USE_GLES ON)
set(YFRM_PKG_RSRC_ROOT ${CMAKE_CURRENT_LIST_DIR}/../src/main/assets)
set(ROOT @ROOT@)
set(WITH_WASM2C @WITH_WASM2C@)
add_subdirectory(${ROOT} em2c)

