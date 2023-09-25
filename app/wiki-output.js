import _ from "lodash";
import { parseDSFLTeam, parseISFLTeam, parsePosition } from './utilities.js';
import DraftData from './data/s43draft.js';

class Main {
    static async Run() {
        const App = new Main();
        await App.startService();
    }

    postStartingMessage() {
        console.log('Lemon AI Online 🍋🍋🍋');
    }

	getPlayerString(_player, _draftPosition, _teamCount) {
		return `{{NSFLDraft-row |draftyear={{nsfly|43|nolink}} |round=${Math.floor(_draftPosition/_teamCount) + 1} |picknum=${_draftPosition+1} |team={{tfnl|${parseISFLTeam(_player.ISFL)}}} |first=${_player.Player.substring(0, _player.Player.indexOf(' '))} |last=${_player.Player.substring(_player.Player.indexOf(' ') + 1)} |dab= | position=${parsePosition(_player["OG Position"])} |dsfl={{tf|${parseDSFLTeam(_player.DSFL)}}} |  collegeyear={{nsfly|37|nolink}} |college= |collegeteam= |collegelink= |probowl= |hof= |note=${_player["GM Pick"] ? 'GM Pick' : ''} |cfb page exists=no}}`
	}

    async startService() {
        this.postStartingMessage();

        const teams = 14;

        let players = DraftData;

        for (let x = 0; x < players.length ; x++) {
			const player = players[x];
			console.log(this.getPlayerString(player, x, teams));
		}
    }
}

Main.Run();