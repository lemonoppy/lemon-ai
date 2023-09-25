import { getNthSuffix, multipleTeamLinkBuilder } from "./utilities.js";
const DSFL_TEAMS = 8;
const ISFL_TEAMS = 14;

const STRINGS = {
	INTRO_DSFL: (_season) => {
		return `
The '''{{dsfly|${_season}|nolink}} DSFL Draft''' was the ${_season}${getNthSuffix(_season)} annual meeting of [[Developmental Simulation Football League]] (DSFL) franchises to select newly eligible players.`
	},
	INTRO_ISFL: (_season) => {
		return `
The '''{{nsfly|${_season}|nolink}} ISFL Draft''' was the ${_season}${getNthSuffix(_season)} annual meeting of [[International  Simulation Football League]] (ISFL) franchises to select newly eligible players for the {{nsfly|${_season}|full}}.`
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
==Eligible Players==
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
	},
	PLAYER_STRING_DSFL: (_season, _round, _pick, _team, _firstName, _lastName, _position) => {
		return `
{{NSFLDraft-row |draftyear={{nsfly|${_season}|nolink}} |round=${_round} |picknum=${_pick} |team={{tfnl|${_team}}} |first=${_firstName} |last=${_lastName} |dab= | position=${_position} |probowl= |hof= |note=  |cfb page exists=yes}}
		`
	},
	TEAM_SELECTIONS_DSFL: (_header, _NOR, _POR, _TIJ, _KCC, _BBB, _MIN, _DBD, _LON) => {
		return `
=Summary=
===Selections by DSFL team===

{| class="wikitable sortable" style="text-align:center"
|-
! DSFL Team !! ${_header} Total
|-
! Norfolk Seawolves || ${_NOR[0]} style="background:#f2f2f2; text-align: center;"|'''${_NOR[1]}'''
|-
! Portland Pythons || ${_POR[0]} style="background:#f2f2f2; text-align: center;"|'''${_POR[1]}'''
|-
! Tijuana Luchadores || ${_TIJ[0]} style="background:#f2f2f2; text-align: center;"|'''${_TIJ[1]}'''
|-
! Kansas City Coyotes || ${_KCC[0]} style="background:#f2f2f2; text-align: center;"|'''${_KCC[1]}'''
|-
! Bondi Beach Buccaneers || ${_BBB[0]} style="background:#f2f2f2; text-align: center;"|'''${_BBB[1]}'''
|-
! Minnesota Grey Ducks || ${_MIN[0]} style="background:#f2f2f2; text-align: center;"|'''${_MIN[1]}'''
|-
! Dallas Birddogs || ${_DBD[0]} style="background:#f2f2f2; text-align: center;"|'''${_DBD[1]}'''
|-
! London Royals || ${_LON[0]} style="background:#f2f2f2; text-align: center;"|'''${_LON[1]}'''
|}
		`
	},
	SELECTION_BY_POSITION: (_header, _DE, _DT, _WR, _CB, _LB, _S, _RB, _TE, _OL, _QB, _K) => {
		return `
===Selections by position===
{| class="wikitable sortable" style="text-align:center"
|-
! Position !! ${_header} Total
|-
! {{AmFbPos|DE}}
| ${_DE[0]} style="background:#f2f2f2; text-align: center;"|'''${_K[1]}'''
|-
! {{AmFbPos|DT}}
| ${_DT[0]} style="background:#f2f2f2; text-align: center;"|'''${_DT[1]}'''
|-
! {{AmFbPos|WR}}
| ${_WR[0]} style="background:#f2f2f2; text-align: center;"|'''${_WR[1]}'''
|-
! {{AmFbPos|CB}}
| ${_CB[0]} style="background:#f2f2f2; text-align: center;"|'''${_CB[1]}'''
|-
! {{AmFbPos|LB}}
| ${_LB[0]} style="background:#f2f2f2; text-align: center;"|'''${_LB[1]}'''
|-
! {{AmFbPos|S}}
| ${_S[0]} style="background:#f2f2f2; text-align: center;"|'''${_S[1]}'''
|-
! {{AmFbPos|RB}}
| ${_RB[0]} style="background:#f2f2f2; text-align: center;"|'''${_RB[1]}'''
|-
! {{AmFbPos|TE}}
| ${_TE[0]} style="background:#f2f2f2; text-align: center;"|'''${_TE[1]}'''
|-
! {{AmFbPos|OL}}
| ${_OL[0]} style="background:#f2f2f2; text-align: center;"|'''${_OL[1]}'''
|-
! {{AmFbPos|QB}}
| ${_QB[0]} style="background:#f2f2f2; text-align: center;"|'''${_QB[1]}'''
|-
! {{AmFbPos|K}}
| ${_K[0]} style="background:#f2f2f2; text-align: center;"|'''${_K[1]}'''
|}
		`
	},
	SELECTION_BY_UNIT_GROUP: (_header, _offense, _defense, _specialTeams) => {
		return `
{| class="wikitable sortable" style="text-align:center"
|-
! Unit !! ${_header} Total
|-
! Offense
| ${_offense[0]} style="background:#f2f2f2; text-align: center;"|'''${_offense[1]}'''
|-
! Defense
| ${_defense[0]} style="background:#f2f2f2; text-align: center;"|'''${_defense[1]}'''
|-
! Special Teams
| ${_specialTeams[0]} style="background:#f2f2f2; text-align: center;"|'''${_specialTeams[1]}'''
|}
		`
	},
	FOOTER_TEXT_DSFL: () => {
		return `
;General references
{{reflist|group="N"}}

{{DSFL drafts}}
[[Category:Developmental Simulation Football League Draft]]`
	},
	PLAYER_SELECTIONS_DSFL: (_rounds, _players) => {
		return `
==Player selections==
{| border=0 cellspacing=""0"" cellpadding=""8""
|-
|{{NSFLDraft-TOC |numberofrounds=${_rounds}|center=yes}}
{|style=""margin: 0.75em 0 0 0.5em;""
|-
| style="background:#faecc8; border:1px solid #aaa; width:2em; text-align:center;"| †
| = [[ISFL Pro Bowl]]er<ref name="Pro Bowler note" group="N">Players are identified as Pro Bowlers if they were selected for the [[ISFL Pro Bowl]] at any time in their career.</ref>
|-
| style="background-color:#FFCC00; border:1px solid #aaaaaa; width:2em; text-align:center;"| ‡
|= [[ISFL Hall of Fame|Hall of Fame]]r<ref name="HOF note" group="N">Players are identified as a Hall of Famer if they have been inducted into the [[ISFL Hall of Fame]].</ref>
|}
| cellspacing=""2""|
{{AmFootball position key modern}}
|}
{{clear}}
{{NSFLDraft-header | noteswidth=250pt|dsfl=no}}
${_players}
{{NSFLDraft-footer}}
		`
	}

}

export default STRINGS;