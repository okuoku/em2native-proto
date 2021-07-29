cmake_minimum_required(VERSION 3.1)

include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)

# Setup translators

message(STATUS "PATH = $ENV{PATH}")

#
# wasm2c
#

if(NOT WIN32)
    set(builddir ${CMAKE_CURRENT_LIST_DIR}/../app/prepare/ext/wabt/build)
    file(MAKE_DIRECTORY ${builddir})
    run(COMMAND ${CMAKE_COMMAND}
        -DCMAKE_BUILD_TYPE=RelWithDebInfo
        ..
        WORKING_DIRECTORY ${builddir})

    run(COMMAND ${CMAKE_COMMAND} --build . --target wasm2c
        WORKING_DIRECTORY ${builddir})
endif()

#
# npm (for rollup.js)
#

if(WIN32)
    # To support PowerShell
    set(NPM npm.cmd)
    set(ROLLUP rollup.cmd)
    set(PATHSEP \\)
else()
    set(NPM npm)
    set(ROLLUP rollup)
    set(PATHSEP /)
endif()
set(jsdir ${CMAKE_CURRENT_LIST_DIR}/../jsprebuild)
run(COMMAND ${NPM} ci
    WORKING_DIRECTORY ${jsdir})
run(COMMAND .${PATHSEP}node_modules${PATHSEP}.bin${PATHSEP}${ROLLUP} -c
    WORKING_DIRECTORY ${jsdir})
