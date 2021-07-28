function(run)
    execute_process(${ARGN}
        RESULT_VARIABLE rr)
    if(rr)
        message(FATAL_ERROR "fail.")
    endif()
endfunction()
