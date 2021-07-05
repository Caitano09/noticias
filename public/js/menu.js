const nav = document.getElementById('nav-menu')
const dropdownMenu = document.getElementById('dropdown-menu')

const onClickMenu = () =>{

    if(nav.style.maxHeight == '0px'){
        const _top = nav.getBoundingClientRect().top + 'px'
        const maxHeight = 'calc(100vh - '+ _top+')'
        nav.style.maxHeight = maxHeight
    }
    else{
        nav.style.maxHeight = '0px'
    }
}

const onClickDropdownMenu = () =>{
    console.log(dropdownMenu.style)
    if(dropdownMenu.style.maxHeight == '0px'){
        const _top = dropdownMenu.getBoundingClientRect().top + 'px'
        const maxHeight = 'calc(100vh - '+ _top+')'
        dropdownMenu.style.maxHeight = maxHeight
    }
    else{
        dropdownMenu.style.maxHeight = '0px'
    }
}

if(window.innerWidth >= 768){
    nav.removeAttribute("style")
}else{
    nav.style.maxHeight = '0px'      
}

window.addEventListener("resize", e =>{
    if(window.innerWidth >= 768){
        nav.removeAttribute("style")
    }else{
        nav.style.maxHeight = '0px'      
    }
})

  