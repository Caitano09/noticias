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
let TamanhoDoc = document.documentElement.scrollHeight
let TamanhoTela = document.documentElement.clientHeight

console.log('doc: ', TamanhoDoc)
console.log('tela: ', TamanhoTela)
if(TamanhoDoc > TamanhoTela){
    console.log('Tem scroll');
  } else {
    console.log('Não tem scroll');
    const element = document.querySelector('.footer')
    element.style.position = "absolute"
    element.style.bottom = 0
    element.style.width = '95%'
  }
  