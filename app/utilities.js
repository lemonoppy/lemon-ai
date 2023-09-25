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

export { parsePosition, parseDSFLTeam, parseISFLTeam }