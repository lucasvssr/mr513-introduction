interface Shape {
    readonly name: string
    readonly isPolygon: boolean
    
    getArea():number
}

abstract class AbstractShap implements Shape {
    name: string;
    isPolygon: boolean;

    constructor(name:string, isPolygon:boolean) {
        this.name = name;
        this.isPolygon = isPolygon;
    }

    abstract getArea(): number
}

export class Rectangle extends AbstractShap{
    private side1:number
    private side2:number

    constructor(name:string, side1:number, side2:number){
        super(name, true);
        this.side1 = side1;
        this.side2 = side2;
    }

    getArea(): number {
        return this.side1 * this.side2
    }
}

export class Square extends Rectangle{
    constructor(name:string, side:number){
        super(name, side, side)
    }
}

export class Circle extends AbstractShap{
    private radius:number

    constructor(name:string, radius:number){
        super(name, false)
        this.radius = radius
    }

    getArea(): number {
        return this.radius**2 * Math.PI
    }
}


export function displayShape(shape: Shape): void {
    console.log(`${shape.name} ${shape.isPolygon ? ('est un polygone.') : ("n'est pas un polygone.")} ${shape.getArea()}.`)
}
