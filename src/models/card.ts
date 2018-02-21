export class Card {

    constructor(id: number[], title: string, techTypes:string[]){
        this.id = id;
        this.title = title;
        this.techtypes = techTypes;
    }

    public id :number[];
    public title : string;
    public techtypes :string[];
    public transformedId :string;


    public equals(card:Card) : boolean {
        if(this.id == card.id){
            return true;
        }
        return false;
    }
}