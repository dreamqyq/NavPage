// 1.初始化hash
var hash = init(),
	key = hash.key,
	webSite = hash.webSite

// 2.生成键盘
createKeyboard(key,webSite,function(){
  document.addEventListener('visibilitychange',() => {
    if(document.hidden){
      let kbds = document.querySelectorAll('kbd')
      for(let i = 0; i < kbds.length; i++){
        kbds[i].classList.remove('active')
      }
    }
  })
})

// 3.监听键盘事件
listenUser()

// 功能函数

// 初始化键盘hash，网址hash
function init() {
  var key = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    'length': 3
  }
  var webSite = {
    'q': 'qq.com',
    'w': 'weibo.com',
    't': 'taobao.com',
    'b': 'baidu.com',
    'z': 'zhihu.com',
    'g': 'google.com',
    'j': 'jianshu.com',
    'a': 'apple.com',
    's': 'stackoverflow.com'
  }

  // 从localStore中获取已存的网址并更新
  webSite = updateLocalStorage(webSite)

  return {
    'key': key,
    'webSite': webSite
  }
}

// 创建标签函数
function addTag(tag, attributes) {
  var element = document.createElement(tag)
  if (attributes) {
    for (var key in attributes) {
      element[key] = attributes[key]
    }
  }
  return element
}

// 更新localStorage函数
function updateLocalStorage(web) {
  var newWebSit = JSON.parse(localStorage.getItem('local') || 'null')
  if (newWebSit) {
    web = newWebSit
  }

  return web
}

// 新建键盘函数
function createKeyboard(key,webSite,callback) {
  var main = document.getElementById('main')
  for (let i = 0; i < key.length; i++) { var keyboard = addTag('div', {className: 'row'})
    main.appendChild(keyboard)
    for (let j = 0; j < key[i].length; j++) {
      var keyBox = addTag('kbd'),
        icon = addTag('img'),
        keySite = key[i][j],
        editBtn = addTag('button', {textContent: 'Edit', className: 'editBtn',id: keySite}), 
        keyValue = addTag('span', {className: 'keyValue', textContent: keySite }) 

      keyBox.dataset.key = key[i][j]
      iconSrc(icon,keySite)
      keyBox.appendChild(keyValue)
      keyBox.appendChild(icon)
      keyBox.appendChild(editBtn)
      keyboard.appendChild(keyBox)

      editBtn.onclick = function(btn) {
        var val = prompt(),
          webKey = this.id,
          newIcon = this.previousSibling
        webSite[webKey] = val
        localStorage.setItem('local', JSON.stringify(webSite))
        newIcon.src = 'http://' + val + '/favicon.ico'
      }
    }
  }
  callback.call()
}

// 图片资源更新函数
function iconSrc(iconTag,index) {
  iconTag.onerror = function() {
    this.src = '//i.loli.net/2018/06/02/5b1253d0b413f.png'
  }
  iconTag.src = 'http://' + webSite[index] + '/favicon.ico'
}

// 网址跳转
function toNewPath(site){
  if (site) {
    window.open('http://' + site, '_blank')
  } else {
    console.log('error')
  }
}

// 用户监听函数
function listenUser(){
  let main = document.querySelector('#main')
  document.onkeypress = function(key) {
    var site = webSite[key.key]
    toNewPath(site)
  }
  main.addEventListener('mousedown', e => {
    let el = e.target
    if(el.matches('kbd')){
      el.classList.add('active')
    }
  })
  main.addEventListener('mouseup',e => {
    let el = e.target
    if(el.matches('kbd')){
      el.classList.remove('active')
    }
  })
  main.addEventListener('click', e => {
    let el = e.target
    let key = el.dataset.key 
    if(el.matches('kbd')){
      var site = webSite[key]
      toNewPath(site)
    }
  })
  document.addEventListener('keydown', e => {
    let key = e.key
    let keyEl = main.querySelector(`kbd[data-key="${key}"]`)
    keyEl.classList.add('active')
  })
  document.addEventListener('keyup', e => {
    let key = e.key
    let keyEl = main.querySelector(`kbd[data-key="${key}"]`)
    keyEl.classList.remove('active')
  })
}

