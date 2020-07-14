			class Rocket{
				constructor(){	
				}
				setParams(rocketElement){
					let name = rocketElement.querySelector('[name="name"]').innerHTML;
					let teamNumber = rocketElement.querySelector('[name="teamNumber"]').innerHTML;
					let speed = rocketElement.querySelector('[name="speed"]').innerHTML;
					let icon = rocketElement.querySelector('[name="icon"]').src;
					this.teamNumber = teamNumber;
					this.speed = speed;
					this.name = name;
					this.icon = icon;
				}
				name;
				speed;
				teamNumber;
				icon;
				//launch(){}
			}
			
			class RocketCurrent extends Rocket{
				setParams(rocket){
					this.name=rocket.name;
					this.speed=rocket.speed;
					this.teamNumber=rocket.teamNumber;
					this.icon=rocket.icon;
					this.writeIntoHTML();
				}
				writeIntoHTML(){
					let rocketCurrentBlock = document.querySelector(".rocketCurrent .infoBlock");
					this.info = rocketCurrentBlock.querySelector('ul');
					this.info.querySelector('[name="name"]').innerHTML = this.name;
					this.info.querySelector('[name="speed"]').innerHTML = this.speed;
					this.info.querySelector('[name="teamNumber"]').innerHTML = this.teamNumber;
					//this.info.querySelector('[name="icon"]').innerHTML = this._name;
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
				rocketCurrent = new RocketCurrent();
				rocketElements = document.querySelectorAll(".rocketCards .infoBlockContent");
				rocketRadios = document.getElementsByClassName("radioRocketChoice");
				for (let i=0; i < rocketRadios.length; i++){
					rocketRadios[i].addEventListener('click', function(){
						let newRocket = new Rocket();
						newRocket.setParams(rocketElements[i]);
						rocketCurrent.setParams(newRocket);
					});
				}
				let rocketLaunchButton = document.querySelector(".rocketCurrent .button");
				rocketLaunchButton.addEventListener('click', function(){
					rocketCurrent.launch();
				});
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