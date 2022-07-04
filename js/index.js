const sendInfo = () => {
    // VARIABLES
    let apuesta = parseInt(document.getElementById('amount').value);
    let limite = 5
    let anterior = 0
    let resultado = 0
    let contador = 0

    document.getElementById('ValueApuesta').innerHTML = apuesta;

    for (let i = 0; i < limite; i++) {
        resultado = anterior + apuesta;
        let p = document.createElement('p');
        let pTexto = document.createTextNode(resultado);
        p.appendChild(pTexto);
        document.body.appendChild(p);

        anterior = apuesta + resultado
        p = document.createElement('p');
        pTexto = document.createTextNode(anterior);
        p.appendChild(pTexto);
        document.body.appendChild(p);

        apuesta = resultado + anterior
        p = document.createElement('p');
        pTexto = document.createTextNode(apuesta);
        p.appendChild(pTexto);
        document.body.appendChild(p);

        let capital = resultado + anterior + apuesta
        document.getElementById('valueCapitalOptimo').innerHTML = capital;
    }
}