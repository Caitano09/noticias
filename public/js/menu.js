const onClickMenu = () =>{
    const element = document.getElementById('nav-menu')

    if(element.style.maxHeight == '0px'){
        const _top = element.getBoundingClientRect().top + 'px'
        const maxHeight = 'calc(100vh - '+ _top+')'
        element.style.maxHeight = maxHeight
    }
    else{
        element.style.maxHeight = '0px'
    }
}

  