var key = {
	0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
	'length': 3
}

var webSite = {
	'q': 'qq.com',
	'w': 'weibo.com',
	'x': 'xiedaimala.com',
	'b': 'baidu.com',
	'z': 'zhihu.com',
	'g': 'google.com',
	'j': 'jianshu.com',
	'e': 'github.com'
}

var main = document.getElementById('main');

var newWebSit = JSON.parse(localStorage.getItem('local') || 'null');
if (newWebSit) {
	webSite = newWebSit;
	console.log(1);
}

for (var i = 0; i < key.length; i++) {
	var keyboard = addTag('div');
	keyboard.className = 'row';
	main.appendChild(keyboard);
	for (var j = 0; j < key[i].length; j++) {
		var keyBox = addTag('kbd'),
			keyValue = addTag('span'),
			editBtn = addTag('button'),
			icon = addTag('img'),
			keySite = key[i][j];
		keyValue.className = 'keyValue';
		keyValue.textContent = keySite;
		editBtn.textContent = 'Edit';
		editBtn.className = 'editBtn';
		editBtn.id = keySite;

		icon.onerror = function(){
			this.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
		}
		icon.src = 'http://' + webSite[keySite] + '/favicon.ico';
		
		keyBox.appendChild(keyValue);
		keyBox.appendChild(icon);
		keyBox.appendChild(editBtn);
		keyboard.appendChild(keyBox);

		editBtn.onclick = function(btn) {
			var val = prompt(),
				webKey = this.id,
				newIcon = this.previousSibling;
			webSite[webKey] = val;	
			localStorage.setItem('local', JSON.stringify(webSite));
			newIcon.src = 'http://' + val + '/favicon.ico';
		}
	}
}



document.onkeypress = function(key) {
	var site = webSite[key.key];
	if (site) {
		window.open('http://' + site, '_blank');
	} else {
		console.log('error')
	}
}


function addTag(tag) {
	return document.createElement(tag);
}