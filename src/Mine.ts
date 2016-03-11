export default class MineGame {
    private board: Cell[][] = [];
    constructor(public grid: string) {
        var lines = grid.split('\r\n');
        for (var indexLine = 0; indexLine < lines.length; indexLine++) {
            var line = lines[indexLine];
            this.board[indexLine] = [];
            for (var indexChar = 0; indexChar < line.length; indexChar++) {
                var char = line[indexChar];
                var cell = new Cell(char);
                this.board[indexLine][indexChar] = cell;
            }
        };
    }

    public Height(): number {
        return this.board.length;
    }

    public Width(): number {
        return this.board[0].length;
    }

    public getCellContent(row: number, col: number): MineType {
        return this.board[row][col].getContent();
    }

    public getCellValue(row: number, col: number): number {
        return this.board[row][col].getValue();
    }

    public analyseAround(row: number, col: number): void {
        var analysed = this.board[row][col];
        if (analysed.getContent() === MineType.Boooooom) {
            for (var i = Math.max(row - 1, 0); i <= Math.min(row + 1, this.Height() - 1); i++) {
                for (var j = Math.max(col - 1, 0); j <= Math.min(col + 1, this.Width() - 1); j++) {
                    this.board[i][j].boomNeighbour += 1;
                }
            }
        }
    }

    public analyse(): void {
        for (var i = 0; i < this.Height(); i++) {
            for (var j = 0; j < this.Width(); j++) {
                this.analyseAround(i, j);
            }
        }
    }
    
    public display(): string {
        var result = "";
        for (var i = 0; i < this.Height(); i++) {
            for (var j = 0; j < this.Width(); j++) {
                var displaying = this.board[i][j];
                result += displaying.getContent() === MineType.Boooooom ? '*' : displaying.boomNeighbour;
            }
            result += '\r\n';
        }
        console.log(result);
        return result;
    }
}


export enum MineType {
    Boooooom,
    Ouf
}

export class Cell {
    private content: MineType;
    public boomNeighbour: number;
    constructor(public value: string) {
        if (value === '*') {
            this.content = MineType.Boooooom;
        } else {
            this.content = MineType.Ouf
        }
        this.boomNeighbour = 0;
    }

    public getContent(): MineType {
        return this.content;
    }

    public getValue(): MineType {
        return this.boomNeighbour;
    }
}
