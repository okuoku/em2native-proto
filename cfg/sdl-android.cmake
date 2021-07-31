cmake_minimum_required(VERSION 3.1)

include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)

file(MAKE_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/sdl-android)

set(WASM2C ${CMAKE_CURRENT_LIST_DIR}/../app/prepare/ext/wabt/build/wasm2c)

run(COMMAND
    ${CMAKE_COMMAND} 
    -DEM2C_APPNAME=app1
    -DWITH_WASM2C=${WASM2C}
    -DPACKAGE_PLATFORM=sdl-android
    -P ${CMAKE_CURRENT_LIST_DIR}/../package/_genproject.cmake
    WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/sdl-android
    )
