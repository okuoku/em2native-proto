
/*
const BOOTPROTOCOL = "unity";
const BOOTSTRAP = "app3/webgl.framework.js";
const BOOTWASM = "app3/webgl.wasm";
const APPFS_DIR = "app3/appfs";
const DLLFILE = "../apps/out/appdll_app3.dll";
*/

/*
const BOOTPROTOCOL = "unity";
const BOOTSTRAP = "app4/webgl.framework.js";
const BOOTWASM = "app4/webgl.wasm";
const APPFS_DIR = "app4/appfs";
const DLLFILE = "../apps/out/appdll_app4.dll";
*/

/*
const BOOTPROTOCOL = "unity";
const BOOTSTRAP = "app2/gltest2.framework.js";
const BOOTWASM = "app2/gltest2.wasm";
const APPFS_DIR = "app2/appfs";
const DLLFILE = "../apps/out/appdll_app2.dll";
*/

/*
const BOOTPROTOCOL = "godot";
const BOOTSTRAP = "app5/pp.webgl.js";
const BOOTWASM = "app5/webgl.wasm";
const GODOT_ARGS = ["--main-pack","webgl.pck"]; // target path
const APPFS_DIR = "app5/appfs";
const DLLFILE = "../apps/out/appdll_app5.dll";
*/

/*
const BOOTPROTOCOL = "plain";
const BOOTSTRAP = "app6/dosbox-x.js";
const BOOTWASM = "app6/dosbox-x.wasm";
const BOOTARGS = ["-conf", "/appfs/conf"];
const APPFS_DIR = "app6/appfs";
const DLLFILE = "../apps/out/appdll_app6.dll";
*/

/*
const BOOTPROTOCOL = "unity";
const BOOTSTRAP = "app7/webgl.framework.js";
const BOOTWASM = "app7/webgl.wasm";
const APPFS_DIR = "app7/appfs";
const DLLFILE = "../apps/out/appdll_app7.dll";
*/

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);

import launch from "./launcher.mjs";
const path = require("path");

const TESTAPPROOT = path.dirname(import.meta.url) + "/../app/testapp";

function topath(pth){
    let url = new URL(TESTAPPROOT + pth);
    return fileURLToPath(url);
}

const BOOTPROTOCOL = "plain";
const BOOTSTRAP = new URL(TESTAPPROOT + "/app1/example_emscripten_opengl3.js");
const BOOTWASM = new URL(TESTAPPROOT + "/app1/example_emscripten_opengl3.wasm");
const BOOTARGS = [];
const APPFS_DIR = false;

/*
const BOOTPROTOCOL = "tt";
const BOOTSTRAP = new URL(TESTAPPROOT + "/app8/tt.js");
const BOOTWASM = new URL(TESTAPPROOT + "/app8/tt.wasm");
const BOOTARGS = [];
const APPFS_DIR = false;
*/

/*
const BOOTPROTOCOL = "unity";
const BOOTSTRAP = new URL(TESTAPPROOT + "/app7/webgl.framework.js");
const BOOTWASM = new URL(TESTAPPROOT + "/app7/webgl.wasm");
const BOOTARGS = [];
const APPFS_DIR = topath("/app7/appfs");
*/

/*
const BOOTPROTOCOL = "unity";
const BOOTSTRAP = new URL(TESTAPPROOT + "/app2/gltest2.framework.js");
const BOOTWASM = new URL(TESTAPPROOT + "/app2/gltest2.wasm");
const BOOTARGS = [];
const APPFS_DIR = topath("/app2/appfs");
*/

launch({
       BOOTPROTOCOL: BOOTPROTOCOL,
       BOOTSTRAP: BOOTSTRAP,
       BOOTWASM: BOOTWASM,
       BOOTARGS: BOOTARGS,
       APPFS_DIR: APPFS_DIR,
       DLLFILE: false,
       WebAssembly: WebAssembly

});
