include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)

# Setup translators

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

set(jsdir ${CMAKE_CURRENT_LIST_DIR}/../jsprebuild)
run(COMMAND npm ci
    WORKING_DIRECTORY ${jsdir})
run(COMMAND ./node_modules/.bin/rollup -c
    WORKING_DIRECTORY ${jsdir})
