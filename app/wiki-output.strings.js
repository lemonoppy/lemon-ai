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
	},
	ELIGIBLE_PLAYERS_SECTION_DSFL: (_season, _totalPlayers, _DTCount, _DECount, _WRCount, _CBCount, _LBCount, _SCount, _RBCount, _TECount, _QBCount, _KCount, _OLCount) => {
		return `
==Eligible players==
In order to be eligible to enter the draft, players must be at least three years removed from high school. The deadline for underclassmen to declare for the draft was January 31, {{dsfly|${_season}|nolink}}.
		
The following is the breakdown of the ${_totalPlayers} eligible players by [[wp:American football positions|position]]:
{{Div col|colwidth=13em|rules=yes}}
*   ${_DTCount} x {{AmFBpos|DT|long}}        
*   ${_DECount} x {{AmFBpos|DE|long}}        
*   ${_WRCount} x {{AmFBpos|WR|long}}       
*   ${_CBCount} x {{AmFBpos|CB|long}}        
*   ${_LBCount} x {{AmFBpos|LB|long}}        
*   ${_SCount} [[wp:Safety (gridiron football position)|Safeties]]
*   ${_RBCount} x {{AmFBpos|RB|long}}        
*   ${_TECount}  x {{AmFBpos|TE|long}}       
*   ${_QBCount} x {{AmFBpos|QB|long}}        
*   ${_KCount} x {{AmFBpos|K-P|long}}       
*   ${_OLCount} [[wp:Lineman (gridiron football)#Offensive line|Offensive linemen]]
		
{{Div col end}}
		`
	}

}

export default STRINGS;