
function createCarte(parent, c, locked) {
    const obj = document.createElement("img")
    obj.src = "./card/" + c + ".png"
    obj.id = c
    if (locked) obj.classList.add('ltrue')
    parent.append(obj)
    const obd = document.getElementById(c)
    obd.onclick = function () { oncarteclick(this) }
}
/**
 * 
 * @param {Array} a 
 */
function addtoJ(a) {
    let domj = document.getElementById("bottomplayer")
    for (let i = 0; i < a.length; i++) {
        createCarte(domj, a[i])
    }
}
// addtoJ(['Lpi', 'Mpi', 'Ctr', 'Bca', 'Cpi', 'Dca', 'Kat', 'Oco', 'Hca', 'Eat', 'Gco', 'Gat', 'Ktr', 'Kca', 'Gtr', 'Nca', 'Ntr', 'Eco'])

function play() {
    // for (let i = 1; i < 5; i++) {
    //     if (!document.getElementById("p" + i).classList.contains("ltrue")) {
    //         return document.getElementById('p' + i).children[0].id
    //     }
    // }
    if (enchere == true) {
        ws.send(JSON.stringify({
            "op": 2, "data": {
                "lvl": lvlenchere
            }
        }))
    }
    else if (state == "chien") {
        let chien = []
        for (let i = 1; i < 5; i++) {
            chien.push(document.getElementById("p" + i).children[0].id)
        }
        for (let i = 1; i < 3; i++) {
            chien.push(document.getElementById("c" + i).children[0].id)
        }
        ws.send(JSON.stringify({ "op": 3, "data": { "carte": chien } }))
        clearall()
        lockall()
        document.getElementById("bplay").style.display = "none"
    }
    else {
        for (let i = 1; i < 5; i++) {
            console.log(i, document.getElementById("p" + i))
            if (!document.getElementById("p" + i).classList.contains("ltrue") && document.getElementById('p' + i).children.length > 0) {
                ws.send(JSON.stringify({ "op": 4, "data": { "carte": document.getElementById('p' + i).children[0].id } }))
                document.getElementById("bplay").style.display = "none"
                return
            }
        }
    }
}

function pench() {
    if (enchere == true) {
        ws.send(JSON.stringify({
            "op": 2,
            "data": {
                "lvl": -1
            }
        }))
    }
}

function drawlvlench() {
    document.getElementById("lvlench").innerText = "Niveau de l'enchère : " + lvlenchere
}
function fenchere() {
    // envoyer le niv des ench au serv 
}

function drawchien(a) {
    for (let i = 1; i < 5; i++) {
        createCarte(document.getElementById("p" + i), a[i - 1], true)
    }
    for (let i = 1; i < 3; i++) {
        createCarte(document.getElementById("c" + i), a[3 + i], true)
    }
}
// clearall()
// drawchien(['Lpi', 'Mpi', 'Ctr', 'Bca', 'Cpi', 'Dca'])

function toplay() {
    clearall()
    for (let i = 1; i < 3; i++) {
        const parent = document.getElementById('c' + i)
        parent.classList.remove("ltrue")
        const obj = document.createElement("img")
        obj.src = "./back.png"
        obj.id = "cc" + i
        obj.classList.add('ltrue')
        parent.append(obj)
        const obd = document.getElementById("cc" + i)
        obd.onclick = function () { oncarteclick(this) }
    }
    for (let i = 1; i <= 4; i++) {
        document.getElementById("p" + i).classList.add('ltrue')
    }
}
const animtoplay = {
    "bottom": bottomtoplay,
    "top": toptoplay,
    "left": lefttoplay,
    "right": righttoplay
}

function playertoplay(c, p, l) {
    console.log(p)
    animtoplay[p]()
    if (p != "bottom") {
        setTimeout(() => {
            for (let i = 1; i <= 4; i++) {
                if (document.getElementById("p" + i).children.length == 0) {
                    createCarte(document.getElementById("p" + i), c, l)
                    return
                }
            }
        }, 1500)

    }
    else {
        setTimeout(() => {
            for (let i = 1; i <= 4; i++) {
                if (document.getElementById("p" + i).children.length == 0) {
                    createCarte(document.getElementById("p" + i), c, l)
                    return
                }
            }
        }, 200)
    }
}

function unlock() {
    for (let i = 1; i < 5; i++) {
        if (document.getElementById("p" + i).children.length == 0) {
            document.getElementById("p" + i).classList.remove("ltrue")
            return
        }
    }
}

function unlockall() {
    for (let i = 1; i < 5; i++) {
        document.getElementById("p" + i).classList.remove("ltrue")
    }
    for (let i = 1; i < 3; i++) {
        document.getElementById("c" + i).classList.remove("ltrue")
    }
}

function lockall() {
    for (let i = 1; i < 5; i++) {
        document.getElementById("p" + i).classList.add("ltrue")
    }
    for (let i = 1; i < 3; i++) {
        document.getElementById("c" + i).classList.add("ltrue")
    }
}


function lockallbottom(){
    let b = document.getElementById("bottomplayer")
    for(let i =0;i<b.children.length;i++){
        b.children[i].classList.add("ltrue")
    }
}

function unlockid(id){
    document.getElementById(id).classList.remove("ltrue")
}