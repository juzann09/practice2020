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

