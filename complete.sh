#!/bin/bash
function __king011_jsgenerate_base(){
    local cur=${COMP_WORDS[COMP_CWORD]}
    if [ 2 == $COMP_CWORD ];then
        local opts="-h --help"
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    fi
}
function __king011_jsgenerate_help(){
    local cur=${COMP_WORDS[COMP_CWORD]}
    if [ 2 == $COMP_CWORD ];then
        local opts="version complete init help -h --help"
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    fi
}
function __king011_jsgenerate_init_option(){
    local cur=${COMP_WORDS[COMP_CWORD]}
    local opts='-n --name -p --package -t --tag -h --help'
    case ${COMP_WORDS[COMP_CWORD-1]} in
        -n|--name|-p|--package|-h|--help)

        ;;
        -t|--tag)
            local opts_items=`jsgenerate init ${COMP_WORDS[2]} --list-tag 2> /dev/null`
            COMPREPLY=( $(compgen -W "${opts_items}" -- ${cur}) )
        ;;

        # default
        *)
            COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
        ;;
    esac
}
function __king011_jsgenerate_init(){
    local cur=${COMP_WORDS[COMP_CWORD]}
    if [ 2 == $COMP_CWORD ];then
        local opts_items=`jsgenerate init --list 2> /dev/null`
        local opts="--list -h --help"
        COMPREPLY=( $(compgen -W "${opts_items} ${opts}" -- ${cur}) )
    else 
        local key=${COMP_WORDS[2]}
        local opts_items=`jsgenerate init --list 2> /dev/null`
        if [[ "$opts_items" == *"$key"* ]];then
            __king011_jsgenerate_init_option
        fi
    fi
}
function __king011_jsgenerate(){
    # 獲取 正在輸入的 參數
    local cur=${COMP_WORDS[COMP_CWORD]}
    #  輸入 第1個 參數
    if [ 1 == $COMP_CWORD ];then
        local opts="version complete init help -h --help"
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    else
         # switch 子命令
        case ${COMP_WORDS[1]} in
            version)
                __king011_jsgenerate_base
            ;;
            complete)
                __king011_jsgenerate_base
            ;;
            help)
                __king011_jsgenerate_help
            ;;
            init)
                __king011_jsgenerate_init
            ;;
        esac
    fi
}
complete -F __king011_jsgenerate jsgenerate