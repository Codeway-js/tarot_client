/**
 * 
 * @param {Document} e 
 * @returns 
 */

function oncarteclick(e) {
    if (e.classList.contains("ltrue") || e.parentElement.classList.contains("ltrue")) {
        e.classList.add("shake")
        setTimeout(() => { e.classList.remove("shake") }, 200)
        return
    }
    // console.log(e.parentElement.classList.contains('ltrue'))
    if (e.parentElement.classList.contains('c1')) {
        document.getElementById('bottomplayer').append(e)
        return
    }
    for (let i = 1; i < 5; i++) {
        if (document.getElementById('p' + i).children.length == 0 && document.getElementById('p' + i).classList.contains('ltrue') != true) {
            playertoplay(e.id, "bottom", false)
            e.parentElement.removeChild(e)
            return
        }
    }
    if(state=="chien"){
        for (let i = 1; i < 3; i++) {
            if (document.getElementById('c' + i).children.length == 0 && document.getElementById('c' + i).classList.contains('ltrue') != true) {
                document.getElementById('c' + i).appendChild(e)
                return
            }
        }
    }
    e.classList.add("shake")
    setTimeout(() => { e.classList.remove("shake") }, 200)
    return
}





function clear() {
    for (let i = 1; i < 5; i++) {
        const parent = document.getElementById('p' + i)
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        parent.classList.remove("ltrue")
    }
}


function clearall() {
    clear()
    for (let i = 1; i < 3; i++) {
        const parent = document.getElementById('c' + i)
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        parent.classList.remove("ltrue")
    }
}

function lefttoplay() {
    document.getElementById("move").classList.add("lefttoplay")
    setTimeout(() => { document.getElementById("move").classList.remove("lefttoplay") }, 1500)
}


function righttoplay() {
    document.getElementById("move").classList.add("righttoplay")
    setTimeout(() => { document.getElementById("move").classList.remove("righttoplay") }, 1500)
}


function bottomtoplay() {
    document.getElementById("move").classList.add("bottomtoplay")
    setTimeout(() => { document.getElementById("move").classList.remove("bottomtoplay") }, 200)
}

function toptoplay() {
    document.getElementById("move").classList.add("toptoplay")
    setTimeout(() => { document.getElementById("move").classList.remove("toptoplay") }, 1500)
}

function leftwin() {
    document.getElementById("c1").classList.add("win")
    for (let i = 1; i <= 4; i++) {
        document.getElementById("p" + i).classList.add("leftwinp"+i)
    }
    setTimeout(() => {
        for (let i = 1; i < 5; i++) {
            document.getElementById("p" + i).classList.remove("leftwinp"+i)
        }

        document.getElementById("c1").classList.remove("win")
    }, 1500)
}
function righttwin() {
    document.getElementById("c2").classList.add("win")
    for (let i = 1; i <= 4; i++) {
        document.getElementById("p" + i).classList.add("righttwinp"+i)
    }
    setTimeout(() => {
        for (let i = 1; i < 5; i++) {
            document.getElementById("p" + i).classList.remove("righttwinp"+i)
        }

        document.getElementById("c2").classList.remove("win")
    }, 1500)
}