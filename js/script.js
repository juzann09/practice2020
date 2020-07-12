			document.addEventListener("DOMContentLoaded", start);
			
			let pageChosen=0;
			let pages = document.getElementsByClassName("page");
			let menu = document.getElementsByClassName("menuItem");
			
			function start(){
				setMenuEvents();
				showPage(0);
				activateIcon(0);
			}
			
			function setMenuEvents(){				
				for (let i=0; i < menu.length; i++){
					menu[i].addEventListener('click', function(){
						if (pageChosen!=i){
							hidePage(pageChosen);
							showPage(i); 
							deactivateIcon(pageChosen)
							activateIcon(i);
							pageChosen = i;
						}
					}); 
				}
			}
			
			function showPage(number){
				pages[number].classList.toggle('visible',true);
			}
			
			function hidePage(number){
				pages[number].classList.toggle('visible',false);
			}
			
			function activateIcon(number){
				menu[number].classList.toggle('active',true);
				menu[number].classList.toggle('inactive',false);
			}
			
			function deactivateIcon(number){
				menu[number].classList.toggle('active',false);
				menu[number].classList.toggle('inactive',true);
			}