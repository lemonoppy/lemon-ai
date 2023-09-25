import _ from "lodash";
import { parseDSFLTeam, parseISFLTeam, parsePosition, getMapKeyValueByIndex, parseName } from './utilities.js';
import STRINGS from "./wiki-output.strings.js";
import DraftData from './data/s43dsfl.js';

const ISFL_TEAMS_COUNT = 14;
const DSFL_TEAMS_COUNT = 8;

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

	getEligiblePlayersSectionString(_league, _season, _totalPlayers, _positions) {
		if (_league === 'DSFL') {
			return STRINGS.ELIGIBLE_PLAYERS_SECTION_DSFL(_season, _totalPlayers, 
				_.sum(_positions['DT']), _.sum(_positions['DE']), _.sum(_positions['WR']), _.sum(_positions['CB']), _.sum(_positions['LB']),
				_.sum(_positions['S']), _.sum(_positions['RB']), _.sum(_positions['TE']), _.sum(_positions['QB']), _.sum(_positions['KP']), _.sum(_positions['OL']));
		}

		return STRINGS.INTRO_ISFL(_season);		 
	}

	getDSFLPlayerString(_season, _round, _pick, _team, _firstName, _lastName, _position) {
		return STRINGS.DSFL_PLAYER_STRING(_season, _round, _pick, _team, _firstName, _lastName, _position);
	}

	getPlayerString(_player, _draftPosition, _teamCount) {
		return `{{NSFLDraft-row |draftyear={{nsfly|43|nolink}} |round=${Math.floor(_draftPosition/_teamCount) + 1} |picknum=${_draftPosition+1} |team={{tfnl|${parseISFLTeam(_player.ISFL)}}} |first=${_player.Player.substring(0, _player.Player.indexOf(' '))} |last=${_player.Player.substring(_player.Player.indexOf(' ') + 1)} |dab= | position=${parsePosition(_player["OG Position"])} |dsfl={{tf|${parseDSFLTeam(_player.DSFL)}}} |  collegeyear={{nsfly|37|nolink}} |college= |collegeteam= |collegelink= |probowl= |hof= |note=${_player["GM Pick"] ? 'GM Pick' : ''} |cfb page exists=no}}`
	}

	async buildDraftCountData(_teams) {
		let DRAFT_COUNT_MAP = new Map();

		_.toPairs(_teams).forEach((team) => {
			const teamName = team[0];
			const picks = _.sum(team[1]);

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

		let blankDraftRoundArray = [];
		for (let x = 0; x < draft.length / (league === 'DSFL' ? DSFL_TEAMS_COUNT : ISFL_TEAMS_COUNT); x++) {
			blankDraftRoundArray.push(0);
		}

		let DSFL_TEAMS = {
			KCC: [],
			LON: [],
			MIN: [],
			POR: [],
			BBB: [],
			DBD: [],
			NOR: [],
			TIJ: [],
		};
		Object.keys(DSFL_TEAMS).forEach(team => {
			DSFL_TEAMS[team] = [...blankDraftRoundArray];
		});
		
		let POSITIONS = {
			DT: [],
			DE: [],
			WR: [],
			CB: [],
			LB: [],
			S: [],
			RB: [],
			TE: [],
			QB: [],
			KP: [],
			OL: [],
		}
		Object.keys(POSITIONS).forEach(position => {
			POSITIONS[position] = [...blankDraftRoundArray];
		});

        for (let x = 0; x < draft.length ; x++) {
			const numTeams = league === 'DSFL' ? DSFL_TEAMS_COUNT : ISFL_TEAMS_COUNT;
			const player = draft[x];
			const round = Math.floor(x/numTeams) + 1;

			DSFL_TEAMS[parseDSFLTeam(player.Team)][round - 1] += 1;
			POSITIONS[parsePosition(player.Position)][round - 1] += 1;
			
			// console.log(this.getPlayerString(draft, x, DSFL_TEAMS));
			if (league === 'DSFL') {
				console.log(this.getDSFLPlayerString(season, round, x, parseDSFLTeam(player.Team), parseName(player.Name)[0], parseName(player.Name)[1], parsePosition(player.Position)));
			}
		}

		const DRAFT_COUNT_MAP = await this.buildDraftCountData(DSFL_TEAMS);

		const InfoboxString = this.getInfoBoxString(
			league, season, 
			draft[0].Name, draft[0].Position, parseDSFLTeam(draft[0].Team), 
			draft[draft.length - 1].Name, draft[draft.length - 1].Position, parseDSFLTeam(draft[draft.length - 1].Team), 
			getMapKeyValueByIndex(DRAFT_COUNT_MAP, 'last')[1], getMapKeyValueByIndex(DRAFT_COUNT_MAP, 'last')[0], 
			getMapKeyValueByIndex(DRAFT_COUNT_MAP)[1], getMapKeyValueByIndex(DRAFT_COUNT_MAP)[0], 
			draft.length);

		const IntroString = this.getIntroString(season, league);

		const EligiblePlayersSectionString = this.getEligiblePlayersSectionString(league, season, draft.length, POSITIONS);

    }
}

Main.Run();