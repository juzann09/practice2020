			class Rocket{
				constructor(name,speed,teamNumber,icon){
					this.teamNumber = teamNumber;
					this.speed = speed;
					this.name = name;
					this.icon = icon;
				}
				
				stringCard(cardsBlock,i){
					let str = `<section class="infoBlock">`;
					str = str+ stringRocket(this);
					str =str + `<div class="choose">
								<input type="radio" class="radioRocketChoice" id="r${i}" name="rocketRadio">
								<label for="r${i}">Выбрать</label>
							</div>
							</section>`;
					return str;
					
				}
				stringCurent(rocketCurrentBlock){
					return rocketCurrentBlock.innerHTML=stringRocket(this);
				}
				launch(){
					console.log('fly');
				}
			}
			
			class TeamMember{
				constructor(name, role, icon){
					this.name=name;
					this.role=role;
					this.icon=icon;
					/* id = role-name */
					this.id=`${this.role}-${this.name}`;
					personID+=1;
				}
				
				stringRoleBlock(role,memberIndex){
					/* checkbox.id = role-name-index */
					/* memberIndex - index of person in heis/her role list, 
					each role list starts with 0-index*/
					return `<li class="person">
						${this.stringIcon()}
						${this.stringName()}
						<input type="checkbox" id="${this.id}-${memberIndex}">
						</li>`
				}
				
				stringName(){
					return `<div>${this.name}</div>`;
				}
				
				stringIcon(){
					return `<img class="personIcon" name="icon" src="${this.icon}">`;
				}
			}
			
			class Weather{
				constructor(locationPlace,temperature,humidity,wind){
					this.locationPlace=locationPlace;
					this.temperature=temperature;
					this.humidity=humidity ;
					this.wind=wind;
				}
				stringLocationOutput(){
					return `<ul>
								<li class="property">
									<div>Локация</div>
									<div class="location">${this.locationPlace}</div>
								</li>`;
				}
				stringWeatherBlock(output){
					let stringLocation;
					if (!output) stringLocation = '';
					else stringLocation = this.stringLocationOutput();
					let str =`${stringLocation}
							<li class="property">
								<div>Температура</div>
								<div class="temperature">${this.temperature} &#8451 </div>
							</li>
							<li class="property">
								<div>Влажность</div>
								<div class="humidity">${this.humidity}%</div>
							</li>
							<li class="property">
								<div>Ветер</div>
								<div class="wind">${this.wind} м/с</div>
							</li>`;
					if (output) str = str + `</ul>`;
					return str;
				}
			}
			
			/* variables */
			document.addEventListener("DOMContentLoaded", start);
			
			let pageChosen = 3;
			let pages;
			let menu;
			
			let rockets;
			let rocketElements;
			let rocketForBuilding;
			let rocketRadios;
			let rocketCurrent;

			let teamChosenIcons = new Map();
			let teamCards;
			let teamChosen = new Set();
			let teamAvaliable = new Map();
			let captains = [];
			let doctors = [];
			let engineers = [];
			let spaceMarines = [];
			let teamNumberChosen = 0;
			let teamNumberNeeded = -1;
			let personID = 0;
			let roles = new Map();
			roles.set('captain','Капитан');
			roles.set('doctor','Врач');
			roles.set('engineer','Инженер');
			roles.set('spaceMarine','Десантник');
			
			let prevLocation='';
			let getWeatherBlock;
			let setWeatherBlock;
			let weatherProperties;
			let locationInput;
			let locationPlace;
			let weather;
			let apiKey='27d68cb21ee3b5093c00da1a66e73421';
			
			/* functions */
			
			function setLocationEvents(){
				getWeatherBlock = document.querySelector("#weatherCheck .infoBlockContent");
				setWeatherBlock = document.querySelector("#home .weather .infoBlockContent");
				locationInput = getWeatherBlock.querySelector('input');
				locationInput.addEventListener('change', getNewWeather);
				weatherProperties=getWeatherBlock.querySelector('ul>div');
			}
			
			async function getNewWeather(){
				locationPlace=locationInput.value;
				weather=await getWeather();
				setWeather();	
			}
			
			async function getWeather(){
				let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationPlace}&units=metric&appid=${apiKey}`);
				if (response.ok){
					let json = await response.json();
					console.log('response ok');
					let wind = json.wind.speed;
					let humidity = json.main.humidity;
					let temperature = json.main.temp;
					let newWeather = new Weather(locationPlace,temperature,humidity,wind);
					prevLocation=locationPlace;
					return newWeather;
				} 
				else{
					locationPlace=prevLocation;
					locationInput.value=prevLocation;
					alert("Локация не найдена!");
				}
			}

			function setWeather(){
				console.log(getWeatherBlock);
				setWeatherBlock.innerHTML=weather.stringWeatherBlock(true);
				weatherProperties.innerHTML=weather.stringWeatherBlock(false);
			}
			
			/* creates avaliavle team members */
			function setAvaliableTeamMembers(){
				captains.push(new TeamMember("Константин1 Константинопольский", "captain", "svg/man1.svg"));
				captains.push(new TeamMember("Константин2 Константинопольский", "captain", "svg/woman1.svg"));
				doctors.push(new TeamMember("Константин3 Константинопольский", "doctor", "svg/man2.svg"));
				doctors.push(new TeamMember("Константин4 Константинопольский", "doctor", "svg/woman2.svg"));
				engineers.push(new TeamMember("Константин5 Константинопольский", "engineer", "svg/man1.svg"));
				engineers.push(new TeamMember("Константин6 Константинопольский", "engineer", "svg/woman3.svg"));
				spaceMarines.push(new TeamMember("Константин7 Константинопольский", "spaceMarine", "svg/man2.svg"));
				spaceMarines.push(new TeamMember("Константин8 Константинопольский", "spaceMarine", "svg/woman1.svg"));
				teamAvaliable.set("doctor", doctors);
				teamAvaliable.set("captain", captains);
				teamAvaliable.set("engineer", engineers);
				teamAvaliable.set("spaceMarine", spaceMarines);
			}
			
			/* writes team cards into html code */
			function writeTeamCardsIntoHTML(){
				let teamCardsBlock = document.querySelector(".teams.cards");
				let teamCards = new Map();
				teamCards.set("captain",teamCardsBlock.querySelector('.infoBlock.captain .infoBlockContent ul'));
				teamCards.set("doctor",teamCardsBlock.querySelector('.infoBlock.doctor .infoBlockContent ul'));
				teamCards.set("engineer",teamCardsBlock.querySelector('.infoBlock.engineer .infoBlockContent ul'));
				teamCards.set("spaceMarine",teamCardsBlock.querySelector('.infoBlock.spaceMarine .infoBlockContent ul'));
				
				for (let roleAvaliableMembers of teamAvaliable){
					let memberIndex = 0;
					let role = roleAvaliableMembers[0];
					let teamCard = teamCards.get(role);
					// roleAvaliableMembers[1] - list of avaliable persons on this role
					for (let member of roleAvaliableMembers[1]) {
						teamCard.innerHTML+=member.stringRoleBlock(role,memberIndex);
						memberIndex+=1;
					}
				}
			}
			
			/* adds events for team choice checkboxes */
			function setPersonChoiceEvents(){
				let teamChosenIconsBlock = document.querySelector('.chosenRocketAndTeam .team');
				//console.log(teamChosenIconsBlock);
				teamChosenIcons.set("captain",teamChosenIconsBlock.querySelector('.captain+ul'));
				teamChosenIcons.set("doctor",teamChosenIconsBlock.querySelector('.doctor+ul'));
				teamChosenIcons.set("engineer",teamChosenIconsBlock.querySelector('.engineer+ul'));
				teamChosenIcons.set("spaceMarine",teamChosenIconsBlock.querySelector('.spaceMarine+ul'));
				let checkboxesPersons = document.querySelectorAll('.teams.cards input[type="checkbox"]');
				for (let checkbox1 of checkboxesPersons){
					checkbox1.addEventListener("click", () => chooseMember(checkbox1));
				}
				let saveTeamButton = document.querySelector('.chosenRocketAndTeam .button.enabled');
				saveTeamButton.addEventListener("click", () => saveTeam());
			}
			
			/* deletes member from chosen team */
			function deleteFromTeamChosen(personID){
				for (let memChosen of teamChosen){
					//console.log(`${personID} : ${memChosen.id}`);
					if (personID == memChosen.id)
						teamChosen.delete(memChosen);
				}
			}
			
			/* adds member to chosen team */
			function chooseMember(checkbox){
				let personID = `${checkbox.id.split('-')[0]}-${checkbox.id.split('-')[1]}`;
				let personRole = personID.split('-')[0];
				let personIndex = parseInt(checkbox.id.split('-')[2]);
				if (checkbox.checked) {
					teamNumberChosen +=1;
					teamChosen.add(teamAvaliable.get(personRole)[personIndex]);
					console.log('member added');
				}
				else  {
					teamNumberChosen -=1;
					deleteFromTeamChosen(personID);
					console.log('member deleted');
				}
				//console.log(teamChosen);
				console.log('Chosen team:');
				let teamStr = getStringTeam(teamChosen);
				console.log(teamStr);
			}
			
			function clearChosenTeamIcons(){
				for (role of teamChosenIcons.keys()){
					teamChosenIcons.get(role).innerHTML='';
				}
			}
			
			function addMemberIntoChosenTeamBlock(member){
				teamChosenIcons.get(member.role).innerHTML+=member.stringIcon();
			}
			
			/* saves chosen team */
			function saveTeam(){
				if (teamNumberChosen==teamNumberNeeded){
					console.log('team saved');
					clearChosenTeamIcons();
					for (let memChosen of teamChosen){
						addMemberIntoChosenTeamBlock(memChosen);	
					}
				}
				else console.log('wrong team number');
			}
			
			/* returns string with info about chosen team members */
			function getStringTeam(team){
				let str = "";
				//console.log(team);
				for (let mem of team){
					str += mem.role + ', ' + mem.name + '\n';
				}
				return str;
			}
			
			/* returns string with html-code for rocket block */
			function stringRocket(rocket){
				return `<div class="rocketInfo infoBlockContent"">
							<img class="rocketIcon" name="icon" src="${rocket.icon}">
							<ul>
								<li class="property" >
									<div>Имя</div>
									<div name="name">${rocket.name}</div>
								</li>
								<li class="property">
									<div>Скорость</div>
									<div name="speed">${rocket.speed}</div>
								</li>
								<li class="property">
									<div>Экипаж</div>
									<div name="teamNumber">${rocket.teamNumber}</div>
								</li>	
							</ul>
						</div>`;
			}
			
			/* adds events for rocket choice radios */
			function setRocketEvents(){
				rockets = [];
				rockets.push(new Rocket("rocket1", "3 km/s", 4, "svg/alienShip.svg"));
				rockets.push(new Rocket("rocket2", "3 km/s", 4, "svg/rocket1.svg"));
				rockets.push(new Rocket("rocket3", "3 km/s", 4, "svg/rocket2.svg"));
				
				rocketCards = document.querySelector("#rocketCards");
				//rocketCards.innerHTML = "0000000000000000000000";
				rocketCards.innerHTML="";
				
				for (let i=0; i<rockets.length; i++){
					rocketCards.innerHTML+=rockets[i].stringCard(rocketCards,i+1);
					//console.log(rockets[i]);
				}
				rocketForBuilding = rockets[0];
				rocketRadios = document.getElementsByClassName("radioRocketChoice");
				chooseRocket(rockets[0]);
				buildRocket();
				rocketRadios[0].checked="checked";
				for (let i=0; i < rocketRadios.length; i++){
					rocketRadios[i].addEventListener('click',() => chooseRocket(rockets[i]));
				}
				let rocketLaunchButton = document.querySelector("#rocketChoice .current .button");
				rocketLaunchButton.addEventListener('click', buildRocket);
			}
			
			/* creates rocket with chosen params and writes it into html */
			function buildRocket(){
				let rocketCurrentBlock = document.querySelector("#rocketChoice .current>:nth-child(2)");
				rocketCurrent = new Rocket(rocketForBuilding.name, rocketForBuilding.speed, rocketForBuilding.teamNumber, rocketForBuilding.icon);
				rocketCurrentBlock.innerHTML=rocketCurrent.stringCurent(rocketCurrentBlock);
				teamNumberNeeded = rocketCurrent.teamNumber;
				console.log("rocket built");
			}
			
			/* sets params for rocket building */
			function chooseRocket(rocket){
				rocketForBuilding = rocket;
				console.log("params for building are ready");
			}
			
			/* writes current rocket into html-code of team choice page */
			function setRocketOnTeamPage(){
				let rocketCurrentBlockTeamPage = document.querySelector("#teamChoice .rocket.current>:nth-child(2)");
				rocketCurrentBlockTeamPage.innerHTML=rocketCurrent.stringCurent(rocketCurrentBlockTeamPage);
			}
			
			/* sets menu evemts */
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
			
			function start(){
				pages = document.getElementsByClassName("page");
				menu = document.getElementsByClassName("menuItem");
				setMenuEvents();
				showPage(pageChosen);
				activateIcon(pageChosen);
				setRocketEvents();
				setAvaliableTeamMembers();
				writeTeamCardsIntoHTML();
				setPersonChoiceEvents();
				setRocketOnTeamPage();
				setLocationEvents();
			}	