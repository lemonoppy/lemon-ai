import _ from "lodash";
import fs from 'fs';
import { parseDSFLTeam, parseISFLTeam, parsePosition, getMapKeyValueByIndex, parseName, buildPipedRow, getUnit, appendFile, writeFile } from './utilities.js';
import STRINGS from "./wiki-output.strings.js";
import DraftData from './data/s40dsfl.js';

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
		return STRINGS.PLAYER_STRING_DSFL(_season, _round, _pick, _team, _firstName, _lastName, _position);
	}

	getPlayerSelectionsString(_league, _season, _rounds, _players) {
		const numTeams = _league === 'DSFL' ? DSFL_TEAMS_COUNT : ISFL_TEAMS_COUNT;
		if (_league === 'DSFL') {
			let playerStrings = '';

			for (let x = 0; x < _players.length ; x++) {
				const player = _players[x];
				const round = Math.floor(x/numTeams) + 1;
				playerStrings += this.getDSFLPlayerString(_season, round, x, parseDSFLTeam(player.Team), parseName(player.Name)[0], parseName(player.Name)[1], parsePosition(player.Position))
			}
			return STRINGS.PLAYER_SELECTIONS_DSFL(_rounds, playerStrings)
		}
		
			
	}

	buildSelectionsRow(_teamSelections) {
		return [buildPipedRow(_teamSelections), _.sum(_teamSelections)]
	}

	getTeamSelectionsDSFLString(_teamSelections, _rounds) {
		let blankDraftRoundArray = [];
		for (let x = 0; x < _rounds; x++) {
			blankDraftRoundArray.push(x + 1);
		}

		return STRINGS.TEAM_SELECTIONS_DSFL(
			buildPipedRow(blankDraftRoundArray, '!!', 'Round'), 
			this.buildSelectionsRow(_teamSelections['NOR']), 
			this.buildSelectionsRow(_teamSelections['POR']),
			this.buildSelectionsRow(_teamSelections['TIJ']), 
			this.buildSelectionsRow(_teamSelections['KCC']), 
			this.buildSelectionsRow(_teamSelections['BBB']), 
			this.buildSelectionsRow(_teamSelections['MIN']), 
			this.buildSelectionsRow(_teamSelections['DBD']), 
			this.buildSelectionsRow(_teamSelections['LON'])
		);
	}

	getSelectionByPosition(_positionSelections, _rounds) {
		let blankDraftRoundArray = [];
		for (let x = 0; x < _rounds; x++) {
			blankDraftRoundArray.push(x + 1);
		}

		return STRINGS.SELECTION_BY_POSITION(
			buildPipedRow(blankDraftRoundArray, '!!', 'Round'),
			this.buildSelectionsRow(_positionSelections['DE']), 
			this.buildSelectionsRow(_positionSelections['DT']),
			this.buildSelectionsRow(_positionSelections['WR']), 
			this.buildSelectionsRow(_positionSelections['CB']), 
			this.buildSelectionsRow(_positionSelections['LB']), 
			this.buildSelectionsRow(_positionSelections['S']), 
			this.buildSelectionsRow(_positionSelections['RB']), 
			this.buildSelectionsRow(_positionSelections['TE']),
			this.buildSelectionsRow(_positionSelections['OL']), 
			this.buildSelectionsRow(_positionSelections['QB']), 
			this.buildSelectionsRow(_positionSelections['KP'])
		);
	}

	getSelectionByUnitGroup(_positionSelections, _rounds) {
		let blankDraftRoundArray = [];
		for (let x = 0; x < _rounds; x++) {
			blankDraftRoundArray.push(x + 1);
		}

		return STRINGS.SELECTION_BY_UNIT_GROUP(
			buildPipedRow(blankDraftRoundArray, '!!', 'Round'),
			this.buildSelectionsRow(_positionSelections['Offense']), 
			this.buildSelectionsRow(_positionSelections['Defense']),
			this.buildSelectionsRow(_positionSelections['Special']),
		);
	}
	getFooterString(_league) {
		if (_league === 'DSFL') {
			return STRINGS.FOOTER_TEXT_DSFL();
		}
		return STRINGS.FOOTER_TEXT_DSFL();
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

	async importData(_fileName) {
		try {
			if (process.argv[2]) {
				console.log(process.argv[2])
				const data = await import(`./data/${process.argv[2]}`);
				if (data.default) {
					return data.default;
				}
			}
		} catch (error) {
			console.log(`${error}`);
			console.log(`Moving to fallback import.`)
		}
	}

    async startService() {
		const argData = await this.importData();
		const { info: { season, league }, draft } = (argData ? argData : DraftData);
		
		const numTeams = league === 'DSFL' ? DSFL_TEAMS_COUNT : ISFL_TEAMS_COUNT;
		const fileDirectory = `./wiki-output/${league}`;
		const fileName = `S${season}.txt`;

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

		let POSITION_UNIT_GROUP = {
			Offense: [],
			Defense: [],
			Special: [],
		}
		Object.keys(POSITION_UNIT_GROUP).forEach(group => {
			POSITION_UNIT_GROUP[group] = [...blankDraftRoundArray];
		});

        for (let x = 0; x < draft.length ; x++) {
			const player = draft[x];
			const round = Math.floor(x/numTeams) + 1;

			DSFL_TEAMS[parseDSFLTeam(player.Team)][round - 1] += 1;
			POSITIONS[parsePosition(player.Position)][round - 1] += 1;
			POSITION_UNIT_GROUP[getUnit(player.Position)][round - 1] += 1;
		}

		const DRAFT_COUNT_MAP = await this.buildDraftCountData(DSFL_TEAMS);

		try {
			const file = `${fileDirectory}/${fileName}`;
			if (!fs.existsSync(fileDirectory)) {
				fs.mkdirSync(fileDirectory, { recursive: true });
			}

			writeFile(fileDirectory, fileName,this.getInfoBoxString(
				league, season, 
				draft[0].Name, draft[0].Position, parseDSFLTeam(draft[0].Team), 
				draft[draft.length - 1].Name, draft[draft.length - 1].Position, parseDSFLTeam(draft[draft.length - 1].Team), 
				getMapKeyValueByIndex(DRAFT_COUNT_MAP, 'last')[1], getMapKeyValueByIndex(DRAFT_COUNT_MAP, 'last')[0], 
				getMapKeyValueByIndex(DRAFT_COUNT_MAP)[1], getMapKeyValueByIndex(DRAFT_COUNT_MAP)[0], 
				draft.length
			));

			appendFile(file, this.getIntroString(season, league));
			appendFile(file, this.getEligiblePlayersSectionString(league, season, draft.length, POSITIONS));
			appendFile(file, this.getPlayerSelectionsString(league, season, Math.ceil(draft.length / numTeams), draft));
			appendFile(file, this.getTeamSelectionsDSFLString(DSFL_TEAMS, Math.ceil(draft.length / numTeams)));
			appendFile(file, this.getSelectionByPosition(POSITIONS, Math.ceil(draft.length / numTeams)));
			appendFile(file, this.getSelectionByUnitGroup(POSITION_UNIT_GROUP, Math.ceil(draft.length / numTeams)));
			appendFile(file, this.getFooterString(league));
		} catch (error) {
			console.log(`${error}`);
		}
    }
}

Main.Run();