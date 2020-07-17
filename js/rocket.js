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