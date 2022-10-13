class User{    
    constructor(id, name, email, hash, subjectName) {
        if(id)
            this.id = id;

        this.name = name;
        this.email = email;
        this.hash = hash;
        this.subjectName = subjectName;
    }
}

module.exports = User;