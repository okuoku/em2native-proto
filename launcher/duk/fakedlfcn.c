#define _CRT_SECURE_NO_WARNINGS
#include <string.h>
#include <stdint.h>

void
dlfcn_open(const uint64_t* in, uint64_t* out){
    // [path] => [res ptr]
    out[0] = 0;
    out[1] = 1;
}

struct tbl_entry{
    const char* name;
    void** addr;
};

extern void yfrm_nccc_root_00(const uint64_t* in, uint64_t* out);
extern void the_module_root(const uint64_t* in, uint64_t* out);

struct tbl_entry tbl[] = {
    { "yfrm_nccc_root_00", yfrm_nccc_root_00 },
    { "the_module_root", the_module_root },
    { 0, 0 }
};

void
dlfcn_get(const uint64_t* in, uint64_t* out){
    char* const symname = (uintptr_t)in[1];
    void* ret;
    int i;
    i = 0;
    ret = 0;
    while(tbl[i].name){
        if(0 == strcmp(tbl[i].name, symname)){
            ret = tbl[i].addr;
            break;
        }
        i++;
    }
    if(ret){
        out[0] = 0;
        out[1] = (uintptr_t)ret;
    }else{
        out[0] = -1;
        out[1] = -1;
    }
}
