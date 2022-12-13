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
        subject: "CORREO DE PRUEBA",
        text: `Reporte de los test: ${res}`
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(message)

    console.log(info);
}
enviarEmail()

const sendReport = (report) => {
    const suites = report.results[0].suites
    let res = []
    for (const elem of suites) {
        const state = elem.tests[0].state
        if(state === 'failed') {
            const title = elem.tests[0].title
            const err = elem.tests[0].err.message
            res.push({ title, state, err });
            console.log({ title, state, err });
        }
        enviarEmail(res)
    }
}

module.exports = sendReport
