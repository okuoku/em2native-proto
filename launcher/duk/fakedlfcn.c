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

extern void* the_module_root;

struct tbl_entry tbl[] = {
    { "the_module_root", &the_module_root },
    { 0, 0 }
};

void
dlfcn_get(const uint64_t* in, uint64_t* out){
    char* const symname = (uintptr_t)in[1];
    void** ref;
    void* ret;
    int i;
    i = 0;
    ret = 0;
    while(tbl[i].name){
        if(0 == strcmp(tbl[i].name, symname)){
            ref = tbl[i].addr;
            ret = *ref;
            break;
        }
    }
    if(ret){
        out[0] = 0;
        out[1] = (uintptr_t)ret;
    }else{
        out[0] = -1;
        out[1] = -1;
    }
}
