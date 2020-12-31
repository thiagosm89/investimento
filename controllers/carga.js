const url = require('url');
const readXlsxFile = require('read-excel-file/node');

class CargaController {

    precoMedio = {};

    load(request, response) {
        const schema = {
            'ENTIDADE' : {
                prop: 'entidade',
                type: String 
            },
            'QUANTIDADE' : {
                prop: 'quantidade',
                type: Number 
            },
            'PRECO_COMPRA': {
                prop: 'precoCompra',
                type: Number
            },
            'DATA_COMPRA' : {
                prop: 'dataCompra',
                type: Date 
            }
        };
    
        readXlsxFile('/home/thiago/projects/investimentos/titulos.xlsx', { sheet: 'RendaVariável', dateFormat: 'MM/DD/YY', schema: schema })
        .then((row) => {
            if(!row.dataRetirada) {
                let precoEntidade = this.precoMedio[row.entidade];
                if(precoEntidade) {
                    const totalAcoes = precoEntidade.quantidade + row.quantidade;

                    precoEntidade = () + (precoEntidade.quantidade + row.quantidade)         
                } else {
                    this.precoMedio[row.entidade] = {'quantidade': row.quantidade, 'precoCompra': row.precoCompra};    
                }
            }
        });

        response.write("Finalizado");
        response.end();
    }
}

const instance = new CargaController();

module.exports = instance;