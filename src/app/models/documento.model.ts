
export class Documento {

    constructor(
        public id_caja: string,
        public id_codigo: string,
        public id_solicitante: string,
        public id_estado: string,
        public id_usuario_alta?: string,
        public fecha_alta?: string,
        public _id?: string
    ) { }

}


