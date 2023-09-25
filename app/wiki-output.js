import _ from "lodash";
import { parseDSFLTeam, parseISFLTeam, parsePosition, getMapKeyValueByIndex } from './utilities.js';
import STRINGS from "./wiki-output.strings.js";
import DraftData from './data/s43dsfl.js';

const ISFL_TEAMS = 14;
const DSFL_TEAMS = 8;

class Main {
    static async Run() {
        const App = new Main();
        await App.startService();
    }

    postStartingMessage() {
        console.log('Lemon AI Online 🍋🍋🍋');
    }

	getInfoBoxString(_league, _season, _first, _firstPosition, _firstTeam, _last, _lastPosition, _lastTeam, _mostPicks, _mostPicksCount, _fewestPicks, _fewestPicksCount, _totalPlayers) {
		if (_league === 'DSFL') {
			return STRINGS.INFOBOX_DSFL(_season, _first, _firstPosition, _firstTeam, _last, _lastPosition, _lastTeam, _mostPicks, _mostPicksCount, _fewestPicks, _fewestPicksCount, _totalPlayers);
		}

		return STRINGS.INFOBOX_DSFL(_season, _first, _firstPosition, _firstTeam, _last, _lastPosition, _lastTeam, _mostPicks, _mostPicksCount, _fewestPicks, _fewestPicksCount, _totalPlayers);
	}

	getIntroString(_season, _league) {
		if (_league === 'DSFL') {
			return STRINGS.INTRO_DSFL(_season);
		}

		return STRINGS.INTRO_ISFL(_season);		
	}

	getPlayerString(_player, _draftPosition, _teamCount) {
		return `{{NSFLDraft-row |draftyear={{nsfly|43|nolink}} |round=${Math.floor(_draftPosition/_teamCount) + 1} |picknum=${_draftPosition+1} |team={{tfnl|${parseISFLTeam(_player.ISFL)}}} |first=${_player.Player.substring(0, _player.Player.indexOf(' '))} |last=${_player.Player.substring(_player.Player.indexOf(' ') + 1)} |dab= | position=${parsePosition(_player["OG Position"])} |dsfl={{tf|${parseDSFLTeam(_player.DSFL)}}} |  collegeyear={{nsfly|37|nolink}} |college= |collegeteam= |collegelink= |probowl= |hof= |note=${_player["GM Pick"] ? 'GM Pick' : ''} |cfb page exists=no}}`
	}

	async buildDraftCountData(_teams) {
		let DRAFT_COUNT_MAP = new Map();

		_.toPairs(_teams).forEach((team) => {
			const teamName = team[0];
			const picks = team[1];

			if (!DRAFT_COUNT_MAP.get(picks)) {
				DRAFT_COUNT_MAP.set(picks, []);
			}
			DRAFT_COUNT_MAP.get(picks).push(teamName);
		})

		// Sort ascending by number of picks
		return new Map([...DRAFT_COUNT_MAP.entries()].sort((a, b) => a[0] - b[0]));
	}

    async startService() {
        this.postStartingMessage();
		const { info: { season, league }, draft } = DraftData;

		let DSFL_TEAMS = {
			KCC: 0,
			LON: 0,
			MIN: 0,
			POR: 0,
			BBB: 0,
			DBD: 0,
			NOR: 0,
			TIJ: 0,
		};

        for (let x = 0; x < draft.length ; x++) {
			const player = draft[x];

			DSFL_TEAMS[parseDSFLTeam(player.Team)] += 1;
			// console.log(this.getPlayerString(draft, x, DSFL_TEAMS));
		}

		const DRAFT_COUNT_MAP = await this.buildDraftCountData(DSFL_TEAMS);

		// console.log(this.getIntroString(season, league));
		console.log(this.getInfoBoxString(
			league, season, 
			draft[0].Name, draft[0].Position, parseDSFLTeam(draft[0].Team), 
			draft[draft.length - 1].Name, draft[draft.length - 1].Position, parseDSFLTeam(draft[draft.length - 1].Team), 
			getMapKeyValueByIndex(DRAFT_COUNT_MAP, 'last')[1], getMapKeyValueByIndex(DRAFT_COUNT_MAP, 'last')[0], 
			getMapKeyValueByIndex(DRAFT_COUNT_MAP)[1], getMapKeyValueByIndex(DRAFT_COUNT_MAP)[0], 
			draft.length)
		);




		// console.log(Array.from(DRAFT_COUNT_MAP))
    }
}

Main.Run();