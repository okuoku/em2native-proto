set(app7_FILES
    boot.config
    data.unity3d
    idbfs/.keep
    Il2CppData/Metadata/global-metadata.dat
    Managed/mono/4.0/machine.config
    Resources/unity_default_resources
    RuntimeInitializeOnLoads.json
    ScriptingAssemblies.json
    sharedassets0.resource
    sharedassets1.resource
    )

set(app7_FILESBASE c:/build/em2capp/output) # Prebuilt??
set(app7_APPCODE_PREBUILT ON)
set(app7_APPCODE c:/build/em2capp/appcode_app7.lib) # Prebuilt
set(app7_JS ${CMAKE_CURRENT_LIST_DIR}/app/testapp/app7/webgl.framework.js)
set(app7_WASM ${CMAKE_CURRENT_LIST_DIR}/app/testapp/app7/webgl.wasm)
