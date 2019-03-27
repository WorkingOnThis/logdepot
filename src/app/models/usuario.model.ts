
export class Usuario {

    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public id_empresa: string,
        public password: string,
        public role: string,
        public img?: string,
        public id_creador?: string,
        public cargo?: string,
        public telefono?: string,
        public dni?: string,
        public _id?: string
    ) { }

}


