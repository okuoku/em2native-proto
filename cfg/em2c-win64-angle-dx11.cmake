execute_process(
    COMMAND
    ${CMAKE_COMMAND}
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_DX11=ON
    -DEM2C_APPNAME=app1
    ${CMAKE_CURRENT_LIST_DIR}/..
    )
