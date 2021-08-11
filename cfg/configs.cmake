# Apple platforms

config(em2c APPLE ios-gles
    -G Xcode
    -DCMAKE_SYSTEM_NAME=iOS
    -DYFRM_CWGL_USE_GLES=ON
    )

config(em2c APPLE mac-angle-metal
    -G Xcode
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_METAL=ON
    -DBUILD_SHARED_LIBS=OFF)

config(em2c APPLE tvos-gles
    -G Xcode
    -DCMAKE_SYSTEM_NAME=tvOS
    -DYFRM_CWGL_USE_GLES=ON)

config(em2c APPLE mac-tracker-vulkan # Not on CI (License)
    -G Xcode
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_VULKAN=ON
    -DYFRM_CWGL_EXPERIMENTAL_TRACKER=ON
    -DBUILD_SHARED_LIBS=OFF)

# Microsoft platforms

config(em2c WIN32 win64-angle-dx11
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_DX11=ON)

config(em2c WIN32 win64-tracker-pvr
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_GLES=ON
    -DYFRM_CWGL_USE_PVRVFRAME=ON
    -DYFRM_CWGL_EXPERIMENTAL_TRACKER=ON
    )
config(em2c WIN32 win64-tracker-vulkan
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_GLES=OFF
    -DYFRM_CWGL_USE_VULKAN=ON
    -DYFRM_CWGL_EXPERIMENTAL_TRACKER=ON)

config(em2c WIN32 winstore-angle-dx11
    -G "Visual Studio 16 2019"
    -A x64
    -DCMAKE_SYSTEM_NAME=WindowsStore
    -DCMAKE_SYSTEM_VERSION=10.0
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_DX11=ON)

config(yfrm WIN32 win64-angle-dx11
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_DX11=ON
    )

config(yfrm WIN32 win64-angle-vulkan
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_VULKAN=ON
    )

config(yfrm WIN32 win64-tracker-pvr
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_PVRVFRAME=ON
    -DYFRM_CWGL_USE_GLES=ON
    -DYFRM_CWGL_EXPERIMENTAL_TRACKER=ON
    )

config(yfrm WIN32 win64-tracker-vulkan
    -G "Visual Studio 16 2019"
    -A x64
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_GLES=OFF
    -DYFRM_CWGL_USE_VULKAN=ON
    -DYFRM_CWGL_EXPERIMENTAL_TRACKER=ON
    )

# Posix

# FIXME: We don't have execpath for POSIX yet
#config(em2c UNIX posix-gles
#    -G Ninja
#    -DYFRM_CWGL_USE_ANGLE=OFF
#    -DYFRM_CWGL_USE_GLES=ON
#    -DYFRM_RSRC_LOCATION_RAWFS=ON)

config(yfrm UNIX posix-gles
    -G Ninja
    -DYFRM_CWGL_USE_ANGLE=OFF
    -DYFRM_CWGL_USE_PLATFORMGLES=ON
    -DYFRM_CWGL_USE_GLES=ON)

config(yfrm UNIX posix-angle-vulkan
    -G Ninja
    -DYFRM_CWGL_USE_ANGLE=ON
    -DYFRM_CWGL_USE_VULKAN=ON)

