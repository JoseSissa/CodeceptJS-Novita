const nodemailer = require('nodemailer')

const enviarEmail = async (res) => {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: "rafaelsissa@gmail.com",
            pass: 'jfjzxkgjyuzljypr'
        }
    }
    const message = {
        from: "rafaelsissa@gmail.com",
        to: "jose.sissa@gravital.co",
        subject: "REPORTE DE ERRORES - TESTS NOVITA",
        text: ''
    }
    for (const elem of res) {
        message.text += `Se ha presentado un problema en el test: ${elem.title}.\n
        Ubicación del archivo: test: ${(elem.pathTitle).toLowerCase()}.\n
        Estado: ${elem.state}. \n
        El test presenta el siguiente error: ${elem.err}. \n
        ${elem.errLine}. \n \n`
    }
    const transport = nodemailer.createTransport(config)
    const info = await transport.sendMail(message)
    console.log(info);
}
const sendReport = (report) => {
    const suites = report.results[0].suites
    let res = []
    for (const elem of suites) {
        const state = elem.tests[0].state
        if(state === 'failed') {
            const title = elem.tests[0].title
            const pathTitle = elem.tests[0].fullTitle
            const err = elem.tests[0].err.message
            const errLine = elem.tests[0].err.estack
            res.push({ title, pathTitle, state, err, errLine });
            console.log({ title, state, err, errLine });
        }
    }
    (res.length > 0) && enviarEmail(res)
}

module.exports = sendReport
