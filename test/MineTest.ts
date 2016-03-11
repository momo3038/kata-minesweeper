'use strict';

import { expect } from 'chai';
import MineGame from "./../src/Mine";
import {MineType} from "./../src/Mine";

describe("MineSweeper Kata", () => {

    beforeEach(() => {

    });

    it("Should initialize a board ...", () => {

        var grid = "*." + "\r\n" +
            ".." + "\r\n" +
            "..";

        var game = new MineGame(grid);
        expect(game.Width()).to.be.eq(2);
        expect(game.Height()).to.be.eq(3);
    });

    it("Should initialize each cell ...", () => {

        var grid = "*." + "\r\n" +
            ".." + "\r\n" +
            "..";

        var game = new MineGame(grid);

        expect(game.getCellContent(0, 0)).to.be.eq(MineType.Boooooom);
        expect(game.getCellContent(0, 1)).to.be.eq(MineType.Ouf);
    });

    it("Should calculate impacted neighbour with no bomb", () => {

        var grid = "...." + "\r\n" +
            "...." + "\r\n" +
            "....";

        var game = new MineGame(grid);
        game.analyseAround(1, 2);
        expect(game.getCellValue(0, 0)).to.be.eq(0);
        expect(game.getCellValue(1, 2)).to.be.eq(0);
        expect(game.getCellValue(1, 3)).to.be.eq(0);
    });

    it("Should calculate impacted neighbour", () => {

        var grid = "...." + "\r\n" +
            "..*." + "\r\n" +
            "....";

        var game = new MineGame(grid);
        game.analyseAround(1, 2);
        expect(game.getCellValue(0, 0)).to.be.eq(0);
        expect(game.getCellValue(1, 2)).to.be.eq(1);
        expect(game.getCellValue(1, 3)).to.be.eq(1);
    });

    it("Should calculate impacted neighbour with multiple boomb", () => {

        var grid = "...." + "\r\n" +
            "..*." + "\r\n" +
            "..*.";

        var game = new MineGame(grid);
        game.analyse();
        expect(game.getCellValue(1, 1)).to.be.eq(2);
    });
    
        it("Should display a final board", () => {

        var grid = "*..." + "\r\n" +
                    "...." + "\r\n" +
                    ".*.." + "\r\n" +
                    "....";

        var game = new MineGame(grid);
        game.analyse();
       var result = game.display();
       
         var expected = "*100" + "\r\n" +
                        "2210" + "\r\n" +
                        "1*10" + "\r\n" +
                        "1110" + "\r\n";
                    
        expect(expected).to.be.eq(result);
    });

});
