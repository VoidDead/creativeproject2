document.getElementById("dndSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  value = document.getElementById("dndInput").value;
  const valueType = document.getElementById("dndType").value;
  if (value === "")
    return;
  
  const originalValue = value;
  value = value.toLowerCase();
  console.log(value);
  
  if (valueType === "spells/") {
	value = value.replace(/\s/g , "-");
	const url = "https://www.dnd5eapi.co/api/" + valueType + value;
	fetch(url)
		.then(function(response) {
		return response.json();
		}).then(function(json) {
		let givenResults = "";
		givenResults += "<h2>" + json.name + "</h2>";
		givenResults += "<p>" + json.desc + "</p>";
		if (typeof json.higher_level !== 'undefined') {
			givenResults += "<p>" + json.higher_level[0] + "</p>";
		}
		givenResults += "<table>";
		givenResults += "<tr>";
		let tableColumns = 0;
		if (typeof json.damage !== 'undefined') {
			givenResults += "<th>" + "Damage Type" + "</th>";
			++tableColumns;
		}
		if (typeof json.duration !== 'undefined') {
			givenResults += "<th>" + "Duration" + "</th>";
			++tableColumns;
		}
		if (typeof json.range !== 'undefined') {
			givenResults += "<th>" + "Range" + "</th>";
			++tableColumns;
		}
		if (typeof json.school !== 'undefined') {
			givenResults += "<th>" + "School" + "</th>";
			++tableColumns;
		}
		if (typeof json.material !== 'undefined') {
			givenResults += "<th>" + "Materials" + "</th>";
			++tableColumns;
		}
		givenResults += "</tr>";
		givenResults += "<tr>";
		if (typeof json.damage !== 'undefined') {
			givenResults += "<td>" + json.damage.damage_type.name + "</td>";
		}
		if (typeof json.duration !== 'undefined') {
			givenResults += "<td>" + json.duration + "</td>";
		}
		if (typeof json.range !== 'undefined') {
			givenResults += "<td>" + json.range + "</td>";
		}
		if (typeof json.school !== 'undefined') {
			givenResults += "<td>" + json.school.name + "</td>";
		}
		if (typeof json.material !== 'undefined') {
			givenResults += "<td>" + json.material + "</td>";
		}
		givenResults += "</tr>";
		givenResults += "</table>";
		givenResults += "<table>";
		givenResults += "<tr>";
		if (typeof json.damage !== 'undefined' && typeof json.damage.damage_at_slot_level !== 'undefined') {
			givenResults += "<th>" + "Slot Level" + "</th>";
			givenResults += "<th>" + "Damage" + "</th>";
			givenResults += "</tr>";
			for (var key in json.damage.damage_at_slot_level)
			{
				givenResults += "<tr>";
				givenResults += "<td>";
				givenResults += key;
				givenResults += "</td>";
				givenResults += "<td>";
				givenResults += json.damage.damage_at_slot_level[key];
				givenResults += "</td>";
				givenResults += "</tr>";
			}
		}
		givenResults += "</table>";
		
		document.getElementById("dndResults").innerHTML = givenResults;
		});
  }
  else if (valueType == "ability-scores/") {
	value = value.substring(0, 3);
	const url = "https://www.dnd5eapi.co/api/" + valueType + value;
	fetch(url)
		.then(function(response) {
		return response.json();
		}).then(function(json) {
		let givenResults = "";
		givenResults += "<h2>" + json.full_name + "</h2>";
		givenResults += "<p>" + json.desc + "</p>";
		
		if (json.skills.length > 0)
		{
			givenResults += "<p>Relevant Skills: ";
		}
		for (i = 0; i < json.skills.length - 1; ++i)
		{
			givenResults += json.skills[i].name + ", ";
		}
		givenResults += json.skills[json.skills.length - 1].name;
		givenResults += "</p>";
		
		document.getElementById("dndResults").innerHTML = givenResults;
		});
  }
  else if (valueType == "skills/") {
	const url = "https://www.dnd5eapi.co/api/" + valueType + value;
	fetch(url)
		.then(function(response) {
		return response.json();
		}).then(function(json) {
		let givenResults = "";
		givenResults += "<h2>" + json.name + "</h2>";
		givenResults += "<p>" + json.desc + "</p>";
		
		const url2 = "https://www.dnd5eapi.co/api/" + "ability-scores/" + json.ability_score.index;
		fetch(url2)
			.then(function(response) {
			return response.json();
			}).then(function(json2) {
			givenResults += "<p>Reliant On: " + json2.full_name + "</p>";
			
			document.getElementById("dndResults").innerHTML = givenResults;
			});
		});
  }
  else if (valueType == "spells?level=") {
	const url = "https://www.dnd5eapi.co/api/" + valueType + value;
	fetch(url)
		.then(function(response) {
		return response.json();
		}).then(function(json) {
		let givenResults = "";
		if (value.includes(",")) {
			givenResults += "<h2>" + "Spells for Levels " + value + "</h2>";
		}
		else {
			givenResults += "<h2>" + "Spells for Level " + value + "</h2>";
		}
		givenResults += "<p>";
		if (!(json.count <= 0)) {
			for (i = 0; i < json.count - 1; ++i)
			{
				givenResults += json.results[i].name + ", ";
			}
			givenResults += json.results[json.count - 1].name;
		}
		else {
			if (value.includes(",")) {
				givenResults += "There are no spells for these levels!";
			}
			else {
				givenResults += "There are no spells for this level!";
			}
		}
		givenResults += "</p>";
		
		document.getElementById("dndResults").innerHTML = givenResults;
		});
  }
  else if (valueType == "spells?school=") {
	const url = "https://www.dnd5eapi.co/api/" + valueType + value;
	fetch(url)
		.then(function(response) {
		return response.json();
		}).then(function(json) {
		let givenResults = "";
		if (value.includes(",")) {
			givenResults += "<h2>" + "Spells for the Schools  of " + originalValue + "</h2>";
		}
		else {
			givenResults += "<h2>" + "Spells for the School of " + originalValue + "</h2>";
		}
		givenResults += "<p>";
		if (json.count > 0) {
			for (i = 0; i < json.count - 1; ++i)
			{
				console.log(json.results[i].name);
				givenResults += json.results[i].name + ", ";
			}
			givenResults += json.results[json.count - 1].name;
		}
		else {
			if (value.includes(",")) {
				givenResults += "There are no spells for these schools!";
			}
			else {
				givenResults += "There are no spells for this school!";
			}
		}
		givenResults += "</p>";
		
		document.getElementById("dndResults").innerHTML = givenResults;
		});
  }
});

function setTypeExplanation() {
	let givenResults = "";
	const valueType = document.getElementById("dndType").value;
	
	givenResults += "<p>";
	if (valueType === 'spells/')
	{
		givenResults += "Enter the name of a D&D spell.</p>";
		givenResults += "<p>Examples: Acid Arrow, Fireball, Fire Bolt, Fly, Sanctuary";
	}
	else if (valueType === 'skills/')
	{
		givenResults += "Enter the name of a D&D skill.</p>";
		givenResults += "<p>Examples: Investigation, Arcana, Athletics, Performance";
	}
	else if (valueType === 'ability-scores/')
	{
		givenResults += "Enter the name of a D&D ability score.</p>";
		givenResults += "<p>Examples: Intelligence, Strength, Charisma, Wisdom, Dexterity";
	}
	else if (valueType === 'spells?level=')
	{
		givenResults += "Enter a level for a list of spells that use a spell slot of that level at minimum.</p>";
		givenResults += '<p>Example Input: "2", "4, 6, 10", "9,3,7"';
	}
	else if (valueType === 'spells?school=')
	{
		givenResults += "Enter a school for a list of spells in that school.</p>";
		givenResults += '<p>Example Input: "Evocation", "Evocation, Illusion", "Necromancy"';
	}
	givenResults += "</p>";
	
	document.getElementById("selectExplanation").innerHTML = givenResults;
};

setTypeExplanation();
document.getElementById("dndType").addEventListener("input", setTypeExplanation);