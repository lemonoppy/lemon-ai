function parsePosition(_position) {
	switch(_position) {
		case 'Cornerback': return 'CB';
		case 'Defensive End': return 'DE';
		case 'Defensive Tackle': return 'DT';
		case 'Offensive Line': return 'OL';
		case 'Linebacker': return 'LB';
		case 'Quarterback': return 'QB';
		case 'Running Back': return 'RB';
		case 'Safety': return 'S';
		case 'Tight End': return 'TE';
		case 'Wide Receiver': return 'WR';
		case 'Kicker': return 'KP';
		default: return _position;
	}
}

function parseISFLTeam(_team) {
	switch(_team) {
		case 'Arizona Outlaws': return 'ARI';
		case 'Austin Copperheads': return 'AUS';
		case 'Baltimore Hawks':	return 'BAL';
		case 'Berlin Fire Salamanders':	return 'BER';
		case 'Cape Town Crash':	return 'CTC';
		case 'Chicago Butchers': return 'CHI';
		case 'Colorado Yeti': return 'COL';
		case 'Honolulu Hahaluha': return 'HON';
		case 'New Orleans Second Line': return 'NOLA';
		case 'New York Silverbacks': return 'NYS';
		case 'Orange County Otters': return 'OCO';
		case 'San Jose Sabercats': return 'SJS';
		case 'Sarasota Sailfish': return 'SAR';
		case 'Yellowknife Wraiths': return 'YKW';
		default: return _team;
	}
}

function parseDSFLTeam(_team) {
	switch(_team) {
		case 'KC':
		case 'Kansas City Coyotes': return 'KCC';
		case 'London Royals': return 'LON';
		case 'Minnesota Grey Ducks': return 'MIN';
		case 'Portland Pythons': return 'POR';
		case 'BB':
		case 'Bondi Beach Buccaneers': return 'BBB';
		case 'DAL':
		case 'Dallas Birddogs': return 'DBD';
		case 'Norfolk SeaWolves': return 'NOR';
		case 'Tijuana Luchadores': return 'TIJ';
		default: return _team;
	}
}

function getNthSuffix(_number) {
	switch(_number % 10) {
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
}

function getUnit(_position) {
	switch(_position) {
		case 'CB':
		case 'DE':
		case 'DT':
		case 'LB':
		case 'S': return 'Defense';
		case 'QB': 
		case 'OL':
		case 'RB':
		case 'TE':
		case 'WR': return 'Offense';
		default: return 'Special';
	}
}

function multipleTeamLinkBuilder(_teams) {
	let outputString = '';
	_teams.forEach(team => {
		outputString += `{{tf|${team}}} `
	});

	return outputString;
}

// Relying on sorted data
// Pretty sure this check is slightly inefficient
function getMapKeyValueByIndex(_map, _index = 0) {
	if (_index === 'last')
		return [[..._map][_map.size-1][0], [..._map][_map.size-1][1]];		
	return [[..._map][_index][0], [..._map][_index][1]];
}

function parseName(_name) {
	return [_name.substring(0, _name.indexOf(' ')), _name.substring(_name.indexOf(' ') + 1)]
}

function buildPipedRow(_row, _divider = '||', _prefix = '') {
	let outputString = '';
	_row.forEach(element => {
		outputString += `${_prefix} ${element} ${_divider} `;
	})

	return outputString;
}

export { parsePosition, parseDSFLTeam, parseISFLTeam, getNthSuffix, getUnit, multipleTeamLinkBuilder, getMapKeyValueByIndex, parseName, buildPipedRow }