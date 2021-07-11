find_program(WASM2C wasm2c)

execute_process(
    COMMAND
    ${CMAKE_COMMAND}
    -G Xcode
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_METAL=ON
    -DEM2C_APPNAME=app1
    -DWITH_WASM2C=${WASM2C}
    -DBUILD_SHARED_LIBS=OFF
    ${CMAKE_CURRENT_LIST_DIR}/..
    )

message(STATUS "WASM2C = ${WASM2C}")
