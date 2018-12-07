namespace SegundoPARC {

export class heroe extends personaje {

        protected id:number;
        protected alias:string;
        protected lado:string;

        constructor(id:number,
                    nombre:string,
                    apellido:string,
                    alias:string,
                    edad:number,
                    lado:string
    ) {
            
            super(nombre,apellido,edad);
            this.id = id;
            this.alias = alias;
            this.lado = lado;
        }
           
        public get Id() : number {return this.id;}
        public set Id(v : number) {this.id = v;}

        public get Alias() : string {return this.alias;}
        public set Alias(v : string) {this.alias = v;}

        public get Lado() : string {return this.lado;}
        public set Lado(v : string) {this.lado = v;}
    
        //GETTERS
        public heroeCompleto():string
        { 
            return `${super.personajeCompleto()};${this.Id};${this.Alias};${this.Lado};`;
        }

        public toString():string
        {
            return JSON.stringify(this.heroeCompleto()); 
        }
    
    
    
    
    }

}