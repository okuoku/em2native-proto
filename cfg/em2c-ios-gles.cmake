find_program(WASM2C wasm2c)

execute_process(
    COMMAND
    ${CMAKE_COMMAND}
    -G Xcode
    -DCMAKE_SYSTEM_NAME=iOS
    -DYFRM_CWGL_USE_GLES=ON
    -DEM2C_APPNAME=app1
    -DWITH_WASM2C=${WASM2C}
    ${CMAKE_CURRENT_LIST_DIR}/..
    )

message(STATUS "WASM2C = ${WASM2C}")
