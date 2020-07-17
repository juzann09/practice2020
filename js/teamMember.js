class TeamMember{
constructor(name, role, icon){
	this.name=name;
	this.role=role;
	this.icon=icon;
	/* id = role-name */
	this.id=`${this.role}-${this.name}`;
	personID+=1;
}

stringNoIcon(){
	return `<li>
				<div class = ${this.role}>
					${roles.get(this.role)}
				</div>
				<div>
					${this.name}
				</div>
			</li>`
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
			