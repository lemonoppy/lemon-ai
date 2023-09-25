import { getNthSuffix, multipleTeamLinkBuilder } from "./utilities.js";
const DSFL_TEAMS = 8;
const ISFL_TEAMS = 14;

const STRINGS = {
	INTRO_DSFL: (_season) => {
		return `The '''{{dsfly|${_season}|nolink}} DSFL Draft''' was the ${_season}${getNthSuffix(_season)} annual meeting of [[Developmental Simulation Football League]] (DSFL) franchises to select newly eligible players.`
	},
	INTRO_ISFL: (_season) => {
		return `The '''{{nsfly|${_season}|nolink}} ISFL Draft''' was the ${_season}${getNthSuffix(_season)} annual meeting of [[International  Simulation Football League]] (ISFL) franchises to select newly eligible players for the {{nsfly|${_season}|full}}.`
	},
	INFOBOX_DSFL: (_season, _first, _firstPosition, _firstTeam, _last, _lastPosition, _lastTeam, _mostPicks, _mostPicksCount, _fewestPicks, _fewestPicksCount, _totalPlayers) => {
		return `
		{{Infobox DSFL Draft
			| year = {{dsfly|${_season}|nolink}}
			| image = DSFLDraftLogo.png
			| imagesize = 250px
			| caption = DSFL draft logo
			| first = [[${_first}]], {{AmFBpos|${_firstPosition}}}<br />{{tf|${_firstTeam}}}
			| mr_irrelevant = [[${_last}]], {{AmFBpos|${_lastPosition}}}<br />{{tf|${_lastPosition}}}
			| mosttm1 = ${multipleTeamLinkBuilder(_mostPicks)}
			| mostnum = ${_mostPicksCount}
			| fewtm1 = ${multipleTeamLinkBuilder(_fewestPicks)}
			| fewnum = ${_fewestPicksCount}
			| overall = ${_totalPlayers}
			| rounds = ${Math.ceil(_totalPlayers / DSFL_TEAMS)}
			| hofnum = 0
			| prev = {{dsfly|${_season - 1}|nolink}}
			| next = {{dsfly|${_season + 1}|nolink}}
		}}
		`
	}

}

export default STRINGS;