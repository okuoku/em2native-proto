execute_process(
    COMMAND
    ${CMAKE_COMMAND}
    -G Ninja
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_GLES=ON
    -DEM2C_APPNAME=app1
    -DWITH_WASM2C=wasm2c
    -DYFRM_RSRC_LOCATION_RAWFS=ON
    ${CMAKE_CURRENT_LIST_DIR}/..
    )