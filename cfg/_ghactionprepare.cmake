cmake_minimum_required(VERSION 3.1)

include(${CMAKE_CURRENT_LIST_DIR}/_lib.cmake)

if(CONFIG STREQUAL "android")
    message(STATUS "Skip package installation for Android target")
    return()
endif()

if(CMAKE_SYSTEM_NAME STREQUAL "Linux")
    message(STATUS "Installing packages")
    # From SDL:e5594e66778707c3bd9e1bce229140564e0c9844 sans some Wayland and Ninja
    run(COMMAND sudo apt install
        wayland-protocols 
        pkg-config 
        libasound2-dev 
        libdbus-1-dev 
        libegl1-mesa-dev 
        libgl1-mesa-dev 
        libgles2-mesa-dev 
        libglu1-mesa-dev 
        libibus-1.0-dev 
        libpulse-dev 
        libsndio-dev 
        libudev-dev 
        libwayland-dev 
        libwayland-client++0 
        wayland-scanner++ 
        libwayland-cursor++0 
        libx11-dev 
        libxcursor-dev 
        libxext-dev 
        libxi-dev 
        libxinerama-dev 
        libxkbcommon-dev 
        libxrandr-dev 
        libxss-dev 
        libxt-dev 
        libxv-dev 
        libxxf86vm-dev 
        libdrm-dev 
        libgbm-dev
        libpulse-dev 
        libpango1.0-dev
        )
else()
    message(STATUS "No additional package for ${CMAKE_SYSTEM_NAME}")
endif()
