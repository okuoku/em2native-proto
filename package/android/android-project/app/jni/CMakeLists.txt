cmake_minimum_required(VERSION 3.6)

project(GAME)

# armeabi-v7a requires cpufeatures library
# include(AndroidNdkModules)
# android_ndk_import_module_cpufeatures()

set(YFRM_CWGL_BACKEND PlatformGLES)
set(YFRM_PKG_RSRC_ROOT ${CMAKE_CURRENT_LIST_DIR}/../src/main/assets)
add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/../../../../.. yfrm)

