include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)

# Setup translators

#
# wasm2c
#

set(builddir ${CMAKE_CURRENT_LIST_DIR}/../app/prepare/ext/wabt/build)
file(MAKE_DIRECTORY ${builddir})
run(COMMAND ${CMAKE_COMMAND}
    -G Ninja
    -DCMAKE_BUILD_TYPE=RelWithDebInfo
    ..
    WORKING_DIRECTORY ${builddir})

run(COMMAND ninja wasm2c
    WORKING_DIRECTORY ${builddir})

#
# npm (for rollup.js)
#

set(jsdir ${CMAKE_CURRENT_LIST_DIR}/../jsprebuild)
run(COMMAND npm ci
    WORKING_DIRECTORY ${jsdir})
run(COMMAND ./node_modules/.bin/rollup -c
    WORKING_DIRECTORY ${jsdir})
