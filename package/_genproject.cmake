cmake_minimum_required(VERSION 3.4)

function(deploy_configured_files base)
    set(files ${ARGN})
    foreach(f ${files})
        message(STATUS "configure: ${f}")
        configure_file(${base}/${f} 
            ${CMAKE_CURRENT_BINARY_DIR}/${f}
            @ONLY)
    endforeach()
endfunction()

function(deploy_static_files base)
    set(files ${ARGN})
    foreach(f ${files})
        get_filename_component(dir ${f} PATH)
        message(STATUS "static-deploy: ${f}")
        file(COPY ${base}/${f} DESTINATION
            ${CMAKE_CURRENT_BINARY_DIR}/${dir})
    endforeach()
endfunction()

get_filename_component( # 3.4
    ROOT
    ${CMAKE_CURRENT_LIST_DIR}/..
    ABSOLUTE)

if(PACKAGE_PLATFORM STREQUAL "sdl-android")
    set(base "${CMAKE_CURRENT_LIST_DIR}/android/android-project")
    set(configured_files
        app/jni/CMakeLists.txt
        )
    set(static_files
        app/proguard-rules.pro
        app/build.gradle
        app/src/main/res/mipmap-mdpi/ic_launcher.png
        app/src/main/res/mipmap-hdpi/ic_launcher.png
        app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
        app/src/main/res/mipmap-xxhdpi/ic_launcher.png
        app/src/main/res/mipmap-xhdpi/ic_launcher.png
        app/src/main/res/values/colors.xml
        app/src/main/res/values/styles.xml
        app/src/main/res/values/strings.xml
        app/src/main/AndroidManifest.xml
        app/src/main/java/org/libsdl/app/SDLAudioManager.java
        app/src/main/java/org/libsdl/app/SDLControllerManager.java
        app/src/main/java/org/libsdl/app/HIDDevice.java
        app/src/main/java/org/libsdl/app/HIDDeviceBLESteamController.java
        app/src/main/java/org/libsdl/app/HIDDeviceUSB.java
        app/src/main/java/org/libsdl/app/SDL.java
        app/src/main/java/org/libsdl/app/SDLActivity.java
        app/src/main/java/org/libsdl/app/HIDDeviceManager.java
        gradle/wrapper/gradle-wrapper.jar
        gradle/wrapper/gradle-wrapper.properties
        gradlew
        build.gradle
        gradle.properties
        gradlew.bat
        settings.gradle
        )
    deploy_static_files(${base} ${static_files})
    deploy_configured_files(${base} ${configured_files})
else()
    message(FATAL_ERROR "Invalid package platform")
endif()

