const registerHandle = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    // console.log(db)
    console.log(email, name, password)
    if (!email || !name || !password)
        return res.status(400).json('empty')
    const hash = bcrypt.hashSync(password, 8);
    
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('exterior error'))
}

module.exports = {
    registerHandle: registerHandle
};