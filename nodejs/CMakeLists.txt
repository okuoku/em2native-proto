cmake_minimum_required(VERSION 3.0)
project(em2nodejs)

if(MSVC)
    add_compile_options(/MP)
endif()

set(NODENCCC_DEBUG_COPY ${CMAKE_CURRENT_BINARY_DIR})
add_subdirectory(../nccc/nccc/javascript/node-nccc node-nccc)

set(YFRM_DEBUG_COPY ${CMAKE_CURRENT_BINARY_DIR})
set(YFRM_BUILD_MODULE ON)
set(YFRM_CWGL_USE_ANGLE ON)
set(YFRM_CWGL_BACKEND xxxxx) # FIXME:
add_subdirectory(../yfrm yfrm)

# Use Yuniframe DLL
add_definitions(
    -DCWGL_DLL
    -DYFRM_DLL)

include_directories(../yfrm/yuniframe/include)

# NCCC stub generation
include(../nccc/nccc/stubsupport/cmake/NcccStubMacros.cmake)
include(../yfrm/yuniframe/nccc/stub_yfrm.cmake)
include(../yfrm/yuniframe/nccc/stub_cwgl.cmake)
include_directories(
    ../nccc/nccc/stubsupport
    ${CMAKE_CURRENT_BINARY_DIR})

add_library(nccc_yfrm MODULE
    ../launcher/nccc/colroot.c
    ../launcher/nccc/stublead.yfrm.c
    ../launcher/nccc/stublead.cwgl.c
    )
target_link_libraries(nccc_yfrm yfrm)

# Debug copy
add_custom_command(TARGET nccc_yfrm POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy
    "$<TARGET_FILE:nccc_yfrm>"
    "${YFRM_DEBUG_COPY}"
    )
