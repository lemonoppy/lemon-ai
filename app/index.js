import _ from "lodash";
import PlayerData from './data/s43.js';

class Main {
    static async Run() {
        const App = new Main();
        await App.startService();
    }

    postStartingMessage() {
        console.log('Lemon AI Online 🍋🍋🍋');
        console.log('Importing Last Update S43 Data...');
        console.log('Calculating Draft Grades...');
        console.log('Analyzing SWEG score...');
        console.log('Correcting for bank balance...');
        console.log('Importing GM analysis analysis...');
        console.log('Draining UberBJ bank account...');
        console.log('Lemon AI draft results ready.');
    }

    async pickRandom(players) {
        const wheelPick = Math.floor(Math.random() * players[players.length - 1].range)
        // console.log(`The pick: ${wheelPick}`)
        for (let x = 0; x < players.length; x++) {
            // console.log(`${players[x].Player} range is ${players[x].range}`);
            if (wheelPick <= players[x].range) {
                //console.log(players[x])
                return x;
            }
        }
    }

    async setupPickValues(players) {
        const TPEMultiplier = 1.5;
        const SWEGBonus = (sweg) => (2.5 + sweg) * 0.35;

        _.forEach(players, function(player) {
            const playerValue = Math.ceil(player.TPE * TPEMultiplier * SWEGBonus(player.sweg));
            player.value = playerValue;
        })
    }

    async setupPickRange(players) {
        let runningSum = 0;
        _.forEach(players, function(player) {
            runningSum += player.value;
            player.range = runningSum;
        })
    }

    async startService() {
        this.postStartingMessage();

        const teams = 14;
        const rounds = 2;
        const gmPicks = 5;

        let players = PlayerData;

        await this.setupPickValues(players);
        await this.setupPickRange(players);

        for (let x = 0; x < teams * rounds - gmPicks; x++) {
            await this.setupPickValues(players);
            await this.setupPickRange(players);
            let pick = await this.pickRandom(players);
            const player = players[pick];
            console.log(`Pick ${x + 1} is in! Congratulations ${player.Player}!`);
            players.splice(pick, 1);
        }
    }
}

Main.Run();