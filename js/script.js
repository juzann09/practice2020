			class Rocket{
				constructor(){	
				}
				setParams(rocketElement){
					let name = rocketElement.querySelector('[name="name"]').innerHTML;
					let teamNumber = rocketElement.querySelector('[name="teamNumber"]').innerHTML;
					let speed = rocketElement.querySelector('[name="speed"]').innerHTML;
					let icon = rocketElement.querySelector('[name="icon"]').getAttribute("src");
					
					this.teamNumber = teamNumber;
					this.speed = speed;
					this.name = name;
					this.icon = icon;
					//console.log(this.icon);
					//this.writeIntoHTML();
				}
				writeIntoHTML(){
					let rocketCurrentBlock = document.querySelector(".rocketCurrent");
					//console.log(rocketCurrentBlock);
					//this.info = rocketCurrentBlock.querySelector('ul');
					rocketCurrentBlock.querySelector('[name="name"]').innerHTML = this.name;
					rocketCurrentBlock.querySelector('[name="speed"]').innerHTML = this.speed;
					rocketCurrentBlock.querySelector('[name="teamNumber"]').innerHTML = this.teamNumber;
					rocketCurrentBlock.querySelector('[name="icon"]').setAttribute("src", this.icon);
					console.log("rocket built");
				}
				launch(){
					console.log('fly');
				}
			}

			document.addEventListener("DOMContentLoaded", start);
			
			let pageChosen;
			let pages;
			let menu;
			
			let rocketElements;
			let rocketRadios;
			let rocketCurrent;
			
			function setRocketEvents(){
				rocketElements = document.querySelectorAll(".rocketCards .infoBlockContent");
				rocketRadios = document.getElementsByClassName("radioRocketChoice");
				chooseRocket(rocketElements[0]);
				rocketRadios[0].checked="checked";
				for (let i=0; i < rocketRadios.length; i++){
					rocketRadios[i].addEventListener('click', function(){
						 chooseRocket(rocketElements[i]);
					});
				}
				let rocketLaunchButton = document.querySelector(".rocketCurrent .button");
				rocketLaunchButton.addEventListener('click', function(){
					rocketCurrent.writeIntoHTML();
				});
			}
			
			function chooseRocket(rocketElement){
				rocketCurrent = new Rocket();
				rocketCurrent.setParams(rocketElement);
			}
			function start(){
				pageChosen = 1;
				pages = document.getElementsByClassName("page");
				menu = document.getElementsByClassName("menuItem");
				setMenuEvents();
				showPage(pageChosen);
				activateIcon(pageChosen);
				setRocketEvents();
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