namespace SegundoPARC {

export abstract class personaje {
       
      nombre:string;
      apellido:string;
      edad:number;
    
        constructor(Nombre:string,apellido:string, edad:number) {
          
            this.nombre=Nombre;
            this.apellido=apellido;
            this.edad=edad;
        }
        
        public get Nombre() : string {return this.nombre;}
        public set Nombre(v : string) {this.nombre = v;}

        public get Apellido() : string {return this.apellido;}
        public set Apellido(v : string) {this.apellido = v;}

        public get Edad() : number {return this.edad;}
        public set Edad(v : number) {this.edad = v;}
       
   
        public personajeCompleto()
        {
            return `${this.nombre};${this.apellido};${this.edad}`;
        }

        public toString():string
        {
            return this.personajeCompleto(); 
        }
        
    }



}