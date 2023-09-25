import { getNthSuffix } from "./utilities.js";
const STRINGS = {
	INTRO_DSFL: (_season) => {
		return `The '''{{dsfly|${_season}|nolink}} DSFL Draft''' was the ${_season}${getNthSuffix(_season)} annual meeting of [[Developmental Simulation Football League]] (DSFL) franchises to select newly eligible players.`
	},
	INTRO_ISFL: (_season) => {
		return `The '''{{nsfly|${_season}|nolink}} ISFL Draft''' was the ${_season}${getNthSuffix(_season)} annual meeting of [[International  Simulation Football League]] (ISFL) franchises to select newly eligible players for the {{nsfly|${_season}|full}}.`
	},

}

export default STRINGS;