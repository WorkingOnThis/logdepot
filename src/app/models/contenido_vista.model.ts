
export class Contenido_vista {
    
    constructor(
        public id_area: string,
        public id_tipo: string,
        public nombre_area: string,
        public nombre_tipo: string,
        public desde_n?: string,
        public hasta_n?: string,
        public desde_fecha?: string,
        public hasta_fecha?: string,
        public observacion?: string,
        public id_caja?: string,
        public _id?: string
    ) { }

}

