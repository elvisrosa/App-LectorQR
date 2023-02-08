export class Registro{
    public formato:string;
    public texto:string;
    public tipo:string;
    public icono:string;
    public creado:Date;

    constructor(formato:string, texto:string){
        this.formato=formato;
        this.texto=texto;
        this.creado=new Date();//hora - minuto - segundo
        this.determinarTipo();
    }

    private determinarTipo(){
        const ininioTexto=this.texto.substring(0,4);
        console.log('tipo',ininioTexto);
        switch(ininioTexto){
            case 'http':
                this.tipo='http';
                this.icono='globe'
            break;
            case 'geo:':
                this.tipo='geo';
                this.icono='pin'
            break;

            default:
                this.tipo='Desconocido';
                this.icono='create'

        }
    }
    

}