import _ from "lodash";
import DraftData from './data/s43draft.js';

class Main {
    static async Run() {
        const App = new Main();
        await App.startService();
    }

    postStartingMessage() {
        console.log('Lemon AI Online 🍋🍋🍋');
    }

	parseISFLTeam(_team) {
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
		}
	}

	parseDSFLTeam(_team) {
		switch(_team) {
			case 'Kansas City Coyotes': return 'KCC';
			case 'London Royals': return 'LON';
			case 'Minnesota Grey Ducks': return 'MIN';
			case 'Portland Pythons': return 'POR';
			case 'Bondi Beach Buccaneers': return 'BBB';
			case 'Dallas Birddogs': return 'DAL';
			case 'Norfolk SeaWolves': return 'NOR';
			case 'Tijuana Luchadores': return 'TIJ';
		}
	}

	parsePosition(_position) {
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
		}
	}

	parsePlayer(_player) {

	}

    async startService() {
        this.postStartingMessage();

        const teams = 14;

        let players = DraftData;

        for (let x = 0; x < players.length ; x++) {
			const player = players[x];
			console.log(`{{NSFLDraft-row |draftyear={{nsfly|43|nolink}} |round=${x%teams + 1} |picknum=${x+1} |team={{tfnl|${this.parseISFLTeam(player.ISFL)}}} |first=${player.Player.substring(0, player.Player.indexOf(' '))} |last=${player.Player.substring(player.Player.indexOf(' ') + 1)} |dab= | position=${this.parsePosition(player["OG Position"])} |dsfl={{tf|${this.parseDSFLTeam(player.DSFL)}}} |  collegeyear={{nsfly|37|nolink}} |college= |collegeteam= |collegelink= |probowl= |hof= |note=${player["GM Pick"] ? 'GM Pick' : ''} |cfb page exists=no}}`)
            // console.log(`Pick ${x + 1} is in!`);
        }
    }
}

Main.Run();