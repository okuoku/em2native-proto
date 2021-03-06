import ncccutil from "./ncccutil.mjs";

const cwgl0 = ncccutil.opendll_null("./yfrm.dll");
const yfrmdll = ncccutil.opendll("./nccc_yfrm.dll", "yfrm"); /* Both yfrm and cwgl */

// Types
const cwglCtx = null;
const cwglString = null;
const cwglBuffer = null;
const cwglShader = null;
const cwglProgram = null;
const cwglTexture = null;
const cwglFramebuffer = null;
const cwglRenderbuffer = null;
const cwglUniformLocation = null;
const Int = "int";
const Float = "float";
const _ = "void";
const C = cwglCtx;

const __ported_cwgl = {

    /* Heap Objects */
    cwgl_string_size: ["size_t", [C, cwglString]],
    cwgl_string_read: [Int, [C, cwglString, "void *", "size_t"]],
    cwgl_string_release: [_, [C, cwglString]],
    // FIXME: We use size_t for release functions so V8 can collect
    //        pointer object itself
    cwgl_Buffer_release: [_, [C, "size_t" /* cwglBuffer */ ]],
    cwgl_Shader_release: [_, [C, "size_t" /* cwglShader */]],
    cwgl_Program_release: [_, [C, "size_t" /* cwglProgram */]],
    cwgl_Texture_release: [_, [C, "size_t" /* cwglTexture */]],
    cwgl_Framebuffer_release: [_, [C, "size_t" /* cwglFramebuffer */]],
    cwgl_Renderbuffer_release: [_, [C, "size_t" /* cwglRenderbuffer */]],
    cwgl_UniformLocation_release: [_, [C, "size_t" /* cwglUniformLocation */]],

    /* Context, Platform */
    // cwgl_getContextAttributes: [Int, [C]],
    // cwgl_isContextLost: [Int, [C]],
    // cwgl_getSupportedExtensions
    // getExtension

    /* OpenGL State */
    cwgl_disable: [_, [C, Int]],
    cwgl_enable: [_, [C, Int]],

    // 2.5 GL Errors
    cwgl_getError: [Int, [C]],

    // 2.7 Current Vertex State
    cwgl_vertexAttrib1f: [_, [C, Int, Float]],
    cwgl_vertexAttrib2f: [_, [C, Int, Float, Float]],
    cwgl_vertexAttrib3f: [_, [C, Int, Float, Float, Float]],
    cwgl_vertexAttrib4f: [_, [C, Int, Float, Float, Float, Float]],

    // 2.8 Vertex Arrays
    cwgl_vertexAttribPointer: [_, [C, Int, Int, Int, Int, Int, Int]],
    cwgl_enableVertexAttribArray: [_, [C, Int]],
    cwgl_disableVertexAttribArray: [_, [C, Int]],
    cwgl_drawArrays: [_, [C, Int, Int, Int]],
    cwgl_drawElements: [_, [C, Int, Int, Int, Int]],

    // 2.9 Buffer Objects
    cwgl_bindBuffer: [_, [C, Int, cwglBuffer]],
    cwgl_deleteBuffer: [_, [C, cwglBuffer]],
    cwgl_createBuffer: [cwglBuffer, [C]],
    cwgl_bufferData: [_, [C, Int, Int, "void *", Int]],
    cwgl_bufferSubData: [_, [C, Int, Int, "void *", Int]],

    // 2.10.1 Loading and Creating Shader Source
    cwgl_createShader: [cwglShader, [C, Int]],
    cwgl_shaderSource: [_, [C, cwglShader, "string", Int]],
    cwgl_compileShader: [_, [C, cwglShader]],
    cwgl_deleteShader: [_, [C, cwglShader]],

    // 2.10.3 Program Objects
    cwgl_createProgram: [cwglProgram, [C]],
    cwgl_attachShader: [_, [C, cwglProgram, cwglShader]],
    cwgl_detachShader: [_, [C, cwglProgram, cwglShader]],
    cwgl_linkProgram: [_, [C, cwglProgram]],
    cwgl_useProgram: [_, [C, cwglProgram]],
    cwgl_deleteProgram: [_, [C, cwglProgram]],

    // 2.10.4 Shader Variables
    // cwgl_getActiveAttrib: FIXME:
    cwgl_getAttribLocation: [Int, [C, cwglProgram, "string"]],
    cwgl_bindAttribLocation: [_, [C, cwglProgram, Int, "string"]],
    cwgl_getUniformLocation: [cwglUniformLocation, [C, cwglProgram, "string"]],
    cwgl_getActiveUniform: [Int, [C, cwglProgram, Int, "void *", "void *", "void *"]],
    cwgl_uniform1f: [_, [C, cwglUniformLocation, Float]],
    cwgl_uniform1i: [_, [C, cwglUniformLocation, Int]],
    cwgl_uniform2f: [_, [C, cwglUniformLocation, Float, Float]],
    cwgl_uniform2i: [_, [C, cwglUniformLocation, Int, Int]],
    cwgl_uniform3f: [_, [C, cwglUniformLocation, Float, Float, Float]],
    cwgl_uniform3i: [_, [C, cwglUniformLocation, Int, Int, Int]],
    cwgl_uniform4f: [_, [C, cwglUniformLocation, Float, Float, Float, Float]],
    cwgl_uniform4i: [_, [C, cwglUniformLocation, Int, Int, Int, Int]],
    cwgl_uniform1fv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform1iv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform2fv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform2iv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform3fv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform3iv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform4fv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniform4iv: [_, [C, cwglUniformLocation, "void *", Int]],
    cwgl_uniformMatrix2fv: [_, [C, cwglUniformLocation, Int, "void *", Int]],
    cwgl_uniformMatrix3fv: [_, [C, cwglUniformLocation, Int, "void *", Int]],
    cwgl_uniformMatrix4fv: [_, [C, cwglUniformLocation, Int, "void *", Int]],

    // 2.10.5 Shader Execution
    cwgl_validateProgram: [_, [C, cwglProgram]],

    // 2.12.1 Controlling the Viewport
    cwgl_depthRange: [_, [C, Float, Float]],
    cwgl_viewport: [_, [C, Int,Int,Int,Int]],

    // 3.4 Line Segments
    cwgl_lineWidth: [_, [C, Float]],

    // 3.5 Polygons
    cwgl_frontFace: [_, [C, Int]],
    cwgl_cullFace: [_, [C, Int]],

    // 3.5.2 Depth offset
    cwgl_polygonOffset: [_, [C, Float, Float]],

    // 3.6.1 Pixel Storage Modes
    cwgl_pixelStorei: [_, [C, Int, Int]],

    // 3.7 Texturing
    cwgl_activeTexture: [_, [C, Int]],

    // 3.7.1 Texture Image Specification
    cwgl_texImage2D: [_, [C, Int, Int, Int, Int, Int, Int, Int, Int, "void *", Int]],

    // 3.7.2 Alternate Texture Image Specification Commands
    cwgl_copyTexImage2D: [_, [C, Int, Int, Int, Int, Int, Int, Int, Int]],
    cwgl_texSubImage2D: [_, [C, Int, Int, Int, Int, Int, Int, Int, Int, "void *", Int]],
    cwgl_copyTexSubImage2D: [_, [C, Int, Int, Int, Int, Int, Int, Int, Int]],

    // 3.7.3 Compressed Texture Images
    cwgl_compressedTexImage2D: [_, [C, Int, Int, Int, Int, Int, Int, "void *", Int]],
    cwgl_compressedTexSubImage2D: [_, [C, Int, Int, Int, Int, Int, Int, Int, "void *", Int]],

    // 3.7.4 Texture Parameters
    cwgl_texParameterf: [_, [C, Int, Int, Float]],
    cwgl_texParameteri: [_, [C, Int, Int, Int]],

    // 3.7.11 Mipmap Generation
    cwgl_generateMipmap: [_, [C, Int]],

    // 3.7.13 Texture Objects
    cwgl_bindTexture: [_, [C, Int, cwglTexture]],
    cwgl_deleteTexture: [_, [C, cwglTexture]],
    cwgl_createTexture: [cwglTexture, [C]],

    // 4.1.2 Scissor Test
    cwgl_scissor: [_, [C, Int, Int, Int, Int]],

    // 4.1.3 Multisample Fragment Operations
    cwgl_sampleCoverage: [_, [C, Float, Int]],

    // 4.1.4 Stencil Test
    cwgl_stencilFunc: [_, [C, Int, Int, Int]],
    cwgl_stencilFuncSeparate: [_, [C, Int, Int, Int, Int]],
    cwgl_stencilOp: [_, [C, Int, Int, Int]],
    cwgl_stencilOpSeparate: [_, [C, Int, Int, Int, Int]],

    // 4.1.5 Depth Buffer Test
    cwgl_depthFunc: [_, [C, Int]],

    // 4.1.6 Blending
    cwgl_blendEquation: [_, [C, Int]],
    cwgl_blendEquationSeparate: [_, [C, Int, Int]],
    cwgl_blendFuncSeparate: [_, [C, Int, Int, Int, Int]],
    cwgl_blendFunc: [_, [C, Int, Int]],
    cwgl_blendColor: [_, [C, Float, Float, Float, Float]],

    // 4.2.2 Fine Control of Buffer Updates
    cwgl_colorMask: [_, [C, Int, Int, Int, Int]],
    cwgl_depthMask: [_, [C, Int]],
    cwgl_stencilMask: [_, [C, Int]],
    cwgl_stencilMaskSeparate: [_, [C, Int, Int]],

    // 4.2.3 Clearing the Buffers
    cwgl_clear: [_, [C, Int]],
    cwgl_clearColor: [_, [C, Float, Float, Float, Float]],
    cwgl_clearDepth: [_, [C, Float]],
    cwgl_clearStencil: [_, [C, Int]],

    // 4.3.1 Reading Pixels
    cwgl_readPixels: [_, [C, Int, Int, Int, Int, Int, Int, "void *", Int]],

    // 4.4.1 Binding and Managing Framebuffer Objects
    cwgl_bindFramebuffer: [_, [C, Int, cwglFramebuffer]],
    cwgl_deleteFramebuffer: [_, [C, cwglFramebuffer]],
    cwgl_createFramebuffer: [cwglFramebuffer, [C]],

    // 4.4.3 Renderbuffer Objects
    cwgl_bindRenderbuffer: [_, [C, Int, cwglRenderbuffer]],
    cwgl_deleteRenderbuffer: [_, [C, cwglRenderbuffer]],
    cwgl_createRenderbuffer: [cwglRenderbuffer, [C]],
    cwgl_renderbufferStorage: [_, [C, Int, Int, Int, Int]],
    cwgl_framebufferRenderbuffer: [_, [C, Int, Int, Int, cwglRenderbuffer]],
    cwgl_framebufferTexture2D: [_, [C, Int, Int, Int, cwglTexture, Int]],

    // 4.4.5 Framebuffer Completeness
    cwgl_checkFramebufferStatus: [Int, [C, Int]],

    // 5.1 Flush and Finish
    cwgl_finish: [_, [C]],
    cwgl_flush: [_, [C]],

    // 5.2 Hints
    cwgl_hint: [_, [C, Int, Int]],

    // 6.1.1 Simple Queries
    cwgl_getParameter_b1: [Int, [C, Int, "void *"]],
    cwgl_getParameter_b4: [Int, [C, Int, "void *", "void *", "void *", "void *"]],
    cwgl_getParameter_i1: [Int, [C, Int, "void *"]],
    cwgl_getParameter_i2: [Int, [C, Int, "void *", "void *"]],
    cwgl_getParameter_i4: [Int, [C, Int, "void *", "void *", "void *", "void *"]],
    cwgl_getParameter_f1: [Int, [C, Int, "void *"]],
    cwgl_getParameter_f2: [Int, [C, Int, "void *", "void *"]],
    cwgl_getParameter_f4: [Int, [C, Int, "void *", "void *", "void *", "void *"]],
    cwgl_getParameter_str: [Int, [C, Int, "void *"]],
    cwgl_getParameter_Buffer: [Int, [C, Int, "void *"]],
    cwgl_getParameter_Program: [Int, [C, Int, "void *"]],
    cwgl_getParameter_Framebuffer: [Int, [C, Int, "void *"]],
    cwgl_getParameter_Renderbuffer: [Int, [C, Int, "void *"]],
    cwgl_getParameter_Texture: [Int, [C, Int, "void *"]],
    cwgl_isEnabled: [Int, [C, Int]],
    // 6.1.3 Enumerated Queries
    cwgl_getTexParameter_i1: [Int, [C, Int, Int, "void *"]],
    cwgl_getBufferParameter_i1: [Int, [C, Int, Int, "void *"]],
    cwgl_getFramebufferAttachmentParameter_i1: [Int, [C, Int, Int, Int, "void *"]],
    cwgl_getFramebufferAttachmentParameter_Renderbuffer: [Int, [C, Int, Int, Int, "void *"]],
    cwgl_getFramebufferAttachmentParameter_Texture: [Int, [C, Int, Int, Int, "void *"]],
    cwgl_getRenderbufferParameter_i1: [Int, [C, Int, Int, "void *"]],

    // 6.1.4 Texture Queries
    cwgl_isTexture: [Int, [C, cwglTexture]],
    // 6.1.6 Buffer Object Queries
    cwgl_isBuffer: [Int, [C, cwglBuffer]],
    // 6.1.7 Framebuffer Object and Renderbuffer Queries
    cwgl_isFramebuffer: [Int, [C, cwglFramebuffer]],
    cwgl_isRenderbuffer: [Int, [C, cwglRenderbuffer]],

    // 6.1.8 Shader and Program Queries
    cwgl_isShader: [Int, [C, cwglShader]],
    cwgl_getShaderParameter_i1: [Int, [C, cwglShader, Int, "void *"]],
    cwgl_isProgram: [Int, [C, cwglProgram]],
    cwgl_getProgramParameter_i1: [Int, [C, cwglProgram, Int, "void *"]],
    // cwgl_getAttachedShaders FIXME: Implement readback
    cwgl_getProgramInfoLog: [cwglString, [C, cwglProgram]],
    cwgl_getShaderInfoLog: [cwglString, [C, cwglShader]],
    // cwgl_getShaderSource
    cwgl_getShaderPrecisionFormat: [Int, [C, Int, Int, "void *", "void *", "void *"]],
    // cwgl_getVertexAttrib_i1
    // cwgl_getVertexAttrib_f4
    // cwgl_getVertexAttrib_Buffer
    // cwgl_getVertexAttribOffset
    // cwgl_getUniform_i1
    // cwgl_getUniform_i2
    // cwgl_getUniform_i3
    // cwgl_getUniform_i4
    // cwgl_getUniform_f1
    // cwgl_getUniform_f2
    // cwgl_getUniform_f3
    // cwgl_getUniform_f4
    // cwgl_getUniform_m2
    // cwgl_getUniform_m3
    // cwgl_getUniform_m4

    // VAO
    cwgl_createVertexArray: false,
    cwgl_bindVertexArray: false
};

const __ported_yfrm = {
    /* Yuniframe */
    yfrm_init: [Int, []],
    yfrm_terminate: [_, []],
    yfrm_cwgl_ctx_create: [C, [Int,Int,Int,Int]],
    yfrm_cwgl_ctx_release: [_, [C]],
    yfrm_query0: [Int, [Int, "void *", Int]],
    yfrm_frame_begin0: [_, [C]],
    yfrm_frame_end0: [_, [C]],
    yfrm_audio_enqueue0: [_, ["void *", "void *", Int]],
    yfrm_audio_pause0: [_, []],
    yfrm_file_open_ro: false,
    yfrm_file_open_rw: false,
    yfrm_file_open_create: false,
    yfrm_file_close: false,
    yfrm_file_pathinfo: false,
    yfrm_file_info: false,
    yfrm_file_mkdir: false,
    yfrm_file_rmdir: false,
    yfrm_file_rename: false,
    yfrm_file_unlink: false,
    yfrm_file_readdir_begin: false,
    yfrm_file_readdir_step: false,
    yfrm_file_readdir_end: false,
    yfrm_file_read: false,
    yfrm_file_write: false,
};
const __names_yfrm = Object.keys(__ported_yfrm);
const __names_cwgl = Object.keys(__ported_cwgl);


const CWGL = {};

console.log(yfrmdll.libs);

// Inject NCCC version of procedures
__names_yfrm.forEach(e => {
    CWGL[e] = yfrmdll.libs.yfrm[e].proc;
});

__names_cwgl.forEach(e => {
    CWGL[e] = yfrmdll.libs.cwgl[e].proc;
});

export default CWGL;
