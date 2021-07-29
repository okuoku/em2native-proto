include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)

run(COMMAND
    ${CMAKE_COMMAND}
    -G Ninja
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_PLATFORMGLES=ON
    -DYFRM_CWGL_USE_GLES=ON
    ${CMAKE_CURRENT_LIST_DIR}/../nodejs
    )