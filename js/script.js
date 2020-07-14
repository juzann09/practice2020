			class Rocket{
				constructor(name, speed, teamNumber, icon){
					this.teamNumber = teamNumber;
					this.speed = speed;
					this.name = name;
					this.icon = icon;
				}
				
				choose(){
					//document.form.rocketName="rn";
					console.log(this);
				}
				launch(){}
			}
			
			class RocketCurrent{
				constructor(){
					let rocketCurrentBlock = document.querySelector(".rocketCurrent .infoBlock");
					this.info = rocketCurrentBlock.querySelector('ul');
					this.head = rocketCurrentBlock.querySelector('.headline');	
				}
				func(){
					alert('rocket form found!');
				}
			}

			document.addEventListener("DOMContentLoaded", start);
			
			let pageChosen=1;
			let pages = document.getElementsByClassName("page");
			let menu = document.getElementsByClassName("menuItem");
			
			

			
			
			function setRocketRadiosEvents(){
				let rocketElements = document.querySelectorAll(".rocketCards .infoBlockContent");
				let rocketRadios = document.getElementsByClassName("radioRocketChoice");
				for (let i=0; i < rocketElements.length; i++){
					console.log(i);
				}
				console.log('end');
				for (let i=0; i < rocketRadios.length; i++){
					rocketRadios[i].addEventListener('click', function(){
						let name = rocketElements[i].querySelector('div [name="name"]').innerHTML;
						let teamNumber = rocketElements[i].querySelector('[name="teamNumber"]').innerHTML;
						let speed = rocketElements[i].querySelector('[name="speed"]').innerHTML;
						let icon = rocketElements[i].querySelector('[name="icon"]').src;
						let newRocket = new Rocket(name, speed, teamNumber, icon);
						newRocket.choose();
					});
				}
			}
			
			function start(){
				setMenuEvents();
				showPage(1);
				activateIcon(1);
				//let rocketCurrent1 = new rocketCurrent();
				//rocketCurrent1.func();
				setRocketRadiosEvents();
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